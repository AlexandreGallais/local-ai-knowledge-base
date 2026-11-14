---
title: "ICorDebugMergedAssemblyRecord::GetVersion Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmergedassemblyrecord-getversion-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugMergedAssemblyRecord::GetVersion Method

Gets the assembly's version information.

## Syntax

```cpp
HRESULT GetVersion(
   [out] USHORT *pMajor,
   [out] USHORT *pMinor,
   [out] USHORT *pBuild,
   [out] USHORT *pRevision
);
```

## Parameters

 `pMajor`
 [out] A pointer to the major version number.

 `pMinor`
 [out] A pointer to the minor version number.

 `pBuild`
 [out] A pointer to the build number.

 `pRevision`
 [out] A pointer to the revision number.

## Remarks

For information on assembly version numbers, see the `System.Version` class topic.

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugMergedAssemblyRecord Interface
