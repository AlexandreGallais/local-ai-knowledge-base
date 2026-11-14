# core/src/di/contextual

## runInInjectionContext

```ts
export function runInInjectionContext<ReturnT>(injector: Injector, fn: ()
```

Runs the given function in the [context](guide/di/dependency-injection-context) of the given
`Injector`.

Within the function's stack frame, [`inject`](api/core/inject) can be used to inject dependencies
from the given `Injector`. Note that `inject` is only usable synchronously, and cannot be used in
any asynchronous callbacks or after any `await` points.

@see [Run within an injection context](guide/di/dependency-injection-context#run-within-an-injection-context)

@param injector the injector which will satisfy calls to [`inject`](api/core/inject) while `fn`
    is executing
@param fn the closure to be run in the context of `injector`
@returns the return value of the function, if any
@publicApi

## assertInInjectionContext

```ts
export function assertInInjectionContext(debugFn: Function): void
```

Asserts that the current stack frame is within an [injection
context](guide/di/dependency-injection-context) and has access to `inject`.

@param debugFn a reference to the function making the assertion (used for the error message).

@see [Asserts the context](guide/di/dependency-injection-context#asserts-the-context)

@publicApi