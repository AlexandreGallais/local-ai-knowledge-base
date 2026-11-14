# common/src/directives/ng_optimized_image/image_loaders/cloudflare_loader

## provideCloudflareLoader

```ts
export const provideCloudflareLoader: (path: string)
```

Function that generates an ImageLoader for [Cloudflare Image
Resizing](https://developers.cloudflare.com/images/image-resizing/) and turns it into an Angular
provider. Note: Cloudflare has multiple image products - this provider is specifically for
Cloudflare Image Resizing; it will not work with Cloudflare Images or Cloudflare Polish.

@param path Your domain name, e.g. https://mysite.com
@returns Provider that provides an ImageLoader function

@see [Image Optimization Guide](guide/image-optimization)
@publicApi