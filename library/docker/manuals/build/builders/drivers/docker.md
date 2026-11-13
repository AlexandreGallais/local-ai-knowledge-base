---
title: "Docker driver"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/builders/drivers/docker.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

The Buildx Docker driver is the default driver. It uses the BuildKit server
components built directly into the Docker Engine. The Docker driver requires no
configuration.

Unlike the other drivers, builders using the Docker driver can't be manually
created. They're only created automatically from the Docker context.

Images built with the Docker driver are automatically loaded to the local image
store.

## Synopsis

```console
# The Docker driver is used by buildx by default
docker buildx build .
```

It's not possible to configure which BuildKit version to use, or to pass any
additional BuildKit parameters to a builder using the Docker driver. The
BuildKit version and parameters are preset by the Docker Engine internally.

If you need additional configuration and flexibility, consider using the
Docker container driver.

## Further reading

For more information on the Docker driver, see the
buildx reference.
