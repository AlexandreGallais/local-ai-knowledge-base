---
title: "Using Web Workers (part 2 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_workers_api/using_web_workers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using Web Workers (part 2 of 3)

## Transferring data to and from workers: further details

Data passed between the main page and workers is _copied_, not shared (except for certain objects that can be explicitly shared). Objects are serialized as they're handed to the worker, and subsequently, de-serialized on the other end. The page and worker **do not share the same instance**, so the end result is that **a duplicate** is created on each end. Most browsers implement this feature as structured cloning.

As you probably know by now, data is exchanged between the two threads via messages using `postMessage()`, and the `message` event's `data` attribute contains data passed back from the worker.

**example.html**: (the main page):

```js
const myWorker = new Worker("my_task.js");

myWorker.onmessage = (event) => {
  console.log(`Worker said : "${event.data}"`);
};

myWorker.postMessage({ lastUpdate: new Date() });
```

**my_task.js** (the worker):

```js
self.onmessage = (event) => {
  postMessage(`Last updated: ${event.data.lastUpdate.toDateString()}`);
};
```

The structured cloning algorithm can accept JSON and a few things that JSON can't — like circular references.

### Passing data examples

#### Example 1: Advanced passing JSON Data and creating a switching system

If you have to pass some complex data and have to call many different functions both on the main page and in the Worker, you can create a system which groups everything together.

First, we create a `QueryableWorker` class that takes the URL of the worker, a default listener, and an error handler, and this class is going to keep track of a list of listeners and help us communicate with the worker:

```js
function QueryableWorker(url, defaultListener, onError) {
  const worker = new Worker(url);
  const listeners = {};

  this.defaultListener = defaultListener ?? (() => {});

  if (onError) {
    worker.onerror = onError;
  }

  this.postMessage = (message) => {
    worker.postMessage(message);
  };

  this.terminate = () => {
    worker.terminate();
  };
}
```

Then we add the methods of adding/removing listeners:

```js
this.addListeners = (name, listener) => {
  listeners[name] = listener;
};

this.removeListeners = (name) => {
  delete listeners[name];
};
```

Here we let the worker handle two simple operations for illustration: getting the difference of two numbers and making an alert after three seconds. In order to achieve that we first implement a `sendQuery` method which queries if the worker actually has the corresponding methods to do what we want.

```js
// This functions takes at least one argument, the method name we want to query.
// Then we can pass in the arguments that the method needs.
this.sendQuery = (queryMethod, ...queryMethodArguments) => {
  if (!queryMethod) {
    throw new TypeError(
      "QueryableWorker.sendQuery takes at least one argument",
    );
  }
  worker.postMessage({
    queryMethod,
    queryMethodArguments,
  });
};
```

We finish QueryableWorker with the `onmessage` method. If the worker has the corresponding methods we queried, it should return the name of the corresponding listener and the arguments it needs, we just need to find it in `listeners`:

```js
worker.onmessage = (event) => {
  if (
    event.data instanceof Object &&
    Object.hasOwn(event.data, "queryMethodListener") &&
    Object.hasOwn(event.data, "queryMethodArguments")
  ) {
    listeners[event.data.queryMethodListener].apply(
      this,
      event.data.queryMethodArguments,
    );
  } else {
    this.defaultListener(event.data);
  }
};
```

Now onto the worker. First we need to have the methods to handle the two simple operations:

```js
const queryableFunctions = {
  getDifference(a, b) {
    reply("printStuff", a - b);
  },
  waitSomeTime() {
    setTimeout(() => {
      reply("doAlert", 3, "seconds");
    }, 3000);
  },
};

function reply(queryMethodListener, ...queryMethodArguments) {
  if (!queryMethodListener) {
    throw new TypeError("reply - takes at least one argument");
  }
  postMessage({
    queryMethodListener,
    queryMethodArguments,
  });
}

// This method is called when main page calls QueryWorker's postMessage
// method directly
function defaultReply(message) {
  // do something
}
```

And the `onmessage` method is now trivial:

```js
onmessage = (event) => {
  if (
    event.data instanceof Object &&
    Object.hasOwn(event.data, "queryMethod") &&
    Object.hasOwn(event.data, "queryMethodArguments")
  ) {
    queryableFunctions[event.data.queryMethod].apply(
      self,
      event.data.queryMethodArguments,
    );
  } else {
    defaultReply(event.data);
  }
};
```

Here is the full implementation:

**example.html** (the main page):

```html
<ul>
  <li>
    <button id="first-action">What is the difference between 5 and 3?</button>
  </li>
  <li>
    <button id="second-action">Wait 3 seconds</button>
  </li>
  <li>
    <button id="terminate">terminate() the Worker</button>
  </li>
</ul>
```

It needs to execute the following script, either inline or as an external file:

```js
// QueryableWorker instances methods:
//   * sendQuery(queryable function name, argument to pass 1, argument to pass 2, etc. etc.): calls a Worker's queryable function
//   * postMessage(string or JSON Data): see Worker.prototype.postMessage()
//   * terminate(): terminates the Worker
//   * addListener(name, function): adds a listener
//   * removeListener(name): removes a listener
// QueryableWorker instances properties:
//   * defaultListener: the default listener executed only when the Worker calls the postMessage() function directly
function QueryableWorker(url, defaultListener, onError) {
  const worker = new Worker(url);
  const listeners = {};

  this.defaultListener = defaultListener ?? (() => {});

  if (onError) {
    worker.onerror = onError;
  }

  this.postMessage = (message) => {
    worker.postMessage(message);
  };

  this.terminate = () => {
    worker.terminate();
  };

  this.addListener = (name, listener) => {
    listeners[name] = listener;
  };

  this.removeListener = (name) => {
    delete listeners[name];
  };

  // This functions takes at least one argument, the method name we want to query.
  // Then we can pass in the arguments that the method needs.
  this.sendQuery = (queryMethod, ...queryMethodArguments) => {
    if (!queryMethod) {
      throw new TypeError(
        "QueryableWorker.sendQuery takes at least one argument",
      );
    }
    worker.postMessage({
      queryMethod,
      queryMethodArguments,
    });
  };

  worker.onmessage = (event) => {
    if (
      event.data instanceof Object &&
      Object.hasOwn(event.data, "queryMethodListener") &&
      Object.hasOwn(event.data, "queryMethodArguments")
    ) {
      listeners[event.data.queryMethodListener].apply(
        this,
        event.data.queryMethodArguments,
      );
    } else {
      this.defaultListener(event.data);
    }
  };
}

// your custom "queryable" worker
const myTask = new QueryableWorker("my_task.js");

// your custom "listeners"
myTask.addListener("printStuff", (result) => {
  document
    .getElementById("firstLink")
    .parentNode.appendChild(
      document.createTextNode(`The difference is ${result}!`),
    );
});

myTask.addListener("doAlert", (time, unit) => {
  alert(`Worker waited for ${time} ${unit} :-)`);
});

document.getElementById("first-action").addEventListener("click", () => {
  myTask.sendQuery("getDifference", 5, 3);
});
document.getElementById("second-action").addEventListener("click", () => {
  myTask.sendQuery("waitSomeTime");
});
document.getElementById("terminate").addEventListener("click", () => {
  myTask.terminate();
});
```

**my_task.js** (the worker):

```js
const queryableFunctions = {
  // example #1: get the difference between two numbers:
  getDifference(minuend, subtrahend) {
    reply("printStuff", minuend - subtrahend);
  },

  // example #2: wait three seconds
  waitSomeTime() {
    setTimeout(() => {
      reply("doAlert", 3, "seconds");
    }, 3000);
  },
};

// system functions

function defaultReply(message) {
  // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
  // do something
}

function reply(queryMethodListener, ...queryMethodArguments) {
  if (!queryMethodListener) {
    throw new TypeError("reply - not enough arguments");
  }
  postMessage({
    queryMethodListener,
    queryMethodArguments,
  });
}

onmessage = (event) => {
  if (
    event.data instanceof Object &&
    Object.hasOwn(event.data, "queryMethod") &&
    Object.hasOwn(event.data, "queryMethodArguments")
  ) {
    queryableFunctions[event.data.queryMethod].apply(
      self,
      event.data.queryMethodArguments,
    );
  } else {
    defaultReply(event.data);
  }
};
```

It is possible to switch the content of each mainpage -> worker and worker -> mainpage message. And the property names "queryMethod", "queryMethodListeners", "queryMethodArguments" can be anything as long as they are consistent in `QueryableWorker` and the `worker`.

### Passing data by transferring ownership (transferable objects)

Modern browsers contain an additional way to pass <example-value> types of objects to or from a worker with high performance. Transferable objects are transferred from one context to another with a zero-copy operation, which results in a vast performance improvement when sending large data sets.

For example, when transferring an `ArrayBuffer` from your main app to a worker script, the original `ArrayBuffer` is cleared and no longer usable. Its content is (quite literally) transferred to the worker context.

```js
// Create a 32MB "file" and fill it with consecutive values from 0 to 255 – 32MB = 1024 * 1024 * 32
const uInt8Array = new Uint8Array(1024 * 1024 * 32).map((v, i) => i);
worker.postMessage(uInt8Array.buffer, [uInt8Array.buffer]);
```

### Sharing data

The `SharedArrayBuffer` object allows two threads, such as the worker and the main thread, to simultaneously operate on the same memory span and exchange data without going through the messaging mechanism. Using shared memory does come with significant determinism, security, and performance concerns, some of which are outlined in the JavaScript execution model article.

## Embedded workers

There is not an "official" way to embed the code of a worker within a web page, like `<script>` elements do for normal scripts. But a `<script>` element that does not have a `src` attribute and has a `type` attribute that does not identify an executable MIME type can be considered a data block element that JavaScript could use. "Data blocks" is a more general feature of HTML that can carry almost any textual data. So, a worker could be embedded in this way:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>MDN Example - Embedded worker</title>
    <script type="text/js-worker">
      // This script WON'T be parsed by JS engines because its MIME type is text/js-worker.
      const myVar = "Hello World!";
      // Rest of your worker code goes here.
    </script>
    <script>
      // This script WILL be parsed by JS engines because its MIME type is text/javascript.
      function pageLog(sMsg) {
        // Use a fragment: browser will only render/reflow once.
        const frag = document.createDocumentFragment();
        frag.appendChild(document.createTextNode(sMsg));
        frag.appendChild(document.createElement("br"));
        document.querySelector("#logDisplay").appendChild(frag);
      }
    </script>
    <script type="text/js-worker">
      // This script WON'T be parsed by JS engines because its MIME type is text/js-worker.
      onmessage = (event) => {
        postMessage(myVar);
      };
      // Rest of your worker code goes here.
    </script>
    <script>
      // This script WILL be parsed by JS engines because its MIME type is text/javascript.

      // In the past blob builder existed, but now we use Blob
      const blob = new Blob(
        Array.prototype.map.call(
          document.querySelectorAll("script[type='text/js-worker']"),
          (script) => script.textContent,
        ),
        { type: "text/javascript" },
      );

      // Creating a new global "worker" variable from all our "text/js-worker" scripts.
      const worker = new Worker(window.URL.createObjectURL(blob));

      worker.onmessage = (event) => {
        pageLog(`Received: ${event.data}`);
      };
    </script>
  </head>
  <body>
    <div id="logDisplay"></div>
    <script>
      // Start the worker.
      worker.postMessage("");
    </script>
  </body>
</html>
```

The embedded worker is now nested into a new custom `document.worker` property.

It is also worth noting that you can also convert a function into a Blob, then generate an object URL from that blob. For example:

```js
function fn2workerURL(fn) {
  const blob = new Blob([`(${fn.toString()})()`], { type: "text/javascript" });
  return URL.createObjectURL(blob);
}
```
