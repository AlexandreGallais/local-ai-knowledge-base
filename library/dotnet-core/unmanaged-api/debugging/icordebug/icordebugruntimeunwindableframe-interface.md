---
title: "ICorDebugRuntimeUnwindableFrame Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugruntimeunwindableframe-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugRuntimeUnwindableFrame Interface

Provides support for unmanaged methods that require the common language runtime (CLR) to unwind a frame.

## Remarks

 `ICorDebugRuntimeUnwindableFrame` is a specialized version of the ICorDebugFrame interface. It is used by unmanaged methods that require the runtime to unwind a frame on the current stack. Existing unwinding conventions do not work, because they do not use JIT-compiled code. When the debugger sees an unwindable frame, it should use the ICorDebugStackWalk::Next method to unwind it, but it should perform inspection itself. When the debugger receives an `ICorDebugRuntimeUnwindableFrame`, it can call the ICorDebugStackWalk::GetContext method to retrieve the context of the frame.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.0
