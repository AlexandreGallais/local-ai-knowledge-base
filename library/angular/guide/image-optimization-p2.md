---
title: "Getting started with NgOptimizedImage (part 2 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/image-optimization.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Getting started with NgOptimizedImage (part 2 of 3)

## Performance Features

NgOptimizedImage includes a number of features designed to improve loading performance in your app. These features are described in this section.

### Add resource hints

A `preconnect` resource hint for your image origin ensures that the LCP image loads as quickly as possible.

Preconnect links are automatically generated for domains provided as an argument to a loader. If an image origin cannot be automatically identified, and no preconnect link is detected for the LCP image, `NgOptimizedImage` will warn during development. In that case, you should manually add a resource hint to `index.html`. Within the `<head>` of the document, add a `link` tag with `rel="preconnect"`, as shown below:

```html
<link rel="preconnect" href="https://my.cdn.origin" />
```

To disable preconnect warnings, inject the `PRECONNECT_CHECK_BLOCKLIST` token:

```ts

providers: [
{provide: PRECONNECT_CHECK_BLOCKLIST, useValue: 'https://your-domain.com'}
],

```

See more information on automatic preconnect generation here.

### Request images at the correct size with automatic `srcset`

Defining a `srcset` attribute ensures that the browser requests an image at the right size for your user's viewport, so it doesn't waste time downloading an image that's too large. `NgOptimizedImage` generates an appropriate `srcset` for the image, based on the presence and value of the `sizes` attribute on the image tag.

#### Fixed-size images

If your image should be "fixed" in size (i.e. the same size across devices, except for pixel density), there is no need to set a `sizes` attribute. A `srcset` can be generated automatically from the image's width and height attributes with no further input required.

Example srcset generated:

```html
<img ... srcset="image-400w.jpg 1x, image-800w.jpg 2x" />
```

#### Responsive images

If your image should be responsive (i.e. grow and shrink according to viewport size), then you will need to define a `sizes` attribute to generate the `srcset`.

If you haven't used `sizes` before, a good place to start is to set it based on viewport width. For example, if your CSS causes the image to fill 100% of viewport width, set `sizes` to `100vw` and the browser will select the image in the `srcset` that is closest to the viewport width (after accounting for pixel density). If your image is only likely to take up half the screen (ex: in a sidebar), set `sizes` to `50vw` to ensure the browser selects a smaller image. And so on.

If you find that the above does not cover your desired image behavior, see the documentation on advanced sizes values.

Note that for lazy-loaded images, `NgOptimizedImage` automatically prepends `"auto"` to the provided `sizes` value. This is an optimization that increases the accuracy of srcset selection on browsers which support `sizes="auto"`, and is ignored by browsers which do not. Images that are not lazy-loaded, such as `priority` images, keep the `sizes` value as provided.

By default, the responsive breakpoints are:

`[16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840]`

If you would like to customize these breakpoints, you can do so using the `IMAGE_CONFIG` provider:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
    }
  },
],
```

If you would like to manually define a `srcset` attribute, you can provide your own using the `ngSrcset` attribute:

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" />
```

If the `ngSrcset` attribute is present, `NgOptimizedImage` generates and sets the `srcset` based on the sizes included. Do not include image file names in `ngSrcset` - the directive infers this information from `ngSrc`. The directive supports both width descriptors (e.g. `100w`) and density descriptors (e.g. `1x`).

```html
<img ngSrc="hero.jpg" ngSrcset="100w, 200w, 300w" sizes="50vw" />
```

### Disabling automatic srcset generation

To disable srcset generation for a single image, you can add the `disableOptimizedSrcset` attribute on the image:

```html
<img ngSrc="about.jpg" disableOptimizedSrcset />
```

### Disabling image lazy loading

By default, `NgOptimizedImage` sets `loading=lazy` for all images that are not marked `priority`. You can disable this behavior for non-priority images by setting the `loading` attribute. This attribute accepts values: `eager`, `auto`, and `lazy`. See the documentation for the standard image `loading` attribute for details.

```html
<img ngSrc="cat.jpg" width="400" height="200" loading="eager" />
```

### Controlling image decoding

By default, `NgOptimizedImage` sets `decoding="auto"` for all images. This allows the browser to decide the optimal time to decode an image after it has been fetched. When an image is marked as `priority`, Angular automatically sets `decoding="sync"` to ensure the image is decoded and painted as early as possible helping improve **Largest Contentful Paint (LCP)** performance.

You can override the default `auto` for non-priority images by explicitly setting the `decoding` attribute. Priority images always use `decoding="sync"`.
See the documentation for the standard image `decoding` attribute for details.

```html
<!-- Default: decoding is 'auto' -->
<img ngSrc="gallery/landscape.jpg" width="1200" height="800" />

<!-- Decode the image asynchronously to avoid blocking the main thread.-->
<img ngSrc="gallery/preview.jpg" width="600" height="400" decoding="async" />

<!-- Priority images automatically use decoding="sync" -->
<img ngSrc="awesome.jpg" width="500" height="625" priority />

<!-- Decode immediately (can block) when you need the pixels right away -->
<img ngSrc="hero.jpg" width="1600" height="900" decoding="sync" />
```

**Allowed values**

- `auto` (default): lets the browser choose the optimal strategy.
- `async`: decodes the image asynchronously, avoiding main‑thread blocking where possible.
- `sync`: decodes the image immediately; can block rendering but ensures pixels are ready as soon as the image is available.

### Advanced 'sizes' values

You may want to have images displayed at varying widths on differently-sized screens. A common example of this pattern is a grid- or column-based layout that renders a single column on mobile devices, and two columns on larger devices. You can capture this behavior in the `sizes` attribute, using a "media query" syntax, such as the following:

```html
<img ngSrc="cat.jpg" width="400" height="200" sizes="(max-width: 768px) 100vw, 50vw" />
```

The `sizes` attribute in the above example says "I expect this image to be 100 percent of the screen width on devices under 768px wide. Otherwise, I expect it to be 50 percent of the screen width.

For additional information about the `sizes` attribute, see web.dev or mdn.

## Configuring an image loader for `NgOptimizedImage`

A "loader" is a function that generates an image transformation URL for a given image file. When appropriate, `NgOptimizedImage` sets the size, format, and image quality transformations for an image.

`NgOptimizedImage` provides both a generic loader that applies no transformations, as well as loaders for various third-party image services. It also supports writing your own custom loader.

| Loader type                            | Behavior                                                                                                                                                                                                                       |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generic loader                         | The URL returned by the generic loader will always match the value of `src`. In other words, this loader applies no transformations. Sites that use Angular to serve images are the primary intended use case for this loader. |
| Loaders for third-party image services | The URL returned by the loaders for third-party image services will follow API conventions used by that particular image service.                                                                                              |
| Custom loaders                         | A custom loader's behavior is defined by its developer. You should use a custom loader if your image service isn't supported by the loaders that come preconfigured with `NgOptimizedImage`.                                   |

Based on the image services commonly used with Angular applications, `NgOptimizedImage` provides loaders preconfigured to work with the following image services:

| Image Service             | Angular API               | Documentation                                                               |
| :------------------------ | :------------------------ | :-------------------------------------------------------------------------- |
| Cloudflare Image Resizing | `provideCloudflareLoader` | Documentation   |
| Cloudinary                | `provideCloudinaryLoader` | Documentation |
| ImageKit                  | `provideImageKitLoader`   | Documentation                                  |
| Imgix                     | `provideImgixLoader`      | Documentation                                    |
| Netlify                   | `provideNetlifyLoader`    | Documentation               |

To use the **generic loader** no additional code changes are necessary. This is the default behavior.

### Built-in Loaders

To use an existing loader for a **third-party image service**, add the provider factory for your chosen service to the `providers` array. In the example below, the Imgix loader is used:

```ts
providers: [
  provideImgixLoader('https://my.base.url/'),
],
```

The base URL for your image assets should be passed to the provider factory as an argument. For most sites, this base URL should match one of the following patterns:

- <https://yoursite.yourcdn.com>
- <https://subdomain.yoursite.com>
- <https://subdomain.yourcdn.com/yoursite>

You can learn more about the base URL structure in the docs of a corresponding CDN provider.

### Custom Loaders

To use a **custom loader**, provide your loader function as a value for the `IMAGE_LOADER` DI token. In the example below, the custom loader function returns a URL starting with `https://example.com` that includes `src`, `width`, and `height` as URL parameters.

```ts
providers: [
  {
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      return `https://example.com/images?src=${config.src}&width=${config.width}&height=${config.height}`;
    },
  },
],
```

A loader function for the `NgOptimizedImage` directive takes an object with the `ImageLoaderConfig` type (from `@angular/common`) as its argument and returns the absolute URL of the image asset. The `ImageLoaderConfig` object contains the `src` property, and optional `width`, `height`, and `loaderParams` properties.

NOTE: even though the `width` property may not always be present, a custom loader must use it to support requesting images at various widths in order for `ngSrcset` to work properly.

### The `loaderParams` Property

There is an additional attribute supported by the `NgOptimizedImage` directive, called `loaderParams`, which is specifically designed to support the use of custom loaders. The `loaderParams` attribute takes an object with any properties as a value, and does not do anything on its own. The data in `loaderParams` is added to the `ImageLoaderConfig` object passed to your custom loader, and can be used to control the behavior of the loader.

A common use for `loaderParams` is controlling advanced image CDN features.

### Using the `transform` property with built-in loaders

The built-in loaders for Cloudinary, Cloudflare, ImageKit, and Imgix support a special `transform` property within `loaderParams`. This property allows you to apply custom image transformations provided by your CDN.

The `transform` property accepts two formats:

#### String format

Provide transformations as a comma-separated string using your CDN's transformation syntax:

```html
<img
  ngSrc="my-image.jpg"
  width="400"
  height="300"
  [loaderParams]="{transform: 'e_grayscale,r_10'}"
/>
```

#### Object format

Provide transformations as an object with key-value pairs.

```html
<img
  ngSrc="my-image.jpg"
  width="400"
  height="300"
  [loaderParams]="{transform: {e: 'grayscale', r: 10}}"
/>
```

NOTE: The `transform` property is not supported by the Netlify loader, as Netlify's image CDN does not provide custom transformation parameters.

### Example custom loader

The following shows an example of a custom loader function. This example function concatenates `src`, `width`, and `height`, and uses `loaderParams` to control a custom CDN feature for rounded corners:

```ts
const myCustomLoader = (config: ImageLoaderConfig) => {
  let url = `https://example.com/images/${config.src}?`;
  let queryParams = [];
  if (config.width) {
    queryParams.push(`w=${config.width}`);
  }
  if (config.height) {
    queryParams.push(`h=${config.height}`);
  }
  if (config.loaderParams?.roundedCorners) {
    queryParams.push('mask=corners&corner-radius=5');
  }
  return url + queryParams.join('&');
};
```

Note that in the above example, we've invented the 'roundedCorners' property name to control a feature of our custom loader. We could then use this feature when creating an image, as follows:

```html
<img ngSrc="profile.jpg" width="300" height="300" [loaderParams]="{roundedCorners: true}" />
```
