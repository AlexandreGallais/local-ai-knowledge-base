---
title: "TypeDescriptionProvider class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptionProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptionProvider class

Namespace: `System.ComponentModel`

```csharp
public abstract class TypeDescriptionProvider
```

Provides supplemental metadata to the `TypeDescriptor`.

#### Remarks
The `TypeDescriptionProvider` class dynamically extends the type information associated with a type or object by adding, modifying, or hiding characteristics such as attributes, properties, and events. There can be multiple type description provider classes that offer metadata to a single `TypeDescriptor`.

There are two ways to associate a `TypeDescriptionProvider` with a `TypeDescriptor`:

- At design time, when the target class can be assigned the appropriate `TypeDescriptionProviderAttribute` tag.

- At run time, when one of the `TypeDescriptor.AddProvider` methods of the `TypeDescriptor` class can be called. These overloaded methods require either the target object or its class type.

The `TypeDescriptionProvider` class relies on a parent object of the same type, supplied during construction. This allows classes that derive from `CustomTypeDescriptor` to selectively override methods.

Instances of `TypeDescriptionProvider` are only built upon demand, minimizing the impact of custom type information on performance.

## TypeDescriptionProvider.TypeDescriptionProvider() constructor

```csharp
protected TypeDescriptionProvider ();
```

Initializes a new instance of the `TypeDescriptionProvider` class.

#### Remarks
This constructor is equivalent to calling the other `%23ctor` constructor with a parameter value that is `null`.

## TypeDescriptionProvider.TypeDescriptionProvider(TypeDescriptionProvider) constructor

```csharp
protected TypeDescriptionProvider (System.ComponentModel.TypeDescriptionProvider parent);
```

Initializes a new instance of the `TypeDescriptionProvider` class using a parent type description provider.

Parameters:

- `parent`: The parent type description provider.

#### Remarks
If the `parent` parameter is `null`, all `TypeDescriptionProvider` methods will return default values. Otherwise, all `TypeDescriptionProvider` methods will delegate to the methods of `parent`.

The following table shows the default return values for `TypeDescriptionProvider` methods.

|Method|Default return value|
|------------|--------------------------|
|`TypeDescriptionProvider.GetCache`|`null`|
|`TypeDescriptionProvider.CreateInstance`|A newly created object through a call to the `Activator.CreateInstance` method.|
|`TypeDescriptionProvider.GetExtendedTypeDescriptor`|A default instance of a `CustomTypeDescriptor` class.|
|`TypeDescriptionProvider.GetTypeDescriptor`|A default instance of a `CustomTypeDescriptor` class.|
|`TypeDescriptionProvider.GetReflectionType`|The `objectType` first parameter.|

## TypeDescriptionProvider.RequireRegisteredTypes property

```csharp
public virtual bool? RequireRegisteredTypes { get; }
```

Gets a value that indicates whether the provider uses reflection and requires types to be registered through `TypeDescriptor.RegisterType<T>` to support trimmed applications.

Returns: To be added.

For backwards compatibility, this is typically only enforced when calling members that have  "FromRegisteredType" suffix.

## TypeDescriptionProvider.CreateInstance(IServiceProvider, Type, Type[], Object[]) method

```csharp
public virtual object? CreateInstance (IServiceProvider? provider, Type objectType, Type[]? argTypes, object?[]? args);
```

Creates an object that can substitute for another data type.

Parameters:

- `provider`: An optional service provider.
- `objectType`: The type of object to create. This parameter is never `null`.
- `argTypes`: An optional array of types that represent the parameter types to be passed to the object's constructor. This array can be `null` or of zero length.
- `args`: An optional array of parameter values to pass to the object's constructor.

Returns: The substitute `Object`.

#### Remarks
The `IServiceProvider` specified by the `provider` parameter is passed in by the `TypeDescriptor.CreateInstance` method of the `TypeDescriptor` class. If `provider` is not `null`, the service provider can be used by the type description provider to obtain additional context about the creation call.

The `TypeDescriptionProvider.CreateInstance` method is `virtual` and, by default, returns the result of the `Activator.CreateInstance` method if `parent` is `null`. If `parent` is not `null`, this method will invoke the `TypeDescriptionProvider.CreateInstance` method of the parent provider.

## TypeDescriptionProvider.GetCache(Object) method

```csharp
public virtual System.Collections.IDictionary? GetCache (object instance);
```

Gets a per-object cache, accessed as an `IDictionary` of key/value pairs.

Parameters:

- `instance`: The object for which to get the cache.

Returns: An `IDictionary` if the provided object supports caching; otherwise, `null`.

#### Remarks
A `TypeDescriptor` may need to perform complex operations on collections of metadata. Because types are not unloaded for the life of a domain, the `TypeDescriptor` class will automatically cache the results of these operations based on type. However, some operations use live object instances. These operations cannot be cached within the `TypeDescriptor` class because caching them would prevent the object from being garbage collected. Instead, the `TypeDescriptor` class allows for a per-object cache, accessed as an `IDictionary` of key/value pairs, to exist on an object. The `TypeDescriptionProvider.GetCache` method returns an instance of this cache. The `TypeDescriptionProvider.GetCache` method will return `null` if there is no supported cache for an object.

The default `TypeDescriptionProvider` used by `TypeDescriptor` examines the object to see if it is a sited component that implements the `IDictionaryService` interface. If the object is, it uses the dictionary service to store the object's cache. Otherwise, the object it returns `null`. Other type description providers may provide their own implementation here. For example, dependency objects can just attach a property of type `IDictionary`.

## TypeDescriptionProvider.GetExtendedTypeDescriptor(Object) method

```csharp
public virtual System.ComponentModel.ICustomTypeDescriptor GetExtendedTypeDescriptor (object instance);
```

Gets an extended custom type descriptor for the given object.

Parameters:

- `instance`: The object for which to get the extended type descriptor.

Returns: An `ICustomTypeDescriptor` that can provide extended metadata for the object.

#### Remarks
An extended type descriptor is a custom type descriptor that offers properties that other objects have added to this object, but that are not actually defined on the object. For example, in the .NET component model, objects that implement the `IExtenderProvider` interface can attach properties to other objects that reside in the same logical container. The overloaded `TypeDescriptionProvider.GetTypeDescriptor` methods do not return a type descriptor that provides these extra extended properties. The `TypeDescriptionProvider.GetExtendedTypeDescriptor` method returns the set of these extended properties. The `TypeDescriptor` will automatically merge the results of these two property collections. While the .NET component model supports only extended properties, `TypeDescriptionProvider.GetExtendedTypeDescriptor` can be used for extended attributes as well as events, if the type description provider supports it.

`TypeDescriptionProvider.GetExtendedTypeDescriptor` is `virtual` and, by default, returns a custom type descriptor that returns empty results if no parent provider was passed. If a parent provider was passed, this method will invoke the parent provider's `TypeDescriptionProvider.GetExtendedTypeDescriptor` method.

## TypeDescriptionProvider.GetExtendedTypeDescriptorFromRegisteredType(Object) method

```csharp
public virtual System.ComponentModel.ICustomTypeDescriptor GetExtendedTypeDescriptorFromRegisteredType (object instance);
```

Returns an extended custom type descriptor for the given object.

Parameters:

- `instance`: The object for which to get the extended type descriptor.

Returns: An `ICustomTypeDescriptor` that can provide extended metadata for the object.

An extended type descriptor is a custom type descriptor that offers properties that other objects have added to this object, but are not actually defined on the object. For example, in the .NET component model, objects that implement the interface IExtenderProvider can "attach" properties to other objects that reside in the same logical container. The GetTypeDescriptorFromRegisteredType method does not return a type descriptor that provides these extra extended properties. GetExtendedTypeDescriptorFromRegisteredType returns the set of these extended properties. TypeDescriptor will automatically merge the results of these two property collections. While the .NET component model only supports extended properties, this API can be used for extended attributes and events as well, if the type description provider supports it.

## TypeDescriptionProvider.GetExtenderProviders(Object) method

```csharp
protected internal virtual System.ComponentModel.IExtenderProvider[] GetExtenderProviders (object instance);
```

Gets the extender providers for the specified object.

Parameters:

- `instance`: The object to get extender providers for.

Returns: An array of extender providers for `instance`.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

To be added.

## TypeDescriptionProvider.GetFullComponentName(Object) method

```csharp
public virtual string? GetFullComponentName (object component);
```

Gets the name of the specified component, or `null` if the component has no name.

Parameters:

- `component`: The specified component.

Returns: The name of the specified component.

Exceptions:

- `ArgumentNullException`: `component` is `null`.

To be added.

## TypeDescriptionProvider.GetReflectionType(Object) method

```csharp
public Type GetReflectionType (object instance);
```

Performs normal reflection against the given object.

Parameters:

- `instance`: An instance of the type (should not be `null`).

Returns: The type of reflection for this `instance`.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

#### Remarks
The `TypeDescriptionProvider.GetReflectionType` method is a lower-level version of the `TypeDescriptionProvider.GetTypeDescriptor` method. If no custom type descriptor can be located for an object, `TypeDescriptionProvider.GetReflectionType` is called to perform normal reflection against the object.

Use this method overload if you have called a type descriptor member that uses an instance instead of a type.

## TypeDescriptionProvider.GetReflectionType(Type) method

```csharp
public Type GetReflectionType (Type objectType);
```

Performs normal reflection against a type.

Parameters:

- `objectType`: The type of object for which to retrieve the `IReflect`.

Returns: The type of reflection for this `objectType`.

Exceptions:

- `ArgumentNullException`: `objectType` is `null`.

#### Remarks
The `TypeDescriptionProvider.GetReflectionType` method is a lower-level version of the `TypeDescriptionProvider.GetTypeDescriptor` method. If no custom type descriptor can be located for an object, `TypeDescriptionProvider.GetReflectionType` is called to perform normal reflection against the object.

Use this method overload if you have called a type descriptor member that uses a type instead of an instance.

## TypeDescriptionProvider.GetReflectionType(Type, Object) method

```csharp
public virtual Type GetReflectionType (Type objectType, object? instance);
```

Performs normal reflection against the given object with the given type.

Parameters:

- `objectType`: The type of object for which to retrieve the `IReflect`.
- `instance`: An instance of the type. Can be `null`.

Returns: The type of reflection for this `objectType`.

#### Remarks
The `TypeDescriptionProvider.GetReflectionType` method is a lower-level version of the `TypeDescriptionProvider.GetTypeDescriptor` method. If no custom type descriptor can be located for an object, `TypeDescriptionProvider.GetReflectionType` is called to perform normal reflection against the object.

## TypeDescriptionProvider.GetRuntimeType(Type) method

```csharp
public virtual Type GetRuntimeType (Type reflectionType);
```

Converts a reflection type into a runtime type.

Parameters:

- `reflectionType`: The type to convert to its runtime equivalent.

Returns: A `Type` that represents the runtime equivalent of `reflectionType`.

Exceptions:

- `ArgumentNullException`: `reflectionType` is `null`.

#### Remarks
The `TypeDescriptionProvider.GetRuntimeType` method reverses the `TypeDescriptionProvider.GetReflectionType` method to convert a reflection type back into a runtime type. Using the `TypeDescriptionProvider.GetRuntimeType` method is preferred over using the `UnderlyingSystemType` property, which was used in earlier versions to return the runtime type.

## TypeDescriptionProvider.GetTypeDescriptor(Object) method

```csharp
public System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptor (object instance);
```

Gets a custom type descriptor for the given object.

Parameters:

- `instance`: An instance of the type. Can be `null` if no instance was passed to the `TypeDescriptor`.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

Exceptions:

- `ArgumentNullException`: `instance` is `null`.

To be added.

## TypeDescriptionProvider.GetTypeDescriptor(Type) method

```csharp
public System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptor (Type objectType);
```

Gets a custom type descriptor for the given type.

Parameters:

- `objectType`: The type of object for which to retrieve the type descriptor.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

To be added.

## TypeDescriptionProvider.GetTypeDescriptor(Type, Object) method

```csharp
public virtual System.ComponentModel.ICustomTypeDescriptor? GetTypeDescriptor (Type objectType, object? instance);
```

Gets a custom type descriptor for the given type and object.

Parameters:

- `objectType`: The type of object for which to retrieve the type descriptor.
- `instance`: An instance of the type. Can be `null` if no instance was passed to the `TypeDescriptor`.

Returns: An `ICustomTypeDescriptor` that can provide metadata for the type.

#### Remarks
This method is prototyped as `virtual` and, by default, returns an empty descriptor if no parent provider was passed. If a parent provider was passed, this method will invoke the parent provider's `TypeDescriptionProvider.GetTypeDescriptor` method.
