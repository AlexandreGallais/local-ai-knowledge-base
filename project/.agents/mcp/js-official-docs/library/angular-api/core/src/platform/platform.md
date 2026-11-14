# core/src/platform/platform

## createPlatform

```ts
export function createPlatform(injector: Injector): PlatformRef
```

Creates a platform.
Platforms must be created on launch using this function.

@publicApi

## createPlatformFactory

```ts
export function createPlatformFactory( parentPlatformFactory: ((extraProviders?: StaticProvider[])
```

Creates a factory for a platform. Can be used to provide or override `Providers` specific to
your application's runtime needs, such as `PLATFORM_INITIALIZER` and `PLATFORM_ID`.
@param parentPlatformFactory Another platform factory to modify. Allows you to compose factories
to build up configurations that might be required by different libraries or parts of the
application.
@param name Identifies the new platform factory.
@param providers A set of dependency providers for platforms created with the new factory.

@publicApi

## assertPlatform

```ts
export function assertPlatform(requiredToken: any): PlatformRef
```

Checks that there is currently a platform that contains the given token as a provider.

@publicApi

## getPlatform

```ts
export function getPlatform(): PlatformRef | null
```

Returns the current platform in the browser environment. In the server environment,
returns `null`. If you need access to the platform information, inject `PlatformRef` in your application.

@publicApi

## destroyPlatform

```ts
export function destroyPlatform(): void
```

Destroys the current Angular platform and all Angular applications on the page.
Destroys all modules and listeners registered with the platform.

This function should not be used in a server environment, as it will be a no-op.

@publicApi

## providePlatformInitializer

```ts
export function providePlatformInitializer(initializerFn: ()
```

@description
This function is used to provide initialization functions that will be executed upon
initialization of the platform injector.

Note that the provided initializer is run in the injection context.

@usageNotes
The platform initializer should be provided during platform creation:

```ts
const platformRef = platformBrowser([ providePlatformInitializer(() =>  ...) ]);

bootstrapApplication(App, appConfig, { platformRef })
```

@publicApi