---
title: "JSON.rawJSON()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/json/rawjson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# JSON.rawJSON()

The **`JSON.rawJSON()`** static method creates a "raw JSON" object containing a piece of JSON text. When serialized to JSON, the raw JSON object is treated as if it is already a piece of JSON. This text is required to be valid JSON.

## Syntax

```js
JSON.rawJSON(string)
```

### Parameters

- `string`
    The JSON text. Must be valid JSON **representing a primitive value**.

### Return value

An object that can be used to create JSON text with the exact same content as the `string` provided, without quotes around the string itself. This object has `null` prototype and is frozen (so it never gets accidentally serialized as a regular object by any kind of primitive conversion), and the following property:

- `rawJSON`
    The original JSON `string` provided.

Furthermore, it has a private field that marks itself as a raw JSON object. This allows it to be identified by `JSON.stringify()` and `JSON.isRawJSON()`.

### Exceptions

- `SyntaxError`
    Thrown if the `string` is not valid JSON, or if it represents an object or array.

## Description

A raw JSON object can be seen as an immutable, atomic data structure like any kind of primitive. It is not a regular object and it contains no data other than the raw JSON text. It is used to "pre-serialize" data to formats that `JSON.stringify` itself cannot produce for various reasons. The most typical use case is the floating point number loss of precision problem. For example:

```js
JSON.stringify({ value: 12345678901234567890 });
// {"value":12345678901234567000}
```

The value is not exactly equivalent to the original number any more! This is because JavaScript uses floating point representation for all numbers, so it cannot represent all integers exactly. The number literal `12345678901234567890` itself is already rounded to the nearest representable number when it is parsed by JavaScript.

Without `JSON.rawJSON`, there is no way to tell `JSON.stringify` to produce the number literal `12345678901234567890`, because there is simply no corresponding JavaScript number value. With raw JSON, you can directly tell `JSON.stringify()` what a particular value should be stringified as:

```js
const rawJSON = JSON.rawJSON("12345678901234567890");
JSON.stringify({ value: rawJSON });
// {"value":12345678901234567890}
```

For a more complete example of this, see Lossless number serialization.

Note that although we passed a string to `JSON.rawJSON()`, it still becomes a number in the final JSON. This is because the string represents the verbatim JSON text. If you want to serialize a string, you should use `JSON.rawJSON()` with a quotes-enclosed string value:

```js
const rawJSON = JSON.rawJSON('"Hello world"');
JSON.stringify({ value: rawJSON });
// {"value":"Hello world"}
```

`JSON.rawJSON` allows you to insert arbitrary JSON text, but does not allow you to create invalid JSON. Anything that was not permitted by the JSON syntax is not permitted by `JSON.rawJSON()` either:

```js
const rawJSON = JSON.rawJSON('"Hello\nworld"'); // Syntax error, because line breaks are not allowed in JSON strings
```

Furthermore, you cannot use `JSON.rawJSON()` to create JSON objects or arrays.

## Examples

### Using JSON.rawJSON() to create JSON expressions of different types

```js
const numJSON = JSON.rawJSON("123");
const strJSON = JSON.rawJSON('"Hello world"');
const boolJSON = JSON.rawJSON("true");
const nullJSON = JSON.rawJSON("null");

console.log(
  JSON.stringify({
    age: numJSON,
    message: strJSON,
    isActive: boolJSON,
    nothing: nullJSON,
  }),
);

// {"age":123,"message":"Hello world","isActive":true,"nothing":null}
```

However, you cannot use `JSON.rawJSON()` to create JSON objects or arrays:

```js
const arrJSON = JSON.rawJSON("[1, 2, 3]");
const objJSON = JSON.rawJSON('{"a": 1, "b": 2}');
// SyntaxError
```

### Using JSON.rawJSON() to create escaped string literals

Apart from numbers, there is only one other type that does not have a one-to-one correspondence between JavaScript values and JSON text: strings. When strings are serialized to JSON, all code points, other than those that are not legal inside JSON string literals (such as line breaks), are printed literally:

```js
console.log(JSON.stringify({ value: "\ud83d\ude04" })); // {"value":"😄"}
```

This may not be desirable, because the receiver of this string may handle Unicode differently. To improve interoperability, you can explicitly specify the string to be serialized with escape sequences:

```js
const rawJSON = JSON.rawJSON('"\\ud83d\\ude04"');
const objStr = JSON.stringify({ value: rawJSON });
console.log(objStr); // {"value":"\ud83d\ude04"}
console.log(JSON.parse(objStr).value); // 😄
```

Note that the double backslashes in the `rawJSON` actually represents a single slash character.

## See also

- Polyfill of `JSON.rawJSON` in `core-js`
- `JSON`
- `JSON.isRawJSON()`
- `JSON.stringify()`
