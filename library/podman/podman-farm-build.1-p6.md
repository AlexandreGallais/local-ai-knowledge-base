---
title: "populate a cache and also consult it (part 6 of 8)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 6 of 8)

### `RetryDelay=duration`
<< else >>
#### **--retry-delay**=*duration*
<< endif >>

Duration of delay between retry attempts when pulling or pushing images between
the registry and local storage in case of failure. The default is to start at two seconds and then exponentially back off. The delay is used when this value is set, and no exponential back off occurs.

#### **--rewrite-timestamp**

When generating new layers for the image, ensure that no newly added content
bears a timestamp later than the value used by the **--source-date-epoch**
flag, if one was provided, by replacing any timestamps which are later than
that value, with that value.

#### **--rm**

Remove intermediate containers after a successful build (default true).

#### **--runtime**=*path*

The *path* to an alternate OCI-compatible runtime, which is used to run
commands specified by the **RUN** instruction.

Note: You can also override the default runtime by setting the BUILDAH\_RUNTIME environment variable.  `export BUILDAH_RUNTIME=/usr/local/bin/runc`

#### **--runtime-flag**=*flag*

Adds global flags for the container runtime. To list the supported flags, please consult the manpages of the selected container runtime.

Default runtime flags can be added in containers.conf.

Note: Do not pass the leading -- to the flag. To pass the runc flag --log-format json to buildah build, the option given is --runtime-flag log-format=json.

#### **--save-stages**

Preserve intermediate stage images instead of removing them after the build completes (Default is `false`). By default, Buildah removes intermediate stage images to save space.
This option keeps those images, which can be useful for debugging multi-stage builds or for reusing intermediate stages in subsequent builds.

`--save-stages` can be used with `--layers` and subsequent builds with `--layers` can use the preserved intermediate layers as cache.

When combined with `--stage-labels`, all stage images (including the final image) will include metadata labels for easier identification and management.

#### **--sbom**=*preset*

Generate SBOMs (Software Bills Of Materials) for the output image by scanning
the working container and build contexts using the named combination of scanner
image, scanner commands, and merge strategy.  Must be specified with one or
more of **--sbom-image-output**, **--sbom-image-purl-output**, **--sbom-output**,
and **--sbom-purl-output**.  Recognized presets, and the set of options which
they equate to:

 - "syft", "syft-cyclonedx":
     --sbom-scanner-image=ghcr.io/anchore/syft
     --sbom-scanner-command="/syft scan -q dir:{ROOTFS} --output cyclonedx-json={OUTPUT}"
     --sbom-scanner-command="/syft scan -q dir:{CONTEXT} --output cyclonedx-json={OUTPUT}"
     --sbom-merge-strategy=merge-cyclonedx-by-component-name-and-version
 - "syft-spdx":
     --sbom-scanner-image=ghcr.io/anchore/syft
     --sbom-scanner-command="/syft scan -q dir:{ROOTFS} --output spdx-json={OUTPUT}"
     --sbom-scanner-command="/syft scan -q dir:{CONTEXT} --output spdx-json={OUTPUT}"
     --sbom-merge-strategy=merge-spdx-by-package-name-and-versioninfo
 - "trivy", "trivy-cyclonedx":
     --sbom-scanner-image=ghcr.io/aquasecurity/trivy
     --sbom-scanner-command="trivy filesystem -q {ROOTFS} --format cyclonedx --output {OUTPUT}"
     --sbom-scanner-command="trivy filesystem -q {CONTEXT} --format cyclonedx --output {OUTPUT}"
     --sbom-merge-strategy=merge-cyclonedx-by-component-name-and-version
 - "trivy-spdx":
     --sbom-scanner-image=ghcr.io/aquasecurity/trivy
     --sbom-scanner-command="trivy filesystem -q {ROOTFS} --format spdx-json --output {OUTPUT}"
     --sbom-scanner-command="trivy filesystem -q {CONTEXT} --format spdx-json --output {OUTPUT}"
     --sbom-merge-strategy=merge-spdx-by-package-name-and-versioninfo

#### **--sbom-image-output**=*path*

When generating SBOMs, store the generated SBOM in the specified path in the
output image.  There is no default.

#### **--sbom-image-purl-output**=*path*

When generating SBOMs, scan them for PURL (package
URL)
information, and save a list of found PURLs to the specified path in the output
image.  There is no default.

#### **--sbom-merge-strategy**=*method*

If more than one **--sbom-scanner-command** value is being used, use the
specified method to merge the output from later commands with output from
earlier commands.  Recognized values include:

 - cat
     Concatenate the files.
 - merge-cyclonedx-by-component-name-and-version
     Merge the "component" fields of JSON documents, ignoring values from
     documents when the combination of their "name" and "version" values is
     already present.  Documents are processed in the order in which they are
     generated, which is the order in which the commands that generate them
     were specified.
 - merge-spdx-by-package-name-and-versioninfo
     Merge the "package" fields of JSON documents, ignoring values from
     documents when the combination of their "name" and "versionInfo" values is
     already present.  Documents are processed in the order in which they are
     generated, which is the order in which the commands that generate them
     were specified.

#### **--sbom-output**=*file*

When generating SBOMs, store the generated SBOM in the named file on the local
filesystem.  There is no default.

#### **--sbom-purl-output**=*file*

When generating SBOMs, scan them for PURL (package
URL)
information, and save a list of found PURLs to the named file in the local
filesystem.  There is no default.

#### **--sbom-scanner-command**=*image*

Generate SBOMs by running the specified command from the scanner image.  If
multiple commands are specified, they are run in the order in which they are
specified.  These text substitutions are performed:
  - {ROOTFS}
      The root of the built image's filesystem, bind mounted.
  - {CONTEXT}
      The build context and additional build contexts, bind mounted.
  - {OUTPUT}
      The name of a temporary output file, to be read and merged with others or copied elsewhere.

#### **--sbom-scanner-image**=*image*

Generate SBOMs using the specified scanner image.

<< if is_quadlet >>
### `Secret=secret[,opt=opt ...]`
<< else >>
#### **--secret**=*secret[,opt=opt ...]*
<< endif >>

Give the container access to a secret. Can be specified multiple times.

A secret is a blob of sensitive data which a container needs at runtime but
is not stored in the image or in source control, such as usernames and passwords,
TLS certificates and keys, SSH keys or other important generic strings or binary content (up to 512 kB in size).

When secrets are specified as type `mount`, the secrets are copied and mounted into the container when a container is created.
When secrets are specified as type `env`, the secret is set as an environment variable within the container.
Secrets are written in the container at the time of container creation, and modifying the secret using `podman secret` commands
after the container is created affects the secret inside the container.

Secrets and its storage are managed using the `podman secret` command.

Secret Options

- `type=mount|env`    : How the secret is exposed to the container.
                        `mount` mounts the secret into the container as a file.
                        `env` exposes the secret as an environment variable.
                        Defaults to `mount`.
- `target=target`     : Target of secret.
                        For mounted secrets, this is the path to the secret inside the container.
                        If a fully qualified path is provided, the secret is mounted at that location.
                        Otherwise, the secret is mounted to
                        `/run/secrets/target` for Linux containers or
                        `/var/run/secrets/target` for FreeBSD containers.
                        If the target is not set, the secret is mounted to `/run/secrets/secretname` by default.
                        For env secrets, this is the environment variable key. Defaults to `secretname`.
- `uid=0`             : UID of secret. Defaults to 0. Mount secret type only.
- `gid=0`             : GID of secret. Defaults to 0. Mount secret type only.
- `mode=0`            : Mode of secret. Defaults to 0444. Mount secret type only.

Examples

Mount at `/my/location/mysecret` with UID 1:
```
--secret mysecret,target=/my/location/mysecret,uid=1
```

Mount at `/run/secrets/customtarget` with mode 0777:
```
--secret mysecret,target=customtarget,mode=0777
```

Create a secret environment variable called `ENVSEC`:
```
--secret mysecret,type=env,target=ENVSEC
```

#### **--security-opt**=*option*

Security Options

- **apparmor=unconfined** : Turn off apparmor confinement for the <<container|pod>>
- **apparmor**=_alternate-profile_ : Set the apparmor confinement profile for the <<container|pod>>

- **label=user:**_USER_: Set the label user for the <<container|pod>> processes
- **label=role:**_ROLE_: Set the label role for the <<container|pod>> processes
- **label=type:**_TYPE_: Set the label process type for the <<container|pod>> processes
- **label=level:**_LEVEL_: Set the label level for the <<container|pod>> processes
- **label=filetype:**_TYPE_: Set the label file type for the <<container|pod>> files
- **label=disable**: Turn off label separation for the <<container|pod>>

Note: Labeling can be disabled for all <<|pods/>>containers by setting label=false in the **containers.conf** (`/etc/containers/containers.conf` or `$HOME/.config/containers/containers.conf`) file.

- **label=nested**: Allows SELinux modifications within the container. Containers are allowed to modify SELinux labels on files and processes, as long as SELinux policy allows. Without **nested**, containers view SELinux as disabled, even when it is enabled on the host. Containers are prevented from setting any labels.

- **mask**=_/path/1:/path/2_: The paths to mask separated by a colon. A masked path cannot be accessed inside the container<>.

- **no-new-privileges**: Disable container processes from gaining additional privileges through the `execve(2)` system call (e.g. via setuid or setgid bits, or via file capabilities). Programs that rely on setuid/setgid bits set on their executable to change user id or group id are no longer able to do so, and any file capabilities added to the executable (e.g. via `setcap`) are not added to the permitted capability set. For more details, see: https://docs.kernel.org/userspace-api/no_new_privs.html.

- **seccomp=unconfined**: Turn off seccomp confinement for the <<container|pod>>.
- **seccomp=profile.json**: JSON file to be used as a seccomp filter. Note that the `io.podman.annotations.seccomp` annotation is set with the specified value as shown in `podman inspect`.

- **proc-opts**=_OPTIONS_ : Comma-separated list of options to use for the /proc mount. More details
  for the possible mount options are specified in the **proc(5)** man page.

- **unmask**=_ALL_ or _/path/1:/path/2_, or shell expanded paths (/proc/*): Paths to unmask separated by a colon. If set to **ALL**, it unmasks all the paths that are masked or made read-only by default.
  The default masked paths are **/proc/acpi, /proc/kcore, /proc/keys, /proc/latency_stats, /proc/sched_debug, /proc/scsi, /proc/timer_list, /proc/timer_stats, /sys/firmware, and /sys/fs/selinux**, **/sys/devices/virtual/powercap**.  The default paths that are read-only are **/proc/asound**, **/proc/bus**, **/proc/fs**, **/proc/irq**, **/proc/sys**, **/proc/sysrq-trigger**, **/sys/fs/cgroup**.

Note: Labeling can be disabled for all containers by setting **label=false** in the **containers.conf**(5) file.

<< if is_quadlet >>
