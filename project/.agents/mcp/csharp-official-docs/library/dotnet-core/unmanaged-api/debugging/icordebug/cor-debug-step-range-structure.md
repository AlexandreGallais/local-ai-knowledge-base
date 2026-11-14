---
title: "COR_DEBUG_STEP_RANGE Structure"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cor-debug-step-range-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
