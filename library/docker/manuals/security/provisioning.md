---
title: "User provisioning overview"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/provisioning/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# User provisioning overview

After you configure single sign-on (SSO), choose how Docker creates accounts
and adds users to your organization. Organization owners configure
provisioning. For a company, the company owner configures it.
SSO requires a Docker Business subscription.

## Choose a provisioning method

Provisioning creates and updates accounts from your identity provider (IdP). Docker supports these methods:

| Provisioning method | When it runs | Lifecycle management | Default setting |
| :--- | :--- | :--- | :--- |
| System for Cross-domain Identity Management (SCIM) | On the IdP's synchronization schedule or through Provision on Demand | Creates and updates users, synchronizes configured groups, and deprovisions users | Disabled |
| Just-in-Time (JIT) | When a user signs in through SSO | Creates users and applies attributes from the SSO assertion. It doesn't deprovision users | Enabled when you configure SSO |
| Auto-provisioning | When an existing Docker user signs in or verifies their email, and that address uses a verified domain | Adds the user to the organization. It doesn't create or deprovision accounts | Disabled |

After you choose a provisioning method, you can enable group mapping to assign
users to one or more Docker organizations and teams. Group mapping works only
with SAML SSO or SCIM.

> **Important:**
>
> Using JIT and auto-provisioning on the same domain can cause unexpected
> results. Avoid enabling both for a domain that's part of an SSO connection.

## Manage JIT and SCIM together

You must have at least one provisioning method enabled when you configure an SSO connection. By default Docker turns on JIT provisioning. If you want to turn JIT off, then you must have SCIM enabled; conversely, if you want to turn SCIM off, you must re-enable JIT. If you
enable SCIM and JIT together, choose which one manages users and attributes. Review
how SCIM works with JIT before choosing.

## Set attribute names in the identity provider

When a user signs in through SSO, Docker identifies the account and keeps
its email address and full name current based on what the IdP sends. IdPs
use different claim names for those two attributes. In your identity provider,
set the full name and the email address each to a claim name Docker already
accepts. Docker uses the name you set to store the value on the signed-in
user's account. See
SSO and SAML attributes
for the accepted claim names.

Organization, team, and role are not attributes you set for SSO sign-in, and
your identity provider does not include them. For SCIM, you create custom
attributes in the identity provider and set the external names to `dockerOrg`,
`dockerTeam`, and `dockerRole`. The IdP sends those names to Docker. Docker
recognizes each name, places the user in that organization and team, and
assigns the role. See
Set up role mapping
for how to create the attributes.

## Next steps

Choose the provisioning method that fits your organization:

- Add and manage domains
  to add, verify, and manage domains for auto-provisioning.
- SCIM provisioning to sync
  user data between your IdP and Docker.
- Just-in-Time (JIT) provisioning
  to create user accounts on first SSO sign-in.
- Auto-provisioning to
  add users whose email addresses match a verified domain.
- Troubleshoot provisioning
  if users get the wrong role or team after you change methods.
