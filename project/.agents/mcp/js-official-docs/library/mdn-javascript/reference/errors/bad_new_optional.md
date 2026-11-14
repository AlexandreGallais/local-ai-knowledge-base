---
title: "SyntaxError: new keyword cannot be used with an optional chain"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_new_optional/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: new keyword cannot be used with an optional chain

The JavaScript exception "new keyword cannot be used with an optional chain" occurs when the constructor of a `new` expression is an optional chain, or if there's an optional chain between the constructor and the parenthesized list of arguments.

## Message

```plain
SyntaxError: Invalid optional chain from new expression (V8-based)
SyntaxError: new keyword cannot be used with an optional chain (Firefox)
SyntaxError: Cannot call constructor in an optional chain. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

There are two ways to get this error. The first one is if the constructor expression is an optional chain expression, like this:

```js
new Intl?.DateTimeFormat();
Number?.[parseMethod]`Hello, world!`;
```

The second one is if `?.` occurs between the constructor and the arguments list, like this:

```js
new Intl.DateTimeFormat?.();
```

Optional `new` is specifically forbidden because its syntax is complicated (`new` with and without arguments), and the result is unclear (it would be the only case where `new` does not evaluate to an object value). You need to translate the optional chaining to its underlying condition (see optional chaining for more information).

```js
const result =
  Intl.DateTimeFormat === null || Intl.DateTimeFormat === undefined
    ? undefined
    : new Intl.DateTimeFormat();
```

Remember that optional chaining only short-circuits within a parenthesized unit. If you parenthesize your constructor expression, the optional chaining will not cause an error, because now the constructor does not short-circuit and the result is clear (the constructor will produce `undefined` and then cause the `new` expression to throw).

```js
new (Intl?.DateTimeFormat)(); // Throws if Intl?.DateTimeFormat is undefined
```

However this is a bit nonsensical anyway because optional chaining prevents errors inside the property access chain, but is then guaranteed to generate an error when calling `new`. You would probably still want to use a conditional check.

Note that optional chaining is only forbidden as the constructor expression. You can use optional chaining inside the argument list, or use optional chaining on the `new` expression as a whole.

```js
new Intl.DateTimeFormat(navigator?.languages);
new Intl.DateTimeFormat().resolvedOptions?.();
```

Note that there's no needs to use `?.` on the `new` expression itself: `new a()?.b`, because `new` is guaranteed to produce a non-nullish object value.

## See also

- `new`
- Optional chaining (`?.`)
- Original discussion on whether "optional new" should be allowed
