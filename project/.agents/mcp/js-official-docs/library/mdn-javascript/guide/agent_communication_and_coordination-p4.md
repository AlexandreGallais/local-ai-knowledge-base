---
title: "Agent communication and coordination (part 4 of 5)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/agent_communication_and_coordination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Agent communication and coordination (part 4 of 5)

## Useful shared memory patterns

Let's look at a few common techniques and concepts for ensuring the performance and correctness of multi-threading.

A shared memory protocol needs to answer these questions:

- Who may access each part of the memory?
- Which operations must happen together without interleaving operations from other threads?
- How does an agent know that data is ready to read or safe to overwrite?
- How much work does the protocol require when an agent is working alone, and what happens when many agents compete for access?

### Locks and mutexes

A _lock_, also called a _mutex_ (for "mutual exclusion"), is a mechanism that ensures that while a thread has access to a particular resource, no other thread can have access to the same resource. Each thread acquires the lock before accessing protected data and releases it afterwards. The code between acquisition and release is called a _critical section_.

> **Note:**
> A _futex_ is short for a "fast user-space mutex", but somewhat confusingly, it is not a mutex—it is a waiting mechanism that can be used to implement a mutex. In JavaScript, futexes are the only built-in waiting mechanism, provided by `Atomics.wait()`/`Atomics.waitAsync()` and `Atomics.notify()`; our mutex examples build upon this mechanism.

A mutex is merely a protocol and does not physically prevent another thread from accessing the memory. As long as the protocol is upheld, different threads will never have overlapping critical sections, thus protecting a whole sequence of operations without making each individual read and write atomic.

For example, create a buffer with space for a lock and a value. In our protocol, each participating agent will create an `Int32Array` view where the first element represents the lock (`1` means unlocked, `0` means locked) and the second holds the protected data.

```js
const sab = new SharedArrayBuffer(8);
const shared = new Int32Array(sab);
shared[0] = 1;
```

Here's how one participating agent may implement that protocol. When an agent calls `lock()` to try to acquire the lock:

- `Atomics.compareExchange()` is called, attempting to set the first element to `0` (locked), but only if it's currently `1` (available).
- If that fails—i.e., when it's already `0` because another agent is holding the lock—`Atomics.wait()` puts the caller to sleep, provided the lock still contains `0` (the lock may have been released between `compareExchange()` and `wait()`).
- The agent will only wake up when the agent currently holding the lock calls `unlock()`, which both resets the lock element to `1` and wakes the earliest waiting agent in the queue with `Atomics.notify()`.
- After waking, the agent tries to acquire the lock again, but it may still fail if there's a newcomer (for example, if the releasing agent immediately calls `lock()` again) who got the lock first, in which case this agent goes back to sleep again due to the `while()` loop.
- The loop only exits when lock acquisition succeeds.

```js
function lock() {
  while (Atomics.compareExchange(shared, 0, 1, 0) !== 1) {
    Atomics.wait(shared, 0, 0);
  }
}

function unlock() {
  Atomics.store(shared, 0, 1);
  Atomics.notify(shared, 0, 1);
}
```

Here's how the lock-unlock pair can be called. The critical section must be wrapped in a `try...finally` block, with `unlock()` called in `finally`, so the lock is released even if the critical section throws an exception:

```js
lock();
try {
  shared[1] *= 2;
  shared[1] += 1;
} finally {
  unlock();
}
```

Although the critical section uses ordinary indexed read/write, other agents will never observe stale values, because the atomic operations in `lock()`/`unlock()` establish a sequentially-consistent ordering.

One mutex around all shared data is a straightforward starting point, but it serializes all protected work. If agents can operate on independent regions, giving those regions separate locks—or assigning each region to a single writer—can allow more concurrency.

This simple mutex has multiple opportunities for improvement:

- What if an agent accidentally calls `unlock()` when the lock wasn't actually held by it?
    We can solve this by replacing the boolean flag with a unique ID for each agent, so `unlock()` only proceeds if the ID in the lock matches the agent ID.
- What if an agent accidentally calls `lock()` when it's already holding the lock (this is called _re-entry_)? This would cause it to wait on itself indefinitely, and all other agents waiting for the lock will also never get it.
    We can solve this by making `lock()` only wait if the owner ID in the lock doesn't match the current ID.

    > **Note:**
    > Re-entry is commonly seen in nested function calls; for example if a critical section calls another function that also tries to establish a critical section using the same lock. If the lock is non-reentrant (it doesn't implement this mechanism), then each agent must ensure that the critical section is never re-entered.

- What if the agent that re-enters the lock calls `unlock()`? This would cause the lock to be released early, despite there being another `lock()` call that expects the lock to still be held.
    We need to add a counter that increments on each `lock()` and decrements on each `unlock()`, and only actually release the lock when the counter reaches zero.
- What if the waiting agent always loses to a newcomer and never gets the lock?
    We need some scheduling mechanism to ensure that the newcomer doesn't jump the queue.

### Spinlocks

In the example above, an agent waiting for the lock goes to sleep and requires the other agent to notify it with `unlock()`. This is efficient when contention is high, because the lock may not be acquired quickly and it's best to yield the CPU to other processes not needing the lock. But when contention is low, scheduling the thread in and out of the CPU creates extra overhead compared to just occupying the CPU while waiting.

A _spinlock_ uses busy waiting instead of putting contenders to sleep. To turn the previous mutex into a spinlock, replace its functions with:

```js
function lock() {
  while (Atomics.compareExchange(shared, 0, 1, 0) !== 1) {
    Atomics.pause();
  }
}

function unlock() {
  Atomics.store(shared, 0, 1);
}
```

The `Atomics.pause()` here is just a performance hint to the CPU. You can remove it and still keep the same functionality.

> **Warning:**
> Using spinlocking on the main thread is not recommended, as it will freeze the entire page. In general, unless designed very carefully, spinlocks may not actually be more performant than a regular wait.

Sometimes, whether contention is high or low is not for you to decide while writing the code. The same code may run when there are only two contenders and busy-waiting is more efficient, or when there are a thousand contenders and it must use a regular wait. In this case, you can use a hybrid approach, which is to first spin for a little while (say, 10 iterations), and if the lock is still not acquired, then call `Atomics.wait()`. There's an example on the `Atomics.pause()` page.

### Semaphores

A mutex only allows one agent to access the resource at a time; a _semaphore_, on the other hand, generalizes that to allow up to a specified number of simultaneous agents.

To implement this, the shared memory maintains a count of available _permits_: acquiring a permit decrements the count, releasing one increments it, and an agent waits if no permits are available.

```js
const sab = new SharedArrayBuffer(4);
const permits = new Int32Array(sab);
permits[0] = 3;
```

Each worker creates its own view of that buffer and uses the following functions:

```js
const permits = new Int32Array(sab);

function acquire() {
  while (true) {
    const available = Atomics.load(permits, 0);
    if (available === 0) {
      Atomics.wait(permits, 0, 0);
    } else if (
      Atomics.compareExchange(permits, 0, available, available - 1) ===
      available
    ) {
      return;
    }
  }
}

function release() {
  Atomics.add(permits, 0, 1);
  Atomics.notify(permits, 0, 1);
}

acquire();
try {
  // Perform a task that requires one permit.
} finally {
  release();
}
```

You might notice that if we set the maximum number of permits to `1`, we arrive at essentially the same code as the mutex example—indeed, our simple mutex is just a _binary semaphore_ (at most 1 permit).

A semaphore with multiple permits (called a _counting semaphore_) still runs into problems when the concurrent agents try to access the same resource. The goal of a semaphore is to moderate access to a limited resource pool (for example, if there are only 4 available buffers). You still need a separate mechanism to assign these resources to the agents to avoid simultaneous access.

### Avoiding deadlocks

A _deadlock_ occurs when agents wait on each other in a cycle, so none can make progress. For example:

1. Agent A acquires lock X.
2. Agent B acquires lock Y.
3. Agent A waits to acquire Y, while still holding X.
4. Agent B waits to acquire X, while still holding Y.

```js
// -- a.js --
lockX.lock();
try {
  lockY.lock(); // Waiting for lockY.unlock() in b.js...
  try {
    // Work requiring both locks
  } finally {
    lockY.unlock();
  }
} finally {
  lockX.unlock();
}
```

```js
// -- b.js --
lockY.lock();
try {
  lockX.lock(); // Waiting for lockX.unlock() in a.js...
  try {
    // Work requiring both locks
  } finally {
    lockX.unlock();
  }
} finally {
  lockY.unlock();
}
```

Neither agent can reach the code that releases its lock.

Waiting on a lock is just one way to enter a deadlock: two agents may also wait on a message from the other agent, etc.

Preventing deadlocks requires very high discipline within each agent. For example, when an operation needs multiple locks, the protocol must specify the order in which these locks are acquired. Each agent must make sure that locks are eventually released, especially in case of errors (by using `try...finally`). How such protocols can be enforced at the compiler or static checker level is an active area of research.

### Lock-free algorithms

Locks are powerful and convenient (when implemented correctly), but they are also a bit heavyweight, especially when there's no contention. For every critical section—which may be as short as a single read/write operation—the mutex above incurs the overhead of an `Atomics.compareExchange()`, an `Atomics.store()`, and—except when using spinlocks—an `Atomics.notify()`.

In fact, even something as simple as `Atomics.load(uint16, 0)` might need an internal lock! If you think about it, an element in a `Uint16Array` is comprised of two bytes. If an extremely simple CPU only allows reading memory byte-by-byte, it would look like the following (assuming little-endian byte order):

```js
const firstByte = uint8[0]; // uint8 is the same memory span viewed as Uint8Array
const secondByte = uint8[1];

const value = firstByte + (secondByte << 8);
```

If another agent writes a new two-byte value between the first and second statements, the final read may combine bytes from the old and new values, rather than being a coherent `uint16` value. This is called a _torn read_. Atomic reads and writes of the same element never tear, because the engine either puts a lock on the bytes of interest or uses native CPU instructions that provide the required atomicity. Locking involves two extra steps (acquisition and release) and can be much slower than a lock-free implementation; whether the former or the latter is used depends on the operating system, CPU architecture, JavaScript engine, etc., as well as the byte size of the operation. To know if atomic operations on a specific byte size in your current environment are implemented without locks, use `Atomics.isLockFree()`.

```js
Atomics.isLockFree(4); // true: required for 4-byte atomic operations
Atomics.isLockFree(7); // false: not a supported atomic element size
```

Not all operations are _tear-free_. Read/write on `Int16`, `Uint16`, `Int32`, `Uint32` types never tear, whether using `Atomics` or indexed access. Other data types may tear if you use indexed access, so you need to use `Atomics` to avoid tears, or—for unsupported types like floating point—implement a lock yourself. `Atomics.isLockFree` tells you whether such tear-free guarantee comes from a lock or a native instruction.

You can also avoid locks in your own code. Recall the atomic multiplication code from above:

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

There's no explicit lock here. The agent doesn't actively enforce a critical section; it just repeatedly retries the read-write sequence until there turns out to be no contender in between. This makes the no-contender case as fast as possible, but may retry many times when contention is high.
