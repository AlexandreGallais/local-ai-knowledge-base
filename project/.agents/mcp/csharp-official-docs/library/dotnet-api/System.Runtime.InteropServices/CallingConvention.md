---
title: "CallingConvention enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CallingConvention.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallingConvention enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CallingConvention
```

Specifies the calling convention required to call methods implemented in unmanaged code.

#### Remarks
Always use the `CallingConvention` enumeration rather than the `CALLCONV` enumeration to specify a calling convention in managed code. The latter exists only for the sake of COM definitions. The `CallingConvention` enumeration is used by `DllImportAttribute` and several classes in `Emit` to dynamically emit platform invoke signatures.

#### Examples
The following example demonstrates how to apply the `Cdecl` calling convention, which you must use because the stack is cleaned up by the caller.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/CallingConvention/Overview/callingconv.cs._

## CallingConvention.Cdecl field

```csharp
Cdecl
```

The caller cleans the stack. This enables calling functions with `varargs`, which makes it appropriate to use for methods that accept a variable number of parameters, such as `Printf`.

## CallingConvention.FastCall field

```csharp
FastCall
```

This calling convention is not supported.

## CallingConvention.StdCall field

```csharp
StdCall
```

The callee cleans the stack.

## CallingConvention.ThisCall field

```csharp
ThisCall
```

The first parameter is the `this` pointer and is stored in register ECX. Other parameters are pushed on the stack. This calling convention is used to call methods on classes exported from an unmanaged DLL.

## CallingConvention.Winapi field

```csharp
Winapi
```

This member is not actually a calling convention, but instead uses the default platform calling convention.
