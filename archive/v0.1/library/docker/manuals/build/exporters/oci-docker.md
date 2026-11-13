---
title: "OCI and Docker exporters"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/exporters/oci-docker.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# OCI and Docker exporters

The `oci` exporter outputs the build result into an
OCI image layout
tarball. The `docker` exporter behaves the same way, except it exports a Docker
image layout instead.

The `docker` driver doesn't support these exporters. You
must use `docker-container` or some other driver if you want to generate these
outputs.

## Synopsis

Build a container image using the `oci` and `docker` exporters:

```console
$ docker buildx build --output type=oci[,parameters] .
```

```console
$ docker buildx build --output type=docker[,parameters] .
```

The following table describes the available parameters:

| Parameter           | Type                                   | Default | Description                                                                                                                                    |
| ------------------- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`              | String                                 |         | Specify image name(s)                                                                                                                          |
| `dest`              | String                                 |         | Path                                                                                                                                           |
| `tar`               | `true`,`false`                         | `true`  | Bundle the output into a tarball layout                                                                                                        |
| `compression`       | `uncompressed`,`gzip`,`estargz`,`zstd` | `gzip`  | Compression type, see compression                                                                                                         |
| `compression-level` | `0..22`                                |         | Compression level, see compression                                                                                                        |
| `force-compression` | `true`,`false`                         | `false` | Forcefully apply compression, see compression                                                                                             |
| `oci-mediatypes`    | `true`,`false`                         |         | Use OCI media types in exporter manifests. Defaults to `true` for `type=oci`, and `false` for `type=docker`. See OCI Media types          |
| `annotation.<key>`  | String                                 |         | Attach an annotation with the respective `key` and `value` to the built image, see annotations                                            |
| `rewrite-timestamp` | `true`,`false`                         | `false` | Rewrite the file timestamps to the `SOURCE_DATE_EPOCH` value. See build reproducibility for how to specify the `SOURCE_DATE_EPOCH` value. |

## Annotations

These exporters support adding OCI annotation using `annotation` parameter,
followed by the annotation name using dot notation. The following example sets
the `org.opencontainers.image.title` annotation:

```console
$ docker buildx build \
    --output "type=<type>,name=<registry>/<image>,annotation.org.opencontainers.image.title=<title>" .
```

For more information about annotations, see
BuildKit documentation.

## Further reading

For more information on the `oci` or `docker` exporters, see the
BuildKit README.
