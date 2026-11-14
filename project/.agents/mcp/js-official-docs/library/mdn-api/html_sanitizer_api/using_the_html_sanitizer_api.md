---
title: "Using the HTML Sanitizer API (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_sanitizer_api/using_the_html_sanitizer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the HTML Sanitizer API

The HTML Sanitizer API provides methods that allow developers to safely inject untrusted HTML into an `Element`, a `ShadowRoot`, or a `Document`.
The API also gives developers the flexibility to further restrict or expand what HTML entities are allowed if needed.

## Safe sanitization by default

The most common use case for the API is to safely inject a user-provided string into an `Element`.
Unless the string to be injected _needs_ to contain unsafe HTML entities, you can use `Element.setHTML()` as a drop in replacement for `Element.innerHTML`.

For example, the following code will remove all XSS-unsafe elements and attributes in the input string (in this case the `<script>` element), along with any elements that aren't permitted as children of the target element by the HTML specification:

```js
const untrustedString = "abc <script>alert(1)<" + "/script> def";
const someElement = document.getElementById("target");

// someElement.innerHTML = untrustedString;
someElement.setHTML(untrustedString);

console.log(someElement.innerHTML); // abc def
```

The other XSS-safe methods, `ShadowRoot.setHTML()` and `Document.parseHTML()`, are used in the same way.

## Using a sanitizer configuration

All of the sanitization methods can be passed a `Sanitizer` or `SanitizerConfig`, which defines what elements, attributes and comments are either allowed, or should be removed, when inserting strings of HTML.

The `Sanitizer` is essentially a wrapper around a `SanitizerConfig`, performing some optimizations and normalizations that make it easier and safer to use, share and modify,

### Using safe methods with a sanitizer

The XSS-safe methods always remove any unsafe HTML elements or attributes (as discussed in Safe sanitization by default above).

You can pass a sanitizer as the second argument to the safe methods to allow the same or fewer entities than the default configuration.
For example, if you know that only `` and `` elements are expected in the context of `someElement` below, you might create a sanitizer configuration that allows only those elements:

```js
const sanitizerOne = new Sanitizer({ elements: ["p", "a"] });
sanitizerOne.allowAttribute("href");
someElement.setHTML(untrustedString, { sanitizer: sanitizerOne });
```

### Allowing unsafe sanitization

Sometimes you might want to inject input that needs to contain potentially unsafe elements or attributes.
In this case you could use one of the API XSS-unsafe methods: `Element.setHTMLUnsafe()`, `ShadowRoot.setHTMLUnsafe()`, and `Document.parseHTMLUnsafe()`.

To somewhat reduce the risk, you might first construct the default sanitizer, which only allows XSS-safe elements, and then allow just those unsafe entities that are expected in the input.

For example, in the following sanitizer all safe elements are allowed, and we further allow the unsafe `onclick` handler on `button` elements (only).

```js
const untrustedString = '<button onclick="alert(1)">Button text</button>';
const someElement = document.getElementById("target");

const sanitizerOne = new Sanitizer(); // Default sanitizer
sanitizerOne.allowElement({ name: "button", attributes: ["onclick"] });
someElement.setHTMLUnsafe(untrustedString, { sanitizer: sanitizerOne });
```

With this code the `alert(1)` would be allowed, and there is a potential issue that the attribute might be used for malicious purposes.
However we know that all other XSS unsafe HTML entities have been removed, so we only need to worry about this one case, and can put in other mitigations.

The unsafe methods will use any sanitizer configuration you supply (or none), so you need to be careful when using them.
Minimally you should enforce Trusted Types and pass `TrustedHTML` instead of strings into the methods.

## Allow configurations

You can build an "allow" sanitizer configuration by specifying just the set of HTML elements and attributes you want to allow to be injected when using the sanitizer.
This form of configuration is easy to understand, and is useful if you know exactly what HTML entities are should be permitted in the target context.

For example, the following configuration "allows" the `` and `` elements and attributes `cite` and `onclick`.
It also replaces `` elements with their contents (this is a form of "allowing", since the element contents are not removed).

```js
const sanitizer = new Sanitizer({
  elements: ["p", "div"],
  attributes: ["cite", "onclick"],
  replaceWithChildrenElements: ["b"],
});
```

### Allowing elements

The allowed elements can be specified using the `elements` property of the `SanitizerConfig` instance passed to the `Sanitizer()` constructor (or directly to the sanitization methods).

The simplest way to use the property is to specify an array of element names:

```js
const sanitizer = new Sanitizer({
  elements: ["div", "span"],
});
```

But you can also specify each of the allowed elements using an object that defines its `name` and `namespace`, as shown below (`Sanitizer` will automatically infer a namespace if it is able).

```js
const sanitizer = new Sanitizer({
  elements: [
    {
      name: "div",
      namespace: "http://www.w3.org/1999/xhtml",
    },
    {
      name: "span",
      namespace: "http://www.w3.org/1999/xhtml",
    },
  ],
});
```

You can also add the elements to a `Sanitizer` using `Sanitizer.allowElement()`.
Here we add the same elements to an empty sanitizer:

```js
const sanitizer = new Sanitizer({});
sanitizer.allowElement("div");
sanitizer.allowElement({
  name: "span",
  namespace: "http://www.w3.org/1999/xhtml",
});
```

### Allowing global attributes

To allow attributes globally, on any element where allowed by the HTML specification, you can use the `attributes` property of the `SanitizerConfig`.

The simplest way to use the `attributes` property is to specify an array of attribute names:

```js
const sanitizer = new Sanitizer({
  attributes: ["cite", "onclick"],
});
```

You can also specify each attribute with the `name` and `namespace` properties, just like elements:

```js
const sanitizer = new Sanitizer({
  attributes: [
    {
      name: "cite",
      namespace: null,
    },
    {
      name: "onclick",
      namespace: null,
    },
  ],
});
```

You can also add each of the allowed attributes to a `Sanitizer` using the `Sanitizer.allowAttribute()` method:

```js
const sanitizer = new Sanitizer({});
sanitizer.allowAttribute("cite");
sanitizer.allowAttribute("onclick");
```

### Allowing/removing attributes on a particular element

You can also allow or remove attributes on a particular element.
Note that this is part of an "allow configuration", because you are in this case still allowing the element to be injected.

To allow an attribute on an element you can specify the element as an object with the `name` and `attributes` properties.
The `attributes` property contains an array of the allowed attributes on the element.

Below we show a sanitizer where the ``, ``, and `` elements are allowed, and the `` element additionally allows the `href`, `rel`, `hreflang` and `type` attributes.

```js
const sanitizer = new Sanitizer({
  elements: [
    "div",
    { name: "a", attributes: ["href", "rel", "hreflang", "type"] },
    "span",
  ],
});
```

Similarly we can specify the attributes that are not allowed on an element using an element object with the `removeAttributes` property.
For example, the following sanitizer would strip the `type` attribute from all `` elements.

```js
const sanitizer = new Sanitizer({
  elements: ["div", { name: "a", removeAttributes: ["type"] }],
});
```

In both cases you can also specify each attribute as an object with `name` and `namespace` properties.
You can also use set the attribute properties using the same element object passed to `Sanitizer.allowElement()`.

Note that it is impossible to define per-element attribute behavior on a `Sanitizer` with a remove configuration, as the (needed) `elements` array is not present.
Other restrictions on per-element attributes are covered in Valid configurations

### Replacing child elements

You can specify an array of elements to replace with their inner content.
This is most commonly used to strip styles from elements.

For example, the following code uses the `replaceWithChildrenElements` property of the `SanitizerConfig` to specify that the `` element should be replaced:

```js
const replaceBoldSanitizer = new Sanitizer({
  replaceWithChildrenElements: ["b"],
});

targetElement.setHTML("This <b>highlighting</b> isn't needed", {
  sanitizer: replaceBoldSanitizer,
});

// Log the result
console.log(targetElement.innerHTML); // This highlighting isn't needed
```

As with elements and attributes, you can also specify the replacement elements with a namespace, or use the `Sanitizer.replaceElementWithChildren()` method:

```js
const sanitizer = new Sanitizer({});
sanitizer.replaceElementWithChildren("b");
sanitizer.replaceElementWithChildren({
  name: "i",
  namespace: "http://www.w3.org/1999/xhtml",
});
```

## Remove configurations

You can build a "remove" sanitizer configuration by specifying the set of HTML elements and attributes you want to remove from the input when using the sanitizer.
All other elements and attributes are allowed by the configuration, although they may be removed if you use the configuration in a safe sanitization method.

> **Note:**
> A sanitizer configuration can include allow lists or remove lists, but not both.

For example, the following configuration removes the `<script>`, `` and `` elements and also the `onclick` attribute.

```js
const sanitizer = new Sanitizer({
  removeElements: ["script", "div", "span"],
  removeAttributes: ["onclick"],
});
```

Specifying elements to remove is more useful when you want to tweak an existing configuration.
For example consider the case where we are using the (safe) default sanitizer, but want to also ensure that some other elements are removed.

```js
const sanitizer = new Sanitizer();
sanitizer.removeElement("div");
```

### Removing elements

The `removeElements` property of a `SanitizerConfig` instance can be used the elements to remove.

The simplest way to use the property is to specify an array of element names:

```js
const sanitizer = new Sanitizer({
  removeElements: ["div", "span"],
});
```

As when allowing element you can also specify each of the elements to remove using an object that defines its `name` and `namespace`.
You can also configure the removed elements using the using the `Sanitizer` API as shown:

```js
const sanitizer = new Sanitizer({});
sanitizer.removeElement("div");
sanitizer.removeElement({
  name: "span",
  namespace: "http://www.w3.org/1999/xhtml",
});
```

### Removing attributes

The `removeElements` property of the `SanitizerConfig` can be used to specify attributes to be globally removed.

The simplest way to use the property is to specify an array of element names:

```js
const sanitizer = new Sanitizer({
  removeAttributes: ["onclick", "lang"],
});
```

You can also specify each of the elements using an object that defines its `name` and `namespace`, and also use `Sanitizer.removeAttribute()` to add an attribute to be removed from all elements.

```js
const sanitizer = new Sanitizer({});
sanitizer.removeAttribute("onclick");
sanitizer.removeAttribute("lang");
```

## Comments and data attributes

The `SanitizerConfig` can also be used to specify whether comments will be filtered from injected content, using the `comments` property, and whether `data-` attributes are allowed without having to add them to the `attributes` array using the `dataAttributes` boolean property.

To allow comments and all `data-*` attributes you might use a configuration like this:

```js
const sanitizer = new Sanitizer({
  comments: true,
  dataAttributes: true,
});
```

You can similarly set the comments or data-attributes properties on an existing sanitizer using `Sanitizer.setComments()` and `Sanitizer.setDataAttributes()`:

```js
const sanitizer = new Sanitizer({});
sanitizer.setComments(true);
sanitizer.setDataAttributes(true);
```

## Sanitizer vs SanitizerConfig

All the sanitization methods can be passed a sanitizer configuration that is either a `Sanitizer` or `SanitizerConfig` instance.

The `SanitizerConfig` provides a compact method for specifying multiple elements or attributes that should be allowed or removed at the same time.
Some care may be required when modifying this object to ensure that it remains a valid configuration.

The `Sanitizer` object is a wrapper around `SanitizerConfig` that provides additional useful functionality:

- The default constructor creates a configuration that allows all XSS-safe elements and attributes, and which is therefore a good starting point for creating either slightly more or slightly less restrictive sanitizers.
- The `Sanitizer` methods ensure that the underlying `SanitizerConfig` remains a valid configuration.
  For example, if you call `allowElement()` to allow an element then the element would also be removed from the underlying `replaceWithChildrenElements` array (if present).
  The normalizations make the configuration more efficient.
- The `Sanitizer.removeUnsafe()` method can be used to remove all XSS-unsafe entities from an existing configuration.
- You can export the configuration to see exactly what entities are allowed and dropped.

Note that if you can use the safe sanitization methods, then you may not need to define a sanitizer configuration at all.
