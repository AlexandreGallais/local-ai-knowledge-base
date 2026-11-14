---
title: "ICorDebugModule2::SetJITCompilerFlags Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmodule2-setjitcompilerflags-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugModule2::SetJITCompilerFlags Method

Sets the flags that control the just-in-time (JIT) compilation of this ICorDebugModule2.

## Syntax

```cpp
HRESULT SetJITCompilerFlags (
    [in] DWORD dwFlags
);
```

## Parameters

 `dwFlags`
 [in] A bitwise combination of the CorDebugJITCompilerFlags enumeration values.

## Remarks

If the `dwFlags` value is invalid, the `SetJITCompilerFlags` method will fail.

The `SetJITCompilerFlags` method can be called only from within the ICorDebugManagedCallback::LoadModule callback for this module. Attempts to call it after the `ICorDebugManagedCallback::LoadModule` callback has been delivered will fail.

Edit and Continue is not supported on 64-bit or Win9x platforms. Therefore, if you call the `SetJITCompilerFlags` method on either of these two platforms with the CORDEBUG_JIT_ENABLE_ENC flag set in `dwFlags`, the `SetJITCompilerFlags` method and all methods specific to Edit and Continue, such as ICorDebugModule2::ApplyChanges, will fail.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
