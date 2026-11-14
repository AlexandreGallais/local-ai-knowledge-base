---
title: "ICorDebugProcess2::GetReferenceValueFromGCHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess2-getreferencevaluefromgchandle-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess2::GetReferenceValueFromGCHandle Method

Gets a reference pointer to the specified managed object that has a garbage collection handle.

## Syntax

```cpp
HRESULT GetReferenceValueFromGCHandle (
    [in]  UINT_PTR                 handle,
    [out] ICorDebugReferenceValue  **pOutValue
);
```

## Parameters

 `handle`
 [in] A pointer to a managed object that has a garbage collection handle. This value is a `System.IntPtr` object and can be retrieved from the `System.Runtime.InteropServices.GCHandle` for the managed object.

 `pOutValue`
 [out] A pointer to the address of an ICorDebugReferenceValue object that represents a reference to the specified managed object.

## Remarks

Do not confuse the returned reference value with a garbage collection reference value.

The returned reference behaves like a normal reference. It is disabled when code execution continues after a breakpoint. The lifetime of the target object is not affected by the lifetime of the reference value.

> **Note:**
> The `GetReferenceValueFromGCHandle` method does not validate the handle. Therefore, the `GetReferenceValueFromGCHandle` method can potentially corrupt both the debugger and the code being debugged if an invalid handle is passed.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
