---
title: "Change your Docker Desktop settings (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/settings-and-maintenance/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Change your Docker Desktop settings

Customize Docker Desktop behavior and optimize performance and resource usage with Docker Desktop's settings.

To open **Settings** either:

- Select the Docker menu  and then **Settings**
- Select the **Settings** icon from the Docker Desktop Dashboard.

You can also locate the `settings-store.json` file at:
 - Mac: `~/Library/Group\ Containers/group.com.docker/settings-store.json`
 - Windows: `C:\Users\[USERNAME]\AppData\Roaming\Docker\settings-store.json`
 - Linux: `~/.docker/desktop/settings-store.json`

For information on enforcing settings at an organization level, see Settings Management.

## General

Configure startup behavior, UI appearance, terminal preferences, and feature defaults for Docker Desktop.

| Setting                                                           | Description                                                                | Default            | Platform     | Notes                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------ | ------------ | ------------------------------------- |
| **Start Docker Desktop when you sign in to your computer**        | Automatically start Docker Desktop when you sign in to your machine.        | Disabled           | All          | Recommended for frequent users.        |
| **Open Docker Dashboard when Docker Desktop starts**              | Automatically open the dashboard when starting Docker Desktop.              | Disabled           | All          |                                       |
| **Dashboard theme**                               | Apply a **Light** or **Dark** theme to Docker Desktop. | **Use system settings**. | All |                                   |
| **Configure shell completions**                                  | Edits your shell configuration to enable word completion for commands, flags, and Docker objects when you press `<Tab>` in your terminal. For more information, see Completion. | Disabled | All | |
| **Choose container terminal** | Sets which terminal opens when you select a container terminal. Use the integrated terminal to run commands in a running container from the Dashboard. For more information, see Explore containers. | Integrated | All | |
| **Enable integrated terminal**.                                       | Interact with your host machine and execute commands directly from Docker Desktop.  | Disabled | All | |
| **Enable Docker Debug by default**                                | Use Docker Debug by default opening the integrated terminal. For more information, see Explore containers.   | Disabled | All | |
| **Include VM in Time Machine backups**                            | Back up the Docker Desktop virtual machine. | Disabled | Mac | |
| **Use containerd for pulling and storing images**     | Uses containerd image store instead of classic image store. For more information, see containerd image store.| Enabled  | All   |           |
| **Expose daemon on tcp://localhost:2375 without TLS** | Allow legacy clients to connect to the Docker daemon. Use with caution as exposing the daemon without TLS can result in remote code execution attacks. | Disabled                  | Windows (Hyper-V backend only) | |
| **Use the WSL 2 based engine** | WSL 2 provides better performance than the Hyper-V backend. For more information, see Docker Desktop WSL 2 backend. | Disabled | Windows | |
| **Add \*.docker.internal to host file**                | Adds internal DNS entries.                                  | Enabled                   | Windows                        | Helps resolve Docker-internal domains |
| **Choose Virtual Machine Manager (VMM)**              | Choose the VMM for creating and managing the Docker Desktop Linux VM. For more information, see Virtual Machine Manager. | | Mac, Windows | Select **Docker VMM** for optimized container performance. Docker VMM is in Beta. |
| **Choose file sharing implementation for your containers** (Available with the Apple Virtualization framework VMM) | Choose whether you want to share files using **VirtioFS**, or **gRPC FUSE** | **VirtioFS** | Mac | Use VirtioFS for speedy file sharing. VirtioFS has reduced the time taken to complete filesystem operations by up to 98%. It is the only file sharing implementation supported by Docker VMM. |
|**Use Rosetta for x86_64/amd64 emulation on Apple Silicon** (Available with the Apple Virtualization framework VMM) | Accelerate x86/AMD64 binary emulation on Apple Silicon. | Disabled | Mac | |
| **Send usage statistics** | Send diagnostics, crash reports, and usage data to Docker to improve and troubleshoot the application. Docker may periodically prompt you for more information. | Enabled | All | |
| **Use Enhanced Container Isolation** | Prevent containers from breaching the Linux VM. For more information, see Enhanced Container Isolation. | Disabled | All | Must be signed in and have a Docker Business subscription. |
| **Show CLI hints**                                   | Display helpful CLI suggestions in terminal.               | Enabled                  | All        | Improves discoverability              |
| **Enable Docker Scout image analysis**                | Show a **Start analysis** button when inspecting an image, which analyzes the image with Docker Scout.         | Enabled                   | All   | |
| **Enable background SBOM indexing** | Automatically analyze images that you build or pull. | Disabled | All | |
| **Automatically check configuration** | Regularly check your configuration to ensure no unexpected changes have been made by another application. Notifies you if changes are found with the option to restore the configuration directly from the notification. For more information, see the FAQs. | Enabled | Mac | Docker Desktop checks if your setup, configured during installation, has been altered by external apps like Orbstack. Docker Desktop checks the symlinks of Docker binaries to `/usr/local/bin` and the symlink of the default Docker socket. Additionally, Docker Desktop ensures that the context is switched to `desktop-linux` on startup. |
