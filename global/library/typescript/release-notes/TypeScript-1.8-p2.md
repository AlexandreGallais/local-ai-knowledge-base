---
title: "TypeScript 1.8 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 1.8.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 1.8 (part 2 of 2)

## Prettier error messages from `tsc`

We understand that a ton of monochrome output can be a little difficult on the eyes.
Colors can help discern where a message starts and ends, and these visual clues are important when error output gets overwhelming.

By just passing the `pretty` command line option, TypeScript gives a more colorful output with context about where things are going wrong.

## Colorization of JSX code in VS 2015

With TypeScript 1.8, JSX tags are now classified and colorized in Visual Studio 2015.

The classification can be further customized by changing the font and color settings for the `VB XML` color and font settings through `Tools`->`Options`->`Environment`->`Fonts and Colors` page.

## The `--project` (`-p`) flag can now take any file path

The `--project` command line option originally could only take paths to a folder containing a `tsconfig.json`.
Given the different scenarios for build configurations, it made sense to allow `--project` to point to any other compatible JSON file.
For instance, a user might want to target ES2015 with CommonJS modules for Node 5, but ES5 with AMD modules for the browser.
With this new work, users can easily manage two separate build targets using `tsc` alone without having to perform hacky workarounds like placing `tsconfig.json` files in separate directories.

The old behavior still remains the same if given a directory - the compiler will try to find a file in the directory named `tsconfig.json`.

## Allow comments in tsconfig.json

It's always nice to be able to document your configuration!
`tsconfig.json` now accepts single and multi-line comments.

```json
{
  "compilerOptions": {
    "target": "ES2015", // running on node v5, yaay!
    "sourceMap": true // makes debugging easier
  },
  /*
   * Excluded files
   */
  "exclude": ["file.d.ts"]
}
```

## Support output to IPC-driven files

TypeScript 1.8 allows users to use the `outFile` argument with special file system entities like named pipes, devices, etc.

As an example, on many Unix-like systems, the standard output stream is accessible by the file `/dev/stdout`.

```shell
tsc foo.ts --outFile /dev/stdout
```

This can be used to pipe output between commands as well.

As an example, we can pipe our emitted JavaScript into a pretty printer like pretty-js:

```shell
tsc foo.ts --outFile /dev/stdout | pretty-js
```

## Improved support for `tsconfig.json` in Visual Studio 2015

TypeScript 1.8 allows `tsconfig.json` files in all project types.
This includes ASP.NET v4 projects, _Console Application_, and the _Html Application with TypeScript_ project types.
Further, you are no longer limited to a single `tsconfig.json` file but can add multiple, and each will be built as part of the project.
This allows you to separate the configuration for different parts of your application without having to use multiple different projects.

We also disable the project properties page when you add a `tsconfig.json` file.
This means that all configuration changes have to be made in the `tsconfig.json` file itself.

### A couple of limitations

- If you add a `tsconfig.json` file, TypeScript files that are not considered part of that context are not compiled.
- Apache Cordova Apps still have the existing limitation of a single `tsconfig.json` file, which must be in either the root or the `scripts` folder.
- There is no template for `tsconfig.json` in most project types.
