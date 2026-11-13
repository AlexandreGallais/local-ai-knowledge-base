---
title: "CorDebugChainReason Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugchainreason-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugChainReason Enumeration

Indicates the reason or reasons for the initiation of a call chain.

## Syntax

```cpp
typedef enum CorDebugChainReason {
    CHAIN_NONE              = 0x000,
    CHAIN_CLASS_INIT        = 0x001,
    CHAIN_EXCEPTION_FILTER  = 0x002,
    CHAIN_SECURITY          = 0x004,
    CHAIN_CONTEXT_POLICY    = 0x008,
    CHAIN_INTERCEPTION      = 0x010,
    CHAIN_PROCESS_START     = 0x020,
    CHAIN_THREAD_START      = 0x040,
    CHAIN_ENTER_MANAGED     = 0x080,
    CHAIN_ENTER_UNMANAGED   = 0x100,
    CHAIN_DEBUGGER_EVAL     = 0x200,
    CHAIN_CONTEXT_SWITCH    = 0x400,
    CHAIN_FUNC_EVAL         = 0x800
} CorDebugChainReason;
```

## Members

| Member                   | Description                                                 |
|--------------------------|-------------------------------------------------------------|
| `CHAIN_NONE`             | No call chain has been initiated.                           |
| `CHAIN_CLASS_INIT`       | The chain was initiated by a constructor.                   |
| `CHAIN_EXCEPTION_FILTER` | The chain was initiated by an exception filter.             |
| `CHAIN_SECURITY`         | The chain was initiated by code that enforces security.     |
| `CHAIN_CONTEXT_POLICY`   | The chain was initiated by a context policy.                |
| `CHAIN_INTERCEPTION`     | Not used.                                                   |
| `CHAIN_PROCESS_START`    | Not used.                                                   |
| `CHAIN_THREAD_START`     | The chain was initiated by the start of a thread execution. |
| `CHAIN_ENTER_MANAGED`    | The chain was initiated by entry into managed code.         |
| `CHAIN_ENTER_UNMANAGED`  | The chain was initiated by entry into unmanaged code.       |
| `CHAIN_DEBUGGER_EVAL`    | Not used.                                                   |
| `CHAIN_CONTEXT_SWITCH`   | Not used.                                                   |
| `CHAIN_FUNC_EVAL`        | The chain was initiated by a function evaluation.           |

## Remarks

 Use the ICorDebugChain::GetReason method to ascertain the reasons for the initiation of a call chain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
