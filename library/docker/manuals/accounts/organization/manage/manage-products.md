---
title: "Manage usage and access for Docker products"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/accounts/organization/manage/manage-products.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage usage and access for Docker products

Use this page to learn how to control and monitor product access and usage
for your organization's members.

## How product access and usage works

Members receive access to products through seats, licenses, and the controls
you configure:

- A member uses one seat on a Docker Team or Business
  subscription. The seat
  includes the products in the plan, such as Docker Desktop and Docker Hub.
- Some products need a separate
  license that
  you assign to teams or members.
- After a member has a seat or license, the controls on this page set what
  they can do in each product, such as which Hub images they can pull,
  which repositories Scout analyzes, or whether Docker Offload v1 is
  available in Docker Desktop.

Where a product has a usage allowance, the **Usage** section shows where to
check how much of it the organization has used. Products measure that
allowance in different units, such as build minutes, Hub pulls, or runtime
minutes.

This page covers product access, but does not cover access tokens.
For organization access tokens,
see Access tokens.

## Docker Desktop

For setup and configuration, see the Docker Desktop manual.

### Access

To manage Docker Desktop access:

1. Enforce sign-in.
1. Manage members manually or use
   provisioning.

With sign-in enforced, only members of your organization can use Docker
Desktop after they sign in.

Image Access and Registry Access are Docker Desktop controls. Image Access
limits which images members can pull from Docker Hub. Registry Access
limits which registries Docker Desktop can reach.

1. Sign in to Docker Home and select your
   organization, then select **Docker Desktop**.
1. Select **Registry Access** to configure
   Registry Access Management.
1. Select **Image Access** to control
   Image Access Management.

### Usage

Desktop insights shows how members use Docker Desktop, including active
users, builds, containers, images, and extensions.

1. Sign in to Docker Home and select your
   organization.
1. Select **Docker Desktop**, then
   **Desktop insights**.

## Docker Hub

For setup and configuration, see the Docker Hub manual.

### Usage

Hub usage counts how many times members pull images and how much space
your organization's repositories take up.

1. Sign in to Docker Home and select your
   organization.
1. Select **Go to Hub**.
1. Select **Usage**, then **Pulls** or **Storage**. For example,
   `https://hub.docker.com/orgs/{namespace}/usage`.

## Docker Build Cloud

For setup and configuration, see the Docker Build Cloud manual.

### Access

To set up Docker Build Cloud, sign in to
Docker Build Cloud and follow the on-screen
instructions.

To manage Docker Build Cloud access:

1. Sign in to Docker Home and select your
   organization.
1. Select **Build Cloud**, then **Account settings**.
1. Select **Lock access to Docker Build Account**.

> **Warning:**
>
> **Lock access to Docker Build Account** removes the ability to use cloud
> builders or build minutes, and it purges build data.

### Usage

Build minutes are the time your organization spends on cloud builds.

1. Sign in to Docker Home and select your
   organization.
1. Select **Build Cloud**, then **Build minutes**.

## Docker Scout

For setup and configuration, see the Docker Scout manual.

### Access

To set up Docker Scout, sign in to Docker Scout
and follow the on-screen instructions.

To manage Docker Scout access:

1. Sign in to Docker Home, then select
   Docker Scout.
1. Select your organization, then **Settings**.
1. To manage which repositories Docker Scout analyzes, select
   **Repository settings**. See
   Repository settings.
1. To manage Docker Scout for local images in Docker Desktop, use
   Settings Management
   and set **SBOM indexing** (`sbomIndexing`) to **Enabled**, **Disabled**,
   or **User defined**. **Enabled** indexes images when they are inspected
   in Docker Desktop or with Docker Scout CLI commands.

### Usage

Repository settings
lists the repositories Docker Scout analyzes. Follow the access steps above
and select **Repository settings**.

## Testcontainers Cloud

For setup and configuration, see
Get started with Testcontainers Cloud.

### Access

To set up Testcontainers Cloud, sign in to
Testcontainers Cloud and follow the
on-screen instructions.

To manage access to Testcontainers Cloud:

1. Sign in to Testcontainers Cloud,
   then select the menu icon.
1. Select **Account**, then **Settings**.
1. Select **Lock access to Testcontainers Cloud**.

### Usage

Billing shows the Testcontainers Cloud runtime minutes included with your
subscription.

1. Sign in to Docker Home and select your
   organization.
1. Select **Go to Testcontainers Cloud**.
1. Select the menu icon, then
   **Billing**.

## Docker Offload v1

For setup and configuration, see the Docker Offload v1 manual.

Docker Offload v1 uses its own license. Assign it to
teams or members, or turn on automatic assignment so members receive a
license the first time they use Docker Offload v1.

### Access

**Offload access** turns Docker Offload v1 on or off for the organization.
**Disabled** removes the ability for anybody in the organization, including
CI/CD, to use Offload resources or consume Offload minutes.

1. Sign in to Docker Home and select your
   organization.
1. Select **Docker Offload**, then **Offload access**.
1. Set **Enable Docker Offload** to **Enabled** or **Disabled**.
1. When Offload is enabled, select **Allow GPU access** to let members run
   GPU workloads in cloud mode.

To set the Docker Offload v1 default inside Docker Desktop, use Settings
Management:

1. Select **Docker Desktop**, then **Settings Management**.
1. Set **Enable Docker Offload** to one of these configurations:
   - **Always enabled**: Offload stays on, and members cannot turn it off.
   - **Enabled**: Offload is on by default, and members can turn it off.
   - **Disabled**: Offload is off by default, and members can turn it on.
   - **Always disabled**: Offload stays off, and members cannot turn it on.
   - **User defined**: Docker Desktop does not enforce a default. Members
     choose whether to turn Offload on.
1. Select **Save**.

For more details on Settings Management, see the Settings
reference.

### Usage

Offload activity shows Docker Offload v1
sessions, including how long they ran and which images they used.

1. Sign in to Docker Home and select your
   organization.
1. Select **Docker Offload**, then **Offload activity**.

## AI Governance

For setup and configuration, see
Docker Sandboxes and
AI Governance.

AI Governance is the separate paid subscription that adds the
organization-level controls to
Docker Sandboxes: policies for what
members' local sandboxes can reach on the network, mount from the filesystem,
or call through MCP, plus sign-in enforcement and audit logs.

### Access

Organization policies govern only members who hold an AI Governance license.

- Manage licenses: assign AI Governance licenses to
  teams or members, or turn on **Automatic license assignment** so members
  receive a license when they run `sbx login`.
- Organization policies:
  create network, filesystem, and MCP policies under **AI Platform** in Docker
  Home, and scope them to the whole organization or to specific teams.
- Sign-in enforcement:
  deploy a configuration through your endpoint management tooling so
  `sbx login` succeeds only for members of your organization.

### Usage

- View licenses: the **Licenses** page
  shows how many AI Governance licenses you have, how many are assigned, and
  whether the assignments go to teams or to individual members.
- View and export audit events:
  **AI Platform** > **Audit logs** shows the policy decisions Docker recorded
  for members' sandboxes, including who made the request, which resource it
  targeted, and whether Docker allowed or denied it.

## Next steps

- Manage subscription seats to add seats, and
  Manage licenses to assign product licenses.
- Invite and manage organization members to invite people
  and assign roles.
- Plan and maintain user access to choose roles,
  provisioning, and how you review access.
