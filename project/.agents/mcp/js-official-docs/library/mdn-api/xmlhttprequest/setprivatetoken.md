---
title: "XMLHttpRequest: setPrivateToken() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/setprivatetoken/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: setPrivateToken() method

The `XMLHttpRequest` method **`setPrivateToken()`** adds private state token <example-value> to an `XMLHttpRequest` call, to initiate private state token operations.

## Syntax

```js
setPrivateToken(privateToken)
```

### Parameters

- `privateToken`
    An object containing options for initiating a private state token operation. Possible properties include:
    - `issuers` (optional)
        An array of strings containing the URLs of issuers that you want to forward redemption records for. This setting is ignored unless `operation` is set to `send-redemption-record`, in which case the `issuers` array must be included.
    - `operation`
        A string representing the type of token <example-value> you want to initiate. Possible values are:
        - `token-request`
            Initiates a token <example-value> operation.
        - `token-redemption`
            Initiates a token <example-value> operation.
        - `send-redemption-record`
            Initiates a send redemption record operation.
    - `refreshPolicy` (optional)
        An enumerated value that specifies the expected behavior when a non-expired redemption record for the current user and site has previously been set. This setting is ignored unless `operation` is set to `token-redemption`. Possible values are:
        - `none`
            The previously-set redemption record should be used, and a new one should not be issued. This is the default value.
        - `refresh`
            A new redemption record is always issued.
    - `version`
        A number indicating the version of the cryptographic protocol you wish to use when generating a token. Currently this is always set to `1`, which is the only version that the specification supports. When specifying the `privateToken` option, this property is mandatory.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the associated `XMLHttpRequest` is not in an opened state, or `send()` has already been called on it.
- `NotAllowedError` `DOMException`
    Thrown if use of Private State Token API operations is specifically disallowed by a `private-state-token-issuance` or `private-state-token-redemption` Permissions Policy.
- `TypeError`
    Thrown if the `operation` is set to `send-redemption-record`, and the `issues` array was empty or not set, or one or more of the specified `issuers` are not trustworthy, HTTPS URLs.

## Examples

### Issuing a private token

```js
const hasToken = await Document.hasPrivateToken(`issuer.example`);
if (!hasToken) {
  const request = new XMLHttpRequest();
  request.open(
    "POST",
    "<example-value>",
  );
  request.setPrivateToken({
    version: 1,
    operation: "<example-value>",
  });
  req.send();
}
```

### Redeeming a private token

```js
const request = new XMLHttpRequest();
request.open(
  "POST",
  "<example-value>",
);
request.setPrivateToken({
  version: 1,
  operation: "<example-value>",
  refreshPolicy: "none",
});
req.send();
```

### Forwarding a redemption record

```js
const hasRR = await Document.hasRedemptionRecord(`issuer.example`);
if (hasRR) {
  const request = new XMLHttpRequest();
  request.open("POST", "some-resource.example");
  request.setPrivateToken({
    version: 1,
    operation: "send-redemption-record",
    issuers: ["https://issuer.example"],
  });
  req.send();
}
```

## See also

- Private State Token API
