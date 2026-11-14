---
title: "CallSite class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallSite.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallSite class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class CallSite
```

A dynamic call site base class. This type is used as a parameter type to the dynamic site targets.

To be added.

## CallSite.Binder property

```csharp
public System.Runtime.CompilerServices.CallSiteBinder? Binder { get; }
```

Class responsible for binding dynamic operations on the dynamic site.

Returns: The `CallSiteBinder` object responsible for binding dynamic operations.

To be added.

## CallSite.Create(Type, CallSiteBinder) method

```csharp
public static System.Runtime.CompilerServices.CallSite Create (Type delegateType, System.Runtime.CompilerServices.CallSiteBinder binder);
```

Creates a call site with the given delegate type and binder.

Parameters:

- `delegateType`: The call site delegate type.
- `binder`: The call site binder.

Returns: The new call site.

To be added.
