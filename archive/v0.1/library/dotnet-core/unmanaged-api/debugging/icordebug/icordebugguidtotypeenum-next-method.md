---
title: "ICorDebugGuidToTypeEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugguidtotypeenum-next-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugGuidToTypeEnum::Next Method

Gets the specified number of CorDebugGuidToTypeMapping instances that map GUIDs to type information.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,
    [out, size_is(celt), length_is(*pceltFetched] CorDebugGuidToTypeMapping values[  ],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of GUID-to-type mapping objects to be retrieved.

 `values`
 [out] An array of pointers, each of which points to a CorDebugGuidToTypeMapping object that maps a Windows Runtime GUID to its corresponding ICorDebugType object.

 `pceltFetched`
 [out] A pointer to the number of CorDebugGuidToTypeMapping objects actually returned in `values`.

## Requirements

 **Platforms:** Windows Runtime

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugGuidToTypeEnum Interface
