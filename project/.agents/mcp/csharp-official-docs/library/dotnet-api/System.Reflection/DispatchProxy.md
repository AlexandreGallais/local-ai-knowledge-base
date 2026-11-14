---
title: "DispatchProxy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/DispatchProxy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DispatchProxy class

Namespace: `System.Reflection`

```csharp
public abstract class DispatchProxy
```

Provides a mechanism for instantiating proxy objects and handling their method dispatch.

To be added.

## DispatchProxy.DispatchProxy() constructor

```csharp
protected DispatchProxy ();
```

Initializes a new instance of the `DispatchProxy` class.

To be added.

## DispatchProxy.Create(Type, Type) method

```csharp
public static object Create (Type interfaceType, Type proxyType);
```

Creates an object instance that derives from class `proxyType`
and implements interface `interfaceType`.

Parameters:

- `interfaceType`: The interface the proxy should implement.
- `proxyType`: The base class to use for the proxy class.

Returns: An object instance that implements `interfaceType`.

Exceptions:

- `ArgumentNullException`: `interfaceType` or `proxyType` is `null`.
- `ArgumentException`: `interfaceType` is not an interface type.

-or-

`proxyType` is sealed or abstract, or does not inherit from the `DispatchProxy` type or does not have a parameterless constructor.

To be added.

## DispatchProxy.Create<T,TProxy>() method

```csharp
public static T Create<T,TProxy> () where TProxy : System.Reflection.DispatchProxy;
```

Creates an object instance that derives from class `TProxy`
and implements interface `T`.

Parameters:

- `T`: The interface the proxy should implement.
- `TProxy`: The base class to use for the proxy class.

Returns: An object instance that implements `T`.

Exceptions:

- `ArgumentException`: `T` is not an interface type, or `TProxy` is sealed or abstract or does not have a parameterless constructor.

To be added.

## DispatchProxy.Invoke(MethodInfo, Object[]) method

```csharp
protected abstract object? Invoke (System.Reflection.MethodInfo? targetMethod, object?[]? args);
```

Whenever any method on the generated proxy type is called, this method is invoked to dispatch control.

Parameters:

- `targetMethod`: The method the caller invoked.
- `args`: The arguments the caller passed to the method.

Returns: The object to return to the caller, or `null` for void methods.

To be added.
