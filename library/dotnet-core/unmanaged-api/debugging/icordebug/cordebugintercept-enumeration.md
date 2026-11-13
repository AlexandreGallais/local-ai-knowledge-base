---
title: "CorDebugIntercept Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/cordebugintercept-enumeration.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# CorDebugIntercept Enumeration

Indicates the types of code that can be intercepted (that is, stepped into).

## Syntax

```cpp
typedef enum CorDebugIntercept {
    INTERCEPT_NONE                = 0x0,
    INTERCEPT_CLASS_INIT          = 0x01,
    INTERCEPT_EXCEPTION_FILTER    = 0x02,
    INTERCEPT_SECURITY            = 0x04,
    INTERCEPT_CONTEXT_POLICY      = 0x08,
    INTERCEPT_INTERCEPTION        = 0x10,
    INTERCEPT_ALL                 = 0xffff
} CorDebugIntercept;
```

## Members

|Member|Description|
|------------|-----------------|
|`INTERCEPT_NONE`|No code can be intercepted.|
|`INTERCEPT_CLASS_INIT`|A constructor can be intercepted.|
|`INTERCEPT_EXCEPTION_FILTER`|An exception filter can be intercepted.|
|`INTERCEPT_SECURITY`|Code that enforces security can be intercepted.|
|`INTERCEPT_CONTEXT_POLICY`|A context policy can be intercepted.|
|`INTERCEPT_INTERCEPTION`|Not used.|
|`INTERCEPT_ALL`|All code can be intercepted.|

## Remarks

 Use the ICorDebugStepper::SetInterceptMask method to establish the types of code that can be intercepted.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
