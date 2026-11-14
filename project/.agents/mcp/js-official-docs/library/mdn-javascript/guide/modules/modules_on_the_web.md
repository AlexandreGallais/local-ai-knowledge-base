---
title: "Using modules on the web (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_on_the_web/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using modules on the web

This page discusses how JavaScript modules are integrated with the web platform. Features discussed here are defined in the HTML spec and other web specifications, instead of by the core language, and they are generally only relevant to webpages. If you are writing modules for other environments, you may want to read the JavaScript modules and Modules across platforms guides instead.

## Server configuration

The first difference you will encounter when migrating web pages to modules is that you can no longer view your HTML using the `file://` protocol. Serve the directory containing your HTML and modules through a local HTTP server, then open the page using the server's URL, such as `http://localhost:8000/`.

The reason for this is that module requests use CORS, and `file://` URLs are never same-origin. When importing from another origin, that server must allow your page's origin through its CORS response headers, such as `Access-Control-Allow-Origin`. By default, cross-origin module requests are sent without credentials such as cookies. Setting the `crossorigin="use-credentials"` attribute on the `<script>` element sends credentials, provided the server's CORS headers allow it (this applies to the whole graph fetched through that script).

The server must send JavaScript modules with a JavaScript MIME type, such as `Content-Type: text/javascript`. Check this for both `.js` and `.mjs` files. If an import fails with a MIME type error, inspect the response in your browser's network tools: a missing file or an HTML fallback page may have been returned instead of the module.

## Applying modules to your HTML

To declare a script is a module in the `<script>` element, you need to include `type="module"`. For example, to import the `main.js` script, we use this:

```html
<script type="module" src="main.js"></script>
```

Only the entry point needs a `<script type="module">` element: any modules it imports are loaded as modules automatically, so you don't need to add a `<script>` element just to declare something as a module.

You can also embed the module's script directly into the HTML file by placing the JavaScript code within the body of the `<script>` element:

```html
<script type="module">
  /* JavaScript module code here */
</script>
```

You should generally define all your modules in separate files. Modules declared inline in HTML can only import other modules, but anything they export will not be accessible by other modules (because they don't have a URL).

You can only use `import` and `export` statements inside modules, not regular scripts. An error will be thrown if your `<script>` element doesn't have the `type="module"` attribute and attempts to import other modules. For example:

```html
<script>
  import mod from "./mod.js"; // SyntaxError: import declarations may only appear at top level of a module
  // ...
</script>
<script src="a-module-using-import-statements.js"></script>
<!-- SyntaxError: import declarations may only appear at top level of a module -->
```

Subresource integrity via the `integrity` attribute also works for module scripts, but the attribute only covers the entry module. Integrity metadata for its dependencies can be provided through an import map's `integrity` key.

> **Note:**
> Modules and their dependencies can be preloaded by specifying them in `<link>` elements with `rel="modulepreload"`.
> This can significantly reduce load time when the modules are used.

If you are already familiar with traditional `<script>` elements, here are some more behavior differences to look out for:

- Within the same environment, a module is only executed once, even if it has been imported multiple times or referenced in multiple `<script>` tags.
- There is no need to use the `defer` attribute (see `<script>` attributes) when loading a module script; module scripts declared in the document without `async` are deferred automatically.
- Adding the `async` attribute makes the module graph evaluate as soon as it has finished loading, without waiting for HTML parsing to complete and without any ordering guarantee relative to other scripts. Unlike for classic scripts, `async` works on inline module scripts too.

## Modules in workers

Documents aren't the only place where modules run: workers can be modules too. You need to opt into modules by passing `type: "module"` to the `Worker()` or `SharedWorker()` constructor, or to `navigator.serviceWorker.register()`:

```js
const worker = new Worker("./worker.js", { type: "module" });
```

The worker's file becomes the entry point of its own module graph.

You can only use `import` declarations or `import()` to import other modules inside a module worker. Calling `importScripts()` throws a `TypeError`. Note that dynamic `import()` is not available in service workers, so all of a module service worker's code must be reachable through static imports. Worklets load their code with `addModule()`, which is always a module.

## Module specifiers on the web

Module specifiers are the strings coming after the `from` keyword:

```js
import { name } from "./module.js";
```

In the Modules guide we already said that the module specifier format is runtime-dependent. Let's look at how they work in browsers.

First of all, everything on the web is URL-based. Each module has its URL, so you can import a module by its absolute URL directly:

```js
import { name } from "https://example.com/js/modules/module.js";
```

The browser sends an HTTP request to that given URL, and if the server returns a successful response with `Content-Type: text/javascript`, then the module loading process continues.

> **Note:**
> There's a popular belief that "ESM requires file extensions in module specifiers". This is true and false. The JavaScript runtime does not _add_ an extension for you. If you write `import { name } from "https://example.com/modules/module";`, the browser still sends a request to the URL, without the `.js` extension. If that request succeeds with JavaScript content, the module is still loaded as usual. The only problem is that servers usually interpret extension-less requests to be requests for HTML files, so you almost always need extra configuration to get it serve a JavaScript file for that.

Other URL schemes that you can use as resource locations are supported too, such as `data:`. Read the `import` reference for more information.

Always importing from absolute URLs has the same problems as using absolute URLs for link targets: they are long, they don't work if you move your site to another domain, and they don't work if you move your entire JavaScript asset path. The module specifier can also be a relative URL, similar to the `href` attribute of `` elements. The only difference is that all relative URLs must start with one of `/`, `./`, or `../`—i.e., you cannot use "bare" relative URLs like `modules/module.js`, but must write `./modules/module.js`. This restriction reserves bare specifiers so they can be given special meaning—the ecosystem convention, popularized by Node.js, was that a bare name like `"jquery"` refers to a package. On the web, that special meaning is now assigned by import maps. A bare specifier not remapped by an import map throws a `TypeError`.

The URL in the module specifier is resolved relative to the URL of the current module, not the URL of the HTML document. For example, within a module at `https://example.com/js/main.js`, to import `https://example.com/js/modules/module.js`, write:

```js
import { name } from "./modules/module.js";
```
