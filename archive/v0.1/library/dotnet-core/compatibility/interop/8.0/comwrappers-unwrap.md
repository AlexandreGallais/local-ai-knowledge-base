---
title: "Breaking change: CreateObjectFlags.Unwrap only unwraps on target instance"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/interop/8.0/comwrappers-unwrap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CreateObjectFlags.Unwrap only unwraps on target instance

Previously, if you called `System.Runtime.InteropServices.ComWrappers.GetOrCreateObjectForComInstance(System.IntPtr,System.Runtime.InteropServices.CreateObjectFlags)` on a `System.Runtime.InteropServices.ComWrappers` instance with the `System.Runtime.InteropServices.CreateObjectFlags.Unwrap` flag, a managed object wrapper was unwrapped from *any* `System.Runtime.InteropServices.ComWrappers` instance. Now when the flag is specified, only wrappers from the `System.Runtime.InteropServices.ComWrappers` instance that `GetOrCreateObjectFromComInstance` was called on are unwrapped.

The `System.Runtime.InteropServices.CreateObjectFlags.Unwrap` flag was the only API that reached "across" `System.Runtime.InteropServices.ComWrappers` instances, so its behavior was unintuitive. Additionally, the new `System.Runtime.InteropServices.ComWrappers.TryGetObject(System.IntPtr,System.Object@)` API is available to unwrap a COM object from any `System.Runtime.InteropServices.ComWrappers` instance.

## Previous behavior

Calling `System.Runtime.InteropServices.ComWrappers.GetOrCreateObjectForComInstance(System.IntPtr,System.Runtime.InteropServices.CreateObjectFlags)` on a `System.Runtime.InteropServices.ComWrappers` instance with the `System.Runtime.InteropServices.CreateObjectFlags.Unwrap` flag unwrapped a managed object wrapper from any `System.Runtime.InteropServices.ComWrappers` instance.

## New behavior

Calling `System.Runtime.InteropServices.ComWrappers.GetOrCreateObjectForComInstance(System.IntPtr,System.Runtime.InteropServices.CreateObjectFlags)` on a `System.Runtime.InteropServices.ComWrappers` instance with the `System.Runtime.InteropServices.CreateObjectFlags.Unwrap` flag only unwraps a managed object wrapper from the `System.Runtime.InteropServices.ComWrappers` instance that `GetOrCreateObjectForComInstance` was called on. If given a wrapper from a different `System.Runtime.InteropServices.ComWrappers` instance, the `ComWrappers` instance creates a new wrapper.

## Version introduced

.NET 8 Preview 5

## Type of breaking change

This change is a behavioral change.

## Reason for change

The previous behavior was unintuitive. It also broke the encapsulation experience where developers can define how COM interop works for their code by using their own custom `System.Runtime.InteropServices.ComWrappers` instances.

## Recommended action

If you want to keep the previous behavior, call `System.Runtime.InteropServices.ComWrappers.TryGetObject(System.IntPtr,System.Object@)` before calling `System.Runtime.InteropServices.ComWrappers.GetOrCreateObjectForComInstance(System.IntPtr,System.Runtime.InteropServices.CreateObjectFlags)`.

## Affected APIs

- `System.Runtime.InteropServices.ComWrappers.GetOrCreateObjectForComInstance(System.IntPtr,System.Runtime.InteropServices.CreateObjectFlags)`
