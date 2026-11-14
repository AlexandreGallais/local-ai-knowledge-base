---
title: "HTMLElement: dataset property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/dataset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: dataset property

The **`dataset`** read-only property
of the `HTMLElement` interface provides read/write access to custom data attributes
(`data-*`) on elements. It exposes a map of strings
(`DOMStringMap`) with an entry for each `data-*` attribute.

> **Note:**
> The `dataset` property itself can be read, but not directly written.
> Instead, all writes must be to the individual properties within the
> `dataset`, which in turn represent the data attributes.

## Value

A `DOMStringMap`.

An HTML `data-*` attribute and its corresponding DOM
`dataset.property` modify their shared name according to where
they are read or written:

- In HTML
    The attribute name begins with `data-`. It can contain only letters,
    numbers, dashes (`-`), periods (`.`), colons (`:`),
    and underscores (`_`). Any ASCII capital letters (`A` to
    `Z`) are converted to lowercase.
- In JavaScript
    The property name of a custom data attribute is the same as the HTML attribute
    without the `data-` prefix. Single dashes (`-`) are removed, and the next ASCII
    character after a removed dash is capitalized to form the property's camel-cased name.

Details and examples of converting between the HTML and JavaScript forms is described in more detail in the next section.

In addition to the information below, you'll find a how-to guide for using HTML data
attributes in our article _Using data attributes_.

### Name conversion

- `dash-style` to `camelCase` conversion
    A custom data attribute name is transformed to a key for the
    `DOMStringMap` entry by the following:
    1. Lowercase all ASCII capital letters (`A` to
       `Z`);
    2. Remove the prefix `data-` (including the dash);
    3. For any dash (`U+002D`) followed by an ASCII lowercase letter
       `a` to `z`, remove the dash and uppercase the letter;
    4. Other characters (including other dashes) are left unchanged.

- `camelCase` to `dash-style` conversion
    The opposite transformation, which maps a key to an attribute name, uses the
    following:
    1. **Restriction:** Before transformation, a dash _must not_ be
       immediately followed by an ASCII lowercase letter `a` to
       `z`;
    2. Add the `data-` prefix;
    3. Add a dash before any ASCII uppercase letter `A` to `Z`,
       then lowercase the letter;
    4. Other characters are left unchanged.

For example, a `data-abc-def` attribute corresponds to
`dataset.abcDef`.

### Accessing values

- Attributes can be set and read by the camelCase name/key as an object property of
  the dataset: `element.dataset.keyname`.
- Attributes can also be set and read using bracket syntax:
  `element.dataset['keyname']`.
- The `in` operator can check if a given attribute exists:
  `'keyname' in element.dataset`. Note that this will walk the prototype chain of `dataset` and may be unsafe if you have external code that may pollute the prototype chain. Several alternatives exist, such as `Object.hasOwn(element.dataset, 'keyname')`, or just checking if `element.dataset.keyname !== undefined`.

### Setting values

- When the attribute is set, its value is always converted to a string.
  For example: `element.dataset.example = null` is
  converted into `data-example="null"`.

- To remove an attribute, you can use the `delete` operator: `delete element.dataset.keyname`.

## Examples

```html
<div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth>
  Carina Anand
</div>
```

```js
const el = document.querySelector("#user");

// el.id === 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'carinaanand'
// el.dataset.dateOfBirth === ''

// set a data attribute
el.dataset.dateOfBirth = "1960-10-03";
// Result on JS: el.dataset.dateOfBirth === '1960-10-03'
// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-date-of-birth="1960-10-03">Carina Anand</div>

delete el.dataset.dateOfBirth;
// Result on JS: el.dataset.dateOfBirth === undefined
// Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand">Carina Anand</div>

if (el.dataset.someDataAttr === undefined) {
  el.dataset.someDataAttr = "mydata";
  // Result on JS: 'someDataAttr' in el.dataset === true
  // Result on HTML: <div id="user" data-id="1234567890" data-user="carinaanand" data-some-data-attr="mydata">Carina Anand</div>
}
```

## See also

- The HTML `data-*` class
  of global attributes
- Using data attributes
- `Element.getAttribute()` and `Element.setAttribute()`
