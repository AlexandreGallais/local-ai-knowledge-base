---
title: "populate a cache and also consult it (part 7 of 8)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 7 of 8)

### `ShmSize=number[unit]`
<< else >>
#### **--shm-size**=*number[unit]*
<< endif >>

Size of _/dev/shm_. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, there is no limit on the amount of memory used for IPC by the <<container|pod>>.
This option conflicts with **--ipc=host**.

#### **--skip-unused-stages**

Skip stages in multi-stage builds which don't affect the target stage. (Default: **true**).

#### **--source-date-epoch**=*seconds*

Set the "created" timestamp for the built image to this number of seconds since
the epoch (Unix time 0, i.e., 00:00:00 UTC on 1 January 1970) (default is to
use the value set in the `SOURCE_DATE_EPOCH` environment variable, or the
current time if it is not set).

The "created" timestamp is written into the image's configuration and manifest
when the image is committed, so running the same build two different times
will ordinarily produce images with different sha256 hashes, even if no other
changes were made to the Containerfile and build context.

When this flag is set, a `SOURCE_DATE_EPOCH` build arg will provide its value
for a stage in which it is declared.

When this flag is set, the image configuration's "created" timestamp is always
set to the time specified, which should allow for identical images to be built
at different times using the same set of inputs.

When this flag is set, output written as specified to the **--output** flag
will bear exactly the specified timestamp.

Conflicts with the similar **--timestamp** flag, which also sets its specified
time on the contents of new layers.

#### **--source-policy-file**=*pathname*

Specifies the path to a BuildKit-compatible source policy JSON file.  When
specified, source references (e.g., base images in FROM instructions) are
evaluated against the policy rules before being used.

Source policies allow controlling which images can be used as base images and
optionally converting image references (e.g., pinning tags to specific digests)
without modifying Containerfiles.  This is useful for enforcing organizational
policies and ensuring build reproducibility.

The policy file is a JSON document containing an array of rules.  Each rule has:
- **action**: The action to take when the rule matches.  Valid actions are:
  - **ALLOW**: Explicitly allow the source (no transformation).
  - **DENY**: Block the source and fail the build.
  - **CONVERT**: Transform the source to a different reference specified in `updates`.
- **selector**: Specifies which sources the rule applies to.
  - **identifier**: The source identifier to match (e.g., `docker-image://docker.io/library/alpine:latest`).
  - **matchType**: How to match the identifier.  Valid types are `EXACT` and `WILDCARD` (supports `*` and `?` glob patterns).  Defaults to `WILDCARD` if not specified.
- **updates**: For `CONVERT` actions, specifies the replacement identifier.

Rules are evaluated in order; the first matching rule wins.  If no rule matches,
the source is allowed by default.

Note: Source policy CONVERT rules are processed after **--build-context** substitutions
but before any substitutions specified in **containers-registries.conf(5)**.  This provides
multiple ways to override which base image is used for a particular stage, in order of
precedence: `--build-context`, then source policy, then registries.conf.

Example policy file that pins alpine:latest to a specific digest:
```json
{
  "rules": [
    {
      "action": "CONVERT",
      "selector": {
        "identifier": "docker-image://docker.io/library/alpine:latest"
      },
      "updates": {
        "identifier": "docker-image://docker.io/library/alpine@sha256:..."
      }
    }
  ]
}
```

Example policy file that denies all ubuntu images:
```json
{
  "rules": [
    {
      "action": "DENY",
      "selector": {
        "identifier": "docker-image://docker.io/library/ubuntu:*",
        "matchType": "WILDCARD"
      }
    }
  ]
}
```

#### **--squash**

Squash all of the image's new layers into a single new layer; any preexisting layers are not squashed.

#### **--squash-all**

Squash all of the new image's layers (including those inherited from a base image) into a single new layer.

#### **--ssh**=*default* | *id[=socket>*

SSH agent socket or keys to expose to the build.
The socket path can be left empty to use the value of `default=$SSH_AUTH_SOCK`

To later use the ssh agent, use the --mount option in a `RUN` instruction within a `Containerfile`:

`RUN --mount=type=ssh,id=id mycmd`

#### **--stage-labels**

Add metadata labels to all intermediate stage images of the multistage build,
including the final image (Default is `false`).
This option requires `--save-stages` to be enabled.

When enabled, all intermediate stage images and final image will be labeled with:
  - `io.buildah.stage.name`: The stage alias (from `FROM ... AS alias`), or stage position
    if no alias is specified
  - `io.buildah.stage.base`: The base image used by this stage (pullspec or image ID
    when stage uses another stage as base)

These labels make it easier to identify, query, and manage images from multi-stage builds.

<< if is_quadlet >>
### `ImageTag=imageName`
<< else >>
#### **--tag**, **-t**=*imageName*
<< endif >>

Specifies the name which is assigned to the resulting image if the build process completes successfully.
If _imageName_ does not include a registry name, the registry name *localhost* is prepended to the image name.

<< if is_quadlet >>
### `Target=stageName`
<< else >>
#### **--target**=*stageName*
<< endif >>

Set the target build stage to build.  When building a Containerfile with multiple build stages, --target can be used to specify an intermediate build stage by name as the final stage for the resulting image. Commands after the target stage is skipped.

#### **--timestamp**=*seconds*

Set the create timestamp to seconds since epoch to allow for deterministic builds (defaults to current time). By default, the created timestamp is changed and written into the image manifest with every commit, causing the image's sha256 hash to be different even if the sources are exactly the same otherwise.
When --timestamp is set, the created timestamp is always set to the time specified and therefore not changed, allowing the image's sha256 hash to remain the same. All files committed to the layers of the image is created with the timestamp.

If the only instruction in a Containerfile is `FROM`, this flag has no effect.

<< if is_quadlet >>
### `TLSVerify=`
<< else >>
#### **--tls-verify**
<< endif >>

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **containers-registries.conf(5)**

<< if is_quadlet >>
### `Ulimit=option`
<< else >>
#### **--ulimit**=*option*
<< endif >>

Ulimit options. Sets the ulimits values inside of the container.

--ulimit with a soft and hard limit in the format <type>=<soft limit>[:<hard limit>]. For example:

$ podman run --ulimit nofile=1024:1024 --rm ubi9 ulimit -n
1024

Here is the list of the different resources and the limits' units:

| Type                                           | Unit of the value given to --ulimit |
|:-----------------------------------------------|:------------------------------------|
| core, fsize                                    | bytes                                |
| data, memlock, rss, stack                      | bytes                                |
| msgqueue                                       | bytes                                |
| rttime                                         | microseconds                         |
| cpu                                            | seconds                              |
| locks, nice, nofile, nproc, rtprio, sigpending | count                                |

For example, a locked memory limit given in bytes is reported in kbytes:

$ podman run --ulimit memlock=4096 --rm ubi9 ulimit -l
4

Unit suffixes such as *k* or *m* are not accepted.

Set -1 for the soft or hard limit to set the limit to the maximum limit of the current
process. In rootful mode this is often unlimited.

If nofile is unset, a default value of 1048576 will be used, unless overridden
in containers.conf(5).  However, if the default value exceeds the hard limit for the current
rootless user, the current hard limit will be applied instead.

Use **host** to copy the current configuration from the host.

Don't use nproc with the ulimit flag as Linux uses nproc to set the
maximum number of processes available to a user, not to a container.

Use the --pids-limit option to modify the cgroup control to limit the number
of processes within a container.

#### **--unsetannotation**=*annotation*

Unset the image annotation, causing the annotation not to be inherited from the base image.

#### **--unsetenv**=*env*

Unset default environment variables for the container. Default environment
variables include variables provided natively by Podman, environment variables
configured by the image, and environment variables from containers.conf.

#### **--unsetlabel**=*label*

Unset the image label, causing the label not to be inherited from the base image.

#### **--userns-gid-map**=*mapping*

Directly specifies a GID mapping to be used to set ownership, at the
filesystem level, on the working container's contents.
Commands run when handling `RUN` instructions defaults to being run in
their own user namespaces, configured using the UID and GID maps.

Entries in this map take the form of one or more triples of a starting
in-container GID, a corresponding starting host-level GID, and the number of consecutive IDs which the map entry represents.

This option overrides the *remap-gids* setting in the *options* section of /etc/containers/storage.conf.

If this option is not specified, but a global --userns-gid-map setting is supplied, settings from the global option is used.

If none of --userns-uid-map-user, --userns-gid-map-group, or --userns-gid-map are specified, but --userns-uid-map is specified, the GID map is set to use the same numeric values as the UID map.

#### **--userns-gid-map-group**=*group*

Specifies that a GID mapping to be used to set ownership, at the
filesystem level, on the working container's contents, can be found in entries in the `/etc/subgid` file which correspond to the specified group.
Commands run when handling `RUN` instructions defaults to being run in
their own user namespaces, configured using the UID and GID maps.
If --userns-uid-map-user is specified, but --userns-gid-map-group is not specified, `podman` assumes that the specified user name is also a
suitable group name to use as the default setting for this option.

**NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it is when run rootful.

#### **--userns-uid-map**=*mapping*

Directly specifies a UID mapping to be used to set ownership, at the
filesystem level, on the working container's contents.
Commands run when handling `RUN` instructions default to being run in
their own user namespaces, configured using the UID and GID maps.

Entries in this map take the form of one or more triples of a starting
in-container UID, a corresponding starting host-level UID, and the number of consecutive IDs which the map entry represents.

This option overrides the *remap-uids* setting in the *options* section of /etc/containers/storage.conf.

If this option is not specified, but a global --userns-uid-map setting is supplied, settings from the global option is used.

If none of --userns-uid-map-user, --userns-gid-map-group, or --userns-uid-map are specified, but --userns-gid-map is specified, the UID map is set to use the same numeric values as the GID map.

#### **--userns-uid-map-user**=*user*

Specifies that a UID mapping to be used to set ownership, at the
filesystem level, on the working container's contents, can be found in entries in the `/etc/subuid` file which correspond to the specified user.
Commands run when handling `RUN` instructions defaults to being run in
their own user namespaces, configured using the UID and GID maps.
If --userns-gid-map-group is specified, but --userns-uid-map-user is not specified, `podman` assumes that the specified group name is also a
suitable user name to use as the default setting for this option.

**NOTE:** When this option is specified by a rootless user, the specified mappings are relative to the rootless user namespace in the container, rather than being relative to the host as it is when run rootful.

#### **--uts**=*how*

Sets the configuration for UTS namespaces when handling `RUN` instructions.
The configured value can be "" (the empty string) or "container" to indicate that a new UTS namespace to be created, or it can be "host" to indicate that the UTS namespace in which `podman` itself is being run is reused, or it can be the path to a UTS namespace which is already in use by another process.

<< if is_quadlet >>
