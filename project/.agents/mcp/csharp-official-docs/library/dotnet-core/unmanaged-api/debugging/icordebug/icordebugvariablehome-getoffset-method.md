---
title: "ICorDebugVariableHome::GetOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getoffset-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome::GetOffset Method

Gets the offset from the base register for a variable.

## Syntax

```cpp
HRESULT GetOffset(
    [out] LONG *pOffset
);
```

## Parameters

 `pOffset`
 [out] The offset from the base register.

## Return Value

The method returns the following values:

|Value|Description|
|-----------|-----------------|
|`S_OK`|The variable is in a register-relative memory location.|
|`E_FAIL`|The variable is not in a register-relative memory location.|

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
