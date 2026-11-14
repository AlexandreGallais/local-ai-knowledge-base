---
title: "CorDebugInterfaceVersion Enumeration"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/cordebuginterfaceversion-enumeration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# CorDebugInterfaceVersion Enumeration

Specifies an interface, a version of .NET, or a version of .NET in which an interface was introduced.

## Syntax

```cpp
typedef enum CorDebugInterfaceVersion {

    CorDebugInvalidVersion            = 0,
    CorDebugVersion_1_0               = CorDebugInvalidVersion + 1,

    ver_ICorDebugManagedCallback      = CorDebugVersion_1_0,
    ver_ICorDebugUnmanagedCallback    = CorDebugVersion_1_0,
    ver_ICorDebug                     = CorDebugVersion_1_0,
    ver_ICorDebugController           = CorDebugVersion_1_0,
    ver_ICorDebugAppDomain            = CorDebugVersion_1_0,
    ver_ICorDebugAssembly             = CorDebugVersion_1_0,
    ver_ICorDebugProcess              = CorDebugVersion_1_0,
    ver_ICorDebugBreakpoint           = CorDebugVersion_1_0,
    ver_ICorDebugFunctionBreakpoint   = CorDebugVersion_1_0,
    ver_ICorDebugModuleBreakpoint     = CorDebugVersion_1_0,
    ver_ICorDebugValueBreakpoint      = CorDebugVersion_1_0,
    ver_ICorDebugStepper              = CorDebugVersion_1_0,
    ver_ICorDebugRegisterSet          = CorDebugVersion_1_0,
    ver_ICorDebugThread               = CorDebugVersion_1_0,
    ver_ICorDebugChain                = CorDebugVersion_1_0,
    ver_ICorDebugFrame                = CorDebugVersion_1_0,
    ver_ICorDebugILFrame              = CorDebugVersion_1_0,
    ver_ICorDebugNativeFrame          = CorDebugVersion_1_0,
    ver_ICorDebugModule               = CorDebugVersion_1_0,
    ver_ICorDebugFunction             = CorDebugVersion_1_0,
    ver_ICorDebugCode                 = CorDebugVersion_1_0,
    ver_ICorDebugClass                = CorDebugVersion_1_0,
    ver_ICorDebugEval                 = CorDebugVersion_1_0,
    ver_ICorDebugValue                = CorDebugVersion_1_0,
    ver_ICorDebugGenericValue         = CorDebugVersion_1_0,
    ver_ICorDebugReferenceValue       = CorDebugVersion_1_0,
    ver_ICorDebugHeapValue            = CorDebugVersion_1_0,
    ver_ICorDebugObjectValue          = CorDebugVersion_1_0,
    ver_ICorDebugBoxValue             = CorDebugVersion_1_0,
    ver_ICorDebugStringValue          = CorDebugVersion_1_0,
    ver_ICorDebugArrayValue           = CorDebugVersion_1_0,
    ver_ICorDebugContext              = CorDebugVersion_1_0,
    ver_ICorDebugEnum                 = CorDebugVersion_1_0,
    ver_ICorDebugObjectEnum           = CorDebugVersion_1_0,
    ver_ICorDebugBreakpointEnum       = CorDebugVersion_1_0,
    ver_ICorDebugStepperEnum          = CorDebugVersion_1_0,
    ver_ICorDebugProcessEnum          = CorDebugVersion_1_0,
    ver_ICorDebugThreadEnum           = CorDebugVersion_1_0,
    ver_ICorDebugFrameEnum            = CorDebugVersion_1_0,
    ver_ICorDebugChainEnum            = CorDebugVersion_1_0,
    ver_ICorDebugModuleEnum           = CorDebugVersion_1_0,
    ver_ICorDebugValueEnum            = CorDebugVersion_1_0,
    ver_ICorDebugCodeEnum             = CorDebugVersion_1_0,
    ver_ICorDebugTypeEnum             = CorDebugVersion_1_0,
    ver_ICorDebugErrorInfoEnum        = CorDebugVersion_1_0,
    ver_ICorDebugAppDomainEnum        = CorDebugVersion_1_0,
    ver_ICorDebugAssemblyEnum         = CorDebugVersion_1_0,
    ver_ICorDebugEditAndContinueErrorInfo
                                      = CorDebugVersion_1_0,
    ver_ICorDebugEditAndContinueSnapshot
                                      = CorDebugVersion_1_0,

    CorDebugVersion_1_1               = CorDebugVersion_1_0 + 1,
    // No interface definitions in version 1.1.

    CorDebugVersion_2_0 = CorDebugVersion_1_1 + 1,

    ver_ICorDebugManagedCallback2    = CorDebugVersion_2_0,
    ver_ICorDebugAppDomain2          = CorDebugVersion_2_0,
    ver_ICorDebugProcess2            = CorDebugVersion_2_0,
    ver_ICorDebugStepper2            = CorDebugVersion_2_0,
    ver_ICorDebugRegisterSet2        = CorDebugVersion_2_0,
    ver_ICorDebugThread2             = CorDebugVersion_2_0,
    ver_ICorDebugILFrame2            = CorDebugVersion_2_0,
    ver_ICorDebugModule2             = CorDebugVersion_2_0,
    ver_ICorDebugFunction2           = CorDebugVersion_2_0,
    ver_ICorDebugCode2               = CorDebugVersion_2_0,
    ver_ICorDebugClass2              = CorDebugVersion_2_0,
    ver_ICorDebugValue2              = CorDebugVersion_2_0,
    ver_ICorDebugEval2               = CorDebugVersion_2_0,
    ver_ICorDebugObjectValue2        = CorDebugVersion_2_0,

    // CLR v4 - next major CLR version after CLR v2
    // Includes Silverlight 4
    CorDebugVersion_4_0 = CorDebugVersion_2_0 + 1,

    ver_ICorDebugThread3             = CorDebugVersion_4_0,
    ver_ICorDebugThread4             = CorDebugVersion_4_0,
    ver_ICorDebugStackWalk           = CorDebugVersion_4_0,
    ver_ICorDebugNativeFrame2        = CorDebugVersion_4_0,
    ver_ICorDebugInternalFrame2      = CorDebugVersion_4_0,
    ver_ICorDebugRuntimeUnwindableFrame = CorDebugVersion_4_0,
    ver_ICorDebugHeapValue3          = CorDebugVersion_4_0,
    ver_ICorDebugBlockingObjectEnum  = CorDebugVersion_4_0,
    ver_ICorDebugValue3 = CorDebugVersion_4_0,

    CorDebugVersion_4_5 = CorDebugVersion_4_0 + 1,

    ver_ICorDebugComObjectValue = CorDebugVersion_4_5,
    ver_ICorDebugAppDomain3 = CorDebugVersion_4_5,
    ver_ICorDebugCode3 = CorDebugVersion_4_5,
    ver_ICorDebugILFrame3 = CorDebugVersion_4_5,

    CorDebugLatestVersion = CorDebugVersion_4_5

} CorDebugInterfaceVersion;
```

## Members

 The following table provides links from each enumeration value to the corresponding interface. In addition, the table indicates the first version of .NET that the interface was supported in.

| Member                            | Specifies                                                               | .NET version |
|-----------------------------------|-------------------------------------------------------------------------|--------------|
| `CorDebugInvalidVersion`          | The version of .NET Framework is invalid.                               | -            |
| `CorDebugVersion_1_0`             | The version of .NET Framework, including all its service packs, is 1.0. | 1.0          |
| `CorDebugVersion_1_1`             | The version of .NET Framework, including all service packs, is 1.1.     | 1.1          |
| `CorDebugVersion_2_0`             | The version of .NET Framework, including all service packs, is 2.0.     | 2.0          |
| `CorDebugVersion_4_0`             | The version of .NET Framework, including all service packs, is 4.       | 4            |
| `CorDebugVersion_4_5`             | The version of .NET Framework, including all service packs, is 4.5.     | 4.5          |
| `ver_ICorDebugManagedCallback`    | ICorDebugManagedCallback       | 1.0          |
| `ver_ICorDebugUnmanagedCallback`  | ICorDebugUnmanagedCallback   | 1.0          |
| `ver_ICorDebug`                   | ICorDebug                                     | 1.0          |
| `ver_ICorDebugController`         | ICorDebugController                 | 1.0          |
| `ver_ICorDebugAppDomain`          | ICorDebugAppDomain                   | 1.0          |
| `ver_ICorDebugAssembly`           | ICorDebugAssembly                     | 1.0          |
| `ver_ICorDebugProcess`            | ICorDebugProcess                       | 1.0          |
| `ver_ICorDebugBreakpoint`         | ICorDebugBreakpoint                 | 1.0          |
| `ver_ICorDebugFunctionBreakpoint` | ICorDebugFunctionBreakpoint | 1.0          |
| `ver_ICorDebugModuleBreakpoint`   | ICorDebugModuleBreakpoint     | 1.0          |
| `ver_ICorDebugValueBreakpoint`    | ICorDebugValueBreakpoint       | 1.0          |
| `ver_ICorDebugStepper`            | ICorDebugStepper                       | 1.0          |
| `ver_ICorDebugRegisterSet`        | ICorDebugRegisterSet               | 1.0          |
| `ver_ICorDebugThread`             | ICorDebugThread                         | 1.0          |
| `ver_ICorDebugChain`              | ICorDebugChain                           | 1.0          |
| `ver_ICorDebugFrame`              | ICorDebugFrame                           | 1.0          |
| `ver_ICorDebugILFrame`            | ICorDebugILFrame                       | 1.0          |
| `ver_ICorDebugNativeFrame`        | ICorDebugNativeFrame               | 1.0          |
| `ver_ICorDebugModule`             | ICorDebugModule                         | 1.0          |
| `ver_ICorDebugFunction`           | ICorDebugFunction                    | 1.0          |
| `ver_ICorDebugCode`               | ICorDebugCode                            | 1.0          |
| `ver_ICorDebugClass`              | ICorDebugClass                           | 1.0          |
| `ver_ICorDebugEval`               | ICorDebugEval                             | 1.0          |
| `ver_ICorDebugValue`              | ICorDebugValue                           | 1.0          |
| `ver_ICorDebugGenericValue`       | ICorDebugGenericValue             | 1.0          |
| `ver_ICorDebugReferenceValue`     | ICorDebugReferenceValue         | 1.0          |
| `ver_ICorDebugHeapValue`          | ICorDebugHeapValue                   | 1.0          |
| `ver_ICorDebugObjectValue`        | ICorDebugObjectValue               | 1.0          |
| `ver_ICorDebugBoxValue`           | ICorDebugBoxValue                     | 1.0          |
| `ver_ICorDebugStringValue`        | ICorDebugStringValue               | 1.0          |
| `ver_ICorDebugArrayValue`         | ICorDebugArrayValue                 | 1.0          |
| `ver_ICorDebugContext`            | ICorDebugContext                       | 1.0          |
| `ver_ICorDebugEnum`               | ICorDebugEnum                            | 1.0          |
| `ver_ICorDebugObjectEnum`         | ICorDebugObjectEnum                 | 1.0          |
| `ver_ICorDebugBreakpointEnum`     | ICorDebugBreakpointEnum         | 1.0          |
| `ver_ICorDebugStepperEnum`        | ICorDebugStepperEnum               | 1.0          |
| `ver_ICorDebugProcessEnum`        | ICorDebugProcessEnum               | 1.0          |
| `ver_ICorDebugThreadEnum`         | ICorDebugThreadEnum                | 1.0          |
| `ver_ICorDebugFrameEnum`          | ICorDebugFrameEnum                   | 1.0          |
| `ver_ICorDebugChainEnum`          | ICorDebugChainEnum                   | 1.0          |
| `ver_ICorDebugModuleEnum`         | ICorDebugModuleEnum                 | 1.0          |
| `ver_ICorDebugValueEnum`          | ICorDebugValueEnum                   | 1.0          |
| `ver_ICorDebugCodeEnum`           | ICorDebugCodeEnum                     | 1.0          |
| `ver_ICorDebugTypeEnum`           | ICorDebugTypeEnum                     | 1.0          |
| `ver_ICorDebugErrorInfoEnum`      | ICorDebugErrorInfoEnum           | 1.0          |
| `ver_ICorDebugAppDomainEnum`      | ICorDebugAppDomainEnum           | 1.0          |
| `ver_ICorDebugAssemblyEnum`       | ICorDebugAssemblyEnum             | 1.0          |
|`ver_ICorDebugEditAndContinueErrorInfo`|ICorDebugEditAndContinueErrorInfo|1.0|
|`ver_ICorDebugEditAndContinueSnapshot`|ICorDebugEditAndContinueSnapshot|1.0|
|`ver_ICorDebugManagedCallback2`|ICorDebugManagedCallback2|2.0|
|`ver_ICorDebugAppDomain2`|ICorDebugAppDomain2|2.0|
|`ver_ICorDebugProcess2`|ICorDebugProcess2|2.0|
|`ver_ICorDebugStepper2`|ICorDebugStepper2|2.0|
|`ver_ICorDebugRegisterSet2`|ICorDebugRegisterSet2|2.0|
|`ver_ICorDebugThread2`|ICorDebugThread2|2.0|
|`ver_ICorDebugILFrame2`|ICorDebugILFrame2|2.0|
|`ver_ICorDebugModule2`|ICorDebugModule2|2.0|
|`ver_ICorDebugFunction2`|ICorDebugFunction2|2.0|
|`ver_ICorDebugCode2`|ICorDebugCode2|2.0|
|`ver_ICorDebugClass2`|"ICorDebugClass2"|2.0|
|`ver_ICorDebugValue2`|"ICorDebugValue2"|2.0|
|`ver_ICorDebugEval2`|The "ICorDebugEval2".|2.0|
|`ver_ICorDebugObjectValue2`|"ICorDebugObjectValue2"|2.0|
|`ver_ICorDebugThread3`|ICorDebugThread3|4|
|`ver_ICorDebugThread4`|ICorDebugThread4|4|
|`ver_ICorDebugStackWalk`|ICorDebugStackWalk|4|
|`ver_ICorDebugNativeFrame2`|ICorDebugNativeFrame2|4|
|`ver_ICorDebugInternalFrame2`|ICorDebugInternalFrame2|4|
|`ver_ICorDebugRuntimeUnwindableFrame`|ICorDebugRuntimeUnwindableFrame|4|
|`ver_ICorDebugHeapValue3`|ICorDebugHeapValue3 Interface|4|
|`ver_ICorDebugBlockingObjectEnum`|ICorDebugBlockingObjectEnum Interface|4|
|`ver_ICorDebugValue3`|ICorDebugValue3|4|
|`ver_ICorDebugComObjectValue`|ICorDebugComObjectValue|4.5|
|`ver_ICorDebugAppDomain3`|ICorDebugAppDomain3|4.5|
|`ver_ICorDebugCode3`|ICorDebugCode3|4.5|
|`ver_ICorDebugILFrame3`|ICorDebugILFrame3|4.5|
|`CorDebugLatestVersion`|The version of .NET is the latest version.|-|

## Remarks

 A debugger can use the `CorDebugInterfaceVersion` enumeration in the CreateDebuggingInterfaceFromVersion function to specify the highest version of .NET that the debugger supports.

## Interface Names

 The number that appears at the end of the interface names in the debugging API (for example, the "3" in `ICorDebugThread3`) specifies the version of the interface, not the version of .NET. All interface names in the debugging API include version numbers except for interfaces that were introduced in .NET Framework 1.0. Any correspondences between interface version numbers and .NET version numbers are coincidental.

- Interfaces that were introduced in .NET Framework 1.0 do not include numbers, because they are all implicitly version 1.

- .NET Framework 1.1 uses version 1.0 interfaces, and does not introduce any new debugging interfaces.

- The 14 debugging interfaces introduced in .NET Framework 2.0 are logical extensions of their version 1 counterparts and include the number "2" in their names.

- .NET Framework versions 3.0 and 3.5 use the existing .NET Framework 2.0 interfaces, and do not introduce any new interfaces.

- .NET Framework 4 introduces a mix of interface versions. For example, both `ICorDebugThread3` and `ICorDebugThread4` appear as the third and fourth versions of the `ICorDebugThread` interface. .NET Framework 4 also introduces the first version of the `ICorDebugStackWalk` interface and the second version of the `ICorDebugNativeFrame` interface (`ICorDebugNativeFrame2`).

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
