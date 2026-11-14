---
title: "TypeDescriptionProvider class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptionProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptionProvider class (part 2 of 2)

## TypeDescriptionProvider.GetTypeDescriptorFromRegisteredType(Object) method

```csharp
public System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptorFromRegisteredType (object instance);
```

Returns a custom type descriptor for the given type or object.

Parameters:

- `instance`: An instance of the type. Can be `null` if no instance was passed to the `TypeDescriptor`.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

The method should return a custom type descriptor for the object. If the method is not interested in providing type information for the object it should return base.

## TypeDescriptionProvider.GetTypeDescriptorFromRegisteredType(Type) method

```csharp
public System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptorFromRegisteredType (Type objectType);
```

Returns a custom type descriptor for the given type or object.

Parameters:

- `objectType`: The type of object for which to retrieve the type descriptor.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

The method should return a custom type descriptor for the object. If the method is not interested in providing type information for the object it should return base.

## TypeDescriptionProvider.GetTypeDescriptorFromRegisteredType(Type, Object) method

```csharp
public virtual System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptorFromRegisteredType (Type objectType, object? instance);
```

Returns a custom type descriptor for the given type or object.

Parameters:

- `objectType`: The type of object for which to retrieve the type descriptor.
- `instance`: An instance of the type. Can be `null` if no instance was passed to the `TypeDescriptor`.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

The objectType parameter is always valid, but the instance parameter may be `null` if no instance was passed to TypeDescriptor. The method should return a custom type descriptor for the object. If the method is not interested in providing type information for the object it should return base.

This method is prototyped as virtual, and by default returns a custom type descriptor that returns empty collections for all values if no parent provider was passed. If a parent provider was passed, this method will invoke the parent provider's GetTypeDescriptorFromRegisteredType method.

## TypeDescriptionProvider.IsRegisteredType(Type) method

```csharp
public virtual bool IsRegisteredType (Type type);
```

Determines whether the type was registered with its provider through `TypeDescriptor.RegisterType<T>`.

Parameters:

- `type`: The type to check if it was registered.

Returns: `true` if `type` is registered; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

To be added.

## TypeDescriptionProvider.IsSupportedType(Type) method

```csharp
public virtual bool IsSupportedType (Type type);
```

Gets a value that indicates whether the specified type is compatible with the type description and its chain of type description providers.

Parameters:

- `type`: The type to test for compatibility.

Returns: `true` if `type` is compatible with the type description and its chain of type description providers; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

To be added.

## TypeDescriptionProvider.RegisterType<T>() method

```csharp
public virtual void RegisterType<T> ();
```

Registers the type so it can be used by reflection-based providers in trimmed applications.

Parameters:

- `T`: The type to register.

To be added.
