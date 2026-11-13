---
title: "Build context (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/concepts/context.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Build context (part 2 of 2)

## .dockerignore files

You can use a `.dockerignore` file to exclude files or directories from the
build context.

```text
# .dockerignore
node_modules
bar
```

This helps avoid sending unwanted files and directories to the builder,
improving build speed, especially when using a remote builder.

### Filename and location

When you run a build command, the build client looks for a file named
`.dockerignore` in the root directory of the context. If this file exists, the
files and directories that match patterns in the files are removed from the
build context before it's sent to the builder.

If you use multiple Dockerfiles, you can use different ignore-files for each
Dockerfile. You do so using a special naming convention for the ignore-files.
Place your ignore-file in the same directory as the Dockerfile, and prefix the
ignore-file with the name of the Dockerfile, as shown in the following example.

```text
.
├── index.ts
├── src/
├── docker
│   ├── build.Dockerfile
│   ├── build.Dockerfile.dockerignore
│   ├── lint.Dockerfile
│   ├── lint.Dockerfile.dockerignore
│   ├── test.Dockerfile
│   └── test.Dockerfile.dockerignore
├── package.json
└── package-lock.json
```

A Dockerfile-specific ignore-file takes precedence over the `.dockerignore`
file at the root of the build context if both exist.

### Syntax

The `.dockerignore` file is a newline-separated list of patterns similar to the
file globs of Unix shells. Leading and trailing slashes in ignore patterns are
disregarded. The following patterns all exclude a file or directory named `bar`
in the subdirectory `foo` under the root of the build context:

- `/foo/bar/`
- `/foo/bar`
- `foo/bar/`
- `foo/bar`

If a line in `.dockerignore` file starts with `#` in column 1, then this line
is considered as a comment and is ignored before interpreted by the CLI.

```gitignore
#/this/is/a/comment
```

If you're interested in learning the precise details of the `.dockerignore`
pattern matching logic, check out the
moby/patternmatcher repository
on GitHub, which contains the source code.

#### Matching

The following code snippet shows an example `.dockerignore` file.

```text
# comment
*/temp*
*/*/temp*
temp?
```

This file causes the following build behavior:

| Rule        | Behavior                                                                                                                                                                                                      |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `# comment` | Ignored.                                                                                                                                                                                                      |
| `*/temp*`   | Exclude files and directories whose names start with `temp` in any immediate subdirectory of the root. For example, the plain file `/somedir/temporary.txt` is excluded, as is the directory `/somedir/temp`. |
| `*/*/temp*` | Exclude files and directories starting with `temp` from any subdirectory that is two levels below the root. For example, `/somedir/subdir/temporary.txt` is excluded.                                         |
| `temp?`     | Exclude files and directories in the root directory whose names are a one-character extension of `temp`. For example, `/tempa` and `/tempb` are excluded.                                                     |

Matching is done using Go's
`filepath.Match` function rules.
A preprocessing step uses Go's
`filepath.Clean` function
to trim whitespace and remove `.` and `..`.
Lines that are blank after preprocessing are ignored.

> **Note:**
>
> For historical reasons, the pattern `.` is ignored.

Beyond Go's `filepath.Match` rules, Docker also supports a special wildcard
string `**` that matches any number of directories (including zero). For
example, `**/*.go` excludes all files that end with `.go` found anywhere in the
build context.

You can use the `.dockerignore` file to exclude the `Dockerfile` and
`.dockerignore` files. These files are still sent to the builder as they're
needed for running the build. But you can't copy the files into the image using
`ADD`, `COPY`, or bind mounts.

#### Negating matches

You can prepend lines with a `!` (exclamation mark) to make exceptions to
exclusions. The following is an example `.dockerignore` file that uses this
mechanism:

```text
*.md
!README.md
```

All markdown files right under the context directory _except_ `README.md` are
excluded from the context. Note that markdown files under subdirectories are
still included.

The placement of `!` exception rules influences the behavior: the last line of
the `.dockerignore` that matches a particular file determines whether it's
included or excluded. Consider the following example:

```text
*.md
!README*.md
README-secret.md
```

No markdown files are included in the context except README files other than
`README-secret.md`.

Now consider this example:

```text
*.md
README-secret.md
!README*.md
```

All of the README files are included. The middle line has no effect because
`!README*.md` matches `README-secret.md` and comes last.

## Named contexts

In addition to the default build context (the positional argument to the
`docker build` command), you can also pass additional named contexts to builds.

Named contexts are specified using the `--build-context` flag, followed by a
name-value pair. This lets you include files and directories from multiple
sources during the build, while keeping them logically separated.

```console
$ docker build --build-context docs=./docs .
```

In this example:

- The named `docs` context points to the `./docs` directory.
- The default context (`.`) points to the current working directory.

### Using named contexts in a Dockerfile

Dockerfile instructions can reference named contexts as if they are stages in a
multi-stage build.

For example, the following Dockerfile:

1. Uses a `COPY` instruction to copy files from the default context into the
   current build stage.
2. Bind mounts the files in a named context to process the files as part of the
   build.

```dockerfile
# syntax=docker/dockerfile:1
FROM buildbase
WORKDIR /app

# Copy all files from the default context into /app/src in the build container
COPY . /app/src
RUN make bin

# Mount the files from the named "docs" context to build the documentation
RUN --mount=from=docs,target=/app/docs \
    make manpages
```

### Use cases for named contexts

Using named contexts allows for greater flexibility and efficiency when
building Docker images. Here are some scenarios where using named contexts can
be useful:

#### Example: combine local and remote sources

You can define separate named contexts for different types of sources. For
example, consider a project where the application source code is local, but the
deployment scripts are stored in a Git repository:

```console
$ docker build --build-context scripts=https://github.com/user/deployment-scripts.git .
```

In the Dockerfile, you can use these contexts independently:

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine:latest

# Copy application code from the main context
COPY . /opt/app

# Run deployment scripts using the remote "scripts" context
RUN --mount=from=scripts,target=/scripts /scripts/main.sh
```

#### Example: dynamic builds with custom dependencies

In some scenarios, you might need to dynamically inject configuration files or
dependencies into the build from external sources. Named contexts make this
straightforward by allowing you to mount different configurations without
modifying the default build context.

```console
$ docker build --build-context config=./configs/prod .
```

Example Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1
FROM nginx:alpine

# Use the "config" context for environment-specific configurations
COPY --from=config nginx.conf /etc/nginx/nginx.conf
```

#### Example: pin or override images

You can refer to named contexts in a Dockerfile the same way you can refer to
an image. That means you can change an image reference in your Dockerfile by
overriding it with a named context. For example, given the following
Dockerfile:

```dockerfile
FROM alpine:{{% param example_alpine_version %}}
```

If you want to force image reference to resolve to a different version, without
changing the Dockerfile, you can pass a context with the same name to the
build. For example:

```console
docker buildx build --build-context alpine:{{% param example_alpine_version %}}=docker-image://alpine:edge .
```

The `docker-image://` prefix marks the context as an image reference. The
reference can be a local image or an image in your registry.

### Named contexts with Bake

Bake is a tool built into `docker build` that
lets you manage your build configuration with a configuration file. Bake fully
supports named contexts.

To define named contexts in a Bake file:

```hcl
target "app" {
  contexts = {
    docs = "./docs"
  }
}
```

This is equivalent to the following CLI invocation:

```console
$ docker build --build-context docs=./docs .
```

#### Linking targets with named contexts

In addition to making complex builds more manageable, Bake also provides
additional features on top of what you can do with `docker build` on the CLI.
You can use named contexts to create build pipelines, where one target depends
on and builds on top of another. For example, consider a Docker build setup
where you have two Dockerfiles:

- `base.Dockerfile`: for building a base image
- `app.Dockerfile`: for building an application image

The `app.Dockerfile` uses the image produced by `base.Dockerfile` as it's base
image:

```dockerfile
FROM mybaseimage
```

Normally, you would have to build the base image first, and then either load it
to Docker Engine's local image store or push it to a registry. With Bake, you
can reference other targets directly, creating a dependency between the `app`
target and the `base` target.

```hcl
target "base" {
  dockerfile = "base.Dockerfile"
}

target "app" {
  dockerfile = "app.Dockerfile"
  contexts = {
    # the target: prefix indicates that 'base' is a Bake target
    mybaseimage = "target:base"
  }
}
```

With this configuration, references to `mybaseimage` in `app.Dockerfile` use
the results from building the `base` target. Building the `app` target will
also trigger a rebuild of `mybaseimage`, if necessary:

```console
$ docker buildx bake app
```

### Further reading

For more information about working with named contexts, see:

- `--build-context` CLI reference
- Using Bake with additional contexts
