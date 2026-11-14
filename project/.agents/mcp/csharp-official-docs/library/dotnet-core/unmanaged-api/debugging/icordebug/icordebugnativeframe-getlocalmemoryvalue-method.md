---
title: "ICorDebugNativeFrame::GetLocalMemoryValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-getlocalmemoryvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::GetLocalMemoryValue Method

Gets the value of an argument or local variable that is stored in the specified memory location for this native frame.

## Syntax

```cpp
HRESULT GetLocalMemoryValue (
    [in]  CORDB_ADDRESS      address,
    [in]  ULONG              cbSigBlob,
    [in]  PCCOR_SIGNATURE    pvSigBlob,
    [out] ICorDebugValue     **ppValue
);
```

## Parameters

 `address`
 [in] A `CORDB_ADDRESS` value that specifies the memory location containing the value.

 `cbSigBlob`
 [in] An integer that specifies the size of the binary metadata signature which is referenced by the `pvSigBlob` parameter.

 `pvSigBlob`
 [in] A `PCCOR_SIGNATURE` value that points to the binary metadata signature of the value's type.

 `ppValue`
 [out] A pointer to the address of an "ICorDebugValue" object representing the retrieved value that is stored in the specified memory location.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
