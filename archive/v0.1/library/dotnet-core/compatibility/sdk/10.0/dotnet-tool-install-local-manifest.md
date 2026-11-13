---
title: "Breaking change: 'dotnet tool install --local' creates manifest by default"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/dotnet-tool-install-local-manifest.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet tool install --local creates manifest by default

When running `dotnet tool install --local`, a manifest is now created if none exists instead of failing with an error. This change was implemented by making the `--create-manifest-if-needed` option enabled by default. This is a breaking change, since users might have relied on the failure behavior to check if they needed to create a manifest.

The `-d` flag on `dotnet tool install` was previously added to show the locations that were searched for manifests. This information was relayed in the error given when there was no manifest. That error is no longer shown since a manifest is now created if necessary. You should no longer use the `-d` flag.

## Version introduced

.NET 10

## Previous behavior

Previously, if you tried to install a .NET tool as a local tool in a folder that didn't contain a manifest, you got an error:

> Cannot find a manifest file.

## New behavior

Starting in .NET 10, the `--create-manifest-if-needed=true` functionality is now enabled by default. When a tool is installed as a local tool, the manifest is created automatically if it doesn't exist. The manifest is created according to the rules described in the `--create-manifest-if-needed` option documentation.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change improves the user experience by making `dotnet tool install --local` work by default without requiring users to manually create a manifest first. Previously, there was a concern about creating a manifest in a working directory rather than the repository root, but the tool now puts the manifest in the repository root when possible.

## Recommended action

You can turn off the automatic manifest creation behavior by passing `--create-manifest-if-needed=false` when calling `dotnet tool install --local`.

## Affected APIs

N/A

## See also

- dotnet tool install
