---
title: "Getting started with NgOptimizedImage (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/image-optimization.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Getting started with NgOptimizedImage

The `NgOptimizedImage` directive makes it easy to adopt performance best practices for loading images.

The directive ensures that the loading of the Largest Contentful Paint (LCP) image is prioritized by:

- Automatically setting the `fetchpriority` attribute on the `` tag
- Lazy loading other images by default
- Automatically generating a preconnect link tag in the document head
- Automatically generating a `srcset` attribute
- Generating a preload hint if app is using SSR

In addition to optimizing the loading of the LCP image, `NgOptimizedImage` enforces a number of image best practices, such as:

- Using image CDN URLs to apply image optimizations
- Preventing layout shift by requiring `width` and `height`
- Warning if `width` or `height` have been set incorrectly
- Warning if the image will be visually distorted when rendered

If you're using a background image in CSS, start here.

NOTE: Although the `NgOptimizedImage` directive was made a stable feature in Angular version 15, it has been backported and is available as a stable feature in versions 13.4.0 and 14.3.0 as well.

## Getting Started

### Import `NgOptimizedImage` directive
Import `NgOptimizedImage` directive from `@angular/common`:

```ts
import {NgOptimizedImage} from '@angular/common';
```

and include it into the `imports` array of a standalone component or an NgModule:

```ts
imports: [
  NgOptimizedImage,
  // ...
],
```

### (Optional) Set up a Loader
An image loader is not **required** in order to use NgOptimizedImage, but using one with an image CDN enables powerful performance features, including automatic `srcset`s for your images.

A brief guide for setting up a loader can be found in the Configuring an Image Loader section at the end of this page.

### Enable the directive
To activate the `NgOptimizedImage` directive, replace your image's `src` attribute with `ngSrc`.

```html
<img ngSrc="cat.jpg" />
```

If you're using a built-in third-party loader, make sure to omit the base URL path from `src`, as that will be prepended automatically by the loader.

### Mark images as `priority`
Always mark the LCP image on your page as `priority` to prioritize its loading.

```html
<img ngSrc="cat.jpg" width="400" height="200" priority />
```

Marking an image as `priority` applies the following optimizations:

- Sets `fetchpriority=high` (read more about priority hints here)
- Sets `loading=eager` (read more about native lazy loading here)
- Automatically generates a preload link element if rendering on the server.

Angular displays a warning during development if the LCP element is an image that does not have the `priority` attribute. A page’s LCP element can vary based on a number of factors - such as the dimensions of a user's screen, so a page may have multiple images that should be marked `priority`. See CSS for Web Vitals for more details.

### Include Width and Height
In order to prevent image-related layout shifts, NgOptimizedImage requires that you specify a height and width for your image, as follows:

```html
<img ngSrc="cat.jpg" width="400" height="200" />
```

For **responsive images** (images which you've styled to grow and shrink relative to the viewport), the `width` and `height` attributes should be the intrinsic size of the image file. For responsive images it's also important to set a value for `sizes`.

For **fixed size images**, the `width` and `height` attributes should reflect the desired rendered size of the image. The aspect ratio of these attributes should always match the intrinsic aspect ratio of the image.

NOTE: If you don't know the size of your images, consider using "fill mode" to inherit the size of the parent container, as described below.

## Using `fill` mode

In cases where you want to have an image fill a containing element, you can use the `fill` attribute. This is often useful when you want to achieve a "background image" behavior. It can also be helpful when you don't know the exact width and height of your image, but you do have a parent container with a known size that you'd like to fit your image into (see "object-fit" below).

When you add the `fill` attribute to your image, you do not need and should not include a `width` and `height`, as in this example:

```html
<img ngSrc="cat.jpg" fill />
```

You can use the object-fit CSS property to change how the image will fill its container. If you style your image with `object-fit: "contain"`, the image will maintain its aspect ratio and be "letterboxed" to fit the element. If you set `object-fit: "cover"`, the element will retain its aspect ratio, fully fill the element, and some content may be "cropped" off.

See visual examples of the above at the MDN object-fit documentation.

You can also style your image with the object-position property to adjust its position within its containing element.

IMPORTANT: For the "fill" image to render properly, its parent element **must** be styled with `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.

## How to migrate your background image

Here's a simple step-by-step process for migrating from `background-image` to `NgOptimizedImage`. For these steps, we'll refer to the element that has an image background as the "containing element":

1. Remove the `background-image` style from the containing element.
2. Ensure that the containing element has `position: "relative"`, `position: "fixed"`, or `position: "absolute"`.
3. Create a new image element as a child of the containing element, using `ngSrc` to enable the `NgOptimizedImage` directive.
4. Give that element the `fill` attribute. Do not include a `height` and `width`.
5. If you believe this image might be your LCP element, add the `priority` attribute to the image element.

You can adjust how the background image fills the container as described in the Using fill mode section.

## Using placeholders

### Automatic placeholders

NgOptimizedImage can display an automatic low-resolution placeholder for your image if you're using a CDN or image host that provides automatic image resizing. Take advantage of this feature by adding the `placeholder` attribute to your image:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder />
```

Adding this attribute automatically requests a second, smaller version of the image using your specified image loader. This small image will be applied as a `background-image` style with a CSS blur while your image loads. If no image loader is provided, no placeholder image can be generated and an error will be thrown.

The default size for generated placeholders is 30px wide. You can change this size by specifying a pixel value in the `IMAGE_CONFIG` provider, as seen below:

```ts
providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      placeholderResolution: 40
    }
  },
],
```

If you want sharp edges around your blurred placeholder, you can wrap your image in a containing `` with the `overflow: hidden` style. As long as the `` is the same size as the image (such as by using the `width: fit-content` style), the "fuzzy edges" of the placeholder will be hidden.

### Data URL placeholders

You can also specify a placeholder using a base64 data URL without an image loader. The data url format is `data:image/[imagetype];[data]`, where `[imagetype]` is the image format, just as `png`, and `[data]` is a base64 encoding of the image. That encoding can be done using the command line or in JavaScript. For specific commands, see the MDN documentation. An example of a data URL placeholder with truncated data is shown below:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder="data:image/png;base64,iVBORw0K..." />
```

However, large data URLs increase the size of your Angular bundles and slow down page load. If you cannot use an image loader, the Angular team recommends keeping base64 placeholder images smaller than 4KB and using them exclusively on critical images. In addition to decreasing placeholder dimensions, consider changing image formats or parameters used when saving images. At very low resolutions, these parameters can have a large effect on file size.

### Non-blurred placeholders

By default, NgOptimizedImage applies a CSS blur effect to image placeholders. To render a placeholder without blur, provide a `placeholderConfig` argument with an object that includes the `blur` property, set to false. For example:

```html
<img ngSrc="cat.jpg" width="400" height="200" placeholder [placeholderConfig]="{blur: false}" />
```

## Adjusting image styling

Depending on the image's styling, adding `width` and `height` attributes may cause the image to render differently. `NgOptimizedImage` warns you if your image styling renders the image at a distorted aspect ratio.

You can typically fix this by adding `height: auto` or `width: auto` to your image styles. For more information, see the web.dev article on the `` tag.

If the `width` and `height` attribute on the image are preventing you from sizing the image the way you want with CSS, consider using `fill` mode instead, and styling the image's parent element.
