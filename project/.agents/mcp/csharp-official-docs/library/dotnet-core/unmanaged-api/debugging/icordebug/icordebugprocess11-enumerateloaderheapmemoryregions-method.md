---
title: "ICorDebugProcess11::EnumerateLoaderHeapMemoryRegions Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess11-enumerateloaderheapmemoryregions-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
