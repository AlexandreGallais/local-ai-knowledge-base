---
title: "podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 8 of 13)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-run.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman run --userns=auto:size=65536 ubi8-micro cat /proc/self/uid_map (part 8 of 13)

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
### `ShmSize=number[unit]`
<< else >>
#### **--shm-size**=*number[unit]*
<< endif >>

Size of _/dev/shm_. A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, there is no limit on the amount of memory used for IPC by the <<container|pod>>.
This option conflicts with **--ipc=host**.

#### **--shm-size-systemd**=*number[unit]*

Size of systemd-specific tmpfs mounts such as /run, /run/lock, /var/log/journal and /tmp.
A _unit_ can be **b** (bytes), **k** (kibibytes), **m** (mebibytes), or **g** (gibibytes).
If the unit is omitted, the system uses bytes. If the size is omitted, the default is **64m**.
When _size_ is **0**, the usage is limited to 50% of the host's available memory.

#### **--sig-proxy**

Proxy received signals to the container process. SIGCHLD, SIGURG, SIGSTOP, and SIGKILL are not proxied.

The default is **true**.

<< if is_quadlet >>
### `StopSignal=signal`
<< else >>
#### **--stop-signal**=*signal*
<< endif >>

Signal to stop a container. Default is **SIGTERM**.

<< if is_quadlet >>
### `StopTimeout=seconds`
<< else >>
#### **--stop-timeout**=*seconds*
<< endif >>

Timeout to stop a container. Default is **10**.
Remote connections use local containers.conf for defaults.

<< if is_quadlet >>
**Note:** this value should be lower than the actual systemd unit timeout to ensure the `podman rm` command is not killed by systemd.
<< endif >>

<< if is_quadlet >>
### `SubGIDMap=name`
<< else >>
#### **--subgidname**=*name*
<< endif >>

Run the container in a new user namespace using the map with _name_ in the _/etc/subgid_ file.
When running rootless, the user needs the necessary permissions to use the mapping. See **subgid**(5).
This flag conflicts with << '**UserNS=**' if is_quadlet else '**--userns**' >> and << '**GIDMap=**' if is_quadlet else '**--gidmap**' >>.
Together with << '**GIDMap=**' if is_quadlet else '**--gidmap**' >> it acts as if << '**GIDMap=**' if is_quadlet else '**--gidmap**' >> was passed with all mappings of the _name_ group in _/etc/subgid_.

<< if is_quadlet >>
### `SubUIDMap=name`
<< else >>
#### **--subuidname**=*name*
<< endif >>

Run the container in a new user namespace using the map with _name_ in the _/etc/subuid_ file.
When running rootless, the user needs the necessary permissions to use the mapping. See **subuid**(5).
This flag conflicts with << '**UserNS=**' if is_quadlet else '**--userns**' >> and << '**UIDMap=**' if is_quadlet else '**--uidmap**' >>.
Together with << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> it acts as if << '**UIDMap=**' if is_quadlet else '**--uidmap**' >> was passed with all mappings of the _name_ user in _/etc/subuid_.

<< if is_quadlet >>
### `Sysctl=name=value`
<< else >>
#### **--sysctl**=*name=value*
<< endif >>

Configure namespaced kernel parameters <<at runtime|for all containers in the pod>>.

For the IPC namespace, the following sysctls are allowed:

- kernel.msgmax
- kernel.msgmnb
- kernel.msgmni
- kernel.sem
- kernel.shmall
- kernel.shmmax
- kernel.shmmni
- kernel.shm_rmid_forced
- Sysctls beginning with fs.mqueue.\*

Note: <<if using the **--ipc=host** option|if the ipc namespace is not shared within the pod>>, the above sysctls are not allowed.

For the network namespace, only sysctls beginning with net.\* are allowed.

Note: <<if using the **--network=host** option|if the network namespace is not shared within the pod>>, the above sysctls are not allowed.

#### **--systemd**=*true* | *false* | *always*

Run container in systemd mode. The default is **true**.

- **true** enables systemd mode only when the command executed inside the container is *systemd*, */usr/sbin/init*,
*/sbin/init* or */usr/local/sbin/init*.

- **false** disables systemd mode.

- **always** enforces the systemd mode to be enabled.

Running the container in systemd mode causes the following changes:

* Podman mounts tmpfs file systems on the following directories
  * _/run_
  * _/run/lock_
  * _/tmp_
  * _/sys/fs/cgroup/systemd_ (on a cgroup v1 system)
  * _/var/lib/journal_
* Podman sets the default stop signal to **SIGRTMIN+3**.
* Podman sets **container_uuid** environment variable in the container to the
first 32 characters of the container ID.
* Podman does not mount virtual consoles (_/dev/tty\d+_) when running with **--privileged**.
* On cgroup v2, */sys/fs/cgroup* is mounted writable.

This allows systemd to run in a confined container without any modifications.

Note that on **SELinux** systems, systemd attempts to write to the cgroup
file system. Containers writing to the cgroup file system are denied by default.
The **container_manage_cgroup** boolean must be enabled for this to be allowed on an SELinux separated system.
```
setsebool -P container_manage_cgroup true
```

#### **--timeout**=*seconds*

Maximum time a container is allowed to run before conmon sends it the kill
signal.  By default containers run until they exit or are stopped by
`podman stop`.

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
### `Tmpfs=`
<< else >>
#### **--tmpfs**=*fs*
<< endif >>

Create a tmpfs mount.

Mount a temporary filesystem (**tmpfs**) mount into a container, for example:

```
$ podman <<subcommand>> -d --tmpfs /tmp:rw,size=787448k,mode=1777 my_image
```

This command mounts a **tmpfs** at _/tmp_ within the container. The supported mount
options are the same as the Linux default mount flags. If no options are specified,
the system uses the following options:
**rw,noexec,nosuid,nodev**.

By default, Podman enables **tmpcopyup** on tmpfs mounts, which copies the contents
of the underlying image directory into the tmpfs before mounting it. This also
applies when the tmpfs destination is inside a volume or bind mount: files from
the parent mount are copied into the tmpfs, so the parent content remains visible.
To mount an empty tmpfs that shadows a parent mount's subtree, use the
**notmpcopyup** option:

```
$ podman <<subcommand>> --volume myvolume:/data --tmpfs /data/sub:notmpcopyup my_image
```

#### **--tty**, **-t**

Allocate a pseudo-TTY. The default is **false**.

When set to **true**, Podman allocates a pseudo-tty and attach to the standard
input of the container. This can be used, for example, to run a throwaway
interactive shell.

**NOTE**: The --tty flag prevents redirection of standard output.  It combines STDOUT and STDERR, it can insert control characters, and it can hang pipes. This option is only used when run interactively in a terminal. When feeding input to Podman, use -i only, not -it.

```
echo "asdf" | podman run --rm -i someimage /bin/cat
```

<< if is_quadlet >>
### `Timezone=timezone`
<< else >>
#### **--tz**=*timezone*
<< endif >>

Set timezone in container. This flag takes area-based timezones, GMT time, as well as `local`, which sets the timezone in the container to match the host machine. See `/usr/share/zoneinfo/` for valid timezones.
Remote connections use local containers.conf for defaults

<< if is_quadlet >>
