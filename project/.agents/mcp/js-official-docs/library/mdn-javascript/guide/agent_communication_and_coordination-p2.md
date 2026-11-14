---
title: "Agent communication and coordination (part 2 of 5)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/agent_communication_and_coordination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Agent communication and coordination (part 2 of 5)

## Accessing shared memory with Atomics

In the example above, we use a message to force the following order:

1. Worker writes to memory
2. Worker posts message
3. Main agent receives message and runs event listener
4. Main agent reads memory

The problem with event-based coordination is that events are asynchronous: the time between steps 2 and 3 is dependent on the browser's event loop. In this case, you might as well pass <example-value> back and forth without relying on shared memory. The advantage of shared memory is exactly that you can (mostly) communicate synchronously, without yielding the job queue to other async tasks.

In a single agent, the run-to-completion semantics ensure well-behaved effect ordering with respect to multiple synchronous jobs:

```js
const promise = Promise.resolve();
let i = 0;
promise.then(() => {
  i += 1;
  console.log(i);
});
promise.then(() => {
  i += 1;
  console.log(i);
});
```

Here, the overall order is always `i += 1; console.log(i); i += 1; console.log(i);` and never `i += 1; i += 1; console.log(i); console.log(i);`.

There aren't such guarantees when the synchronous jobs belong to different agents. In the example below, the worker sends the main agent a `started` message and immediately starts incrementing the shared integer in a loop. Upon receipt of the message, the main agent runs the same loop at the same time. When the worker finishes, it sends a `finished` message, and the main agent logs the final value.

```js
// -- main.js --
const i = new Int32Array(sab, 0, 1);

port1.addEventListener("message", ({ data }) => {
  if (data === "started") {
    for (let n = 0; n < 10_000_000; n++) {
      i[0] += 1;
    }
  } else if (data === "finished") {
    console.log(i[0]); // Usually less than 20000000
  }
});
```

```js
// -- worker.js --
const i = new Int32Array(sab, 0, 1);

port.postMessage("started");
for (let n = 0; n < 10_000_000; n++) {
  i[0] += 1;
}
port.postMessage("finished");
```

Because messages to a port are delivered in order, the `finished` handler always runs after the main agent's own loop has completed, so both agents have finished counting by the time the value is logged. Still, the logged value is probably less than `20000000`, and it differs between runs. This is because `i[0] += 1` is not a single step: it reads `i[0]`, adds 1, and writes the result back. There are at least two orders possible; the first one, which doesn't lose an increment, is:

1. `main.js` reads `i[0]` as `currentI`
2. `main.js` writes `i[0] = currentI + 1`
3. `worker.js` reads `i[0]` as `currentI + 1`
4. `worker.js` writes `i[0] = currentI + 2`

The second one, which loses an increment, is:

1. `main.js` reads `i[0]` as `currentI`
2. `worker.js` reads `i[0]` as `currentI`
3. `main.js` writes `i[0] = currentI + 1`
4. `worker.js` writes `i[0] = currentI + 1`

To solve this problem, we must use a mechanism to ensure execution order across agents, so a statement in `worker.js` cannot execute until a statement in `main.js` finishes and its effect becomes observable, and vice versa. Methods from the `Atomics` namespace provide this capability.

### Reading and writing

The most basic `Atomics` primitives are `Atomics.load()` and `Atomics.store()`, which read and write at a particular index, respectively. They can be used with any signed or unsigned integer arrays (except `Uint8ClampedArray`).

The problem with the index read/write syntax is that the effect of a write is not required to be observable immediately to other agents. Consider the following indexed read/write:

```js
// -- main.js --
const a = new Int32Array(sab);
a[0] = 63;
console.log("Main:", a[1]);
```

```js
// -- worker.js --
const a = new Int32Array(sab);
a[1] = 15;
console.log("Worker:", a[0]);
```

Theoretically, no matter how these operations are ordered, as long as each agent executes its code in order, at least one log entry must be non-`0` (try listing all possible orderings of the four statements, with the constraint that `a[0] = 63` is before `console.log(a[1])`, and `a[1] = 15` is before `console.log(a[0])`!). However, in reality, both logs may print 0. This may arise from the following order:

1. `main.js` reads `a[1]` as `0`.
2. `worker.js` reads `a[0]` as `0`.
3. `main.js` writes `a[0] = 63`.
4. `worker.js` writes `a[1] = 15`.
5. `main.js` and `worker.js` execute their `console.log` using already-retrieved `a[1]` and `a[0]` values, respectively.

Note how the expressions that read `a[1]` and `a[0]`, which come towards the end of the source code, are reordered to be executed before the `a[0] = 63` and `a[1] = 15` statements. This kind of instruction reordering can happen in both the JavaScript compiler and the CPU in order to optimize consecutive memory operations. Within each single agent, this ordering perfectly preserves the sequential-execution guarantees you would expect. For example, for `main.js`, the `a[0] = 63` write is never read back, so it's perfectly fine to reorder it after the `a[1]` read. However, this causes problems with multiple agents.

With `Atomics.load()` and `Atomics.store()`, you explicitly tell the compiler and the CPU that such reordering is not permitted, and the order of memory read/write must be consistent with the order of JavaScript code execution.

```js
// -- main.js --
const a = new Int32Array(sab);
Atomics.store(a, 0, 63);
console.log("Main:", Atomics.load(a, 1));
```

```js
// -- worker.js --
const a = new Int32Array(sab);
Atomics.store(a, 1, 15);
console.log("Worker:", Atomics.load(a, 0));
```

Here, although you may still see `0` in one of the logs (for example, because the main `load` happens before the worker `store`), they are guaranteed to never both be `0`.

> **Note:**
> If you want to go further and guarantee that both new values are observed, you need to make both agents wait before the `Atomics.load()` call, such as using a `while (Atomics.load(a, 1) === 0);` loop.

Furthermore, atomic load/store operations establish a partial ordering for other _non-atomic_ read/write operations. Specifically, if agent A runs `Atomics.store()`, and then agent B reads the same value with `Atomics.load()`, then all non-atomic writes executed by A before the atomic store must also become observable to all non-atomic reads executed by B after the atomic load. This essentially create a "synchronization point" between two threads, much like a `message` event. For example:

```js
// -- main.js --
a[0] = 63;
// Set a "Ready" flag in a[1]; assume initially it's not 1.
Atomics.store(a, 1, 1);
```

```js
// -- worker.js --
// Spin until a[1] receives the "Ready" flag
while (Atomics.load(a, 1) !== 1);
console.log(a[0]); // 63
```

> **Note:**
> Within a single agent, the `worker.js` code would definitely be a bug because it's not possible for `a[1]` to have changed in the loop if the loop is never updating the value. Many synchronous infinite loops only make sense with shared memory!
>
> In Waiting and notifying, we'll see how to make this code slightly more performant and less like a bug.

The only possible order is the following:

1. `main.js` writes `a[0] = 63`. `worker.js` keeps spinning in the `while` loop because `a[1]` isn't the right value.
2. `main.js` stores `a[1]` as `1`.
3. `worker.js` loads the new `a[1]` value and exits the `while` loop.
4. `worker.js` reads `a[0]` as `63`.

We have successfully established an ordering from 1 to 4 with the help of the store/load pair, so `worker.js` can observe the new value of `a[0]` written by `main.js`, despite not using atomic operations.

### Atomic updates

The next set of operations directly replace several compound assignment operators. As we already demonstrated, the `+=` operator is not atomic: other instructions may execute between the read and the write, causing the final write to not write the value you expect. To fix this, you can replace it with `Atomics.add()`:

```js
// -- main.js --
const i = new Int32Array(sab, 0, 1);

port1.addEventListener("message", ({ data }) => {
  if (data === "started") {
    for (let n = 0; n < 10_000_000; n++) {
      Atomics.add(i, 0, 1);
    }
  } else if (data === "finished") {
    console.log(i[0]); // Guaranteed 20000000
  }
});
```

```js
// -- worker.js --
const i = new Int32Array(sab, 0, 1);

port.postMessage("started");
for (let n = 0; n < 10_000_000; n++) {
  Atomics.add(i, 0, 1);
}
port.postMessage("finished");
```

The only difference from the previous data-race example is that we've replaced both `i[0] += 1` statements with `Atomics.add(i, 0, 1)`. But now, not only does it have the same "sequentially consistent" guarantee of `load`/`store`, but each block of read-modify-write sequence is also guaranteed to be atomic, so there are two atomic blocks that can be freely ordered but never interleaved:

1. Atomic block:
   1. `main.js` reads `i[0]` as `currentI`
   2. `main.js` writes `i[0] = currentI + 1`
2. Atomic block:
   1. `worker.js` reads `i[0]` as `currentI + 1`
   2. `worker.js` writes `i[0] = currentI + 2`

A few other compound assignment operators have their respective `Atomics` methods:

| Operator                                                                      | Method                      |
| ----------------------------------------------------------------------------- | --------------------------- |
| `+=`    | `Atomics.add()` |
| `-=` | `Atomics.sub()` |
| `&=` | `Atomics.and()` |
| `\|=` | `Atomics.or()`  |
| `^=` | `Atomics.xor()` |

If your operation does not correspond to one of the methods above, you can still use the general `Atomics.compareExchange()` method instead. This method is a replacement for the following sequence:

```js
const oldValue = array[index];
if (oldValue === expectedValue) {
  array[index] = newValue;
}
return oldValue;
```

For example, if you have an operation `array[index] *= multiplier`, you can make it atomic using the following:

```js
function atomicMultiply(array, index, multiplier) {
  let oldValue = Atomics.load(array, index);

  while (true) {
    const observed = Atomics.compareExchange(
      array,
      index,
      oldValue,
      oldValue * multiplier,
    );

    if (observed === oldValue) {
      return oldValue;
    }

    oldValue = observed;
  }
}
```

This function spins in a loop. Each time, it tries to write `oldValue * multiplier`, on the condition that at the time of its atomic block, the value at that index is still `oldValue`. If the value has changed, it re-attempts with the new `oldValue`.

There's also an unconditional exchange method, `Atomics.exchange()`. This method is a replacement for the following sequence:

```js
const oldValue = array[index];
array[index] = newValue;
return oldValue;
```

Use this method when you want to reset some memory while obtaining its value at the time of reset. For example, it can be used for a clock:

```js
// -- worker.js --
while (true) {
  Atomics.add(a, 0, 1);
}
```

```js
// -- main.js --
const ticksSinceLastCheck = Atomics.exchange(a, 0, 0);
// ticksSinceLastCheck records how many times the worker has spun.
```

If you split this into a `load` and a `store` operation, then the worker may have performed another `add` in the meantime, which is silently dropped.
