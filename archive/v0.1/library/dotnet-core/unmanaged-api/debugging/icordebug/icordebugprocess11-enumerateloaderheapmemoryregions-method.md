---
title: "ICorDebugProcess11::EnumerateLoaderHeapMemoryRegions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess11-enumerateloaderheapmemoryregions-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess11::EnumerateLoaderHeapMemoryRegions Method

Deprecated.

Enumerates ranges of native memory that are used by the .NET runtime to store internal data structures that describe .NET types and methods. The information returned is the same information that would be shown by using the SOS `eeheap-loader` command.

## Syntax

```cpp
HRESULT EnumerateLoaderHeapMemoryRegions(
[out] ICorDebugMemoryRangeEnum** ppRanges
);
```

## Parameters

 `ppRanges`

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET Versions:** Available from .NET 8 through .NET 10.

## See also

- ICorDebugProcess11 Interface
