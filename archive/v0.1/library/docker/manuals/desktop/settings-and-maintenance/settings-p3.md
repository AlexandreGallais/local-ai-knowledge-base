---
title: "Change your Docker Desktop settings (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/settings-and-maintenance/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Change your Docker Desktop settings (part 3 of 3)

## Kubernetes

> **Note:**
>
> On Windows the **Kubernetes** section is not available in Windows container mode.

Enable and configure the built-in standalone Kubernetes cluster for testing container deployments.

| Setting             | Description                               |
| ------------------- | ----------------------------------------- |
| **Enable Kubernetes** | Install and run a standalone Kubernetes server as a Docker container for testing deployments. |
| **Cluster provisioning method** | Choose either **Kubeadm**, a single-node cluster with the version set by Docker Desktop, or **Kind**, a multi-node cluster where you can set the version and number of nodes. |
| **Show system containers (advanced)** | Show internal containers when using Docker commands. |
| **Reset Kubernetes cluster** | Delete all stacks and Kubernetes resources. |

For more information about using the Kubernetes integration with Docker Desktop,
see Explore the Kubernetes view.

## Advanced (Mac only)

Reconfigure CLI tool installation paths and privileged system permissions. With Docker Desktop version 4.88.0 and earlier, these can be set during installation.

| Setting             | Description                               | Notes                               |
| ------------------- | ----------------------------------------- | ------------------------------------- |
| CLI tools installation — **System** | Install Docker CLI tools to `/usr/local/bin`. | Requires password with version 4.89.0 and later. |
| CLI tools installation — **User** | Install Docker CLI tools to `$HOME/.docker/bin`. This is the default with version 4.89.0 and later. | Automatically added to your PATH in version 4.89.0 and later. |
| **Allow the default Docker socket to be used** | Creates `/var/run/docker.sock` which some third party clients may use to communicate with Docker Desktop. For more information, see permission requirements for macOS. | Requires password |
| **Allow privileged port mapping** | Starts the privileged helper process which binds the ports that are between 1 and 1024. For more information, see permission requirements for macOS. | Available with version 4.88.0 and earlier. Requires password |
| **Allow privileged port forwarding to external machines** | Allows privileged ports (1 to 1024) to be exposed to other machines on your local network. When turned off, privileged ports are only reachable through loopback addresses. For more information, see permission requirements for Mac. | Available with version 4.97 and later. Doesn't require a password |

## Notifications

Choose which types of Docker Desktop notifications you want to receive.

| Notification type | Default|
| ----------------- | ------ |
| Status updates on tasks and processes | Enabled |
| Recommendations from Docker | Enabled |
| Docker announcements | Enabled |
| Docker surveys | Enabled |
| Error notifications | Always Enabled (cannot be changed) |
| New releases | Always Enabled (cannot be changed) |

Notifications appear briefly in the lower-right of the Docker Desktop Dashboard, then move to the **Notifications** drawer, accessible from the top-right of the Dashboard.

## Updates

Manage how and when Docker Desktop checks for and downloads updates.

| Setting             | Description                               | Default                             |
| ------------------- | ----------------------------------------- | ------------------------------------- |
| **Automatically check for updates** | Notifies you of available updates in the Docker menu and Dashboard footer. | Enabled |
| **Always download updates** | Automatically download new versions of Docker Desktop in the background. | Disabled |
