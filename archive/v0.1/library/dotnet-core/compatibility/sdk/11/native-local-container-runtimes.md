---
title: "Breaking change: SDK local container runtime selection prefers platform-native tools"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/11/native-local-container-runtimes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SDK local container runtime selection prefers platform-native tools

Starting in .NET 11, when you publish an SDK container to a local container runtime, the SDK automatically prefers platform-native CLIs when they're available: `wslc` on Windows and Apple's `container` CLI on macOS. This change affects which local runtime receives the image when Docker or Podman is also installed.

## Version introduced

.NET 11

## Previous behavior

Previously, when `LocalRegistry` wasn't explicitly set, the SDK probed Docker and Podman and loaded the published image into the selected Docker or Podman runtime.

## New behavior

Starting in .NET 11, on Windows, the SDK first probes `wslc`. On macOS, the SDK first probes Apple's `container` CLI. If the platform-native tool is available and its service runs, the SDK loads the published image there. Docker and Podman remain fallback options.

You can explicitly select Docker, Podman, `wslc`, or Apple's `container` CLI through the `LocalRegistry` MSBuild property.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Windows and macOS now provide platform-native container tooling. The SDK gives you the native platform experience while it preserves Docker and Podman fallback behavior.

For more information, see the related implementation and tracking issues dotnet/sdk-container-builds#651 and dotnet/sdk-container-builds#636.

## Recommended action

If automatic selection works for your workflow, no action is required.

To keep using a specific runtime, set the `LocalRegistry` MSBuild property explicitly:

```dotnetcli
dotnet publish /t:PublishContainer -p:LocalRegistry=Docker
```

Use `Docker` or `Podman` to select Docker or Podman. Use `Wslc` on Windows or `MacOSContainer` on macOS to select the platform-native runtime explicitly.

## Affected APIs

- `Microsoft.NET.Build.Containers.KnownLocalRegistryTypes.Wslc`
- `Microsoft.NET.Build.Containers.KnownLocalRegistryTypes.MacOSContainer`
