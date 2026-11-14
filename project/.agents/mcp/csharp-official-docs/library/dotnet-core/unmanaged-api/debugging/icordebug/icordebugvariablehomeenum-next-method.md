---
title: "ICorDebugVariableHomeEnum::Next Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehomeenum-next-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHomeEnum::Next Method

Gets the specified number of ICorDebugVariableHome instances that contain information about the local variables and arguments in a function.

## Syntax

```cpp
HRESULT Next(
    [in] ULONG celt,
    [out, size_is(celt), length_is(*pceltFetched)] ICorDebugVariableHome *homes[],
    [out] ULONG *pceltFetched
);
```

## Parameters

 `celt`
 [in] The number of objects to be retrieved.

 `homes`
An array of pointers, each of which points to a ICorDebugVariableHome object that provides information about  a local variable or argument of a function.

 `pceltFetched`
 [out] The number of instances actually returned in objects.

## Return Value

The method returns the following values.

|HRESULT|Description|
|-------------|-----------------|
|`S_OK`|The method completed successfully.|
|`S_FALSE`|The actual number of instances retrieved, as reflected in `pceltFetched`, is less than the number of instances requested.|

## Remarks

The ICorDebugVariableHomeEnum::Next method retrieves a maximum of  `celt` objects starting at the current position of the enumerator. When the method returns, `pceltFetched` contains the actual number of objects retrieved.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHomeEnum Interface
- ICorDebugVariableHome Interface
