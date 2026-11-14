# core/src/resource/api

## ResourceStatus

```ts
export type ResourceStatus = 'idle' | 'error' | 'loading' | 'reloading' | 'resolved' | 'local'
```

String value capturing the status of a `Resource`.

Possible statuses are:

`idle` - The resource has no valid request and will not perform any loading. `value()` will be
`undefined`.

`loading` - The resource is currently loading a new value as a result of a change in its reactive
dependencies. `value()` will be `undefined`.

`reloading` - The resource is currently reloading a fresh value for the same reactive
dependencies. `value()` will continue to return the previously fetched value during the reloading
operation.

`error` - Loading failed with an error. Reading `value()` will throw; use `hasValue()` or
`error()` to check first.

`resolved` - Loading has completed and the resource has the value returned from the loader.

`local` - The resource's value was set locally via `.set()` or `.update()`.

@publicApi 22.0

## Resource

```ts
export interface Resource<T>
```

A Resource is an asynchronous dependency (for example, the results of an API call) that is
managed and delivered through signals.

The usual way of creating a `Resource` is through the `resource` function, but various other APIs
may present `Resource` instances to describe their own concepts.

@publicApi 22.0

## Resource.value

```ts
readonly value: Signal<T>
```

The current value of the `Resource`, or throws an error if the resource is in an error state.

## Resource.status

```ts
readonly status: Signal<ResourceStatus>
```

The current status of the `Resource`, which describes what the resource is currently doing and
what can be expected of its `value`.

## Resource.error

```ts
readonly error: Signal<Error | undefined>
```

When in the `error` state, this returns the last known error from the `Resource`.

## Resource.isLoading

```ts
readonly isLoading: Signal<boolean>
```

Whether this resource is loading a new value (or reloading the existing one).

## Resource.snapshot

```ts
readonly snapshot: Signal<ResourceSnapshot<T>>
```

The current state of this resource, represented as a `ResourceSnapshot`.

## Resource.hasValue

```ts
hasValue(this: T extends undefined ? this : never): this is Resource<Exclude<T, undefined>>
```

Whether this resource has a valid current value.

This function is reactive.

## WritableResource

```ts
export interface WritableResource<T> extends Resource<T>
```

A `Resource` with a mutable value.

Overwriting the value of a resource sets it to the 'local' state.

@publicApi 22.0

## WritableResource.set

```ts
set(value: T): void
```

Convenience wrapper for `value.set`.

## WritableResource.update

```ts
update(updater: (value: T)
```

Convenience wrapper for `value.update`.

## WritableResource.reload

```ts
reload(): boolean
```

Instructs the resource to re-load any asynchronous dependency it may have.

Note that the resource will not enter its reloading state until the actual backend request is
made.

@returns true if a reload was initiated, false if a reload was unnecessary or unsupported

## ResourceRef

```ts
export interface ResourceRef<T> extends WritableResource<T>
```

A `WritableResource` created through the `resource` function.

@publicApi 22.0

## ResourceRef.destroy

```ts
destroy(): void
```

Manually destroy the resource, which cancels pending requests and returns it to `idle` state.

## ResourceLoaderParams

```ts
export interface ResourceLoaderParams<R>
```

Parameter to a `ResourceLoader` which gives the request and other options for the current loading
operation.

@publicApi 22.0

## ResourceLoader

```ts
export type ResourceLoader<T, R> = (param: ResourceLoaderParams<R>)
```

Loading function for a `Resource`.

@publicApi 22.0

## ResourceStreamingLoader

```ts
export type ResourceStreamingLoader<T, R> = ( param: ResourceLoaderParams<R>, )
```

Streaming loader for a `Resource`.

@publicApi 22.0

## BaseResourceOptions

```ts
export interface BaseResourceOptions<T, R>
```

Options to the `resource` function, for creating a resource.

@publicApi 22.0

## BaseResourceOptions.params

```ts
params?: (ctx: ResourceParamsContext)
```

A reactive function which determines the request to be made. Whenever the request changes, the
loader will be triggered to fetch a new value for the resource.

If a params function isn't provided, the loader won't rerun unless the resource is reloaded.

## BaseResourceOptions.defaultValue

```ts
defaultValue?: NoInfer<T>
```

The value which will be returned from the resource when a server value is unavailable, such as
when the resource is still loading.

## BaseResourceOptions.equal

```ts
equal?: ValueEqualityFn<T>
```

Equality function used to compare the return value of the loader.

## BaseResourceOptions.injector

```ts
injector?: Injector
```

Overrides the `Injector` used by `resource`.

## BaseResourceOptions.id

```ts
id?: string
```

Identifier used to cache the resource data in the `TransferState` during server-side rendering and to retrieve it on the client side.
This value value needs to be identical for both the client and server.

## PromiseResourceOptions

```ts
export interface PromiseResourceOptions<T, R> extends BaseResourceOptions<T, R>
```

Options to the `resource` function, for creating a resource.

@publicApi 22.0

## PromiseResourceOptions.loader

```ts
loader: ResourceLoader<T, R>
```

Loading function which returns a `Promise` of the resource's value for a given request.

## PromiseResourceOptions.stream

```ts
stream?: never
```

Cannot specify `stream` and `loader` at the same time.

## StreamingResourceOptions

```ts
export interface StreamingResourceOptions<T, R> extends BaseResourceOptions<T, R>
```

Options to the `resource` function, for creating a resource.

@publicApi 22.0

## StreamingResourceOptions.stream

```ts
stream: ResourceStreamingLoader<T, R>
```

Loading function which returns a `Promise` of a signal of the resource's value for a given
request, which can change over time as new values are received from a stream.

## StreamingResourceOptions.loader

```ts
loader?: never
```

Cannot specify `stream` and `loader` at the same time.

## ResourceOptions

```ts
export type ResourceOptions<T, R> = ( PromiseResourceOptions<T, R> | StreamingResourceOptions<T, R> ) &
```

@publicApi 22.0

## ResourceStreamItem

```ts
export type ResourceStreamItem<T> = {value: T} | {error: Error}
```

@publicApi 22.0

## ResourceSnapshot

```ts
export type ResourceSnapshot<T> = | {readonly status: 'idle'
```

An explicit representation of a resource's state.

@publicApi 22.0
@see [Resource composition with snapshots](guide/signals/resource#resource-composition-with-snapshots)