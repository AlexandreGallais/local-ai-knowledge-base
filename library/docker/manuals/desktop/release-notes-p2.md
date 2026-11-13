---
title: "Docker Desktop release notes (part 2 of 21)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/release-notes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Desktop release notes (part 2 of 21)

## 4.95.0

### Updates

- Docker Compose v5.6.0
- Docker Offload v0.6.73
- Docker Scout CLI v1.26.0
- Docker Agent v1.145.0

### Bug fixes and enhancements

#### For all platforms

- Fixed the engine restarting right after Docker Desktop starts when an admin policy enables Enhanced Container Isolation.
- Fixed automatic update downloads starting before sign-in on machines that enforce sign-in, which could ignore an organization's policy disabling updates.
- Fixed long Ask Gordon conversations where the end of responses was hidden behind the user's message, and where scrolling up jumped around or got stuck.
- Fixed **Settings** accepting a disk image location inside the Docker Desktop installation directory, which the installer replaces on every update. Fixes docker/desktop-feedback#667.
- Fixed **Quit** doing nothing in the error dialog shown when the Docker Engine fails, and the dialog taking around 2 minutes to appear when the engine fails while starting.
- Fixed an issue where Gordon AI chat displayed the final answer inside the collapsed Activity section instead of below it when token usage was hidden by the gateway.
- Fixed an issue where gathering diagnostics from the error dialog failed repeatedly when Docker Desktop could not start.
- Fixed Kubernetes occasionally failing to start when a Registry Access Management image pull hit a transient network timeout.
- Added `docker desktop auth status` CLI subcommand to display Docker Hub login status, username, email, plan, and organization membership, with `--format pretty|json` output options.

#### For Mac

- Fixed Docker Desktop being unable to start subprocesses after being launched a second time.

#### For Windows

- Fixed an issue on Windows with WSL 3.0.1 where `docker info` reported `Docker Desktop (containerized)` instead of `Docker Desktop`, causing `docker debug` to fail when Registry Access Management is enabled.
- Fixed a Windows update failure where `app.asar` was reported as locked by Docker Desktop.
- Fixed the Windows installer deleting the WSL data disk during an update when the data root was inside the installation directory. Fixes docker/desktop-feedback#667.
- Fixed Docker Desktop failing to start with the Hyper-V backend when the Windows hosts file is protected by an antivirus or endpoint security tool.
- Fixed issues on Windows with WSL/MSYS2 native symlink (LX symlink) handling, sparse stream exports via backup tar, and a race condition in named pipe listener close.
- Added a dedicated error message when the Hyper-V virtual machine cannot start because the host does not have enough free memory.
- Fixed an intermittent MSI installation failure (error code 1603) on Windows caused by analytics custom actions racing with other installer steps.
- Fixed a per-user installation on Windows silently completing on machines where the Virtual Machine Platform feature is disabled, leaving Docker Desktop unable to start.
- The Windows installer now fails with an explicit error when a per-user installation is attempted from the SYSTEM account (e.g. deployed via SCCM or Intune), instead of silently installing into the SYSTEM profile.
- Fixed an issue where the Hyper-V VM could fail to start after a restart because its disk was still being compacted.

## 4.94.0

### Update

- Docker Offload `v0.6.53`
- containerd v2.3.6
- Docker Agent v1.144.0
- NVIDIA Container Toolkit v1.20.1
- Docker Scout CLI v1.25.0
- Docker Engine v29.8.2
- Docker Buildx v0.37.2

### Bug fixes and enhancements

#### For all platforms

- Fixed an issue where Resource Saver could pause the VM before the Docker API was ready, causing transient errors during engine startup or restart.
- Fixed `kubectl logs` not working with `kubeadm`.
- Fixed the Docker Desktop service being left stopped after an update when it was running but not configured to auto-start.
- Fixed stored API keys being written in clear to Docker Desktop logs and included in diagnostics bundles.
- Fixed the account name and tier briefly showing as empty and personal after a restart when Docker Hub was slow to respond.
- Changed the default logging driver for new Linux containers to `local` to enable automatic log rotation and reduce disk usage.
- Fixed an issue in the **Images** view where the reclaimable disk space value could get stuck at **0 Bytes** while selecting images for deletion.
- Improved VM disk creation speed and reduced host disk space usage by skipping unnecessary inode table zeroing on sparse and pre-zeroed storage.
- Fixed Docker Desktop writing a multi-gigabyte error file and consuming excessive memory when the backend failed to start.
- Docker Desktop now names the settings file that needs correcting instead of reporting an unexpected error when it contains invalid JSON.
- Stopped Docker Desktop logs from recording unobfuscated values for IPC payloads that are JSON arrays or plain strings.
- Fixed a deadlock that caused Docker Desktop to hang indefinitely when quitting while an engine recovery or error dialog was displayed.
- Fixed the kindest/node tag showing blank in `docker desktop kubernetes images`.
- docker-pass:
   - Removing a secret that does not exist is now consistent with other `docker remove` commands.
   - Running the examples from the help text no longer prefixes the secret with a line break.
- Fixed long Ask Gordon conversations where the end of responses was hidden behind the user's message, and where scrolling up jumped around or got stuck.

#### For Mac

- Docker Desktop now trusts only the certificates in `SSL_CERT_FILE` or `SSL_CERT_DIR` when either is set, instead of the system certificate store. If that bundle lacks a root certificate Docker Desktop needs, such as the ISRG roots used by `login.docker.com`, sign-in fails with `x509: certificate signed by unknown authority`. To fix it, add the missing root certificates to the bundle or unset the variable.
- Fixed the update tooltip suggesting to move Docker Desktop to `/Applications` when that is the folder the current user cannot modify. Fixes docker/desktop-feedback#598.
- Fixed repeated privileged-access prompts when Docker Desktop starts automatically after a reboot. Fixes docker/desktop-feedback#651.
- Fixed the "CLI tools installation" setting on macOS reverting to System when Docker Desktop could not update the login shell profile.
- Fixed zsh completions not being set up when `~/.zshrc` doesn't exist.

#### For Windows

- Docker Desktop now trusts only the certificates in `SSL_CERT_FILE` or `SSL_CERT_DIR` when either is set, instead of the system certificate store. If that bundle lacks a root certificate Docker Desktop needs, such as the ISRG roots used by `login.docker.com`, sign-in fails with `x509: certificate signed by unknown authority`. To fix it, add the missing root certificates to the bundle or unset the variable.
- Improved WSL startup errors to explain when virtualization is disabled in firmware, nested virtualization is unavailable, or the Windows hypervisor is disabled at startup, with guidance for resolving each condition.
- Fixed the Docker Desktop service losing its automatic start mode after an update run by WinGet or another external installer when the service had been installed with `--always-run-service`.
- Fixed a bug introduced in 4.92.0 where WSL integration could fail to start with "timed out waiting for ... to be automounted". Fixes docker/desktop-feedback#695.

#### For Linux

- Fixed a bug on Linux where quitting Docker Desktop could close unrelated applications, including all open terminal windows. Fixes docker/desktop-linux#109.

### Security

- Addressed CVE-2026-123082, where Docker Desktop 4.43.0 through 4.93.x could write the signed-in user's Docker Hub access token in cleartext to local application logs and diagnostics bundles. If you've generated or shared diagnostics bundles with an affected version, or kept copies of Docker Desktop logs elsewhere, delete or sanitize them.

## 4.93.0

### Updates

- Docker Offload `v0.6.33`
- Docker Agent v1.141.0
- Docker Engine v29.8.1
- Linux kernel `v7.0.14`

### Bug fixes and enhancements

#### For all platforms

- CLI plugin updates are now managed directly from the app bundle and the **Automatically update components** setting has been removed.
- Fixed Enhanced Container Isolation not being enforced on an engine that was left running while another one was in use.
- Fixed Enhanced Container Isolation not being enforced when an administrator policy arrived after the engine had started.
Fixed Enhanced Container Isolation not being enforced when the sign-in completed after the engine had started.
- Fixed file sharing directories (and other list settings) reverting to their default after clearing them and restarting Docker Desktop. Fixes docker/desktop-feedback#515.
- Fixed a security vulnerability that allowed VM-side code to request Unix socket port forwards, which could expose arbitrary host paths to manipulation.
- Fixed an issue where dismissing the walkthroughs lead-in on the **Containers** or **Images** screen was not reliably preserved across sessions.
- Fixed a silent failure when Docker Desktop cannot open an external URL by showing an error notification, and fixed ephemeral error notifications incorrectly appearing as unread in the notification bell.
- Fixed an issue where Docker Desktop continued showing Kubernetes as running after a cloud cluster stopped externally.
- Fixed cluster reconnect failures in Kubernetes Offload mode and updated the cluster creation dialog to show only relevant kind cluster options when in Offload mode.
- Fixed Docker Desktop failing to start with an unexpected error when the engine needed more than five minutes to recover after an unclean shutdown.
- Updated the Linux kernel to 7.0.14, fixing MongoDB 8 containers refusing to start. Fixes [docker/desktop-feedback#682].

#### For Mac

- Fixed the command-line installer removing the privileged `vmnetd` helper when run without `--user`.
- Fixed a bug that could make Docker Desktop updates fail repeatedly when a leftover staging directory from a previous update couldn't be deleted.
- Added a clear error message when macOS denies Docker Desktop the virtualization entitlement, for example due to an MDM configuration profile.
- Fixed an issue where the Repair function showed no explanation when CLI plugins failed to be correctly set up.
- Docker Desktop no longer overwrites a more recent CLI plugin installed under `~/.docker/cli-plugins`, matching existing Windows behavior.
- Fixed "previous version restored" after a failed update even when the restore itself failed.

#### For Windows

- Fixed an issue where MSI installs never added the installing user to the `docker-users` group, requiring manual group membership configuration.
- Fixed an issue on Windows where update failures showed a generic error message instead of the actual installer error details.
- Fixed a bug where a failed read of a WSL distro's `config.json` caused the distro agent to crash, disabled WSL integration, and prevented factory reset from cleaning up `~/.docker` properly.
- Fixed an issue where the Docker CLI credential store in a WSL2 distro could be unexpectedly reset to the default on restart.
- Fixed an unhelpful error message when WSL timed out registering the Docker Desktop Linux distribution.
- Fixed spurious "WSL integration with distro unexpectedly stopped" dialogs when the Docker Desktop engine was being stopped or restarted.
- Fixed a false "Virtualization support not detected" error when starting the WSL2 backend on Windows systems with Virtual Machine Platform enabled but the vfpext service absent.
- Fixed a startup crash (exit code 151) on Windows when config files such as `settings-store.json` or `daemon.json` were saved with a UTF-8 BOM by an external editor or provisioning tool.
- Fixed a WSL integration issue where the proxy could fatally timeout at startup when restoring persisted bind mounts, especially with non-default `wsl.conf` automount root configurations.

#### For Linux

- Docker Desktop no longer overwrites a more recent CLI plugin installed under `~/.docker/cli-plugins`, matching existing Windows behavior.
