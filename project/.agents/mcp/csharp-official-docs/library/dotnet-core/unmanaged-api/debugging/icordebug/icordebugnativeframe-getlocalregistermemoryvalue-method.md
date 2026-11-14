---
title: "ICorDebugNativeFrame::GetLocalRegisterMemoryValue Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-getlocalregistermemoryvalue-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::GetLocalRegisterMemoryValue Method

Gets the value of an argument or local variable, of which the low word and high word are stored in the memory location and specified register, respectively, for this native frame.

## Syntax

```cpp
HRESULT GetLocalRegisterMemoryValue (
    [in] CorDebugRegister   highWordReg,
    [in] CORDB_ADDRESS      lowWordAddress,
    [in] ULONG              cbSigBlob,
    [in] PCCOR_SIGNATURE    pvSigBlob,
    [out] ICorDebugValue    **ppValue
);
```

## Parameters

 `highWordReg`
 [in] A value of the "CorDebugRegister" enumeration that specifies the register containing the high word of the value.

 `lowWordAddress`
 [in] A `CORDB_ADDRESS` value that specifies the memory location containing the low word of the value.

 `cbSigBlob`
 [in] An integer that specifies the size of the binary metadata signature which is referenced by the `pvSigBlob` parameter.

 `pvSigBlob`
 [in] A `PCCOR_SIGNATURE` value that points to the binary metadata signature of the value's type.

 `ppValue`
 [out] A pointer to the address of an "ICorDebugValue" object representing the retrieved value that is stored in the specified register and memory location.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
