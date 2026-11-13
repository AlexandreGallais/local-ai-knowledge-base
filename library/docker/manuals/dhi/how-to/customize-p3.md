---
title: "Customize a Docker Hardened Image or chart (part 3 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/how-to/customize.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Customize a Docker Hardened Image or chart (part 3 of 4)

### Image customization YAML file

When using the CLI, customizations are defined in a YAML file. Use
`docker dhi customization prepare` to generate a scaffold with all available
fields and commented-out examples. Edit the file to describe what you want,
then pass it to `docker dhi customization create`.

The file has two parts: a preamble that identifies the customization and
its targets, and a configuration section that specifies what to change.

#### About the `id` field

The `id` field is assigned automatically by Docker Hub when you run
`docker dhi customization create`. When creating a new customization, omit
`id` entirely. It is read-only.

To find the ID of an existing customization, run:

```console
$ docker dhi customization list --org my-org
```

The `id` appears in the output and in files retrieved with
`docker dhi customization get <id> --org my-org`. It lets
`docker dhi customization edit` identify which customization to update.
Scaffolds from `docker dhi customization prepare` do not include `id`, and
that is expected.

#### Set targets

The `name` and `targets` fields are required in every customization file. The
`targets` array specifies which image versions the customization applies to.
Use a single entry for a single-image customization, or multiple entries for a
bulk customization that applies the same configuration to several images at
once.

```yaml
name: golang with git

targets:
  - destination: my-org/dhi-golang
    tag_definition_id: golang/alpine-3.23/1.25
```

| Field | Description |
|:---|:---|
| `name` | Human-readable name. Converted to lowercase and hyphenated, it becomes the image tag suffix. For example, `golang with git` produces tags ending in `_golang-with-git`. |
| `targets[].destination` | Destination repository in Docker Hub, such as `my-org/dhi-golang`. |
| `targets[].tag_definition_id` | Tag definition to customize, such as `golang/alpine-3.23/1.25`. Use `docker dhi customization prepare` with tab completion to find valid values. |

> **Note:**
>
> When `targets` has more than one entry, the fields `accounts`, `entrypoint`,
> and `cmd` are not supported. Including them causes `docker dhi customization
> create` to return an error.

#### Add packages

To install additional OS packages in your customized image, list them under
`contents.packages`. Available packages depend on the base image variant.

```yaml
contents:
  packages:
    - git
    - curl
```

#### Add OCI artifacts

To layer additional files into your customized image, such as custom
certificates, internal tools, or configuration files, list OCI artifact
images under `contents.artifacts`.

```yaml
contents:
  artifacts:
    - name: my-org/my-certs:latest
      includes:
        - etc/ssl/certs
      excludes:
        - etc/ssl/certs/old
```

| Field | Description |
|:---|:---|
| `name` | Image reference of the OCI artifact. Must be in the same Docker Hub namespace as the mirrored DHI. |
| `includes` | Paths to copy from the artifact. No files are included by default. You must list at least one path. |
| `excludes` | Paths to exclude after applying `includes`. |

To learn more about OCI artifacts, including how to create them, best
practices, and how environment variables behave, see
OCI artifacts.

#### Inject files into the image

To add static files at build time, such as configuration files or startup
scripts, use the `paths` field. Files are added as static content and are not
executed during the build.

```yaml
paths:
  - path: /etc/myconfig
    contents: |
      key=value
    mode: "0644"
    uid: 0
    gid: 0
```

| Field | Description |
|:---|:---|
| `path` | Absolute path where the file will be placed in the image. |
| `contents` | File content. Use a YAML block scalar (`\|`) for multi-line content. |
| `mode` | Octal file permissions, such as `"0644"`. Quote the value to prevent YAML from treating the leading zero as octal notation. |
| `uid` | User ID of the file owner. |
| `gid` | Group ID of the file owner. |

> **Note:**
>
> If your organization's DHI subscription is in the EU region, you can't add
> files with `contents` in the `paths` field. File content isn't supported in
> the EU region. For details, see EU data
> residency.

#### Configure user accounts

To add users or groups to the image, or to change which user the container
runs as, use the `accounts` field.

> **Note:**
>
> Not supported for bulk customizations (multiple `targets`).

```yaml
accounts:
  root: true
  runs-as: nonroot
  users:
    - name: nonroot
      uid: 65532
      gid: 65532
  groups:
    - name: nonroot
      gid: 65532
      members:
        - nonroot
```

| Field | Description |
|:---|:---|
| `root` | Whether to enable the root user. Default is `false`. Required if `runs-as` is set to `root`. |
| `runs-as` | The default user the container runs as. |
| `users[].name` | Username. |
| `users[].uid` | User ID. |
| `users[].gid` | Primary group ID. Optional. |
| `groups[].name` | Group name. |
| `groups[].gid` | Group ID. |
| `groups[].members` | Usernames to add to this group. Optional. |

#### Set environment variables

To add or override environment variables in the image, use the `environment`
field. These are merged with the base image's existing environment and do not
replace it.

```yaml
environment:
  MY_VAR: my_value
  DEBUG: "false"
```

Quote values that a YAML parser would interpret as non-string types, for
example `"false"`, `"0"`, and `"null"`.

#### Set labels and annotations

To add OCI metadata to the image, use `labels` and `annotations`. Labels are
stored in the image config; annotations are stored in the image manifest. Use
OCI standard keys
where applicable.

```yaml
labels:
  org.opencontainers.image.authors: your-email@example.com
  org.opencontainers.image.version: "1.0.0"

annotations:
  org.opencontainers.image.title: Custom hardened image
  org.opencontainers.image.description: Customized Docker Hardened Image
```

#### Override entrypoint and command

To change how the container starts, use `entrypoint` and `cmd`. These arguments
are appended to the base image's existing entrypoint and command.

> **Note:**
>
> Not supported for bulk customizations (multiple `targets`).

```yaml
entrypoint:
  - /docker-entrypoint.sh

cmd:
  - /bin/bash
```

#### Set platforms and compression

To build for multiple architectures, list them under `platforms`. At least one
platform is required.

```yaml
platforms:
  - linux/amd64
  - linux/arm64
```

To control layer compression, set `compression`. `ZSTD` (the default) offers
better compression and faster pulls. Use `GZIP` for compatibility with older
tooling.

```yaml
compression: ZSTD
```

## OCI artifacts

In DHI customization, OCI artifacts are Docker images containing files you
want to layer into your image, such as custom certificates, internal tools, or
configuration files.

### Create an OCI artifact image

Keep artifact images as minimal as possible and include only the necessary
files.

For example, to distribute a custom root CA certificate as part of a trusted CA
bundle, you can use a multi-stage build. This approach registers your
certificate with the system and outputs an updated CA bundle, which can be
extracted into a minimal final image:

```dockerfile
# syntax=docker/dockerfile:1

FROM dhi.io/bash:5-dev AS certs

ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /usr/local/share/ca-certificates/my-rootca
COPY certs/rootCA.crt /usr/local/share/ca-certificates/my-rootca

RUN update-ca-certificates

FROM scratch
COPY --from=certs /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
```

You can follow this pattern to create other OCI artifacts, such as images
containing tools or libraries that you want to include in your customized DHI.
Install the necessary tools or libraries in the first stage, and then copy the
relevant files to the final stage that uses `FROM scratch`. This ensures that
your OCI artifact is minimal and contains only the necessary files.

In order for the OCI artifact to be available in a DHI customization, it must be built and
pushed to a repository in the same namespace as the mirrored DHI repository.

If you're customizing a DHI for multiple platforms (such as `linux/amd64` and
`linux/arm64`), build your OCI artifact for all the platforms using the
`--platform` flag:

```console
$ docker buildx build --platform linux/amd64,linux/arm64 \
  -t <your-namespace>/my-oci-artifact:latest \
  --push .
```

This creates a single image manifest that you can use for each platform. The
customization build system automatically selects the correct platform variant
when building each customized image.

> **Important:**
>
> The customization UI will only allow you to select platforms that are
> available in all OCI artifacts you've added. If a platform is missing from
> any OCI artifact, you won't be able to select that platform for your
> customization.

Once pushed to a repository in your organization's namespace, the OCI artifact
automatically appears in the customization workflow when you select OCI
artifacts to add to your customized Docker Hardened Image.

### Environment variables

When you include OCI artifacts in a customization, the environment variables
defined in those artifacts are merged into the final image. The merge follows
these rules:

- Your customization's environment settings take precedence. An artifact's
  variable is only applied if the corresponding key is absent or empty in your
  customization.
- `PATH` is an exception. Artifact `PATH` entries are added to the front of
  the existing `PATH`, giving them runtime precedence.

This differs from `COPY --from` in a Dockerfile, which copies files without
inheriting environment variables from the source image. To avoid inheriting
environment variables, build the artifact using a `FROM scratch` final stage.
See Create an OCI artifact image.

### Best practices

Follow these best practices when creating OCI artifacts for DHI customizations:

- Use multi-stage builds: Build or install dependencies in a builder stage,
  then copy only the necessary files to a `FROM scratch` final stage. This keeps
  the OCI artifact minimal and avoids inheriting environment variables from the
  builder image into your customization.

- Include only essential files: OCI artifacts should contain only the files
  you need to add to the customized image. Avoid including package managers,
  shells, or other utilities that won't be used in the final image.

- Match target platforms: Build your OCI artifact for all platforms you plan
  to use in your customizations. Use `docker buildx build --platform` to create
  multi-platform images when needed.

- Use specific tags: Tag your OCI artifacts with specific versions or dates
  (like `v1.0` or `20250101`) rather than relying solely on `latest`. This
  ensures reproducible builds and makes it easier to track which artifacts are
  used in which customizations.

- Enable immutable tags: Consider enabling immutable
  tags for your
  OCI artifact repositories. This prevents accidental overwrites and ensures that
  each version of your OCI artifact remains unchanged, improving reproducibility
  and reliability of your customizations.
