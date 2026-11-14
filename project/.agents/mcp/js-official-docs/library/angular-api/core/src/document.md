# core/src/document

## DOCUMENT

```ts
export const DOCUMENT = new InjectionToken<Document>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'DocumentToken' : '', )
```

A DI Token representing the main rendering context.
In a browser and SSR this is the DOM Document.
When using SSR, that document is created by [Domino](https://github.com/angular/domino).

@see [Accessing Document via DI](guide/ssr#accessing-document-via-di)

@publicApi