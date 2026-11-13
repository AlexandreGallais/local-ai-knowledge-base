---
title: "Using the Private State Token API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/private_state_token_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Private State Token API (part 2 of 2)

## Permissions policy integration

`token-request` operations are controlled by the `private-state-token-issuance` `Permissions-Policy` directive, whereas `token-redemption` and `send-redemption-record` operations are controlled by the `private-state-token-redemption` directive. The allowlist for these directives is set to `*` (all origins) by default. This means that the feature is available to the top-level page, same-origin `` elements, and cross-origin `` elements without explicit delegation.

You can opt out of token <example-value> or redemption for specific pages on your site by including `private-state-token-issuance=()` and `private-state-token-redemption=()` in the `Permissions-Policy` header for each page.

You can also use the `Permissions-Policy` header to control third-party access to token operations. As parameters to the header origin list, use self and any origins you would like to allow access to the API. For example, to completely disable use of private state tokens within all browsing contexts except for your own origin and `https://example.com`, set the following HTTP response header:

```http
Permissions-Policy: private-state-token-issuance=(self "<example-value>"), private-state-token-redemption=(self "<example-value>")
```

To enable the API for all cross-origin resources, set the origin list to `*`.

Even though the default policy is `*`, an `` still needs to include the `private-state-token-issuance` and `private-state-token-redemption` directives in its allow attribute to gain access to the feature. For example, to allow both features to be used on `example.com`:

```html
<iframe
  src="https://example.com"
  allow="private-state-token-issuance '<example-value>';
  private-state-token-redemption '<example-value>'">
</iframe>
```
