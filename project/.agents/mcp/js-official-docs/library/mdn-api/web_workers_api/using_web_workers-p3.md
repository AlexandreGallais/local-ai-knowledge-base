---
title: "Using Web Workers (part 3 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_workers_api/using_web_workers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using Web Workers (part 3 of 3)

## Further examples

This section provides further examples of how to use web workers.

### Performing computations in the background

Workers are mainly useful for allowing your code to perform processor-intensive calculations without blocking the user interface thread. In this example, a worker is used to calculate Fibonacci numbers.

#### The JavaScript code

The following JavaScript code is stored in the "fibonacci.js" file referenced by the HTML in the next section.

```js
self.onmessage = (event) => {
  const userNum = Number(event.data);
  self.postMessage(fibonacci(userNum));
};

function fibonacci(num) {
  let a = 1;
  let b = 0;
  while (num > 0) {
    [a, b] = [a + b, a];
    num--;
  }

  return b;
}
```

The worker sets the property `onmessage` to a function which will receive messages sent when the worker object's `postMessage()` is called. This performs the math and eventually returns the result back to the main thread.

#### The HTML code

```html
<form>
  <div>
    <label for="number">
      Enter a number that is a zero-based index position in the fibonacci
      sequence to see what number is in that position. For example, enter 6 and
      you'll get a result of 8 — the fibonacci number at index position 6 is 8.
    </label>
    <input type="number" id="number" />
  </div>
  <div>
    <input type="submit" />
  </div>
</form>

<p id="result"></p>
```

It needs to execute the following script, either inline or as an external file:

```js
const form = document.querySelector("form");
const input = document.querySelector('input[type="number"]');
const result = document.querySelector("p#result");
const worker = new Worker("fibonacci.js");

worker.onmessage = (event) => {
  result.textContent = event.data;
  console.log(`Got: ${event.data}`);
};

worker.onerror = (error) => {
  console.log(`Worker error: ${error.message}`);
  throw error;
};

form.onsubmit = (e) => {
  e.preventDefault();
  worker.postMessage(input.value);
  input.value = "";
};
```

The web page creates a `` element with the ID `result`, which gets used to display the result, then spawns the worker. After spawning the worker, the `onmessage` handler is configured to display the results by setting the contents of the `` element, and the `onerror` handler is set to log the error message to the devtools console.

Finally, a message is sent to the worker to start it.

Try this example live.

### Dividing tasks among multiple workers

As multicore computers become increasingly common, it's often useful to divide computationally complex tasks among multiple workers, which may then perform those tasks on multiple-processor cores.

## Other types of workers

In addition to dedicated and shared web workers, there are other types of workers available:

- ServiceWorkers essentially act as proxy servers that sit between web applications, and the browser and network (when available). They are intended to (among other things) enable the creation of effective offline experiences, intercepting network requests and taking appropriate action based on whether the network is available and updated assets reside on the server. They will also allow access to push notifications and background sync APIs.
- Audio Worklet provide the ability for direct scripted audio processing to be done in a worklet (a lightweight version of worker) context.

## Debugging worker threads

Most browsers enable you to debug web workers in their JavaScript debuggers in _exactly the same way_ as debugging the main thread! For example, both Firefox and Chrome list JavaScript source files for both the main thread and active worker threads, and all of these files can be opened to set breakpoints and logpoints.

To learn how to debug web workers, see the documentation for each browser's JavaScript debugger:

- Chrome Sources panel
- Firefox JavaScript Debugger

To open devtools for web workers, you can use the following URLs:

- Edge: `edge://inspect/`
- Chrome: `chrome://inspect/`
- Firefox: `about:debugging#/runtime/this-firefox`

These pages show an overview of all service workers. You need to find the relevant one by the URL and then click _inspect_ to access devtools such as the console and debugger for that worker.

## Functions and interfaces available in workers

You can use most standard JavaScript features inside a web worker, including:

- `Navigator`
- `fetch()`
- `Array`, `Date`, `Math`, and `String`
- `setTimeout()` and `setInterval()`

The main thing you _can't_ do in a Worker is directly affect the parent page. This includes manipulating the DOM and using that page's objects. You have to do it indirectly, by sending a message back to the main script via `DedicatedWorkerGlobalScope.postMessage()`, then doing the changes in event handler.

> **Note:**
> You can test whether a method or interface is available to workers using the Worker Playground.

> **Note:**
> For a complete list of functions available to workers, see Functions and interfaces available to workers.

## See also

- `Worker` interface
- `SharedWorker` interface
- Functions available to workers
- `OffscreenCanvas` interface
