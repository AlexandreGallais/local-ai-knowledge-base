---
title: "CorDebugGuidToTypeMapping Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebugguidtotypemapping-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugGuidToTypeMapping Structure

Maps a Windows Runtime GUID to its corresponding ICorDebugType object.

## Syntax

```cpp
typedef struct CorDebugGuidToTypeMapping {
    GUID iid;
    ICorDebugType *pType;
} CorDebugGuidToTypeMapping;
```

## Members

|Member|Description|
|------------|-----------------|
|`iid`|The GUID of the cached Windows Runtime type.|
|`pType`|A pointer to an ICorDebugType object that provides information about the cached type.|

## Requirements

 **Platforms:** Windows Runtime.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5
