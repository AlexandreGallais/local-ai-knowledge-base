---
title: "JavaScript resource management (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/resource_management/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript resource management (part 2 of 2)

## Error handling

A major use case of the resource management feature is to ensure that resources are always disposed, even when an error occurs. Let us investigate some complex error handling scenarios.

We start with the following code, which, by using `using`, is robust against errors:

```js
async function readUntil(stream, text) {
  // Use `using` instead of `await using` because `releaseLock` is synchronous
  using reader = stream.getReader();
  let chunk = await reader.read();

  while (!chunk.done && chunk.value !== text) {
    console.log(chunk.toUpperCase());
    chunk = await reader.read();
  }
}
```

Suppose that `chunk` turns out to be `null`. Then `!chunk.done` will throw a `TypeError`, causing the function to terminate. Before the function exits, `streamSymbol.dispose` is called, which releases the lock on the stream.

```js
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("a");
    controller.enqueue(null);
    controller.enqueue("b");
    controller.enqueue("c");
    controller.close();
  },
});

readUntil(stream, "b")
  .catch((e) => console.error(e)) // TypeError: chunk.toUpperCase is not a function
  .then(() => {
    const anotherReader = stream.getReader();
    // Successfully creates another reader
  });
```

So, `using` does not swallow any errors: all errors that occur are still thrown, but the resources get closed right before that. Now, what happens if the resource cleanup itself also throws an error? Let's use a more contrived example:

```js
class MyReader {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock");
  }
}

function doSomething() {
  using reader = new MyReader();
  throw new Error("Failed to read");
}

try {
  doSomething();
} catch (e) {
  console.error(e); // SuppressedError: An error was suppressed during disposal
}
```

There are two errors generated in the `doSomething()` call: an error thrown during `doSomething`, and an error thrown during disposal of `reader` because of the first error. Both errors are thrown together, so what you caught is a `SuppressedError`. This is a special error that wraps two errors: the `error` property contains the later error, and the `suppressed` property contains the earlier error, which gets "suppressed" by the later error.

If we have more than one resource, and _both_ of them throw an error during disposal (this should be exceedingly rare–it's already rare for disposal to fail!), then each earlier error is suppressed by the later error, forming a chain of suppressed errors.

```js
class MyReader {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock on reader");
  }
}

class MyWriter {
  [Symbol.dispose]() {
    throw new Error("Failed to release lock on writer");
  }
}

function doSomething() {
  using reader = new MyReader();
  using writer = new MyWriter();
  throw new Error("Failed to read");
}

try {
  doSomething();
} catch (e) {
  console.error(e); // SuppressedError: An error was suppressed during disposal
  console.error(e.suppressed); // SuppressedError: An error was suppressed during disposal
  console.error(e.error); // Error: Failed to release lock on reader
  console.error(e.suppressed.suppressed); // Error: Failed to read
  console.error(e.suppressed.error); // Error: Failed to release lock on writer
}
```

- The `reader` is released last, so its error is the latest and therefore suppresses everything else: it shows up as `e.error`.
- The `writer` is released first, so its error is later than the original exiting error, but earlier than the `reader` error: it shows up as `e.suppressed.error`.
- The original error about "Failed to read" is the earliest error, so it shows up as `e.suppressed.suppressed`.

## Examples

### Automatically releasing object URLs

In the following example, we create an object URL to a blob (in a real application, this blob would be fetched from somewhere, such as a file or a fetch response) so we can download the blob as a file. In order to prevent a resource leak, we must free the object URL with `URL.revokeObjectURL()` when it is no longer needed (that is, when the download has successfully started). Because the URL itself is just a string and therefore doesn't implement the disposable protocol, we cannot directly declare `url` with `using`; therefore, we create a `DisposableStack` to serve as the disposer for `url`. The object URL is revoked as soon as `disposer` goes out of scope, which is when either `link.click()` finishes or an error occurs somewhere.

```js
const downloadButton = document.getElementById("download-button");
const exampleBlob = new Blob(["example data"]);

downloadButton.addEventListener("click", () => {
  using disposer = new DisposableStack();
  const link = document.createElement("a");
  const url = disposer.adopt(
    URL.createObjectURL(exampleBlob),
    URL.revokeObjectURL,
  );

  link.href = url;
  link.download = "example.txt";
  link.click();
});
```

### Automatically canceling in-progress requests

In the following example, we fetch a list of resources concurrently using `Promise.all()`. `Promise.all()` fails and rejects the resulting promise as soon as one request failed; however, the other pending requests continue to run, despite their results being inaccessible to the program. To avoid these remaining requests needlessly consuming resources, we need to automatically cancel in-progress requests whenever `Promise.all()` settles. We implement cancellation with an `AbortController`, and pass its `signal` to every `fetch()` call. If `Promise.all()` fulfills, then the function returns normally and the controller aborts, which is harmless because there's no pending request to cancel; if `Promise.all()` rejects and the function throws, then the controller aborts and cancels all pending requests.

```js
async function getAllData(urls) {
  using disposer = new DisposableStack();
  const { signal } = disposer.adopt(new AbortController(), (controller) =>
    controller.abort(),
  );

  // Fetch all URLs in parallel
  // Automatically cancel any incomplete requests if any request fails
  const pages = await Promise.all(
    urls.map((url) =>
      fetch(url, { signal }).then((response) => {
        if (!response.ok)
          throw new Error(
            `Response error: ${response.status} - ${response.statusText}`,
          );
        return response.text();
      }),
    ),
  );
  return pages;
}
```

## Pitfalls

The resource disposal syntax offers a lot of strong error handling guarantees that ensure the resources are always cleaned up no matter what happens, but there are some pitfalls you may still encounter:

- Forgetting to use `using` or `await using`. The resource management syntax is only there to help you when you know you need it, but there's nothing to yell at you if you forget to use it! Unfortunately, there's no good way to prevent this before-the-fact, because there are no syntactic clues that something is a disposable resource, and even for disposable resources, you may want to declare them without automatic disposal. You probably need a type checker combined with a linter to catch these issues, such as typescript-eslint (which is still planning to work on this feature).
- Use-after-free. Generally, the `using` syntax ensures that a resource is freed when it goes out of scope, but there are many ways to persist a value beyond its binding variable. JavaScript does not have an ownership mechanism like Rust, so you can declare an alias that doesn't use `using`, or preserve the resource in a closure, etc. The `using` reference contains many examples of such pitfalls. Again, there's no good way to properly detect this in a complicated control flow, so you need to be careful.

The resource management feature is not a silver bullet. It is definitely an improvement over manually invoking the disposal methods, but it is not smart enough to prevent all resource management bugs. You still need to be careful and understand the semantics of the resources you are using.

## Conclusion

Here are the key <example-value> of the resource management system:

- `using` and `await using` declarations for automatic resource disposal.
- The _disposable_ and _async disposable_ protocols, using the `Symbol.dispose` and `Symbol.asyncDispose` respectively, for resources to implement.
- The `DisposableStack` and `AsyncDisposableStack` objects for cases where `using` and `await using` are not suitable.

With proper usage of these APIs, you can create systems interacting with external resources that remain strong and robust against all error conditions without lots of boilerplate code.
