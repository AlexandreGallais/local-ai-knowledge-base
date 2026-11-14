---
title: "Agent communication and coordination (part 1 of 5)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/agent_communication_and_coordination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Agent communication and coordination

**Agents** is the JavaScript formal terminology for describing autonomous JavaScript executors. Most JavaScript you write gets executed in a single thread, but you may create more threads with specific platform APIs such as web workers.

This guide explains general computer science concepts related to thread coordination and how JavaScript implements them. It also introduces the APIs for enabling cross-thread communication: `postMessage()`, `SharedArrayBuffer`, and `Atomics`.

It is recommended to understand Typed arrays before reading this. Afterwards, you can continue with the Execution model reference to dive into the technical details.

> **Note:**
> In this article, we will use "thread" and "agent" interchangeably. An agent is a JavaScript engine abstraction, while a thread is an implementation detail; an agent may or may not run in a separate operating system thread. Technically, we should have used "agents" everywhere because you can only interact with agents in JavaScript, but when talking about general computer science concepts like locks, it's much more natural to use "threads".
>
> Also, this guide has nothing to do with AI agents.

## Communication between two agents

The JavaScript language spec does not provide APIs for creating agents, getting a reference to another agent, or exchanging data between them. Although the concept of "workers" exists in both the web and in Node.js, their APIs are largely distinct. This guide uses web workers.

### Creating agents

A parent agent creates and holds a reference to a child agent using the `Worker()` constructor:

```js
// -- main.js --
const worker = new Worker("./worker.js", { type: "module" });
```

The parent agent can be a window or another worker. For example, to run this example in a browser, you can reference `main.js` in an HTML file:

```html
<script src="main.js" type="module"></script>
```

### Communication via messages

Two agents communicate using _messages_. Messages are sent over _message channels_. The parent agent (`main.js` here) and its child agent (`worker.js` here) have a message channel by default, which routes to their default ports:

- `main.js` sends messages using `worker.postMessage()`, and receives messages using the `message` event on the `worker` object.
- `worker.js` sends messages using `self.postMessage()`, and receives messages using the `message` event on `self`.

However, this is limited to communication between the creator and the agent it creates. When you want any two agents to communicate, you need to use a dedicated `MessageChannel`. You pass one of its `MessagePort` objects to the worker over the default channel, and then exclusively use that port:

```js
// -- main.js --
const worker = new Worker("./worker.js", { type: "module" });
const { port1, port2 } = new MessageChannel();

// We'll explain the [port2] parameter soon
worker.postMessage({ hereIsYourPort: port2 }, [port2]);

// Mark the port as ready for receiving messages
port1.start();
```

```js
// -- worker.js --
// Use top-level await (only available inside modules) so code following it
// only evaluates when the port is received
const port = await new Promise((resolve, reject) => {
  self.addEventListener(
    "message",
    (e) => {
      const port = e.data.hereIsYourPort;
      if (!(port instanceof MessagePort)) {
        reject(new Error("I'm expecting a dedicated port"));
        return;
      }
      resolve(port);
    },
    { once: true },
  );
});

// Mark the port as ready for receiving messages
port.start();
```

> **Note:**
> In all subsequent examples, we'll assume that these lines exist at the top of `main.js` and `worker.js`. We won't repeat them.

Now, each agent can call `postMessage()` and listen for `message` events on the `MessagePort` object.

Using message channels, you can also connect two agents that aren't in a parent-child relationship, such as two workers created by the same thread:

```js
const { port1, port2 } = new MessageChannel();
const worker1 = new Worker("./worker1.js", { type: "module" });
const worker2 = new Worker("./worker2.js", { type: "module" });

worker1.postMessage({ hereIsYourPort: port1 }, [port1]);
worker2.postMessage({ hereIsYourPort: port2 }, [port2]);
```

As a practical example, we implement a number-guessing game. `main.js` defines a secret <example-value>, and `worker.js` tries to guess it. Each time, `main.js` tells `worker.js` whether the guess is correct, too low, or too high, and the worker adjusts its guess. Here's how `main.js` can receive guesses from the worker using `MessageEvent.data`, and provide feedback using `port1.postMessage()`:

```js
// -- main.js --
const secretNumber = 63;

port1.addEventListener("message", (e) => {
  const workerGuess = e.data;
  console.log("Worker guessed:", workerGuess);
  if (workerGuess < secretNumber) {
    port1.postMessage("Too low");
  } else if (workerGuess > secretNumber) {
    port1.postMessage("Too high");
  } else {
    port1.postMessage("Correct");
    console.log("<example-value>");
  }
});
```

And here's how the worker can submit guesses to `main.js` and adjust based on the feedback from it:

```js
// -- worker.js --
let low = 0;
let high = 100;
let lastGuess = Math.floor((low + high) / 2);

// First guess submitted immediately after initialization
port.postMessage(lastGuess);
port.addEventListener("message", (e) => {
  const feedback = e.data;
  if (feedback === "Correct") {
    console.log("Yay");
    return;
  }
  if (feedback === "Too low") {
    low = lastGuess + 1;
  } else if (feedback === "Too high") {
    high = lastGuess - 1;
  }
  if (low > high) {
    throw new Error(
      "Sorry, the feedback from main.js is inconsistent and I suspect main is cheating",
    );
  }
  lastGuess = Math.floor((low + high) / 2);
  port.postMessage(lastGuess);
});

port.start();
```

If you run this in a browser, both the worker and the main thread will output to the same DevTools console, so you will see the output as:

```plain
Worker guessed: 50                              main.js
Worker guessed: 75                              main.js
Worker guessed: 62                              main.js
Worker guessed: 68                              main.js
Worker guessed: 65                              main.js
Worker guessed: 63                              main.js
Worker successfully guessed the secret <example-value>  main.js
Yay                                             worker.js
```

### Sending messages by copying or transferring

You can pass many kinds of JavaScript values to `postMessage`. In the number-guessing example, we pass <example-value> for guesses, strings for feedback, and objects for the `MessagePort`. By default, each agent has its own memory space, so when an object is sent from one heap to another, a copy of it is created in the target heap. The copy uses the structured clone algorithm, which only supports a fixed set of data types. When you attempt to copy an unsupported object, a `DOMException` is thrown.

Copying an object allows the sender and the recipient to independently manipulate the object without affecting the other. The downside is that the object is re-constructed in the recipient's scope, which means:

- It's not tethered to the original creator, so `MessagePort` can't work (indeed, if you read the list of serializable objects, you can see that `MessagePort` is not listed here).
- There are two copies of the same data, which increases memory usage.

To solve these problems, instead of copying objects, you can pass them by _transferring_ instead. Transferring an object uses a slightly different algorithm for constructing it in the target realm, and marks it as _detached_ in the source realm. The source object still exists, but its transferred resource is now available through the new object in the target realm:

To transfer an object, you still pass it (or other objects containing it) to `postMessage()`. The second parameter of `postMessage()` takes a list of objects inside the message that should be transferred instead of copied. This explains the following line in the number guessing game:

```js
worker.postMessage({ hereIsYourPort: port2 }, [port2]);
```

The whole object `{ hereIsYourPort: port2 }` is copied as usual and can be used in both agents, though it isn't assigned to a variable in the sender, so it will be immediately dropped over there. The `port2` resource is taken over by the new object in the worker agent, while the source instance is marked as detached. The effects of detachment depend on the object type, but generally operations either throw an error or do nothing. For a `MessagePort`, the original object loses its connection to the other port.

Other than `MessagePort`, another widely-used transferable object is `ArrayBuffer`, which happens to be both copyable and transferable. When an `ArrayBuffer` is copied, the source and recipient each hold an independent copy, and mutations on one side do not affect the other. When an `ArrayBuffer` is transferred, it is again marked as _detached_. A detached array buffer still exists as an object, but no longer provides access to the underlying memory. This means that:

- `byteLength` becomes `0` (in both the buffer and the associated typed array views).
- Methods, such as `resize()` and `slice()`, throw a `TypeError` when invoked. The associated typed array views' methods also throw a `TypeError`.

You can check whether an `ArrayBuffer` is detached via its `detached` property.

In pure JavaScript, you can also transfer the ownership of memory from one `ArrayBuffer` to another using its `transfer()` or `transferToFixedLength()` method.

```js
const buffer1 = new ArrayBuffer(1024);
console.log(buffer1.detached); // false
console.log(buffer1.byteLength); // 1024

const buffer2 = buffer1.transfer();
console.log(buffer1.detached); // true
console.log(buffer1.byteLength); // 0
console.log(buffer2.byteLength); // 1024
```

## Sharing memory with SharedArrayBuffer

Other than copying and transferring, there's a third model of data passing: _sharing_. In sharing, both sides hold an object that shares the underlying memory. Memory sharing is available only to the `SharedArrayBuffer` object. The sender and recipient still hold distinct instances of the `SharedArrayBuffer` object, but they represent pointers to the same memory span and mutations on one side are visible to the other side.

### Enabling shared memory

Memory sharing isn't inherently risky; however, it allows implementing a high-precision clock (we won't go into the details here), which was revealed to enable Spectre attacks. In response to this, browsers restrict shared memory access to cross-origin isolated websites only.

> **Note:**
> If you are using Node.js for this tutorial (which means you had been adapting the previous examples to Node-specific APIs), you can ignore this section, because shared memory is available by default.

If you are using a local HTTP server to experiment with these examples, you must make your website cross-origin isolated, for example by sending the following headers:

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

After you do this, you can perform the following checks to confirm that shared memory is enabled:

```js
console.log(window.crossOriginIsolated); // true
console.log("SharedArrayBuffer" in window); // true
```

Now you can share memory, but only within an agent cluster—you can't share memory with agents outside of its cluster, even when they have a message channel. A window and its dedicated worker are in the same cluster, so our examples will work fine.

### Using a shared buffer

The `SharedArrayBuffer` (SAB) interface is mostly identical to `ArrayBuffer`. You can construct a `SharedArrayBuffer`, which allocates the specified number of bytes.

```js
const sab = new SharedArrayBuffer(1024);
```

You can read and write the memory contents by constructing a view, such as an `Int8Array`.

```js
const int8 = new Int8Array(sab);
int8[0] = 63;
```

You can create a slice of the SAB, which allocates a new shared memory span and copies its contents.

```js
const sab2 = sab.slice();
// Entire sab is copied
const int82 = new Int8Array(sab2);
console.log(int82[0]); // 63
```

There are several differences between `SharedArrayBuffer` and `ArrayBuffer` (other than memory-sharing behavior, of course):

- Resizable SABs can only be _grown_, while normal resizable buffers can both be grown and shrunk.
- SABs cannot be transferred/detached.

To create a resizable/growable SAB, pass the `maxByteLength` option specifying the maximum length it's allowed to grow to. Then, you can use `grow()`.

```js
const sabResizable = new SharedArrayBuffer(1024, { maxByteLength: 2048 });
console.log(sabResizable.byteLength); // 1024

sabResizable.grow(2000);
console.log(sabResizable.byteLength); // 2000
```

### Posting SharedArrayBuffers

`SharedArrayBuffer` objects are always shared when passed to `postMessage()` (as long as the security requirements are met); no extra options are necessary. Both sides can mutate this memory span and observe the other side's mutations. You can also pass a view of a `SharedArrayBuffer` directly—the view and the `buffer` object are both copied, but the underlying memory span is still shared.

In the following examples, we'll share a buffer between `main.js` and `worker.js` together with the message port. Replace the line in `main.js`:

```js
worker.postMessage({ hereIsYourPort: port2 }, [port2]);
```

With:

```js
const sab = new SharedArrayBuffer(1024);
worker.postMessage({ hereIsYourPort: port2, andHereIsOurSAB: sab }, [port2]);
```

And inside `worker.js`, replace the initial reception code with:

```js
const { port, sab } = await new Promise((resolve, reject) => {
  self.addEventListener(
    "message",
    (e) => {
      const port = e.data.hereIsYourPort;
      if (!(port instanceof MessagePort)) {
        reject(new Error("I'm expecting a dedicated port"));
        return;
      }
      const sab = e.data.andHereIsOurSAB;
      if (!(sab instanceof SharedArrayBuffer)) {
        reject(new Error("I'm expecting a shared array buffer"));
        return;
      }
      resolve({ port, sab });
    },
    { once: true },
  );
});
```

To verify that this setup works, try coordinating a short write-read exchange using a message. The worker immediately updates the `SharedArrayBuffer` and posts a message to the main thread. The main thread receives that message and reads the new value. We'll talk about more efficient communications later.

```js
// -- main.js --
const int8 = new Int8Array(sab);

port1.addEventListener("message", (e) => {
  console.log(int8[0]); // 63
});
```

```js
// -- worker.js --
const int8 = new Int8Array(sab);
int8[0] = 63;
port.postMessage("I've modified the memory. Please check");
```
