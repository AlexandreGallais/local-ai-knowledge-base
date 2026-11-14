---
title: "Breaking change: 'dotnet list package' warns if source doesn't provide vulnerability data"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/8.0/dotnet-list-package-audit-source-warning.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# 'dotnet list package' warns if source doesn't provide vulnerability data

When using `dotnet list package --vulnerable`, if a configured `auditsources` doesn't support `VulnerabilityInfoResource`, a warning is now shown to inform the user that the source doesn't provide vulnerability data.

## Version introduced

.NET 8

## Previous behavior

Previously, the command silently skipped `auditsource` sources that lacked vulnerability information.

## New behavior

Starting in .NET 8, the command emits a warning:

> Audit source '{0}' did not provide any vulnerability data.

This warning helps users understand why certain sources might not influence the reported vulnerabilities.

## Type of breaking change

This is a behavioral change.

## Reason for change

This warning came as part of the work to allow customers to use `auditsources` when running the `dotnet list package` command. The warning helps users understand when configured audit sources don't provide the expected vulnerability information.

## Recommended action

Check the specified `auditsources` to ensure it supports `VulnerabilityInfoResource`. If it doesn't, either update the source or replace it with one that provides vulnerability data.

## Affected APIs

None.
