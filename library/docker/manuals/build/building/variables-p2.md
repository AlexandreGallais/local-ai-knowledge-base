---
title: "Build variables (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/variables.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Build variables (part 2 of 3)

## Build tool configuration variables

The following environment variables enable, disable, or change the behavior of Buildx and BuildKit.
Note that these variables aren't used to configure the build container;
they aren't available inside the build and they have no relation to the `ENV` instruction.
They're used to configure the Buildx client, or the BuildKit daemon.

| Variable                                                                    | Type              | Description                                                     |
|-----------------------------------------------------------------------------|-------------------|-----------------------------------------------------------------|
| BUILDKIT_COLORS                                         | String            | Configure text color for the terminal output.                   |
| BUILDKIT_HOST                                             | String            | Specify host to use for remote builders.                        |
| BUILDKIT_PROGRESS                                     | String            | Configure type of progress output.                              |
| BUILDKIT_TTY_LOG_LINES                           | String            | Number of log lines (for active steps in TTY mode).             |
| BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP | Boolean           | Disable environment lookups in Bake definitions.                |
| BUILDX_BAKE_FILE                                       | String            | Specify the build definition file(s) for `docker buildx bake`.  |
| BUILDX_BAKE_FILE_RELATIVE_PATHS         | Boolean           | Resolve local build contexts from their definition file.        |
| BUILDX_BAKE_FILE_SEPARATOR                   | String            | Specify the file-path separator for `BUILDX_BAKE_FILE`.         |
| BUILDX_BAKE_GIT_ADVICE                           | Boolean           | Show Git advice when fetching remote Bake definitions.          |
| BUILDX_BAKE_GIT_AUTH_HEADER                 | String            | HTTP authentication scheme for remote Bake files.               |
| BUILDX_BAKE_GIT_AUTH_TOKEN                   | String            | HTTP authentication token for remote Bake files.                |
| BUILDX_BAKE_GIT_SSH                                 | String            | SSH authentication for remote Bake files.                       |
| BUILDX_BUILDER                                           | String            | Specify the builder instance to use.                            |
| BUILDX_CONFIG                                             | String            | Specify location for configuration, state, and logs.            |
| BUILDX_CPU_PROFILE                                   | String            | Generate a `pprof` CPU profile at the specified location.       |
| BUILDX_EXPERIMENTAL                                 | Boolean           | Turn on experimental features.                                  |
| BUILDX_GIT_CHECK_DIRTY                           | Boolean           | Enable dirty Git checkout detection.                            |
| BUILDX_GIT_INFO                                         | Boolean           | Remove Git information in provenance attestations.              |
| BUILDX_GIT_LABELS                                     | String \| Boolean | Add Git provenance labels to images.                            |
| BUILDX_MEM_PROFILE                                   | String            | Generate a `pprof` memory profile at the specified location.    |
| BUILDX_METADATA_PROVENANCE                   | String \| Boolean | Customize provenance information included in the metadata file. |
| BUILDX_METADATA_WARNINGS                       | String            | Include build warnings in the metadata file.                    |
| BUILDX_NO_DEFAULT_ATTESTATIONS           | Boolean           | Turn off default provenance attestations.                       |
| BUILDX_NO_DEFAULT_OCI_ARTIFACT           | Boolean           | Turn off OCI artifact storage for attestations by default.      |
| BUILDX_NO_DEFAULT_LOAD                           | Boolean           | Turn off loading images to image store by default.              |
| BUILDX_SEND_GIT_QUERY_AS_INPUT           | Boolean           | Resolve Git URL queries in Buildx for frontend compatibility.   |
| EXPERIMENTAL_BUILDKIT_SOURCE_POLICY | String            | Specify a BuildKit source policy file.                          |

BuildKit also supports a few additional configuration parameters. Refer to
BuildKit built-in build args.

You can express Boolean values for environment variables in different ways.
For example, `true`, `1`, and `T` all evaluate to true.
Evaluation is done using the `strconv.ParseBool` function in the Go standard library.
See the reference documentation for details.

### BUILDKIT_COLORS

Changes the colors of the terminal output. Set `BUILDKIT_COLORS` to a CSV string
in the following format:

```console
$ export BUILDKIT_COLORS="run=123,20,245:error=yellow:cancel=blue:warning=white"
```

Color values can be any valid RGB hex code, or one of the
BuildKit predefined colors.

Setting `NO_COLOR` to anything turns off colorized output, as recommended by
no-color.org.

### BUILDKIT_HOST

You use the `BUILDKIT_HOST` to specify the address of a BuildKit daemon to use
as a remote builder. This is the same as specifying the address as a positional
argument to `docker buildx create`.

Usage:

```console
$ export BUILDKIT_HOST=tcp://localhost:1234
$ docker buildx create --name=remote --driver=remote
```

If you specify both the `BUILDKIT_HOST` environment variable and a positional
argument, the argument takes priority.

### BUILDKIT_PROGRESS

Sets the type of the BuildKit progress output. Valid values are:

- `auto` (default): automatically uses `tty` in interactive terminals, `plain` otherwise
- `plain`: displays build steps sequentially in simple text format
- `tty`: interactive output with formatted progress bars and build steps
- `quiet`: suppresses progress output, only shows errors and final image ID
- `none`: no progress output, only shows errors
- `rawjson`: outputs build progress as raw JSON (useful for parsing by other tools)

Usage:

```console
$ export BUILDKIT_PROGRESS=plain
```

### BUILDKIT_TTY_LOG_LINES

You can change how many log lines are visible for active steps in TTY mode by
setting `BUILDKIT_TTY_LOG_LINES` to a number (default to `6`).

```console
$ export BUILDKIT_TTY_LOG_LINES=8
```

### EXPERIMENTAL_BUILDKIT_SOURCE_POLICY

Lets you specify a
BuildKit source policy
file for creating reproducible builds with pinned dependencies.

```console
$ export EXPERIMENTAL_BUILDKIT_SOURCE_POLICY=./policy.json
```

Example:

```json
{
  "rules": [
    {
      "action": "CONVERT",
      "selector": {
        "identifier": "docker-image://docker.io/library/alpine:latest"
      },
      "updates": {
        "identifier": "docker-image://docker.io/library/alpine:latest@sha256:4edbd2beb5f78b1014028f4fbb99f3237d9561100b6881aabbf5acce2c4f9454"
      }
    },
    {
      "action": "CONVERT",
      "selector": {
        "identifier": "https://raw.githubusercontent.com/moby/buildkit/v0.10.1/README.md"
      },
      "updates": {
        "attrs": {"http.checksum": "sha256:6e4b94fc270e708e1068be28bd3551dc6917a4fc5a61293d51bb36e6b75c4b53"}
      }
    },
    {
      "action": "DENY",
      "selector": {
        "identifier": "docker-image://docker.io/library/golang*"
      }
    }
  ]
}
```

### BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP

Set `BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP=1` to prevent Bake definitions from
reading variable values from the process environment. For HCL input, this
disables environment overrides of declared variables. It also disables the
implicit environment lookup for `--set app.arg.NAME` when no value is given.

For example, keep the Bake file's default `TAG` even when the shell defines
a `TAG` environment variable:

```console
$ BUILDX_BAKE_DISABLE_VARS_ENV_LOOKUP=1 TAG=dev docker buildx bake --print
```

You can still pass <example-value> explicitly with `--var TAG=dev` or
`--set app.arg.NAME=value`.

For Compose input, this setting excludes the process environment from variable
interpolation. Bake still loads `.env` from the working directory and accepts
explicit `--var` values. The setting doesn't disable environment variables
used to configure Buildx itself, such as `BUILDX_BUILDER`.

### BUILDX_BAKE_FILE

Specify one or more build definition files for `docker buildx bake`.

This environment variable provides an alternative to the `-f` / `--file` command-line flag.

Multiple files can be specified by separating them with the system path separator (":" on Linux/macOS, ";" on Windows):

```console
export BUILDX_BAKE_FILE=file1.hcl:file2.hcl
```

Or with a custom separator defined by the BUILDX_BAKE_FILE_SEPARATOR variable:

```console
export BUILDX_BAKE_FILE_SEPARATOR=@
export BUILDX_BAKE_FILE=user@example.com
```

If both `BUILDX_BAKE_FILE` and the `-f` flag are set, only the files provided via `-f` are used.

If a listed file does not exist or is invalid, bake returns an error.

### BUILDX_BAKE_FILE_RELATIVE_PATHS

By default, Bake resolves local directory paths in `target.context` and
`target.contexts` from the directory where you run the command. Set
`BUILDX_BAKE_FILE_RELATIVE_PATHS=1` to resolve these paths from the definition
file instead.

For HCL files, each path is relative to the Bake file that defines it. An
omitted `context` uses `.` relative to the file that defines the target.
For Compose input, paths are relative to the first Compose file's directory,
including paths added by override files.

For example, if `build/docker-bake.hcl` contains `context = "./src"`, the
following command uses `build/src` as its context:

```console
$ BUILDX_BAKE_FILE_RELATIVE_PATHS=1 \
    docker buildx bake -f build/docker-bake.hcl
```

Use the `cwd://` prefix, such as `context = "cwd://src"`, to keep a path
relative to the invocation directory. Absolute paths, remote URLs, and
special contexts such as `target:app` keep their existing meaning.

### BUILDX_BAKE_FILE_SEPARATOR

Controls the separator used between file paths in the `BUILDX_BAKE_FILE` environment variable.

This is useful if your file paths contain the default separator character or if you want to standardize separators across different platforms.

```console
export BUILDX_BAKE_PATH_SEPARATOR=@
export BUILDX_BAKE_FILE=user@example.com
```

### BUILDX_BAKE_GIT_ADVICE

Set `BUILDX_BAKE_GIT_ADVICE=1` to show Git advice messages while fetching a
remote Bake definition. Advice includes messages such as Git's detached HEAD
notice. Advice is disabled by default.

```console
$ BUILDX_BAKE_GIT_ADVICE=1 docker buildx bake --progress=plain \
    https://github.com/user/myrepo.git
```

This variable controls fetching the Bake definition. To show advice for Git
build contexts, pass the `BUILDKIT_GIT_ADVICE` build argument instead:

```console
$ docker buildx build --progress=plain --build-arg BUILDKIT_GIT_ADVICE=1 \
    https://github.com/user/myrepo.git
```

See the
built-in arguments.

### BUILDX_BAKE_GIT_AUTH_HEADER

Sets the HTTP authentication scheme when using a remote Bake definition in a private Git repository.
This is equivalent to the `GIT_AUTH_HEADER` secret,
but facilitates the pre-flight authentication in Bake when loading the remote Bake file.
Supported values are `bearer` (default) and `basic`.

Bake also uses this scheme when authenticating Git build contexts on the
same host as the remote definition. See
`BUILDX_BAKE_GIT_AUTH_TOKEN` for details.

Usage:

```console
$ export BUILDX_BAKE_GIT_AUTH_HEADER=basic
```

### BUILDX_BAKE_GIT_AUTH_TOKEN

Sets the HTTP authentication token when using a remote Bake definition in a private Git repository.
This is equivalent to the `GIT_AUTH_TOKEN` secret,
but facilitates the pre-flight authentication in Bake when loading the remote Bake file.

Usage:

```console
$ export BUILDX_BAKE_GIT_AUTH_TOKEN=$(cat git-token.txt)
```

When you build from a remote Bake definition, Bake also uses this token to
authenticate Git build contexts on the same host. For example, a definition
fetched from `https://git.example.com/team/app.git` can use the token for a
Git context on `git.example.com`. Private Git contexts on other hosts need
separate credentials.

Bake determines which host can use these credentials from the remote
definition URL.

When you use only local Bake definition files, `BUILDX_BAKE_GIT_AUTH_TOKEN`
and `BUILDX_BAKE_GIT_AUTH_HEADER` don't provide credentials for Git build
contexts. Configure
Git authentication secrets
for those contexts instead.

### BUILDX_BAKE_GIT_SSH

Lets you specify a list of SSH agent socket filepaths to forward to Bake
for authenticating to a Git server when using a remote Bake definition in a private repository.
This is similar to SSH mounts for builds, but facilitates the pre-flight authentication in Bake when resolving the build definition.

Setting this environment is typically not necessary, because Bake will use the `SSH_AUTH_SOCK` agent socket by default.
You only need to specify this variable if you want to use a socket with a different filepath.
This variable can take multiple paths using a comma-separated string.

Usage:

```console
$ export BUILDX_BAKE_GIT_SSH=/run/foo/listener.sock,~/.creds/ssh.sock
```

### BUILDX_BUILDER

Overrides the configured builder instance. Same as the `docker buildx --builder`
CLI flag.

Usage:

```console
$ export BUILDX_BUILDER=my-builder
```

### BUILDX_CONFIG

You can use `BUILDX_CONFIG` to specify the directory to use for build
configuration, state, and logs. The lookup order for this directory is as
follows:

- `$BUILDX_CONFIG`
- `$DOCKER_CONFIG/buildx`
- `~/.docker/buildx` (default)

Usage:

```console
$ export BUILDX_CONFIG=/usr/local/etc
```

For repository- and scope-specific credentials <example-value> under this directory,
see Registry authentication.

### BUILDX_CPU_PROFILE

If specified, Buildx generates a `pprof` CPU profile at the specified location.

> **Note:**
> This property is only useful for when developing Buildx. The profiling data
> is not relevant for analyzing a build's performance.

Usage:

```console
$ export BUILDX_CPU_PROFILE=buildx_cpu.prof
```

### BUILDX_EXPERIMENTAL

Enables experimental build features.

Usage:

```console
$ export BUILDX_EXPERIMENTAL=1
```

### BUILDX_GIT_CHECK_DIRTY

When set to true, checks for dirty state in source control information for
provenance attestations.

Usage:

```console
$ export BUILDX_GIT_CHECK_DIRTY=1
```

### BUILDX_GIT_INFO

When set to false, removes source control information from
provenance attestations.

Usage:

```console
$ export BUILDX_GIT_INFO=0
```
