---
title: "Troubleshooting (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/security/rootless/troubleshoot.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

### Distribution-specific hint

**Ubuntu**
- Ubuntu 24.04 and later enables restricted unprivileged user namespaces by
  default, which prevents unprivileged processes in creating user namespaces
  unless an AppArmor profile is configured to allow programs to use
  unprivileged user namespaces.

  If you install `docker-ce-rootless-extras` using the deb package (`apt-get
  install docker-ce-rootless-extras`), then the AppArmor profile for
  `rootlesskit` is already bundled with the `apparmor` deb package. With this
  installation method, you don't need to add any manual the AppArmor
  configuration. If you install the rootless extras using the installation
  script, however, you must add an AppArmor
  profile for `rootlesskit` manually:

  1. Create and install the currently logged-in user's AppArmor profile:

     ```console
     $ filename=$(echo $HOME/bin/rootlesskit | sed -e 's@^/@@' -e 's@/@.@g')
     $ [ ! -z "${filename}" ] && sudo cat <<EOF > /etc/apparmor.d/${filename}
     abi <abi/4.0>,
     include <tunables/global>

     "$HOME/bin/rootlesskit" flags=(unconfined) {
       userns,

       include if exists <local/${filename}>
     }
     EOF
     ```
  2. Restart AppArmor.

     ```console
     $ systemctl restart apparmor.service
     ```

**Arch Linux**
- Add `kernel.unprivileged_userns_clone=1` to `/etc/sysctl.conf` (or
  `/etc/sysctl.d`) and run `sudo sysctl --system`

**openSUSE and SLES**
- `sudo modprobe ip_tables iptable_mangle iptable_nat iptable_filter` is required.
  This might be required on other distributions as well depending on the configuration.

- Known to work on openSUSE 15 and SLES 15.

**CentOS, RHEL, and Fedora**
- For RHEL 8 and similar distributions, installing `fuse-overlayfs` is recommended. Run `sudo dnf install -y fuse-overlayfs`.
  This step is not required on RHEL 9 and similar distributions.

- You might need `sudo dnf install -y iptables`.

## Known limitations

- Only the following storage drivers are supported:
  - `overlay2` (only if running with kernel 5.11 or later)
  - `fuse-overlayfs` (only if running with kernel 4.18 or later, and `fuse-overlayfs` is installed)
  - `btrfs` (only if running with kernel 4.18 or later, or `~/.local/share/docker` is mounted with `user_subvol_rm_allowed` mount option)
  - `vfs`
- cgroup is supported only when running with cgroup v2 and systemd. See Limiting resources.
- Following features are not supported:
  - AppArmor
  - Checkpoint
  - Overlay network
  - Exposing SCTP ports
- To use the `ping` command, see Routing ping packets.
- To expose privileged TCP/UDP ports (< 1024), see Exposing privileged ports.
- `IPAddress` shown in `docker inspect` is namespaced inside RootlessKit's network namespace.
  This means the IP address is not reachable from the host without `nsenter`-ing into the network namespace.
- Port forwarding with `docker run -p` does not propagate source IP addresses by default.
  See `docker run -p` does not propagate source IP addresses to enable source IP propagation.
- NFS mounts as the docker "data-root" is not supported. This limitation is not specific to rootless mode.
- Capabilities added with `--cap-add` apply only to resources governed by the
  container's user namespace. They don't grant privileges over host or other
  global resources. As a result, operations that require capabilities in the
  initial user namespace
  can still fail.

### Historical limitations

#### Until Docker Engine v29.5

- Host network (`docker run --net=host`) was namespaced inside RootlessKit.
  This meant that ports listened by containers with `--net=host` were not reachable from the real host network namespace.
