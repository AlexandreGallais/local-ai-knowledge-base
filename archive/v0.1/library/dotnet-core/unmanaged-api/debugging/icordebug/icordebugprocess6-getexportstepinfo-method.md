---
title: "ICorDebugProcess6::GetExportStepInfo Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess6-getexportstepinfo-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess6::GetExportStepInfo Method

Provides information on runtime exported functions to help step through managed code.

## Syntax

```cpp
HRESULT GetExportStepInfo(
    [in] LPCWSTR pszExportName,
    [out] CorDebugCodeInvokeKind* pInvokeKind,
    [out] CorDebugCodeInvokePurpose* pInvokePurpose);
```

## Parameters

pszExportName
 [in] The name of a runtime export function as written in the PE export table.

invokeKind
 [out] A pointer to a member of the CorDebugCodeInvokeKind enumeration that describes how the exported function will invoke managed code.

invokePurpose
 [out] A pointer to a member of the CorDebugCodeInvokePurpose enumeration that describes why the exported function will call managed code.

## Return Value

The method can return the values listed in the following table.

|Return value|Description|
|------------------|-----------------|
|`S_OK`|The method call was successful.|
|`E_POINTER`|`pInvokeKind` or `pInvokePurpose` is **null**.|
|Other failing `HRESULT` values.|As appropriate.|

## Remarks

> **Note:**
> This method is available with .NET Native only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6

## See also

- ICorDebugProcess6 Interface
