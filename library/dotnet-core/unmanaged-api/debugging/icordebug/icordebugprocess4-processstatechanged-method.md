---
title: "ICorDebugProcess4::ProcessStateChanged Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess4-processstatechanged-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugProcess4::ProcessStateChanged Method

Notifies the ICorDebug pipeline that the out of process debugger is continuing the debugee's execution.

## Syntax

```cpp
HRESULT ProcessStateChanged(
    [in] CorDebugStateChange change
);
```

## Parameters

 `eChange`\
[in] A member of the CorDebugStateChange enumeration describing a change in the process's execution state.

## Remarks

The provided method is part of the `ICorDebugProcess4` interface and corresponds to the fourth slot of the virtual method table.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** None

 **Library:** None

 **.NET versions:** Available since .NET Framework 4.5

## See also

- ICorDebugProcess4 Interface
