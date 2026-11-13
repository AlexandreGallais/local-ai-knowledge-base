---
title: "Customize a Docker Hardened Image or chart (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/customize.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Customize a Docker Hardened Image or chart (part 2 of 4)

## Customize a Docker Hardened Image

To add a customized Docker Hardened Image to your organization, an organization
owner must first mirror the DHI repository to your organization
on Docker Hub. Once the repository is mirrored, any user with access to the
mirrored DHI repository can create a customized image.

You can create customizations using either the DHI CLI or the Docker Hub web interface.

**Docker Hub**

1. Sign in to Docker Hub.
1. Select **My Hub**.
1. In the namespace drop-down, select your organization that has a mirrored DHI
   repository.
1. Select **Hardened Images** > **Manage** > **Mirrored Images**.
1. For the mirrored DHI repository you want to customize, select the menu icon in the far right column.
1. Select **Customize**.

   At this point, the on-screen instructions will guide you through the
   customization process. You can continue with the following steps for more
   details.

1. Select one or more images and versions you want to customize.

   When selecting multiple images and versions, all selections must share the
   same distribution and distribution version. For example, you can select
   `dhi-node:22_alpine3.23` and `dhi-python:3.13_alpine3.23` together (both
   Alpine 3.23), but you cannot mix `dhi-node:22_debian` with Alpine images, or
   mix different Alpine versions like `alpine3.23` and `alpine3.22`.

1. Select **Next**.
1. Optional. Add packages.

   1. In the packages drop-down, select the packages you want to add to the
      image.

      The packages available in the drop-down are OS system packages for the
      selected image variant. For version 3.23 and later Alpine-based images,
      these are hardened packages that have been built from source by Docker with
      cryptographic signatures and full supply chain security. For version 3.22
      Alpine-based images and Debian-based images, these are standard system
      packages.

   1. In the **OCI artifacts** drop-down, first, select the repository that
      contains the OCI artifact image. Then, select the tag you want to use from
      that repository. Finally, specify the specific paths you want to include
      from the OCI artifact image.

      The OCI artifacts are images that you have previously
      built and pushed to a repository in the same namespace as the mirrored
      DHI. For example, you can add a custom root CA certificate or another
      image that contains a tool you need, like adding Python to a Node.js
      image.

      You can add multiple OCI artifact images to a single customization. When
      you add more than one, they're applied in the order you add them in the
      **OCI artifacts** drop-down. If multiple images contain directories or
      files with the same path, images added later overwrite files from images
      added earlier. To manage this, you must select paths to include and
      optionally exclude from each OCI artifact image. This allows you to
      control which files are included in the final customized image.

      By default, no files are included from the OCI artifact image. You must
      explicitly include the paths you want. After including a path, you can
      then explicitly exclude files or directories underneath it.

      > **Note:**
      >
      > When files necessary for runtime are overwritten by OCI artifacts, the
      > image build still succeeds, but you may have issues when running the
      > image.

      For more details, see OCI artifacts.

   1. In the **Files** section, you can add, edit, or remove files.

      Files let you add static content to the container image that you can
      access at runtime, such as configuration files or setup scripts. Files
      are not executed during the build process. This is useful for services
      that require initialization before they start, such as setup scripts or
      file writes to directories like `/var/lock` or `/out`.

      You must specify the following:

      - The path where the file will be placed
      - The file content
      - The UID and GID ownership of the file
      - The octal file permissions of the file

      > **Note:**
      >
      > If your organization's DHI subscription is in the EU region, the
      > **Add** option in the **Files** section is greyed out. File content
      > isn't supported in the EU region. For details, see EU data
      > residency.

   1. In the **Symlinks** section, you can add, edit, or remove symbolic links.

      You must specify the following:

      - The path where the symlink will be placed
      - The source path that the symlink points to

      Optionally, you can specify the UID and GID ownership of the symlink.

1. Select **Next: Configure** to configure the following image settings:

   > **Note:**
   >
   > When customizing multiple images at once, many of these configuration
   > options are limited by default and may not be available.

   1. Specify the environment variables and their
      values that the image will contain.
   1. Add labels to the image.
   1. Add annotations to the image.
   1. Specify the users to add to the image. When you add a user, a home
      directory is automatically created for that user with 0755 permissions.
   1. Specify the user groups to add to the image.
   1. Select which user to run the images as.
   1. Add `ENTRYPOINT` arguments to the
      image. These arguments are appended to the base image's entrypoint.
   1. Add `CMD` arguments to the image. These
      arguments are appended to the base image's command.
   1. Override the default (`/`) working
      directory for the image.
   1. Specify a suffix for the customization name that is appended to the
      customized image's tag. For example, if you specify `custom` when
      customizing the `dhi-python:3.13` image, the customized image will be
      tagged as `dhi-python:3.13_custom`.
   1. Select the compression format for the image layers. You can choose between
      **ZSTD** (default) or **GZIP** compression. **ZSTD** typically provides
      faster image pulls and better compression ratios, but may have
      compatibility issues with older software. If you need compatibility with
      older Docker versions, use **GZIP**.
   1. Select the platforms you want to build the image for. You must select at
      least one platform.

1. Select **Next: Review customization**.

1. Select **Create Customization**.

   A summary of the customization appears. It may take some time for the image
   to build. Once built, it will appear in the **Tags** tab of the repository,
   and your team members can pull it like any other image.

**CLI**

Authenticate with `docker login` using your Docker credentials or a personal
access token (PAT) with **Read & Write**
permissions, or an organization access token
(OAT). When using an OAT, the
available operations depend on the token's permission scope:

- To list or get customizations, or to view build logs, the OAT must have read
  (pull) access to the destination repository. Results are scoped to
  repositories the OAT can access.
- To create, update, or delete a customization, the OAT must have push access to
  the destination repository. Bulk operations require push access to every
  referenced destination repository.

OIDC credentials <example-value> the same destination-repository permissions for
customization queries and mutations: pull access for reads and build logs, and
push access for changes. Pulling a built customized image and reading its
attestations also require pull access. See
Read DHI images and attestations with OIDC.

Use the `docker dhi customization` command:

```console
# Prepare a single customization scaffold
$ docker dhi customization prepare golang 1.25 \
  --org my-org \
  --destination my-org/dhi-golang \
  --name "golang with git" \
  > my-customization.yaml

# Prepare a bulk customization scaffold (pipe JSON array via stdin)
$ echo '[{"destination":"my-org/dhi-golang","tag-definition-id":"golang/alpine-3.23/1.24-dev"}]' \
  | docker dhi customization prepare --name "golang with git" --org my-org \
  > my-customization.yaml

# Create a customization
$ docker dhi customization create my-customization.yaml --org my-org

# List customizations
$ docker dhi customization list --org my-org

# Filter customizations by name, repository, or source
$ docker dhi customization list --org my-org --filter git
$ docker dhi customization list --org my-org --repo dhi-golang
$ docker dhi customization list --org my-org --source golang

# Get a customization by ID
$ docker dhi customization get <id> --org my-org

# Update a customization
$ docker dhi customization edit my-customization.yaml --org my-org

# Delete a customization by ID
$ docker dhi customization delete <id> --org my-org

# Delete without confirmation prompt
$ docker dhi customization delete <id> --org my-org --force
```

For a complete reference of all YAML fields, see
Image customization YAML file.

**Terraform**

You can manage DHI customizations as infrastructure-as-code using the DHI
Terraform provider. If you haven't configured the
provider yet, see DHI Terraform provider for setup
instructions.

Define a `dhi_customization` resource for each customization:

```hcl
resource "dhi_customization" "golang_with_git" {
  repository = "dhi-golang"
  name       = "golang with git"

  contents {
    packages = ["git", "curl"]
  }

  platform {
    os           = "linux"
    architecture = "amd64"
  }
}
```

The `dhi_customization` resource also supports optional configuration blocks
for `accounts`, `files`, `labels`, `annotations`, `environment`, `entrypoint`,
`cmd`, `user`, `workdir`, and `stop_signal`.

Run `terraform apply` to create the customization.

To edit a customization, update the resource configuration and run `terraform
apply`. To delete a customization, remove the resource and run `terraform apply`.

For the full list of resource attributes, see the Terraform Registry
documentation.

> **Note:**
>
> Monitoring customization builds is not available through the Terraform
> provider. Use the Docker Hub web interface or the DHI CLI to monitor builds.
