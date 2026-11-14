# src/internal/observable/innerFrom

## fromInteropObservable

```ts
export function fromInteropObservable<T>(obj: any)
```

Creates an RxJS Observable from an object that implements `Symbol.observable`.
@param obj An object that properly implements `Symbol.observable`.

## fromArrayLike

```ts
export function fromArrayLike<T>(array: ArrayLike<T>)
```

Synchronously emits the values of an array like and completes.
This is exported because there are creation functions and operators that need to
make direct use of the same logic, and there's no reason to make them run through
`from` conditionals because we *know* they're dealing with an array.
@param array The array to emit values from