# core/testing/src/async

## waitForAsync

```ts
export function waitForAsync(fn: Function): (done: any)
```

Wraps a test function in an asynchronous test zone. The test will automatically
complete when all asynchronous calls within this zone are done. Can be used
to wrap an {@link inject} call.

Example:

```ts
it('...', waitForAsync(inject([AClass], (object) => {
  object.doSomething.then(() => {
    expect(...);
  })
})));
```

@publicApi