---
title: "Onboard a Docker organization"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/accounts/organization/setup/onboard.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Onboard a Docker organization

Onboarding your organization includes:

- Identifying users so you can allocate subscription seats
- Inviting members and owners
- Securing authentication and authorization
- Enforcing sign-in for Docker Desktop

These actions give administrators visibility into user activity and a way
to enforce security settings. Organization members also receive higher
pull limits and other benefits when they are signed in.

## Prerequisites

Before you onboard your organization, you need a Docker Team or Business
subscription. For details, see
Docker subscriptions and features.
When you buy a self-serve subscription, the on-screen instructions guide
you through creating an organization.

If you bought a subscription through Docker Sales and you haven't created
an organization yet, see
Create an organization.

## Guided onboarding

You can use a guided setup for the first onboarding tasks:

1. Sign in to Docker Home.
1. Select **Guided setup** at the bottom of the left sidebar.

Guided setup walks through these steps:

- **Invite your team**: Invite owners and members.
- **Manage user access**: Claim your company's domain, manage members
  with SSO, and enforce Docker Desktop sign-in.
- **Docker Desktop security**: Configure Image Access Management,
  Registry Access Management, and Settings Management.

## Manual onboarding

### Step one: Identify your Docker users

Identifying your users helps you allocate seats and makes sure they
receive your Docker subscription benefits.

1. Identify the Docker users in your organization.
   - If your organization uses device management software, such as MDM
     or Jamf, use it to find machines with Docker Desktop installed:
     - Mac: `/Applications/Docker.app`
     - Windows: `C:\Program Files\Docker\Docker` (all-users
       installation) or `%LOCALAPPDATA%\Programs\DockerDesktop`
       (per-user installation)
     - Linux: `/opt/docker-desktop`
   - If your organization doesn't use device management software, or
     users haven't installed Docker Desktop yet, ask them who uses
     Docker Desktop.
1. Ask users to update their Docker account email address to one in your
   organization's domain, or to create an account with that email.
   - To update an email address, see
     Update email address.
   - To create an account, users
     sign up with an email address in
     your organization's domain and verify that address.
1. Identify Docker accounts that already use your organization's domain:
   - Ask your Docker sales representative, or
     contact sales,
     for a list of Docker accounts that use an email address in your
     domain.

### Step two: Invite owners

When you create an organization, you are the only owner. Adding more
owners is optional, but additional owners can help you onboard and manage
your organization.

To add an owner, invite a user and assign the owner role. For details,
see Invite members
and
Roles and permissions.

### Step three: Invite members

When you add users to your organization, you can see their activity and
enforce security settings. Members also receive higher pull limits and
other organization-wide benefits when they are signed in.

To add a member, invite a user and assign the member role. For details,
see Invite members
and
Roles and permissions.

### Step four: Manage user access with SSO and SCIM

SSO and SCIM are optional and available to Docker Business subscribers.
To upgrade a Docker Team subscription to Docker Business, see
Upgrade a plan.

Use your identity provider (IdP) to manage members and provision them to
Docker through SSO and SCIM:

- Configure SSO
  to authenticate members and add them when they sign in through your
  identity provider.
- Optional.
  Enforce SSO
  so users must use SSO when they sign in to Docker.

  > **Note:**
  >
  > Enforcing single sign-on (SSO) and enforcing Docker Desktop sign-in
  > are different features. For details, see
  > Enforcing sign-in versus enforcing single sign-on (SSO).

- Configure SCIM to
  provision, add, and deprovision members through your identity
  provider.

### Step five: Enforce sign-in for Docker Desktop

By default, members of your organization can use Docker Desktop without
signing in. When users don't sign in as a member of your organization,
they don't receive the
benefits of your organization's subscription
and they can bypass
Docker's security features.

You can enforce sign-in in more than one way:

- Registry key method (Windows only)
- `.plist` method (Mac only)
- `registry.json` method (All)

### Step six: Manage Docker Desktop security

Use these features to manage your organization's security posture:

- Image Access Management:
  Control which types of images developers can pull from Docker Hub.
- Registry Access Management:
  Define which registries developers can access.
- Settings Management:
  Set and control Docker Desktop settings for your users.

## Next steps

- Plan your rollout to
  coordinate pilot testing and deployment with your IT teams.

- Manage Docker products to configure
  access and view usage.
- Configure
  Hardened Docker Desktop
  to tighten security for containerized development.
- Manage your domains
  so Docker users in your domain are part of your organization.
