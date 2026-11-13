---
title: "Relying party federated sign-in (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fedcm_api/rp_sign-in/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Relying party federated sign-in (part 2 of 2)

## Disconnecting a federated sign-in

The RP may disconnect a specified federated sign-in account from the associated IdP by invoking `IdentityCredential.disconnect()`. This function can be called from a top-level RP frame.

```js
IdentityCredential.disconnect({
  configURL: "https://idp.example.com/config.json",
  clientId: "rp123",
  accountHint: "account456",
});
```

For a `disconnect()` call to work, the IdP must include a `disconnect_endpoint` in its config file. See The disconnect endpoint for more details of the underlying HTTP communication.

## See also

- Federated Credential <example-value> API on developer.chrome.com (2023)
