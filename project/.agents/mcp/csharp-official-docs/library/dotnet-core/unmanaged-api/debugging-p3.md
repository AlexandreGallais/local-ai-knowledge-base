---
title: ".NET debugging (unmanaged API reference) (part 3 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET debugging (unmanaged API reference) (part 3 of 3)

ICorDebugTypeEnum interface\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugType` arrays.

ICorDebugUnmanagedCallback interface\
Provides notification of native events that are not directly related to the CLR.

ICorDebugValue\
Represents a read or write value in the process being debugged.

ICorDebugValue2\
Extends `ICorDebugValue` to provide support for `ICorDebugType`.

ICorDebugValue3 interface\
Extends the "ICorDebugValue" and "ICorDebugValue2" interfaces to provide support for arrays that are larger than 2 GB.

ICorDebugValueBreakpoint\
Extends `ICorDebugBreakpoint` to provide access to specific values.

ICorDebugValueEnum\
Implements `ICorDebugEnum` methods, and enumerates `ICorDebugValue` arrays.

ICorDebugVariableHome interface\
Represents a local variable or argument of a function.

ICorDebugVariableHomeEnum interface\
Provides an enumerator to the local variables and arguments in a function.

ICorDebugVariableSymbol interface\
Retrieves the debug symbol information for a variable. **Available on .NET Native only.**

ICorDebugVirtualUnwinder interface\
Provides methods to help in stack unwinding. **Available on .NET Native only.**

## Structures

CodeChunkInfo Structure\
Represents a single chunk of code in memory.

COR_ACTIVE_FUNCTION\
Contains information about the functions that are currently active in a thread's frames.

COR_ARRAY_LAYOUT Structure\
Provides information about the layout of an array object in memory.

COR_DEBUG_IL_TO_NATIVE_MAP\
Contains the offsets that are used to map common intermediate language (CIL) code to native code.

COR_DEBUG_STEP_RANGE\
Contains the offset information for a range of code.

COR_FIELD Structure\
Provides information about a field in an object.

COR_GC_REFERENCE Structure\
Contains information about an object that is to be garbage-collected.

COR_HEAPINFO Structure\
Provides general information about the garbage collection heap, including whether it is enumerable.

COR_HEAPOBJECT Structure\
Provides information about an object on the managed heap.

COR_IL_MAP\
Specifies changes in the relative offset of a function.

COR_SEGMENT Structure\
Contains information about a region of memory in the managed heap.

COR_TYPEID Structure\
Contains a type identifier.

COR_TYPE_LAYOUT Structure\
Provides information about the layout of an object in memory.

COR_VERSION\
Stores the standard four-part version number of the common language runtime.

CorDebugBlockingObject Structure\
Defines an object that is blocking a thread and the reason why the thread is blocked.

CorDebugEHClause Structure\
Represents an exception handling (EH) clause for a given piece of intermediate language (IL).

CorDebugExceptionObjectStackFrame Structure\
Represents stack frame information from an exception object.

CorDebugGuidToTypeMapping Structure\
Maps a Windows Runtime GUID to its corresponding `ICorDebugType` object.
