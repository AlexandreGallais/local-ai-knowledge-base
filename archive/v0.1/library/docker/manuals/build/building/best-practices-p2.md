---
title: "Building best practices (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/best-practices.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Building best practices (part 2 of 3)

## Dockerfile instructions

Follow these recommendations on how to properly use the Dockerfile instructions
to create an efficient and maintainable Dockerfile.

> **Tip:**
>
> To improve linting, code navigation, and vulnerability scanning of your Dockerfiles in Visual Studio Code
> see the Docker DX extension.

### FROM

Whenever possible, use current official images as the basis for your
images. Docker recommends the Alpine image as it
is tightly controlled and small in size (under 6 MB), while still
being a full Linux distribution.

For more information about the `FROM` instruction, see Dockerfile reference for the FROM instruction.

### LABEL

You can add labels to your image to help organize images by project, record
licensing information, to aid in automation, or for other reasons. For each
label, add a line beginning with `LABEL` with one or more key-value pairs.
The following examples show the different acceptable formats. Explanatory comments are included inline.

Strings with spaces must be quoted or the spaces must be escaped. Inner
quote characters (`"`), must also be escaped. For example:

```dockerfile
# Set one or more individual labels
LABEL com.example.version="0.0.1-beta"
LABEL vendor1="ACME Incorporated"
LABEL vendor2=ZENITH\ Incorporated
LABEL com.example.release-date="2015-02-12"
LABEL com.example.version.is-production=""
```

An image can have more than one label. Prior to Docker 1.10, it was recommended
to combine all labels into a single `LABEL` instruction, to prevent extra layers
from being created. This is no longer necessary, but combining labels is still
supported. For example:

```dockerfile
# Set multiple labels on one line
LABEL com.example.version="0.0.1-beta" com.example.release-date="2015-02-12"
```

The above example can also be written as:

```dockerfile
# Set multiple labels at once, using line-continuation characters to break long lines
LABEL vendor=ACME\ Incorporated \
      com.example.is-beta= \
      com.example.is-production="" \
      com.example.version="0.0.1-beta" \
      com.example.release-date="2015-02-12"
```

See Understanding object labels
for guidelines about acceptable label keys and values. For information about
querying labels, refer to the items related to filtering in
Managing labels on objects.
See also LABEL in the Dockerfile reference.

### RUN

Split long or complex `RUN` statements on multiple lines separated with
backslashes to make your Dockerfile more readable, understandable, and
maintainable.

For example, you can chain commands with the `&&` operator, and use
escape characters to break long commands into multiple lines.

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    package-bar \
    package-baz \
    package-foo
```

By default, backslash escapes a newline character, but you can change it with
the `escape` directive.

You can also use here documents to run multiple commands without chaining them
with a pipeline operator:

```dockerfile
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends \
    package-bar \
    package-baz \
    package-foo
EOF
```

For more information about `RUN`, see Dockerfile reference for the RUN instruction.

#### apt-get

One common use case for `RUN` instructions in Debian-based images is to install
software using `apt-get`. Because `apt-get` installs packages, the `RUN
apt-get` command has several counter-intuitive behaviors to look out for.

Always combine `RUN apt-get update` with `apt-get install` in the same `RUN`
statement. For example:

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    package-bar \
    package-baz \
    package-foo
```

Using `apt-get update` alone in a `RUN` statement causes caching issues and
subsequent `apt-get install` instructions to fail. For example, this issue will occur in the following Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1

FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y --no-install-recommends curl
```

After building the image, all layers are in the Docker cache. Suppose you later
modify `apt-get install` by adding an extra package as shown in the following Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1

FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y --no-install-recommends curl nginx
```

Docker sees the initial and modified instructions as identical and reuses the
cache from previous steps. As a result the `apt-get update` isn't executed
because the build uses the cached version. Because the `apt-get update` isn't
run, your build can potentially get an outdated version of the `curl` and
`nginx` packages.

Using `RUN apt-get update && apt-get install -y --no-install-recommends` ensures your Dockerfile
installs the latest package versions with no further coding or manual
intervention. This technique is known as cache busting. You can also achieve
cache busting by specifying a package version. This is known as version pinning.
For example:

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    package-bar \
    package-baz \
    package-foo=1.3.*
```

Version pinning forces the build to retrieve a particular version regardless of
what’s in the cache. This technique can also reduce failures due to unanticipated changes
in required packages.

Below is a well-formed `RUN` instruction that demonstrates all the `apt-get`
recommendations.

```dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends \
    aufs-tools \
    automake \
    build-essential \
    curl \
    dpkg-sig \
    libcap-dev \
    libsqlite3-dev \
    mercurial \
    reprepro \
    ruby1.9.1 \
    ruby1.9.1-dev \
    s3cmd=1.1.* \
    && rm -rf /var/lib/apt/lists/*
```

The `s3cmd` argument specifies a version `1.1.*`. If the image previously
used an older version, specifying the new one causes a cache bust of `apt-get
update` and ensures the installation of the new version. Listing packages on
each line can also prevent mistakes in package duplication.

In addition, when you clean up the apt cache by removing `/var/lib/apt/lists` it
reduces the image size, since the apt cache isn't stored in a layer. Since the
`RUN` statement starts with `apt-get update`, the package cache is always
refreshed prior to `apt-get install`.

Official Debian and Ubuntu images automatically run `apt-get clean`, so explicit invocation is not required.

#### Using pipes

Some `RUN` commands depend on the ability to pipe the output of one command into another, using the pipe character (`|`), as in the following example:

```dockerfile
RUN wget -O - https://some.site | wc -l > /number
```

Docker executes these commands using the `/bin/sh -c` interpreter, which only
evaluates the exit code of the last operation in the pipe to determine success.
In the example above, this build step succeeds and produces a new image so long
as the `wc -l` command succeeds, even if the `wget` command fails.

If you want the command to fail due to an error at any stage in the pipe,
prepend `set -o pipefail &&` to ensure that an unexpected error prevents the
build from inadvertently succeeding. For example:

```dockerfile
RUN set -o pipefail && wget -O - https://some.site | wc -l > /number
```

> **Note:**
>
> Not all shells support the `-o pipefail` option.
>
> In cases such as the `dash` shell on
> Debian-based images, consider using the _exec_ form of `RUN` to explicitly
> choose a shell that does support the `pipefail` option. For example:
>
> ```dockerfile
> RUN ["/bin/bash", "-c", "set -o pipefail && wget -O - https://some.site | wc -l > /number"]
> ```

### CMD

The `CMD` instruction should be used to run the software contained in your
image, along with any arguments. `CMD` should almost always be used in the form
of `CMD ["executable", "param1", "param2"]`. Thus, if the image is for a
service, such as Apache and Rails, you would run something like `CMD
["apache2","-DFOREGROUND"]`. Indeed, this form of the instruction is recommended
for any service-based image.

In most other cases, `CMD` should be given an interactive shell, such as bash,
Python and perl. For example, `CMD ["perl", "-de0"]`, `CMD ["python"]`, or `CMD
["php", "-a"]`. Using this form means that when you execute something like
`docker run -it python`, you’ll get dropped into a usable shell, ready to go.
`CMD` should rarely be used in the manner of `CMD ["param", "param"]` in
conjunction with `ENTRYPOINT`, unless
you and your expected users are already quite familiar with how `ENTRYPOINT`
works.

For more information about `CMD`, see Dockerfile reference for the CMD instruction.

### EXPOSE

The `EXPOSE` instruction indicates the ports on which a container listens
for connections. Consequently, you should use the common, traditional port for
your application. For example, an image containing the Apache web server would
use `EXPOSE 80`, while an image containing MongoDB would use `EXPOSE 27017` and
so on.

For external access, your users can execute `docker run` with a flag indicating
how to map the specified port to the port of their choice.
For container linking, Docker provides environment variables for the path from
the recipient container back to the source (for example, `MYSQL_PORT_3306_TCP`).

For more information about `EXPOSE`, see Dockerfile reference for the EXPOSE instruction.

### ENV

To make new software easier to run, you can use `ENV` to update the
`PATH` environment variable for the software your container installs. For
example, `ENV PATH=/usr/local/nginx/bin:$PATH` ensures that `CMD ["nginx"]`
just works.

The `ENV` instruction is also useful for providing the required environment
variables specific to services you want to containerize, such as Postgres’s
`PGDATA`.

Lastly, `ENV` can also be used to set commonly used version numbers so that
version bumps are easier to maintain, as seen in the following example:

```dockerfile
ENV PG_MAJOR=9.3
ENV PG_VERSION=9.3.4
RUN curl -SL https://example.com/postgres-$PG_VERSION.tar.xz | tar -xJC /usr/src/postgres && …
ENV PATH=/usr/local/postgres-$PG_MAJOR/bin:$PATH
```

Similar to having constant variables in a program, as opposed to hard-coding
values, this approach lets you change a single `ENV` instruction to
automatically bump the version of the software in your container.

Each `ENV` line creates a new intermediate layer, just like `RUN` commands. This
means that even if you unset the environment variable in a future layer, it
still persists in this layer and its value can be dumped. You can test this by
creating a Dockerfile like the following, and then building it.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
ENV ADMIN_USER="mark"
RUN echo $ADMIN_USER > ./mark
RUN unset ADMIN_USER
```

```console
$ docker run --rm test sh -c 'echo $ADMIN_USER'

mark
```

To prevent this and unset the environment variable, use a `RUN` command
with shell commands, to set, use, and unset the variable all in a single layer.
You can separate your commands with `;` or `&&`. If you use the second method,
and one of the commands fails, the `docker build` also fails. This is usually a
good idea. Using `\` as a line continuation character for Linux Dockerfiles
improves readability. You could also put all of the commands into a shell script
and have the `RUN` command just run that shell script.

```dockerfile
# syntax=docker/dockerfile:1
FROM alpine
RUN export ADMIN_USER="mark" \
    && echo $ADMIN_USER > ./mark \
    && unset ADMIN_USER
CMD sh
```

```console
$ docker run --rm test sh -c 'echo $ADMIN_USER'

```

For more information about `ENV`, see Dockerfile reference for the ENV instruction.

### ADD or COPY

`ADD` and `COPY` are functionally similar. `COPY` supports basic <example-value> of
files into the container, from the build context
or from a stage in a multi-stage build.
`ADD` supports features for fetching files from remote HTTPS and Git URLs, and
extracting tar files automatically when adding files from the build context.

You'll mostly want to use `COPY` for copying files from one stage to another in
a multi-stage build. If you need to add files from the build context to the
container temporarily to execute a `RUN` instruction, you can often substitute
the `COPY` instruction with a bind mount instead. For example, to temporarily
add a `requirements.txt` file for a `RUN pip install` instruction:

```dockerfile
RUN --mount=type=bind,source=requirements.txt,target=/tmp/requirements.txt \
    pip install --requirement /tmp/requirements.txt
```

Bind mounts are more efficient than `COPY` for including files from the build
context in the container. Note that bind-mounted files are only added
temporarily for a single `RUN` instruction, and don't persist in the final
image. If you need to include files from the build context in the final image,
use `COPY`.

The `ADD` instruction is best for when you need to download a remote artifact
as part of your build. `ADD` is better than manually adding files using
something like `wget` and `tar`, because it ensures a more precise build cache.
`ADD` also has built-in support for checksum validation of the remote
resources, and a protocol for parsing branches, tags, and subdirectories from
Git URLs.

The following example uses `ADD` to download a .NET installer. Combined with
multi-stage builds, only the .NET runtime remains in the final stage, no
intermediate files.

```dockerfile
# syntax=docker/dockerfile:1

FROM scratch AS src
ARG DOTNET_VERSION=8.0.0-preview.6.23329.7
ADD --checksum=sha256:270d731bd08040c6a3228115de1f74b91cf441c584139ff8f8f6503447cebdbb \
    https://dotnetcli.azureedge.net/dotnet/Runtime/$DOTNET_VERSION/dotnet-runtime-$DOTNET_VERSION-linux-arm64.tar.gz /dotnet.tar.gz

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0.0-preview.6-bookworm-slim-arm64v8 AS installer

# Retrieve .NET Runtime
RUN --mount=from=src,target=/src <<EOF
mkdir -p /dotnet
tar -oxzf /src/dotnet.tar.gz -C /dotnet
EOF

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0.0-preview.6-bookworm-slim-arm64v8

COPY --from=installer /dotnet /usr/share/dotnet
RUN ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet
```

For more information about `ADD` or `COPY`, see the following:

- Dockerfile reference for the ADD instruction
- Dockerfile reference for the COPY instruction
