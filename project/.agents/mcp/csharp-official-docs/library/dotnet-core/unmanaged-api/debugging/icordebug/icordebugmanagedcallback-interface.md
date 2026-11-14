---
title: "ICorDebugManagedCallback Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback Interface

Provides methods to process debugger callbacks.

## Methods

|Method|Description|
|------------|-----------------|
|Break Method|Notifies the debugger when a `System.Reflection.Emit.OpCodes.Break` instruction in the code stream is executed.|
|Breakpoint Method|Notifies the debugger when a breakpoint is encountered.|
|BreakpointSetError Method|Notifies the debugger that the common language runtime (CLR) was unable to accurately bind a breakpoint that was set before a function was just-in-time (JIT) compiled.|
|ControlCTrap Method|Notifies the debugger that a CTRL+C is trapped in the process being debugged.|
|CreateAppDomain Method|Notifies the debugger that an application domain has been created.|
|CreateProcess Method|Notifies the debugger when a process has been attached or started for the first time.|
|CreateThread Method|Notifies the debugger that a thread has started executing managed code.|
|DebuggerError Method|Notifies the debugger that an error has occurred while attempting to handle an event from the CLR.|
|EditAndContinueRemap Method|Deprecated. Notifies the debugger that a remap event has been sent to the IDE.|
|EvalComplete Method|Notifies the debugger that an evaluation has been completed.|
|EvalException Method|Notifies the debugger that an evaluation has been terminated with an unhandled exception.|
|Exception Method|Notifies the debugger that an exception has been thrown from managed code.|
|ExitAppDomain Method|Notifies the debugger that an application domain has exited.|
|ExitProcess Method|Notifies the debugger that a process has exited.|
|ExitThread Method|Notifies the debugger that a thread that was executing managed code has exited.|
|LoadAssembly Method|Notifies the debugger that a CLR assembly has been successfully loaded.|
|LoadClass Method|Notifies the debugger that a class has been loaded.|
|LoadModule Method|Notifies the debugger that a CLR module has been successfully loaded.|
|LogMessage Method|Notifies the debugger that a CLR managed thread has called a method in the `System.Diagnostics.EventLog` class to log an event.|
|LogSwitch Method|Notifies the debugger that a CLR managed thread has called a method in the `System.Diagnostics.Switch` class to create, modify, or delete a debugging/tracing switch.|
|NameChange Method|Notifies the debugger that the name of either an application domain or thread has changed.|
|StepComplete Method|Notifies the debugger that a step has completed.|
|UnloadAssembly Method|Notifies the debugger that a CLR assembly has been unloaded.|
|UnloadClass Method|Notifies the debugger that a class is being unloaded.|
|UnloadModule Method|Notifies the debugger that a CLR module (DLL) has been unloaded.|
|UpdateModuleSymbols Method|Notifies the debugger that the symbols for a CLR module have changed.|

## Remarks

All callbacks are serialized, called in the same thread, and called with the process in the synchronized state.

Each callback implementation must call ICorDebugController::Continue to resume execution. If `ICorDebugController::Continue` is not called before the callback returns, the process will remain stopped and no more event callbacks will occur until `ICorDebugController::Continue` is called.

A debugger must implement ICorDebugManagedCallback2. An instance of `ICorDebugManagedCallback` or `ICorDebugManagedCallback2` is passed as the callback object to ICorDebug::SetManagedHandler.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
- ICorDebugManagedCallback2 Interface
