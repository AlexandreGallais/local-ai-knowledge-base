---
title: "ICorDebugNativeFrame::CanSetIP Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-cansetip-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame::CanSetIP Method

Gets an HRESULT that indicates whether it is safe to set the instruction pointer (IP) to the specified offset location in native code.

## Syntax

```cpp
HRESULT CanSetIP (
    [in] ULONG32            nOffset
);
```

## Parameters

 `nOffset`
 [in] The desired setting for the instruction pointer.

## Remarks

Use the `CanSetIP` method prior to calling the ICorDebugNativeFrame::SetIP method. If `CanSetIP` returns any HRESULT other than S_OK, you can still invoke `ICorDebugNativeFrame::SetIP`, but there is no guarantee that the debugger will continue the safe and correct execution of the code being debugged.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
