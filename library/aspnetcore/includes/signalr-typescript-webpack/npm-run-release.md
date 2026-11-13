---
title: "npm-run-release"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/signalr-typescript-webpack/npm-run-release.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# npm-run-release

```console
npm run release
```

This command generates the client-side assets to be served when running the app. The assets are placed in the `wwwroot` folder.

Webpack completed the following tasks:

* Purged the contents of the `wwwroot` directory.
* Converted the TypeScript to JavaScript in a process known as *transpilation*.
* Mangled the generated JavaScript to reduce file size in a process known as *minification*.
* Copied the processed JavaScript, CSS, and HTML files from `src` to the `wwwroot` directory.
* Injected the following elements into the `wwwroot/index.html` file:
  * A `<link>` tag, referencing the `wwwroot/main.<hash>.css` file. This tag is placed immediately before the closing `</head>` tag.
  * A `<script>` tag, referencing the minified `wwwroot/main.<hash>.js` file. This tag is placed immediately after the closing `</title>` tag.
