---
title: "Building best practices (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/best-practices.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Building best practices (part 3 of 3)

### ENTRYPOINT

The best use for `ENTRYPOINT` is to set the image's main command, allowing that
image to be run as though it was that command, and then use `CMD` as the
default flags.

The following is an example of an image for the command line tool `s3cmd`:

```dockerfile
ENTRYPOINT ["s3cmd"]
CMD ["--help"]
```

You can use the following command to run the image and show the command's help:

```console
$ docker run s3cmd
```

Or, you can use the right parameters to execute a command, like in the following example:

```console
$ docker run s3cmd ls s3://mybucket
```

This is useful because the image name can double as a reference to the binary as
shown in the command above.

The `ENTRYPOINT` instruction can also be used in combination with a helper
script, allowing it to function in a similar way to the command above, even
when starting the tool may require more than one step.

For example, the Postgres Official Image
uses the following script as its `ENTRYPOINT`:

```bash
#!/bin/sh
set -e

if [ "$1" = 'postgres' ]; then
    chown -R postgres "$PGDATA"

    if [ -z "$(ls -A "$PGDATA")" ]; then
        gosu postgres initdb
    fi

    exec gosu postgres "$@"
fi

exec "$@"
```

This script uses the `exec` builtin so that the final running application becomes the container's PID 1. This allows the application to receive any Unix signals sent to the container. For more information, see the `ENTRYPOINT` reference.

In the following example, a helper script is copied into the container and run via `ENTRYPOINT` on
container start:

```dockerfile
COPY ./docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["postgres"]
```

This script lets you interact with Postgres in several ways.

It can start Postgres:

```console
$ docker run postgres
```

Or, you can use it to run Postgres and pass <example-value> to the server:

```console
$ docker run postgres postgres --help
```

Lastly, you can use it to start a totally different tool, such as Bash:

```console
$ docker run --rm -it postgres bash
```

For more information about `ENTRYPOINT`, see Dockerfile reference for the ENTRYPOINT instruction.

### VOLUME

You should use the `VOLUME` instruction to expose any database storage area,
configuration storage, or files and folders created by your Docker container. You
are strongly encouraged to use `VOLUME` for any combination of mutable or user-serviceable
parts of your image.

For more information about `VOLUME`, see Dockerfile reference for the VOLUME instruction.

### USER

If a service can run without privileges, use `USER` to change to a non-root
user. Start by creating the user and group in the Dockerfile with something
like the following example:

```dockerfile
RUN groupadd -r postgres && useradd --no-log-init -r -g postgres postgres
```

> **Note:**
>
> Consider an explicit UID/GID.
>
> Users and groups in an image are assigned a non-deterministic UID/GID in that
> the "next" UID/GID is assigned regardless of image rebuilds. So, if it’s
> critical, you should assign an explicit UID/GID.

> **Note:**
>
> Due to an unresolved bug in the
> Go archive/tar package's handling of sparse files, attempting to create a user
> with a significantly large UID inside a Docker container can lead to disk
> exhaustion because `/var/log/faillog` in the container layer is filled with
> NULL (\0) characters. A workaround is to pass the `--no-log-init` flag to
> `useradd`. The Debian/Ubuntu `adduser` wrapper does not support this flag.

Avoid installing or using `sudo` as it has unpredictable TTY and
signal-forwarding behavior that can cause problems. If you absolutely need
functionality similar to `sudo`, such as initializing the daemon as `root` but
running it as non-`root`, consider using “gosu”.

Lastly, to reduce layers and complexity, avoid switching `USER` back and forth
frequently.

For more information about `USER`, see Dockerfile reference for the USER instruction.

### WORKDIR

For clarity and reliability, you should always use absolute paths for your
`WORKDIR`. Also, you should use `WORKDIR` instead of proliferating instructions
like `RUN cd … && do-something`, which are hard to read, troubleshoot, and
maintain.

For more information about `WORKDIR`, see Dockerfile reference for the `WORKDIR` instruction.

### ONBUILD

An `ONBUILD` command executes after the current Dockerfile build completes.
`ONBUILD` executes in any child image derived `FROM` the current image. Think
of the `ONBUILD` command as an instruction that the parent Dockerfile gives
to the child Dockerfile.

A Docker build executes `ONBUILD` commands before any command in a child
Dockerfile.

`ONBUILD` is useful for images that are going to be built `FROM` a given
image. For example, you would use `ONBUILD` for a language stack image that
builds arbitrary user software written in that language within the
Dockerfile, as you can see in Ruby’s `ONBUILD` variants.

Images built with `ONBUILD` should get a separate tag. For example,
`ruby:1.9-onbuild` or `ruby:2.0-onbuild`.

Be careful when putting `ADD` or `COPY` in `ONBUILD`. The image
fails catastrophically if the new build's context is missing the resource being
added. Adding a separate tag, as recommended above, helps mitigate this by
allowing the Dockerfile author to make a choice.

For more information about `ONBUILD`, see Dockerfile reference for the ONBUILD instruction.
