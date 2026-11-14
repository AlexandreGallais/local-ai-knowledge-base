---
title: "TypeDescriptor class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeDescriptor class

Namespace: `System.ComponentModel`

```csharp
public sealed class TypeDescriptor
```

Provides information about the characteristics for a component, such as its attributes, properties, and events. This class cannot be inherited.

#### Remarks

.NET provides two ways to access metadata on a type: the reflection API provided in the `Reflection` namespace, and the `TypeDescriptor` class. Reflection is a general mechanism available to all types because its foundation is established in the `Object.GetType` method of the root `Object` class. The information it returns for a type is not extensible, in that it cannot be modified after compilation of the target type. For more information, see Reflection.

In contrast, `TypeDescriptor` is an extensible inspection mechanism for components: those classes that implement the `IComponent` interface. Unlike reflection, it does not inspect for methods. `TypeDescriptor` can be dynamically extended by several services available through the target component's `Component.Site`. The following table shows these services.

|Service name|Description|
|------------------|-----------------|
|`IExtenderProvider`|Enables another class, such as `ToolTip`, to provide extra properties to a component.|
|`ITypeDescriptorFilterService`|Enables another object to modify the standard metadata that is exposed by a component.|
|`ICustomTypeDescriptor`|Enables a class to completely and dynamically specify its own metadata, replacing the standard inspection mechanism of `TypeDescriptor`.|

The extensibility provided by `TypeDescriptor` allows the design-time representation of a component to differ from its actual run-time representation, which makes `TypeDescriptor` useful for building design-time infrastructure.

All the methods in `TypeDescriptor` are `static`. You cannot create an instance of this class, and this class cannot be inherited.

You can set property and event values two different ways: specify them in the component class or change them at design time. Because you can set these values two ways, the overloaded methods of `TypeDescriptor` take two different types of parameters: a class type or an object instance.

When you want to access `TypeDescriptor` information and you have an instance of the object, use the method that calls for a component. Use the method that calls for the class type only when you do not have an instance of the object.

Properties and events are cached by `TypeDescriptor` for speed. Typically, they are constant for the lifetime of an object. However, extender providers and designers can change the set of properties on an object. If this is the case, then the `TypeDescriptor.Refresh` method must be called to update the cache.

## TypeDescriptor.ComNativeDescriptorHandler property

```csharp
public static System.ComponentModel.IComNativeDescriptorHandler? ComNativeDescriptorHandler { get; set; }
```

Gets or sets the provider for the Component Object Model (COM) type information for the target component.

Returns: An `IComNativeDescriptorHandler` instance representing the COM type information provider.

#### Remarks
The `ComNativeDescriptorHandler` property and the `IComNativeDescriptorHandler` interface are obsolete. For more information, see the `ComObjectType` property.

## TypeDescriptor.ComObjectType property

```csharp
public static Type ComObjectType { get; }
```

Gets the type of the Component Object Model (COM) object represented by the target component.

Returns: The `Type` of the COM object represented by this component, or `null` for non-COM objects.

#### Remarks
The `ComObjectType` property returns a type that can be passed to the `AddProvider` method to define a type description provider for COM types.

The `ComObjectType` property and other members in this class replace the functionality in the obsolete `IComNativeDescriptorHandler` interface. To implement a mapping layer between a COM object and `TypeDescriptor`, add a `TypeDescriptionProvider` to handle type `TypeDescriptor.ComObjectType`.

## TypeDescriptor.InterfaceType property

```csharp
public static Type InterfaceType { get; }
```

Gets a type that represents a type description provider for all interface types.

Returns: A `Type` that represents a custom type description provider for all interface types.

#### Remarks
The `InterfaceType` property gets a `Type` object that you can pass to the `TypeDescriptor.AddProvider` methods to define a type description provider for interface types.

## TypeDescriptor.AddAttributes(Object, Attribute[]) method

```csharp
public static System.ComponentModel.TypeDescriptionProvider AddAttributes (object instance, params Attribute[] attributes);
```

Adds class-level attributes to the target component instance.

Parameters:

- `instance`: An instance of the target component.
- `attributes`: An array of `Attribute` objects to add to the component's class.

Returns: The newly created `TypeDescriptionProvider` that was used to add the specified attributes.

Exceptions:

- `ArgumentNullException`: One or both of the parameters is `null`.

#### Remarks
The `AddAttributes` method adds class-level attributes to the specified instance of a component. Because this is a common requirement of applications using the Visual Studio Windows Forms Designer and Properties window, this method provides a shortcut by creating a type description provider that merges the provided attributes with the attributes that already exist on the class. The return value is the type description provider that was used to add the attributes. This provider can later be passed to the `RemoveProvider` method when the added attributes are no longer needed.

## TypeDescriptor.AddAttributes(Type, Attribute[]) method

```csharp
public static System.ComponentModel.TypeDescriptionProvider AddAttributes (Type type, params Attribute[] attributes);
```

Adds class-level attributes to the target component type.

Parameters:

- `type`: The `Type` of the target component.
- `attributes`: An array of `Attribute` objects to add to the component's class.

Returns: The newly created `TypeDescriptionProvider` that was used to add the specified attributes.

Exceptions:

- `ArgumentNullException`: One or both of the parameters is `null`.

#### Remarks
The `AddAttributes` method adds class-level attributes to the specified type of a component. Because this is a common requirement of applications using the Visual Studio Windows Forms Designer and Properties window, this method provides a shortcut by creating a type description provider that merges the provided attributes with the attributes that already exist on the class. The return value is the type description provider that was used to add the attributes. This provider can later be passed to the `RemoveProvider` method when the added attributes are no longer needed.

## TypeDescriptor.AddEditorTable(Type, Hashtable) method

```csharp
public static void AddEditorTable (Type editorBaseType, System.Collections.Hashtable table);
```

Adds an editor table for the given editor base type.

Parameters:

- `editorBaseType`: The editor base type to add the editor table for. If a table already exists for this type, this method will do nothing.
- `table`: The `Hashtable` to add.

#### Remarks
The `TypeDescriptor.AddEditorTable` method adds an editor table for the given editor base type. Typically, editors are specified as metadata on a component. However, if no metadata for a requested editor base type can be found on the component, the associated `TypeDescriptor` will search an editor table for the editor type, if one can be found. Once an editor table has been added to a type descriptor, it cannot be removed and is owned by the type descriptor. The type descriptor may freely make modifications to this table.

The format for an editor table uses data types as keys and editors as values. The value portion of an entry in the table represents an editor instance. It can have one of three values. If it contains a string, the type descriptor will assume this is a fully qualified name of a type, and then load the type for the object. If it contains a type, an instance of this type will be created to obtain an editor. Finally, the value portion may contain an actual editor instance. If the type descriptor resolves an editor to an instance, it will store the instance back into the table for future use.

## TypeDescriptor.AddProvider(TypeDescriptionProvider, Object) method

```csharp
public static void AddProvider (System.ComponentModel.TypeDescriptionProvider provider, object instance);
```

Adds a type description provider for a single instance of a component.

Parameters:

- `provider`: The `TypeDescriptionProvider` to add.
- `instance`: An instance of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
The `AddProvider` method adds a type description provider that supplies type information for a single instance of a component. If a provider is added by this method, the provider's `TypeDescriptor.CreateInstance` method will not be called because the instance already exists.

This method does not maintain a hard reference to the component, so it does not prevent the component from finalizing.

It is possible to add multiple type description providers for the same type or object. If this occurs, the first type description provider encountered that provides type information will be used exclusively. Since type information providers are stored in a stack, the last provider added will be the first one queried. This behavior enables the `AddProvider` and `TypeDescriptor.RemoveProvider` methods to be used to push and pop type description providers as required for particular scenarios.

If successful, this method calls the `Refresh` method on the `instance` parameter.

> **Note:**
>  The two versions of this method produce results with different scopes. The `TypeDescriptor.AddProvider` method that takes an `Object` parameter affects only that single instance of the component specified. In contrast, the other overload, which takes a `Type` parameter, affects all instances of the component described by that type.

## TypeDescriptor.AddProvider(TypeDescriptionProvider, Type) method

```csharp
public static void AddProvider (System.ComponentModel.TypeDescriptionProvider provider, Type type);
```

Adds a type description provider for a component class.

Parameters:

- `provider`: The `TypeDescriptionProvider` to add.
- `type`: The `Type` of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

#### Remarks
The `AddProvider` method adds a type description provider that supplies type information for the specified class, derived classes, and all instances of these types.

> **Note:**
>  The `type` parameter can be any type, including an interface. For example, to provide custom type and instance information for all components, you would specify `typeof(IComponent)`. Passing `typeof(object)` will call the provider to supply type information for all types.

This method does not maintain a hard reference to any object, so it does not prevent objects from finalizing.

It is possible to add multiple type description providers for the same type or object. If this occurs, the first type description provider encountered that provides type information will be used exclusively. Because type information providers are stored in a stack, the last provider added will be the first one queried. This behavior enables the `AddProvider` and `TypeDescriptor.RemoveProvider` methods to be used to push and pop type description providers as required for particular scenarios.

If successful, this method calls the `Refresh` method on the `type` parameter.

> **Note:**
>  The two versions of this method produce results with different scopes. The `TypeDescriptor.AddProvider` method that takes an `Object` parameter affects only that single instance of the component specified. In contrast, the other overload, which takes a `Type` parameter, affects all instances of the component described by that type.

## TypeDescriptor.AddProviderTransparent(TypeDescriptionProvider, Object) method

```csharp
public static void AddProviderTransparent (System.ComponentModel.TypeDescriptionProvider provider, object instance);
```

Adds a type description provider for a single instance of a component.

Parameters:

- `provider`: The `TypeDescriptionProvider` to add.
- `instance`: An instance of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

To be added.

## TypeDescriptor.AddProviderTransparent(TypeDescriptionProvider, Type) method

```csharp
public static void AddProviderTransparent (System.ComponentModel.TypeDescriptionProvider provider, Type type);
```

Adds a type description provider for a component class.

Parameters:

- `provider`: The `TypeDescriptionProvider` to add.
- `type`: The `Type` of the target component.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.

To be added.

## TypeDescriptor.CreateAssociation(Object, Object) method

```csharp
public static void CreateAssociation (object primary, object secondary);
```

Creates a primary-secondary association between two objects.

Parameters:

- `primary`: The primary `Object`.
- `secondary`: The secondary `Object`.

Exceptions:

- `ArgumentNullException`: One or both of the parameters are `null`.
- `ArgumentException`: `primary` is equal to `secondary`.

#### Remarks
The `TypeDescriptor.CreateAssociation` method creates an association between a primary and a secondary object. Once an association is created, a designer or other filtering mechanism can add properties that route to either object into the primary object's property set. When a property invocation is made against the primary object, the `TypeDescriptor.GetAssociation` method will be called to resolve the actual object instance that is related to its type parameter.

A `WeakReference` is used to maintain the association between the primary and secondary object; therefore, this method does not prevent either object from being finalized and reclaimed by garbage collection.
