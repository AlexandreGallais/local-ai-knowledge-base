# core/testing/src/fake_async

## resetFakeAsyncZone

```ts
export function resetFakeAsyncZone(): void
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Clears out the shared fake async zone for a test.
To be called in a global `beforeEach`.

@publicApi

## fakeAsync

```ts
export function fakeAsync(fn: Function, options?: {flush?: boolean}): (...args: any[])
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Wraps a function to be executed in the `fakeAsync` zone:
- Microtasks are manually executed by calling `flushMicrotasks()`.
- Timers are synchronous; `tick()` simulates the asynchronous passage of time.

Can be used to wrap `inject()` calls.

@param fn The function that you want to wrap in the `fakeAsync` zone.
@param options
  - flush: When true, will drain the macrotask queue after the test function completes.
    When false, will throw an exception at the end of the function if there are pending timers.

@usageNotes
### Example

{@example core/testing/ts/fake_async.ts region='basic'}


@returns The function wrapped to be executed in the `fakeAsync` zone.
Any arguments passed when calling this returned function will be passed through to the `fn`
function in the parameters when it is called.

@publicApi

## tick

```ts
export function tick( millis: number = 0, tickOptions: {processNewMacroTasksSynchronously: boolean}
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Simulates the asynchronous passage of time for the timers in the `fakeAsync` zone.

The microtasks queue is drained at the very start of this function and after any timer callback
has been executed.

@param millis The number of milliseconds to advance the virtual timer.
@param tickOptions The options to pass to the `tick()` function.

@usageNotes

The `tick()` option is a flag called `processNewMacroTasksSynchronously`,
which determines whether or not to invoke new macroTasks.

If you provide a `tickOptions` object, but do not specify a
`processNewMacroTasksSynchronously` property (`tick(100, {})`),
then `processNewMacroTasksSynchronously` defaults to true.

If you omit the `tickOptions` parameter (`tick(100))`), then
`tickOptions` defaults to `{processNewMacroTasksSynchronously: true}`.

### Example

{@example core/testing/ts/fake_async.ts region='basic'}

The following example includes a nested timeout (new macroTask), and
the `tickOptions` parameter is allowed to default. In this case,
`processNewMacroTasksSynchronously` defaults to true, and the nested
function is executed on each tick.

```ts
it ('test with nested setTimeout', fakeAsync(() => {
  let nestedTimeoutInvoked = false;
  function funcWithNestedTimeout() {
    setTimeout(() => {
      nestedTimeoutInvoked = true;
    });
  };
  setTimeout(funcWithNestedTimeout);
  tick();
  expect(nestedTimeoutInvoked).toBe(true);
}));
```

In the following case, `processNewMacroTasksSynchronously` is explicitly
set to false, so the nested timeout function is not invoked.

```ts
it ('test with nested setTimeout', fakeAsync(() => {
  let nestedTimeoutInvoked = false;
  function funcWithNestedTimeout() {
    setTimeout(() => {
      nestedTimeoutInvoked = true;
    });
  };
  setTimeout(funcWithNestedTimeout);
  tick(0, {processNewMacroTasksSynchronously: false});
  expect(nestedTimeoutInvoked).toBe(false);
}));
```


@publicApi

## flush

```ts
export function flush(maxTurns?: number): number
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Flushes any pending microtasks and simulates the asynchronous passage of time for the timers in
the `fakeAsync` zone by
draining the macrotask queue until it is empty.

@param maxTurns The maximum number of times the scheduler attempts to clear its queue before
    throwing an error.
@returns The simulated time elapsed, in milliseconds.

@publicApi

## discardPeriodicTasks

```ts
export function discardPeriodicTasks(): void
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Discard all remaining periodic tasks.

@publicApi

## flushMicrotasks

```ts
export function flushMicrotasks(): void
```

IMPORTANT: This API requires Zone.js and cannot be used with the Vitest test runner

Flush any pending microtasks.

@publicApi