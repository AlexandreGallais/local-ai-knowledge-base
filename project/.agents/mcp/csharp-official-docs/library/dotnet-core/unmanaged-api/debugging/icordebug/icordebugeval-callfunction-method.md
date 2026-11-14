---
title: "ICorDebugEval::CallFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugeval-callfunction-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugEval::CallFunction Method

Sets up a call to the specified function.

This method is obsolete. Use ICorDebugEval2::CallParameterizedFunction instead.

## Syntax

```cpp
HRESULT CallFunction (
    [in] ICorDebugFunction  *pFunction,
    [in] ULONG32            nArgs,
    [in, size_is(nArgs)] ICorDebugValue *ppArgs[]
);
```

## Parameters

`pFunction`\
[in] Pointer to an ICorDebugFunction object that specifies the function to be called.

`nArgs`\
[in] The number of arguments for the function.

`ppArgs`\
[in] An array of pointers, each of which points to an ICorDebugValue object that specifies an argument to be passed to the function.

## Remarks

If the function is virtual, `CallFunction` will perform virtual dispatch. If the function is in a different application domain, a transition will occur as long as all arguments are also in that application domain.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** 1.1, 1.0

## See also

- CallParameterizedFunction Method
