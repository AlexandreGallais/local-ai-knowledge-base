# common/src/directives/ng_optimized_image/image_loaders/imgix_loader

## provideImgixLoader

```ts
export const provideImgixLoader: (path: string)
```

Function that generates an ImageLoader for Imgix and turns it into an Angular provider.

@param path path to the desired Imgix origin,
e.g. https://somepath.imgix.net or https://images.mysite.com
@returns Set of providers to configure the Imgix loader.

@see [Image Optimization Guide](guide/image-optimization)
@publicApi