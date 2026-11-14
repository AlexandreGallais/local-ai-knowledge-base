# core/rxjs-interop/src/rx_resource

## RxResourceOptions

```ts
export interface RxResourceOptions<T, R> extends BaseResourceOptions<T, R>
```

Like `ResourceOptions` but uses an RxJS-based `loader`.

@publicApi 22.0

## RxResourceOptions.stream

```ts
stream: (params: ResourceLoaderParams<R>)
```

A function that returns the `Observable` to load the resource's value from.

This Observable must eventually emit a value or an error before it completes — a resource
needs one of those two things to know what to show. If the Observable completes without ever
emitting anything (for example because of `catchError(() => EMPTY)`), Angular throws
`RESOURCE_COMPLETED_BEFORE_PRODUCING_VALUE` (`NG0991`), since it has nothing to give the
resource.

## RxResourceOptions.debugName

```ts
debugName?: string
```

A debug name for the reactive node. Used in Angular DevTools to identify the node.

## rxResource

```ts
export function rxResource<T, R>( opts: RxResourceOptions<T, R> & {defaultValue: NoInfer<T>}, ): ResourceRef<T>
```

Like `resource` but uses an RxJS based `loader` which maps the request to an `Observable` of the
resource's value.

@see [Using rxResource for async data](ecosystem/rxjs-interop#using-rxresource-for-async-data)

@publicApi 22.0

## rxResource

```ts
export function rxResource<T, R>(opts: RxResourceOptions<T, R>): ResourceRef<T | undefined>
```

Like `resource` but uses an RxJS based `loader` which maps the request to an `Observable` of the
resource's value.

@publicApi 22.0