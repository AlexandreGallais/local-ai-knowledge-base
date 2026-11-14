---
title: "Compiler Options in MSBuild"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/project-config/Compiler Options in MSBuild.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Compiler Options in MSBuild

## Overview

When you have an MSBuild based project which utilizes TypeScript such as an ASP.NET Core project, you can configure TypeScript in two ways. Either via a `tsconfig.json` or via the project settings.

## Using a `tsconfig.json`

We recommend using a `tsconfig.json` for your project when possible. To add one to an existing project, add a new item to your project which is called a "TypeScript JSON Configuration File" in modern versions of Visual Studio.

The new `tsconfig.json` will then be used as the source of truth for TypeScript-specific build information like files and configuration. You can learn about how TSConfigs works here and there is a comprehensive reference here.

## Using Project Settings

You can also define the configuration for TypeScript inside you project's settings. This is done by editing the XML in your `.csproj` to define `PropertyGroups` which describe how the build can work:

```xml
<PropertyGroup>
  <TypeScriptNoEmitOnError>true</TypeScriptNoEmitOnError>
  <TypeScriptNoImplicitReturns>true</TypeScriptNoImplicitReturns>
</PropertyGroup>
```

There is a series of mappings for common TypeScript settings, these are settings which map directly to TypeScript cli options and are used to help you write a more understandable project file. You can use the TSConfig reference to get more information on what values and defaults are for each mapping.

<h3>CLI Mappings</h3>

     | MSBuild Config Name
     | TSC Flag

 | `&#x3C;TypeScriptAllowJS&#x3E;`
 | <code>--allowJs</code>

 |
Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files.

 | `&#x3C;TypeScriptRemoveComments&#x3E;`
 | <code>--removeComments</code>

 |
Disable emitting comments.

 | `&#x3C;TypeScriptNoImplicitAny&#x3E;`
 | <code>--noImplicitAny</code>

 |
Enable error reporting for expressions and declarations with an implied `any` type..

 | `&#x3C;TypeScriptGeneratesDeclarations&#x3E;`
 | <code>--declaration</code>

 |
Generate .d.ts files from TypeScript and JavaScript files in your project.

 | `&#x3C;TypeScriptModuleKind&#x3E;`
 | <code>--module</code>

 |
Specify what module code is generated.

 | `&#x3C;TypeScriptJSXEmit&#x3E;`
 | <code>--jsx</code>

 |
Specify what JSX code is generated.

 | `&#x3C;TypeScriptOutDir&#x3E;`
 | <code>--outDir</code>

 |
Specify an output folder for all emitted files.

 | `&#x3C;TypeScriptSourceMap&#x3E;`
 | <code>--sourcemap</code>

 |
Create source map files for emitted JavaScript files.

 | `&#x3C;TypeScriptTarget&#x3E;`
 | <code>--target</code>

 |
Set the JavaScript language version for emitted JavaScript and include compatible library declarations.

 | `&#x3C;TypeScriptNoResolve&#x3E;`
 | <code>--noResolve</code>

 |
Disallow `import`s, `require`s or `&#x3C;reference>`s from expanding the number of files TypeScript should add to a project.

 | `&#x3C;TypeScriptMapRoot&#x3E;`
 | <code>--mapRoot</code>

 |
Specify the location where debugger should locate map files instead of generated locations.

 | `&#x3C;TypeScriptSourceRoot&#x3E;`
 | <code>--sourceRoot</code>

 |
Specify the root path for debuggers to find the reference source code.

 | `&#x3C;TypeScriptCharset&#x3E;`
 | <code>--charset</code>

 |
No longer supported. In early versions, manually set the text encoding for reading files.

 | `&#x3C;TypeScriptEmitBOM&#x3E;`
 | <code>--emitBOM</code>

 |
Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.

 | `&#x3C;TypeScriptNoLib&#x3E;`
 | <code>--noLib</code>

 |
Disable including any library files, including the default lib.d.ts.

 | `&#x3C;TypeScriptPreserveConstEnums&#x3E;`
 | <code>--preserveConstEnums</code>

 |
Disable erasing `const enum` declarations in generated code.

 | `&#x3C;TypeScriptSuppressImplicitAnyIndexErrors&#x3E;`
 | <code>--suppressImplicitAnyIndexErrors</code>

 |
Suppress `noImplicitAny` errors when indexing objects that lack index signatures.

 | `&#x3C;TypeScriptNoEmitHelpers&#x3E;`
 | <code>--noEmitHelpers</code>

 |
Disable generating custom helper functions like `__extends` in compiled output.

 | `&#x3C;TypeScriptInlineSourceMap&#x3E;`
 | <code>--inlineSourceMap</code>

 |
Include sourcemap files inside the emitted JavaScript.

 | `&#x3C;TypeScriptInlineSources&#x3E;`
 | <code>--inlineSources</code>

 |
Include source code in the sourcemaps inside the emitted JavaScript.

 | `&#x3C;TypeScriptNewLine&#x3E;`
 | <code>--newLine</code>

 |
Set the newline character for emitting files.

 | `&#x3C;TypeScriptIsolatedModules&#x3E;`
 | <code>--isolatedModules</code>

 |
Ensure that each file can be safely transpiled without relying on other imports.

 | `&#x3C;TypeScriptEmitDecoratorMetadata&#x3E;`
 | <code>--emitDecoratorMetadata</code>

 |
Emit design-type metadata for decorated declarations in source files.

 | `&#x3C;TypeScriptRootDir&#x3E;`
 | <code>--rootDir</code>

 |
Specify the root folder within your source files.

 | `&#x3C;TypeScriptExperimentalDecorators&#x3E;`
 | <code>--experimentalDecorators</code>

 |
Enable experimental support for TC39 stage 2 draft decorators.

 | `&#x3C;TypeScriptModuleResolution&#x3E;`
 | <code>--moduleResolution</code>

 |
Specify how TypeScript looks up a file from a given module specifier.

 | `&#x3C;TypeScriptSuppressExcessPropertyErrors&#x3E;`
 | <code>--suppressExcessPropertyErrors</code>

 |
Disable reporting of excess property errors during the creation of object literals.

 | `&#x3C;TypeScriptReactNamespace&#x3E;`
 | <code>--reactNamespace</code>

 |
Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit.

 | `&#x3C;TypeScriptSkipDefaultLibCheck&#x3E;`
 | <code>--skipDefaultLibCheck</code>

 |
Skip type checking .d.ts files that are included with TypeScript.

 | `&#x3C;TypeScriptAllowUnusedLabels&#x3E;`
 | <code>--allowUnusedLabels</code>

 |
Disable error reporting for unused labels.

 | `&#x3C;TypeScriptNoImplicitReturns&#x3E;`
 | <code>--noImplicitReturns</code>

 |
Enable error reporting for codepaths that do not explicitly return in a function.

 | `&#x3C;TypeScriptNoFallthroughCasesInSwitch&#x3E;`
 | <code>--noFallthroughCasesInSwitch</code>

 |
Enable error reporting for fallthrough cases in switch statements.

 | `&#x3C;TypeScriptAllowUnreachableCode&#x3E;`
 | <code>--allowUnreachableCode</code>

 |
Disable error reporting for unreachable code.

 | `&#x3C;TypeScriptForceConsistentCasingInFileNames&#x3E;`
 | <code>--forceConsistentCasingInFileNames</code>

 |
Ensure that casing is correct in imports.

 | `&#x3C;TypeScriptAllowSyntheticDefaultImports&#x3E;`
 | <code>--allowSyntheticDefaultImports</code>

 |
Allow 'import x from y' when a module doesn't have a default export.

 | `&#x3C;TypeScriptNoImplicitUseStrict&#x3E;`
 | <code>--noImplicitUseStrict</code>

 |
Disable adding 'use strict' directives in emitted JavaScript files.

 | `&#x3C;TypeScriptLib&#x3E;`
 | <code>--lib</code>

 |
Specify a set of bundled library declaration files that describe the target runtime environment.

 | `&#x3C;TypeScriptBaseUrl&#x3E;`
 | <code>--baseUrl</code>

 |
Specify the base directory to resolve bare specifier module names.

 | `&#x3C;TypeScriptDeclarationDir&#x3E;`
 | <code>--declarationDir</code>

 |
Specify the output directory for generated declaration files.

 | `&#x3C;TypeScriptNoImplicitThis&#x3E;`
 | <code>--noImplicitThis</code>

 |
Enable error reporting when `this` is given the type `any`.

 | `&#x3C;TypeScriptSkipLibCheck&#x3E;`
 | <code>--skipLibCheck</code>

 |
Skip type checking all .d.ts files.

 | `&#x3C;TypeScriptStrictNullChecks&#x3E;`
 | <code>--strictNullChecks</code>

 |
When type checking, take into account `null` and `undefined`.

 | `&#x3C;TypeScriptNoUnusedLocals&#x3E;`
 | <code>--noUnusedLocals</code>

 |
Enable error reporting when a local variables aren't read.

 | `&#x3C;TypeScriptNoUnusedParameters&#x3E;`
 | <code>--noUnusedParameters</code>

 |
Raise an error when a function parameter isn't read

 | `&#x3C;TypeScriptAlwaysStrict&#x3E;`
 | <code>--alwaysStrict</code>

 |
Ensure 'use strict' is always emitted.

 | `&#x3C;TypeScriptImportHelpers&#x3E;`
 | <code>--importHelpers</code>

 |
Allow importing helper functions from tslib once per project, instead of including them per-file.

 | `&#x3C;TypeScriptJSXFactory&#x3E;`
 | <code>--jsxFactory</code>

 |
Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'

 | `&#x3C;TypeScriptStripInternal&#x3E;`
 | <code>--stripInternal</code>

 |
Disable emitting declarations that have `@internal` in their JSDoc comments.

 | `&#x3C;TypeScriptCheckJs&#x3E;`
 | <code>--checkJs</code>

 |
Enable error reporting in type-checked JavaScript files.

 | `&#x3C;TypeScriptDownlevelIteration&#x3E;`
 | <code>--downlevelIteration</code>

 |
Emit more compliant, but verbose and less performant JavaScript for iteration.

 | `&#x3C;TypeScriptStrict&#x3E;`
 | <code>--strict</code>

 |
Enable all strict type checking options.

 | `&#x3C;TypeScriptNoStrictGenericChecks&#x3E;`
 | <code>--noStrictGenericChecks</code>

 |
Disable strict checking of generic signatures in function types.

 | `&#x3C;TypeScriptPreserveSymlinks&#x3E;`
 | <code>--preserveSymlinks</code>

 |
Disable resolving symlinks to their realpath. This correlates to the same flag in node.

 | `&#x3C;TypeScriptStrictFunctionTypes&#x3E;`
 | <code>--strictFunctionTypes</code>

 |
When assigning functions, check to ensure parameters and the return values are subtype-compatible.

 | `&#x3C;TypeScriptStrictPropertyInitialization&#x3E;`
 | <code>--strictPropertyInitialization</code>

 |
Check for class properties that are declared but not set in the constructor.

 | `&#x3C;TypeScriptESModuleInterop&#x3E;`
 | <code>--esModuleInterop</code>

 |
Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility.

 | `&#x3C;TypeScriptEmitDeclarationOnly&#x3E;`
 | <code>--emitDeclarationOnly</code>

 |
Only output d.ts files and not JavaScript files.

 | `&#x3C;TypeScriptKeyofStringsOnly&#x3E;`
 | <code>--keyofStringsOnly</code>

 |
Make keyof only return strings instead of string, numbers or symbols. Legacy option.

 | `&#x3C;TypeScriptUseDefineForClassFields&#x3E;`
 | <code>--useDefineForClassFields</code>

 |
Emit ECMAScript-standard-compliant class fields.

 | `&#x3C;TypeScriptDeclarationMap&#x3E;`
 | <code>--declarationMap</code>

 |
Create sourcemaps for d.ts files.

 | `&#x3C;TypeScriptResolveJsonModule&#x3E;`
 | <code>--resolveJsonModule</code>

 |
Enable importing .json files

 | `&#x3C;TypeScriptStrictBindCallApply&#x3E;`
 | <code>--strictBindCallApply</code>

 |
Check that the arguments for `bind`, `call`, and `apply` methods match the original function.

 | `&#x3C;TypeScriptNoEmitOnError&#x3E;`
 | <code>--noEmitOnError</code>

 |
Disable emitting files if any type checking errors are reported.

### Additional Flags

Because the MSBuild system passes arguments directly to the TypeScript CLI, you can use the option `TypeScriptAdditionalFlags` to provide specific flags which don't have a mapping above.

For example, this would turn on `noPropertyAccessFromIndexSignature`:

```xml
<TypeScriptAdditionalFlags> $(TypeScriptAdditionalFlags) --noPropertyAccessFromIndexSignature</TypeScriptAdditionalFlags>
```

### Debug and Release Builds

You can use PropertyGroup conditions to define different sets of configurations. For example, a common task is stripping comments and sourcemaps in production. In this example, we define a debug and release property group which have different TypeScript configurations:

```xml
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
  <TypeScriptRemoveComments>false</TypeScriptRemoveComments>
  <TypeScriptSourceMap>true</TypeScriptSourceMap>
</PropertyGroup>

<PropertyGroup Condition="'$(Configuration)' == 'Release'">
  <TypeScriptRemoveComments>true</TypeScriptRemoveComments>
  <TypeScriptSourceMap>false</TypeScriptSourceMap>
</PropertyGroup>

<Import
    Project="$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets"
    Condition="Exists('$(MSBuildExtensionsPath32)\Microsoft\VisualStudio\v$(VisualStudioVersion)\TypeScript\Microsoft.TypeScript.targets')" />
```

### ToolsVersion

The value of `<TypeScriptToolsVersion>1.7</TypeScriptToolsVersion>` property in the project file identifies the compiler version to use to build (1.7 in this example).
This allows a project to build against the same versions of the compiler on different machines.

If `TypeScriptToolsVersion` is not specified, the latest compiler version installed on the machine will be used to build.

Users using newer versions of TS, will see a prompt to upgrade their project on first load.

### TypeScriptCompileBlocked

If you are using a different build tool to build your project (e.g. gulp, grunt , etc.) and VS for the development and debugging experience, set `<TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>` in your project.
This should give you all the editing support, but not the build when you hit F5.

### TypeScriptEnableIncrementalMSBuild (TypeScript 4.2 Beta and later)

By default, MSBuild will attempt to only run the TypeScript compiler when the project's source files have been updated since the last compilation.
However, if this behavior is causing issues, such as when TypeScript's `incremental` option is enabled, set `<TypeScriptEnableIncrementalMSBuild>false</TypeScriptEnableIncrementalMSBuild>` to ensure the TypeScript compiler is invoked with every run of MSBuild.
