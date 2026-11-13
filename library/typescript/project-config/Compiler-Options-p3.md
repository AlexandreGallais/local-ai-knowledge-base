---
title: "tsc CLI Options (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/project-config/Compiler Options.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# tsc CLI Options (part 3 of 3)

|
Deprecated setting. Use `outFile` instead.

   | <code>--outDir</code>
   | `string`

   |

 |
Specify an output folder for all emitted files.

   | <code>--outFile</code>
   | `string`

   |

 |
Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output.

   | <code>--paths</code>
   | `object`

   |

 |
Specify a set of entries that re-map imports to additional lookup locations.

   | <code>--plugins</code>
   | `list`

   |

 |
Specify a list of language service plugins to include.

   | <code>--preserveConstEnums</code>
   | `boolean`

   | `true` if `isolatedModules`; `false` otherwise.

 |
Disable erasing `const enum` declarations in generated code.

   | <code>--preserveSymlinks</code>
   | `boolean`

   | `false`

 |
Disable resolving symlinks to their realpath. This correlates to the same flag in node.

   | <code>--preserveValueImports</code>
   | `boolean`

   | `false`

 |
Preserve unused imported values in the JavaScript output that would otherwise be removed.

   | <code>--preserveWatchOutput</code>
   | `boolean`

   | `false`

 |
Disable wiping the console in watch mode.

   | <code>--pretty</code>
   | `boolean`

   | `true`

 |
Enable color and formatting in TypeScript's output to make compiler errors easier to read.

   | <code>--reactNamespace</code>
   | `string`

   | `React`

 |
Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.

   | <code>--removeComments</code>
   | `boolean`

   | `false`

 |
Disable emitting comments.

   | <code>--resolveJsonModule</code>
   | `boolean`

   | `false`

 |
Enable importing .json files.

   | <code>--resolvePackageJsonExports</code>
   | `boolean`

   | `true` when `moduleResolution` is `node16`, `nodenext`, or `bundler`; otherwise `false`

 |
Use the package.json 'exports' field when resolving package imports.

   | <code>--resolvePackageJsonImports</code>
   | `boolean`

   | `true` when `moduleResolution` is `node16`, `nodenext`, or `bundler`; otherwise `false`

 |
Use the package.json 'imports' field when resolving imports.

   | <code>--rewriteRelativeImportExtensions</code>
   | `boolean`

   | `false`

 |
Rewrite `.ts`, `.tsx`, `.mts`, and `.cts` file extensions in relative import paths to their JavaScript equivalent in output files.

   | <code>--rootDir</code>
   | `string`

   | Computed from the list of input files.

 |
Specify the root folder within your source files.

   | <code>--rootDirs</code>
   | `list`

   | Computed from the list of input files.

 |
Allow multiple folders to be treated as one when resolving modules.

   | <code>--skipDefaultLibCheck</code>
   | `boolean`

   | `false`

 |
Skip type checking .d.ts files that are included with TypeScript.

   | <code>--skipLibCheck</code>
   | `boolean`

   | `false`

 |
Skip type checking all .d.ts files.

   | <code>--sourceMap</code>
   | `boolean`

   | `false`

 |
Create source map files for emitted JavaScript files.

   | <code>--sourceRoot</code>
   | `string`

   |

 |
Specify the root path for debuggers to find the reference source code.

   | <code>--stableTypeOrdering</code>
   | `boolean`

   | `false`

 |
Ensure types are ordered stably and deterministically across compilations.

   | <code>--stopBuildOnErrors</code>
   | `boolean`

   |

 |
Skip building downstream projects on error in upstream project.

   | <code>--strict</code>
   | `boolean`

   | `true`

 |
Enable all strict type-checking options.

   | <code>--strictBindCallApply</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Check that the arguments for `bind`, `call`, and `apply` methods match the original function.

   | <code>--strictBuiltinIteratorReturn</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Built-in iterators are instantiated with a TReturn type of undefined instead of any.

   | <code>--strictFunctionTypes</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
When assigning functions, check to ensure parameters and the return values are subtype-compatible.

   | <code>--strictNullChecks</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
When type checking, take into account `null` and `undefined`.

   | <code>--strictPropertyInitialization</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Check for class properties that are declared but not set in the constructor.

   | <code>--stripInternal</code>
   | `boolean`

   | `false`

 |
Disable emitting declarations that have `@internal` in their JSDoc comments.

   | <code>--suppressExcessPropertyErrors</code>
   | `boolean`

   | `false`

 |
Disable reporting of excess property errors during the creation of object literals.

   | <code>--suppressImplicitAnyIndexErrors</code>
   | `boolean`

   | `false`

 |
Suppress `noImplicitAny` errors when indexing objects that lack index signatures.

   | <code>--target</code>
   | `es3`, `es5`, `es6`/`es2015`, `es2016`, `es2017`, `es2018`, `es2019`, `es2020`, `es2021`, `es2022`, `es2023`, `es2024`, `es2025`, or `esnext`

   | `es2023` if `module` is `node20`; `esnext` if `module` is `nodenext`; `ES5` otherwise.

 |
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.

   | <code>--traceResolution</code>
   | `boolean`

   | `false`

 |
Log paths used during the `moduleResolution` process.

   | <code>--tsBuildInfoFile</code>
   | `string`

   | `.tsbuildinfo`

 |
The file to store `.tsbuildinfo` incremental build information in.

   | <code>--typeRoots</code>
   | `list`

   |

 |
Specify multiple folders that act like `./node_modules/@types`.

   | <code>--types</code>
   | `list`

   |

 |
Specify type package names to be included without being referenced in a source file.

   | <code>--useDefineForClassFields</code>
   | `boolean`

   | `true` if `target` is `ES2022` or higher, including `ESNext`; `false` otherwise.

 |
Emit ECMAScript-standard-compliant class fields.

   | <code>--useUnknownInCatchVariables</code>
   | `boolean`

   | `true` if `strict`; `false` otherwise.

 |
Default catch clause variables as `unknown` instead of `any`.

   | <code>--verbatimModuleSyntax</code>
   | `boolean`

   | `false`

 |
Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting.

## Related

- Every option is fully explained in the TSConfig Reference.
- Learn how to use a `tsconfig.json` file.
- Learn how to work in an MSBuild project.
