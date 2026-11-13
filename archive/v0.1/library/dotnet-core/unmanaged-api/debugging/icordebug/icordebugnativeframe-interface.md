---
title: "ICorDebugNativeFrame Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugnativeframe-interface.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugNativeFrame Interface

A specialized implementation of ICorDebugFrame used for native frames.

## Methods

|Method|Description|
|------------|-----------------|
|CanSetIP Method|Gets a value that indicates whether it is safe to set the instruction pointer to the specified offset location in native code.|
|GetIP Method|Gets the stack frame's offset into native code.|
|GetLocalDoubleRegisterValue Method|Gets a pointer to an ICorDebugValue that represents the value of an argument or local variable stored in two memory registers of a native frame.|
|GetLocalMemoryRegisterValue Method|Gets a pointer to an `ICorDebugValue` that represents the value of a local variable, of which the low bits are stored in the specified register and the high bits are stored at the specified memory address.|
|GetLocalMemoryValue Method|Gets a pointer to an `ICorDebugValue` that represents the value of a local variable stored at the specified memory address.|
|GetLocalRegisterMemoryValue Method|Gets a pointer to an `ICorDebugValue` that represents the value of a local variable, of which the high bits are stored in the specified register and the low bits are stored at the specified memory address|
|GetLocalRegisterValue Method|Gets a pointer to an `ICorDebugValue` that represents the value of an argument or a local variable stored in the specified native register.|
|GetRegisterSet Method|Gets a pointer to an ICorDebugRegisterSet that represents the register set for this `ICorDebugNativeFrame`.|
|SetIP Method|Sets the instruction pointer to the specified offset location in native code.|

## Remarks

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
