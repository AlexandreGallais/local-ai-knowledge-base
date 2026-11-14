---
title: "Agent communication and coordination (part 3 of 5)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/agent_communication_and_coordination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Agent communication and coordination (part 3 of 5)

## Waiting and notifying

In the examples above, wherever an agent is waiting on another agent to complete its operation, we use an infinite loop, like the `while (Atomics.load(a, 1) !== 1);` example. This is called busy waiting. Essentially, it blocks the entire thread from executing other jobs, until some other thread writes the value it expects. You can make this slightly more efficient by calling `Atomics.pause()` inside the `while` loop. This method may tell the CPU to allocate fewer resources because it's just waiting and not actually doing computation, without asking the CPU to be immediately yielded to other threads.

```js
// -- worker.js --
while (Atomics.load(a, 1) !== 1) {
  Atomics.pause();
}
```

Alternatively, you can change it to an explicit notification-based system while still keeping it sync. The `Atomics.wait()` and `Atomics.notify()` methods allow you to do so—the waiting thread doesn't have to keep checking the value; the writing thread notifies it whenever the writing is done.

> **Note:**
> Unlike the previously-introduced methods, `wait()`, `waitAsync()`, and `notify()` can only operate on `Int32Array` and `BigInt64Array` views.

Here, the `worker.js` thread is halted if `a[1] === 0`.

```js
// -- worker.js --
Atomics.wait(a, 1, 0);
console.log(a[0]);
```

It stays halted until another thread—in our case, `main.js`—notifies it:

```js
// -- main.js --
a[0] = 63;
Atomics.store(a, 1, 1);
Atomics.notify(a, 1);
```

Some important notes to call out:

- `Atomics.wait()` also blocks the thread from executing other jobs. On the web, the main thread cannot be blocked, so calling `Atomics.wait()` throws an error there.
- `Atomics.wait()` returns whenever it has been notified, regardless of whether `a[1]` has actually changed.
- Other than checking the initial value, the memory index that `store` and `wait` operate on is entirely arbitrary: they do not care what that value actually represents. The index serves as the ID of the list of waiting agents. The initial flag check ensures that if the worker `wait` happens after `notify` is already called, the `wait` continues immediately instead of sleeping forever, so you should set and only set `a[1]` to `1` (representing "Ready" in our case) immediately before calling `notify`.

You can also specify a `timeout`, after which the thread resumes despite not receiving a notification:

```js
// -- worker.js --
const result = Atomics.wait(a, 1, 0, 100); // Wait about 100ms
if (result === "timed-out") {
  // Decide what to do here: wait again? Throw an error?
  // Change to an asynchronous wait instead?
} else {
  // result can be either "not-equal" - i.e., a[1] is already "Ready"
  // without waiting or "ok" - i.e., some other thread notified it
  console.log(a[0]);
}
```

The `Atomics.waitAsync()` method provides the same functionality as `wait()`, but in the form of a promise, thus allowing other asynchronous jobs to proceed in the meantime.

```js
// -- main.js --
const result = Atomics.waitAsync(a, 1, 0, 100); // Wait about 100ms
if (!result.async) {
  // Already ready
  // (Note: because timeout is not 0, result.value is always "not-equal")
  console.log(a[0]);
} else {
  const resultValue = await result.value;
  if (resultValue === "ok") {
    console.log(a[0]);
  } else {
    // resultValue is "timed-out" here; decide what to do
  }
}
```

You must carefully weigh the impacts of the three waiting mechanisms:

- Busy waiting blocks the thread without yielding the CPU. When it finishes, the CPU can immediately resume without context switching, but while it's spinning, this core is occupied and cannot take other jobs (although the operating system may decide to schedule in some other thread if the current thread has used the CPU for too long). This is the fastest mechanism when you expect the wait to be very short, even shorter than the time taken by two context switches.
- Synchronous `Atomics.wait()` blocks the thread but yields the CPU. The CPU core can take other threads and may need to context switch when this thread continues. This is the most efficient mechanism when you expect the wait to be longer than two context switches and it might be better to let other threads use the CPU in the meantime, but you prefer to keep the code synchronous.
- Asynchronous `Atomics.waitAsync()` uses normal promise semantics: the code that waits for its completion comes back as another job in the agent, but other code in the same thread keeps executing. This is useful when the current thread has other jobs that are equally important and must proceed in the meantime, such as the main thread, which needs to render the page and respond to user interactions.
