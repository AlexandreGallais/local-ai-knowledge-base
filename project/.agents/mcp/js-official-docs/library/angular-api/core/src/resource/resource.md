# core/src/resource/resource

## resource

```ts
export function resource<T, R>( options: ResourceOptions<T, R> & {defaultValue: NoInfer<T>}, ): ResourceRef<T>
```

Constructs a `Resource` that projects a reactive request to an asynchronous operation defined by
a loader function, which exposes the result of the loading operation via signals.

Note that `resource` is intended for _read_ operations, not operations which perform mutations.
`resource` will cancel in-progress loads via the `AbortSignal` when destroyed or when a new
request object becomes available, which could prematurely abort mutations.

@see [Async reactivity with resources](guide/signals/resource)

@publicApi 22.0

## resource

```ts
export function resource<T, R>(options: ResourceOptions<T, R>): ResourceRef<T | undefined>
```

Constructs a `Resource` that projects a reactive request to an asynchronous operation defined by
a loader function, which exposes the result of the loading operation via signals.

Note that `resource` is intended for _read_ operations, not operations which perform mutations.
`resource` will cancel in-progress loads via the `AbortSignal` when destroyed or when a new
request object becomes available, which could prematurely abort mutations.

@publicApi 22.0
@see [Async reactivity with resources](guide/signals/resource)