---
title: "Element: matches() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/matches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: matches() method

The **`matches()`** method of the `Element` interface tests whether the element would be selected by the specified CSS selector.

## Syntax

```js
matches(selectors)
```

### Parameters

- `selectors`
    A string containing valid CSS selectors to test the `Element` against.

### Return value

`true` if the `Element` matches the `selectors`. Otherwise, `false`.

### Exceptions

- `SyntaxError` `DOMException`
    Thrown if `selectors` cannot be parsed as a CSS selector list.

## Examples

### HTML

```html
<ul id="birds">
  <li>Orange-winged parrot</li>
  <li class="endangered">Philippine eagle</li>
  <li>Great white pelican</li>
</ul>
```

### JavaScript

```js
const birds = document.querySelectorAll("li");

for (const bird of birds) {
  if (bird.matches(".endangered")) {
    console.log(`The ${bird.textContent} is endangered!`);
  }
}
```

This will log "The Philippine eagle is endangered!" to the console, since the element
has indeed a `class` attribute with value `endangered`.

## See also

- CSS selectors module
- Other `Element` methods that take selectors: `Element.querySelector()`, `Element.querySelectorAll()`, and `element.closest()`.
