---
title: "populate a cache and also consult it (part 9 of 9)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 9 of 9)

## EXAMPLES

### Build an image using local Containerfiles

Build image using Containerfile with content from current directory:
```
$ podman build .
```

Build image using specified Containerfile with content from current directory:
```
$ podman build -f Containerfile.simple .
```

Build image using Containerfile from stdin with content from current directory:
```
$ cat $HOME/Containerfile | podman build -f - .
```

Build image using multiple Containerfiles with content from current directory:
```
$ podman build -f Containerfile.simple -f Containerfile.notsosimple .
```

Build image with specified Containerfile with content from $HOME directory. Note `cpp` is applied to Containerfile.in before processing as Containerfile:
```
$ podman build -f Containerfile.in $HOME
```

Build image with the specified tag with Containerfile and content from current directory:
```
$ podman build -t imageName .
```

Build image ignoring registry verification for any images pulled via the Containerfile:
```
$ podman build --tls-verify=false -t imageName .
```

Build image with the specified logging format:
```
$ podman build --runtime-flag log-format=json .
```

Build image using debug mode for logging:
```
$ podman build --runtime-flag debug .
```

Build image using specified registry attributes when pulling images from the selected Containerfile:
```
$ podman build --authfile /tmp/auths/myauths.json --cert-dir $HOME/auth --tls-verify=true --creds=username:password -t imageName -f Containerfile.simple .
```

Build image using specified resource controls when running containers during the build:
```
$ podman build --memory 40m --cpu-period 10000 --cpu-quota 50000 --ulimit nofile=1024:1028 -t imageName .
```

Build image using specified SELinux labels and cgroup config running containers during the build:
```
$ podman build --security-opt label=level:s0:c100,c200 --cgroup-parent /path/to/cgroup/parent -t imageName .
```

Build image with read-only and SELinux relabeled volume mounted from the host into running containers during the build:
```
$ podman build --volume /home/test:/myvol:ro,Z -t imageName .
```

Build image with overlay volume mounted from the host into running containers during the build:
```
$ podman build -v /var/lib/yum:/var/lib/yum:O -t imageName .
```

Build image using layers and then removing intermediate containers even if the build fails.
```
$ podman build --layers --force-rm -t imageName .
```

Build image ignoring cache and not removing intermediate containers even if the build succeeds:
```
$ podman build --no-cache --rm=false -t imageName .
```

Build image using the specified network when running containers during the build:
```
$ podman build --network mynet .
```

Build an image using a secret stored in an environment variable or file named `mysecret` to be used with the instruction `RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret`:
```
$ podman build --secret=id=mysecret .
```

Build an image using a secret stored in an environment variable named `MYSECRET` to be used with the instruction `RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret`:
```
$ podman build --secret=id=mysecret,env=MYSECRET .
$ podman build --secret=id=mysecret,src=MYSECRET,type=env .
```

Build an image using a secret stored in a file named `.mysecret` to be used with the instruction `RUN --mount=type=secret,id=mysecret cat /run/secrets/mysecret`:
```
$ podman build --secret=id=mysecret,src=.mysecret .
$ podman build --secret=id=mysecret,src=.mysecret,type=file .
```

### Building a multi-architecture image using the --manifest option (requires emulation software)

Build image using the specified architectures and link to a single manifest on successful completion:
```
$ podman build --arch arm --manifest myimage /tmp/mysrc
$ podman build --arch amd64 --manifest myimage /tmp/mysrc
$ podman build --arch s390x --manifest myimage /tmp/mysrc
```

Similarly build using a single command
```
$ podman build --platform linux/s390x,linux/ppc64le,linux/amd64 --manifest myimage /tmp/mysrc
```

Build image using multiple specified architectures and link to single manifest on successful completion:
```
$ podman build --platform linux/arm64 --platform linux/amd64 --manifest myimage /tmp/mysrc
```

### Building an image using a URL, Git repo, or archive

  The build context directory can be specified as a URL to a Containerfile, a
Git repository, or URL to an archive. If the URL is a Containerfile, it is
downloaded to a temporary location and used as the context. When a Git
repository is set as the URL, the repository is cloned locally to a temporary
location and then used as the context. Lastly, if the URL is an archive, it is
downloaded to a temporary location and extracted before being used as the
context.

#### Building an image using a URL to a Containerfile

Build image from Containerfile downloaded into temporary location used as the build context:
```
$ podman build https://10.10.10.1/podman/Containerfile
```

#### Building an image using a Git repository

  Podman clones the specified GitHub repository to a temporary location and
uses it as the context. The Containerfile at the root of the repository is used
and it only works if the GitHub repository is a dedicated repository.

Build image from specified git repository downloaded into temporary location used as the build context:
```
$ podman build -t hello  https://github.com/containers/PodmanHello.git
$ podman run hello
```

  Note: GitHub does not support using `git://` for performing `clone` operation due to recent changes in their security guidance (https://github.blog/2021-09-01-improving-git-protocol-security-github/). Use an `https://` URL if the source repository is hosted on GitHub.

#### Building an image using a URL to an archive

  Podman fetches the archive file, decompresses it, and uses its contents as the
build context. The Containerfile at the root of the archive and the rest of the
archive are used as the context of the build. Passing the
`-f PATH/Containerfile` option as well tells the system to look for that file
inside the contents of the archive.

```
$ podman build -f dev/Containerfile https://10.10.10.1/podman/context.tar.gz
```

  Note: supported compression formats are 'xz', 'bzip2', 'gzip' and 'identity'
(no compression).

## Files

### .containerignore/.dockerignore

If the file *.containerignore* or *.dockerignore* exists in the context directory,
`podman build` reads its contents. Use the `--ignorefile` option to override the
.containerignore path location.
Podman uses the content to exclude files and directories from the context
directory, when executing COPY and ADD directives in the
Containerfile/Dockerfile

The .containerignore and .dockerignore files use the same syntax; if both
are in the context directory, podman build only uses .containerignore.

Users can specify a series of Unix shell globs in a .containerignore file to
identify files/directories to exclude.

Podman supports a special wildcard string `**` which matches any number of
directories (including zero). For example, **/*.go excludes all files that
end with .go that are found in all directories.

Example .containerignore file:

```
# exclude this content for image
*/*.c
**/output*
src
```

`*/*.c`
Excludes files and directories whose names ends with .c in any top level
subdirectory. For example, the source file include/rootless.c.

`**/output*`
Excludes files and directories starting with `output` from any directory.

`src`
Excludes files named src and the directory src as well as any content in it.

Lines starting with ! (exclamation mark) can be used to make exceptions to
exclusions. The following is an example .containerignore file that uses this
mechanism:
```
*.doc
!Help.doc
```

Exclude all doc files except Help.doc from the image.

This functionality is compatible with the handling of .containerignore files
described here: **containerignore(5)**

### registries.conf (`/etc/containers/registries.conf`)

registries.conf is the configuration file which specifies which container
registries is consulted when completing image names which do not include
a registry or domain portion.
See **containers-registries.conf(5)**

## Troubleshooting

### lastlog sparse file

Using a useradd command within a Containerfile with a large UID/GID creates
a large sparse file `/var/log/lastlog`.  This can cause the
build to hang forever.  Go language does not support sparse files correctly,
which can lead to some huge files being created in the container image.

When using the `useradd` command within the build script, pass the
`--no-log-init or -l` option to the `useradd` command.  This option tells
useradd to stop creating the lastlog file.

## SEE ALSO
**podman(1)**, **buildah(1)**, **containers-certs.d(5)**, **containers-registries.conf(5)**, **crun(1)**, **runc(8)**, **useradd(8)**, **podman-ps(1)**, **podman-rm(1)**, **Containerfile(5)**, **containerignore(5)**

### Troubleshooting

See podman-troubleshooting(7)
for solutions to common issues.

See podman-rootless(7)
for rootless issues.

## HISTORY
Aug 2020, Additional options and .containerignore added by Dan Walsh `<dwalsh@redhat.com>`

May 2018, Minor revisions added by Joe Doss `<joe@solidadmin.com>`

December 2017, Originally compiled by Tom Sweeney `<tsweeney@redhat.com>`

## FOOTNOTES
1: The Podman project is committed to inclusivity, a
core value of open source. The `master` and `slave` mount propagation
terminology used here is problematic and divisive, and needs to be changed.
However, these terms are currently used within the Linux kernel and must be
used as-is at this time. When the kernel maintainers rectify this usage,
Podman will follow suit immediately.
