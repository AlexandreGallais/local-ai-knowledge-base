---
title: "Authentication"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/authentication/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Authentication

Authentication in Docker Home is how users and workloads prove who they are
before they access Docker products.

Two-factor authentication (2FA) protects an individual account. Single
sign-on (SSO) federates sign-in for an organization or company. OpenID
Connect (OIDC) connections authenticate CI workloads such as GitHub Actions.

## Choose an authentication method

| Method | Who it covers | Who configures it | How authentication works |
| --- | --- | --- | --- |
| Two-factor authentication (2FA) | An individual Docker account | The account holder | Password plus a time-based one-time password (TOTP) from an authenticator app |
| Single sign-on (SSO) | An organization or company | An organization or company owner | Users sign in through the organization's identity provider (IdP) |
| OIDC connections | GitHub Actions and similar workloads | An organization owner or editor | Docker exchanges short-lived tokens issued per workflow run |

SSO requires a Docker Business subscription, or an
AI Governance
license. OIDC connections require a Docker Team or Business subscription.

To require Docker Desktop users to sign in as organization members, see
Enforce sign-in.
Enforce sign-in is configured in Enterprise, not in this section.
