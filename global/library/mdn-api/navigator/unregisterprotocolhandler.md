---
title: "Navigator: unregisterProtocolHandler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/unregisterprotocolhandler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: unregisterProtocolHandler() method

The **`Navigator`** method **`unregisterProtocolHandler()`** removes a protocol handler for a given URL scheme.

This method is the inverse of **`registerProtocolHandler()`**.

## Syntax

```js
unregisterProtocolHandler(scheme, url)
```

### Parameters

- `scheme`
    A string containing the permitted scheme in the protocol handler that will be unregistered.
    For example, you can unregister the handler for SMS text message links by passing the `"sms"` scheme.
- `url`
    A string containing the URL of the handler.
    **This URL should match the one that was used to register the handler (e.g., it must include `%s`)**.

### Return value

None (`undefined`).

### Exceptions

- `SecurityError` `DOMException`
    The user agent blocked unregistration.
    This might happen if:
    - The scheme (protocol) is invalid, such as a scheme the browser handles itself (`https:`, `about:`, etc.)
    - The handler URL's origin does not match the origin of the page calling this API.
    - The browser requires that this function is called from a secure context.
    - The browser requires that the handler's URL be over HTTPS.
- `SyntaxError` `DOMException`
    The `%s` placeholder is missing from the handler URL.

## Permitted schemes

For security reasons, `unregisterProtocolHandler()` restricts which schemes can be unregistered.

A **custom scheme** may be unregistered as long as:

- The custom scheme's name begins with `web+`
- The custom scheme's name includes at least 1 letter after the `web+` prefix
- The custom scheme has only lowercase ASCII letters in its name.

For example, `web+burger`, as shown in the Example below.

Otherwise, the scheme must be one of the following:

- `bitcoin`
- `ftp`
- `ftps`
- `geo`
- `im`
- `irc`
- `ircs`
- `magnet`
- `mailto`
- `matrix`
- `mms`
- `news`
- `nntp`
- `openpgp4fpr`
- `sftp`
- `sip`
- `sms`
- `smsto`
- `ssh`
- `tel`
- `urn`
- `webcal`
- `wtai`
- `xmpp`

## Examples

If your site is `burgers.example.com`, and you have a `web+burger:` scheme, you can unregister the handler for it like so:

```js
navigator.unregisterProtocolHandler(
  "web+burger",
  "https://burgers.example.com/?burger=%s",
);
```

This script must be run from the same origin as the handler URL (so any page at `https://burgers.example.com`), and the handler URL must be `http` or `https`.
