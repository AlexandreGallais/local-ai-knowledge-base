---
title: "Using build policies (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/policies/usage.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Using build policies (part 2 of 2)

## Advanced: Policy configuration

This section covers advanced policy loading mechanisms and configuration
options.

### Automatic policy loading

Buildx automatically loads policies that match your Dockerfile name. When you
build with `Dockerfile`, Buildx looks for `Dockerfile.rego` in the same
directory. For a file named `app.Dockerfile`, it looks for
`app.Dockerfile.rego`.

```text
project/
├── Dockerfile
├── Dockerfile.rego          # Loaded automatically for Dockerfile
├── app.Dockerfile
├── app.Dockerfile.rego      # Loaded automatically for app.Dockerfile
└── src/
```

This automatic loading means you don't need command-line flags in most cases.
Create the policy file alongside your Dockerfile and build:

```console
$ docker buildx build .
```

Buildx detects `Dockerfile.rego` and evaluates it before running the build.

> **Note:**
> Policy files must be in the same directory as the Dockerfile they validate.
> Buildx doesn't search parent directories or subdirectories.

### When policies don't load

If Buildx can't find a matching `.rego` file, the build proceeds without policy
evaluation. To require policies and fail if none are found, use strict mode:

```console
$ docker buildx build --policy strict=true .
```

This fails the build if no policy loads or if the BuildKit daemon doesn't
support policies.

### Manual policy configuration

The `--policy` flag lets you specify additional policies, override automatic
loading, or control policy behavior.

Basic <example-value>:

```console
$ docker buildx build --policy filename=custom.rego .
```

This loads `custom.rego` in addition to the automatic `Dockerfile.rego` (if it
exists).

Multiple policies:

```console
$ docker buildx build --policy filename=policy1.rego --policy filename=policy2.rego .
```

All policies must pass for the build to succeed. Use this to enforce layered
requirements (base policy + project-specific rules).

Available options:

| Option              | Description                                             | Example                       |
| ------------------- | ------------------------------------------------------- | ----------------------------- |
| `filename=`   | Load policy from specified file                         | `filename=custom.rego`        |
| `reset=true`        | Ignore automatic policies, use only specified ones      | `reset=true`                  |
| `disabled=true`     | Disable all policy evaluation                           | `disabled=true`               |
| `strict=true`       | Fail if BuildKit doesn't support policies               | `strict=true`                 |
| `log-level=<level>` | Control policy logging (error, warn, info, debug, none). Use `debug` to see complete input JSON and unresolved fields | `log-level=debug`             |

Combine options with commas:

```console
$ docker buildx build --policy filename=extra.rego,strict=true .
```

### Exploring sources with policy eval

The `docker buildx policy eval` command lets you quickly explore and test
sources without running a build.

#### Inspect input structure with --print

Use `--print` to see the input structure for any source without running policy
evaluation:

```console
$ docker buildx policy eval --print https://github.com/moby/buildkit.git
```

```json
{
  "git": {
    "schema": "https",
    "host": "github.com",
    "remote": "https://github.com/moby/buildkit.git"
  }
}
```

Test different source types:

```console
# HTTP downloads
$ docker buildx policy eval --print https://releases.hashicorp.com/terraform/1.5.0/terraform.zip

# Images (requires docker-image:// prefix)
$ docker buildx policy eval --print docker-image://alpine:3.19

# Local context
$ docker buildx policy eval --print .
```

Shows information parsed from the source without fetching. Use `--fields` to
fetch specific metadata (see above).

#### Test with specific policy files

The `--file` flag (`-f`) specifies which policy file to load by providing the base
Dockerfile name (without the `.rego` extension). This is useful for testing
sources against policies associated with different Dockerfiles.

For example, to test a source against the policy for `app.Dockerfile`:

```console
$ docker buildx policy eval --file app.Dockerfile .
```

This loads `app.Dockerfile.rego` and tests whether it allows the source `.`
(the local directory). The flag defaults to `Dockerfile` if not specified.

Test different sources against your policy:

```console
$ docker buildx policy eval --file app.Dockerfile \
    https://github.com/org/repo.git
$ docker buildx policy eval --file app.Dockerfile docker-image://alpine:3.19
```

To read the policy from standard input instead, use `--file -`. Buildx reads
the policy directly, without appending `.rego` to the filename:

```console
$ cat app.Dockerfile.rego | docker buildx policy eval --file - \
    docker-image://alpine:3.19
```

#### Evaluate a specific platform

Use `--platform` to choose the platform whose image metadata the policy
evaluates. Without it, Buildx uses the first platform of the builder's first
worker.

```console
$ docker buildx policy eval --platform linux/arm64 \
    docker-image://alpine:3.19
$ docker buildx policy eval --platform linux/arm64 --print \
    --fields image.labels docker-image://alpine:3.19
```

### Reset automatic loading

To use only your specified policies and ignore automatic `.rego` files:

```console
$ docker buildx build --policy reset=true,filename=custom.rego .
```

This skips `Dockerfile.rego` and loads only `custom.rego`.

### Disable policies temporarily

Disable policy evaluation for testing or emergencies:

```console
$ docker buildx build --policy disabled=true .
```

The build proceeds without any policy checks. Use this carefully - you're
bypassing security controls.

## Next steps

- Write unit tests for your policies: Test build policies
- Debug policy failures: Debugging
- Browse working examples: Example policies
- Reference all input fields: Input reference
