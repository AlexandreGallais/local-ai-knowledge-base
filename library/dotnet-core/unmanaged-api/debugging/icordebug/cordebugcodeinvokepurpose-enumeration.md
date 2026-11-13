---
title: "CorDebugCodeInvokePurpose Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugcodeinvokepurpose-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugCodeInvokePurpose Enumeration

Describes why an exported function calls managed code.

## Syntax

```cpp
typedef enum CorDebugCodeInvokePurpose
{
    CODE_INVOKE_PURPOSE_NONE,
    CODE_INVOKE_PURPOSE_NATIVE_TO_MANAGED_TRANSITION,
    CODE_INVOKE_PURPOSE_CLASS_INIT,
    CODE_INVOKE_PURPOSE_INTERFACE_DISPATCH,
} CorDebugCodeInvokePurpose;
```

## Members

| Member                     | Description      |
|----------------------------|------------------|
| `CODE_INVOKE_PURPOSE_NONE` | None or unknown. |
|`CODE_INVOKE_PURPOSE_NATIVE_TO_MANAGED_TRANSITION`|The managed code will run any managed entry point, such as a reverse p-invoke. Any more detailed purpose is unknown by the runtime.|
|`CODE_INVOKE_PURPOSE_CLASS_INIT`|The managed code will run a static constructor.|
|`CODE_INVOKE_PURPOSE_INTERFACE_DISPATCH`|The managed code will run the implementation for some interface method that was called.|

## Remarks

 This enumeration is used by the ICorDebugProcess6::GetExportStepInfo method to provide information about stepping through managed code.

> **Note:**
> This enumeration is intended for use in .NET Native debugging scenarios only.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6
