---
title: "populate a cache and also consult it (part 3 of 8)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-farm-build.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# populate a cache and also consult it (part 3 of 8)

### `CertDir=path`
<< else >>
#### **--cert-dir**=*path*
<< endif >>

Use certificates at *path* (\*.crt, \*.cert, \*.key) to connect to the registry. (Default: /etc/containers/certs.d)
For details, see **containers-certs.d(5)**.
(This option is not available with the remote Podman client, including Mac and Windows (excluding WSL2) machines)

#### **--cgroup-parent**=*path*

Path to cgroups under which the cgroup for the <<container|pod>> is created. If the
path is not absolute, the path is considered to be relative to the cgroups path
of the init process. Cgroups are created if they do not already exist.

#### **--cgroupns**=*mode*

Set the cgroup namespace mode for the container.

- **host**: use the host's cgroup namespace inside the container.
- **container:**_id_: join the namespace of the specified container.
- **private**: create a new cgroup namespace.
- **ns:**_path_: join the namespace at the specified path.

If the host uses cgroups v1, the default is set to **host**. On cgroups v2, the default is **private**.

#### **--cleanup**

Remove built images from farm nodes on success (Default: false).

#### **--compat-volumes**

Handle directories marked using the VOLUME instruction (both in this build, and
those inherited from base images) such that their contents can only be modified
by ADD and COPY instructions. Any changes made in those locations by RUN
instructions will be reverted. Before the introduction of this option, this
behavior was the default, but it is now disabled by default.

#### **--compression-format**=**gzip** | *zstd* | *zstd:chunked*

Specifies the compression format to use.  Supported values are: `gzip`, `zstd` and `zstd:chunked`.  The default is `gzip` unless overridden in the containers.conf file.
`zstd:chunked` is incompatible with encrypting images, and will be treated as `zstd` with a warning in that case.

#### **--compression-level**=*level*

Specifies the compression level to use.  The value is specific to the compression algorithm used, e.g. for zstd the accepted values are in the range 1-20 (inclusive) with a default of 3, while for gzip it is 1-9 (inclusive) and has a default of 5.

#### **--cpp-flag**=*flags*

Set additional flags to pass to the C Preprocessor cpp(1). Containerfiles ending with a ".in" suffix is preprocessed via cpp(1). This option can be used to pass <example-value> flags to cpp.Note: You can also set default CPPFLAGS by setting the BUILDAH_CPPFLAGS environment variable (e.g., export BUILDAH_CPPFLAGS="-DDEBUG").

#### **--cpu-period**=*limit*

Set the CPU period for the Completely Fair Scheduler (CFS), which is a
duration in microseconds. Once the container's CPU quota is used up, it will not
be scheduled to run until the current period ends. Defaults to 100000
microseconds.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpu-quota**=*limit*

Limit the CPU Completely Fair Scheduler (CFS) quota.

Limit the container's CPU usage. By default, containers run with the full
CPU resource. The limit is a number in microseconds. If a number is provided,
the container is allowed to use that much CPU time until the CPU period
ends (controllable via **--cpu-period**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpu-shares**, **-c**=*shares*

CPU shares (relative weight).

By default, all containers get the same proportion of CPU cycles. This
proportion can be modified by changing the container's CPU share weighting
relative to the combined weight of all the running containers.
Default weight is **1024**.

The proportion only applies when CPU-intensive processes are running.
When tasks in one container are idle, other containers can use the
left-over CPU time. The actual amount of CPU time varies depending on
the number of containers running on the system.

For example, consider three containers, one has a cpu-share of 1024 and
two others have a cpu-share setting of 512. When processes in all three
containers attempt to use 100% of CPU, the first container receives
50% of the total CPU time. If a fourth container is added with a cpu-share
of 1024, the first container only gets 33% of the CPU. The remaining containers
receive 16.5%, 16.5% and 33% of the CPU.

On a multi-core system, the shares of CPU time are distributed over all CPU
cores. Even if a container is limited to less than 100% of CPU time, it can
use 100% of each individual CPU core.

For example, consider a system with more than three cores.
If the container _C0_ is started with **--cpu-shares=512** running one process,
and another container _C1_ with **--cpu-shares=1024** running two processes,
this can result in the following division of CPU shares:

| PID  |  container  | CPU     | CPU share    |
| ---- | ----------- | ------- | ------------ |
| 100  |  C0         | 0       | 100% of CPU0 |
| 101  |  C1         | 1       | 100% of CPU1 |
| 102  |  C1         | 2       | 100% of CPU2 |

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpuset-cpus**=*number*

CPUs in which to allow execution. Can be specified as a comma-separated list
(e.g. **0,1**), as a range (e.g. **0-3**), or any combination thereof
(e.g. **0-3,7,11-15**).

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--cpuset-mems**=*nodes*

Memory nodes (MEMs) in which to allow execution (0-3, 0,1). Only effective on
NUMA systems.

If there are four memory nodes on the system (0-3), use **--cpuset-mems=0,1**
then processes in the container only uses memory from the first
two memory nodes.

On some systems, changing the resource limits may not be allowed for non-root
users. For more details, see
https://github.com/containers/podman/blob/main/troubleshooting.md#26-running-containers-with-resource-limits-fails-with-a-permissions-error

This option is not supported on cgroups V1 rootless systems.

#### **--created-annotation**

Add an image *annotation* (see also **--annotation**) to the image metadata
setting "org.opencontainers.image.created" to the current time, or to the
datestamp specified to the **--source-date-epoch** or **--timestamp** flag,
if either was used.  If *false*, no such annotation will be present in the
written image.

Note: this information is not present in Docker image formats, so it is discarded when writing images in Docker formats.

<< if is_quadlet >>
### `Creds=[username[:password]]`
<< else >>
#### **--creds**=*[username[:password]]*
<< endif >>

The [username[:password]] to use to authenticate with the registry, if required.
If one or both values are not supplied, a command line prompt appears and the
value can be entered. The password is entered without echo.

Note that the specified credentials are only used to authenticate against
target registries.  They are not used for mirrors or when the registry gets
rewritten (see `containers-registries.conf(5)`); to authenticate against those
consider using a `containers-auth.json(5)` file.

<< if is_quadlet >>
### `DecryptionKey=key[:passphrase]`
<< else >>
#### **--decryption-key**=*key[:passphrase]*
<< endif >>

The [key[:passphrase]] to be used for decryption of images. Key can point to keys and/or certificates. Decryption is tried with all keys. If the key is protected by a passphrase, it is required to be passed in the argument and omitted otherwise.

<< if is_quadlet >>
### `AddDevice=host-device:container-device`
<< else >>
#### **--device**=*host-device:container-device*
<< endif >>

Add a host device to the <<container|pod>>. The format of this is
`HOST-DEVICE:CONTAINER-DEVICE`, where `HOST-DEVICE` is the path of
the device node on the host, `CONTAINER-DEVICE` is the path of the device node in
the container, and `PERMISSIONS` is a list of permissions combining 'r' for read,
'w' for write, and 'm' for mknod(2).

Example: **--device=/dev/sdc:/dev/xvdc:rwm**.

Note: if *host-device* is a symbolic link then it is resolved first.
The <<container|pod>> only stores the major and minor numbers of the host device.

Podman may load kernel modules required for using the specified
device. The devices that Podman loads modules for when necessary are:
/dev/fuse.

In rootless mode, the new device is bind mounted in the container from the host
rather than Podman creating it within the container space. Because the bind
mount retains its SELinux label on SELinux systems, the container can get
permission denied when accessing the mounted device. Modify SELinux settings to
allow containers to use all device labels via the following command:

$ sudo setsebool -P  container_use_devices=true

Note: if the user only has access rights via a group, accessing the device
from inside a rootless container fails. The **crun(1)** runtime offers a
workaround for this by adding the option
**--annotation run.oci.keep_original_groups=1**.

#### **--disable-compression**, **-D**

Don't compress filesystem layers when building the image unless it is required
by the location where the image is being written.  This is the default setting,
because image layers are compressed automatically when they are pushed to
registries, and images being written to local storage only need to be
decompressed again to be stored.  Compression can be forced in all cases by
specifying **--disable-compression=false**.

<< if is_quadlet >>
### `DNS=ipaddr`
<< else >>
#### **--dns**=*ipaddr*
<< endif >>

Set custom DNS servers.

This option can be used to override the DNS
configuration passed to the container. Typically this is necessary when the
host DNS configuration is invalid for the container (e.g., **127.0.0.1**). When this
is the case, the << '**DNS=.**' if is_quadlet else '**--dns**' >> flag is necessary for every run.

The special value **none** can be specified to disable creation of _/etc/resolv.conf_ in the container by Podman.
The _/etc/resolv.conf_ file in the image is then used without changes.

Note that **ipaddr** may be added directly to the container's _/etc/resolv.conf_.
This is not guaranteed though.  For example, passing a custom network whose *dns_enabled* is set to *true* to **--network** will result in _/etc/resolv.conf_ only referring to the aardvark-dns server.  aardvark-dns then forwards to the supplied **ipaddr** for all non-container name queries.

This option cannot be combined with **--network** that is set to **none**.

Note: this option takes effect only during *RUN* instructions in the build.
It does not affect _/etc/resolv.conf_ in the final image.

<< if is_quadlet >>
### `Environment=env=value [env=value ...]`
<< else >>
#### **--env**, **-e**=*env*
<< endif >>

Set environment variables.

This option allows arbitrary environment variables that are available for the process to be launched inside of the container. If an environment variable is specified without a value, Podman checks the host environment for a value and set the variable only if it is set on the host. As a special case, if an environment variable ending in __*__ is specified without a value, Podman searches the host environment for variables starting with the prefix and adds those variables to the container.

#### **--farm**

This option specifies the name of the farm to be used in the build process.

This option specifies the name of the farm to be used in the build process.

<< if is_quadlet >>
### `File=Containerfile`
<< else >>
#### **--file**, **-f**=*Containerfile*
<< endif >>

Specifies a Containerfile which contains instructions for building the image,
either a local file or an **http** or **https** URL.  If more than one
Containerfile is specified, *FROM* instructions are only accepted from the
last specified file.

<< if is_quadlet >>
Note that for a given relative path to a Containerfile, or when using a `http(s)://` URL, also set
`SetWorkingDirectory=` in order for `podman build` to find a valid context directory for the
resources specified in the Containerfile.

Note that setting a `File=` field is mandatory for a `.build` file, unless `SetWorkingDirectory` (or
a `WorkingDirectory` in the `Service` group) has also been set.
<< else >>
If a build context is not specified, and at least one Containerfile is a
local file, the directory in which it resides is used as the build
context.
<< endif >>

Specifying the option << 'File=-' if is_quadlet else '`-f -`' >> causes
the Containerfile contents to be read from stdin.

#### **--force-compression**

If set, push uses the specified compression algorithm even if the destination contains a differently-compressed variant already.
Defaults to `true` if `--compression-format` is explicitly specified on the command-line, `false` otherwise.

<< if is_quadlet >>
### `ForceRM=`
<< else >>
#### **--force-rm**
<< endif >>

Always remove intermediate containers after a build, even if the build fails (default true).

#### **--format**

Control the format for the built image's manifest and configuration data.
Recognized formats include *oci* (OCI image-spec v1.0, the default) and
*docker* (version 2, using schema format 2 for the manifest).

Note: You can also override the default format by setting the BUILDAH\_FORMAT
environment variable.  `export BUILDAH_FORMAT=docker`

#### **--from**

Overrides the first `FROM` instruction within the Containerfile.  If there are multiple
FROM instructions in a Containerfile, only the first is changed.

With the remote podman client, not all container transports work as
expected. For example, oci-archive:/x.tar references /x.tar on the remote
machine instead of on the client. When using podman remote clients it is
best to restrict use to *containers-storage*, and *docker:// transports*.

<< if is_quadlet >>
