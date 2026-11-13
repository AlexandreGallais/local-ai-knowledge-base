---
title: "Migrating from JavaScript (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/tutorials/Migrating from JavaScript.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Migrating from JavaScript

TypeScript doesn't exist in a vacuum.
It was built with the JavaScript ecosystem in mind, and a lot of JavaScript exists today.
Converting a JavaScript codebase over to TypeScript is, while somewhat tedious, usually not challenging.
In this tutorial, we're going to look at how you might start out.
We assume you've read enough of the handbook to write new TypeScript code.

If you're looking to convert a React project, we recommend looking at the React Conversion Guide first.

## Setting up your Directories

If you're writing in plain JavaScript, it's likely that you're running your JavaScript directly,
where your `.js` files are in a `src`, `lib`, or `dist` directory, and then run as desired.

If that's the case, the files that you've written are going to be used as inputs to TypeScript, and you'll run the outputs it produces.
During our JS to TS migration, we'll need to separate our input files to prevent TypeScript from overwriting them.
If your output files need to reside in a specific directory, then that will be your output directory.

You might also be running some intermediate steps on your JavaScript, such as bundling or using another transpiler like Babel.
In this case, you might already have a folder structure like this set up.

From this point on, we're going to assume that your directory is set up something like this:

```
projectRoot
├── src
│   ├── file1.js
│   └── file2.js
├── built
└── tsconfig.json
```

If you have a `tests` folder outside of your `src` directory, you might have one `tsconfig.json` in `src`, and one in `tests` as well.

## Writing a Configuration File

TypeScript uses a file called `tsconfig.json` for managing your project's options, such as which files you want to include, and what sorts of checking you want to perform.
Let's create a bare-bones one for our project:

```json
{
  "compilerOptions": {
    "outDir": "./built",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

Here we're specifying a few things to TypeScript:

1. Read in any files it understands in the `src` directory (with `include`).
2. Accept JavaScript files as inputs (with `allowJs`).
3. Emit all of the output files in `built` (with `outDir`).
4. Translate newer JavaScript constructs down to an older version like ECMAScript 5 (using `target`).

At this point, if you try running `tsc` at the root of your project, you should see output files in the `built` directory.
The layout of files in `built` should look identical to the layout of `src`.
You should now have TypeScript working with your project.

## Early Benefits

Even at this point you can get some great benefits from TypeScript understanding your project.
If you open up an editor like VS Code or Visual Studio, you'll see that you can often get some tooling support like completion.
You can also catch certain bugs with options like:

- `noImplicitReturns` which prevents you from forgetting to return at the end of a function.
- `noFallthroughCasesInSwitch` which is helpful if you never want to forget a `break` statement between `case`s in a `switch` block.

TypeScript will also warn about unreachable code and labels, which you can disable with `allowUnreachableCode` and `allowUnusedLabels` respectively.

## Integrating with Build Tools

You might have some more build steps in your pipeline.
Perhaps you concatenate something to each of your files.
Each build tool is different, but we'll do our best to cover the gist of things.

### Gulp

If you're using Gulp in some fashion, we have a tutorial on using Gulp with TypeScript, and integrating with common build tools like Browserify, Babelify, and Uglify.
You can read more there.

### Webpack

Webpack integration is pretty simple.
You can use `ts-loader`, a TypeScript loader, combined with `source-map-loader` for easier debugging.
Simply run

```shell
npm install ts-loader source-map-loader
```

and merge in options from the following into your `webpack.config.js` file:

```js
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" },
    ],
  },

  // Other options...
};
```

It's important to note that ts-loader will need to run before any other loader that deals with `.js` files.

You can see an example of using Webpack in our tutorial on React and Webpack.
