---
title: "JavaScript modules (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JavaScript modules (part 2 of 3)

## Default exports and imports

The examples above export and import variables by name. The names for each variable have to match between the exporter and the importer. You can write functional module code using just named imports and exports. However, if you want to import from non-ESM modules (like CommonJS or non-JavaScript files), these systems do not use named exports. In these systems, each module corresponds to exactly one JavaScript value. To represent these types of modules, JavaScript provides a _default export_. This has other use cases, such as modules that are built around one main value—a single class or function—where the default export lets each importer pick its own local name without knowing what the exporting module calls it.

Unlike named exports, default exports have no names associated with them. Each module can have up to one default export. To create a default export, instead of exporting a _declaration_ like `const` or `function`, you export an _expression_ instead, by prepending `export default` to it. For example, all of the following would work:

```js
// An object literal is an expression
export default {
  some: "object",
};

// An addition is an expression
export default 1 + 1;

// An identifier is also an expression
export default randomSquare;
```

You can see the last version in our basic-modules `square.js`, which exports a function called `randomSquare()` that creates a square with a random color, size, and position. Note the lack of curly braces.

As a special case, functions and classes are exported as _declarations_, not expressions, and these declarations can be anonymous. So you can also default-export a function directly when you declare it:

```js
export default function randomSquare(ctx) {
  // …
}
```

```js
// -- main.js --
import randomSquare from "./modules/square.js";
```

Again, note the lack of curly braces. This is because there is only one default export allowed per module, and we know that `randomSquare` is it. You can name this import however you want—it doesn't have to match the function name on the exporting side.

Named exports and default export can coexist in the same module.

## Avoiding naming conflicts

So far, our canvas shape drawing modules seem to be working OK. But what happens if we try to add a module that deals with drawing another shape, like a circle or triangle? These shapes would probably have associated functions like `draw()`, `reportArea()`, etc. too; if we tried to import different functions of the same name into the same top-level module file, we'd end up with conflicts and errors.

Let's look at a real example. In our renaming directory you'll see the same module system as in the previous example, except that we've added `circle.js` and `triangle.js` modules to draw and report on circles and triangles.

Inside each of these modules, we've got features with the same names being exported, and therefore each has the same `export` statement at the bottom:

```js
export { name, draw, reportArea, reportPerimeter };
```

When importing these into `main.js`, if we tried to use

```js
import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
import { name, draw, reportArea, reportPerimeter } from "./modules/circle.js";
import { name, draw, reportArea, reportPerimeter } from "./modules/triangle.js";
```

The browser would throw an error such as "SyntaxError: redeclaration of import name" (Firefox).

Fortunately there are a number of ways to get around this. We'll look at these in the following sections.

### Renaming imports and exports

Inside your `import` and `export` statement's curly braces, you can use the keyword `as` along with a new feature name, to change the identifying name you will use for a feature inside the top-level module.

So in our renaming example, we can rename the imports so that they are unique:

```js
import {
  name as squareName,
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
} from "./modules/square.js";

import {
  name as circleName,
  draw as drawCircle,
  reportArea as reportCircleArea,
  reportPerimeter as reportCirclePerimeter,
} from "./modules/circle.js";

import {
  name as triangleName,
  draw as drawTriangle,
  reportArea as reportTriangleArea,
  reportPerimeter as reportTrianglePerimeter,
} from "./modules/triangle.js";
```

Note that you could solve the problem in the module files instead, e.g.

```js
// -- square.js --
export {
  name as squareName,
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
};
```

```js
// -- main.js --
import {
  squareName,
  drawSquare,
  reportSquareArea,
  reportSquarePerimeter,
} from "./modules/square.js";
```

And it would work just the same. What style you use is up to you, however it arguably makes more sense to leave your module code alone, and make the changes in the imports. This especially makes sense when you are importing from third party modules that you don't have any control over.

By the way, you can use the same syntax for default exports too, by referring to the export name `default` (this is a reserved word, not an actually valid identifier name). The difference with `export default randomSquare;` is that this exports the existing _live binding_, instead of capturing the value of the expression. If you re-assign `randomSquare` in the exporter, this form allows the importer to see the new value. Named default function and class declarations, such as `export default function randomSquare() {}`, also export live bindings.

```js
import { default as randomSquare } from "./modules/square.js";

export { randomSquare as default };
```

### Creating a module namespace object

The above method works OK, but it's a little messy and long-winded. An even better solution is to import each module's features inside a _module namespace object_. The following syntax form does that:

```js
import * as Module from "./modules/module.js";
```

This grabs all the exports available inside `module.js`, and makes them available as members of an object `Module`, effectively giving it its own namespace. So for example:

```js
Module.function1();
Module.function2();
```

Again, let's look at a real example. If you go to our module-objects directory, you'll see the same example again, but rewritten to take advantage of this new syntax. In the modules, the exports are all in the following simple form:

```js
export { name, draw, reportArea, reportPerimeter };
```

The imports on the other hand look like this:

```js
import * as Canvas from "./modules/canvas.js";

import * as Square from "./modules/square.js";
import * as Circle from "./modules/circle.js";
import * as Triangle from "./modules/triangle.js";
```

In each case, you can now access the module's imports underneath the specified object name, for example:

```js
const square = Square.draw(myCanvas.ctx, 50, 50, 100, "blue");
Square.reportArea(square.length, reportList);
Square.reportPerimeter(square.length, reportList);
```

So you can now write the code just the same as before (as long as you include the object names where needed), and the imports are much neater.

### Modules and classes

As we hinted at earlier, you can also export and import classes; this is another option for avoiding conflicts in your code, and is especially useful if you've already got your module code written in an object-oriented style.

You can see an example of our shape drawing module rewritten with ES classes in our classes directory. As an example, the `square.js` file now contains all its functionality in a single class:

```js
class Square {
  constructor(ctx, listId, length, x, y, color) {
    // …
  }

  draw() {
    // …
  }

  // …
}
```

which we then export:

```js
export { Square };
```

```js
// -- main.js --
import { Square } from "./modules/square.js";
```

And then use the class to draw our square:

```js
const square = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, "blue");
square.draw();
square.reportArea();
square.reportPerimeter();
```

## Aggregating modules

We now have multiple modules, each doing a similar thing. If someone wants to use several of these, they have to write a separate import declaration for each:

```js
import { Square } from "./modules/square.js";
import { Circle } from "./modules/circle.js";
import { Triangle } from "./modules/triangle.js";
```

But it would be better if we could put all these exports into the same module, so no matter how many of these exports users need, they can grab all of them with one `import`.

```js
import { Square, Circle, Triangle } from "./modules/shapes.js";
```

In our module-aggregation example (based on our earlier classes example) we've got an extra module called `shapes.js`, which aggregates all the functionality from `circle.js`, `square.js`, and `triangle.js` together. This is called a "barrel module" because it doesn't do anything other than aggregating exports from all other modules. We've also moved our submodules inside a subdirectory inside the `modules` directory called `shapes`. So the module structure in this example is:

```plain
modules/
  canvas.js
  shapes.js
  shapes/
    circle.js
    square.js
    triangle.js
```

```js
// -- shapes.js --
import { Circle } from "./shapes/circle.js";
import { Square } from "./shapes/square.js";
import { Triangle } from "./shapes/triangle.js";

export { Circle, Square, Triangle };
```

These grab the exports from the individual submodules and effectively make them available from the `shapes.js` module. But there's no need to `import` something just to `export` it. You can use the `export ... from` syntax to directly import and re-export in one line.

```js
export { Square } from "./shapes/square.js";
export { Triangle } from "./shapes/triangle.js";
export { Circle } from "./shapes/circle.js";
```

> **Note:**
> The exports referenced in `shapes.js` basically get redirected through the file and don't really exist there, so you won't be able to write any useful related code inside the same file.

Alternatively, you can replace `shapes.js` with the special `export * from` syntax:

```js
export * from "./shapes/square.js";
export * from "./shapes/triangle.js";
export * from "./shapes/circle.js";
```

This re-exports _all_ exports (other than the default) from the target module as named exports of the current module, so if you export something else from `square.js`, you don't have to modify `shapes.js` as well. Only do this if you actually want `shapes.js` to re-export everything from `square.js`, or you may accidentally expose things.

Almost all `import` syntaxes we've introduced have `export ... from` equivalents. The only exception is the default import `import x from "mod"`, for which `export x from "mod"` does not exist, and you must use the special `export { default } from` syntax.

```js
export { x } from "mod";
export { x as v } from "mod";
export * as ns from "mod";
export { default } from "mod";
```

## Importing a module for its side effects

Sometimes you want to run a module's initialization code without importing any of its exports, for example, to install a polyfill. Use an import with only a module specifier:

```js
import "./modules/polyfills.js";
```

See the `import` reference for more information.

## Import declarations are hoisted

Import declarations are hoisted. In this case, it means that the imported values are available in the module's code even before the place that declares them, and that the imported module's side effects are produced before the rest of the module's code starts running.

So for example, in `main.js`, importing `Canvas` in the middle of the code would still work:

```js
// …
const myCanvas = new Canvas("myCanvas", document.body, 480, 320);
myCanvas.create();
import { Canvas } from "./modules/canvas.js";
myCanvas.createReportList();
// …
```

However, it is considered good practice to put all your imports at the top of the code, which makes it easier to analyze dependencies.

## Importing JSON modules

We have seen how to import from JavaScript modules, where data is exported with `export` statements. You can also import values from modules written in other languages, as long as the runtime environment knows how to interpret them. The specification only defines two other resource types: JSON modules and text modules. Here, we look at JSON modules, which are more common.

A JSON module is basically a standalone JSON file. When imported, it provides a single default export containing the parsed JSON value. You import it like this:

```js
import data from "./data.json" with { type: "json" };
```

Notice the extra `with { type: "json" }` at the end. This is an import attribute that tells the runtime environment to validate that the loaded file is indeed JSON. We will talk more about them in the Using modules on the web guide, because their semantics are not defined in the core language. You might be able to import JSON modules without `with { type: "json" }`. The only requirement is that if `with { type: "json" }` is specified, then the loaded module must be parsed as JSON. It is good practice to always declare the type of the module you are importing so it can work everywhere.

Text modules work similarly and result in strings.

```js
import text from "./text.txt" with { type: "text" };
```
