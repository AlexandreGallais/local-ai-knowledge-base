---
title: "SyntaxError: import declarations may only appear at top level of a module"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/import_decl_module_top_level/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: import declarations may only appear at top level of a module

The JavaScript exception "import declarations may only appear at top level of a module" occurs when an import declaration is not at the top level of a module. This might be because the import declaration is nested in other constructs (functions, blocks, etc.), or more often because the current file is not treated as a module.

## Message

```plain
SyntaxError: Cannot use import statement outside a module (V8-based)
SyntaxError: import declarations may only appear at top level of a module (Firefox)
SyntaxError: Unexpected identifier 'x'. import call expects one or two arguments. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

You may have an `import` declaration that's nested in another construct, such as a function or a block. The `import` declaration must be at the top level of the module. If you want to conditionally import a module, or lazily import it on demand, use dynamic import instead.

If the `import` is already at the top level of the code, it may be because the file is not interpreted as a module. Runtimes require external hints to determine whether a file is a module or not, and here are several ways to provide such hints:

- If the file is directly loaded from HTML, make sure the `<script>` tag has the `type="module"` attribute.
- If the file is run in Node, make sure either the file has the `.mjs` extension, or the closest `package.json` file has the `"type": "module"` field.
- If the file is run as a worker, make sure you call the `Worker()` constructor with the `type: "module"` option.
- Import this file from another module.

One other cause might be when you are writing `import` with a compiler (such as TypeScript) and you accidentally ran the source file. Since `import` declarations usually appear at the very start of the program, they are the first thing the parser sees and then complains about. Make sure to compile the source file and execute the compiled file instead.

## Examples

### Conditional imports

You cannot use `import` inside other constructs, like you might do in Python.

```js
if (writeOutput) {
  import fs from "fs"; // SyntaxError
}
```

Either move the `import` to the top level, or use dynamic import.

```js
if (writeOutput) {
  import("fs").then((fs) => {
    // use fs
  });
}
```

### Importing in a non-module script

If you are loading the script from HTML, make sure to add the `type="module"` attribute to the `<script>` tag.

```html
<script type="module" src="main.js"></script>
```

If for some reason you cannot migrate the script to a module, you can use dynamic import.

```js
async function main() {
  const myModule = await import("./my-module.js");
  // use myModule
}

main();
```

## See also

- Using modules
- `import`
- `import()`
