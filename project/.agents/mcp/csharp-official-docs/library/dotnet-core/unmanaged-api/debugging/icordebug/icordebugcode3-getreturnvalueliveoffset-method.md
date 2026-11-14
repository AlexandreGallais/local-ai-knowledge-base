---
title: "ICorDebugCode3::GetReturnValueLiveOffset Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugcode3-getreturnvalueliveoffset-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugCode3::GetReturnValueLiveOffset Method

For a specified IL offset, gets the native offsets where a breakpoint should be placed so that the debugger can obtain the return value from a function.

## Syntax

```cpp
HRESULT GetReturnValueLiveOffset(
    [in] ULONG32 ILoffset,
    [in] ULONG32 bufferSize,
    [out] ULONG32 *pFetched,
    [out, size_is(buffersize), length_is(*pFetched)] ULong32 pOffsets[]
);
```

## Parameters

 `ILoffset`
The IL offset. It must be a function call site or the function call will fail.

 `bufferSize`
The number of bytes available to store `pOffsets`.

 `pFetched`
A pointer to the number of offsets actually returned. Usually, its value is 1, but a single IL instruction can map to multiple `CALL` assembly instructions.

 `pOffsets`
An array of native offsets. Typically, `pOffsets` contains a single offset, although a single IL instruction can map to multiple map to multiple `CALL` assembly instructions.

## Remarks

This method is used along with the ICorDebugILFrame3::GetReturnValueForILOffset method to get the return value of a method that returns a reference type. Passing an IL offset to a function call site to this method returns one or more native offsets. The debugger can then set breakpoints on these native offsets in the function. When the debugger hits one of the breakpoints, you can then pass the same IL offset that you passed to this method to the ICorDebugILFrame3::GetReturnValueForILOffset method to get the return value. The debugger should then clear all the breakpoints that it set.

> **Warning:**
> The `ICorDebugCode3::GetReturnValueLiveOffset` and ICorDebugILFrame3::GetReturnValueForILOffset methods allow you to get return value information for reference types only. Retrieving return value information from value types (that is, all types that derive from `System.ValueType`) is not supported.

The function returns the `HRESULT` values shown in the following table.

|`HRESULT` value|Description|
|---------------------|-----------------|
|`S_OK`|Success.|
|`CORDBG_E_INVALID_OPCODE`|The given IL offset site is not a call instruction, or the function returns `void`.|
|`CORDBG_E_UNSUPPORTED`|The given IL offset is a proper call, but the return type is unsupported for getting a return value.|

The `ICorDebugCode3::GetReturnValueLiveOffset` method is available only on x86-based and AMD64 systems.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.5.1

## See also

- GetReturnValueForILOffset Method
- ICorDebugCode3 Interface
