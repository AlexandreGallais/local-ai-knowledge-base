# common/src/directives/ng_optimized_image/image_loaders/cloudinary_loader

## provideCloudinaryLoader

```ts
export const provideCloudinaryLoader: (path: string)
```

Function that generates an ImageLoader for Cloudinary and turns it into an Angular provider.

@param path Base URL of your Cloudinary images
This URL should match one of the following formats:
https://res.cloudinary.com/mysite
https://mysite.cloudinary.com
https://subdomain.mysite.com
@returns Set of providers to configure the Cloudinary loader.

@see [Image Optimization Guide](guide/image-optimization)
@publicApi