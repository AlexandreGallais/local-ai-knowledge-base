---
title: "ICorDebugEval Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval Interface

Provides methods to enable the debugger to execute code within the context of the code being debugged.

## Methods

|Method|Description|
|------------|-----------------|
|Abort Method|Aborts the computation this `ICorDebugEval` object is currently performing.|
|CallFunction Method|Sets up a call to the specified function. (Obsolete; use ICorDebugEval2::CallParameterizedFunction instead.)|
|CreateValue Method|Gets an interface pointer to an "ICorDebugValue" object of the specified type, with an initial value of zero or null. (Obsolete; use ICorDebugEval2::CreateValueForType instead.)|
|GetResult Method|Gets an interface pointer to an `ICorDebugValue` that contains the results of the evaluation.|
|GetThread Method|Gets an interface pointer to the "ICorDebugThread" where this evaluation is executing or will execute.|
|IsActive Method|Gets a value that indicates whether this `ICorDebugEval` object is currently executing.|
|NewArray Method|Allocates a new array of the specified element type and dimensions. (Obsolete; use ICorDebugEval2::NewParameterizedArray instead.)|
|NewObject Method|Allocates a new object instance and calls the specified constructor method. (Obsolete; use ICorDebugEval2::NewParameterizedObject instead.)|
|NewObjectNoConstructor Method|Allocates a new object instance of the specified type, without attempting to call a constructor method. (Obsolete; use ICorDebugEval2::NewParameterizedObjectNoConstructor instead.)|
|NewString Method|Allocates a new string object with the specified contents.|

## Remarks

An `ICorDebugEval` object is created in the context of a specific thread that is used to perform the evaluations. All objects and types used in a given evaluation must reside within the same application domain. That application domain need not be the same as the current application domain of the thread. Evaluations can be nested.

The evaluation's operations do not complete until the debugger calls ICorDebugController::Continue, and then receives an ICorDebugManagedCallback::EvalComplete callback. If you need to use the evaluation functionality without allowing other threads to run, suspend the threads by using either ICorDebugController::SetAllThreadsDebugState or ICorDebugController::Stop before calling ICorDebugController::Continue.

Because user code is running when the evaluation is in progress, any debug events can occur, including class loads and breakpoints. The debugger will receive callbacks, as normal, for these events. The state of the evaluation will be seen as part of the inspection of the normal program state. The stack chain will be a `CHAIN_FUNC_EVAL` chain (see the "CorDebugStepReason" enumeration and the ICorDebugChain::GetReason method). The full debugger API will continue to operate as normal.

If a deadlocked or infinite looping situation arises, the user code may never complete. In such a case, you must call ICorDebugEval::Abort before resuming the program.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
