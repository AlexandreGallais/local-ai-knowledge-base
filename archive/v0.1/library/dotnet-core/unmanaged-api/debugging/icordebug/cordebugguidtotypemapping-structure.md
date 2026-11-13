---
title: "CorDebugGuidToTypeMapping Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugguidtotypemapping-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
