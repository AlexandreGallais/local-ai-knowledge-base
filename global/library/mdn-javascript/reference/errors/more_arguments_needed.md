---
title: "TypeError: More arguments needed"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/more_arguments_needed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: More arguments needed

The JavaScript exception "more arguments needed" occurs when there is an error with how
a function is called. More arguments need to be provided.

## Message

```plain
TypeError: Object prototype may only be an Object or null: undefined (V8-based)
TypeError: Object.create requires at least 1 argument, but only 0 were passed (Firefox)
TypeError: Object.setPrototypeOf requires at least 2 arguments, but only 0 were passed (Firefox)
TypeError: Object.defineProperties requires at least 1 argument, but only 0 were passed (Firefox)
TypeError: Object prototype may only be an Object or null. (Safari)
```

## Error type

`TypeError`.

## What went wrong?

There is an error with how a function is called. More arguments need to be provided.

## Examples

### Required arguments not provided

The `Object.create()` method requires at least one argument and the
`Object.setPrototypeOf()` method requires at least two arguments:

```js
const obj = Object.create();
// TypeError: Object.create requires at least 1 argument, but only 0 were passed

const obj2 = Object.setPrototypeOf({});
// TypeError: Object.setPrototypeOf requires at least 2 arguments, but only 1 were passed
```

You can fix this by setting `null` as the prototype, for example:

```js
const obj = Object.create(null);

const obj2 = Object.setPrototypeOf({}, null);
```

## See also

- Functions guide
