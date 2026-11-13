---
title: "tsc CLI Options (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/project-config/Compiler Options.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# tsc CLI Options (part 2 of 3)

## Compiler Options

**If you're looking for more information about the compiler options in a tsconfig, check out the TSConfig Reference**

<h3>CLI Commands</h3>

       | Flag
       | Type

   | `--all`
   | `boolean`

 |
Show all compiler options.

   | `--help`
   | `boolean`

 |
Gives local information for help on the CLI.

   | `--ignoreConfig`
   | `boolean`

 |
Ignore the tsconfig found and build with commandline options and files.

   | `--init`
   | `boolean`

 |
Initializes a TypeScript project and creates a tsconfig.json file.

   | `--listFilesOnly`
   | `boolean`

 |
Print names of files that are part of the compilation and then stop processing.

   | `--locale`
   | `string`

 |
Set the language of the messaging from TypeScript. This does not affect emit.

   | `--project`
   | `string`

 |
Compile the project given the path to its configuration file, or to a folder with a 'tsconfig.json'.

   | `--showConfig`
   | `boolean`

 |
Print the final configuration instead of building.

   | `--version`
   | `boolean`

 |
Print the compiler's version.

<h3>Build Options</h3>

       | Flag
       | Type

   | `--build`
   | `boolean`

 |
Build one or more projects and their dependencies, if out of date

   | `--clean`
   | `boolean`

 |
Delete the outputs of all projects.

   | `--dry`
   | `boolean`

 |
Show what would be built (or deleted, if specified with '--clean')

   | <code>--force</code>
   | `boolean`

 |
Build all projects, including those that appear to be up to date.

   | <code>--verbose</code>
   | `boolean`

 |
Enable verbose logging.

<h3>Watch Options</h3>

       | Flag
       | Type

   | <code>--excludeDirectories</code>
   | `list`

 |
Remove a list of directories from the watch process.

   | <code>--excludeFiles</code>
   | `list`

 |
Remove a list of files from the watch mode's processing.

   | <code>--fallbackPolling</code>
   | `fixedinterval`, `priorityinterval`, `dynamicpriority`, or `fixedchunksize`

 |
Specify what approach the watcher should use if the system runs out of native file watchers.

   | <code>--synchronousWatchDirectory</code>
   | `boolean`

 |
Synchronously call callbacks and update the state of directory watchers on platforms that don`t support recursive watching natively.

   | `--watch`
   | `boolean`

 |
Watch input files.

   | <code>--watchDirectory</code>
   | `usefsevents`, `fixedpollinginterval`, `dynamicprioritypolling`, or `fixedchunksizepolling`

 |
Specify how directories are watched on systems that lack recursive file-watching functionality.

   | <code>--watchFile</code>
   | `fixedpollinginterval`, `prioritypollinginterval`, `dynamicprioritypolling`, `fixedchunksizepolling`, `usefsevents`, or `usefseventsonparentdirectory`

 |
Specify how the TypeScript watch mode works.

<h3>Compiler Flags</h3>

       | Flag
       | Type
       | Default

   | <code>--allowArbitraryExtensions</code>
   | `boolean`

   | `false`

 |
Enable importing files with any extension, provided a declaration file is present.

   | <code>--allowImportingTsExtensions</code>
   | `boolean`

   | `true` if `rewriteRelativeImportExtensions`; `false` otherwise.

 |
Allow imports to include TypeScript file extensions.

   | <code>--allowJs</code>
   | `boolean`

   | `false`, unless `checkJs` is set

 |
Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.

   | <code>--allowSyntheticDefaultImports</code>
   | `boolean`

   | `true` if `esModuleInterop` is enabled, `module` is `system`, or `moduleResolution` is `bundler`; `false` otherwise.

 |
Allow 'import x from y' when a module doesn't have a default export.

   | <code>--allowUmdGlobalAccess</code>
   | `boolean`

   | `false`

 |
Allow accessing UMD globals from modules.

   | <code>--allowUnreachableCode</code>
   | `boolean`

   |

 |
Disable error reporting for unreachable code.

   | <code>--allowUnusedLabels</code>
   | `boolean`

   |

 |
Disable error reporting for unused labels.

   | <code>--alwaysStrict</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Ensure 'use strict' is always emitted.

   | <code>--assumeChangesOnlyAffectDirectDependencies</code>
   | `boolean`

   | `false`

 |
Have recompiles in projects that use `incremental` and `watch` mode assume that changes within a file will only affect files directly depending on it.

   | <code>--baseUrl</code>
   | `string`

   |

 |
Specify the base directory to resolve bare specifier module names.

   | <code>--charset</code>
   | `string`

   | `utf8`

 |
No longer supported. In early versions, manually set the text encoding for reading files.

   | <code>--checkJs</code>
   | `boolean`

   | `false`

 |
Enable error reporting in type-checked JavaScript files.

   | <code>--composite</code>
   | `boolean`

   | `false`

 |
Enable constraints that allow a TypeScript project to be used with project references.

   | <code>--customConditions</code>
   | `list`

   |

 |
Conditions to set in addition to the resolver-specific defaults when resolving imports.

   | <code>--declaration</code>
   | `boolean`

   | `true` if `composite`; `false` otherwise.

 |
Generate .d.ts files from TypeScript and JavaScript files in your project.

   | <code>--declarationDir</code>
   | `string`

   |

 |
Specify the output directory for generated declaration files.

   | <code>--declarationMap</code>
   | `boolean`

   | `false`

 |
Create sourcemaps for d.ts files.

   | <code>--diagnostics</code>
   | `boolean`

   | `false`

 |
Output compiler performance information after building.

   | <code>--disableReferencedProjectLoad</code>
   | `boolean`

   | `false`

 |
Reduce the number of projects loaded automatically by TypeScript.

   | <code>--disableSizeLimit</code>
   | `boolean`

   | `false`

 |
Remove the 20mb cap on total source code size for JavaScript files in the TypeScript language server.

   | <code>--disableSolutionSearching</code>
   | `boolean`

   | `false`

 |
Opt a project out of multi-project reference checking when editing.

   | <code>--disableSourceOfProjectReferenceRedirect</code>
   | `boolean`

   | `false`

 |
Disable preferring source files instead of declaration files when referencing composite projects.

   | <code>--downlevelIteration</code>
   | `boolean`

   | `false`

 |
Emit more compliant, but verbose and less performant JavaScript for iteration.

   | <code>--emitBOM</code>
   | `boolean`

   | `false`

 |
Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.

   | <code>--emitDeclarationOnly</code>
   | `boolean`

   | `false`

 |
Only output d.ts files and not JavaScript files.

   | <code>--emitDecoratorMetadata</code>
   | `boolean`

   | `false`

 |
Emit design-type metadata for decorated declarations in source files.

   | <code>--erasableSyntaxOnly</code>
   | `boolean`

   | `false`

 |
Do not allow runtime constructs that are not part of ECMAScript.

   | <code>--esModuleInterop</code>
   | `boolean`

   | `true` if `module` is `node16`, `nodenext`, or `preserve`; `false` otherwise.

 |
Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.

   | <code>--exactOptionalPropertyTypes</code>
   | `boolean`

   | `false`

 |
Interpret optional property types as written, rather than adding `undefined`.

   | <code>--experimentalDecorators</code>
   | `boolean`

   | `false`

 |
Enable experimental support for TC39 stage 2 draft decorators.

   | <code>--explainFiles</code>
   | `boolean`

   | `false`

 |
Print files read during the compilation including why it was included.

   | <code>--extendedDiagnostics</code>
   | `boolean`

   | `false`

 |
Output more detailed compiler performance information after building.

   | <code>--forceConsistentCasingInFileNames</code>
   | `boolean`

   | `true`

 |
Ensure that casing is correct in imports.

   | <code>--generateCpuProfile</code>
   | `string`

   | `profile.cpuprofile`

 |
Emit a v8 CPU profile of the compiler run for debugging.

   | <code>--generateTrace</code>
   | `string`

   |

 |
Generates an event trace and a list of types.

   | <code>--importHelpers</code>
   | `boolean`

   | `false`

 |
Allow importing helper functions from tslib once per project, instead of including them per-file.

   | <code>--importsNotUsedAsValues</code>
   | `remove`, `preserve`, or `error`

   | `remove`

 |
Specify emit/checking behavior for imports that are only used for types.

   | <code>--incremental</code>
   | `boolean`

   | `true` if `composite`; `false` otherwise.

 |
Save .tsbuildinfo files to allow for incremental compilation of projects.

   | <code>--inlineSourceMap</code>
   | `boolean`

   | `false`

 |
Include sourcemap files inside the emitted JavaScript.

   | <code>--inlineSources</code>
   | `boolean`

   | `false`

 |
Include source code in the sourcemaps inside the emitted JavaScript.

   | <code>--isolatedDeclarations</code>
   | `boolean`

   | `false`

 |
Require sufficient annotation on exports so other tools can trivially generate declaration files.

   | <code>--isolatedModules</code>
   | `boolean`

   | `true` if `verbatimModuleSyntax`; `false` otherwise.

 |
Ensure that each file can be safely transpiled without relying on other imports.

   | <code>--jsx</code>
   | `preserve`, `react`, `react-native`, `react-jsx`, or `react-jsxdev`

   |

 |
Specify what JSX code is generated.

   | <code>--jsxFactory</code>
   | `string`

   | `React.createElement`

 |
Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'.

   | <code>--jsxFragmentFactory</code>
   | `string`

   | `React.Fragment`

 |
Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'.

   | <code>--jsxImportSource</code>
   | `string`

   | `react`

 |
Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.

   | <code>--keyofStringsOnly</code>
   | `boolean`

   | `false`

 |
Make keyof only return strings instead of string, numbers or symbols. Legacy option.

   | <code>--lib</code>
   | `list`

   |

 |
Specify a set of bundled library declaration files that describe the target runtime environment.

   | <code>--libReplacement</code>
   | `boolean`

   | `false`

 |
Enable substitution of default `lib` files with custom ones.

   | <code>--listEmittedFiles</code>
   | `boolean`

   | `false`

 |
Print the names of emitted files after a compilation.

   | <code>--listFiles</code>
   | `boolean`

   | `false`

 |
Print all of the files read during the compilation.

   | <code>--mapRoot</code>
   | `string`

   |

 |
Specify the location where debugger should locate map files instead of generated locations.

   | <code>--maxNodeModuleJsDepth</code>
   | `number`

   | `0`

 |
Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`.

   | <code>--module</code>
   | `none`, `commonjs`, `amd`, `umd`, `system`, `es6`/`es2015`, `es2020`, `es2022`, `esnext`, `node16`, `node18`, `node20`, `nodenext`, or `preserve`

   | `CommonJS` if `target` is `ES5`; `ES6`/`ES2015` otherwise.

 |
Specify what module code is generated.

   | <code>--moduleDetection</code>
   | `legacy`, `auto`, or `force`

   | "auto": Treat files with imports, exports, import.meta, jsx (with jsx: react-jsx), or esm format (with module: node16+) as modules.

 |
Specify what method is used to detect whether a file is a script or a module.

   | <code>--moduleResolution</code>
   | `classic`, `node10`/`node`, `node16`, `nodenext`, or `bundler`

   | `Node10` if `module` is `CommonJS`; `Node16` if `module` is `Node16`, `Node18`, or `Node20`; `NodeNext` if `module` is `NodeNext`; `Bundler` if `module` is `Preserve`; `Classic` otherwise.

 |
Specify how TypeScript looks up a file from a given module specifier.

   | <code>--moduleSuffixes</code>
   | `list`

   |

 |
List of file name suffixes to search when resolving a module.

   | <code>--newLine</code>
   | `crlf` or `lf`

   | `lf`

 |
Set the newline character for emitting files.

   | <code>--noCheck</code>
   | `boolean`

   | `false`

 |
Disable full type checking (only critical parse and emit errors will be reported).

   | <code>--noEmit</code>
   | `boolean`

   | `false`

 |
Disable emitting files from a compilation.

   | <code>--noEmitHelpers</code>
   | `boolean`

   | `false`

 |
Disable generating custom helper functions like `__extends` in compiled output.

   | <code>--noEmitOnError</code>
   | `boolean`

   | `false`

 |
Disable emitting files if any type checking errors are reported.

   | <code>--noErrorTruncation</code>
   | `boolean`

   | `false`

 |
Disable truncating types in error messages.

   | <code>--noFallthroughCasesInSwitch</code>
   | `boolean`

   | `false`

 |
Enable error reporting for fallthrough cases in switch statements.

   | <code>--noImplicitAny</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Enable error reporting for expressions and declarations with an implied `any` type.

   | <code>--noImplicitOverride</code>
   | `boolean`

   | `false`

 |
Ensure overriding members in derived classes are marked with an override modifier.

   | <code>--noImplicitReturns</code>
   | `boolean`

   | `false`

 |
Enable error reporting for codepaths that do not explicitly return in a function.

   | <code>--noImplicitThis</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Enable error reporting when `this` is given the type `any`.

   | <code>--noImplicitUseStrict</code>
   | `boolean`

   | `false`

 |
Disable adding 'use strict' directives in emitted JavaScript files.

   | <code>--noLib</code>
   | `boolean`

   | `false`

 |
Disable including any library files, including the default lib.d.ts.

   | <code>--noPropertyAccessFromIndexSignature</code>
   | `boolean`

   | `false`

 |
Enforces using indexed accessors for keys declared using an indexed type.

   | <code>--noResolve</code>
   | `boolean`

   | `false`

 |
Disallow `import`s, `require`s or `&#x3C;reference>`s from expanding the number of files TypeScript should add to a project.

   | <code>--noStrictGenericChecks</code>
   | `boolean`

   | `false`

 |
Disable strict checking of generic signatures in function types.

   | <code>--noUncheckedIndexedAccess</code>
   | `boolean`

   | `false`

 |
Add `undefined` to a type when accessed using an index.

   | <code>--noUncheckedSideEffectImports</code>
   | `boolean`

   | `true`

 |
Check side effect imports.

   | <code>--noUnusedLocals</code>
   | `boolean`

   | `false`

 |
Enable error reporting when local variables aren't read.

   | <code>--noUnusedParameters</code>
   | `boolean`

   | `false`

 |
Raise an error when a function parameter isn't read.

   | <code>--out</code>
   | `string`

   |
