# core/src/render3/after_render/api

## AfterRenderRef

```ts
export interface AfterRenderRef
```

A callback that runs after render.

@publicApi

## AfterRenderRef.destroy

```ts
destroy(): void
```

Shut down the callback, preventing it from being called again.