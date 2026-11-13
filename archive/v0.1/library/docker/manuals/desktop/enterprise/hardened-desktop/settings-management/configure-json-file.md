---
title: "Configure Settings Management with a JSON file (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/desktop/enterprise/hardened-desktop/settings-management/configure-json-file.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Configure Settings Management with a JSON file

Settings Management lets you configure and enforce Docker Desktop settings across your organization using an `admin-settings.json` file. This standardizes Docker Desktop environments and ensures consistent configurations for all users.

## Prerequisites

Before you begin, make sure you have:

- Enforce sign-in for
  your organization
- A Docker Business subscription

Docker Desktop only applies the `admin-settings.json` file when the user is signed in to an account with a Docker Business subscription. To make sure the settings take effect, the presence of the file requires sign-in.

Until a user signs in with a Business account, Docker Desktop prompts them to sign in and doesn’t apply the settings. To require sign-in to a specific organization, use a sign-in enforcement method.

## Step one: Create the settings file

You can create the `admin-settings.json` file in two ways:

- Use the `--admin-settings` installer flag to auto-generate the file:
  - Mac installation guide
  - Windows installation guide
- Create it manually (UTF-8 without BOM) and place it in the following locations:
  - Mac: `/Library/Application Support/com.docker.docker/admin-settings.json`
  - Windows: `C:\ProgramData\DockerDesktop\admin-settings.json`
  - Linux: `/usr/share/docker-desktop/admin-settings.json`

> **Important:**
>
> Place the file in a protected directory to prevent unauthorized changes. Use Mobile Device Management (MDM) tools like Jamf to distribute the file at scale across your organization.

## Step two: Configure settings

> **Tip:**
>
> For a complete list of available settings, their supported platforms, and which configuration methods they work with, see the Settings reference.

The `admin-settings.json` file uses structured keys to define configurable settings and whether values are enforced.

Each setting supports a `locked` field that controls user permissions:

- When `locked` is set to `true`, users can't change that value in Docker Desktop, the CLI, or config files.
- When `locked` is set to `false`, the value acts like a default suggestion and users
  can still update it.

Settings where `locked` is set to `false` are ignored on existing installs if
a user has already customized that value in `settings-store.json`,
`settings.json`, or `daemon.json`.

### Grouped settings

Docker Desktop groups some settings together with a single toggle that controls
the entire section. These include:

- Enhanced Container Isolation (ECI): Uses a main toggle (`enhancedContainerIsolation`) that enables/disables the entire feature, with sub-settings for specific configurations
- Kubernetes: Uses a main toggle (`kubernetes.enabled`) with sub-settings for cluster configuration
- Docker Scout: Groups settings under the `scout` object

When configuring grouped settings:

1. Set the main toggle to enable the feature
1. Configure sub-settings within that group
1. When you lock the main toggle, users cannot modify any settings in that group

Example for `enhancedContainerIsolation`:

```json
"enhancedContainerIsolation": {
  "locked": true,  // This locks the entire ECI section
  "value": true,   // This enables ECI
  "dockerSocketMount": {  // These are sub-settings
    "imageList": {
      "images": ["docker.io/testcontainers/ryuk:*"]
    }
  }
}
```

### Example `admin-settings.json` file

The following sample is an `admin-settings.json` file with common enterprise settings configured. You can use this example as a template with the `admin-settings.json` configurations:

```json
{
  "configurationFileVersion": 2,
  "exposeDockerAPIOnTCP2375": {
    "locked": true,
    "value": false
  },
  "proxy": {
    "locked": true,
    "mode": "system",
    "http": "",
    "https": "",
    "exclude": [],
    "windowsDockerdPort": 65000,
    "enableKerberosNtlm": false,
    "pac": "",
    "embeddedPac": ""
  },
  "containersProxy": {
    "locked": true,
    "mode": "manual",
    "http": "",
    "https": "",
    "exclude": [],
    "pac": "",
    "embeddedPac": "",
    "transparentPorts": ""
  },
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
  },
  "linuxVM": {
    "wslEngineEnabled": {
      "locked": false,
      "value": false
    },
    "dockerDaemonOptions": {
      "locked": false,
      "value": "{\"debug\": false}"
    },
    "vpnkitCIDR": {
      "locked": false,
      "value": "192.168.65.0/24"
    }
  },
  "kubernetes": {
    "locked": false,
    "enabled": false,
    "showSystemContainers": false,
    "imagesRepository": ""
  },
  "windowsContainers": {
    "dockerDaemonOptions": {
      "locked": false,
      "value": "{\"debug\": false}"
    }
  },
  "disableUpdate": {
    "locked": false,
    "value": false
  },
  "analyticsEnabled": {
    "locked": false,
    "value": true
  },
  "extensionsEnabled": {
    "locked": true,
    "value": false
  },
  "scout": {
    "locked": false,
    "sbomIndexing": true,
    "useBackgroundIndexing": true
  },
  "allowBetaFeatures": {
    "locked": false,
    "value": false
  },
  "blockDockerLoad": {
    "locked": false,
    "value": true
  },
  "filesharingAllowedDirectories": [
    {
      "path": "$HOME",
      "sharedByDefault": true
    },
    {
      "path": "$TMP",
      "sharedByDefault": false
    }
  ],
  "useVirtualizationFrameworkVirtioFS": {
    "locked": true,
    "value": true
  },
  "useVirtualizationFrameworkRosetta": {
    "locked": true,
    "value": true
  },
  "useGrpcfuse": {
    "locked": true,
    "value": true
  },
  "displayedOnboarding": {
    "locked": true,
    "value": true
  },
  "desktopTerminalEnabled": {
    "locked": false,
    "value": false
  },
  "enableInference": {
    "locked": false,
    "value": true
  },
  "enableInferenceTCP": {
    "locked": false,
    "value": true
  },
  "enableInferenceTCPPort": {
    "locked": true,
    "value": 12434
  },
  "enableInferenceCORS": {
    "locked": true,
    "value": ""
  },
  "enableInferenceGPUVariant": {
    "locked": true,
    "value": true
  },
  "portBindingBehavior": {
    "locked": true,
    "value": "default-port-binding"
  }
}
```

## Step three: Apply the settings

Settings take effect after Docker Desktop restarts and the user signs in.

For new installations:

1. Launch Docker Desktop.
1. Sign in with your Docker account.

For existing installations:

1. Quit Docker Desktop completely.
1. Relaunch Docker Desktop.

> **Important:**
>
> You must fully quit and reopen Docker Desktop. Restarting from the menu isn't sufficient.
