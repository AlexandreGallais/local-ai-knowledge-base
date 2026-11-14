# platform-browser/src/browser/title

## Title

```ts
export class Title
```

A service that can be used to get and set the title of a current HTML document.

Since an Angular application can't be bootstrapped on the entire HTML document (`<html>` tag)
it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
(representing the `<title>` tag). Instead, this service can be used to set and get the current
title value.

@publicApi

## Title.getTitle

```ts
getTitle(): string
```

Get the title of the current HTML document.

## Title.setTitle

```ts
setTitle(newTitle: string)
```

Set the title of the current HTML document.
@param newTitle