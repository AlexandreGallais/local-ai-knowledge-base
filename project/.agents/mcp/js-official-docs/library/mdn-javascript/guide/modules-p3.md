---
title: "JavaScript modules (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript modules (part 3 of 3)

## Dynamic module loading

You can also dynamically load modules only when they are needed, rather than having to load everything up front. This has some obvious performance advantages; let's read on and see how it works.

The `import()` operator can be called with the path to the module as a parameter. It returns a `Promise`, which fulfills with a module namespace object (see Creating a module namespace object) giving you access to that object's exports. For example:

```js
import("./modules/myModule.js").then((module) => {
  // Do something with the module.
});
```

> **Note:**
> Dynamic import is permitted in the browser main thread, and in shared and dedicated workers.
> However `import()` will reject if called in a service worker or worklet.

Let's look at an example. In the dynamic-module-imports directory we've got another example based on our classes example. This time however we are not drawing anything on the canvas when the example loads. Instead, we include three buttons — "Circle", "Square", and "Triangle" — that, when pressed, dynamically load the required module and then use it to draw the associated shape.

In this example we've only made changes to our `index.html` and `main.js` files — the module exports remain the same as before.

Over in `main.js` we've grabbed a reference to each button using a `document.querySelector()` call, for example:

```js
const squareBtn = document.querySelector(".square");
```

We then attach an event listener to each button so that when pressed, the relevant module is dynamically loaded and used to draw the shape:

```js
squareBtn.addEventListener("click", () => {
  import("./modules/square.js").then((Module) => {
    const square = new Module.Square(
      myCanvas.ctx,
      myCanvas.listId,
      50,
      50,
      100,
      "blue",
    );
    square.draw();
    square.reportArea();
    square.reportPerimeter();
  });
});
```

Note that, because the promise fulfillment returns a module namespace object, the class is then made a subfeature of the object, hence we now need to access the constructor with `Module.` prepended to it, e.g., `Module.Square( /* … */ )`.

Another advantage of dynamic imports is that they are always available, even in script environments. Therefore, if you have an existing `<script>` tag in your HTML that doesn't have `type="module"`, you can still reuse code distributed as modules by dynamically importing it.

```html
<script>
  import("./modules/square.js").then((module) => {
    // Do something with the module.
  });
  // Other code that operates on the global scope and is not
  // ready to be refactored into modules yet.
  var btn = document.querySelector(".square");
</script>
```

## Top-level await

Top-level `await` is a feature available within modules: the `await` keyword can be used at the top level, outside any async function. It allows a module to act as a big asynchronous function, meaning it can finish asynchronous work before modules that depend on it execute, without blocking the evaluation of sibling modules that don't depend on it.

Let's take a look at an example. You can find all the files and code described in this section within the `top-level-await` directory, which extends from the previous examples.

Firstly we'll declare our color palette in a separate `colors.json` file:

```json
{
  "yellow": "#F4D03F",
  "green": "#52BE80",
  "blue": "#5499C7",
  "red": "#CD6155",
  "orange": "#F39C12"
}
```

Then we'll create a module called `getColors.js` which uses a fetch request to load the `colors.json` file and return the data as an object.

```js
// fetch request
const colors = fetch(
  "https://mdn.github.io/js-examples/module-examples/top-level-await/data/colors.json",
).then((response) => response.json());

export default await colors;
```

Notice the last export line here.

We're using the keyword `await` before specifying the constant `colors` to export. This means any other modules which include this one will wait until `colors` has been downloaded and parsed before using it.

```js
// -- main.js --
import colors from "./modules/getColors.js";
import { Canvas } from "./modules/canvas.js";

const circleBtn = document.querySelector(".circle");

// …
```

We'll use `colors` instead of the previously used strings when calling our shape functions:

```js
const square = new Module.Square(
  myCanvas.ctx,
  myCanvas.listId,
  50,
  50,
  100,
  colors.blue,
);

const circle = new Module.Circle(
  myCanvas.ctx,
  myCanvas.listId,
  75,
  200,
  100,
  colors.green,
);

const triangle = new Module.Triangle(
  myCanvas.ctx,
  myCanvas.listId,
  100,
  75,
  190,
  colors.yellow,
);
```

This is useful because the code within `main.js` won't execute until the code in `getColors.js` has run. However, it doesn't hold up the evaluation of independent modules: our `canvas.js` module still evaluates while `colors` is being fetched.

Top-level `await` is not free; it has deep implications because it means a part of the module graph can only be evaluated asynchronously. See the module graph guide for more information.

## Module metadata

Scripts are executed in the global context, so they can get information about their environment with global variables, such as `Window.document` or `Window.location`. Each module also has its own execution context which is accessed via a module-specific `import.meta` object. The properties of this object are defined by the host environment; the core language spec does not define any properties. See Using modules on the web for information about browsers, and Modules across platforms for information about Node.js, bundlers, and more.

Just as an example, in most web-like environments (browsers, Node.js, bundlers, etc.), `import.meta.url` provides the module's URL, which you can use to locate a resource relative to the module:

```js
// -- modules/getColors.js --
const colorsURL = new URL("../data/colors.json", import.meta.url);
```

This keeps the resource URL relative to `getColors.js` even when the module is imported from a page or module in another directory.

## Language versus host responsibilities

This article introduces modules as they are defined in the ECMAScript spec. JavaScript modules are inherently tied to the host environment. They need to adapt to different I/O conditions, different architectures, and different engineering needs. As such, the core language only defines the following:

- The syntax for module features, such as `import` and `export` declarations, `import.meta`, and the `import()` expression.
- Module graph building, linking, and evaluation, including cycle detection.
- The module namespace object's shape.

The core language does _not_ care about the following:

- The concept of "files". Although each module is conventionally a separate file, it could as well be an in-memory object, a dynamically fetched string, or anything that can be represented as a JavaScript value.
- The structure of the module specifier string. It could be a URL, a file path, or any other identifier the host recognizes.
- The properties of `import.meta`. All properties, including `import.meta.url`, are host-defined.
- The module loading process. The host environment is responsible for fetching modules, including applying any import attributes, subject to the language's requirements, such as those for JSON modules.

In reality, runtime environments like browsers, Node.js, and Deno often end up implementing the same set of features, so that code is more likely to work across platforms. This guide walks through an example that's run in the browser, but we focus on core concepts that are applicable to all environments. In the Using modules on the web guide, we'll cover the specifics of module loading in browsers, especially import specifiers. Then, in the Modules across platforms guide, we will go further and discuss how the module system is integrated with other environments.

## See also

- Using modules on the web
- Understanding the module graph
- Modules across platforms
- JavaScript modules on v8.dev (2018)
- ES modules: A cartoon deep-dive on hacks.mozilla.org (2018)
- ES6 in Depth: Modules on hacks.mozilla.org (2015)
- Exploring JS, Ch.16: Modules by Dr. Axel Rauschmayer
