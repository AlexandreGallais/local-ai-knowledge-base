---
title: "ICorDebugFunction2::GetVersionNumber Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-getversionnumber-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction2::GetVersionNumber Method

Gets the Edit and Continue version of this function.

## Syntax

```cpp
HRESULT GetVersionNumber (
    [out] ULONG32   *pnVersion
);
```

## Parameters

 `pnVersion`
 [out] A pointer to an integer that is the version number of the function that is represented by this ICorDebugFunction2 object.

## Remarks

The runtime keeps track of the number of edits that have taken place to each module during a debug session. The version number of a function is one more than the number of the edit that introduced the function. The function's original version is version 1. The number is incremented for a module every time ICorDebugModule2::ApplyChanges is called on that module. Thus, if a function’s body was replaced in the first and third call to `ICorDebugModule2::ApplyChanges`, `GetVersionNumber` may return version 1, 2, or 4 for that function, but not version 3. (That function would have no version 3.)

The version number is tracked separately for each module. So, if you perform four edits on Module 1, and none on Module 2, your next edit on Module 1 will assign a version number of 6 to all the edited functions in Module 1. If the same edit touches Module 2, the functions in Module 2 will get a version number of 2.

The version number obtained by the `GetVersionNumber` method may be lower than that obtained by ICorDebugFunction::GetCurrentVersionNumber.

The ICorDebugCode::GetVersionNumber method performs the same operation as `ICorDebugFunction2::GetVersionNumber`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
