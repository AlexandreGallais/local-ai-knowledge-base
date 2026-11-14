---
title: "ActivatorUtilities class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ActivatorUtilities.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ActivatorUtilities class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ActivatorUtilities
```

Helper code for the various activator services.

To be added.

## ActivatorUtilities.CreateFactory(Type, Type[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ObjectFactory CreateFactory (Type instanceType, Type[] argumentTypes);
```

Creates a delegate that will instantiate a type with constructor arguments provided directly
and/or from an `IServiceProvider`.

Parameters:

- `instanceType`: The type to activate.
- `argumentTypes`: The types of objects, in order, that will be passed to the returned function as its second parameter.

Returns: A factory that will instantiate instanceType using an `IServiceProvider`
and an argument array containing objects matching the types defined in argumentTypes.

To be added.

## ActivatorUtilities.CreateFactory<T>(Type[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ObjectFactory<T> CreateFactory<T> (Type[] argumentTypes);
```

Creates a delegate that will instantiate a type with constructor arguments provided directly
and/or from an `IServiceProvider`.

Parameters:

- `T`: The type to activate.
- `argumentTypes`: The types of objects, in order, that will be passed to the returned function as its second parameter.

Returns: A factory that will instantiate type `T` using an `IServiceProvider`
and an argument array containing objects matching the types defined in `argumentTypes`.

To be added.

## ActivatorUtilities.CreateInstance(IServiceProvider, Type, Object[]) method

```csharp
public static object CreateInstance (IServiceProvider provider, Type instanceType, params object[] parameters);
```

Instantiates a type with constructor arguments provided directly and/or from an `IServiceProvider`.

Parameters:

- `provider`: The service provider used to resolve dependencies.
- `instanceType`: The type to activate.
- `parameters`: Constructor arguments not provided by the `provider`.

Returns: An activated object of type instanceType.

Exceptions:

- `ArgumentNullException`: .NET 8 and later only: `provider` is `null`.

To be added.

## ActivatorUtilities.CreateInstance<T>(IServiceProvider, Object[]) method

```csharp
public static T CreateInstance<T> (IServiceProvider provider, params object[] parameters);
```

Instantiates a type with constructor arguments provided directly and/or from an `IServiceProvider`.

Parameters:

- `T`: The type to activate.
- `provider`: The service provider used to resolve dependencies.
- `parameters`: Constructor arguments not provided by `provider`.

Returns: An activated object of type `T`.

Exceptions:

- `ArgumentNullException`: .NET 8 and later only: `provider` is `null`.

To be added.

## ActivatorUtilities.GetServiceOrCreateInstance(IServiceProvider, Type) method

```csharp
public static object GetServiceOrCreateInstance (IServiceProvider provider, Type type);
```

Retrieve an instance of the given type from the service provider. If one is not found then instantiate it directly.

Parameters:

- `provider`: The service provider.
- `type`: The type of the service.

Returns: The resolved service or created instance.

To be added.

## ActivatorUtilities.GetServiceOrCreateInstance<T>(IServiceProvider) method

```csharp
public static T GetServiceOrCreateInstance<T> (IServiceProvider provider);
```

Retrieve an instance of the given type from the service provider. If one is not found then instantiate it directly.

Parameters:

- `T`: The type of the service.
- `provider`: The service provider used to resolve dependencies.

Returns: The resolved service or created instance.

To be added.
