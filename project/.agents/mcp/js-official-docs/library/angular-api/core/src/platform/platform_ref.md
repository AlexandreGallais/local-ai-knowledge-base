# core/src/platform/platform_ref

## PlatformRef

```ts
export class PlatformRef
```

The Angular platform is the entry point for Angular on a web page.
Each page has exactly one platform. Services (such as reflection) which are common
to every Angular application running on the page are bound in its scope.
A page's platform is initialized implicitly when a platform is created using a platform
factory such as `PlatformBrowser`, or explicitly by calling the `createPlatform()` function.

@publicApi

## PlatformRef.bootstrapModuleFactory

```ts
bootstrapModuleFactory<M>( moduleFactory: NgModuleFactory<M>, options?: BootstrapOptions & {applicationProviders?: Array<Provider | EnvironmentProviders>}, ): Promise<NgModuleRef<M>>
```

Creates an instance of an `@NgModule` for the given platform.

@deprecated Passing NgModule factories as the `PlatformRef.bootstrapModuleFactory` function
    argument is deprecated. Use the `PlatformRef.bootstrapModule` API instead.

## PlatformRef.bootstrapModule

```ts
bootstrapModule<M>( moduleType: Type<M>, compilerOptions: | (CompilerOptions & BootstrapOptions & {applicationProviders?: Array<Provider | EnvironmentProviders>}) | Array< CompilerOptions & BootstrapOptions & {applicationProviders?: Array<Provider | EnvironmentProviders>} > = [], ): Promise<NgModuleRef<M>>
```

Creates an instance of an `@NgModule` for a given platform.

@usageNotes
### Simple Example

```ts
@NgModule({
  imports: [BrowserModule]
})
class MyModule {}

let moduleRef = platformBrowser().bootstrapModule(MyModule);
```

## PlatformRef.onDestroy

```ts
onDestroy(callback: ()
```

Registers a listener to be called when the platform is destroyed.

## PlatformRef.injector

```ts
get injector(): Injector
```

Retrieves the platform {@link Injector}, which is the parent injector for
every Angular application on the page and provides singleton providers.

## PlatformRef.destroy

```ts
destroy()
```

Destroys the current Angular platform and all Angular applications on the page.
Destroys all modules and listeners registered with the platform.

## PlatformRef.destroyed

```ts
get destroyed()
```

Indicates whether this instance was destroyed.