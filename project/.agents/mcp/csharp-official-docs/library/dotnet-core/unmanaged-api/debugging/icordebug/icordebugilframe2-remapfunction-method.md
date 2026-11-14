---
title: "ICorDebugILFrame2::RemapFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe2-remapfunction-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugILFrame2::RemapFunction Method

Remaps an edited function by specifying the new common intermediate language (CIL) offset

## Syntax

```cpp
HRESULT RemapFunction (
    [in] ULONG32      newILOffset
);
```

## Parameters

 `newILOffset`
 [in] The stack frame's new CIL offset at which the instruction pointer should be placed. This value must be a sequence point.

It is the caller’s responsibility to ensure the validity of this value. For example, the CIL offset is not valid if it is outside the bounds of the function.

## Remarks

When a frame’s function has been edited, the debugger can call the `RemapFunction` method to swap in the latest version of the frame's function so it can be executed. The code execution will begin at the given CIL offset.

> **Note:**
> Calling `RemapFunction`, like calling ICorDebugILFrame::SetIP, will immediately invalidate all debugging interfaces that are related to generating a stack trace for the thread. These interfaces include ICorDebugChain, ICorDebugILFrame, ICorDebugInternalFrame, and ICorDebugNativeFrame.

The `RemapFunction` method can be called only in the context of the current frame, and only in one of the following cases:

- After receipt of a ICorDebugManagedCallback2::FunctionRemapOpportunity callback that has not yet been continued.

- While code execution is stopped because of an ICorDebugManagedCallback::EditAndContinueRemap event for this frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
