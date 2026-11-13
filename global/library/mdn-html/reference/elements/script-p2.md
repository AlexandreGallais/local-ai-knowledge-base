---
title: "`<script>` HTML script element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/script/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<script>` HTML script element (part 2 of 2)

## Examples

### Basic usage

This example shows how to import (an external) script using the `<script>` element:

```html
<script src="javascript.js"></script>
```

The following example shows how to put (an inline) script inside the `<script>` element:

```html
<script>
  alert("Hello World!");
</script>
```

### async and defer

Scripts loaded using the `async` attribute will download the script without blocking the page while the script is being fetched.
However, once the download is complete, the script will execute, which blocks the page from rendering. This means that the rest of the content on the web page is prevented from being processed and displayed to the user until the script finishes executing.
You get no guarantee that scripts will run in any specific order.
It is best to use `async` when the scripts in the page run independently from each other and depend on no other script on the page.

Scripts loaded with the `defer` attribute will load in the order they appear on the page.
They won't run until the page content has all loaded, which is useful if your scripts depend on the DOM being in place (e.g., they modify one or more elements on the page).

Here is a visual representation of the different script loading methods and what that means for your page:

_This image is from the HTML spec, copied and cropped to a reduced version, under CC BY 4.0 license terms._

For example, if you have the following script elements:

```html
<script async src="js/vendor/jquery.js"></script>
<script async src="js/script2.js"></script>
<script async src="js/script3.js"></script>
```

You can't rely on the order the scripts will load in.
`jquery.js` may load before or after `script2.js` and `script3.js` and if this is the case, any functions in those scripts depending on `jquery` will produce an error because `jquery` will not be defined at the time the script runs.

`async` should be used when you have a bunch of background scripts to load in, and you just want to get them in place as soon as possible.
For example, maybe you have some game data files to load, which will be needed when the game actually begins, but for now you just want to get on with showing the game intro, titles, and lobby, without them being blocked by script loading.

Scripts loaded using the `defer` attribute (see below) will run in the order they appear in the page and execute them as soon as the script and content are downloaded:

```html
<script defer src="js/vendor/jquery.js"></script>
<script defer src="js/script2.js"></script>
<script defer src="js/script3.js"></script>
```

In the second example, we can be sure that `jquery.js` will load before `script2.js` and `script3.js` and that `script2.js` will load before `script3.js`.
They won't run until the page content has all loaded, which is useful if your scripts depend on the DOM being in place (e.g., they modify one or more elements on the page).

To summarize:

- `async` and `defer` both instruct the browser to download the script(s) in a separate thread, while the rest of the page (the DOM, etc.) is downloading, so the page loading is not blocked during the fetch process.
- scripts with an `async` attribute will execute as soon as the download is complete.
  This blocks the page and does not guarantee any specific execution order.
- scripts with a `defer` attribute will load in the order they are in and will only execute once everything has finished loading.
- If your scripts should be run immediately and they don't have any dependencies, then use `async`.
- If your scripts need to wait for parsing and depend on other scripts and/or the DOM being in place, load them using `defer` and put their corresponding `<script>` elements in the order you want the browser to execute them.

### Module fallback

Browsers that support the `module` value for the `type` attribute ignore any script with a `nomodule` attribute. That enables you to use module scripts while providing `nomodule`-marked fallback scripts for non-supporting browsers.

```html
<script type="module" src="main.js"></script>
<script nomodule src="fallback.js"></script>
```

### Importing modules with importmap

When importing modules in scripts, if you don't use the `type=importmap` feature, then each module must be imported using a module specifier that is either an absolute or relative URL.
In the example below, the first module specifier is an absolute URL, while the second (`"./shapes/square.js"`) resolves relative to the base URL of the document.

```js
import { name as circleName } from "https://example.com/shapes/circle.js";
import { name as squareName, draw } from "./shapes/square.js";
```

An import map allows you to provide a mapping that, if matched, can replace the text in the module specifier.
The import map below defines keys `circle` and `square` that can be used as aliases for the module specifiers shown above.

```html
<script type="importmap">
  {
    "imports": {
      "circle": "https://example.com/shapes/circle.js",
      "square": "./shapes/square.js"
    }
  }
</script>
```

This allows us to import modules using names in the module specifier (rather than absolute or relative URLs).

```js
import { name as circleName } from "circle";
import { name as squareName, draw } from "square";
```

For more examples of what you can do with import maps, see the Importing modules using import maps section in the Using modules on the web guide.

### Embedding data in HTML

You can also use the `<script>` element to embed data in HTML with server-side rendering by specifying a valid non-JavaScript MIME type in the `type` attribute.

```html
<!-- Generated by the server -->
<script id="data" type="application/json">
  {
    "userId": 1234,
    "userName": "Maria Cruz",
    "memberSince": "2000-01-01T00:00:00.000Z"
  }
</script>

<!-- Static -->
<script>
  const userInfo = JSON.parse(document.getElementById("data").text);
  console.log("User information: %o", userInfo);
</script>
```

### Blocking rendering till a script is fetched and executed

You can include `render` token <example-value> a `blocking` attribute;
the rendering of the page will be blocked till the script is fetched and executed. In the example below, we block rendering on an async script,
so that the script doesn't block parsing but is guaranteed to be evaluated before rendering starts.

```html
<script blocking="render" async src="async-script.js"></script>
```

## Technical summary

       |
        Content categories

       |
        Metadata content,
        Flow content,
        Phrasing content.

       | Permitted content
       | Dynamic script such as `text/javascript`.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts metadata content,
        or any element that accepts phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLScriptElement`

## See also

- `document.currentScript`
- Flavio Copes' article on loading JavaScript efficiently and explaining the differences between `async` and `defer`
- JavaScript modules guide
