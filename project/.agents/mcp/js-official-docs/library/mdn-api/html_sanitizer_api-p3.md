---
title: "HTML Sanitizer API (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/html_sanitizer_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTML Sanitizer API (part 3 of 3)

### Sanitization and Trusted Types

The Trusted Types API provides mechanisms to ensure that inputs are passed through a user-specified transformation function before being passed to an API that might execute that input.
This transformation function is most commonly used to sanitize the input but it doesn't have to: the purpose of the API is primarily to make it easy for developers to audit sanitization code, not to define how or if sanitization is done.

The safe HTML sanitization methods don't use trusted types.
Because they always filter all XSS-unsafe entities before input HTML is injected, there is no need to sanitize the input string, or audit the methods.

However the unsafe HTML sanitization methods may inject untrusted HTML, depending on the sanitizer, and so will work with trusted types.
The methods can take either a string or a `TrustedType` as input.
If a sanitizer is also supplied, the transformation function will be run first, and then the sanitizer.

Note that the behavior of the transformation function in this case will depend on the website policy (which might be to reject all use of the unsafe methods).

### Third-party sanitization libraries

Prior to the Sanitizer API, developers typically filtered input strings using third-party libraries such as DOMPurify, perhaps called from transformation functions in trusted types.

These should not be necessary when using the safe HTML sanitization methods as the API is integrated with the browser, and is more aware of the parsing context and what code is allowed to execute than external parser libraries can be.

They may be useful with the unsafe HTML methods and trusted types, depending on website trusted type policies.

## Interfaces

- `Sanitizer`
    A reusable sanitizer configuration object that defines what elements and attributes should be allowed/removed when sanitizing untrusted strings of HTML.
    This is used in the methods that insert strings of HTML into the DOM or Document.
- `SanitizerConfig`
    A dictionary that defines a sanitizer configuration.
    This can be used in the same places as `Sanitizer` but is likely to be less efficient to use and reuse.

## Extensions to other interfaces

### XSS-safe methods

- `Element.setHTML()`
    Parse a string of HTML into a subtree of nodes, dropping any elements that are invalid in the context of the element.
    Then drop any elements and attributes that are not allowed by the sanitizer configuration, and any that are considered XSS-unsafe (even if allowed by the configuration).
    The subtree is then inserted into the DOM as a subtree of the element.
- `ShadowRoot.setHTML()`
    Parse a string of HTML into a subtree of nodes.
    Then drop any elements and attributes that are not allowed by the sanitizer configuration, and any that are considered XSS-unsafe (even if allowed by the configuration).
    The subtree is then inserted as a subtree of the `ShadowRoot`.
- `Document.parseHTML()`
    Parse a string of HTML into a subtree of nodes.
    Then drop any elements and attributes that are not allowed by the sanitizer configuration, and any that are considered XSS-unsafe (even if allowed by the configuration).
    The subtree is then set as the root of the `Document`.

### XSS-unsafe methods

- `Element.setHTMLUnsafe()`
    Parse a string of HTML into a subtree of nodes, dropping any elements that are invalid in the context of the element.
    Then drop any elements and attributes that are not allowed by the sanitizer: if no sanitizer is specified allow all elements.
    The subtree is then inserted into the DOM as a subtree of the element.
- `ShadowRoot.setHTMLUnsafe()`
    Parse a string of HTML into a subtree of nodes.
    Then drop any elements and attributes that are not allowed by the sanitizer: if no sanitizer is specified allow all elements.
    The subtree is then inserted as a subtree of the `ShadowRoot`.
- `Document.parseHTMLUnsafe()`
    Parse a string of HTML into a subtree of nodes.
    Then drop any elements and attributes that are not allowed by the sanitizer: if no sanitizer is specified allow all elements.
    The subtree is then set as the root of the `Document`.

## Examples

The following examples show how to use the sanitizer API using the _default_ sanitizer.

### Using `Element.setHTML()` with the default sanitizer

In most cases calling `Element.setHTML()` without passing a sanitizer can be used as a drop-in replacement for `Element.innerHTML`.
The code below demonstrates how the method is used to sanitize the HTML input before it is injected into an element with id of `target`.

```js
const untrustedString = "abc <script>alert(1)<" + "/script> def"; // Untrusted HTML (perhaps from user input)
const someTargetElement = document.getElementById("target");

// someElement.innerHTML = untrustedString;
someElement.setHTML(untrustedString);

console.log(target.innerHTML); // abc def
```

The ``<script>`` element is not allowed by the default sanitizer, or by the `setHTML()` method, so the `alert()` is removed.

Note that using `Element.setHTMLUnsafe()` with the default sanitizer will sanitize the same HTML entities.
The main difference is that if you use this method with Trusted Types it may still be audited:

```js
someElement.setHTMLUnsafe(untrustedString);
```

### Using an allow sanitizer configuration

This code shows how you might use `Element.setHTMLUnsafe()` with an allow sanitizer that allows only ``, ``, and `` elements.
All other elements in the input string would be removed.

```js
const sanitizer = new Sanitizer({ elements: ["p", "b", "div"] });
someElement.setHTMLUnsafe(untrustedString, { sanitizer });
```

Note that in this case you should normally use `setHTML()`.
You should only use `Element.setHTMLUnsafe()` if you need to allow XSS-unsafe elements or attributes.
