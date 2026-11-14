# core/src/di/inject_async

## injectAsync

```ts
export function injectAsync<T>( loader: ()
```

A helper function that allows to inject dependencies asynchronously,
which can be useful in cases when the dependency is not needed immediately and can be loaded lazily.

NOTE: To enable lazy loading, the injected service must be auto-provided. This means it should be decorated with either `@Injectable({providedIn: 'root'})` or `@Service()`.

@param loader A function that returns a promise resolving to the injectable service
@param options Configuration options for the async injection

@returns A function that returns a promise resolving to the requested service instance.

@usageNotes

```ts
class MyCmp {
 someSvc = injectAsync(() => import('..'));

 async onClick() {
   (await this.someSvc()).handleClick();
 }
}

// we can also configure prefetching:
injectAsync(.., {prefetch: onIdle})
```

@see [Lazy loading services](guide/di/lazy-loading-services)
@see [Injection context](guide/di/dependency-injection-context)

@publicApi 22.0

## InjectAsyncOptions

```ts
export interface InjectAsyncOptions
```

Interface for `options` argument used within `injectAsync` call.

@see [Prefetching the dependency](guide/di/lazy-loading-services#prefetching-the-dependency)

@publicApi 22.0

## InjectAsyncOptions.prefetch

```ts
prefetch?: PrefetchTrigger
```

A trigger to eagerly prefetch the lazy-loaded dependency before it is requested.

## PrefetchTrigger

```ts
export type PrefetchTrigger = ()
```

A function that returns a promise which, when resolved, will trigger the prefetching of
the lazy-loaded dependency.

@see {@link onIdle}
@see [Prefetching the dependency](guide/di/lazy-loading-services#prefetching-the-dependency)

@publicApi 22.0

## onIdle

```ts
export function onIdle(options?: {timeout?: number}): Promise<void>
```

A `PrefetchTrigger` helper function to provide the logic of triggering dependency loading
when the browser becomes idle.

Internally delegates to the configured {@link IdleService}, whose default implementation uses
[`requestIdleCallback`](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback)
when available and falls back to `setTimeout` otherwise. The default behavior can be replaced
with `provideIdleServiceWith`.

@usageNotes

```ts
injectAsync(import(...), {prefetch: onIdle})

// or with custom idle options:
injectAsync(import(...), {prefetch: () => onIdle({timeout: 100})})
```

@see [Prefetching the dependency](guide/di/lazy-loading-services#prefetching-the-dependency)

@publicApi 22.0