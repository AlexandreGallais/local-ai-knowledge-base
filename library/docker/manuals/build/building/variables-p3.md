---
title: "Build variables (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/variables.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Build variables (part 3 of 3)

### BUILDX_GIT_LABELS

Adds provenance labels, based on Git information, to images that you build. The
labels are:

- `com.docker.image.source.entrypoint`: Location of the Dockerfile relative to
  the project root
- `org.opencontainers.image.revision`: Git commit revision
- `org.opencontainers.image.source`: SSH or HTTPS address of the repository

Example:

```json
  "Labels": {
    "com.docker.image.source.entrypoint": "Dockerfile",
    "org.opencontainers.image.revision": "5734329c6af43c2ae295010778cd308866b95d9b",
    "org.opencontainers.image.source": "git@github.com:foo/bar.git"
  }
```

Usage:

- Set `BUILDX_GIT_LABELS=1` to include the `entrypoint` and `revision` labels.
- Set `BUILDX_GIT_LABELS=full` to include all labels.

If the repository is in a dirty state, the `revision` gets a `-dirty` suffix.

### BUILDX_MEM_PROFILE

If specified, Buildx generates a `pprof` memory profile at the specified
location.

> **Note:**
> This property is only useful for when developing Buildx. The profiling data
> is not relevant for analyzing a build's performance.

Usage:

```console
$ export BUILDX_MEM_PROFILE=buildx_mem.prof
```

### BUILDX_METADATA_PROVENANCE

By default, Buildx includes minimal provenance information in the metadata file
through `--metadata-file` flag.
This environment variable allows you to customize the provenance information
included in the metadata file:
* `min` sets minimal provenance (default).
* `max` sets full provenance.
* `disabled`, `false` or `0` does not set any provenance.

### BUILDX_METADATA_WARNINGS

By default, Buildx does not include build warnings in the metadata file through
`--metadata-file` flag.
You can set this environment variable to `1` or `true` to include them.

### BUILDX_NO_DEFAULT_ATTESTATIONS

By default, BuildKit v0.11 and later adds
provenance attestations to images you
build. Set `BUILDX_NO_DEFAULT_ATTESTATIONS=1` to disable the default provenance
attestations.

Usage:

```console
$ export BUILDX_NO_DEFAULT_ATTESTATIONS=1
```

### BUILDX_NO_DEFAULT_OCI_ARTIFACT

Starting with BuildKit v0.32.0, BuildKit stores attestations as OCI artifacts
when OCI media types are enabled. Set `BUILDX_NO_DEFAULT_OCI_ARTIFACT=1` to
make Buildx set `oci-artifact=false` when the build uses an exporter that
supports attestations and you haven't explicitly set the `oci-artifact`
exporter attribute.

Usage:

```console
$ export BUILDX_NO_DEFAULT_OCI_ARTIFACT=1
```

### BUILDX_NO_DEFAULT_LOAD

When you build an image using the `docker` driver, the image is automatically
loaded to the image store when the build finishes. Set `BUILDX_NO_DEFAULT_LOAD`
to disable automatic loading of images to the local container store.

Usage:

```console
$ export BUILDX_NO_DEFAULT_LOAD=1
```

### BUILDX_SEND_GIT_QUERY_AS_INPUT

Set `BUILDX_SEND_GIT_QUERY_AS_INPUT=1` to use Git URL queries with a BuildKit
daemon or Dockerfile frontend that doesn't support the Git query-string
format. Buildx resolves the Git URL into a source input instead of requiring
the frontend to interpret the query. The default is `false`.

For example, select a tag and verify its commit while using an older builder:

```console
$ BUILDX_SEND_GIT_QUERY_AS_INPUT=1 docker buildx build \
    'https://github.com/moby/buildkit.git?tag=v0.21.1&checksum=66735c67'
```

This applies to the main Git context and additional Git contexts that use
URL queries. It changes how the context is represented in provenance:
the context is supplied as a source input instead of the usual context
string. If you consume provenance, account for that difference before
enabling the setting in your workflow.

See Git URL queries for query syntax.
