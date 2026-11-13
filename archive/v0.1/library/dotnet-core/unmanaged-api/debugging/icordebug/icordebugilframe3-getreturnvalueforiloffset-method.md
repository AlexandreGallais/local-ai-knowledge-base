---
title: "ICorDebugILFrame3::GetReturnValueForILOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugilframe3-getreturnvalueforiloffset-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugILFrame3::GetReturnValueForILOffset Method

Gets an "ICorDebugValue" object that encapsulates the return value of a function.

## Syntax

```cpp
HRESULT GetReturnValueForILOffset(
    ULONG32 ILoffset,
    [out] ICorDebugValue **ppReturnValue
);
```

## Parameters

 `ILOffset`
The IL offset. See the Remarks section.

 `ppReturnValue`
A pointer to the address of an "ICorDebugValue" interface object that provides information about the return value of a function call.

## Remarks

This method is used along with the ICorDebugCode3::GetReturnValueLiveOffset method to get the return value of a method. It is particularly useful in the case of methods whose return values are ignored, as in the following two code examples. The first example calls the `System.Int32.TryParse*` method, but ignores the method's return value.

 _Code sample not included: ../../../../../samples/snippets/csharp/VS_Snippets_CLR/unmanaged.debugging.mrv/cs/mrv1.cs._

The second example illustrates a much more common problem in debugging. Because a method is used as an argument in a method call, its return value is accessible only when the debugger steps through the called method. In many cases, particularly when the called method is defined in an external library, that is not possible.

 _Code sample not included: ../../../../../samples/snippets/csharp/VS_Snippets_CLR/unmanaged.debugging.mrv/cs/mrv2.cs._

If you pass the ICorDebugCode3::GetReturnValueLiveOffset method an IL offset to a function call site, it returns one or more native offsets. The debugger can then set breakpoints on these native offsets in the function. When the debugger hits one of the breakpoints, you can then pass the same IL offset that you passed to this method to get the return value. The debugger should then clear all the breakpoints that it set.

> **Warning:**
> The ICorDebugCode3::GetReturnValueLiveOffset Method and `ICorDebugILFrame3::GetReturnValueForILOffset` methods allow you to get return value information for reference types only. Retrieving return value information from value types (that is, all types that derive from `System.ValueType`) is not supported.

The IL offset specified by the `ILOffset` parameter should be at a function call site, and the debuggee should be stopped at a breakpoint set at the native offset returned by the ICorDebugCode3::GetReturnValueLiveOffset method for the same IL offset. If the debuggee is not stopped at the correct location for the specified IL offset, the API will fail.

If the function call doesn't return a value, the API will fail.

The `ICorDebugILFrame3::GetReturnValueForILOffset` method is available only on x86-based and AMD64 systems.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.1

## See also

- GetReturnValueLiveOffset Method
- ICorDebugILFrame3 Interface
