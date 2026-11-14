---
title: "TypeScript 5.2 (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 5.2.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 5.2

## `using` Declarations and Explicit Resource Management

TypeScript 5.2 adds support for the upcoming Explicit Resource Management feature in ECMAScript.
Let's explore some of the motivations and understand what the feature brings us.

It's common to need to do some sort of "clean-up" after creating an object.
For example, you might need to close network connections, delete temporary files, or just free up some memory.

Let's imagine a function that creates a temporary file, reads and writes to it for various operations, and then closes and deletes it.

```ts
import * as fs from "fs";

export function doSomeWork() {
    const path = ".some_temp_file";
    const file = fs.openSync(path, "w+");

    // use file...

    // Close the file and delete it.
    fs.closeSync(file);
    fs.unlinkSync(path);
}
```

This is fine, but what happens if we need to perform an early exit?

```ts
export function doSomeWork() {
    const path = ".some_temp_file";
    const file = fs.openSync(path, "w+");

    // use file...
    if (someCondition()) {
        // do some more work...

        // Close the file and delete it.
        fs.closeSync(file);
        fs.unlinkSync(path);
        return;
    }

    // Close the file and delete it.
    fs.closeSync(file);
    fs.unlinkSync(path);
}
```

We're starting to see some duplication of clean-up which can be easy to forget.
We're also not guaranteed to close and delete the file if an error gets thrown.
This could be solved by wrapping this all in a `try`/`finally` block.

```ts
export function doSomeWork() {
    const path = ".some_temp_file";
    const file = fs.openSync(path, "w+");

    try {
        // use file...

        if (someCondition()) {
            // do some more work...
            return;
        }
    }
    finally {
        // Close the file and delete it.
        fs.closeSync(file);
        fs.unlinkSync(path);
    }
}
```

While this is more robust, it's added quite a bit of "noise" to our code.
There are also other foot-guns we can run into if we start adding more clean-up logic to our `finally` block — for example, exceptions preventing other resources from being disposed.
This is what the explicit resource management proposal aims to solve.
The key idea of the proposal is to support resource disposal — this clean-up work we're trying to deal with — as a first class idea in JavaScript.

This starts by adding a new built-in `symbol` called `Symbol.dispose`, and we can create objects with methods named by `Symbol.dispose`.
For convenience, TypeScript defines a new global type called `Disposable` which describes these.

```ts
class TempFile implements Disposable {
    #path: string;
    #handle: number;

    constructor(path: string) {
        this.#path = path;
        this.#handle = fs.openSync(path, "w+");
    }

    // other methods

    [Symbol.dispose]() {
        // Close the file and delete it.
        fs.closeSync(this.#handle);
        fs.unlinkSync(this.#path);
    }
}
```

Later on we can call those methods.

```ts
export function doSomeWork() {
    const file = new TempFile(".some_temp_file");

    try {
        // ...
    }
    finally {
        file[Symbol.dispose]();
    }
}
```

Moving the clean-up logic to `TempFile` itself doesn't buy us much;
we've basically just moved all the clean-up work from the `finally` block into a method, and that's always been possible.
But having a well-known "name" for this method means that JavaScript can build other features on top of it.

That brings us to the first star of the feature: `using` declarations!
`using` is a new keyword that lets us declare new fixed bindings, kind of like `const`.
The key <example-value> is that variables declared with `using` get their `Symbol.dispose` method called at the end of the scope!

So we could simply have written our code like this:

```ts
export function doSomeWork() {
    using file = new TempFile(".some_temp_file");

    // use file...

    if (someCondition()) {
        // do some more work...
        return;
    }
}
```

Check it out — no `try`/`finally` blocks!
At least, none that we see.
Functionally, that's exactly what `using` declarations will do for us, but we don't have to deal with that.

You might be familiar with `using` declarations in C#, `with` statements in Python, or `try`-with-resource declarations in Java.
These are all similar to JavaScript's new `using` keyword, and provide a similar explicit way to perform a "tear-down" of an object at the end of a scope.

`using` declarations do this clean-up at the very end of their containing scope or right before an "early return" like a `return` or a `throw`n error.
They also dispose in a first-in-last-out order like a stack.

```ts
function loggy(id: string): Disposable {
    console.log(`Creating ${id}`);

    return {
        [Symbol.dispose]() {
            console.log(`Disposing ${id}`);
        }
    }
}

function func() {
    using a = loggy("a");
    using b = loggy("b");
    {
        using c = loggy("c");
        using d = loggy("d");
    }
    using e = loggy("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    using f = loggy("f");
}

func();
// Creating a
// Creating b
// Creating c
// Creating d
// Disposing d
// Disposing c
// Creating e
// Disposing e
// Disposing b
// Disposing a
```

`using` declarations are supposed to be resilient to exceptions;
if an error is thrown, it's rethrown after disposal.
On the other hand, the body of your function might execute as expected, but the `Symbol.dispose` might throw.
In that case, that exception is rethrown as well.

But what happens if both the logic before and during disposal throws an error?
For those cases, `SuppressedError` has been introduced as a new subtype of `Error`.
It features a `suppressed` property that holds the last-thrown error, and an `error` property for the most-recently thrown error.

```ts
class ErrorA extends Error {
    name = "ErrorA";
}
class ErrorB extends Error {
    name = "ErrorB";
}

function throwy(id: string) {
    return {
        [Symbol.dispose]() {
            throw new ErrorA(`Error from ${id}`);
        }
    };
}

function func() {
    using a = throwy("a");
    throw new ErrorB("oops!")
}

try {
    func();
}
catch (e: any) {
    console.log(e.name); // SuppressedError
    console.log(e.message); // An error was suppressed during disposal.

    console.log(e.error.name); // ErrorA
    console.log(e.error.message); // Error from a

    console.log(e.suppressed.name); // ErrorB
    console.log(e.suppressed.message); // oops!
}
```

You might have noticed that we're using synchronous methods in these examples.
However, lots of resource disposal involves *asynchronous* operations, and we need to wait for those to complete before we continue running any other code.

That's why there is also a new `Symbol.asyncDispose`, and it brings us to the next star of the show — `await using` declarations.
These are similar to `using` declarations, but the key is that they look up whose disposal must be `await`ed.
They use a different method named by `Symbol.asyncDispose`, though they can operate on anything with a `Symbol.dispose` as well.
For convenience, TypeScript also introduces a global type called `AsyncDisposable` that describes any object with an asynchronous dispose method.

```ts
async function doWork() {
    // Do fake work for half a second.
    await new Promise(resolve => setTimeout(resolve, 500));
}

function loggy(id: string): AsyncDisposable {
    console.log(`Constructing ${id}`);
    return {
        async [Symbol.asyncDispose]() {
            console.log(`Disposing (async) ${id}`);
            await doWork();
        },
    }
}

async function func() {
    await using a = loggy("a");
    await using b = loggy("b");
    {
        await using c = loggy("c");
        await using d = loggy("d");
    }
    await using e = loggy("e");
    return;

    // Unreachable.
    // Never created, never disposed.
    await using f = loggy("f");
}

func();
// Constructing a
// Constructing b
// Constructing c
// Constructing d
// Disposing (async) d
// Disposing (async) c
// Constructing e
// Disposing (async) e
// Disposing (async) b
// Disposing (async) a
```

Defining types in terms of `Disposable` and `AsyncDisposable` can make your code much easier to work with if you expect others to do tear-down logic consistently.
In fact, lots of existing types exist in the wild which have a `dispose()` or `close()` method.
For example, the Visual Studio Code APIs even define their own `Disposable` interface.
APIs in the browser and in runtimes like Node.js, Deno, and Bun might also choose to use `Symbol.dispose` and `Symbol.asyncDispose` for objects which already have clean-up methods, like file handles, connections, and more.

Now maybe this all sounds great for libraries, but a little bit heavy-weight for your scenarios.
If you're doing a lot of ad-hoc clean-up, creating a new type might introduce a lot of over-abstraction and questions about best-practices.
For example, take our `TempFile` example again.

```ts
class TempFile implements Disposable {
    #path: string;
    #handle: number;

    constructor(path: string) {
        this.#path = path;
        this.#handle = fs.openSync(path, "w+");
    }

    // other methods

    [Symbol.dispose]() {
        // Close the file and delete it.
        fs.closeSync(this.#handle);
        fs.unlinkSync(this.#path);
    }
}

export function doSomeWork() {
    using file = new TempFile(".some_temp_file");

    // use file...

    if (someCondition()) {
        // do some more work...
        return;
    }
}
```

All we wanted was to remember to call two functions — but was this the best way to write it?
Should we be calling `openSync` in the constructor, create an `open()` method, or pass in the handle ourselves?
Should we expose a method for every possible operation we need to perform, or should we just make the properties public?

That brings us to the final stars of the feature: `DisposableStack` and `AsyncDisposableStack`.
These objects are useful for doing both one-off clean-up, along with arbitrary amounts of cleanup.
A `DisposableStack` is an object that has several methods for keeping track of `Disposable` objects, and can be given functions for doing arbitrary clean-up work.
We can also assign them to `using` variables because — get this — *they're also `Disposable`*!
So here's how we could've written the original example.

```ts
function doSomeWork() {
    const path = ".some_temp_file";
    const file = fs.openSync(path, "w+");

    using cleanup = new DisposableStack();
    cleanup.defer(() => {
        fs.closeSync(file);
        fs.unlinkSync(path);
    });

    // use file...

    if (someCondition()) {
        // do some more work...
        return;
    }

    // ...
}
```

Here, the `defer()` method just takes a callback, and that callback will be run once `cleanup` is disposed of.
Typically, `defer` (and other `DisposableStack` methods like `use` and `adopt`)
should be called immediately after creating a resource.
As the name suggests, `DisposableStack` disposes of everything it keeps track of like a stack, in a first-in-last-out order, so `defer`ing immediately after creating a value helps avoid odd dependency issues.
`AsyncDisposableStack` works similarly, but can keep track of `async` functions and `AsyncDisposable`s, and is itself an `AsyncDisposable.`

The `defer` method is similar in many ways to the `defer` keyword in Go, Swift, Zig, Odin, and others, where the conventions should be similar.

Because this feature is so recent, most runtimes will not support it natively.
To use it, you will need runtime polyfills for the following:

* `Symbol.dispose`
* `Symbol.asyncDispose`
* `DisposableStack`
* `AsyncDisposableStack`
* `SuppressedError`

However, if all you're interested in is `using` and `await using`, you should be able to get away with only polyfilling the built-in `symbol`s.
Something as simple as the following should work for most cases:

```ts
Symbol.dispose ??= Symbol("Symbol.dispose");
Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
```

You will also need to set your compilation `target` to `es2022` or below, and configure your `lib` setting to either include `"esnext"` or `"esnext.disposable"`.

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

For more information on this feature, take a look at the work on GitHub!
