---
title: "CorDebugNGenPolicy Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugngenpolicy-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugNGenPolicy Enumeration

Provides a value that determines whether a debugger loads native (NGen) images from the native image cache.

## Syntax

```cpp
enum CorDebugNGENPolicy {
    DISABLE_LOCAL_NIC = 1
} CorDebugNGENPolicy;
```

## Members

|Member name|Description|
|-----------------|-----------------|
|`DISABLE_LOCAL_NIC`|In a Windows 8.x Store app, the use of images from the local native image cache is disabled. In a desktop app, this setting has no effect.|

## Remarks

 The `CorDebugNGENPolicy` enumeration is used by the ICorDebugProcess5::EnableNGENPolicy method. Disabling the use of images from the local native image cache provides for a consistent debugging experience by ensuring that the debugger loads debuggable JIT-compiled images instead of optimized native images.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
