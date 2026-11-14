---
title: "TypeScript 6.0 (part 2 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 6.0.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 6.0 (part 2 of 4)

## The `dom` lib Now Contains `dom.iterable` and `dom.asynciterable`

TypeScript's `lib` option allows you to specify which global declarations your target runtime has.
One option is `dom` to represent web environments (i.e. browsers, who implement the DOM APIs).
Previously, the DOM APIs were partially split out into `dom.iterable` and `dom.asynciterable` for environments that didn't support `Iterable`s and `AsyncIterable`s.
This meant that you had to explicitly add `dom.iterable` to use iteration methods on DOM collections like `NodeList` or `HTMLCollection`.

In TypeScript 6.0, the contents of `lib.dom.iterable.d.ts` and `lib.dom.asynciterable.d.ts` are fully included in `lib.dom.d.ts`.
You can still reference `dom.iterable` and `dom.asynciterable` in your configuration file's `"lib"` array, but they are now just empty files.

```ts
// Before TypeScript 6.0, this required "lib": ["dom", "dom.iterable"]
// Now it works with just "lib": ["dom"]
for (const element of document.querySelectorAll("div")) {
    console.log(element.textContent);
}
```

This is a quality-of-life improvement that eliminates a common point of confusion, since no major modern browser lacks these capabilities.
If you were already including both `dom` and `dom.iterable`, you can now simplify to just `dom`.

See more at this issue and its corresponding pull request.
