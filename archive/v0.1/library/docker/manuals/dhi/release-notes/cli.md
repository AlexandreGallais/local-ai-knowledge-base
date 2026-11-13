---
title: "DHI CLI release notes"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/dhi/release-notes/cli.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

This page lists changes in recent stable releases of the DHI CLI (`docker dhi`). For
the full release history, including pre-releases and downloads, see the
dhictl releases on GitHub.

## 0.0.13

GitHub release

Maintenance release with dependency updates.

## 0.0.12

GitHub release

Maintenance release with dependency updates.

## 0.0.11

GitHub release

This release adds platform validation for image customizations in `dhictl customization create`.

### What's New

- Adds platforms validation to `dhictl customization create`, requiring platforms to be specified for image customizations and checking that every target's tag definition supports them — missing or unsupported platforms now fail with an error

## 0.0.10

GitHub release

This release adds support for Helm chart customization variable mappings in dhictl.

### What's New

- Adds `variable_mappings` support for Helm chart customizations, allowing each chart variable to point at a DHI image, a mirrored image tag definition, or a customization

## 0.0.9

GitHub release

This release adds working directory support for image customizations, improves customization inheritance behavior, and enhances the helm chart `get` command output.

### What's New

- Adds `working-directory` field support for image customizations (single customizations only; bulk customizations display a "cannot be customized" comment and `create`/`edit` reject it with an error)
- Displays tag definition ID in the output of the `catalog get` command for helm charts

### Bug Fixes

- Fixes `customization prepare` to write base image values as commented-out fields instead of live settings, allowing proper inheritance from tag definitions rather than freezing values at scaffold time

## 0.0.8

GitHub release

This release adds symlink support to customization files in dhictl.

### What's New

- Adds a `symlinks` section to customization YAML files, enabling `create`, `edit`, and `get` commands to manage symlinks with `path`, `source`, and optional `uid`/`gid` fields

## 0.0.7

GitHub release

### Bug Fixes

- Fixes JSON output incorrectly escaping ampersands as `\u0026` — values such as catalog categories containing `&` now appear as-is in output

## 0.0.6

GitHub release

This release fixes an issue that prevented customizations from being created via the CLI.

### Bug Fixes

- Fixes `dhictl customization create` failing when GraphQL rejected mutation inputs that incorrectly included the output-only `__typename` field from OCI artifact data

## 0.0.5

GitHub release

Maintenance release with dependency updates.

## 0.0.4

GitHub release

### What's New

- Adds `deb` subcommand for DHI DEB repositories that emits netrc-style credentials for authenticating against DHI DEB repositories

## 0.0.3

GitHub release

### What's New

- Adds attestation list and get commands for managing attestations
- Adds SBOM subcommand for software bill of materials attestation
- Adds bulk support to prepare command for customizations
- Adds compression field support for customizations
- Adds tag-definition-id column to catalog get output

### Breaking change

We removed the `--output` flags from the few commands that had it (`customization prepare` and `customization get`) in favor of stdout redirections.
```console
# before
dhictl customization prepare --org my-org golang 1.25 --output my-customization.yaml

# after 
dhictl customization prepare --org my-org golang 1.25 > my-customization.yaml
```

## 0.0.2

GitHub release

This is a maintenance release focused on build system improvements.

### Technical Changes

- Disables CGO globally to fix macOS 16 dyld crash and simplify build process

## 0.0.1

GitHub release

This release improves the mirroring functionality in dhictl by allowing command arguments.

### Improvements

- Mirror start command now accepts arguments for more flexible mirroring operations

## Earlier releases

For older versions, see the
dhictl releases on GitHub.
