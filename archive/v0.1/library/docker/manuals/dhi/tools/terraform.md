---
title: "Use the DHI Terraform provider"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/tools/terraform.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Use the DHI Terraform provider

The DHI Terraform provider
lets you manage Docker Hardened Image mirrors and customizations as
infrastructure as code.

## Install and configure the provider

Add the provider to your Terraform configuration:

```hcl
terraform {
  required_providers {
    dhi = {
      source = "docker-hardened-images/dhi"
    }
  }
}

provider "dhi" {
  docker_hub_username = var.docker_username
  docker_hub_password = var.docker_password
  organization        = var.org_name
}
```

Instead of specifying credentials in the provider block, you can set environment
variables:

| Variable | Description |
|----------|-------------|
| `DOCKER_USERNAME` | Docker Hub username or organization namespace |
| `DOCKER_PASSWORD` | Docker Hub password or personal/organization access token |
| `DHI_ORG` | Target organization namespace |

You can authenticate using a personal access token (PAT) or an organization
access token (OAT) in place of a password. When using an OAT, permission scopes
apply:

- Read (pull) access is required to list mirrors.
- Push access is required to create or delete mirrors.

## Resources

### `dhi_mirror`

Manages a mirrored DHI repository in your organization. See Mirror a Docker
Hardened Image repository for task-based examples.

For the full list of resource attributes, see the Terraform Registry
documentation.

### `dhi_customization`

Manages image customizations applied to a mirrored repository. See Customize a
Docker Hardened Image for task-based examples.

For the full list of resource attributes, see the Terraform Registry
documentation.
