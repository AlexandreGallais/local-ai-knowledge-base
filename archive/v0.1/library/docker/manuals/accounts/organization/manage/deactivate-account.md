---
title: "Deactivate an organization"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/accounts/organization/manage/deactivate-account.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deactivate an organization

Learn how to deactivate a Docker organization, including required prerequisite
steps. For information about deactivating user accounts, see
Deactivate a Docker
account.

> **Warning:**
>
> All Docker products and services that use this organization are
> inaccessible after you deactivate it. Your individual Docker account
> remains active.

## Prerequisites

You must complete all the following steps before you can deactivate your
organization:

- Download any images and tags you want to keep. Use `docker pull -a <image>`
  to pull all tags, or `docker pull <image>:<tag>` to pull a specific tag.
- If you have an active Docker subscription, downgrade it to a basic
  organization
  account.
- Remove all other members within the organization.
- Unlink your GitHub and Bitbucket
  accounts.
- For Business organizations, remove your SSO
  connection.

## Deactivate

> **Warning:**
>
> Deactivating an organization is permanent and can't be undone. Make sure
> you've gathered all the data you need before you deactivate it.

1. Sign in to Docker Home and select the organization
   you want to deactivate.
1. Select **Organization settings**, then **Deactivate**. If the **Deactivate**
   button is unavailable, confirm you've completed all
   Prerequisites.
1. Enter the organization name to confirm deactivation.
1. Select **Deactivate organization**.
