---
title: "Docker organization roles and permissions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/roles-and-permissions/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker organization roles and permissions

Roles determine what members can do in your Docker organization. When you
invite a user or create a team, you assign a role that grants permissions
for repositories, teams, and organization settings.

Docker provides two role types. Users and teams get either a core role or a
custom role, but not both.

## Core roles

Core roles are Docker's built-in Member, Editor, and Owner roles. Their
permissions are predefined. Use core roles when Docker's permission sets match
your organization's needs.

## Custom roles

Custom roles are permission sets you build by selecting individual
permissions, such as billing or team management. Use custom roles when you
need a combination that core roles don't offer. For example, you may create a custom role for a billing
administrator or a security auditor, or when you want to grant
least-privilege access.

Custom roles require a Docker Business subscription.

## Roles and team permissions

Roles apply organization-wide. Team permissions apply to specific
repositories. The two systems work together: a user's role sets their
organization-wide access and team membership can extend their access to
individual repositories.
