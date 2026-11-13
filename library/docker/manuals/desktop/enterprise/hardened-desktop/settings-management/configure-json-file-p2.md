---
title: "Configure Settings Management with a JSON file (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/hardened-desktop/settings-management/configure-json-file.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Configure Settings Management with a JSON file (part 2 of 4)

## `admin-settings.json` configurations

The following tables describe all available settings in the `admin-settings.json` file.

> **Note:**
>
> Some settings are platform-specific or require minimum Docker Desktop versions. Check the Version column for requirements.

### General settings

| Parameter                  | OS           | Description                                                                                                                                                                                                      | Version                                |
| :------------------------- | ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `configurationFileVersion` |              | Specifies the version of the configuration file format.                                                                                                                                                          |                                        |
| `analyticsEnabled`         |              | If `value` is set to false, Docker Desktop doesn't send usage statistics to Docker.                                                                                                                              |                                        |
| `disableUpdate`            |              | If `value` is set to true, checking for and notifications about Docker Desktop updates is disabled.                                                                                                              |                                        |
| `blockDockerLoad`          |              | If `value` is set to `true`, users are no longer able to run `docker load` and receive an error if they try to.                                                             |                                        |
| `displayedOnboarding`      |              | If `value` is set to `true`, the onboarding survey will not be displayed to new users. Setting `value` to `false` has no effect.                                                                                 |  |
| `desktopTerminalEnabled`   |              | If `value` is set to `false`, developers cannot use the Docker terminal to interact with the host machine and execute commands directly from Docker Desktop.                                                     |                                        |
| `exposeDockerAPIOnTCP2375` | Windows only | Exposes the Docker API on a specified port. If `value` is set to true, the Docker API is exposed on port 2375. Note: This is unauthenticated and should only be enabled if protected by suitable firewall rules. |                                        |
| `silentModulesUpdate`      |              | If `value` is set to `true`, Docker Desktop automatically updates components that don't require a restart. For example, the Docker CLI or Docker Scout components.                                               | |

### Extensions

| Parameter                                     | OS  | Description                                                                                                                                                                                                    | Version |
| :-------------------------------------------- | --- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `extensionsEnabled`                           |     | If `value` is set to false, Docker Extensions are disabled.                                                                                                                                                    |         |
| `onlyMarketplaceExtensions`                   |     | If `value` is set to true, developers are blocked from installing other extensions via the command line.                                                                                                       |         |
| `extensionsPrivateMarketplace`                |     | If `value` is set to true, activates the private marketplace is enabled which ensures Docker Desktop connects to content defined and controlled by the administrator instead of the public Docker marketplace. |         |
| `extensionsPrivateMarketplaceAdminContactURL` |     | Defines a contact link for developers to request new extensions in the private marketplace.                                                                                                                    |         |

### File sharing and emulation

| Parameter                            | OS         | Description                                                                                                                                                                                                                                                                                                                                               | Version                                |
| :----------------------------------- | ---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `filesharingAllowedDirectories`      |            | Specify which paths your developers can add file shares to. Also accepts `$HOME`, `$TMP`, or `$TEMP` as `path` variables. When a path is added, its subdirectories are allowed. If `sharedByDefault` is set to `true`, that path will be added upon factory reset or when Docker Desktop first starts.                                                    |                                        |
| `useVirtualizationFrameworkVirtioFS` | macOS only | If `value` is set to `true`, VirtioFS is set as the file sharing mechanism. Note: If both `useVirtualizationFrameworkVirtioFS` and `useGrpcfuse` have `value` set to `true`, VirtioFS takes precedence. If both are set to `false`, Docker Desktop fails to start with an error, as at least one file sharing mechanism must be enabled. |                                        |
| `useGrpcfuse`                        | macOS only | If `value` is set to `true`, gRPC Fuse is set as the file sharing mechanism.                                                                                                                                                                                                                                                                              |                                        |
| `useVirtualizationFrameworkRosetta`  | macOS only | If `value` is set to `true`, Docker Desktop turns on Rosetta to accelerate x86_64/amd64 binary emulation on Apple Silicon. Note: This also automatically enables `Use Virtualization framework`.                                                                                                                                                          |  |

### Docker Scout

| Parameter | OS  | Description                                                                                                                                                                                                                                                            | Version |
| :-------- | --- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `scout`   |     | Setting `useBackgroundIndexing` to `false` disables automatic indexing of images loaded to the image store. Setting `sbomIndexing` to `false` prevents users from being able to index image by inspecting them in Docker Desktop or using `docker scout` CLI commands. |         |

### Proxy settings

Docker Desktop has two distinct proxy settings with different scopes:

- `proxy` (App Proxy): Governs Docker Desktop host-level traffic — the Desktop application, Docker CLI, and extensions. It also serves as a fallback for the daemon when `containersProxy` is not explicitly configured. Once `containersProxy` is set, `proxy` plays no role in daemon or container traffic.
- `containersProxy`: Always governs `docker image pull`. All `docker image pull` and Compose pull operations go through `containersProxy`, including any PAC file rules. It also governs running container outbound traffic when `transparentPorts` is configured.

| Parameter            | OS           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Version                                |
| :------------------- | ------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `proxy`              |              | If `mode` is set to `system` instead of `manual`, Docker Desktop gets the proxy values from the system and ignores any values set for `http`, `https` and `exclude`. Change `mode` to `manual` to manually configure proxy servers. If the proxy port is custom, specify it in the `http` or `https` property, for example `"https": "http://myotherproxy.com:4321"`. The `exclude` property specifies a comma-separated list of hosts and domains to bypass the proxy. |                                        |
| `windowsDockerdPort` | Windows only | Exposes Docker Desktop's internal proxy locally on this port for the Windows Docker daemon to connect to. If it is set to 0, a random free port is chosen. If the value is greater than 0, use that exact value for the port. The default value is -1 which disables the option.                                                                                                                                                                                        |                                        |
| `enableKerberosNtlm` |              | When set to `true`, Kerberos and NTLM authentication is enabled. Default is `false`. For more information, see the settings documentation.                                                                                                                                                                                                                                                                                                                              | |
| `pac`                |              | Specifies a PAC file URL. For example, `"pac": "http://proxy/proxy.pac"`.                                                                                                                                                                                                                                                                                                                                                                                               |                                        |
| `embeddedPac`        |              | Specifies an embedded PAC (Proxy Auto-config) script. For example, `"embeddedPac": "function FindProxyForURL(url, host) { return \"DIRECT\"; }"`. This setting takes precedence over HTTP, HTTPS, Proxy bypass and PAC server URL.                                                                                                                                                                                                                                      |  |

> **Note:**
>
> Proxy configuration is a special case because it must be configured in two places:
>
> 1. In Docker Home for your organization.
> 2. On the user's system where Docker Desktop is installed.
>
> On the user's machine, configure the proxy either through the `admin-settings.json` file or by using installer flags during Docker Desktop installation. For detailed instructions, refer to the installation guide.
>
> This additional configuration is required because Docker Desktop must know which proxy server to use before it can complete user sign-in and retrieve organization settings from Docker Home.
