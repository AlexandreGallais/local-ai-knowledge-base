---
title: "HTMLModElement: dateTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmodelement/datetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLModElement: dateTime property

The **`dateTime`** property of the `HTMLModElement` interface is a string containing a machine-readable date with an optional time value. It reflects the `datetime` HTML attribute of the `` and `` elements.

## Value

A string. For valid string formats, see the `datetime` valid values.

## Examples

Given the following HTML:

```html
<p>The paragraph <del datetime="2021-11-01">has been</del> changed</p>
```

We can get the value of the `dateTime` attribute of the `` element:

```js
const deletedText = document.querySelector("del");
console.log(deletedText.dateTime); // "2021-11-01"
```

We can also set the `dateTime` property. Here, we create an `` element, then set the `dateTime` property of the `` element to the current date in `YYYY-MM-DD` format then insert it after the deleted text:

```js
const insertedText = document.createElement("ins");
const now = new Date();
insertedText.dateTime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
insertedText.appendChild(document.createTextNode("was"));
deletedText.insertAdjacentElement("afterend", insertedText);
```

If our script ran on January 9, 2025, our HTML would be as follows:

```html
<p>
  The paragraph <del datetime="2021-11-01">has been</del
  ><ins datetime="2025-1-9">was</ins> changed
</p>
```

## See also

- ``
- ``
- `HTMLModElement`
- `HTMLModElement.cite`
- `HTMLTimeElement.dateTime`
- Date strings
- Local date and time strings
- `Date`
- `Element.insertAdjacentElement()`
