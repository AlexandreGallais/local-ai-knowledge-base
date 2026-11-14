---
title: "CustomTypeDescriptor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CustomTypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomTypeDescriptor class

Namespace: `System.ComponentModel`

```csharp
public abstract class CustomTypeDescriptor : System.ComponentModel.ICustomTypeDescriptor
```

Provides a simple default implementation of the `ICustomTypeDescriptor` interface.

#### Remarks
Like `TypeDescriptionProvider`, the `CustomTypeDescriptor` class relies on a parent object of type `ICustomTypeDescriptor` supplied during construction. This allows classes that derive from `CustomTypeDescriptor` to selectively override methods.

## CustomTypeDescriptor.CustomTypeDescriptor() constructor

```csharp
protected CustomTypeDescriptor ();
```

Initializes a new instance of the `CustomTypeDescriptor` class.

#### Remarks
This constructor is equivalent to calling the other `CustomTypeDescriptor.%23ctor` constructor with a parameter that is `null`.

All methods of a `CustomTypeDescriptor` created with this constructor will return default values.

## CustomTypeDescriptor.CustomTypeDescriptor(ICustomTypeDescriptor) constructor

```csharp
protected CustomTypeDescriptor (System.ComponentModel.ICustomTypeDescriptor? parent);
```

Initializes a new instance of the `CustomTypeDescriptor` class using a parent custom type descriptor.

Parameters:

- `parent`: The parent custom type descriptor.

#### Remarks
If the `parent` parameter is `null`, all `CustomTypeDescriptor` methods will return default values. Otherwise, all `CustomTypeDescriptor` methods will delegate to the methods of `parent`.

Most `CustomTypeDescriptor` methods return `null` by default. The following table shows the return values for the methods that do not return `null` by default.

|Method|Default return value|
|------------|--------------------------|
|`CustomTypeDescriptor.GetAttributes`|An empty attribute collection (`Empty`).|
|`CustomTypeDescriptor.GetConverter`|The default `TypeConverter` instance.|
|`CustomTypeDescriptor.GetEvents`|An empty events collection (`Empty`).|
|`CustomTypeDescriptor.GetProperties`|An empty property collection (`Empty`).|

## CustomTypeDescriptor.RequireRegisteredTypes property

```csharp
public virtual bool? RequireRegisteredTypes { get; }
```

Gets a value that indicates whether types are required to be registered through `TypeDescriptionProvider.RegisterType<T>`.

Returns: To be added.

The default value is `null`, which means that the type descriptor has not declared whether or not it is compatible registered types.

A type descriptor needs to implement this to return `true` or `false` if the feature switch

'System.ComponentModel.TypeDescriptor.RequireRegisteredTypes' is enabled.

If `true` is returned, then the type descriptor must also implement

`ICustomTypeDescriptor.GetConverterFromRegisteredType`,

`ICustomTypeDescriptor.GetEventsFromRegisteredType`, and

`ICustomTypeDescriptor.GetPropertiesFromRegisteredType`.

## CustomTypeDescriptor.GetAttributes() method

```csharp
public virtual System.ComponentModel.AttributeCollection GetAttributes ();
```

Returns a collection of custom attributes for the type represented by this type descriptor.

Returns: An `AttributeCollection` containing the attributes for the type. The default is `AttributeCollection.Empty`.

#### Remarks
If a parent custom type descriptor was passed to the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetAttributes` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetClassName() method

```csharp
public virtual string? GetClassName ();
```

Returns the fully qualified name of the class represented by this type descriptor.

Returns: A `String` containing the fully qualified class name of the type this type descriptor is describing. The default is `null`.

#### Remarks

> **Note:**
>  `CustomTypeDescriptor.GetClassName` is not a static method and thus, is not guaranteed to be thread-safe.

If a parent custom type descriptor was passed to the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetClassName` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetComponentName() method

```csharp
public virtual string? GetComponentName ();
```

Returns the name of the class represented by this type descriptor.

Returns: A `String` containing the name of the component instance this type descriptor is describing. The default is `null`.

#### Remarks
If a parent custom type descriptor was passed to the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetComponentName` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetConverter() method

```csharp
public virtual System.ComponentModel.TypeConverter? GetConverter ();
```

Returns a type converter for the type represented by this type descriptor.

Returns: A `TypeConverter` for the type represented by this type descriptor. The default is a newly created `TypeConverter`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetConverter` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetConverterFromRegisteredType() method

```csharp
public virtual System.ComponentModel.TypeConverter? GetConverterFromRegisteredType ();
```

Returns a type converter for the type this type

descriptor is representing.

Returns: A `TypeConverter` for the type represented by this type descriptor.

To be added.

## CustomTypeDescriptor.GetDefaultEvent() method

```csharp
public virtual System.ComponentModel.EventDescriptor? GetDefaultEvent ();
```

Returns the event descriptor for the default event of the object represented by this type descriptor.

Returns: The `EventDescriptor` for the default event on the object represented by this type descriptor. The default is `null`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetDefaultEvent` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetDefaultProperty() method

```csharp
public virtual System.ComponentModel.PropertyDescriptor? GetDefaultProperty ();
```

Returns the property descriptor for the default property of the object represented by this type descriptor.

Returns: A `PropertyDescriptor` for the default property on the object represented by this type descriptor. The default is `null`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetDefaultProperty` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetEditor(Type) method

```csharp
public virtual object? GetEditor (Type editorBaseType);
```

Returns an editor of the specified type that is to be associated with the class represented by this type descriptor.

Parameters:

- `editorBaseType`: The base type of the editor to retrieve.

Returns: An editor of the given type that is to be associated with the class represented by this type descriptor. The default is `null`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetEditor` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetEvents() method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection GetEvents ();
```

Returns a collection of event descriptors for the object represented by this type descriptor.

Returns: An `EventDescriptorCollection` containing the event descriptors for the object represented by this type descriptor. The default is `EventDescriptorCollection.Empty`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetEvents` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetEvents(Attribute[]) method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection GetEvents (Attribute[]? attributes);
```

Returns a filtered collection of event descriptors for the object represented by this type descriptor.

Parameters:

- `attributes`: An array of attributes to use as a filter. This can be `null`.

Returns: An `EventDescriptorCollection` containing the event descriptions for the object represented by this type descriptor. The default is `EventDescriptorCollection.Empty`.

#### Remarks
You can use the `attributes` parameter to filter the collection that is returned.

If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetEvents` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetEventsFromRegisteredType() method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection GetEventsFromRegisteredType ();
```

Returns a collection of event descriptors

for the object this type descriptor is representing.

Returns: An `EventDescriptorCollection` containing the event descriptors for the object represented by this type descriptor.

To be added.

## CustomTypeDescriptor.GetProperties() method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection GetProperties ();
```

Returns a collection of property descriptors for the object represented by this type descriptor.

Returns: A `PropertyDescriptorCollection` containing the property descriptions for the object represented by this type descriptor. The default is `PropertyDescriptorCollection.Empty`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetProperties` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetProperties(Attribute[]) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection GetProperties (Attribute[]? attributes);
```

Returns a filtered collection of property descriptors for the object represented by this type descriptor.

Parameters:

- `attributes`: An array of attributes to use as a filter. This can be `null`.

Returns: A `PropertyDescriptorCollection` containing the property descriptions for the object represented by this type descriptor. The default is `PropertyDescriptorCollection.Empty`.

#### Remarks
You can use the `attributes` parameter to filter the collection that is returned. For filtering rules, see `TypeDescriptor.GetProperties`.

If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetProperties` method will call the parent's corresponding method.

## CustomTypeDescriptor.GetPropertiesFromRegisteredType() method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection GetPropertiesFromRegisteredType ();
```

Returns a collection of property descriptors

for the object this type descriptor is representing.

Returns: A `PropertyDescriptorCollection` containing the property descriptions for the object represented by this type descriptor.

To be added.

## CustomTypeDescriptor.GetPropertyOwner(PropertyDescriptor) method

```csharp
public virtual object? GetPropertyOwner (System.ComponentModel.PropertyDescriptor? pd);
```

Returns an object that contains the property described by the specified property descriptor.

Parameters:

- `pd`: The property descriptor for which to retrieve the owning object.

Returns: An `Object` that owns the given property specified by the type descriptor. The default is `null`.

#### Remarks
If a parent custom type descriptor was passed into the `CustomTypeDescriptor.%23ctor` constructor, the `CustomTypeDescriptor.GetPropertyOwner` method will call the parent's corresponding method.
