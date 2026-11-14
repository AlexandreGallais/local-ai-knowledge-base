---
title: "ICorDebugVariableHome Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugVariableHome Interface

Represents a local variable or argument of a function.

## Methods

|Method|Description|
|------------|-----------------|
|GetArgumentIndex Method|Gets the index of a function argument.|
|GetCode Method|Gets the "ICorDebugCode" instance that contains this `ICorDebugVariableHome` object.|
|GetLiveRange Method|Gets the native range over which this variable is live.|
|GetLocationType Method|Gets the type of the variable's native location.|
|GetOffset Method|Gets the offset from the base register for a variable.|
|GetRegister Method|Gets the register that contains a variable with a location type of `VLT_REGISTER`, and the base register for a variable with a location type of `VLT_REGISTER_RELATIVE`.|
|GetSlotIndex Method|Gets the managed slot-index of a local variable.|

## Example

The following code fragment uses the ICorDebugCode4 object named `pCode4`.

```cpp
ICorDebugCode4 *pCode4 = NULL;
pCode->QueryInterface(IID_ICorDebugCode4, &pCode4);

ICorDebugVariableEnum *pVarLocEnum = NULL;
pCode4->EnumerateVariableHomes(&pVarLocEnum);

// retrieve local variables and arguments
ULONG celt = 0;
pVarLocEnum->GetCount(&celt);
ICorDebugVariableHome **homes = new ICorDebugVariableHome *[celt];
ULONG celtFetched = 0;
pVarLocEnum->Next(celt, homes, &celtFetched);

for (int i = 0; i < celtFetched; i++)
{
    VariableLocationType locType = VLT_INVALID;
    homes[i].GetLocationType(&locType);
    switch (locType)
    {
    case VLT_REGISTER:
        CorDebugRegister register = 0;
        locals[i].GetRegister(&register);
        // now we know which register it is in
        break;
    case VLT_REGISTER_RELATIVE:
        CorDebugRegister baseRegister = 0;
        LONG offset = 0;
        locals[i].GetRegister(&register);
        locals[i].GetOffset(&offset);
        // now we know the register-relative offset
        break;
    case VLT_INVALID:
        // handle case where we can't access the location
        break;
    }
}
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHomeEnum Interface
