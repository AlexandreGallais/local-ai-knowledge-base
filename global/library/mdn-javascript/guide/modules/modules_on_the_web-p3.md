---
title: "Using modules on the web (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_on_the_web/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using modules on the web (part 3 of 3)

## Loading non-JavaScript resources

The Modules guide already introduces the import attributes syntax, which allows you to import non-JavaScript resources. The resource types specified by the core language are `type: "json"` and `type: "text"`.

```js
import colors from "./colors.json" with { type: "json" };
```

On the web, there is additionally `type: "css"`, which imports CSS files as `CSSStyleSheet` objects.

```js
import styles from "./styles.css" with { type: "css" };

document.adoptedStyleSheets = [styles];
```

While the core language spec does not say much about the `type` attribute in general (other than how `type: "json"` must result in a JSON module and `type: "text"` must result in a text module), the HTML spec requires browsers to implement strict module type checking for security reasons. If you specify `type: "json"` or `type: "css"`, the result must be served with the corresponding `Content-Type` (such as `application/json` or `text/css`). If you don't specify any type, the result also must be served as JavaScript or WebAssembly (`text/javascript` or `application/wasm`).

In the example above with `type: "css"`, if this file turns out to be JavaScript (it is served with a `Content-Type` of `text/javascript`), the import will fail. This makes sure that you don't accidentally execute code where you don't intend to. Read the import attribute reference for more information.

Other environments, including Node.js and Deno, often mimic web semantics, so they also require strict type matching.

On the web, the `type` attribute also changes the request's destination, so even with the same string specifier, you may end up with different module content.

```js
import code from "./module";
// This sends a request with Sec-Fetch-Dest: script
// The server may respond with JavaScript: `export default 1;`

import data from "./module" with { type: "json" };
// This sends a request with Sec-Fetch-Dest: json
// The server may respond with JSON: `{ "value": 1 }`

import styles from "./module" with { type: "css" };
// This sends a request with Sec-Fetch-Dest: style
// The server may respond with CSS: `.value { color: green; }`

import text from "./module" with { type: "text" };
// This sends a request with Sec-Fetch-Dest: text
// The server may respond with text: `Hello world!`
```

## Module caching

Module caching lets imports reuse a module and its state. On the web, the HTML specification defines which requests share a module.

In browsers, the module map uses the resolved request URL and the module type as its key. Different specifier strings can therefore identify the same module. For example, although the following two requests use different string specifiers, they point to the same module (assuming there's no import map that changes the resolution):

```js
// -- https://example.com/main.js --
import * as config1 from "./config.js";
import * as config2 from "https://example.com/config.js";

console.log(config1 === config2); // true
```

The module type, selected through import attributes, is also part of the key, so requesting a URL with `{ type: "json" }` does not reuse the entry for that URL without a `type` (which is implicitly JavaScript). Separate documents and workers have separate module maps, so importing a module in a page and in its worker does not share the module's variables between them.

Module caching is separate from HTTP caching. HTTP caching can reuse response bytes; module caching reuses the module's identity and state. A new document can evaluate a module again even if its source comes from the HTTP cache. Conversely, `Cache-Control: no-store` does not make an already evaluated module execute again on each import.

Browsers treat URLs with different query strings or fragments as different module identities, even if they retrieve identical source code:

```js
import * as config1 from "./config.js?version=1";
import * as config2 from "./config.js?version=2";

console.log(config1 === config2); // false
```

This creates two module instances from the same source code. Any further dependencies are still shared—if both instances import `"./logger.js"`, that specifier still resolves to the same URL from both, so they share `logger.js`.

For loading errors, the HTML specification requires failed fetches, including HTTP error responses, to be removed from the module map so a later import can retry. The HTTP cache may still supply a cached error response. Parse errors, however, are retained in the module map, so retrying the same module does not fetch corrected source.

## The import.meta object

The Modules guide also introduced the `import.meta` object and mentioned that _all_ of its properties are host-defined.

Use `import.meta.url` with the `URL()` constructor when a resource is located relative to your module:

```js
// -- modules/set-user.js --
const apiURL = new URL("../api/set-user", import.meta.url);

export async function setUser(name) {
  const response = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error(`Unable to set user: ${response.status}`);
  }
}
```

In a window, a relative URL passed directly to `fetch()`, such as `fetch("../api/set-user")`, is resolved against the document's base URL. It is not resolved relative to the JavaScript module containing the call. Constructing the URL explicitly makes the resource location independent of the page that imports the module.

To resolve a module specifier using the host's module resolution rules, use `import.meta.resolve()`. For example, in a browser with an import map that defines `"shapes"`, `import.meta.resolve("shapes")` returns its resolved URL. Unlike `import()`, this resolves the specifier without loading or evaluating the module.

## See also

- HTML `<script>` element
- `<script type="importmap">`
- JavaScript modules
