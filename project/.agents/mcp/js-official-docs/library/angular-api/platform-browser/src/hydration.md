# platform-browser/src/hydration

## HydrationFeatureKind

```ts
export enum HydrationFeatureKind
```

The list of features as an enum to uniquely type each `HydrationFeature`.
@see {@link HydrationFeature}

@publicApi

## HydrationFeature

```ts
export interface HydrationFeature<FeatureKind extends HydrationFeatureKind>
```

Helper type to represent a Hydration feature.

@publicApi

## withNoHttpTransferCache

```ts
export function withNoHttpTransferCache(): HydrationFeature<HydrationFeatureKind.NoHttpTransferCache>
```

Disables HTTP transfer cache. Effectively causes HTTP requests to be performed twice: once on the
server and other one on the browser.

@see [Disabling Caching](guide/ssr#disabling-caching)

@publicApi

## withHttpTransferCacheOptions

```ts
export function withHttpTransferCacheOptions( options: HttpTransferCacheOptions, ): HydrationFeature<HydrationFeatureKind.HttpTransferCacheOptions>
```

The function accepts an object, which allows to configure cache parameters,
such as which headers should be included (no headers are included by default),
whether POST requests should be cached or a callback function to determine if a
particular request should be cached.

@see [Configuring HTTP transfer cache options](guide/ssr#caching-data-when-using-httpclient)

@publicApi

## withI18nSupport

```ts
export function withI18nSupport(): HydrationFeature<HydrationFeatureKind.I18nSupport>
```

Enables support for hydrating i18n blocks.

@publicApi 20.0

## withEventReplay

```ts
export function withEventReplay(): HydrationFeature<HydrationFeatureKind.EventReplay>
```

Enables support for replaying user events (e.g. `click`s) that happened on a page
before hydration logic has completed. Once an application is hydrated, all captured
events are replayed and relevant event listeners are executed.

@usageNotes

Basic example of how you can enable event replay in your application when
`bootstrapApplication` function is used:
```ts
bootstrapApplication(App, {
  providers: [provideClientHydration(withEventReplay())]
});
```
@publicApi
@see {@link provideClientHydration}

## withIncrementalHydration

```ts
export function withIncrementalHydration(): HydrationFeature<HydrationFeatureKind.IncrementalHydration>
```

Enables support for incremental hydration using the `hydrate` trigger syntax.

@usageNotes

Basic example of how you can enable incremental hydration in your application when
the `bootstrapApplication` function is used:
```ts
bootstrapApplication(App, {
  providers: [provideClientHydration(withIncrementalHydration())]
});
```
@publicApi 20.0
@see {@link provideClientHydration}

@deprecated Since v22.0.0, incremental hydration is enabled by default with `provideClientHydration`.
Intent to remove in v24.

## withNoIncrementalHydration

```ts
export function withNoIncrementalHydration(): HydrationFeature<HydrationFeatureKind.NoIncrementalHydration>
```

Disables support for incremental hydration (which is enabled by default).

@publicApi 22.0
@see {@link provideClientHydration}

## provideClientHydration

```ts
export function provideClientHydration( ...features: HydrationFeature<HydrationFeatureKind>[] ): EnvironmentProviders
```

Sets up providers necessary to enable hydration functionality for the application.

By default, the function enables the recommended set of features for the optimal
performance for most of the applications. It includes the following features:

* Reconciling DOM hydration. Learn more about it [here](guide/hydration).
* [`HttpClient`](api/common/http/HttpClient) response caching while running on the server and
transferring this cache to the client to avoid extra HTTP requests. Learn more about data caching
[here](guide/ssr#caching-data-when-using-httpclient).
Incremental hydration. [Learn more](guide/incremental-hydration).

These functions allow you to disable some of the default features or enable new ones:

* {@link withNoHttpTransferCache} to disable HTTP transfer cache
* {@link withHttpTransferCacheOptions} to configure some HTTP transfer cache options
* {@link withI18nSupport} to enable hydration support for i18n blocks
* {@link withEventReplay} to enable support for replaying user events
* {@link withNoIncrementalHydration} to disable incremental hydration

@usageNotes

Basic example of how you can enable hydration in your application when
`bootstrapApplication` function is used:
```ts
bootstrapApplication(App, {
  providers: [provideClientHydration()]
});
```

Alternatively if you are using NgModules, you would add `provideClientHydration`
to your root app module's provider list.
```ts
@NgModule({
  declarations: [RootCmp],
  bootstrap: [RootCmp],
  providers: [provideClientHydration()],
})
export class AppModule {}
```

@see {@link withNoHttpTransferCache}
@see {@link withHttpTransferCacheOptions}
@see {@link withI18nSupport}
@see {@link withEventReplay}
@see {@link withNoIncrementalHydration}

@param features Optional features to configure additional hydration behaviors.
@returns A set of providers to enable hydration.

@publicApi 17.0