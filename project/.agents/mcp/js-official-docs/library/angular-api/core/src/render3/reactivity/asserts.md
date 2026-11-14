# core/src/render3/reactivity/asserts

## assertNotInReactiveContext

```ts
export function assertNotInReactiveContext(debugFn: Function, extraContext?: string): void
```

Asserts that the current stack frame is not within a reactive context. Useful
to disallow certain code from running inside a reactive context (see {@link /api/core/rxjs-interop/toSignal toSignal})

@param debugFn a reference to the function making the assertion (used for the error message).
@see [Asserts the reactive context](guide/signals#asserts-the-reactive-context)

@publicApi