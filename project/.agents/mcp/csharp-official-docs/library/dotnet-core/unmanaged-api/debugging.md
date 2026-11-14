---
title: ".NET debugging (unmanaged API reference) (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET debugging (unmanaged API reference)

The articles in this section describe the unmanaged APIs that the common language runtime (CLR) provides to support debugging .NET applications that are running on Windows, Linux, or macOS operating systems.

These articles describe APIs that were introduced in .NET Core 2.0 or later, or were introduced in .NET Framework but can be used on .NET (Core). For .NET Framework-specific unmanaged APIs, see .NET Framework debugging.

For mobile apps that use CoreCLR, see Initialize a custom debugger on mobile platforms.

## Enumerations

CorDebugBlockingReason enumeration\
Specifies the reasons why a thread may become blocked on a given object.

CorDebugChainReason enumeration\
Indicates the reason or reasons for the initiation of a call chain.

CorDebugCodeInvokeKind enumeration\
Describes how an exported function invokes managed code.

CorDebugCodeInvokePurpose enumeration\
Describes why an exported function calls managed code.

CorDebugCreateProcessFlags enumeration\
Provides additional debugging options that can be used in a call to the ICorDebug::CreateProcess method.

CorDebugDebugEventKind enumeration\
Indicates the type of event whose information is decoded by the DecodeEvent method.

CorDebugDecodeEventFlagsWindows enumeration\
Provides additional information about debug events on the Windows platform.

CorDebugExceptionCallbackType enumeration\
Indicates the type of callback that is made from an ICorDebugManagedCallback2::Exception event.

CorDebugExceptionFlags enumeration\
Provides additional information about an exception.

CorDebugExceptionUnwindCallbackType enumeration\
Indicates the event that is being signaled by the callback during the unwind phase.

CorDebugGCType enumeration\
Indicates whether the garbage collector is running on a workstation or a server.

CorDebugGenerationTypes enumeration\
Specifies the generation of a region of memory on the managed heap.

CorDebugHandleType enumeration\
Indicates the handle type.

CorDebugIlToNativeMappingTypes enumeration\
Indicates whether a particular range of native instructions corresponds to a special code region.

CorDebugIntercept enumeration\
Indicates the types of code that can be stepped into.

CorDebugInterfaceVersion enumeration\
Specifies either a version of the .NET Framework, or the version of the .NET Framework in which an interface was introduced.

CorDebugInternalFrameType enumeration\
Identifies the type of stack frame.

CorDebugJITCompilerFlags enumeration\
Contains values that influence the behavior of the managed just-in-time (JIT) compiler.

CorDebugMappingResult enumeration\
Provides the details of how the value of the instruction pointer (IP) was obtained.

CorDebugMDAFlags enumeration\
Specifies the status of the thread on which the managed debugging assistant (MDA) is fired.

CorDebugNGenPolicy enumeration\
Provides a value that determines whether a debugger loads native (NGen) images from the native image cache.

CorDebugPlatform enumeration\
Provides target platform values that are used by the ICorDebugDataTarget::GetPlatform method.

CorDebugRecordFormat enumeration\
Describes the format of the data in a byte array that contains information about a native exception debug event.

CorDebugRegister enumeration\
Specifies the registers associated with a given processor architecture.

CorDebugSetContextFlag enumeration\
Indicates whether the context is from the active (or leaf) frame on the stack or has been computed by unwinding from another frame.

CorDebugStateChange enumeration\
Describes the amount of cached data that must be discarded based on changes to the process.

CorDebugStepReason enumeration\
Indicates the outcome of an individual step.

CorDebugThreadState enumeration\
Specifies the state of a thread for debugging.

CorDebugUnmappedStop enumeration\
Specifies the type of unmapped code that can trigger a halt in code execution by the stepper.

CorDebugUserState enumeration\
Indicates the user state of a thread.

CorGCReferenceType enumeration\
Identifies the source of an object to be garbage-collected.

COR_PUB_ENUMPROCESS enumeration\
Identifies the type of process to be enumerated.

ILCodeKind enumeration\
Provides values that specify whether the debugger is able to access local variables or code added in profiler ReJIT instrumentation.

LIBRARY_PROVIDER_INDEX_TYPE enumeration\
The type of index information passed to the library provider is either the identity of the requested module or of the runtime (coreclr) module.

LoggingLevelEnum enumeration\
Indicates the severity level of a descriptive message that is written to the event log when a managed thread logs an event.

LogSwitchCallReason enumeration\
Indicates the operation that was performed on a debugging/tracing switch.

VariableLocationType enumeration\
Indicates the native location type of a variable.

WriteableMetadataUpdateMode enumeration\
Provides values that specify whether in-memory updates to metadata are visible to a debugger.

## Functions

CloseCLREnumeration function\
Closes any valid CLR continue-startup events located in an array of handles returned by the EnumerateCLRs function, and frees the memory for the handle and string path arrays.

CloseResumeHandle function\
Closes the handle returned by the CreateProcessForLaunch function.

CLRCreateInstance function\
Provides the ICLRDebugging interface.

CreateDebuggingInterfaceFromVersion function\
Accepts a CLR version string returned from the CreateVersionStringFromModule function function, and returns a corresponding debugger interface.

CreateDebuggingInterfaceFromVersionEx function\
Accepts a CLR version string returned from the CreateVersionStringFromModule function function, and returns a corresponding debugger interface.

CreateDebuggingInterfaceFromVersion2 function\
Accepts a CLR version string returned from the CreateVersionStringFromModule functionfunction, and returns a corresponding debugger interface.

CreateDebuggingInterfaceFromVersion3 function\
Accepts a CLR version string returned from the CreateVersionStringFromModule function function, and returns a corresponding debugger interface.

CreateProcessForLaunch function\
A subset of the Windows CreateProcess that can be supported cross-platform.

CreateVersionStringFromModule function\
Creates a version string from a CLR path in a target process.

EnumerateCLRs function\
Provides a mechanism for enumerating the CLRs in a process.

GetStartupNotificationEvent function\
Creates or opens an event handle that will be signaled upon by any common language runtime (CLR) that is loading in the specified target process.

RegisterForRuntimeStartup function\
Executes the callback when the .NET runtime starts in the specified process.

RegisterForRuntimeStartupEx function\
Executes the callback when the .NET runtime starts in the specified process.

RegisterForRuntimeStartup3 function\
Executes the callback when the .NET runtime starts in the specified process.

ResumeProcess function\
Resumes the process using the resume handle returned by the CreateProcessForLaunch function.

UnregisterForRuntimeStartup function\
Stops/cancels runtime startup notification.

## Function pointers

PSTARTUP_CALLBACK function pointer\
Points to a function that's called when the .NET runtime has started for the RegisterForRuntimeStartup API.
