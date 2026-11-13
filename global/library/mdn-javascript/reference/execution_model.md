---
title: "JavaScript execution model (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/execution_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript execution model

This page introduces the basic <example-value> of the JavaScript runtime environment. The model is largely theoretical and abstract, without any platform-specific or implementation-specific details. Modern JavaScript engines heavily optimize the described semantics.

This page is a reference. It assumes you are already familiar with the execution model of other programming languages, such as C and Java. It makes heavy references to existing concepts in operating systems and programming languages.

## The engine and the host

JavaScript execution requires the cooperation of two pieces of software: the **JavaScript engine** and the **host environment**.

The JavaScript engine implements the ECMAScript (JavaScript) language, providing the core functionality. It takes source code, parses it, and executes it. However, in order to interact with the outside world, such as to produce any meaningful output, to interface with external resources, or to implement security- or performance-related mechanisms, we need additional environment-specific mechanisms provided by the host environment. For example, the HTML DOM is the host environment when JavaScript is executed in a web browser. Node.js is another host environment that allows JavaScript to be run on the server side.

While we focus primarily on the mechanisms defined in ECMAScript in this reference, we will occasionally talk about mechanisms defined in the HTML spec, which is often mimicked by other host environments like Node.js or Deno. This way, we can give a coherent picture of the JavaScript execution model as used on the web and beyond.

## Agent execution model

In the JavaScript specification, each autonomous executor of JavaScript is called an **agent**, which maintains its facilities for code execution:

- **Heap** (of objects): this is just a name to denote a large (mostly unstructured) region of memory. It gets populated as objects get created in the program. Note that in the case of shared memory, each agent has its own heap with its own version of a `SharedArrayBuffer` object, but the underlying memory represented by the buffer is shared.
- **Queue** (of jobs): this is known in HTML (and also commonly) as the _event loop_ which enables asynchronous programming in JavaScript while being single-threaded. It's called a queue because it's generally first-in-first-out: earlier jobs are executed before later ones.
- **Stack** (of execution contexts): this is what's known as a _call stack_ and allows transferring control flow by entering and exiting execution contexts like functions. It's called a stack because it's last-in-first-out. Every job enters by pushing a new frame onto the (empty) stack, and exits by emptying the stack.

These are three distinct data structures that keep track of different data. We will introduce the queue and the stack in more detail in the following sections. To read more about how heap memory is allocated and freed, see memory management.

Each agent is analogous to a thread (note that the underlying implementation may or may not be an actual operating system thread). Each agent can own multiple realms (which 1-to-1 correlate with global objects) that can synchronously access each other, and thus needs to run in a single execution thread. An agent also has a single memory model, indicating whether it's little-endian, whether it can be synchronously blocked, whether atomic operations are lock-free, etc.

An agent on the web can be one of the following:

- A _Similar-origin window agent_, which contains various `Window` objects which can potentially reach each other, either directly or by using `document.domain`. If the window is origin-keyed, then only same-origin windows can reach each other.
- A _Dedicated worker agent_ containing a single `DedicatedWorkerGlobalScope`.
- A _Shared worker agent_ containing a single `SharedWorkerGlobalScope`.
- A _Service worker agent_ containing a single `ServiceWorkerGlobalScope`.
- A _Worklet agent_ containing a single `WorkletGlobalScope`.

In other words, each worker creates its own agent, while one or more windows may be within the same agent—usually a main document and its similar-origin iframes. In Node.js, a similar concept called worker threads is available.

The diagram below illustrates the execution model of agents:

## Realms

Each agent owns one or more **realms**. Each piece of JavaScript code is associated with a realm when it's loaded, which remains the same even when called from another realm. A realm consists of the following information:

- A list of intrinsic objects like `Array`, `Array.prototype`, etc.
- Globally declared variables, the value of `globalThis`, and the global object
- A cache of template literal arrays, because evaluation of the same tagged template literal expression always causes the tag to receive the same array object

On the web, the realm and the global object are 1-to-1 corresponded. The global object is either a `Window`, a `WorkerGlobalScope`, or a `WorkletGlobalScope`. So for example, every `iframe` executes in a different realm, though it may be in the same agent as the parent window.

Realms are usually mentioned when talking about the identities of global objects. For example, we need methods such as `Array.isArray()` or `Error.isError()`, because an array constructed in another realm will have a different prototype object than the `Array.prototype` object in the current realm, so `instanceof Array` will wrongly return `false`.

## Stack and execution contexts

We first consider synchronous code execution. Each job enters by calling its associated callback. Code inside this callback may create variables, call functions, or exit. Each function needs to keep track of its own variable environments and where to return to. To handle this, the agent needs a stack to keep track of the execution contexts. An **execution context**, also known generally as a _stack frame_, is the smallest unit of execution. It tracks the following information:

- Code evaluation state
- The module or script, the function (if applicable), and the currently executing generator that contains this code
- The current realm
- Bindings, including:
  - Variables defined with `var`, `let`, `const`, `function`, `class`, etc.
  - Private identifiers like `#foo` which are only valid in the current context
  - `this` reference

Imagine a program consisting of a single job defined by the following code:

```js
function foo(b) {
  const a = 10;
  return a + b + 11;
}

function bar(x) {
  const y = 3;
  return foo(x * y);
}

const baz = bar(7); // assigns 42 to baz
```

1. When the job starts, the first frame is created, where the variables `foo`, `bar`, and `baz` are defined. It calls `bar` with the argument `7`.
2. A second frame is created for the `bar` call, containing bindings for the parameter `x` and the local variable `y`. It first performs the multiplication `x * y`, then calls `foo` with the result.
3. A third frame is created for the `foo` call, containing bindings for the parameter `b` and the local variable `a`. It first performs the addition `a + b + 11`, then returns the result.
4. When `foo` returns, the top frame element is popped out of the stack, and the call expression `foo(x * y)` resolves to the return value. It then continues execution, which is just to return this result.
5. When `bar` returns, the top frame element is popped out of the stack, and the call expression `bar(7)` resolves to the return value. This initializes `baz` with the return value.
6. We reach the end of the job's source code, so the stack frame for the entrypoint is popped out of the stack. The stack is empty, so the job is considered completed.

### Generators and reentry

When a frame is popped, it's not necessarily gone forever, because sometimes we need to come back to it. For example, consider a generator function:

```js
function* gen() {
  console.log(1);
  yield;
  console.log(2);
}

const g = gen();
g.next(); // logs 1
g.next(); // logs 2
```

In this case, calling `gen()` first creates an execution context which is suspended—no code inside `gen` gets executed yet. The generator `g` saves this execution context internally. The current running execution context remains to be the entrypoint. When `g.next()` is called, the execution context for `gen` is pushed onto the stack, and the code inside `gen` is executed until the `yield` expression. Then, the generator execution context gets suspended and removed from the stack, which returns control back to the entrypoint. When `g.next()` is called again, the generator execution context is pushed back onto the stack, and the code inside `gen` resumes from where it left off.

### Tail calls

One mechanism defined in the specification is _proper tail call_ (PTC). A function call is a tail call if the caller does nothing after the call except return the value:

```js
function f() {
  return g();
}
```

In this case, the call to `g` is a tail call. In strict mode only, if a function call is in tail position, the engine is required to discard the current execution context and replace it with the context of the tail call, instead of pushing a new frame for the `g()` call. This means that tail recursion is not subject to the stack size limits:

```js
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}
```

In reality, discarding the current frame causes debugging problems, because if `g()` throws an error, `f` is no longer on the stack and won't appear in the stack trace. Currently, only Safari (JavaScriptCore) implements PTC, and they have invented some specific infrastructure to address the debuggability issue.

### Closures

Another interesting phenomenon related to variable scoping and function calls is closures. Whenever a function is created, it also memorizes internally the variable bindings of the current running execution context. Then, these variable bindings can outlive the execution context.

```js
let f;
{
  let x = 10;
  f = () => x;
}
console.log(f()); // logs 10
```

## Job queue and event loop

An agent is a thread, which means the interpreter can only process one statement at a time. When the code is all synchronous, this is fine because we can always make progress. But if the code needs to perform asynchronous action, then we cannot progress unless that action is completed. However, it would be detrimental to user experience if that halts the whole program—the nature of JavaScript as a web scripting language requires it to be never blocking. Therefore, the code that handles the completion of that asynchronous action is defined as a callback. This callback defines a **job**, which gets placed into a **job queue**—or, in HTML terminology, an event loop—once the action is completed.

Every time, the agent pulls a job from the queue and executes it. When the job is executed, it may create more jobs, which are added to the end of the queue. Jobs can also be added via the completion of asynchronous platform mechanisms, such as timers, I/O, and events. A job is considered completed when the stack is empty; then, the next job is pulled from the queue. Jobs might not be pulled with uniform priority—for example, HTML event loops split jobs into two categories: _tasks_ and _microtasks_. Microtasks have higher priority and the microtask queue is drained first before the task queue is pulled. For more information, check the HTML microtask guide. If the job queue is empty, the agent waits for more jobs to be added.

### "Run-to-completion"

Each job is processed completely before any other job is processed. This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be preempted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.

For example, consider this example:

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

In this example, we create an already-resolved promise, which means any callback attached to it will be immediately scheduled as a job. The two callbacks seem to cause a race condition, but actually, the output is fully predictable: `1` and `2` will be logged in order. This is because each job runs to completion before the next one is executed, so the overall order is always `i += 1; console.log(i); i += 1; console.log(i);` and never `i += 1; i += 1; console.log(i); console.log(i);`.

A downside of this model is that if a job takes too long to complete, the web application is unable to process user interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A good practice to follow is to make job processing short and, if possible, cut down one job into several jobs.

### Never blocking

Another important guarantee offered by the event loop model is that JavaScript execution is never blocking. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or a `fetch()` request to return, it can still process other things like user input. The code that executes after the completion of an asynchronous action is always provided as a callback function (for example, the promise `then()` handler, the callback function in `setTimeout()`, or the event handler), which defines a job to be added to the job queue once the action completes.

Of course, the guarantee of "never-blocking" requires the platform API to be inherently asynchronous, but some legacy exceptions exist like `alert()` or synchronous XHR. It is considered good practice to avoid them to ensure the responsiveness of the application.
