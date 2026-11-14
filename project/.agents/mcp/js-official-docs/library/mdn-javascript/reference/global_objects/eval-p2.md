---
title: "eval() (part 2 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/eval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# eval() (part 2 of 3)

## Description

`eval()` is a function property of the global object.

The argument of the `eval()` function is a string. It will evaluate the source string as a script body, which means both statements and expressions are allowed. It returns the completion value of the code. For expressions, it's the value the expression evaluates to. Many statements and declarations have completion values as well, but the result may be surprising (for example, the completion value of an assignment is the assigned value, but the completion value of `let` is undefined), so it's recommended to not rely on statements' completion values.

In strict mode, declaring a variable named `eval` or re-assigning `eval` is a `SyntaxError`.

```js
"use strict";

const eval = 1; // SyntaxError: Unexpected eval or arguments in strict mode
```

If the argument of `eval()` is not a `TrustedScript` or string, `eval()` returns the argument unchanged. In the following example, passing a `String` object instead of a primitive causes `eval()` to return the `String` object rather than evaluating the string.

```js
eval(new String("2 + 2")); // returns a String object containing "2 + 2"
eval("2 + 2"); // returns 4
```

To work around the issue in a generic fashion, you can coerce the argument to a string yourself before passing it to `eval()`.

```js
const expression = new String("2 + 2");
eval(String(expression)); // returns 4
```

### Direct and indirect eval

There are two modes of `eval()` calls: _direct_ eval and _indirect_ eval. Direct eval, as the name implies, refers to _directly_ calling the global `eval` function with `eval(...)`. Everything else, including invoking it via an aliased variable, via a member access or other expression, or through the optional chaining `?.` operator, is indirect.

```js
// Direct call
eval("x + y");

// Indirect call using the comma operator to return eval
(0, eval)("x + y");

// Indirect call through optional chaining
eval?.("x + y");

// Indirect call using a variable to store and return eval
const myEval = eval;
myEval("x + y");

// Indirect call through member access
const obj = { eval };
obj.eval("x + y");
```

Indirect eval can be seen as if the code is evaluated within a separate `<script>` tag. This means:

- Indirect eval works in the global scope rather than the local scope, and the code being evaluated doesn't have access to local variables within the scope where it's being called.

  ```js
  function test() {
    const x = 2;
    const y = 4;
    // Direct call, uses local scope
    console.log(eval("x + y")); // Result is 6
    // Indirect call, uses global scope
    console.log(eval?.("x + y")); // Throws because x is not defined in global scope
  }
  ```

- Indirect `eval` does not inherit the strictness of the surrounding context, and is only in strict mode if the source string itself has a `"use strict"` directive.

  ```js
  function nonStrictContext() {
    eval?.(`with (Math) console.log(PI);`);
  }
  function strictContext() {
    "use strict";
    eval?.(`with (Math) console.log(PI);`);
  }
  function strictContextStrictEval() {
    "use strict";
    eval?.(`"use strict"; with (Math) console.log(PI);`);
  }
  nonStrictContext(); // Logs 3.141592653589793
  strictContext(); // Logs 3.141592653589793
  strictContextStrictEval(); // Uncaught SyntaxError: Strict mode code may not include a with statement
  ```

  On the other hand, direct eval inherits the strictness of the invoking context.

  ```js
  function nonStrictContext() {
    eval(`with (Math) console.log(PI);`);
  }
  function strictContext() {
    "use strict";
    eval(`with (Math) console.log(PI);`);
  }
  function strictContextStrictEval() {
    "use strict";
    eval(`"use strict"; with (Math) console.log(PI);`);
  }
  nonStrictContext(); // Logs 3.141592653589793
  strictContext(); // Uncaught SyntaxError: Strict mode code may not include a with statement
  strictContextStrictEval(); // Uncaught SyntaxError: Strict mode code may not include a with statement
  ```

- `var`-declared variables and function declarations would go into the surrounding scope if the source string is not interpreted in strict mode — for indirect eval, they become global variables. If it's a direct eval in a strict mode context, or if the `eval` source string itself is in strict mode, then `var` and function declarations do not "leak" into the surrounding scope.

  ```js
  // Neither context nor source string is strict,
  // so var creates a variable in the surrounding scope
  eval("var a = 1;");
  console.log(a); // 1
  // Context is not strict, but eval source is strict,
  // so b is scoped to the evaluated script
  eval("'use strict'; var b = 1;");
  console.log(b); // ReferenceError: b is not defined

  function strictContext() {
    "use strict";
    // Context is strict, but this is indirect and the source
    // string is not strict, so c is still global
    eval?.("var c = 1;");
    // Direct eval in a strict context, so d is scoped
    eval("var d = 1;");
  }
  strictContext();
  console.log(c); // 1
  console.log(d); // ReferenceError: d is not defined
  ```

  `let` and `const` declarations within the evaluated string are always scoped to that script.

- Direct eval may have access to additional contextual expressions. For example, in a function's body, one can use `new.target`:

  ```js
  function Ctor() {
    eval("console.log(new.target)");
  }
  new Ctor(); // [Function: Ctor]
  ```

### Never use direct eval()!

Using direct `eval()` suffers from multiple problems:

- `eval()` executes the code it's passed with the privileges of the caller. If you run `eval()` with a string that could be affected by a malicious party, you may end up running malicious code on the user's machine with the permissions of your webpage / extension. More importantly, allowing third-party code to access the scope in which `eval()` was invoked (if it's a direct eval) can lead to possible attacks that reads or changes local variables. See Security considerations for approaches that mitigate these risks.
- `eval()` is slower than the alternatives, since it has to invoke the JavaScript interpreter, while many other constructs are optimized by modern JS engines.
- Modern JavaScript interpreters convert JavaScript to machine code. This means that any concept of variable naming gets obliterated. Thus, any use of `eval()` will force the browser to do long expensive variable name lookups to figure out where the variable exists in the machine code and set its value. Additionally, new things can be introduced to that variable through `eval()`, such as changing the type of that variable, forcing the browser to re-evaluate all of the generated machine code to compensate.
- Minifiers give up on any minification if the scope is transitively depended on by `eval()`, because otherwise `eval()` cannot read the correct variable at runtime.

There are many cases where the use of `eval()` or related methods can be optimized or avoided altogether.

#### Using indirect eval()

Consider this code:

```js
function looseJsonParse(obj) {
  return eval(`(${obj})`);
}
console.log(looseJsonParse("{ a: 4 - 1, b: function () {}, c: new Map() }"));
```

Simply using indirect eval and forcing strict mode can make the code much better:

```js
function looseJsonParse(obj) {
  return eval?.(`"use strict";(${obj})`);
}
console.log(looseJsonParse("{ a: 4 - 1, b: function () {}, c: new Map() }"));
```

The two code snippets above may seem to work the same way, but they do not; the first one using direct eval suffers from multiple problems.

- It is a great deal slower, due to more scope inspections. Notice `c: new Map()` in the evaluated string. In the indirect eval version, the object is being evaluated in the global scope, so it is safe for the interpreter to assume that `Map` refers to the global `Map()` constructor instead of a local variable called `Map`. However, in the code using direct eval, the interpreter cannot assume this. For example, in the following code, `Map` in the evaluated string doesn't refer to `window.Map()`.

  ```js
  function looseJsonParse(obj) {
    class Map {}
    return eval(`(${obj})`);
  }
  console.log(looseJsonParse(`{ a: 4 - 1, b: function () {}, c: new Map() }`));
  ```

  Thus, in the `eval()` version of the code, the browser is forced to make the expensive lookup call to check to see if there are any local variables called `Map()`.

- If not using strict mode, `var` declarations within the `eval()` source becomes variables in the surrounding scope. This leads to hard-to-debug issues if the string is acquired from external input, especially if there's an existing variable with the same name.
- Direct eval can read and mutate bindings in the surrounding scope, which may lead to external input corrupting local data.
- When using direct `eval`, especially when the eval source cannot be proven to be in strict mode, the engine — and build tools — have to disable all optimizations related to inlining, because the `eval()` source can depend on any variable name in its surrounding scope.

However, using indirect `eval()` does not allow passing extra bindings other than existing global variables for the evaluated source to read. If you need to specify additional variables that the evaluated source should have access to, consider using the `Function()` constructor.

#### Using the Function() constructor

The `Function()` constructor is very similar to the indirect eval example above: it also evaluates the JavaScript source passed to it in the global scope without reading or mutating any local bindings, and therefore allows engines to do more optimizations than direct `eval()`.

The difference between `eval()` and `Function()` is that the source string passed to `Function()` is parsed as a function body, not as a script. There are a few nuances — for example, you can use `return` statements at the top level of a function body, but not in a script.

The `Function()` constructor is useful if you wish to create local bindings within your eval source, by passing the variables as parameter bindings.

```js
function add(a, b) {
  return a + b;
}
function runCodeWithAddFunction(obj) {
  return Function("add", `"use strict";return (${obj});`)(add);
}
console.log(runCodeWithAddFunction("add(5, 7)")); // 12
```

Both `eval()` and `Function()` implicitly evaluate arbitrary code, and are forbidden in strict CSP settings. There are also additional safer (and faster!) alternatives to `eval()` or `Function()` for common use-cases.

#### Using bracket accessors

You should not use `eval()` to access properties dynamically. Consider the following example where the property of the object to be accessed is not known until the code is executed. This can be done with `eval()`:

```js
const obj = { a: 20, b: 30 };
const propName = getPropName(); // returns "a" or "b"

const result = eval(`obj.${propName}`);
```

However, `eval()` is not necessary here — in fact, it's more error-prone, because if `propName` is not a valid identifier, it leads to a syntax error. Moreover, if `getPropName` is not a function you control, this may lead to execution of arbitrary code. Instead, use the property accessors, which are much faster and safer:

```js
const obj = { a: 20, b: 30 };
const propName = getPropName(); // returns "a" or "b"
const result = obj[propName]; // obj["a"] is the same as obj.a
```

You can even use this method to access descendant properties. Using `eval()`, this would look like:

```js
const obj = { a: { b: { c: 0 } } };
const propPath = getPropPath(); // suppose it returns "a.b.c"

const result = eval(`obj.${propPath}`); // 0
```

Avoiding `eval()` here could be done by splitting the property path and looping through the different properties:

```js
function getDescendantProp(obj, desc) {
  const arr = desc.split(".");
  while (arr.length) {
    obj = obj[arr.shift()];
  }
  return obj;
}

const obj = { a: { b: { c: 0 } } };
const propPath = getPropPath(); // suppose it returns "a.b.c"
const result = getDescendantProp(obj, propPath); // 0
```

Setting a property that way works similarly:

```js
function setDescendantProp(obj, desc, value) {
  const arr = desc.split(".");
  while (arr.length > 1) {
    obj = obj[arr.shift()];
  }
  return (obj[arr[0]] = value);
}

const obj = { a: { b: { c: 0 } } };
const propPath = getPropPath(); // suppose it returns "a.b.c"
const result = setDescendantProp(obj, propPath, 1); // obj.a.b.c is now 1
```

However, beware that using bracket accessors with unconstrained input is not safe either — it may lead to object injection attacks.

#### Using callbacks

JavaScript has first-class functions, which means you can pass <example-value> as arguments to other APIs, store them in variables and objects' properties, and so on. Many DOM APIs are designed with this in mind, so you can (and should) write:

```js
// Instead of setTimeout("…", 1000) use:
setTimeout(() => {
  // …
}, 1000);

// Instead of elt.setAttribute("onclick", "…") use:
elt.addEventListener("click", () => {
  // …
});
```

Closures are also helpful as a way to create parameterized functions without concatenating strings.

#### Using JSON

If the string you're calling `eval()` on contains data (for example, an array: `"[1, 2, 3]"`), as opposed to code, you should consider switching to JSON, which allows the string to use a subset of JavaScript syntax to represent data.

Note that since JSON syntax is limited compared to JavaScript syntax, many valid JavaScript literals will not parse as JSON. For example, trailing commas are not allowed in JSON, and property names (keys) in object literals must be enclosed in quotes. Be sure to use a JSON serializer to generate strings that will be later parsed as JSON.

Passing carefully constrained data instead of arbitrary code is a good idea in general. For example, an extension designed to scrape contents of web-pages could have the scraping rules defined in XPath instead of JavaScript code.
