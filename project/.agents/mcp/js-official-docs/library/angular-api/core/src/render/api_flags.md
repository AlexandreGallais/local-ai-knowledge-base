# core/src/render/api_flags

## RendererType2

```ts
export interface RendererType2
```

Used by `RendererFactory2` to associate custom rendering data and styles
with a rendering implementation.
 @publicApi

## RendererType2.id

```ts
id: string
```

A unique identifying string for the new renderer, used when creating
unique styles for encapsulation.

## RendererType2.encapsulation

```ts
encapsulation: ViewEncapsulation
```

The view encapsulation type, which determines how styles are applied to
DOM elements. One of
- `Emulated` (default): Emulate native scoping of styles.
- `Native`: Use the native encapsulation mechanism of the renderer.
- `ShadowDom`: Use modern [Shadow
DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
create a ShadowRoot for component's host element.
- `None`: Do not provide any template or style encapsulation.

## RendererType2.styles

```ts
styles: string[]
```

Defines CSS styles to be stored on a renderer instance.

## RendererType2.data

```ts
data: {[kind: string]: any}
```

Defines arbitrary developer-defined data to be stored on a renderer instance.
This is useful for renderers that delegate to other renderers.

## RendererType2.getExternalStyles

```ts
getExternalStyles?: ((encapsulationId?: string)
```

A function used by the framework to create the list of external runtime style URLs.

## RendererStyleFlags2

```ts
export enum RendererStyleFlags2
```

Flags for renderer-specific style modifiers.
@publicApi