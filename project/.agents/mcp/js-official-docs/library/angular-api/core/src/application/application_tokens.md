# core/src/application/application_tokens

## APP_ID

```ts
export const APP_ID = new InjectionToken<string>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'AppId' : '',
```

A DI token representing a string ID, used
primarily for prefixing application attributes and CSS styles when
{@link ViewEncapsulation#Emulated} is being used.

The token is needed in cases when multiple applications are bootstrapped on a page
(for example, using `bootstrapApplication` calls). In this case, ensure that those applications
have different `APP_ID` value setup. For example:

```ts
bootstrapApplication(ComponentA, {
  providers: [
    { provide: APP_ID, useValue: 'app-a' },
    // ... other providers ...
  ]
});

bootstrapApplication(ComponentB, {
  providers: [
    { provide: APP_ID, useValue: 'app-b' },
    // ... other providers ...
  ]
});
```

By default, when there is only one application bootstrapped, you don't need to provide the
`APP_ID` token (the `ng` will be used as an app ID).

@publicApi

## PLATFORM_INITIALIZER

```ts
export const PLATFORM_INITIALIZER = new InjectionToken<ReadonlyArray<()
```

A function that is executed when a platform is initialized.

@deprecated from v19.0.0, use providePlatformInitializer instead

@see {@link providePlatformInitializer}

@publicApi

## PLATFORM_ID

```ts
export const PLATFORM_ID = new InjectionToken<Object>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'Platform ID' : '',
```

A token that indicates an opaque platform ID.
@publicApi

## ANIMATION_MODULE_TYPE

```ts
export const ANIMATION_MODULE_TYPE = new InjectionToken<'NoopAnimations' | 'BrowserAnimations'>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'AnimationModuleType' : '', )
```

A [DI token](api/core/InjectionToken) that indicates which animations
module has been loaded.
@publicApi

## CSP_NONCE

```ts
export const CSP_NONCE = new InjectionToken<string | null>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'CSP nonce' : '',
```

Token used to configure the [Content Security Policy](https://web.dev/strict-csp/) nonce that
Angular will apply when inserting inline styles. If not provided, Angular will look up its value
from the `ngCspNonce` attribute of the application root node.

@see [Content security policy](best-practices/security#content-security-policy)

@publicApi

## ImageConfig

```ts
export type ImageConfig
```

A configuration object for the image-related options. Contains:
- breakpoints: An array of integer breakpoints used to generate
     srcsets for responsive images.
- disableImageSizeWarning: A boolean value. Setting this to true will
     disable console warnings about oversized images.
- disableImageLazyLoadWarning: A boolean value. Setting this to true will
     disable console warnings about LCP images configured with `loading="lazy"`.
Learn more about the responsive image configuration in [the NgOptimizedImage
guide](guide/image-optimization).
Learn more about image warning options in [the related error page](errors/NG0913).
@publicApi

## IMAGE_CONFIG

```ts
export const IMAGE_CONFIG = new InjectionToken<ImageConfig>( typeof ngDevMode !== 'undefined' && ngDevMode ? 'ImageConfig' : '',
```

Injection token that configures the image optimized image functionality.
See {@link ImageConfig} for additional information about parameters that
can be used.

@see {@link NgOptimizedImage}
@see {@link ImageConfig}
@see [Responsive images](guide/image-optimization#responsive-images)
@see [Using placeholders](guide/image-optimization#using-placeholders)
@publicApi