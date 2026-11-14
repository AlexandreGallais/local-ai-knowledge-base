# src/internal/util/errorContext

## errorContext

```ts
export function errorContext(cb: ()
```

Handles dealing with errors for super-gross mode. Creates a context, in which
any synchronously thrown errors will be passed to {@link captureError}. Which
will record the error such that it will be rethrown after the call back is complete.
TODO: Remove in v8
@param cb An immediately executed function.

## captureError

```ts
export function captureError(err: any)
```

Captures errors only in super-gross mode.
@param err the error to capture