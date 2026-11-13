---
title: "COR_DEBUG_STEP_RANGE Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cor-debug-step-range-structure.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# COR_DEBUG_STEP_RANGE Structure

Contains the offset information for a range of code.

This structure is used by the ICorDebugStepper::StepRange method.

## Syntax

```cpp
typedef struct {
    ULONG32 startOffset;
    ULONG32 endOffset;
} COR_DEBUG_STEP_RANGE;
```

## Members

| Member        | Description                               |
|---------------|-------------------------------------------|
| `startOffset` | The offset of the beginning of the range. |
| `endOffset`   | The offset of the end of the range.       |

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- StepRange Method
