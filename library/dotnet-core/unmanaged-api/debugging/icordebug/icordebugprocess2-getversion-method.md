---
title: "ICorDebugProcess2::GetVersion Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-getversion-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::GetVersion Method

Gets the version number of the common language runtime (CLR) that is running in this process.

## Syntax

```cpp
HRESULT GetVersion (
    [out] COR_VERSION     *version
);
```

## Parameters

`version`\
[out] A pointer to a COR_VERSION structure that stores the version number of the runtime.

## Remarks

The `GetVersion` method returns an error code if no runtime has been loaded in the process.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 2.0
