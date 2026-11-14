# common/src/directives/ng_optimized_image/ng_optimized_image

## ImagePlaceholderConfig

```ts
export interface ImagePlaceholderConfig
```

Config options used in rendering placeholder images.

@see {@link NgOptimizedImage}
@publicApi

## ImagePlaceholderConfig.ngSrc

```ts
ngSrc!: string
```

Name of the source image.
Image name will be processed by the image loader and the final URL will be applied as the `src`
property of the image.

## ImagePlaceholderConfig.ngSrcset

```ts
ngSrcset!: string
```

A comma separated list of width or density descriptors.
The image name will be taken from `ngSrc` and combined with the list of width or density
descriptors to generate the final `srcset` property of the image.

Example:
```html
<img ngSrc="hello.jpg" ngSrcset="100w, 200w" />  =>
<img src="path/hello.jpg" srcset="path/hello.jpg?w=100 100w, path/hello.jpg?w=200 200w" />
```

## ImagePlaceholderConfig.sizes

```ts
sizes?: string
```

The base `sizes` attribute passed through to the `<img>` element.
Providing sizes causes the image to create an automatic responsive srcset.

## ImagePlaceholderConfig.width

```ts
width: number | undefined
```

For responsive images: the intrinsic width of the image in pixels.
For fixed size images: the desired rendered width of the image in pixels.

## ImagePlaceholderConfig.height

```ts
height: number | undefined
```

For responsive images: the intrinsic height of the image in pixels.
For fixed size images: the desired rendered height of the image in pixels.

## ImagePlaceholderConfig.decoding

```ts
decoding?: 'sync' | 'async' | 'auto'
```

The desired decoding behavior for the image. Defaults to `auto`
if not explicitly set, matching native browser behavior.

Use `async` to decode the image off the main thread (non-blocking),
`sync` for immediate decoding (blocking), or `auto` to let the
browser decide the optimal strategy.

[Spec](https://html.spec.whatwg.org/multipage/images.html#image-decoding-hint)

## ImagePlaceholderConfig.loading

```ts
loading?: 'lazy' | 'eager' | 'auto'
```

The desired loading behavior (lazy, eager, or auto). Defaults to `lazy`,
which is recommended for most images.

Warning: Setting images as loading="eager" or loading="auto" marks them
as non-priority images and can hurt loading performance. For images which
may be the LCP element, use the `priority` attribute instead of `loading`.

## ImagePlaceholderConfig.priority

```ts
priority = false
```

Indicates whether this image should have a high priority.

## ImagePlaceholderConfig.loaderParams

```ts
loaderParams?: {[key: string]: any}
```

Data to pass through to custom loaders.

## ImagePlaceholderConfig.disableOptimizedSrcset

```ts
disableOptimizedSrcset = false
```

Disables automatic srcset generation for this image.

## ImagePlaceholderConfig.fill

```ts
fill = false
```

Sets the image to "fill mode", which eliminates the height/width requirement and adds
styles such that the image fills its containing element.

## ImagePlaceholderConfig.placeholder

```ts
placeholder?: string | boolean
```

A URL or data URL for an image to be used as a placeholder while this image loads.

## ImagePlaceholderConfig.placeholderConfig

```ts
placeholderConfig?: ImagePlaceholderConfig
```

Configuration object for placeholder settings. Options:
  * blur: Setting this to false disables the automatic CSS blur.

## ImagePlaceholderConfig.generatePlaceholder

```ts
protected generatePlaceholder(placeholderInput: string | boolean): string | boolean | null
```

Returns an image url formatted for use with the CSS background-image property. Expects one of:
* A base64 encoded image, which is wrapped and passed through.
* A boolean. If true, calls the image loader to generate a small placeholder url.

## ImagePlaceholderConfig.shouldBlurPlaceholder

```ts
protected shouldBlurPlaceholder(placeholderConfig?: ImagePlaceholderConfig): boolean
```

Determines if blur should be applied, based on an optional boolean
property `blur` within the optional configuration object `placeholderConfig`.