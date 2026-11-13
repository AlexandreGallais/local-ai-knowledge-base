---
title: "Modules - Theory (part 2 of 5)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Theory.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Theory (part 2 of 5)

## The module output format

In any project, the first question about modules we need to answer is what kinds of modules the host expects, so TypeScript can set its output format for each file to match. Sometimes, the host only _supports_ one kind of module—ESM in the browser, or CJS in Node.js v11 and earlier, for example. Node.js v12 and later accepts both CJS and ES modules, but uses file extensions and `package.json` files to determine what format each file should be, and throws an error if the file’s contents don’t match the expected format.

The `module` compiler option provides this information to the compiler. Its primary purpose is to control the module format of any JavaScript that gets emitted during compilation, but it also serves to inform the compiler about how the module kind of each file should be detected, how different module kinds are allowed to import each other, and whether features like `import.meta` and top-level `await` are available. So, even if a TypeScript project is using `noEmit`, choosing the right setting for `module` still matters. As we established earlier, the compiler needs an accurate understanding of the module system so it can type check (and provide IntelliSense for) imports. See _Choosing compiler options_ for guidance on choosing the right `module` setting for your project.

The available `module` settings are

- **`node16`**: Reflects the module system of Node.js v16+, which supports ES modules and CJS modules side-by-side with particular interoperability and detection rules.
- **`node18`**: Reflects the module system of Node.js v18+, which adds support for import attributes.
- **`nodenext`**: A moving target reflecting the latest Node.js versions as Node.js’s module system evolves. As of TypeScript 5.8, `nodenext` supports `require` of ECMAScript modules.
- **`es2015`**: Reflects the ES2015 language specification for JavaScript modules (the version that first introduced `import` and `export` to the language).
- **`es2020`**: Adds support for `import.meta` and `export * as ns from "mod"` to `es2015`.
- **`es2022`**: Adds support for top-level `await` to `es2020`.
- **`esnext`**: Currently identical to `es2022`, but will be a moving target reflecting the latest ECMAScript specifications, as well as module-related Stage 3+ proposals that are expected to be included in upcoming specification versions.
- **`commonjs`, `system`, `amd`, and `umd`**: Each emits everything in the module system named, and assumes everything can be successfully imported into that module system. These are no longer recommended for new projects and will not be covered in detail by this documentation.

> Node.js’s rules for module format detection and interoperability make it incorrect to specify `module` as `esnext` or `commonjs` for projects that run in Node.js, even if all files emitted by `tsc` are ESM or CJS, respectively. The only correct `module` settings for projects that intend to run in Node.js are `node16` and `nodenext`. While the emitted JavaScript for an all-ESM Node.js project might look identical between compilations using `esnext` and `nodenext`, the type checking can differ. See the reference section on `nodenext` for more details.

### Module format detection

Node.js understands both ES modules and CJS modules, but the format of each file is determined by its file extension and the `type` field of the first `package.json` file found in a search of the file’s directory and all ancestor directories:

- `.mjs` and `.cjs` files are always interpreted as ES modules and CJS modules, respectively.
- `.js` files are interpreted as ES modules if the nearest `package.json` file contains a `type` field with the value `"module"`. If there is no `package.json` file, or if the `type` field is missing or has any other value, `.js` files are interpreted as CJS modules.

If a file is determined to be an ES module by these rules, Node.js will not inject the CommonJS `module` and `require` objects into the file’s scope during evaluation, so a file that tries to use them will cause a crash. Conversely, if a file is determined to be a CJS module, `import` and `export` declarations in the file will cause a syntax error crash.

When the `module` compiler option is set to `node16`, `node18`, or `nodenext`, TypeScript applies this same algorithm to the project’s _input_ files to determine the module kind of each corresponding _output_ file. Let’s look at how module formats are detected in an example project that uses `--module nodenext`:

| Input file name                  | Contents               | Output file name | Module kind | Reason                                  |
| -------------------------------- | ---------------------- | ---------------- | ----------- | --------------------------------------- |
| `/package.json`                  | `{}`                   |                  |             |                                         |
| `/main.mts`                      |                        | `/main.mjs`      | ESM         | File extension                          |
| `/utils.cts`                     |                        | `/utils.cjs`     | CJS         | File extension                          |
| `/example.ts`                    |                        | `/example.js`    | CJS         | No `"type": "module"` in `package.json` |
| `/node_modules/pkg/package.json` | `{ "type": "module" }` |                  |             |                                         |
| `/node_modules/pkg/index.d.ts`   |                        |                  | ESM         | `"type": "module"` in `package.json`    |
| `/node_modules/pkg/index.d.cts`  |                        |                  | CJS         | File extension                          |

When the input file extension is `.mts` or `.cts`, TypeScript knows to treat that file as an ES module or CJS module, respectively, because Node.js will treat the output `.mjs` file as an ES module or the output `.cjs` file as a CJS module. When the input file extension is `.ts`, TypeScript has to consult the nearest `package.json` file to determine the module format, because this is what Node.js will do when it encounters the output `.js` file. (Notice that the same rules apply to the `.d.cts` and `.d.ts` declaration files in the `pkg` dependency: though they will not produce an output file as part of this compilation, the presence of a `.d.ts` file _implies_ the existence of a corresponding `.js` file—perhaps created when the author of the `pkg` library ran `tsc` on an input `.ts` file of their own—which Node.js must interpret as an ES module, due to its `.js` extension and the presence of the `"type": "module"` field in `/node_modules/pkg/package.json`. Declaration files are covered in more detail in a later section.)

The detected module format of input files is used by TypeScript to ensure it emits the output syntax that Node.js expects in each output file. If TypeScript were to emit `/example.js` with `import` and `export` statements in it, Node.js would crash when parsing the file. If TypeScript were to emit `/main.mjs` with `require` calls, Node.js would crash during evaluation. Beyond emit, the module format is also used to determine rules for type checking and module resolution, which we’ll discuss in the following sections.

As of TypeScript 5.6, other `--module` modes (like `esnext` and `commonjs`) also respect format-specific file extensions (`.mts` and `.cts`) as a file-level override for the emit format. For example, a file named `main.mts` will emit ESM syntax into `main.mjs` even if `--module` is set to `commonjs`.

It’s worth mentioning again that TypeScript’s behavior in `--module node16`, `--module node18`, and `--module nodenext` is entirely motivated by Node.js’s behavior. Since TypeScript’s goal is to catch potential runtime errors at compile time, it needs a very accurate model of what will happen at runtime. This fairly complex set of rules for module kind detection is _necessary_ for checking code that will run in Node.js, but may be overly strict or just incorrect if applied to non-Node.js hosts.

### Input module syntax

It’s important to note that the _input_ module syntax seen in input source files is somewhat decoupled from the output module syntax emitted to JS files. That is, a file with an ESM import:

```ts
import { sayHello } from "greetings";
sayHello("world");
```

might be emitted in ESM format exactly as-is, or might be emitted as CommonJS:

```ts
Object.defineProperty(exports, "__esModule", { value: true });
const greetings_1 = require("greetings");
(0, greetings_1.sayHello)("world");
```

depending on the `module` compiler option (and any applicable module format detection rules, if the `module` option supports more than one kind of module). In general, this means that looking at the contents of an input file isn’t enough to determine whether it’s an ES module or a CJS module.

> Today, most TypeScript files are authored using ESM syntax (`import` and `export` statements) regardless of the output format. This is largely a legacy of the long road ESM has taken to widespread support. ECMAScript modules were standardized in 2015, were supported in most browsers by 2017, and landed in Node.js v12 in 2019. During much of this window, it was clear that ESM was the future of JavaScript modules, but very few runtimes could consume it. Tools like Babel made it possible for JavaScript to be authored in ESM and downleveled to another module format that could be used in Node.js or browsers. TypeScript followed suit, adding support for ES module syntax and softly discouraging the use of the original CommonJS-inspired `import fs = require("fs")` syntax in the 1.5 release.
>
> The upside of this “author ESM, output anything” strategy was that TypeScript could use standard JavaScript syntax, making the authoring experience familiar to newcomers, and (theoretically) making it easy for projects to start targeting ESM outputs in the future. There are three significant downsides, which became fully apparent only after ESM and CJS modules were allowed to coexist and interoperate in Node.js:
>
> 1. Early assumptions about how ESM/CJS interoperability would work in Node.js turned out to be wrong, and today, interoperability rules differ between Node.js and bundlers. Consequently, the configuration space for modules in TypeScript is large.
> 2. When the syntax in input files all looks like ESM, it’s easy for an author or code reviewer to lose track of what kind of module a file is at runtime. And because of Node.js’s interoperability rules, what kind of module each file is became very important.
> 3. When input files are written in ESM, the syntax in type declaration outputs (`.d.ts` files) looks like ESM too. But because the corresponding JavaScript files could have been emitted in any module format, TypeScript can’t tell what kind of module a file is just by looking at the contents of its type declarations. And again, because of the nature of ESM/CJS interoperability, TypeScript _has_ to know what kind of module everything is in order to provide correct types and prevent imports that will crash.
>
> In TypeScript 5.0, a new compiler option called `verbatimModuleSyntax` was introduced to help TypeScript authors know exactly how their `import` and `export` statements will be emitted. When enabled, the flag requires imports and exports in input files to be written in the form that will undergo the least amount of transformation before emit. So if a file will be emitted as ESM, imports and exports must be written in ESM syntax; if a file will be emitted as CJS, it must be written in the CommonJS-inspired TypeScript syntax (`import fs = require("fs")` and `export = {}`). This setting is particularly recommended for Node.js projects that use mostly ESM, but have a select few CJS files. It is not recommended for projects that currently target CJS, but may want to target ESM in the future.

### ESM and CJS interoperability

Can an ES module `import` a CommonJS module? If so, does a default import link to `exports` or `exports.default`? Can a CommonJS module `require` an ES module? CommonJS isn’t part of the ECMAScript specification, so runtimes, bundlers, and transpilers have been free to make up their own answers to these questions since ESM was standardized in 2015, and as such no standard set of interoperability rules exist. Today, most runtimes and bundlers broadly fall into one of three categories:

1. **ESM-only.** Some runtimes, like browser engines, only support what’s actually a part of the language: ECMAScript Modules.
2. **Bundler-like.** Before any major JavaScript engine could run ES modules, Babel allowed developers to write them by transpiling them to CommonJS. The way these ESM-transpiled-to-CJS files interacted with hand-written-CJS files implied a set of permissive interoperability rules that have become the de facto standard for bundlers and transpilers.
3. **Node.js.** Until Node.js v20.19.0, CommonJS modules could not load ES modules synchronously (with `require`); they could only load them asynchronously with dynamic `import()` calls. ES modules can default-import CJS modules, which always binds to `exports`. (This means that a default import of a Babel-like CJS output with `__esModule` behaves differently between Node.js and some bundlers.)

TypeScript needs to know which of these rule sets to assume in order to provide correct types on (particularly `default`) imports and to error on imports that will crash at runtime. When the `module` compiler option is set to `node16`, `node18`, or `nodenext`, Node.js’s version-specific rules are enforced.[^1] All other `module` settings, combined with the `esModuleInterop` option, result in bundler-like interop in TypeScript. (While using `--module esnext` does prevent you from _writing_ CommonJS modules, it does not prevent you from _importing_ them as dependencies. There’s currently no TypeScript setting that can guard against an ES module importing a CommonJS module, as would be appropriate for direct-to-browser code.)
