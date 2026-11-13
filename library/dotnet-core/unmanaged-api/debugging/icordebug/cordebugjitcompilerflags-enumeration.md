---
title: "CorDebugJITCompilerFlags Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugjitcompilerflags-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugJITCompilerFlags Enumeration

Contains values that influence the behavior of the managed just-in-time (JIT) compiler.

## Syntax

```cpp
typedef enum CorDebugJITCompilerFlags {

    CORDEBUG_JIT_DEFAULT = 0x1,
    CORDEBUG_JIT_DISABLE_OPTIMIZATION = 0x3,
    CORDEBUG_JIT_ENABLE_ENC = 0x7

} CorDebugJITCompilerFlags;
```

## Members

|Member|Description|
|------------|-----------------|
|`CORDEBUG_JIT_DEFAULT`|Specifies that the compiler should track compilation data, and allows optimizations.|
|`CORDEBUG_JIT_DISABLE_OPTIMIZATION`|Specifies that the compiler should track compilation data, but disables optimizations.|
|`CORDEBUG_JIT_ENABLE_ENC`|Specifies that the compiler should track compilation data, disables optimizations, and enables Edit and Continue technologies.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
