---
title: "Credential Management API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credential_management_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Credential Management API

The Credential <example-value> API enables a website to create, store, and retrieve credentials. A credential is an item which enables a system to make an authentication decision: for example, to decide whether to sign a user into an account. We can think of it as a piece of evidence that a user presents to a website to demonstrate that they really are the person they are claiming to be.

## Concepts and usage

The central interface is the `CredentialsContainer`, which is accessed through the `navigator.credentials` property and provides three main functions:

- `create()`: create a new credential.
- `store()`: store a new credential locally.
- `get()`: retrieve a credential, which can then be used to log a user in.

The API supports four different types of credential, which are all represented as subclasses of `Credential`:

| Type                    | Interface                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Password                | `PasswordCredential`                                                  |
| Federated identity      | `IdentityCredential`, `FederatedCredential` (deprecated) |
| One-time password (OTP) | `OTPCredential`                                                       |
| Web Authentication      | `PublicKeyCredential`                                                 |

The guide page Credential types gives an overview of the different credential types and how they are used.

## Interfaces

- `Credential`
    Provides information about an entity as a prerequisite to a trust decision.
- `CredentialsContainer`
    Exposes methods to request credentials and notify the user agent when interesting events occur such as successful sign in or sign out. This interface is accessible from `navigator.credentials`.
- `FederatedCredential`
    Provides information about credentials from a federated identity provider, which is an entity that a website trusts to correctly authenticate a user, and which provides an API for that purpose. OpenID Connect is an example of such a framework.
- `PasswordCredential`
    Provides information about a username/password pair.

### Extensions to other interfaces

- `Navigator.credentials` (read-only)
    Returns the `CredentialsContainer` interface which exposes methods to request credentials and notify the user agent when interesting events occur such as successful sign in or sign out.

## See also

- `Web Authentication API`
- `WebOTP API`
- `Federated Credential <example-value> (FedCM) API`
