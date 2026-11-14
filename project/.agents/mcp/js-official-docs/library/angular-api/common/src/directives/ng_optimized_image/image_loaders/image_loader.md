# common/src/directives/ng_optimized_image/image_loaders/image_loader

## ImageLoaderConfig

```ts
export interface ImageLoaderConfig
```

Config options recognized by the image loader function.

@see {@link ImageLoader}
@see {@link NgOptimizedImage}
@publicApi

## ImageLoaderConfig.src

```ts
src: string
```

Image file name to be added to the image request URL.

## ImageLoaderConfig.width

```ts
width?: number
```

Width of the requested image (to be used when generating srcset).

## ImageLoaderConfig.height

```ts
height?: number
```

Height of the requested image (to be used when generating srcset).

## ImageLoaderConfig.isPlaceholder

```ts
isPlaceholder?: boolean
```

Whether the loader should generate a URL for a small image placeholder instead of a full-sized
image.

## ImageLoaderConfig.loaderParams

```ts
loaderParams?: {[key: string]: any}
```

Additional user-provided parameters for use by the ImageLoader.

## ImageLoader

```ts
export type ImageLoader = (config: ImageLoaderConfig)
```

Represents an image loader function. Image loader functions are used by the
NgOptimizedImage directive to produce full image URL based on the image name and its width.

@publicApi

## IMAGE_LOADER

```ts
export const IMAGE_LOADER = new InjectionToken<ImageLoader>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'ImageLoader' : '',
```

Injection token that configures the image loader function.

@see {@link ImageLoader}
@see {@link NgOptimizedImage}
@publicApi