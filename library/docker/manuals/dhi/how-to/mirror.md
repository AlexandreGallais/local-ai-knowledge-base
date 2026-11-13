---
title: "Mirror a Docker Hardened Image repository (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/mirror.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

Mirroring requires a DHI Select or Enterprise subscription. Without a
subscription, you can pull Docker Hardened Images directly from `dhi.io` without
mirroring. With a DHI Select or Enterprise subscription, you must mirror to your
organization to get:

- Compliance variants (FIPS-enabled or STIG-ready images)
- Extended Lifecycle Support (ELS) variants (requires add-on)
- Image or Helm chart customization
- Air-gapped or restricted network environments
- SLA-backed security updates

## How to mirror

This topic covers two types of mirroring for Docker Hardened Image (DHI)
repositories:

- Mirror to your organization:
  Mirror a DHI repository to your organization's namespace on Docker Hub.

- Mirror to a third-party
  registry: Mirror a
  repository to another container registry, such as Amazon ECR, Google Artifact
  Registry, or a private Harbor instance.

## Mirror a DHI repository to your organization

Organization owners, editors, and members with a custom role
that includes the DHI mirroring permission can create, view, and manage mirrors.
When using the CLI or Terraform, you can also mirror using an organization
access token (OAT) with the
appropriate permission scopes, without requiring role-based access.

When a member with a custom role that includes the DHI mirroring permission
creates a mirror, Docker automatically creates and manages the
`dhi-mirroring-admins` team in your organization, adds that member to it, and
grants the team access to the new mirror. This lets the member manage mirrors
they create without organization owner or editor access. Mirrors created by
organization owners or editors don't use this team. Removing members from this
team may affect their ability to view and manage mirrors.

You can mirror image and chart repositories to your organization's namespace on
Docker Hub. Mirroring makes the repositories available within your organization
and lets you customize them for your environment:

- Image repositories: Mirroring lets you customize images by adding packages,
  OCI artifacts (such as custom certificates or additional tools), environment
  variables, labels, and other configuration settings. For more details, see
  Customize a Docker Hardened Image.

- Chart repositories: Mirroring lets you customize image references within
  the chart. This is particularly useful when using customized images or when
  you've mirrored images to a third-party registry and need the chart to
  reference those custom locations. For more details, see Customize a Docker
  Hardened Helm chart.

**Docker Hub**

1. Go to Docker Hub and sign in.
2. Select **My Hub**.
3. In the namespace drop-down, select your organization.
4. Select **Hardened Images** > **Catalog**.
5. Select a DHI repository to view its details.
6. Mirror the repository:
    - To mirror an image repository, select **Use this image** > **Mirror
      repository**, and then follow the on-screen instructions. If you have the ELS add-on, you can also
      select **Enable support for end-of-life versions**.
    - To mirror a Helm chart repository, select **Use this chart**, and then follow the on-screen instructions.

It may take a few minutes for all the tags to finish mirroring.

**CLI**

Authenticate with `docker login` using your Docker credentials, a personal
access token (PAT) with **Read & Write**
permissions, or an organization access token
(OAT). When using an OAT, the
available operations depend on the token's permission scope:

- To list mirrored repositories, the OAT must have read (pull) access to the
  relevant repositories. Results are scoped to repositories the OAT can access.
- To create a mirror to an existing destination repository, the OAT must have
  push access to that repository. To create a mirror to a new destination
  repository that doesn't yet exist, the OAT must have org-wide repository
  access (for example, `<org>/*` with pull or push). Repository-scoped access to
  the future repository name is not sufficient.
- To stop mirroring, the OAT must have push access to the relevant repository.
- OATs with public repository read-only access cannot list or manage mirrored
  repositories.

Use the `docker dhi mirror` command:

```console
$ docker dhi mirror start --org my-org \
  dhi/golang,my-org/dhi-golang \
  dhi/nginx,my-org/dhi-nginx \
  dhi/prometheus-chart,my-org/dhi-prometheus-chart
```

Mirror with dependencies:

```console
$ docker dhi mirror start --org my-org dhi/golang,my-org/dhi-golang --dependencies
```

List mirrored images in your organization:

```console
$ docker dhi mirror list --org my-org
```

Filter mirrored images by name or type:

```console
$ docker dhi mirror list --org my-org --filter python
$ docker dhi mirror list --org my-org --type image
$ docker dhi mirror list --org my-org --type helm-chart
```

**Terraform**

You can manage DHI mirrors as infrastructure-as-code using the DHI Terraform
provider.

Define a `dhi_mirror` resource for each repository you want to mirror:

```hcl
resource "dhi_mirror" "golang" {
  source_namespace = "dhi"
  source_name      = "golang"
  destination_name = "dhi-golang"
}

resource "dhi_mirror" "nginx" {
  source_namespace = "dhi"
  source_name      = "nginx"
  destination_name = "dhi-nginx"
}
```

To enable Extended Lifecycle Support (ELS) variants, set the `els` attribute:

```hcl
resource "dhi_mirror" "golang" {
  source_namespace = "dhi"
  source_name      = "golang"
  destination_name = "dhi-golang"
  els              = true
}
```

Run `terraform apply` to create the mirrors.

For the full list of resource attributes, see the Terraform Registry
documentation.

After mirroring, the repository appears in your organization's repository list,
prefixed by `dhi-`, and continues to receive updated images. It behaves like any
other Docker Hub repository, so you can manage access and permissions, configure
webhooks, and use other standard Hub features. See Docker Hub
repositories for details.

### Mirrors in the EU region

If your organization's DHI subscription is in the EU region, Docker creates
your mirrored repositories on Docker Hub in the EU. Mirrors created before your
subscription moved to the EU region stay in their original region. For
details, including how to get a subscription in the EU region, see EU data
residency.

### Stop mirroring a repository

After you stop mirroring, the repository remains, but it no longer receives
updates. You can still use the last images or charts that were mirrored.

> **Note:**
>
> If you only want to stop mirroring ELS versions, you can clear the ELS
> option in the mirrored repository's **Settings** tab.

**Docker Hub**

1. Go to Docker Hub and sign in.
2. Select **My Hub**.
3. In the namespace drop-down, select your organization that has access to DHI.
4. Select **Hardened Images** > **Manage**.
5. Select the **Mirrored Images** or **Mirrored Helm charts** tab.
6. In the far right column of the repository you want to stop mirroring, select the menu icon.
7. Select **Stop mirroring**.

**CLI**

Authenticate with `docker login` using your Docker credentials, a personal
access token (PAT) with **Read & Write**
permissions, or an organization access token
(OAT) with push access to the
relevant repository.

Use the `docker dhi mirror` command:

```console
$ docker dhi mirror stop --org my-org dhi-golang
```

**Terraform**

To stop mirroring, remove the `dhi_mirror` resource from your Terraform
configuration and run `terraform apply`. The repository remains in your
organization but no longer receives updates.
