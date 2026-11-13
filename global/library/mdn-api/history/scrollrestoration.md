---
title: "History: scrollRestoration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/history/scrollrestoration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# History: scrollRestoration property

The **`scrollRestoration`** property of the `History`
interface allows web applications to explicitly set default scroll restoration behavior
on history navigation.

## Value

One of the following:

- `auto`
    The location on the page to which the user has scrolled will be restored.
- `manual`
    The location on the page is not restored. The user will have to scroll to the
    location manually.

## Examples

### Query the current scroll restoration behavior

```js
const scrollRestoration = history.scrollRestoration;
if (scrollRestoration === "manual") {
  console.log(
    "The location on the page is not restored, user will need to scroll manually.",
  );
}
```

### Prevent automatic page location restoration

```js
history.scrollRestoration = "manual";
```
