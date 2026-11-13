---
title: "SyntaxError: setter functions must have one argument"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/setter_one_argument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: setter functions must have one argument

The JavaScript exception "setter functions must have one argument" occurs when a setter is declared and the parameter list is not consisted of exactly one formal parameter.

## Message

```plain
SyntaxError: Setter must have exactly one formal parameter. (V8-based)
SyntaxError: Setter function argument must not be a rest parameter (V8-based)
SyntaxError: setter functions must have one argument (Firefox)
SyntaxError: Unexpected token '<example-value>'. setter functions must have one parameter. (Safari)
SyntaxError: Unexpected token '<example-value>'. Expected a parameter pattern or a '<example-value>' in parameter list. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The `set` property syntax looks like a function, but it is stricter and not all function syntax is allowed. A setter is always invoked with exactly one argument, so defining it with any other number of parameters is likely an error. This parameter can be destructured or have a default value, but it cannot be a rest parameter.

Note that this error only applies to property setters using the `set` syntax. If you define the setter using `Object.defineProperty()`, etc., the setter is defined as a normal function, although it's likely still an error if the setter expects any other number of arguments, as it will be called with exactly one.

## Examples

### Invalid cases

```js
const obj = {
  set value() {
    this._value = Math.random();
  },
};
```

### Valid cases

```js
// You must declare one parameter, even if you don't use it
const obj = {
  set value(_ignored) {
    this._value = Math.random();
  },
};

// You can also declare a normal method instead
const obj = {
  setValue() {
    this._value = Math.random();
  },
};
```

## See also

- Functions
- `set`
