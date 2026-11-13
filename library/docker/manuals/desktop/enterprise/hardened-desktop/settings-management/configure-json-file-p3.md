---
title: "Configure Settings Management with a JSON file (part 3 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/hardened-desktop/settings-management/configure-json-file.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Configure Settings Management with a JSON file (part 3 of 4)

### Container proxy

| Parameter         | OS  | Description                                                                                                                                                                                                                                         | Version                                |
| :---------------- | --- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `containersProxy` |     | Configures the proxy for `docker image pull` (always enforced) and running container outbound traffic (enforced when `transparentPorts` is set). For more information see Air-Gapped Containers. |  |

The `containersProxy` setting accepts the following nested properties:

| Property          | Description |
| :---------------- | :-----------|
| `locked`          | When set to `true`, users cannot modify this setting. |
| `mode`            | Proxy mode: `manual` or `system`. |
| `http`            | HTTP proxy URL. For example, `"http": "http://proxy.example.com:8080"`. |
| `https`           | HTTPS proxy URL. For example, `"https": "https://proxy.example.com:8443"`. |
| `exclude`         | List of addresses to bypass the proxy. For example, `"exclude": ["localhost", "127.0.0.1"]`. |
| `pac`             | Specifies a PAC file URL. For example, `"pac": "http://containerproxy/proxy.pac"`. |
| `embeddedPac`     | Specifies an embedded PAC (Proxy Auto-config) script. For example, `"embeddedPac": "function FindProxyForURL(url, host) { return \"PROXY 192.168.92.1:2003\"; }"`. This setting takes precedence over HTTP, HTTPS, Proxy bypass and PAC server URL. |
| `transparentPorts` | Specifies which ports should use transparent proxy. |

Example configuration:

```json
"containersProxy": {
  "locked": true,
  "mode": "manual",
  "http": "",
  "https": "",
  "exclude": [],
  "pac": "",
  "embeddedPac": "",
  "transparentPorts": ""
}
```

### Linux VM settings

| Parameter                                        | OS           | Description                                                                                                                                                                                                                                                                                                | Version |
| :----------------------------------------------- | ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `linuxVM`                                        |              | Parameters and settings related to Linux VM options - grouped together here for convenience.                                                                                                                                                                                                               |         |
|        `wslEngineEnabled`    | Windows only | If `value` is set to true, Docker Desktop uses the WSL 2 based engine. This overrides anything that may have been set at installation using the `--backend=<backend name>` flag.                                                                                                                           |         |
|        `dockerDaemonOptions` |              | Overrides the options in the Docker Engine config file with a JSON string in `value`. See the Docker Engine reference. Note that for added security, a few of the config attributes may be overridden when Enhanced Container Isolation is enabled. |         |
|        `vpnkitCIDR`          |              | Overrides the network range used for vpnkit DHCP/DNS for `*.docker.internal`                                                                                                                                                                                                                               |         |

### Windows containers

| Parameter                                        | OS  | Description                                                                                                                                    | Version |
| :----------------------------------------------- | --- | :--------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `windowsContainers`                              |     | Parameters and settings related to `windowsContainers` options - grouped together here for convenience.                                        |         |
|        `dockerDaemonOptions` |     | Overrides the options in the Linux daemon config file. See the Docker Engine reference. |         |

> **Note:**
>
> This setting is not available to configure via Docker Home.

### Kubernetes settings

| Parameter    | OS  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Version |
| :----------- | --- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `kubernetes` |     | If `enabled` is set to true, a Kubernetes single-node cluster is started when Docker Desktop starts. If `showSystemContainers` is set to true, Kubernetes containers are displayed in the Docker Desktop Dashboard and when you run `docker ps`. The imagesRepository setting lets you specify which repository Docker Desktop pulls control-plane Kubernetes images from. |         |

> **Note:**
>
> When using `imagesRepository` with Enhanced Container Isolation (ECI), add these images to the ECI Docker socket mount image list:
>
> `[imagesRepository]/desktop-cloud-provider-kind:`
> `[imagesRepository]/desktop-containerd-registry-mirror:`
>
> These containers mount the Docker socket, so you must add them to the ECI images list. Otherwise, ECI blocks the mount and Kubernetes won't start.

### Networking settings

| Parameter               | OS                          | Description                                                                                                                                                                                                                 | Version                                |
| :---------------------- | --------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `defaultNetworkingMode` | Windows and Mac only        | Defines the default IP protocol for new Docker networks: `dual-stack` (IPv4 + IPv6, default), `ipv4only`, or `ipv6only`.                                                                                                    | |
| `dnsInhibition`         | Windows and Mac only        | Controls DNS record filtering returned to containers. Options: `auto` (recommended), `ipv4`, `ipv6`, `none`                                                                                                                 | |
| `portBindingBehavior`   | Linux-based containers only | Defines port binding restrictions and default behavior, allowing admins to control how a user exposes ports from their containers. Options: `default-port-binding`, `default-local-port-binding`, `local-only-port-binding` | Docker Desktop version 4.52 and later. |

For more information, see Networking.

### AI settings

| Parameter                   | OS           | Description                                                                                                                                                                                                                        | Version |
| :-------------------------- | ------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `enableInference`           |              | Setting `enableInference` to `true` enables Docker Model Runner.                                                                                                                             |         |
| `enableInferenceTCP`        |              | Enable host-side TCP support. This setting requires the Docker Model Runner setting to be enabled first.                                                                                                                           |         |
| `enableInferenceTCPPort`    |              | Specifies the exposed TCP port. This setting requires the Docker Model Runner and Enable host-side TCP support settings to be enabled first.                                                                                       |         |
| `enableInferenceCORS`       |              | Specifies the allowed CORS origins. Empty string to deny all,`*` to accept all, or a list of comma-separated values. This setting requires the Docker Model Runner and Enable host-side TCP support settings to be enabled first.  |         |
| `enableInferenceGPUVariant` | Windows only | Setting `enableInferenceGPUVariant` to `true` enables GPU-backed inference. The additional components required for this don't come by default with Docker Desktop, therefore they will be downloaded to `~/.docker/bin/inference`. |         |

### Beta features

> **Important:**
>
> For Docker Desktop versions 4.41 and earlier, some of these settings lived under the **Experimental features** tab on the **Features in development** page.

| Parameter                   | OS  | Description                                                                                                                                                                                                                                               | Version                                 |
| :-------------------------- | --- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `allowBetaFeatures`         |     | If `value` is set to `true`, beta features are enabled.                                                                                                                                                                                                   |                                         |
| `enableDockerAI`            |     | Controls whether Gordon is enabled. Accepts `true`/`false` or Business tier options (`"Disabled"`, `"Enabled"`, `"Always Enabled"`). |                                         |
| `enableDockerMCPToolkit`    |     | If `allowBetaFeatures` is true, setting `enableDockerMCPToolkit` to `true` enables the MCP Toolkit feature by default. You can independently control this setting from the `allowBetaFeatures` setting. |                                         |
| `allowExperimentalFeatures` |     | If `value` is set to `true`, experimental features are enabled.                                                                                                                                                                                           |  |
