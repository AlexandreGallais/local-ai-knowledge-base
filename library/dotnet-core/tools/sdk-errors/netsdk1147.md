---
title: "NETSDK1147: Missing workload for specified target framework"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1147.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1147: Missing workload for specified target framework

This error is caused by trying to compile a project that requires an optional workload, but you don't have the workload installed. The full error message is similar to the following example:

> NETSDK1147: To build this project, the following workloads must be installed: \<workload ID>
>
> To install these workloads, run the following command: dotnet workload install \<workload ID>

For example, if your project targets `net6.0-android`, you might have to run the `dotnet workload install` command and specify workload ID `android`:

```dotnetcli
dotnet workload install android
```

For more information, see `dotnet workload install`.
