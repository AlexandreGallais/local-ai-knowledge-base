---
title: "`rel=\"modulepreload\"` HTML attribute value"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/modulepreload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel="modulepreload"` HTML attribute value

The **`modulepreload`** keyword, for the `rel` attribute of the `<link>` element, provides a declarative way to preemptively fetch a module script, parse and compile it, and store it in the document's module map for later execution.

Preloading allows modules and their dependencies to be downloaded early, and can also significantly reduce the overall download and processing time.
This is because it allows pages to fetch modules in parallel, instead of sequentially as each module is processed and its dependencies are discovered.
Note however that you can't just preload everything!
What you choose to preload must be balanced against other operations that might then be starved, adversely affecting user experience.

Links with `rel="modulepreload"` are similar to those with `rel="preload"`.
The main difference is that `preload` just downloads the file and stores it in the cache, while `modulepreload` gets the module, parses and compiles it, and puts the results into the module map so that it is ready to execute.

When using `modulepreload` the fetch request mode is always `cors`, and the `crossorigin` property is used to determine the request credential mode.
If `crossorigin` is set to `anonymous` or `""` (default), then the credentials mode is `same-origin`, and user credentials such as cookies and authentication are only sent for requests with the `same-origin`.
If `crossorigin` is set to `use-credentials` then the credentials mode is `include`, and user credentials for both single- and cross-origin requests.

The `as` attribute is optional for links with `rel="modulepreload"`, and defaults to `"script"`.
It can be set to `"script"`, `"style"`, `"json"`, `"text"`, or any script-like destination, such as `"audioworklet"`, `"paintworklet"`, `"serviceworker"`, `"sharedworker"`, or `"worker"`. The full set of allowed values is defined in the HTML spec's module preload destination mapping. For the list of script-like destinations, refer to the Fetch spec.
An `Event` named "error" is fired on the element if any other destination is used.

A browser _may_ additionally also choose to automatically fetch any dependencies of the module resource.
Note however that this is a browser-specific optimization — the only approach to ensure that all browsers will try to preload a module's dependencies is to individually specify them!
Further, the events named `load` or `error` fire immediately following success or failure of loading the _specified_ resources.
If dependencies are automatically fetched, no additional events are fired in the main thread (although you might monitor additional requests in a service worker or on the server).

## Examples

Consider the basic-modules example (live version), introduced in the JavaScript modules guide.

This has a file structure as shown below, consisting of the top level module `main.js`, which statically imports two dependency modules `modules/canvas.js` and `modules/square.js` using the `import` statement.

```plain
index.html
main.js
modules/
    canvas.js
    square.js
```

The HTML for the example below shows how `main.js` is fetched in a `<script>` element.
Only after `main.js` has loaded does the browser discover and fetch the two dependency modules.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Basic <example-value> module example</title>
    <script type="module" src="main.js"></script>
  </head>
  <body></body>
</html>
```

The HTML below updates the example to use `<link>` elements with `rel="modulepreload"` for the main file and each of the dependency modules.
This is much faster because the three modules all start downloading asynchronously and in parallel before they are needed.
By the time `main.js` has been parsed and its dependencies are known, they have already been fetched and downloaded.

```html
<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <title>Basic <example-value> module example</title>
    <link rel="modulepreload" href="main.js" />
    <link rel="modulepreload" href="modules/canvas.js" />
    <link rel="modulepreload" href="modules/square.js" />
    <script type="module" src="main.js"></script>
  </head>
  <body></body>
</html>
```

## See also

- Speculative loading for a comparison of `<link rel="modulepreload">` and other similar performance improvement features.
- Preloading modules on web.dev
