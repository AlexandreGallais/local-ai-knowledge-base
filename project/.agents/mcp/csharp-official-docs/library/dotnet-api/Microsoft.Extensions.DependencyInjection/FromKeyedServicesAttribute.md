---
title: "FromKeyedServicesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/FromKeyedServicesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FromKeyedServicesAttribute class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public class FromKeyedServicesAttribute : Attribute
```

Indicates that the parameter should be bound using the keyed service registered with the specified key.

To be added.

## FromKeyedServicesAttribute.FromKeyedServicesAttribute() constructor

```csharp
public FromKeyedServicesAttribute ();
```

Creates a new `FromKeyedServicesAttribute` instance with `FromKeyedServicesAttribute.LookupMode` set to `ServiceKeyLookupMode.InheritKey`.

To be added.

## FromKeyedServicesAttribute.FromKeyedServicesAttribute(Object) constructor

```csharp
public FromKeyedServicesAttribute (object? key);
```

Creates a new `FromKeyedServicesAttribute` instance.

Parameters:

- `key`: The key of the keyed service to bind to.

To be added.

## FromKeyedServicesAttribute.Key <example-value>

```csharp
public object? Key { get; }
```

The key of the keyed service to bind to.

Returns: To be added.

A `null` value with indicates there is not a key and just the parameter type is used to resolve the service.
This is useful for DI implementations that require an explict way to declare that the parameter should be resolved for unkeyed services.
A `null` value is also used along with `FromKeyedServicesAttribute.LookupMode` set to `ServiceKeyLookupMode.InheritKey` to indicate that the key <example-value> be inherited from the parent scope.

## FromKeyedServicesAttribute.LookupMode property

```csharp
public Microsoft.Extensions.DependencyInjection.ServiceKeyLookupMode LookupMode { get; }
```

Gets the mode used to look up the service key.

Returns: To be added.

To be added.
