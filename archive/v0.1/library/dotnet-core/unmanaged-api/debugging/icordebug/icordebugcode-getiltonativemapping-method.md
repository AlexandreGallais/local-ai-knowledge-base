---
title: "ICorDebugCode::GetILToNativeMapping Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getiltonativemapping-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetILToNativeMapping Method

Gets an array of "COR_DEBUG_IL_TO_NATIVE_MAP" instances that represent mappings from common intermediate language (CIL) offsets to native offsets.

## Syntax

```cpp
HRESULT GetILToNativeMapping (
    [in]  ULONG32    cMap,
    [out] ULONG32    *pcMap,
    [out, size_is(cMap), length_is(*pcMap)]
        COR_DEBUG_IL_TO_NATIVE_MAP map[]
);
```

## Parameters

 `cMap`
 [in] The size of the `map` array.

 `pcMap`
 [out] A pointer to the actual number of elements returned in the `map` array.

 `map`
 [out] An array of `COR_DEBUG_IL_TO_NATIVE_MAP` structures, each of which represents a mapping from a CIL offset to a native offset.

There is no ordering to the array of elements returned.

## Remarks

The `GetILToNativeMapping` method returns meaningful results only if this "ICorDebugCode" instance represents native code that was just-in-time (JIT) compiled from CIL code.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugCode Interface
