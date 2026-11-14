# core/src/linker/destroy_ref

## DestroyRef

```ts
export abstract class DestroyRef
```

`DestroyRef` lets you set callbacks to run for any cleanup or destruction behavior.
The scope of this destruction depends on where `DestroyRef` is injected. If `DestroyRef`
is injected in a component or directive, the callbacks run when that component or
directive is destroyed. Otherwise the callbacks run when a corresponding injector is destroyed.

@see [Lifecycle DestroyRef](guide/components/lifecycle#destroyref)

@publicApi

## DestroyRef.onDestroy

```ts
abstract onDestroy(callback: ()
```

Registers a destroy callback in a given lifecycle scope.  Returns a cleanup function that can
be invoked to unregister the callback.

@usageNotes
### Example
```ts
const destroyRef = inject(DestroyRef);

// register a destroy callback
const unregisterFn = destroyRef.onDestroy(() => doSomethingOnDestroy());

// stop the destroy callback from executing if needed
unregisterFn();
```

@see [Lifecycle DestroyRef](guide/components/lifecycle#destroyref)

## DestroyRef.destroyed

```ts
abstract get destroyed(): boolean
```

Indicates whether the instance has already been destroyed.

@see [Detecting instance destruction](guide/components/lifecycle#detecting-instance-destruction)