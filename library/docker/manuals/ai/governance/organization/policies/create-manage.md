---
title: "Create and manage organization policies"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/governance/organization/policies/create-manage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Create and manage organization policies

Create and manage organization policies in Docker Home. The steps are the same
for network, filesystem, and MCP policies, and only the rules you add differ.
To manage policies programmatically instead, use the
AI Governance API. For how scope, rule
evaluation, and precedence work, see Organization policies.

## Before you begin

You need the organization
owner role, or a
custom role
with the **Governance** permissions.

## Create a policy

1. Sign in to Docker Home and select your
   organization.
1. In the left-hand navigation, expand **AI Platform** and select
   **Network access**, **Filesystem access**, or **MCP access**.
1. Select **Create policy**.
1. Enter a **Policy name**.
1. Set the **Scope** to **Organization** or **Teams**. If you select **Teams**,
   choose the teams the policy applies to. For more details, see
   Scope policies to teams.
1. Define the policy rules.
   - Network and filesystem policies: select **Add rule** for each rule. For a
     network policy, see
     What a network rule can match.
     For a filesystem policy, see
     Filesystem mount rule syntax.
   - MCP policies: enter Cedar statements in the policy editor. For more
     details, see Organization MCP access policies.
1. For a network policy, set **Require approval before access** if developers
   should confirm each destination before a sandbox can reach it. The policy's
   detail page reports approval as **Required** or **Not required**. For more
   details, see Approval-required access.

For the number of policies and rules you can create, see
Organization policy limits.

## Scope policies to teams

To scope a policy to teams, the teams must already exist in your organization.
Create teams and manage their members in one of two ways:

- Manually, by
  creating teams in
  Docker Home.
- Automatically, by using
  group mapping
  to synchronize your identity provider's groups with the teams in your
  organization. Group mapping creates teams that don't already exist and keeps
  their membership in step with your IdP groups.

A team-scoped policy follows team membership, so when someone joins or leaves a
team, including through IdP sync, the policies that apply to them update
automatically. For how org-wide and team-scoped policies combine, see
Policy scope.

## Edit or delete a policy

1. Sign in to Docker Home and select your
   organization.
1. In the left-hand navigation, expand **AI Platform** and select
   **Network access**, **Filesystem access**, or **MCP access**.
1. Find the policy in the list. Each policy is listed with its name, scope,
   rule count, and last update.
1. Select the action menu (⋮) for the policy, then select **Edit**, or delete
   the policy.
1. If you're editing, make your changes and select **Save**.

Editing a policy replaces it in full. For example, turning off **Require
approval before access** on a network policy removes the requirement from every
rule in that policy. Changes reach developer machines within 5 minutes. For more
details, see
When policy changes reach developers.

## Configure a support message

Administrators can add an optional support message that appears after the policy denial
details when an organization policy blocks a sandbox action. Use it to
point members to an internal support channel, ticket queue, or security contact.

To set the message:

1. Sign in to Docker Home and select your
   organization.
1. In the left-hand navigation, expand **AI Platform** and select **Manage**.
1. In **Support message**, enter up to 500 characters.

   The **Support message** field appears only when **AI governance** is turned
   on. For more details, see
   Turn on AI governance.
1. Select **Save changes**.

Docker shows the message only for denials caused by an organization policy and
for requests an
approval-required policy blocks. If you
leave it blank, Docker shows the policy denial without additional contact text.
