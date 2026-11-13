---
title: "Settings reference (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/hardened-desktop/settings-management/settings-reference.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Settings reference (part 2 of 2)

## Kubernetes

### Enable Kubernetes

Enables the local Kubernetes cluster integration with Docker Desktop.

| Property | Value |
|---|---|
| Default | `false` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| JSON key | `kubernetes` |
| Docker Home | **Enable Kubernetes** |

### Show system containers

Controls visibility of Kubernetes system containers in the Docker Desktop Dashboard.

| Property | Value |
|---|---|
| Default | `false` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| Docker Home | **Show system containers** |

### Kubernetes image repository

Specifies a registry used for Kubernetes control plane images instead of Docker Hub. Overrides the `registry[:port]/` portion of image names. Images must be mirrored from Docker Hub with matching tags.

| Property | Value |
|---|---|
| Default | `""` |
| Accepted values | Registry URL |
| Format | String |
| JSON key | `KubernetesImagesRepository` |
| Docker Home | **Kubernetes Images Repository** |

> **Note:**
>
> Images must be mirrored from Docker Hub with matching tags. Required images depend on the cluster provisioning method.

> **Important:**
>
> When using custom image repositories with Enhanced Container Isolation, add these images to the ECI allowlist: `[imagesRepository]/desktop-cloud-provider-kind:*` and `[imagesRepository]/desktop-containerd-registry-mirror:*`.

### Cluster provisioning method

Controls Kubernetes cluster topology and node configuration.

| Property | Value |
|---|---|
| Default | `kubeadm` |
| Accepted values | `kubeadm`, `kind` |
| Format | String |
| Docker Home | **Kubernetes mode** |

### Node version

Pins the Kubernetes version used for cluster nodes.

| Property | Value |
|---|---|
| Default | `1.31.1` |
| Accepted values | Semantic version (e.g. `1.29.1`) |
| Format | String |
| Docker Home | **Node version** tab |

### Nodes count

Sets the number of nodes in multi-node Kubernetes clusters.

| Property | Value |
|---|---|
| Default | `1` |
| Accepted values | Integer |
| Format | Integer |
| Docker Home | **Nodes count** |

## Features in development

### Access beta features

Controls whether users can access all Docker Desktop features that are in public beta.

| Property | Value |
|---|---|
| Default | `false` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| JSON key | `allowBetaFeatures` |
| Docker Home | **Access beta features** |

### Enable Docker MCP Toolkit (Beta)

Enables Docker MCP Toolkit in Docker Desktop for AI model development workflows.

| Property | Value |
|---|---|
| Default | `true` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| JSON key | `enableDockerMCPToolkit` |
| Docker Home | Not available |

## Enhance container isolation

### Enable Enhanced Container Isolation

Prevents containers from modifying Docker Desktop VM configuration or accessing sensitive host areas.

| Property | Value |
|---|---|
| Default | `false` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| JSON key | `enhancedContainerIsolation` |
| Docker Home | **Enable enhanced container isolation** |

### Docker socket access control (ECI exceptions)

Defines specific images and commands allowed to use the Docker socket when Enhanced Container Isolation is active. Supports tools like Testcontainers, LocalStack, or CI systems that need Docker socket access while maintaining security.

| Property | Value |
|---|---|
| Accepted values | JSON object |
| Format | JSON object |
| JSON key | ``dockerSocketMount` |
| Docker Home | **Image list**, **Command list** |

```json
"enhancedContainerIsolation": {
  "locked": true,
  "value": true,
  "dockerSocketMount": {
    "imageList": {
      "images": [
        "docker.io/localstack/localstack:*",
        "docker.io/testcontainers/ryuk:*"
      ]
    },
    "commandList": {
      "type": "deny",
      "commands": ["push"]
    }
  }
}
```

## Network

### Networking mode

Sets the default IP protocol used when Docker creates new networks.

| Property | Value |
|---|---|
| Default | `dual-stack` |
| Accepted values | `ipv4only`, `ipv6only` |
| Format | String |
| JSON key | `defaultNetworkingMode` |
| Docker Home | **Default network IP mode** |

For more information, see Networking.

### Inhibit DNS resolution for IPv4/IPv6

Filters unsupported DNS record types to improve reliability in environments where only IPv4 or IPv6 is supported. Requires Docker Desktop 4.43 and later.

| Property | Value |
|---|---|
| Default | `auto` |
| Accepted values | `ipv4`, `ipv6`, `none` |
| Format | String |
| JSON key | `dnsInhibition` |
| Docker Home | **DNS filtering behavior** |

For more information, see Networking.

### Port binding behavior

Specify how port bindings are handled for new containers.

| Property | Value |
|---|---|
| Default | `default-port-binding` |
| Accepted values | `default-local-port-binding`, `local-only-port-binding`, `default-port-binding` |
| Format | String |
| JSON key | `portBindingBehavior` |
| Docker Home | **Port binding behavior** |

## Other

### Enable Docker Offload

Controls Docker Offload v1 availability. When enabled, users see the Docker Offload toggle in the Docker Desktop header.

| Property | Value |
|---|---|
| Default | `false` |
| Accepted values | `true`, `false` |
| Format | Boolean |
| JSON key | `enableCloud` |
| Docker Home | **Enable Docker Offload** |

> **Note:**
>
> This setting is only available when Docker Offload capability is enabled for
> the organization.
