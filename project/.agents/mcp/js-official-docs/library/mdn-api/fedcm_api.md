---
title: "Federated Credential Management (FedCM) API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fedcm_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Federated Credential Management (FedCM) API

The **Federated Credential <example-value> API** (or _FedCM API_) provides a standard mechanism for identity providers (IdPs) to make identity federation services available on the web in a privacy-preserving way, without the need for third-party cookies and redirects. This includes a JavaScript API that enables the use of federated authentication for activities such as signing in or signing up on a website.

## FedCM concepts

Identity federation is the delegation of user authentication from a website requiring user sign-up or sign-in, such as an e-commerce or social networking site (also known as a relying party or RP), to a trusted third-party identity provider (IdP) such as Google, Facebook/Meta, GitHub, etc.

RPs can integrate with IdPs, allowing users to sign-in using the accounts they have registered with the IdP. Identity federation via a small set of dedicated IdPs has improved web authentication in terms of security, consumer confidence, and user experience, as compared to each site managing its own sign-in needs with separate usernames and passwords.

The problem is that traditional identity federation relies on ``s, redirects, and third-party cookies, which are also used for third-party tracking. Browsers are limiting the usage of these features in an effort to preserve user privacy, but a side effect is that this makes valid, non-tracking uses more difficult to implement, which includes identity federation.

This affects federated sign-in in general, as well as more specific identity federation use cases:

- OIDC front-channel logout: This flow requires the IDP to embed several RP ``s, which rely on RP cookies.
- Social Widgets: In order to provide social widgets, the IdP third-party cookie must be provided from the RP top-level origin.
- Personalized buttons: The display of personalized sign in information on a `` in the RP origin is implemented as an IdP `` that requires third-party cookies.
- Session Refresh without top-level navigation or popups.

FedCM aims to work around this problem, providing a dedicated mechanism for federated identity flows on the web, and enabling supporting browsers to provide special UI elements on RPs, allowing users to choose an IdP account to use for sign-in.

There are two parts to using the FedCM API, which are covered in the linked guides below:

1. IdP integration with FedCM — what an identity provider needs to provide so that an RP can integrate with it.
2. RP federated sign-in — the FedCM functionality an RP needs to use to sign a user in using their IdP account. A FedCM sign-in request is initiated using the `navigator.credentials.get()` method.

> **Note:**
> Google Sign In is an example of an IdP that already supports FedCM. Migrate to FedCM provides instructions for RPs wishing to migrate existing apps using Google Sign In to federated sign-in.

## Permissions Policy integration and `` support

The `identity-credentials-get` Permissions-Policy can be used to control permission to use FedCM.
More specifically, it permits usage of the following methods:

- `CredentialsContainer.get()`
- `IdentityCredential.disconnect()`
- `IdentityProvider.getUserInfo()`

Developers can explicitly grant permission for an `` to use FedCM via the `allow` attribute:

```html
<iframe src="3rd-party.example" allow="identity-credentials-get"></iframe>
```

The availability of FedCM within ``s enables a couple of use cases:

- Larger sites won't want a third-party sign-in script to gain control over the top-level frame; instead they will want to add that script and invoke FedCM from within an ``.
- Some `<iframes>` may themselves require federated authentication.

## Interfaces

- `IdentityCredential`
    Represents a user identity credential <example-value> from successful federated authentication. A successful `navigator.credentials.get()` call that includes an `identity` option fulfills with an `IdentityCredential` instance.
- `IdentityCredentialError`
    Represents an authentication error indicating that the user agent did not receive an identity assertion after the user has asked to authenticate using a federated credential.
- `IdentityProvider`
    Represents an IdP and provides access to related information and functionality.
- `NavigatorLogin`
    Defines login functionality for IdPs, including the `Navigator.login.setStatus()` method for updating IdP login status.

## Extensions to other interfaces

- `CredentialsContainer.get()`, the `identity` option.
    `identity` is an object containing details of federated IdPs that a relying party (RP) website can use to sign users in. It causes a `get()` call to initiate a request for a user to sign in to an RP with an IdP.
- `Navigator.login`
    Provides access to the browser's `NavigatorLogin` object.

## HTTP headers

- `Set-Login`
    Provides an HTTP mechanism for updating login status via HTTP.

## Examples

For example code, see:

- Implement an identity solution with FedCM on the Identity Provider side on developer.chrome.com (2025)
- Implement an identity solution with FedCM on the Relying Party side on developer.chrome.com (2025)

## See also

- Federated Credential <example-value> API
