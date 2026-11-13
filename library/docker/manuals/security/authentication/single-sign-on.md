---
title: "Single sign-on overview"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/authentication/single-sign-on/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Single sign-on overview

Single sign-on (SSO) lets users access Docker by authenticating through your
identity provider (IdP). Docker supports any SAML 2.0 identity provider, and
Microsoft Entra ID (formerly Azure AD) for OpenID Connect (OIDC). You can
configure SSO for an entire company, including all associated organizations,
or for a single organization. SSO requires a Docker Business subscription or
an
AI Governance
license.

## How SSO works

When a user signs in to Docker Desktop or Docker Hub, Docker sends them to
your IdP's sign-in page. The IdP accepts or denies the sign-in.

```mermaid
sequenceDiagram
  actor User
  participant App as Docker Desktop<br/>or<br/>Docker Hub
  participant Login as Docker Login
  participant IdP as Your IdP

  User->>App: Open the app
  App->>Login: Start authentication
  Login->>IdP: Send the user to your IdP
  IdP->>User: Prompt for credentials
  User->>IdP: Enter credentials
  IdP->>Login: Confirm the user
  Login->>App: Return the user to the app
```

## Set up SSO

Setting up SSO is a multi-step procedure that moves between Docker and your
IdP.

```mermaid
flowchart LR
  %% Link the columns to each other. A link into a step inside a
  %% column makes that column run left to right.
  subgraph configure["Configure SSO"]
    direction TB
    A["1. Add a domain"] --> B["2. Verify your domain"]
    B --> C["3. Create an SSO connection in Docker"]
    C --> D{{"4. Create an SSO connection in your IdP"}}
    D --> E["5. Connect Docker to your IdP"]
    E --> F["6. Test the connection"]
  end

  subgraph post["Post-setup"]
    direction TB
    G["Provision users"]
    H["Optional: Enforce SSO / Desktop sign-in"]
    I["Manage SSO configuration"]
    G --> H --> I
  end

  configure -->|"After the connection works"| post

  classDef step fill:#ffffff,stroke:#6b7280,color:#111827
  class A,B,C,D,E,F,G,H,I step
  style configure fill:#dbeafe,stroke:#2563eb,stroke-width:2px
  style post fill:#fef9c3,stroke:#ca8a04,stroke-width:2px
```

After you finish the setup, users sign in to Docker services with their
company email address. When
Just-in-Time provisioning
is turned on, which is the default for an SSO connection, Docker adds each
user to your organization and team on first sign-in.

> **Important:**
>
> When SSO is enforced, the Docker CLI rejects password sign-in. Use a
> personal access token (PAT) to sign in to the CLI.

## Next steps

- Start configuring SSO.
- Read the FAQs.
- Troubleshoot SSO issues.
