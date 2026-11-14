---
title: "require-post-message-target-origin"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/require-post-message-target-origin.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# require-post-message-target-origin

📝 Enforce using the `targetOrigin` argument with `window.postMessage()`.

🚫 Disabled by default.

💡 This rule is manually fixable by editor suggestions.

Specifying the `targetOrigin` argument with `window.postMessage()` is a security best practice. It ensures that sensitive messages are only delivered to the intended recipient, preventing accidentally sending data to a window with an unexpected origin due to navigation or redirects.

When TypeScript type information is available, this rule ignores methods whose call signatures have no `targetOrigin` parameter, such as `Worker#postMessage()`, `MessagePort#postMessage()`, and `BroadcastChannel#postMessage()`.

Without type information, or when any possible method type has no known call signatures (such as `any` or `Function`), this rule cannot distinguish between `window.postMessage()` and other `.postMessage()` methods.

## Examples

```js
// ❌ - Missing targetOrigin, message could be intercepted
window.postMessage(sensitiveData);

// ✅ - Explicit target origin prevents security issues
window.postMessage(sensitiveData, 'https://trusted-domain.com');
```

```js
// ❌
window.postMessage({token: <example-value>});

// ✅ - Always specify the target origin
window.postMessage({token: <example-value>}, '<example-value>');
```

```js
// ✅ - '*' is acceptable when sending non-sensitive public data
window.postMessage({publicData: 'hello'}, '*');
```

```js
// ❌ - Sending to iframe without specifying origin
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage(data);

// ✅ - Specify the exact origin you expect
iframe.contentWindow.postMessage(data, 'https://expected-iframe-origin.com');
```
