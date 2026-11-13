---
title: "Set-Login header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/set-login/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set-Login header

The HTTP **`Set-Login`** response header is sent by a federated identity provider (IdP) to set its login status, and indicates whether any users are logged into the IdP on the current browser or not.
This is stored by the browser and used by the FedCM API to reduce the number of requests it makes to the IdP as the browser doesn't need to request accounts when there are no users logged in to the IdP.
It also mitigates potential timing attacks.

The header may be set on any response resulting from a top-level navigation or a same-origin subresource request on the IdP's origin site.
Any interaction with the IdP site may result in this header being set, and the login status being stored by the browser.

See Update login status using the Login Status API for more information about FedCM login status.

       | Header type
       | Response header

## Syntax

```http
Set-Login: <status>
```

## Directives

- `<status>`
    A string representing the login status to set for the IdP. Possible values are:
    - `logged-in`: The IdP has at least one user account signed in.
    - `logged-out`: All IdP user accounts are currently signed out.

    > **Note:**
    > Browsers ignore this header if it contains any other value.

## Examples

```http
Set-Login: logged-in

Set-Login: logged-out
```

## See also

- Federated Credential <example-value> (FedCM) API
