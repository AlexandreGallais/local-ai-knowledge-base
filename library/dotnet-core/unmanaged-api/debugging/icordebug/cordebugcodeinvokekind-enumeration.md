---
title: "CorDebugCodeInvokeKind Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugcodeinvokekind-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugCodeInvokeKind Enumeration

Describes how an exported function invokes managed code.

## Syntax

```cpp
typedef enum CorDebugCodeInvokeKind
{
    CODE_INVOKE_KIND_NONE,
    CODE_INVOKE_KIND_RETURN,
    CODE_INVOKE_KIND_TAILCALL,
} CorDebugCodeInvokeKind;
```

## Members

|Member|Description|
|------------|-----------------|
|`CODE_INVOKE_KIND_NONE`|If any managed code is invoked by this method, it will have to be located by explicit events or breakpoints later. --or-- We may just miss some of the managed code this method calls because there is no easy way to stop on it. --or-- The method may never invoke managed code.|
|`CODE_INVOKE_KIND_RETURN`|This method will invoke managed code via a return instruction. Stepping out should arrive at the next managed code.|
|`CODE_INVOKE_KIND_TAILCALL`|This method will invoke managed code via a tail-call. Single-stepping and stepping over any call instructions should arrive at managed code.|

## Remarks

This enumeration is used by the ICorDebugProcess6::GetExportStepInfo method to provide information about stepping through managed code.

> **Note:**
> This enumeration is intended for use in .NET Native debugging scenarios only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
