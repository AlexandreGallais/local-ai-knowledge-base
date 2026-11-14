---
title: "HTML Sanitizer API (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_sanitizer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML Sanitizer API (part 2 of 3)

## Concepts and usage

Web applications often need to work with untrusted HTML on the client side, for example, as part of a client-side templating solution, when rendering user generated content, or if including data in a frame from another site.

Injecting untrusted HTML can make a site vulnerable to various types of attacks.
In particular, cross-site scripting (XSS) attacks work by injecting untrusted HTML into the DOM that then executes JavaScript in the context of the current origin — allowing malicious code to run as though it was served from the site's origin.
These attacks can be mitigated by removing unsafe HTML elements and attributes before they are injected into the DOM.

The HTML Sanitizer API provides a number of methods for removing unwanted HTML entities from HTML input before it is injected into the DOM.
These come in XSS-safe versions that enforce removal of all unsafe elements and attributes, and potentially unsafe versions that give developers full control over the HTML entities that are allowed.

### Sanitization methods

The HTML Sanitizer API provides XSS-safe and XSS-unsafe methods for injecting HTML strings into an `Element` or a `ShadowRoot`, and for parsing HTML into a `Document`.

- Safe methods
    `Element.setHTML()`, `ShadowRoot.setHTML()`, and `Document.parseHTML()`.
- Unsafe methods
    `Element.setHTMLUnsafe()`, `ShadowRoot.setHTMLUnsafe()`, and `Document.parseHTMLUnsafe()`.

All the methods take the HTML to be injected and an optional `Sanitizer` or `SanitizerConfig` as arguments.
The sanitizer object defines the HTML entities that will be filtered out of the input before it is injected.
The `Element` methods are context aware, and will additionally drop any elements that the HTML specification does not allow in the target element.

The safe methods always remove XSS-unsafe elements and attributes.
If no sanitizer is passed as a parameter they will use the default sanitizer configuration, which removes both XSS-unsafe elements and attributes, such as `<script>` elements and `onclick` event handlers, along with others that might be used in other kinds of attacks if provided as user input.
If a custom sanitizer is used with a safe method, it is implicitly updated to remove any elements and attributes that are not XSS-safe (note that the passed sanitizer is not modified, and might still allow unsafe entities if used with an unsafe method).

The safe methods should be used instead of `Element.innerHTML`, `Element.outerHTML`, or `ShadowRoot.innerHTML`, for injecting untrusted HTML content.
For example, in most cases you can use `Element.setHTML()` with the default sanitizer as a drop-in replacement for `Element.innerHTML`.
The same methods can also be used for injecting trusted HTML strings that do not need to contain any XSS-unsafe elements.

The XSS-unsafe methods will use whatever sanitizer configuration is passed as an argument.
If no sanitizer is passed, then all HTML elements and attributes allowed by the context will be injected.
This is similar to using `Element.innerHTML` except that the method will parse shadow roots, drop elements that aren't appropriate in the context, and allow some other input that is not allowed when using the property.

The unsafe methods should only be used with untrusted HTML that needs to contain some XSS-unsafe elements or attributes.
This is still unsafe, but allows you to reduce the risk by restricting unsafe entities to the minimal set.
For example, if you wanted to inject unsafe HTML but for some reason you needed the input to include the `onblur` handler, you could more safely do so by amending the default `Sanitizer` and using an unsafe method as shown:

```js
const sanitizer = new Sanitizer(); // Default sanitizer
sanitizer.allowAttribute("onblur"); // Allow onblur

someElement.setHTMLUnsafe(untrustedString, { sanitizer });
```

### Sanitizer configurations

A sanitizer configuration defines what HTML entities will be allowed, replaced, or removed when the sanitizer is used, including elements, attributes, `data-*` attributes, and comments.

There are two mechanisms for defining a sanitizer configuration, either of which can be passed to all the sanitization methods:

- `SanitizerConfig` is a dictionary object that defines arrays for the allowed/disallowed elements and attributes and boolean properties that indicate whether comments and data attributes will be allowed or omitted, and so on.

  Only a subset of possible configuration options may be specified in a particular configuration in order to reduce redundancy and ambiguity.
  The allowed subset is summarized in the Allow and remove configurations section below, and described in detail in Valid configuration.

- `Sanitizer` is essentially a wrapper around a `SanitizerConfig` that provides methods to ergonomically modify the configuration and ensure that it remains valid.

  For example, you can use a method to add an allowed element, and it will also remove the element from the `replaceWithChildrenElements` array (if present).
  The interface also provides methods to return a copy of the underlying `SanitizerConfig` and also to update the sanitizer so that it is XSS-safe.
  It may provide normalizations of the sanitizer configuration used to construct it, making it easier to understand and reuse.

While you can use either interface in any of the sanitizing methods, `Sanitizer` is likely to be more efficient to share and reuse than `SanitizerConfig`.

#### Allow and remove configurations

You can build up a configuration in two ways:

- As an _allow configuration_: specifying the set of elements and/or attributes that you will allow in the output.
- As a _remove configuration_: specifying the set that must not be present in the output.

These sets are specified as arrays in the configuration object fields: `elements` and `attributes`, and `removeElements` and `removeAttributes`.
You may not specify both allow and remove arrays for elements or attributes in the same configuration, but other combinations of fields are allowed.
The following table shows the permitted combinations.

| Element arrays                | Attribute arrays                  | Valid? |
| ----------------------------- | --------------------------------- | ------ |
| `elements`                    | -                                 | ✔️     |
| `elements`                    | `attributes`                      | ✔️     |
| `elements`                    | `removeAttributes`                | ✔️     |
| `removeElements`              | -                                 | ✔️     |
| `removeElements`              | `attributes`                      | ✔️     |
| `removeElements`              | `removeAttributes`                | ✔️     |
| -                             | `attributes`                      | ✔️     |
| -                             | `removeAttributes`                | ✔️     |
| `elements` + `removeElements` | (anything)                        | ❌     |
| (anything)                    | `attributes` + `removeAttributes` | ❌     |
| -                             | -                                 | ✔️     |

An allow configuration can optionally specify whether per-element attributes should be allowed and/or removed in its `elements` array.
The allowed configuration for these local attributes depends on whether or not global `attributes` or `removedAttributes` is defined.
The valid configuration section outlines the restrictions.

In general an "allow configuration" is safer for both the elements and attributes, because you list the elements and/or attributes that you want and know are safe, rather than all the items that are dangerous or might potentially be considered dangerous in future.
If you specify an empty configuration object then an empty allow configuration is used.

##### Allow configurations

With "allow configurations" you specify the elements and attributes you wish to _allow_ (or replace with child elements) — all other elements/attributes in the input will be dropped.
This makes it easy to understand what elements will be allowed in the DOM when the HTML is parsed.
They are useful when you know exactly what HTML entities you want to be able to inject in a particular context.

Allow configurations are created by defining a `Sanitizer` that wraps a `SanitizerConfig` that includes the `elements` and/or `attributes` arrays (and not the `removeElements` or `removeAttributes` arrays).

For example, the following configuration is created by passing a `SanitizerConfig` that allows `` and `` elements, and `cite` and `onclick` attributes on any allowed element.
It will also replace `` elements with their child nodes.

```js
const sanitizer = new Sanitizer({
  elements: ["p", "div"],
  replaceWithChildrenElements: ["b"],
  attributes: ["cite", "onclick"],
});
```

The same configuration can also be created using `Sanitizer` methods.
Note that in the following code the `Sanitizer()` constructor takes an empty object, which results in a `Sanitizer` where the underlying configuration includes both `elements` and `attributes` arrays — in other words, an "allow configuration".

```js
// Create empty sanitizer
const sanitizer = new Sanitizer({});

// Use Sanitizer methods to update the properties.
sanitizer.allowElement("p");
sanitizer.allowElement("div");
sanitizer.replaceElementWithChildren("b");
sanitizer.allowAttribute("cite");
sanitizer.allowAttribute("onclick");
```

##### Remove configurations

In "remove configurations" you specify the HTML elements and attributes that you want to remove: any other elements and attributes are permitted by the sanitizer (but may be blocked if you use a safe sanitizer method, or if the element is not allowed in the context).

Remove configurations are created using a `SanitizerConfig` that includes the `removeElements` and/or `removeAttributes` arrays (and not the `elements` or `attributes` arrays).

For example, the following `Sanitizer` configuration would remove the same elements that were allowed in the previous code:

```js
const sanitizer = new Sanitizer({
  removeElements: ["p", "div"],
  removeAttributes: ["cite", "onclick"],
  replaceWithChildrenElements: ["b"],
});
```

The configuration can also be created using `Sanitizer` methods.
To make this a "remove configuration" we have to declare the `removeElements` or `removeAttributes` array when constructing the object (if only one array is specified the other will be defined as part of normalization).

```js
const sanitizer = new Sanitizer({
  removeElements: [],
});
sanitizer.removeElement("p");
sanitizer.removeElement("div");
sanitizer.replaceElementWithChildren("b");
sanitizer.removeAttribute("cite");
sanitizer.removeAttribute("onclick");
```

#### Adding and removing from `Sanitizer` configurations

`Sanitizer` is recommended when you're using a configuration object that you might want to reuse or modify.
Whether the sanitizer has an allow or remove configuration depends on the `SanitizerConfig` passed when the object is created.
For example, if you pass a configuration object that has the `elements` or `attributes` array (or an empty object) the sanitizer will have an allow configuration.

In the examples above we created an allow configuration and then called `allowElement()`, `allowAttribute()`, and `replaceElementWithChildren()` to allow additional elements and attributes, and similarly we created a remove configuration and called `removeElement()` and `removeAttribute()` to specify additional elements to remove.

You can also call the allow methods on a remove configuration, and the remove methods on an allow configuration — but they behave differently.
When you call the allow methods on an allow sanitizer the specified elements and attributes are added to the underlying `elements` and `attributes` array.
However if you call those methods on a remove sanitizer there is no `elements` and `attributes` array; instead the specified element is _removed_ from the corresponding `removeElements` or `removeAttributes` array, if present.
This works because allowing an element in an allow sanitizer is the same as "not removing" an element in a remove sanitizer.

You can call all the `Sanitizer` methods on either an allow or remove sanitizer, and the method will make whatever changes it is able that result in a valid configuration.
For example, if you add an element the method will either add it to `elements` or remove it from `removeElements` if present, depending on the type of sanitizer, and also remove the same element from the `replaceWithChildrenElements` array, if present.

Some operations that are possible for an allow configuration are not possible for a remove configuration.
For example, per-element attributes are defined in the `elements` array, which is not present in a remove sanitizer.

The methods return `true` or `false` to indicate whether or not they modified the underlying configuration.
So if you call `allowElement()` on an allow configuration and the specified element is not present, it will be added to the `elements` array and the method will return `true`.
But if the element is already present then the method would return `false`.
Note that if you call the same method to set a per-element attribute, this will return `false` if called on a remove sanitizer, because the change cannot be made.

### Built-in configurations

#### XSS-safe baseline configuration

The XSS-safe baseline configuration defines the items that must be removed from an input in order to make it XSS-safe:

- ``, `<frame>`, ``, `<object>`, `<script>`, and `<use>`.
- All event handler content attributes, such as `onafterprint`, `onbeforeinput`, and so on.

The configuration is automatically applied to `Element.setHTML()` and the other safe sanitization methods, and ensures that XSS-unsafe items are removed from the output even if they are allowed by a passed sanitizer.
You can also call `removeUnsafe` on a `Sanitizer` instance to apply this configuration and make it XSS-safe.

#### Default sanitizer configuration

The default sanitizer configuration is more restrictive than the XSS-safe baseline.
It defines the sanitizer that is used if you call `Element.setHTML()` or the other safe sanitization methods without passing a sanitizer object.
It is also the configuration that is returned by the `Sanitizer()` constructor when no configuration is set.

The configuration removes the following sorts of items:

1. Those that are known to be XSS-unsafe (as specified in the XSS-safe baseline configuration).
2. Additional items that might be used in clickjacking, spoofing, or other attacks.
3. Comments and `data-*` attributes.

Therefore it provides a sanitizer with a minimal attack surface, which is still suitable for the majority of sanitization use cases.

For a listing of the allowed elements and attributes, see Default sanitizer configuration.
