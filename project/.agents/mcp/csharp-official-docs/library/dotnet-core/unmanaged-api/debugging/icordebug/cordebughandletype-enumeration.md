---
title: "CorDebugHandleType Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebughandletype-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugHandleType Enumeration

Indicates the handle type.

## Syntax

```cpp
typedef enum CorDebugHandleType {
    HANDLE_STRONG                  = 1,
    HANDLE_WEAK_TRACK_RESURRECTION = 2
} CorDebugHandleType;
```

## Members

|Member|Description|
|------------|-----------------|
|`HANDLE_STRONG`|The handle is strong, which prevents an object from being reclaimed by garbage collection.|
|`HANDLE_WEAK_TRACK_RESURRECTION`|The handle is weak, which does not prevent an object from being reclaimed by garbage collection. The handle becomes invalid when the object is collected.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
