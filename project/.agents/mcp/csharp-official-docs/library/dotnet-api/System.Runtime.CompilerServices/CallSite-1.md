---
title: "CallSite<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/CallSite`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CallSite<T> class

Namespace: `System.Runtime.CompilerServices`

```csharp
public class CallSite<T> : System.Runtime.CompilerServices.CallSite where T : class
```

Dynamic site type.

Parameters:

- `T`: The delegate type.

To be added.

## CallSite<T>.Update property

```csharp
public T Update { get; }
```

The update delegate. Called when the dynamic site experiences cache miss.

Returns: The update delegate.

To be added.

## CallSite<T>.Create(CallSiteBinder) method

```csharp
public static System.Runtime.CompilerServices.CallSite<T> Create (System.Runtime.CompilerServices.CallSiteBinder binder);
```

Creates an instance of the dynamic call site, initialized with the binder responsible for the runtime binding of the dynamic operations at this call site.

Parameters:

- `binder`: The binder responsible for the runtime binding of the dynamic operations at this call site.

Returns: The new instance of dynamic call site.

To be added.

## CallSite<T>.Target field

```csharp
public T Target;
```

The Level 0 cache - a delegate specialized based on the site history.

To be added.
