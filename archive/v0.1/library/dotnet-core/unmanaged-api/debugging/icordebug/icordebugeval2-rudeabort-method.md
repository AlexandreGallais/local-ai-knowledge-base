---
title: "ICorDebugEval2::RudeAbort Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugeval2-rudeabort-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugEval2::RudeAbort Method

Aborts the computation that this `ICorDebugEval2` is currently performing.

## Syntax

```cpp
HRESULT RudeAbort ();
```

## Remarks

 `RudeAbort` does not release any locks that the evaluator holds, so it leaves the debugging session in an unsafe state. Call this method with extreme caution.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
