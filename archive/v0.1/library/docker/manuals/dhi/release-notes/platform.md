---
title: "Docker Hardened Images release notes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/release-notes/platform.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Docker Hardened Images release notes

This page contains information about the new features, improvements, and changes
in the Docker Hardened Images (DHI) platform. Release notes are aggregated by
quarter and include only notable product changes.

## Q4 2026

New features and enhancements released in the fourth quarter of 2026.

- EU data residency (early access): Docker can provision your DHI
  subscription in the EU region. When your subscription is in the EU region,
  Docker stores your mirrored and customized images in the EU. For more
  information, see EU data residency.

## Q3 2026

New features and enhancements released in the third quarter of 2026.

- DHI MCP server: The DHI catalog is now accessible via a remote MCP server at
  `https://dhi.io/mcp`. Connect any MCP-capable AI assistant to search
  repositories, inspect image metadata, retrieve SBOMs, check CVEs, and manage
  mirrors using plain language. For more information, see Use the DHI MCP
  server.
- DHI API: VEX statements and suppressed CVEs for a Docker Hardened Image are
  now available to query by digest through the DHI GraphQL API. For more
  information, see Use the DHI API.
- DHI webhook payloads: Webhooks on a mirrored Docker Hardened Image repository
  now include a `dhi_metadata` object describing the vulnerability fixes,
  package changes, and configuration changes between builds. For more
  information, see Automate syncing with
  webhooks.

## Q2 2026

New features and enhancements released in the second quarter of 2026.

- Debian Hardened System Packages: Added support for Debian-based Docker
  Hardened System Packages (HSP), including new CLI workflows for authenticating
  to the Debian HSP repository.
- Mend.io scanner integration: Mend.io is now a supported scanner for consuming
  DHI VEX data.
- Black Duck scanner integration: Black Duck is now a supported scanner for
  consuming DHI VEX data.
- DHI Select self-serve purchase: DHI Select is now available for self-serve
  purchase directly through the Docker website.
- Bulk customization: Apply customizations to multiple images in a single
  operation through the Docker Hub UI and the CLI.
- Terraform provider: Manage DHI resources, including customizations and
  mirrors, using the official Terraform provider.

## Q1 2026

New features and enhancements released in the first quarter of 2026.

- Docker Hardened System Packages (HSP): Announced Docker Hardened System
  Packages, a new offering that provides individually hardened packages for use
  in your own base images. For more information, see the announcement blog
  post.
- Wiz scanner integration: Wiz is now a supported scanner for consuming DHI VEX
  data.

## Q4 2025

New features and enhancements released in the fourth quarter of 2025.

- Docker Hardened Images Community (Free): Docker Hardened Images are now
  available for every developer through a Community subscription tier. The
  subscription tiers are now Community, Select, and Enterprise. For more
  information, see the announcement blog
  post.
- Independent security validation by SRLabs: SRLabs published an independent
  security validation of Docker Hardened Images. See the
  validation announcement.
- Docker Scout scoring for DHI: Docker Scout image scoring now accounts for the
  security improvements provided by DHI.
- Trivy VEX repository: VEX data for DHI is published in a Trivy-compatible OCI
  VEX repository, making it easier for Trivy and other scanners to consume.
- Docker Scout DHI policy: New Docker Scout policy that evaluates whether images
  use Docker Hardened Images.
- Hardened Helm charts (Beta): Beta release of Docker Hardened Helm Charts. For
  more information, see the announcement blog
  post.
- Mirroring UX: Updated the mirroring experience in Docker Hub with a refreshed
  UI and clearer flows.

## Q3 2025

New features and enhancements released in the third quarter of 2025.

- Next evolution release: A major release that introduced customizations,
  FedRAMP-ready images, the AI Migration Agent, and deeper scanner integrations.
  See the announcement blog
  post
  and the FedRAMP compliance blog
  post.
- DHI customizations: Customize DHI images directly from the Docker Hub UI,
  with options for adding packages, files, and configuration on top of a base
  hardened image.
- AI Migration Agent: AI-assisted Dockerfile migration to help convert existing
  Dockerfiles to use Docker Hardened Images.
- CIS compliance attestations: CIS benchmark compliance attestations are now
  included with DHI images.
- STIG variants: STIG-hardened image variants for U.S. Department of Defense
  compliance use cases.

## Q2 2025

New features and enhancements released in the second quarter of 2025.

- Docker Hardened Images launch: Docker announced Docker Hardened Images, a new
  family of secure, minimal, and production-ready container images maintained by
  Docker. For more information, see the launch blog
  post.
- FIPS variants: FIPS-validated image variants for Docker Hardened Images.
