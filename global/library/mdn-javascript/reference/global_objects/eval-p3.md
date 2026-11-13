---
title: "eval() (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/eval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# eval() (part 3 of 3)

### Security considerations

The method can be used to execute arbitrary input with the privileges of the caller. If the input is a potentially unsafe string provided by a user, this is a possible vector for Cross-site-scripting (XSS) attacks.

For example, the following code shows how `eval()` might execute `untrustedCode` provided by a user:

```js
const untrustedCode = "alert('Potentially evil code!');";
const adder = eval(untrustedCode);
```

Websites with a Content Security Policy (CSP) that specifies `script-src` or `default-src` will prevent such code running by default. If you must allow the scripts to run via `eval()`, you can mitigate the risks by always assigning a `TrustedScript` instance instead of a string, and enforcing trusted types using the `require-trusted-types-for` CSP directive. This ensures that the input is passed through a transformation function.

To allow `eval()` to run, you additionally need to specify the `trusted-types-eval` keyword in your CSP `script-src` directive. The `unsafe-eval` keyword also allows `eval()`, but is much less safe than `trusted-types-eval` because it would allow execution even on browsers that do not support trusted types.

For example, the required CSP for your site might look like this:

```http
Content-Security-Policy: require-trusted-types-for 'script'; script-src '<your_allowlist>' 'trusted-types-eval'
```

The behavior of the transformation function implemented in your trusted types policy depends on the specific use case that requires a user-provided script. If possible, you should lock the allowed scripts to exactly the code that you trust to run. If that is not possible, you might allow or block the use of certain functions within the provided input.

## Examples

Note that the first example shows how to use the method with trusted types. The other examples omit this step for brevity.

### Using TrustedScript

To mitigate the risk of XSS, we should always assign `TrustedScript` instances to the `script` parameter. We also need to do this if we're enforcing trusted types for other reasons and we want to allow some script sources that have been permitted (by `CSP: script-src`).

Trusted types are not yet supported on all browsers, so first we define the trusted types tinyfill. This acts as a transparent replacement for the Trusted Types JavaScript API:

```js
if (typeof trustedTypes === "undefined")
  trustedTypes = { createPolicy: (n, rules) => rules };
```

Next we create a `TrustedTypePolicy` that defines a `createScript()` method for transforming input strings into `TrustedScript` instances.

For the purpose of this example, we'll assume that we have a function `transformedScript()` that defines our transformation/filtering logic.

```js
const policy = trustedTypes.createPolicy("script-policy", {
  createScript(input) {
    const transformed = transformedScript(input); // Our filter method
    return transformed;
  },
});
```

Then we use the `policy` object to create a `TrustedScript` object from a potentially unsafe input string:

```js
// The potentially malicious string
const untrustedScript = "alert('Potentially evil code!');";

// Create a TrustedScriptURL instance using the policy
const trustedScript = policy.createScript(untrustedScript);
```

The `TrustedScript` object can now be passed to `eval()`:

```js
eval(trustedScript);
```

### Using eval()

In the following code, both of the statements containing `eval()` return 42.
The first evaluates the string `"x + y + 1"`; the second evaluates the string
`"42"`.

```js
const x = 2;
const y = 39;
const z = "42";
eval("x + y + 1"); // 42
eval(z); // 42
```

### eval() returns the completion value of statements

`eval()` returns the completion value of statements. For `if`, it would be the last expression or statement evaluated.

```js
const str = "if (a) { 1 + 1 } else { 1 + 2 }";
let a = true;
let b = eval(str);

console.log(`b is: ${b}`); // b is: 2

a = false;
b = eval(str);

console.log(`b is: ${b}`); // b is: 3
```

The following example uses `eval()` to evaluate the string `str`. This string consists of JavaScript statements that assign `z` a value of 42 if `x` is five, and assign 0 to `z` otherwise. When the second statement is executed, `eval()` will cause these statements to be performed, and it will also evaluate the set of statements and return the value that is assigned to `z`, because the completion value of an assignment is the assigned value.

```js
const x = 5;
const str = `if (x === 5) {
  console.log("z is 42");
  z = 42;
} else {
  z = 0;
}`;

console.log("z is ", eval(str)); // z is 42  z is 42
```

If you assign multiple values then the last value is returned.

```js
let x = 5;
const str = `if (x === 5) {
  console.log("z is 42");
  z = 42;
  x = 420;
} else {
  z = 0;
}`;

console.log("x is", eval(str)); // z is 42  x is 420
```

### eval() as a string defining function requires "(" and ")" as prefix and suffix

```js
// This is a function declaration
const fctStr1 = "function a() {}";
// This is a function expression
const fctStr2 = "(function b() {})";
const fct1 = eval(fctStr1); // return undefined, but `a` is available as a global function now
const fct2 = eval(fctStr2); // return the function `b`
```

## See also

- Property accessors
- WebExtensions: Using eval in content scripts
