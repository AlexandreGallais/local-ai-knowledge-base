---
title: "Agent communication and coordination (part 5 of 5)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/agent_communication_and_coordination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Agent communication and coordination (part 5 of 5)

### Producer–consumer handoff

A common case where two threads need to access the same memory is when one is a _producer_ and the other is a _consumer_. With a normal lock, each time, both agents compete for the lock, and if the data isn't ready yet (for example, the producer finds that the consumer hasn't read it, or the consumer finds that the producer hasn't written it; you also need a separate readiness flag to track this), that agent goes back to sleep and lets the other agent take the lock; this is inefficient. The _handoff_ pattern lets two agents take turns, coalescing the lock and the readiness flag into the same protocol.

Again, we start with a 2-element shared memory. The first element is a state flag: `0` means empty and `1` means full. The second element holds one value.

```js
const sab = new SharedArrayBuffer(8);
const shared = new Int32Array(sab);
```

The producer waits while the value slot is "full" (i.e., the consumer has not read it). When the slot is "empty", it writes the new value and notifies the consumer.

```js
// -- producer.js --
function produce(value) {
  while (Atomics.load(shared, 0) !== 0) {
    Atomics.wait(shared, 0, 1);
  }

  shared[1] = value;
  Atomics.store(shared, 0, 1);
  Atomics.notify(shared, 0, 1);
}

produce(63);
produce(64);
```

Conversely, the consumer waits while the value slot is "empty", and reads the new value when it becomes "full".

```js
// -- consumer.js --
function consume() {
  while (Atomics.load(shared, 0) !== 1) {
    Atomics.wait(shared, 0, 0);
  }

  const value = shared[1];
  Atomics.store(shared, 0, 0);
  Atomics.notify(shared, 0, 1);
  return value;
}

console.log(consume()); // 63
console.log(consume()); // 64
```

This protocol depends on having exactly one producer and one consumer. With multiple producers, two agents could both see an empty slot and overwrite each other's data, so you would still need a mutex among the producers. The same goes for consumers. This is still an improvement over a shared lock among all producers and consumers though: it lets control alternate between the _groups_ of producers and consumers without competition.

## Number-guessing game using shared memory

To close off this guide, let's re-implement our number-guessing game with this handoff pattern. Both agents alternate between producing and consuming: the worker produces a guess, and the main thread consumes it and produces feedback. They share two integers:

- `shared[0]` indicates whose turn it is: `0` for the worker and `1` for the main thread.
- `shared[1]` holds either the guess or the feedback, depending on whose turn it is. Feedback is `-1` for "Too low", `1` for "Too high", and `0` for "Correct".

```js
// -- main.js --
const worker = new Worker("./worker.js", { type: "module" });
const sab = new SharedArrayBuffer(8);
const shared = new Int32Array(sab);
const secretNumber = 63;

// The turn flag is initially 0, so the worker takes the first turn
worker.postMessage(sab);

// Wait until the worker has started. The browser may not start the
// worker until the main thread returns to the event loop.
await new Promise((resolve) => {
  worker.addEventListener("message", resolve, { once: true });
});

while (true) {
  // Wait until the worker finishes its turn
  while (Atomics.load(shared, 0) !== 1) {
    // We use busy waiting here because we expect the worker to come
    // back very quickly and the main thread can't use Atomics.wait().
    // In more complex scenarios, you probably want to use Atomics.waitAsync()
    // to avoid blocking the main thread.
    Atomics.pause();
  }

  const workerGuess = shared[1];
  console.log("Worker guessed:", workerGuess);
  const feedback =
    workerGuess < secretNumber ? -1 : workerGuess > secretNumber ? 1 : 0;

  shared[1] = feedback;
  Atomics.store(shared, 0, 0);
  Atomics.notify(shared, 0, 1);

  if (feedback === 0) {
    console.log("<example-value>");
    break;
  }
}
```

```js
// -- worker.js --
const sab = await new Promise((resolve) => {
  self.addEventListener("message", (e) => resolve(e.data), { once: true });
});
const shared = new Int32Array(sab);
let low = 0;
let high = 100;

// Tell the main thread that the worker has started
self.postMessage("ready");

while (true) {
  const lastGuess = Math.floor((low + high) / 2);
  // Worker initiates the handoff here by making a guess
  shared[1] = lastGuess;
  Atomics.store(shared, 0, 1);
  Atomics.notify(shared, 0, 1);

  // Wait until the main agent writes the feedback
  while (Atomics.load(shared, 0) !== 0) {
    Atomics.wait(shared, 0, 1);
  }

  const feedback = shared[1];
  if (feedback === 0) {
    console.log("Yay");
    break;
  }
  if (feedback === -1) {
    low = lastGuess + 1;
  } else if (feedback === 1) {
    high = lastGuess - 1;
  }
  if (low > high) {
    throw new Error(
      "Sorry, the feedback from main.js is inconsistent and I suspect main is cheating",
    );
  }
}
```

This implements the same functionality, and note how both loops are synchronous—this should be much more efficient than passing messages back and forth!

## See also

- JavaScript execution model
- Web workers API
- `SharedArrayBuffer`
- `Atomics`
- `Worker.postMessage()`
