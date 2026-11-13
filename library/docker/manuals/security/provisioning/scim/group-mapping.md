---
title: "Map identity provider groups to Docker teams"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/security/provisioning/scim/group-mapping.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Map identity provider groups to Docker teams

Group mapping synchronizes groups from your identity provider (IdP) with teams
in your Docker organization. For example, when you add a developer to the
`moby:backend` group in your IdP, Docker adds them to the `backend` team in the
`moby` organization.

Use group mapping to manage team membership through SAML SSO, SCIM, or both.

> **Tip:**
>
> Use group mapping to add users to multiple organizations or teams. To assign
> each user to one organization or team, you can use SCIM
> user-level attributes.

## Prerequisites

Before you begin, you must have:

- SSO configured for your organization
- Administrator access to Docker Home and your identity provider

## How group mapping works

Group mapping uses IdP attributes to keep Docker Team membership synchronized:

- With SAML SSO, the IdP sends group membership when a user signs in.
- With SCIM, the IdP synchronizes group membership on its provisioning
  schedule.
- Docker identifies users by email address. Each Docker account must have a
  unique email address.
- Docker creates teams when a mapped group references a team that doesn't
  exist.

## Set up group mapping

To configure group mapping:

- Create groups in your IdP using Docker's naming format
- Configure your IdP to send group data
- Add users to the groups
- Test that membership synchronizes

You can use group mapping with SAML SSO alone or with SCIM for user lifecycle
management.

### Group naming format

Create groups in your IdP using the format: `organization:team`.

For example:

- For the "developers" team in the "moby" organization: `moby:developers`
- For multi-organization access: `moby:backend` and `whale:desktop`

Docker creates teams automatically if they don't already exist when groups sync.

### Supported attributes

| Attribute | Description |
| :--- | :--- |
| `id` | Unique ID of the group in UUID format. This attribute is read-only. |
| `displayName` | Group name in the `organization:team` format. |
| `members` | A list of users that are members of this group. |
| `members(x).value` | Unique ID of a user in the group. |

## Configure group mapping with SSO

Use group mapping with SSO connections that use the SAML authentication method.

> **Note:**
>
> Group mapping through SSO isn't supported with the Microsoft Entra ID OIDC
> authentication method. Use SCIM to synchronize groups for OIDC connections.

**Okta**

The IdP interface may differ from these steps. For more information, see the
Okta documentation.

To set up group mapping:

1. Sign in to Okta and open your application.
1. Navigate to the **SAML Settings** page for your application.
1. In **Group Attribute Statements (optional)**, configure these values:
   - **Name**: `groups`
   - **Name format**: `Unspecified`
   - **Filter**: **Starts with** and `organization:`, where `organization` is
     your Docker organization name
1. Create your groups by selecting **Directory**, then **Groups**.
1. Add groups in the `organization:team` format that match your Docker
   organization and team names.
1. Assign users to the groups.

The next time users sign in, Docker maps them to the teams you defined.

**Entra ID**

The IdP interface may differ from these steps. For more information, see the
Microsoft Entra ID documentation.

To set up group mapping:

1. Sign in to Entra ID and open your application.
1. Select **Manage**, then **Single sign-on**.
1. Select **Add a group claim**.
1. In **Group Claims**, select **Groups assigned to the application** with the
   source attribute **Cloud-only group display names**.
1. Select **Advanced options**, then the **Filter groups** option.
1. Configure the attribute like the following:
   - **Attribute to match**: `Display name`
   - **Match with**: `Contains`
   - **String**: `:`
1. Select **Save**.
1. Select **Groups** > **All groups** > **New group** to create your groups.
1. Assign users to the groups.

The next time users sign in, Docker maps them to the teams you defined.

## Configure group mapping with SCIM

Use group mapping with SCIM to synchronize membership on your IdP's
provisioning schedule. Before you begin,
set up SCIM.

**Okta**

The IdP interface may differ from these steps. For more information, see the
Okta documentation.

To set up your groups:

1. Sign in to Okta and open your application.
1. Select **Applications**, then **Provisioning**, and **Integration**.
1. Select **Edit**, enable **Push Groups**, then select **Save**. The
   **Push Groups** tab appears in your application.
1. Create your groups by navigating to **Directory** and selecting **Groups**.
1. Add groups in the `organization:team` format that match your Docker
   organization and team names.
1. Assign users to the groups.
1. Return to **Integration**, then select **Push Groups**.
1. Select **Push Groups**, then **Find groups by rule**.
1. Configure the groups by rule like the following:
   - Enter a rule name, such as `Sync groups with Docker`.
   - Match groups by name. For example, use **Starts with** and `moby:`, or
     **Contains** and `:` for multiple organizations.
   - To sync after changes to groups or assignments, enable
     **Immediately push groups by rule**.

Find the rule under **By rule** in the **Pushed Groups** column. Matching groups
appear in the groups table.

To push the groups from this table:

1. Select **Group in Okta**.
1. Select the **Push Status** drop-down.
1. Select **Push Now**.

**Entra ID**

The IdP interface may differ from these steps. For more information, see the
Microsoft Entra ID documentation.

1. Sign in to Entra ID and go to your application.
1. In your application, select **Provisioning**, then **Mappings**.
1. Select **Provision Microsoft Entra ID Groups**.
1. Set **Enabled** to **Yes**.
1. Confirm these attribute mappings:
   - `displayName` to `displayName`
   - `objectId` to `externalId`
   - `members` to `members`
1. Select **Save**.

Next, set up group mapping:

1. Go to **Users and groups**.
1. Select **Add user/group**.
1. Select groups that use the `organization:team` format.
1. Select **Assign**.
1. Go to **Provisioning** and select **Start provisioning**.

To verify the sync, select **Monitor**, then **Provisioning logs**. In Docker
Home, confirm that members appear in the mapped teams.

After synchronization, Docker adds users to the organizations and teams mapped
in the IdP.

> **Tip:**
>
> Enable SCIM to provision and deprovision users
> automatically. Group mapping through SSO manages team membership but doesn't
> deprovision users.

## Next steps

- Assign roles to
  organization members.
- Enforce sign-in for
  your organization.
