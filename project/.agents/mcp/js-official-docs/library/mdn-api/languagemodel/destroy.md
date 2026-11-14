---
title: "LanguageModel: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/languagemodel/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LanguageModel: destroy() method

The **`destroy()`** method of the `LanguageModel` interface releases the resources assigned to the `LanguageModel` instance it is called on and stops any further activity on it. Any ongoing and subsequent method calls made on the `LanguageModel` will reject with an `AbortError`.

It makes sense to destroy `LanguageModel` objects if they are no longer being used, as they tie up significant resources in their handling.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if usage of the method is blocked by a `language-model` `Permissions-Policy`.

## Examples

### Basic `destroy()` usage

```js
const session = await LanguageModel.create({
  expectedInputs: [{ type: "text", languages: ["en"] }],
  expectedOutputs: [{ type: "text", languages: ["en"] }],
});

// ...

session.destroy();
```

See also Using the Prompt API > Canceling operations and destroying instances.

## See also

- Prompt API
- Using the Prompt API
