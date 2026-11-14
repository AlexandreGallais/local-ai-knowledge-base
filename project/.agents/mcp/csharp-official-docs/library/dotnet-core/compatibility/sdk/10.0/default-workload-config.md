---
title: "Breaking change - Change default workload configuration from 'loose manifests' to 'workload sets' mode"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/default-workload-config.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Change default workload configuration from 'loose manifests' to 'workload sets' mode

In .NET 10 Preview 2, the default workload update mode changed from "manifests" to "workload-set". This change ensures users use a single, coherent set of workload versions that do not individually float, making it easier to maintain consistency and manage workloads.

## Version introduced

.NET 10

## Previous behavior

Previously, workloads operated in 'loose manifest' mode by default. Errant `dotnet workload update` commands could install new versions that might not work well together, making it difficult for users to keep a consistent set of workload versions aligned.

## New behavior

Starting in .NET 10, workloads will never float unless you:

* Update your SDK.
* Perform an explicit update command.

When you perform an update, all workloads will use known-matching versions from the workload set that is used.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Users requested more control and predictability in workload management. This new system allows for pinning and coherent updates, ensuring a consistent set of workload versions.

## Recommended action

No corrective action is necessary. If you experience issues, you can revert to loose manifest mode by running the following command:

```dotnetcli
dotnet workload config --update-mode manifests
```

## Affected APIs

None.
