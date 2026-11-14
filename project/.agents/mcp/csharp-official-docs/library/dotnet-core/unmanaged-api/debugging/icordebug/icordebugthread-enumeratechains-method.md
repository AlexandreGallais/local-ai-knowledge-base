---
title: "ICorDebugThread::EnumerateChains Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugthread-enumeratechains-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugThread::EnumerateChains Method

Gets an interface pointer to an ICorDebugChainEnum enumerator that contains all the stack chains in this ICorDebugThread object.

## Syntax

```cpp
HRESULT EnumerateChains (
    [out] ICorDebugChainEnum **ppChains
);
```

## Parameters

 `ppChains`
 [out] A pointer to the address of an `ICorDebugChainEnum` object that allows enumeration of all the stack chains in this thread, starting at the active (that is, the most recent) chain.

## Remarks

The stack chain represents the physical call stack for the thread. The following circumstances create a stack chain boundary:

- A managed-to-unmanaged or unmanaged-to-managed transition.

- A context switch.

- A debugger hijacking of a user thread.

In the simple case for a thread that is running purely managed code in a single context, a one-to-one correspondence will exist between threads and stack chains.

A debugger may want to rearrange the physical call stacks of all threads into logical call stacks. This would involve sorting all the threads' chains by their caller/callee relationships and regrouping them.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
