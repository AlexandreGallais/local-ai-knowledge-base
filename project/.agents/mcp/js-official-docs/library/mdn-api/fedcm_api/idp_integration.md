---
title: "Identity provider integration with FedCM (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fedcm_api/idp_integration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Identity provider integration with FedCM

This article details all the steps an identity provider (IdP) needs to take to integrate with the Federated Credential <example-value> (FedCM) API.

## IdP integration steps

To integrate with FedCM, an IdP needs to do the following:

1. Provide a well-known file to identify the IdP.
2. Provide a config file and endpoints for accounts list and assertion issuance (and optionally, client metadata).
3. Update its login status using the Login Status API.

## Provide a well-known file

There is a potential privacy issue whereby an IdP is able to discern whether a user visited a relying party (RP) without explicit consent. This has tracking implications, so an IdP is required to provide a well-known file to verify its identity and mitigate this issue.

The well-known file is requested via an uncredentialed `GET` request, which doesn't follow redirects. This effectively prevents the IdP from learning who made the request and which RP is attempting to connect.

The well-known file must be served from the registrable domain of the IdP at `/.well-known/web-identity`. For example, if the IdP endpoints are served under `https://accounts.idp.example/`, they must serve a well-known file at `https://idp.example/.well-known/web-identity`. The well-known file's content should have the following JSON structure:

```json
{
  "provider_urls": ["https://accounts.idp.example/config.json"]
}
```

The `provider_urls` member should contain an array of URLs pointing to valid IdP config files that can be used by RPs to interact with the IdP. The array length is currently limited to one.

## The `Sec-Fetch-Dest` HTTP header

All requests sent from the browser via FedCM include a ``Sec-Fetch-Dest`: webidentity` header. All IdP endpoints that receive credentialed requests (i.e., `accounts_endpoint` and `id_assertion_endpoint`) must confirm this header is included to protect against CSRF attacks.
