---
title: "Change your Docker Desktop settings (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/settings-and-maintenance/settings.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Change your Docker Desktop settings (part 2 of 3)

## VM resources

Control the CPU, memory, disk, file sharing, proxy, and network resources available to Docker Desktop.

### Advanced

| Setting             | Description                               | Platform | Notes                                 |
| ------------------- | ----------------------------------------- | -------- | ------------------------------------- |
| **CPU limit** | Specify the maximum number of CPUs to be used by Docker Desktop. | Mac, Linux, Windows Hyper-V | |
| **Memory limit** | RAM allocated to the Docker VM | Mac, Linux, Windows Hyper-V | Defaults to 50% of your host's memory. |
| **Swap** | Configure swap file size as needed. | Mac, Linux, Windows Hyper-V | 1 GB default. |
| **Disk usage limit** | Specify the maximum amount of disk space the engine can use. | Mac, Linux, Windows Hyper-V | |
|  **Disk image location** | Specify the location of the Linux volume where containers and images are stored. In the **Advanced** section, you can limit resources available to the Docker Linux VM. | Mac, Linux, Windows Hyper-V | You can also move the disk image to a different location. If you attempt to move a disk image to a location that already has one, you are asked if you want to use the existing image or replace it. |
| **Resource saver** | Enable or disable Resource saver mode, which significantly reduces CPU and memory utilization on the host by automatically turning off the Linux VM when Docker Desktop is idle. | Mac, Linux, Windows Hyper-V | Restarts automatically when containers run. Restart may take 3–10 seconds. |

In WSL 2 mode, configure memory, CPU, and swap limits on the WSL 2 utility VM.

> **Tip:**
>
> If you feel Docker Desktop starting to get slow or you're running
> multi-container workloads, increase the memory and disk image space allocation.

### File sharing

Use File sharing to allow local directories on your machine to be shared with
Linux containers. This is especially useful for editing source code in an IDE on
the host while running and testing the code in a container.

| Setting             | Description                               | Platform | Notes                                 |
| ------------------- | ----------------------------------------- | -------- | ------------------------------------- |
| **Synchronized file shares** | Fast and flexible host-to-VM file sharing, enhancing bind mount performance through the use of synchronized filesystem caches. To learn more, see Synchronized file share. | Mac, Linux, Windows Hyper-V | Available with Pro, Team, and Business subscriptions. |
| **Virtual file shares** | Share local directories with Linux containers. By default the `/Users`, `/Volumes`, `/private`, `/tmp` and `/var/folders` directory are shared. If your project is outside this directory then it must be added to the list, otherwise you may get `Mounts denied` or `cannot start service` errors at runtime. | Mac, Linux, Windows Hyper-V | |

- Share only the directories that you need with the container. File sharing
introduces overhead as any changes to the files on the host need to be notified
to the Linux VM. Sharing too many files can lead to high CPU load and slow
filesystem performance.
- Shared folders are designed to allow application code to be edited
on the host while being executed in containers. For non-code items
such as cache directories or databases, the performance will be much
better if they are stored in the Linux VM, using a data volume
(named volume) or data container.
- If you share the whole of your home directory into a container, Mac may
prompt you to give Docker access to personal areas of your home directory such as
your Reminders or Downloads.
- By default, Mac file systems are case-insensitive while Linux is case-sensitive.
On Linux, it is possible to create two separate files: `test` and `Test`,
while on Mac these filenames would actually refer to the same underlying
file. This can lead to problems where an app works correctly on a developer's
machine (where the file contents are shared) but fails when run in Linux in
production (where the file contents are distinct). To avoid this, Docker Desktop
insists that all shared files are accessed as their original case. Therefore,
if a file is created called `test`, it must be opened as `test`. Attempts to
open `Test` will fail with the error "No such file or directory". Similarly,
once a file called `test` is created, attempts to create a second file called
`Test` will fail.

For more information, see Volume mounting requires file sharing for any project directories outside of `/Users`.

### Proxies

Docker Desktop supports HTTP/HTTPS and SOCKS5 proxies. SOCKS5 requires a Business subscription.

To prevent developers from accidentally changing the proxy settings, see
Settings Management.

#### Docker Desktop proxy

Used for Docker Desktop host-level traffic: signing in to Docker, the Desktop application, CLI, and extensions. Acts as a fallback for `docker image pull` only when Containers proxy is not configured.

| Proxy mode | Description |
|------------|-------------|
| **System proxy** | Use the proxy configured on the host (static or Proxy Auto-Configuration (PAC)). Docker Desktop reads this automatically. |
| **No proxy** | Connect directly without a proxy. |
| **Manual configuration** | Enter a **Web Server (HTTP)** and **Secure Web Server (HTTPS)** URL manually. Use the format `http://proxy:port` or `https://proxy:port`. You can also specify hosts and domains that should bypass the proxy, for example: `registry-1.docker.com,*.docker.com,10.0.0.0/8`. |

Docker Desktop reads a proxy or PAC URL that is statically configured on the
host. For example a manual proxy setting, a static PAC file URL, or a
GPO-managed override. WPAD (Web Proxy Auto-Discovery Protocol) auto-discovery
is untested on both Windows and Mac and isn't officially supported. If your
proxy is only discoverable via WPAD (DHCP option 252 or the `wpad.<domain>`
DNS convention), configure a static PAC URL or proxy address instead.

> **Note:**
>
> If you use a PAC file hosted on a web server, add the MIME type `application/x-ns-proxy-autoconfig` for the `.pac` extension. Without this, the PAC file may not parse correctly. See Hardened Docker Desktop.

#### Containers proxy

Used for `docker image pull` (always enforced - all `docker pull` and Compose pull operations go through this proxy) and for outbound traffic from running containers when air-gapped container enforcement is configured. If a PAC file is configured here, ensure it returns an appropriate proxy server for Docker registry endpoints, or image pulls will fail.

| Proxy mode | Description |
|------------|-------------|
| **Same as host proxy** | Use the same proxy configuration as the Docker Desktop proxy. |
| **System proxy** | Use the proxy configured on the host. |
| **No proxy** | Connect directly without a proxy. |
| **Manual configuration** | Enter a **Web Server (HTTP)** and **Secure Web Server (HTTPS)** URL manually. Use the format `http://proxy:port` or `https://proxy:port`. You can also specify hosts and domains that should bypass the proxy, for example: `registry-1.docker.com,*.docker.com,10.0.0.0/8`. |

> **Note:**
>
> The HTTPS proxy used for image scanning is configured using the `HTTPS_PROXY` environment variable.

#### Windows Docker daemon proxy

When you run Windows containers, enable **Use proxy for Windows Docker daemon**
to let the Windows Docker daemon connect to Docker Desktop's internal proxy.
This allows Windows containers to use the configured Docker Desktop proxy, and
it is required if you want Registry Access Management
restrictions to apply to Windows image operations. Administrators can manage
the same behavior with
**Override Windows "dockerd" port**.

#### Proxy authentication

| Method |  Behavior | Notes |
|--------|-----------| ----- |
| **Basic** | Docker Desktop prompts for credentials and caches them in the OS credential store. | Use an `https://` proxy URL to protect passwords in transit. Supports TLS 1.3. |
| **Kerberos / NTLM** |  Centralizes authentication — developers aren't prompted for credentials, reducing the risk of account lockouts. If the proxy returns multiple schemes in a 407 response, Docker Desktop defaults to Basic. | Requires a Business subscription. To enable Kerberos or NTLM proxy authentication you must pass the `--proxy-enable-kerberosntlm` installer flag during installation via the command line, and ensure your proxy server is properly configured for Kerberos or NTLM authentication. |

### Network

> **Note:**
>
> On Windows, the **Network** tab is not available in Windows container mode because Windows manages networking.

| Setting | Description | Platform |
|---------|-------------|----------|
| **Docker subnet** | Set a custom subnet to avoid conflicts with IPs in your environment. Docker Desktop uses a private IPv4 network for internal services, including a DNS server and HTTP proxy. Default: `192.168.65.0/24`. | All |
| **Use kernel networking for UDP** | Use a more efficient kernel networking path for UDP traffic. May not be compatible with VPN software. | Mac |
| **Enable host networking** | Allows containers started with `--net=host` to use `localhost` to connect to TCP and UDP services on the host. Also allows host software to use `localhost` to connect to TCP and UDP services in the container. | Mac |

On Windows and Mac, you can also set the default networking mode and DNS resolution behavior. For more information, see Networking.

### WSL integration (Windows only)

| Setting             | Description                               | Notes                               |
| ------------------- | ----------------------------------------- | ------------------------------------- |
| WSL distribution integration| Select which WSL 2 distributions have Docker WSL integration enabled. | Integration is enabled on your default WSL distribution by default. To change your default distribution, run `wsl --set-default <distribution name>`. |

For more details on configuring Docker Desktop to use WSL 2, see
Docker Desktop WSL 2 backend.

## AI features

From the AI features section, you can configure settings for:

- Gordon, the AI-powered assistant that takes action on your Docker workflows.
- Docker Model Runner, which makes it easy to manage, run, and deploy AI models using Docker.

## Beta features

Beta features provide access to future product functionality.
These features are intended for testing and feedback only as they may change
between releases without warning or remove them entirely from a future
release. Beta features must not be used in production environments.
Docker doesn't offer support for beta features.

You can also sign up to the Developer Preview program from the **Beta features** section.

For a list of current experimental features in the Docker CLI, see Docker CLI Experimental features.

## Builders

Use the **Builders** section to inspect and manage builders in the Docker Desktop settings.

### Inspect

To inspect builders, find the builder that you want to inspect and select the
expand icon. You can only inspect active builders.

Inspecting an active builder shows:

- BuildKit version
- Status
- Driver type
- Supported capabilities and platforms
- Disk usage
- Endpoint address

### Select a different builder

The **Selected builder** section displays the selected builder.
To select a different builder:

1. Find the builder that you want to use under **Available builders**
2. Open the drop-down menu next to the builder's name.
3. Select **Use** to switch to this builder.

Your build commands now use the selected builder by default.

### Create a builder

To create a builder, use the Docker CLI. See
Create a new builder

### Remove a builder

You can remove a builder if:

- The builder isn't your selected builder
- The builder isn't associated with a Docker context.

  To remove builders associated with a Docker context, remove the context using
  the `docker context rm` command.

To remove a builder:

1. Find the builder that you want to remove under **Available builders**
2. Open the drop-down menu.
3. Select **Remove** to remove this builder.

If the builder uses the `docker-container` or `kubernetes` driver,
the build cache is also removed, along with the builder.

### Stop and start a builder

Builders that use the
`docker-container` driver
run the BuildKit daemon in a container.
You can start and stop the BuildKit container using the drop-down menu.

Running a build automatically starts the container if it's stopped.

You can only start and stop builders using the `docker-container` driver.

## Docker Engine

Configure the Docker daemon using a JSON configuration file.

The file is located at `$HOME/.docker/daemon.json`. Edit it directly in the Docker Desktop Dashboard or in a text editor.

To see the full list of possible configuration options, see the
dockerd command reference.

## Extensions

Enable Docker Extensions and control which extensions are available to install and run.

| Setting             | Description                               |
| ------------------- | ----------------------------------------- |
| **Enable Docker Extensions** | Turn Docker Extensions on or off. Turned off by default. |
| **Allow only extensions distributed through the Docker Marketplace** | Restrict extensions to Marketplace-approved sources only. |
| **Show Docker Extensions system containers** | Show containers used by Docker Extensions. |

For more information about Docker extensions, see Docker Extensions.

## Docker Offload

Enable Docker Offload v1 and configure idle timeout and GPU support for cloud-based workloads.

| Setting             | Description                               | Notes                                 |
| ------------------- | ----------------------------------------- | ------------------------------------- |
| **Enable Docker Offload** | Run your containers in the cloud using Docker Offload v1.  | Requires sign-in and an Offload subscription |
| **Idle timeout** | Set the duration of time between no activity and Docker Offload entering idle mode. For details about idle timeout, see Session management and idle state. | |
| **Enable GPU support** | Let your workloads use cloud GPU if available. | |
