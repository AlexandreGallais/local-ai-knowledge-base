---
title: "Azure Blob Storage cache"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/cache/backends/azblob.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Azure Blob Storage cache

The `azblob` cache store uploads your resulting build cache to
Azure's blob storage service.

This cache storage backend is not supported with the default `docker` driver.
To use this feature, create a new builder using a different driver. See
Build drivers for more information.

## Synopsis

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=azblob,name=<cache-image>[,parameters...] \
  --cache-from type=azblob,name=<cache-image>[,parameters...] .
```

The following table describes the available CSV parameters that you can pass to
`--cache-to` and `--cache-from`.

| Name                | Option                  | Type        | Default | Description                                        |
| ------------------- | ----------------------- | ----------- | ------- | -------------------------------------------------- |
| `name`              | `cache-to`,`cache-from` | String      |         | Required. The name of the cache image.             |
| `account_url`       | `cache-to`,`cache-from` | String      |         | Base URL of the storage account.                   |
| `secret_access_key` | `cache-to`,`cache-from` | String      |         | Blob storage account key, see authentication. |
| `mode`              | `cache-to`              | `min`,`max` | `min`   | Cache layers to export, see cache mode.       |
| `ignore-error`      | `cache-to`              | Boolean     | `false` | Ignore errors caused by failed cache exports.      |

## Authentication

The `secret_access_key`, if left unspecified, is read from environment variables
on the BuildKit server following the scheme for the
Azure Go SDK.
The environment variables are read from the server, not the Buildx client.

## Further reading

For an introduction to caching see Docker build cache.

For more information on the `azblob` cache backend, see the
BuildKit README.
