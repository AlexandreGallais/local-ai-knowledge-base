# common/src/directives/ng_optimized_image/image_loaders/netlify_loader

## provideNetlifyLoader

```ts
export function provideNetlifyLoader(path?: string)
```

Function that generates an ImageLoader for Netlify and turns it into an Angular provider.

@param path optional URL of the desired Netlify site. Defaults to the current site.
@returns Set of providers to configure the Netlify loader.

@publicApi