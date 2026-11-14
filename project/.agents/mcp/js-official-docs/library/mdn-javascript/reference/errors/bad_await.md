---
title: "SyntaxError: await is only valid in async functions, async generators and modules"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_await/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: await is only valid in async functions, async generators and modules

The JavaScript exception "await is only valid in async functions, async generators and modules" occurs when an `await` expression is used outside of async functions or modules or other async contexts.

## Message

```plain
SyntaxError: await is only valid in async functions and the top level bodies of modules (V8-based)
SyntaxError: await is only valid in async functions, async generators and modules (Firefox)
SyntaxError: Unexpected identifier (Safari)
```

## Error type

`SyntaxError`.

## What went wrong?

JavaScript execution is never blocking: an `await` can never block the execution of the program. Instead, it pauses the execution of the surrounding async task, while allowing other tasks to continue running. Therefore, `await` cannot be used in sync tasks, such as functions, generator functions, or top level of scripts. It is not always apparent whether the current file is a script or a module — see the Modules guide for more information.

## Examples

### Top-level await

You cannot use `await` at the top level of a script:

```html
<script>
  await fetch("https://example.com");
  // SyntaxError: await is only valid in async functions, async generators and modules
</script>
```

Instead, make the script a module:

```html
<script type="module">
  await fetch("https://example.com");
</script>
```

### Async callbacks

You cannot use `await` in a sync callback:

```js
urls.forEach((url) => {
  await fetch(url);
  // SyntaxError: await is only valid in async functions, async generators and modules
});
```

Instead, make the callback async. See more explanation in the Using promises guide.

```js
Promise.all(
  urls.map(async (url) => {
    await fetch(url);
  }),
);
```

## See also

- `await`
