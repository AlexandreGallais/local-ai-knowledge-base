# core/src/sanitization/bypass

## SafeValue

```ts
export interface SafeValue {}
```

Marker interface for a value that's safe to use in a particular context.

@publicApi

## SafeHtml

```ts
export interface SafeHtml extends SafeValue {}
```

Marker interface for a value that's safe to use as HTML.

@publicApi

## SafeStyle

```ts
export interface SafeStyle extends SafeValue {}
```

Marker interface for a value that's safe to use as style (CSS).

@publicApi

## SafeScript

```ts
export interface SafeScript extends SafeValue {}
```

Marker interface for a value that's safe to use as JavaScript.

@publicApi

## SafeUrl

```ts
export interface SafeUrl extends SafeValue {}
```

Marker interface for a value that's safe to use as a URL linking to a document.

@publicApi

## SafeResourceUrl

```ts
export interface SafeResourceUrl extends SafeValue {}
```

Marker interface for a value that's safe to use as a URL to load executable code from.

@publicApi