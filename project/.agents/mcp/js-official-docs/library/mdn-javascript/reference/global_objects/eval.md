---
title: "eval() (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/eval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# eval()

> **Warning:**
> The argument passed to this function is dynamically parsed and executed as JavaScript.
> APIs like this are known as injection sinks, and are potentially a vector for cross-site-scripting (XSS) attacks.
>
> You can mitigate this risk by always passing `TrustedScript` objects instead of strings and enforcing trusted types.
>
> See Security considerations for more information.

The **`eval()`** function evaluates JavaScript code represented as a string and returns its completion value. The source is parsed as a script.

```js
console.log(eval("2 + 2"));
// Expected output: 4

console.log(eval(new String("2 + 2")));
// Expected output: 2 + 2

console.log(eval("2 + 2") === eval("4"));
// Expected output: true

console.log(eval("2 + 2") === eval(new String("2 + 2")));
// Expected output: false
```

## Syntax

```js
eval(script)
```

### Parameters

- `script`
    A `TrustedScript` instance or string representing a JavaScript expression, statement, or sequence of statements. The expression can include variables and properties of existing objects. It will be parsed as a script, so `import` declarations (which can only exist in modules) are not allowed.

### Return value

The completion value of evaluating the given code. If the completion value is empty, `undefined` is returned. If `script` is not a `TrustedScript` or string primitive, `eval()` returns the argument unchanged.

### Exceptions

- `SyntaxError`
    The `script` parameter cannot be parsed as a script.
- `TypeError`
    `script` is a string when Trusted Types are enforced by a CSP and no default policy is defined.

The method also throws any exception that occurs during evaluation of the code.
