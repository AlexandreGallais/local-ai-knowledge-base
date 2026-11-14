---
title: "Permissions-Policy: gamepad directive"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/permissions-policy/gamepad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Permissions-Policy: gamepad directive

The HTTP `Permissions-Policy` header `gamepad` directive controls whether the current document is allowed to use the Gamepad API.

Specifically, where a defined policy blocks use of this feature, calls to `Navigator.getGamepads()` will throw a `SecurityError` `DOMException`. In addition, the `gamepadconnected` and `gamepaddisconnected` events will not fire.

## Syntax

```http
Permissions-Policy: gamepad=<allowlist>;
```

- `<allowlist>`
    A list of origins for which permission is granted to use the feature. See `Permissions-Policy` > Syntax for more details.

## Default policy

The default allowlist for `gamepad` is `*`.

## Examples

### General example

SecureCorp Inc. wants to disable the Gamepad API within all browsing contexts except for its own origin and those whose origin is `https://example.com`.
It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: gamepad=(self "https://example.com")
```

### With an \ element

FastCorp Inc. wants to disable `gamepad` for all cross-origin child frames, except for a specific ``.
It can do so by delivering the following HTTP response header to define a Permissions Policy:

```http
Permissions-Policy: gamepad=(self)
```

Then include an `<allow>` attribute on the `` element:

```html
<iframe src="https://other.com/game" allow="gamepad"></iframe>
```

iframe attributes can selectively enable features in certain frames, and not in others, even if those frames contain documents from the same origin.

## See also

- `Permissions-Policy` header
- Permissions Policy
