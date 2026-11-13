---
title: ".NET debugging (unmanaged API reference) (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET debugging (unmanaged API reference) (part 2 of 3)

## Interfaces

ICLRDebuggingLibraryProvider2 interface\
Includes the ProvideLibrary2 method, which allows the debugger to provide a path to a version-specific debugging library.

ICLRDebuggingLibraryProvider3 interface\
Includes callback methods that allow common language runtime version-specific debugging libraries to be located and loaded on demand for .NET regular and single-file applications.

ICorDebug interface\
Provides methods that allow developers to debug applications in the CLR environment.

ICorDebugAppDomain interface\
Provides methods for debugging application domains.

ICorDebugAppDomain2 interface\
Provides methods to work with arrays, pointers, function pointers, and ByRef types. This interface is an extension of the `ICorDebugAppDomain` interface.

ICorDebugAppDomain3 interface\
Provides methods to work with the Windows Runtime types in an application domain. This interface is an extension of the `ICorDebugAppDomain` and `ICorDebugAppDomain2` interfaces.

ICorDebugAppDomain4 interface\
Logically extends the ICorDebugAppDomain interface to get a managed object from a COM callable wrapper.

ICorDebugAppDomainEnum interface\
Provides a method that returns a specified number of `ICorDebugAppDomain` values starting at the next location in the enumeration.

ICorDebugArrayValue interface\
A subclass of `ICorDebugHeapValue` that represents a single-dimensional or multi-dimensional array.

ICorDebugAssembly interface\
Represents an assembly.

ICorDebugAssembly2 interface\
Represents an assembly. This interface is an extension of the `ICorDebugAssembly` interface.

ICorDebugAssembly3 interface\
Logically extends the ICorDebugAssembly interface to provide support for container assemblies and their contained assemblies. **Available on .NET Native only.**

ICorDebugAssemblyEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugAssembly` arrays.

ICorDebugBlockingObjectEnum interface\
Provides an enumerator for a list of CorDebugBlockingObject structures.

ICorDebugBoxValue interface\
A subclass of `ICorDebugHeapValue` that represents a boxed value class object.

ICorDebugBreakpoint interface\
Represents a breakpoint in a function or a watch point on a value.

ICorDebugBreakpointEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugBreakpoint` arrays.

ICorDebugChain interface\
Represents a segment of a physical or logical call stack.

ICorDebugChainEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugChain` arrays.

ICorDebugClass interface\
Represents a type, which can be either basic or complex (that is, user-defined). If the type is generic, `ICorDebugClass` represents the uninstantiated generic type.

ICorDebugClass2 interface\
Represents a generic class or a class with a method parameter of type `System.Type`. This interface extends `ICorDebugClass`.

ICorDebugCode interface\
Represents a segment of either common intermediate language (CIL) code or native code.

ICorDebugCode2 interface\
Provides methods that extend the capabilities of `ICorDebugCode`.

ICorDebugCode3 interface\
Provides a method that extends ICorDebugCode and ICorDebugCode2 to provide information about a managed return value.

ICorDebugCode4 interface\
Provides a method that enables a debugger to enumerate the local variables and arguments in a function.

ICorDebugCodeEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugCode` arrays.

ICorDebugComObjectValue interface\
Provides methods to retrieve cached interface objects.

ICorDebugContext interface\
Represents a context object. This interface has not been implemented yet.

ICorDebugController interface\
Represents a scope, either a `System.Diagnostics.Process` or an `System.AppDomain`, in which code execution context can be controlled.

ICorDebugDataTarget interface\
Provides a callback interface that provides access to a particular target process.

ICorDebugDataTarget2 interface\
Logically extends the ICorDebugDataTarget interface. **Available on .NET Native only.**

ICorDebugDataTarget3 interface\
Logically extends the ICorDebugDataTarget interface to provide information about loaded modules. **Available on .NET Native only.**

ICorDebugDebugEvent interface\
Defines the base interface from which all `ICorDebug` debug events derive. **Available on .NET Native only.**

ICorDebugEditAndContinueErrorInfo interface\
Obsolete. Do not use this interface.

ICorDebugEditAndContinueSnapshot interface\
Obsolete. Do not use this interface.

ICorDebugEnum interface\
Serves as the abstract base interface for debugging enumerators.

ICorDebugErrorInfoEnum interface\
Obsolete. Do not use this interface.

ICorDebugEval interface\
Provides methods to enable the debugger to execute code within the context of the code being debugged.

ICorDebugEval2 interface\
Extends `ICorDebugEval` to provide support for generic types.

ICorDebugExceptionDebugEvent interface\
Extends the ICorDebugDebugEvent interface to support exception events. **Available on .NET Native only.**

ICorDebugExceptionObjectCallStackEnum interface\
Provides an enumerator for call stack information that is embedded in an exception object.

ICorDebugExceptionObjectValue interface\
Extends the ICorDebugObjectValue interface to provide stack trace information from a managed exception object.

ICorDebugFrame interface\
Represents a frame on the current stack.

ICorDebugFrameEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugFrame` arrays.

ICorDebugFunction interface\
Represents a managed function or method.

ICorDebugFunction2 interface\
Logically extends `ICorDebugFunction` to provide support for Just My Code step-through debugging.

ICorDebugFunction3 interface\
Logically extends the ICorDebugFunction interface to provide access to code from a ReJIT request.

ICorDebugFunctionBreakpoint interface\
Extends `ICorDebugBreakpoint` to support breakpoints within functions.

ICorDebugGCReferenceEnum interface\
Provides an enumerator for objects that will be garbage-collected.

ICorDebugGenericValue interface\
A subclass of `ICorDebugValue` that applies to all values. This interface provides Get and Set methods for the value.

ICorDebugGuidToTypeEnum interface\
Provides an enumerator for an object that maps GUIDs and their corresponding `ICorDebugType` objects.

ICorDebugHandleValue interface\
A subclass of `ICorDebugReferenceValue` that represents a reference value to which the debugger has created a handle for garbage collection.

ICorDebugHeapEnum interface\
Provides an enumerator for objects on the managed heap.

ICorDebugHeapSegmentEnum interface\
Provides an enumerator for the memory regions of the managed heap.

ICorDebugHeapValue interface\
A subclass of `ICorDebugValue` that represents an object that has been collected by the CLR garbage collector.

ICorDebugHeapValue2 interface\
An extension of `ICorDebugHeapValue` that provides support for runtime handles.

ICorDebugHeapValue3 interface\
Exposes the monitor lock properties of objects.

ICorDebugILCode interface\
Represents a segment of intermediate language (IL) code.

ICorDebugILCode2 interface\
Logically extends the ICorDebugILCode interface to provide methods that return the token for a function'<example-value>'s instrumented intermediate language (IL) offsets to original method IL offsets.

ICorDebugILFrame interface\
Represents a stack frame of CIL code.

ICorDebugILFrame2 interface\
A logical extension of `ICorDebugILFrame`.

ICorDebugILFrame3 interface\
Provides a method that encapsulates the return value of a function.

ICorDebugILFrame4 interface\
Provides methods that allow you to access the local variables and code in a stack frame of intermediate language (IL) code. A parameter specifies whether the debugger has access to variables and code added in profiler ReJIT instrumentation.

ICorDebugInstanceFieldSymbol interface\
Represents the debug symbol information for an instance field. **Available on .NET Native only.**

ICorDebugInternalFrame interface\
Identifies frame types for the debugger.

ICorDebugInternalFrame2 interface\
Provides information about internal frames, including stack address and position in relation to ICorDebugFrame objects.

ICorDebugLoadedModule interface\
Provides information about a loaded module. **Available on .NET Native only.**

ICorDebugManagedCallback interface\
Provides methods to process debugger callbacks.

ICorDebugManagedCallback2 interface\
Provides methods to support debugger exception handling and managed debugging assistants (MDAs). `ICorDebugManagedCallback2` is a logical extension of `ICorDebugManagedCallback`.

ICorDebugManagedCallback3 interface\
Provides a callback method that indicates that an enabled custom debugger notification has been raised.

ICorDebugMDA interface\
Represents a managed debugging assistant (MDA) message.

ICorDebugMemoryBuffer interface\
Represents an in-memory buffer. **Available on .NET Native only.**

ICorDebugMergedAssemblyRecord interface\
Provides information about a merged assembly. **Available on .NET Native only.**

ICorDebugMetaDataLocator interface\
Provides metadata information to the debugger.

ICorDebugModule interface\
Represents a CLR module, which is either an executable or a dynamic-link library (DLL).

ICorDebugModule2 interface\
Serves as a logical extension to `ICorDebugModule`.

ICorDebugModule3 interface\
Creates a symbol reader for a dynamic module.

ICorDebugModule4 interface\
Provides a method that determines whether the module is loaded into memory in mapped/hydrated format.

ICorDebugModuleBreakpoint interface\
Extends `ICorDebugBreakpoint` to provide access to specific modules.

ICorDebugModuleDebugEvent interface\
Extends the ICorDebugDebugEvent interface to support module-level events. **Available on .NET Native only.**

ICorDebugModuleEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugModule` arrays.

ICorDebugMutableDataTarget interface\
Extends the ICorDebugDataTarget interface to support mutable data targets.

ICorDebugNativeFrame interface\
A specialized implementation of `ICorDebugFrame` used for native frames.

ICorDebugNativeFrame2 interface\
Provides methods that test for child and parent frame relationships.

ICorDebugObjectEnum interface\
Implements `ICorDebugEnum` methods, and enumerates arrays of objects by their relative virtual addresses (RVAs).

ICorDebugObjectValue interface\
A subclass of `ICorDebugValue` that represents a value that contains an object.

ICorDebugObjectValue2 interface\
Extends `ICorDebugObjectValue` to support inheritance and overrides.

ICorDebugProcess interface\
Represents a process that is executing managed code.

ICorDebugProcess2 interface\
A logical extension of `ICorDebugProcess`.

ICorDebugProcess3 interface\
Controls custom debugger notifications.

ICorDebugProcess4 interface\
Provides support for out of process execution control.

ICorDebugProcess5 interface\
Extends the ICorDebugProcess interface to support access to the managed heap, to provide information about garbage collection of managed objects, and to determine whether a debugger loads images from the application's local native image cache.

ICorDebugProcess6 interface\
Logically extends the ICorDebugProcess interface to enable features such as decoding managed debug events that are encoded in native exception debug events and virtual module splitting. **Available on .NET Native only.**

ICorDebugProcess7 interface\
Provides a method that configures the debugger to handle in-memory metadata updates in the target process.

ICorDebugProcess8 interface\
Logically extends the ICorDebugProcess interface to enable or disable certain types of ICorDebugManagedCallback2 exception callbacks.

ICorDebugProcess11 interface\
Provides a method that enumerates ranges of native memory that are used by the .NET runtime to store internal data structures that describe .NET types and methods. The information returned is the same information that would be shown by using the SOS `eeheap -loader` command.

ICorDebugProcessEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugProcess` arrays.

ICorDebugReferenceValue interface\
A subclass of `ICorDebugValue` that supports reference types.

ICorDebugRegisterSet interface\
Represents the set of registers available on the machine that is currently executing code.

ICorDebugRegisterSet2 interface\
Extends the capabilities of `ICorDebugRegisterSet` for hardware platforms that have more than 64 registers.

ICorDebugRemote interface\
Provides the ability to launch or attach a managed debugger to a remote target process.

ICorDebugRemoteTarget interface\
Provides methods that enable you to debug Silverlight-based applications in the CLR environment.

ICorDebugRuntimeUnwindableFrame interface\
Provides support for unmanaged methods that require the common language runtime (CLR) to unwind a frame.

ICorDebugStackWalk interface\
Provides methods for getting the managed methods, or frames, on a thread’s stack.

ICorDebugStaticFieldSymbol interface\
Represents the debug symbol information for a static field. **Available on .NET Native only.**

ICorDebugStepper interface\
Represents a step in code execution that is performed by a debugger, serves as an identifier between the issuance and completion of a command, and provides a way to cancel a step.

ICorDebugStepper2 interface\
Provides support for Just My Code (JMC) debugging.

ICorDebugStepperEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugStepper` arrays.

ICorDebugStringValue interface\
A subclass of `ICorDebugHeapValue` that applies to string values.

ICorDebugSymbolProvider interface\
Provides methods that can be used to retrieve debug symbol information. **Available on .NET Native only.**

ICorDebugSymbolProvider2 interface\
Logically extends the ICorDebugSymbolProvider interface to retrieve additional debug symbol information. **Available on .NET Native only.**

ICorDebugThread interface\
Represents a thread in a process. The lifetime of an `ICorDebugThread` instance is the same as the lifetime of the thread it represents.

ICorDebugThread2 interface\
Serves as a logical extension to `ICorDebugThread`.

ICorDebugThread3 interface\
Provides the entry point to the ICorDebugStackWalk and corresponding interfaces.

ICorDebugThread4 interface\
Provides thread blocking information.

ICorDebugThreadEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugThread` arrays.

ICorDebugType interface\
Represents a type, which can be either basic or complex (that is, user-defined). If the type is generic, `ICorDebugType` represents the instantiated generic type.

ICorDebugType2 interface\
Extends the ICorDebugType interface to retrieve the type identifier  of a base type or complex (user-defined) type.
