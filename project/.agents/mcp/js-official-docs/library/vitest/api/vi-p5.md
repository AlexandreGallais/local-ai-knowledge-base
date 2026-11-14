---
title: "Vi (part 5 of 6)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/vi.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Vi (part 5 of 6)

## Fake Timers

This sections describes how to work with fake timers.

### vi.advanceTimersByTime

```ts
function advanceTimersByTime(ms: number): Vitest
```

This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first.

```ts
let i = 0
setInterval(() => console.log(++i), 50)

vi.advanceTimersByTime(150)

// log: 1
// log: 2
// log: 3
```

### vi.advanceTimersByTimeAsync

```ts
function advanceTimersByTimeAsync(ms: number): Promise<Vitest>
```

This method will invoke every initiated timer until the specified number of milliseconds is passed or the queue is empty - whatever comes first. This will include asynchronously set timers.

```ts
let i = 0
setInterval(() => Promise.resolve().then(() => console.log(++i)), 50)

await vi.advanceTimersByTimeAsync(150)

// log: 1
// log: 2
// log: 3
```

### vi.advanceTimersToNextTimer

```ts
function advanceTimersToNextTimer(): Vitest
```

Will call next available timer. Useful to make assertions between each timer call. You can chain call it to manage timers by yourself.

```ts
let i = 0
setInterval(() => console.log(++i), 50)

vi.advanceTimersToNextTimer() // log: 1
  .advanceTimersToNextTimer() // log: 2
  .advanceTimersToNextTimer() // log: 3
```

### vi.advanceTimersToNextTimerAsync

```ts
function advanceTimersToNextTimerAsync(): Promise<Vitest>
```

Will call next available timer and wait until it's resolved if it was set asynchronously. Useful to make assertions between each timer call.

```ts
let i = 0
setInterval(() => Promise.resolve().then(() => console.log(++i)), 50)

await vi.advanceTimersToNextTimerAsync() // log: 1
expect(console.log).toHaveBeenCalledWith(1)

await vi.advanceTimersToNextTimerAsync() // log: 2
await vi.advanceTimersToNextTimerAsync() // log: 3
```

### vi.advanceTimersToNextFrame {#vi-advancetimerstonextframe}

```ts
function advanceTimersToNextFrame(): Vitest
```

Similar to `vi.advanceTimersByTime`, but will advance timers by the milliseconds needed to execute callbacks currently scheduled with `requestAnimationFrame`.

```ts
let frameRendered = false

requestAnimationFrame(() => {
  frameRendered = true
})

vi.advanceTimersToNextFrame()

expect(frameRendered).toBe(true)
```

### vi.getTimerCount

```ts
function getTimerCount(): number
```

Get the number of waiting timers.

### vi.clearAllTimers

```ts
function clearAllTimers(): void
```

Removes all timers that are scheduled to run. These timers will never run in the future.

### vi.getMockedSystemTime

```ts
function getMockedSystemTime(): Date | null
```

Returns mocked current date. If date is not mocked the method will return `null`.

### vi.getRealSystemTime

```ts
function getRealSystemTime(): number
```

When using `vi.useFakeTimers`, `Date.now` calls are mocked. If you need to get real time in milliseconds, you can call this function.

### vi.runAllTicks

```ts
function runAllTicks(): Vitest
```

Calls every microtask that was queued by `process.nextTick`. This will also run all microtasks scheduled by themselves.

### vi.runAllTimers

```ts
function runAllTimers(): Vitest
```

This method will invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimers` will be fired. If you have an infinite interval, it will throw after 10 000 tries (can be configured with `fakeTimers.loopLimit`).

```ts
let i = 0
setTimeout(() => console.log(++i))
const interval = setInterval(() => {
  console.log(++i)
  if (i === 3) {
    clearInterval(interval)
  }
}, 50)

vi.runAllTimers()

// log: 1
// log: 2
// log: 3
```

### vi.runAllTimersAsync

```ts
function runAllTimersAsync(): Promise<Vitest>
```

This method will asynchronously invoke every initiated timer until the timer queue is empty. It means that every timer called during `runAllTimersAsync` will be fired even asynchronous timers. If you have an infinite interval,
it will throw after 10 000 tries (can be configured with `fakeTimers.loopLimit`).

```ts
setTimeout(async () => {
  console.log(await Promise.resolve('result'))
}, 100)

await vi.runAllTimersAsync()

// log: result
```

### vi.runOnlyPendingTimers

```ts
function runOnlyPendingTimers(): Vitest
```

This method will call every timer that was initiated after `vi.useFakeTimers` call. It will not fire any timer that was initiated during its call.

```ts
let i = 0
setInterval(() => console.log(++i), 50)

vi.runOnlyPendingTimers()

// log: 1
```

### vi.runOnlyPendingTimersAsync

```ts
function runOnlyPendingTimersAsync(): Promise<Vitest>
```

This method will asynchronously call every timer that was initiated after `vi.useFakeTimers` call, even asynchronous ones. It will not fire any timer that was initiated during its call.

```ts
setTimeout(() => {
  console.log(1)
}, 100)
setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(2)
    setInterval(() => {
      console.log(3)
    }, 40)
  })
}, 10)

await vi.runOnlyPendingTimersAsync()

// log: 2
// log: 3
// log: 3
// log: 1
```

### vi.setSystemTime

```ts
function setSystemTime(date: string | number | Date | Temporal.Instant | Temporal.ZonedDateTime): Vitest
```

If fake timers are enabled, this method simulates a user changing the system clock (will affect date related API like `hrtime`, `performance.now` or `new Date()`) - however, it will not fire any timers. If fake timers are not enabled, this method will only mock `Date.*` and `Temporal.Now.*` calls.

Useful if you need to test anything that depends on the current date - for example Luxon calls inside your code.

Accepts the same string and number arguments as the `Date`, or a `Temporal.Instant` or `Temporal.ZonedDateTime`. Vitest uses the moment represented by a `ZonedDateTime` as the mocked time and leaves the environment's time zone unchanged.

```ts
const date = new Date(1998, 11, 19)

vi.useFakeTimers()
vi.setSystemTime(date)

expect(Date.now()).toBe(date.valueOf())

vi.useRealTimers()
```

### vi.useFakeTimers

```ts
function useFakeTimers(config?: FakeTimersConfig): Vitest
```

To enable mocking timers, you need to call this method. It will wrap all further calls to timers (such as `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `setImmediate`, `clearImmediate`, and `Date`) until `vi.useRealTimers()` is called.

Mocking `nextTick` is not supported when running Vitest inside `node:child_process` by using `--pool=forks`. NodeJS uses `process.nextTick` internally in `node:child_process` and hangs when it is mocked. Mocking `nextTick` is supported when running Vitest with `--pool=threads`.

The `now` option accepts a `Date`, number, `Temporal.Instant`, or `Temporal.ZonedDateTime`. Vitest uses the moment represented by a `ZonedDateTime` as the mocked time and leaves the environment's time zone unchanged.

The implementation is based internally on `@sinonjs/fake-timers`.

**Tip:**
`vi.useFakeTimers()` does not automatically mock `process.nextTick` and `queueMicrotask`.
But you can enable it by specifying the option in `toFake` argument: `vi.useFakeTimers({ toFake: ['nextTick', 'queueMicrotask'] })`.

You can use `toFake` to specify which timers to mock, or `toNotFake` to specify which timers to keep native. Note that `toFake` and `toNotFake` cannot be specified together.

```ts
// only mock setTimeout and clearTimeout
vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })

// mock all timers except setInterval
vi.useFakeTimers({ toNotFake: ['setInterval'] })
```

### vi.setTimerTickMode <Version>4.1.0</Version> {#vi-settimertickmode}

- **Type:** `(mode: 'manual' | 'nextTimerAsync') => Vitest | (mode: 'interval', interval?: number) => Vitest`

Controls how fake timers are advanced.

- `manual`: The default behavior. Timers will only advance when you call one of `vi.advanceTimers...()` methods.
- `nextTimerAsync`: Timers will be advanced automatically to the next available timer after each macrotask.
- `interval`: Timers are advanced automatically by a specified interval.

When `mode` is `'interval'`, you can also provide an `interval` in milliseconds. See Tick Modes for when to use each mode.

**Example:**

```ts
import { vi } from 'vitest'

vi.useFakeTimers()

// Manual mode (default)
vi.setTimerTickMode('manual')

let i = 0
setInterval(() => console.log(++i), 50)

vi.advanceTimersByTime(150) // logs 1, 2, 3

// nextTimerAsync mode
vi.setTimerTickMode('nextTimerAsync')

// Timers will advance automatically after each macrotask
await new Promise(resolve => setTimeout(resolve, 150)) // logs 4, 5, 6

// interval mode (default when 'fakeTimers.shouldAdvanceTime' is `true`)
vi.setTimerTickMode('interval', 50)

// Timers will advance automatically every 50ms
await new Promise(resolve => setTimeout(resolve, 150)) // logs 7, 8, 9
```

### vi.isFakeTimers {#vi-isfaketimers}

```ts
function isFakeTimers(): boolean
```

Returns `true` if fake timers are enabled.

### vi.useRealTimers

```ts
function useRealTimers(): Vitest
```

When timers have run out, you may call this method to return mocked timers to its original implementations. All timers that were scheduled before will be discarded.
