# common/src/directives/ng_optimized_image/image_loaders/imagekit_loader

## provideImageKitLoader

```ts
export const provideImageKitLoader: (path: string)
```

Function that generates an ImageLoader for ImageKit and turns it into an Angular provider.

@param path Base URL of your ImageKit images
This URL should match one of the following formats:
https://ik.imagekit.io/myaccount
https://subdomain.mysite.com
@returns Set of providers to configure the ImageKit loader.

@see [Image Optimization Guide](guide/image-optimization)
@publicApi