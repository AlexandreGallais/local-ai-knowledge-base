---
title: "PropertyDescriptor class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyDescriptor class

Namespace: `System.ComponentModel`

```csharp
public abstract class PropertyDescriptor : System.ComponentModel.MemberDescriptor
```

Provides an abstraction of a property on a class.

#### Remarks
A description of a property consists of a name, its attributes, the component class that the property is associated with, and the type of the property.

`PropertyDescriptor` provides the following properties and methods:

- `PropertyDescriptor.Converter` contains the `TypeConverter` for this property.
- `PropertyDescriptor.IsLocalizable` indicates whether this property should be localized.
- `PropertyDescriptor.GetEditor` returns an editor of the specified type.

`PropertyDescriptor` also provides the following `abstract` properties and methods:

- `PropertyDescriptor.ComponentType` contains the type of component this property is bound to.
- `PropertyDescriptor.IsReadOnly` indicates whether this property is read-only.
- `PropertyDescriptor.PropertyType` gets the type of the property.
- `PropertyDescriptor.CanResetValue` indicates whether resetting the component changes the value of the component.
- `PropertyDescriptor.GetValue` returns the current value of the property on a component.
- `PropertyDescriptor.ResetValue` resets the value for this property of the component.
- `PropertyDescriptor.SetValue` sets the value of the component to a different value.
- `PropertyDescriptor.ShouldSerializeValue` indicates whether the value of this property needs to be persisted.

Typically, the `abstract` members are implemented through reflection. For more information, see Reflection.

#### Examples
The following code example is built upon the example in the `PropertyDescriptorCollection` class. It prints the information (category, description, display name) of the text of a button in a text box. It assumes that `button1` and `textbox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptor/Overview/propertydescriptor.cs._

The following code example shows how to implement a custom property descriptor that provides a read-only wrapper around a property. The `SerializeReadOnlyPropertyDescriptor` is used in a custom designer to provide a read-only property descriptor for the control's `Size` property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptor/Overview/SerializeReadOnlyPropertyDescriptor.cs._

The following code examples show how to use the `SerializeReadOnlyPropertyDescriptor` in a custom designer.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptor/Overview/DemoControlDesigner.cs._

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyDescriptor/Overview/DemoControl.cs._

## PropertyDescriptor.PropertyDescriptor(MemberDescriptor) constructor

```csharp
protected PropertyDescriptor (System.ComponentModel.MemberDescriptor descr);
```

Initializes a new instance of the `PropertyDescriptor` class with the name and attributes in the specified `MemberDescriptor`.

Parameters:

- `descr`: A `MemberDescriptor` that contains the name of the property and its attributes.

To be added.

## PropertyDescriptor.PropertyDescriptor(MemberDescriptor, Attribute[]) constructor

```csharp
protected PropertyDescriptor (System.ComponentModel.MemberDescriptor descr, Attribute[]? attrs);
```

Initializes a new instance of the `PropertyDescriptor` class with the name in the specified `MemberDescriptor` and the attributes in both the `MemberDescriptor` and the `Attribute` array.

Parameters:

- `descr`: A `MemberDescriptor` containing the name of the member and its attributes.
- `attrs`: An `Attribute` array containing the attributes you want to associate with the property.

#### Remarks
This constructor appends the attributes in the `Attribute` array to the attributes in the `MemberDescriptor`.

## PropertyDescriptor.PropertyDescriptor(String, Attribute[]) constructor

```csharp
protected PropertyDescriptor (string name, Attribute[]? attrs);
```

Initializes a new instance of the `PropertyDescriptor` class with the specified name and attributes.

Parameters:

- `name`: The name of the property.
- `attrs`: An array of type `Attribute` that contains the property attributes.

To be added.

## PropertyDescriptor.ComponentType property

```csharp
public abstract Type ComponentType { get; }
```

When overridden in a derived class, gets the type of the component this property is bound to.

Returns: A `Type` that represents the type of component this property is bound to. When the `PropertyDescriptor.GetValue` or `PropertyDescriptor.SetValue` methods are invoked, the object specified might be an instance of this type.

#### Remarks
Typically, this property is implemented through reflection.

## PropertyDescriptor.Converter property

```csharp
public virtual System.ComponentModel.TypeConverter Converter { get; }
```

Gets the type converter for this property.

Returns: A `TypeConverter` that is used to convert the `Type` of this property.

To be added.

## PropertyDescriptor.ConverterFromRegisteredType property

```csharp
public virtual System.ComponentModel.TypeConverter ConverterFromRegisteredType { get; }
```

Gets the type converter for this property.

Returns: To be added.

To be added.

## PropertyDescriptor.IsLocalizable property

```csharp
public virtual bool IsLocalizable { get; }
```

Gets a value indicating whether this property should be localized, as specified in the `LocalizableAttribute`.

Returns: `true` if the member is marked with the `LocalizableAttribute` set to `true`; otherwise, `false`.

#### Remarks
When a property is marked with the `LocalizableAttribute` set to `true` and used in a visual designer, its values are saved in a resource file. If you mark a property with the attribute and then set the property in code, resource files are not used.

## PropertyDescriptor.IsReadOnly property

```csharp
public abstract bool IsReadOnly { get; }
```

When overridden in a derived class, gets a value indicating whether this property is read-only.

Returns: `true` if the property is read-only; otherwise, `false`.

To be added.

## PropertyDescriptor.PropertyType property

```csharp
public abstract Type PropertyType { get; }
```

When overridden in a derived class, gets the type of the property.

Returns: A `Type` that represents the type of the property.

#### Remarks
Typically, this property is implemented through reflection.

## PropertyDescriptor.SerializationVisibility property

```csharp
public System.ComponentModel.DesignerSerializationVisibility SerializationVisibility { get; }
```

Gets a value indicating whether this property should be serialized, as specified in the `DesignerSerializationVisibilityAttribute`.

Returns: One of the `DesignerSerializationVisibility` enumeration values that specifies whether this property should be serialized.

To be added.

## PropertyDescriptor.SupportsChangeEvents property

```csharp
public virtual bool SupportsChangeEvents { get; }
```

Gets a value indicating whether value change notifications for this property may originate from outside the property descriptor.

Returns: `true` if value change notifications may originate from outside the property descriptor; otherwise, `false`.

#### Remarks
The `SupportsChangeEvents` property indicates whether value change notifications for this property may originate from outside the property descriptor, such as from the component itself, or whether notifications will only originate from direct calls made to the `PropertyDescriptor.SetValue` method. For example, the component may implement the `INotifyPropertyChanged` interface, or may have an explicit `name.Changed` event for this property.

## PropertyDescriptor.AddValueChanged(Object, EventHandler) method

```csharp
public virtual void AddValueChanged (object component, EventHandler handler);
```

Enables other objects to be notified when this property changes.

Parameters:

- `component`: The component to add the handler for.
- `handler`: The delegate to add as a listener.

Exceptions:

- `ArgumentNullException`: `component` or `handler` is `null`.

To be added.

## PropertyDescriptor.CanResetValue(Object) method

```csharp
public abstract bool CanResetValue (object component);
```

When overridden in a derived class, returns whether resetting an object changes its value.

Parameters:

- `component`: The component to test for reset capability.

Returns: `true` if resetting the component changes its value; otherwise, `false`.

#### Remarks
Typically, this method is implemented through reflection.

## PropertyDescriptor.CreateInstance(Type) method

```csharp
protected object? CreateInstance (Type type);
```

Creates an instance of the specified type.

Parameters:

- `type`: A `Type` that represents the type to create.

Returns: A new instance of the type.

#### Remarks
`PropertyDescriptor.CreateInstance` looks for a constructor that takes the specified type. If it finds a constructor, the type of the property is passed in.

Converters and editors use this method to create versions of a component. This method enables a single component to be reused for more than one type.

## PropertyDescriptor.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares this to another object to see if they are equivalent.

Parameters:

- `obj`: The object to compare to this `PropertyDescriptor`.

Returns: `true` if the values are equivalent; otherwise, `false`.

To be added.

## PropertyDescriptor.FillAttributes(IList) method

```csharp
protected override void FillAttributes (System.Collections.IList attributeList);
```

Adds the attributes of the `PropertyDescriptor` to the specified list of attributes in the parent class.

Parameters:

- `attributeList`: An `IList` that lists the attributes in the parent class. Initially, this is empty.

#### Remarks
For duplicate attributes, the last one added to the list will be kept.

## PropertyDescriptor.GetChildProperties() method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetChildProperties ();
```

Returns the default `PropertyDescriptorCollection`.

Returns: A collection of property descriptor.

#### Remarks
This method passes `null` for both the `instance` parameter and the `filter` parameter.

The properties for the `instance` parameter can differ from the properties of a class, because the container can add or remove properties if the `instance` parameter is sited.

The `filter` parameter can mix `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object is treated as a wildcard; it matches any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match to be included in the returned array.

- If you specify an `Attribute` and it is the default property, it will be included in the returned array, even if there is no instance of `Attribute` in the property.

## PropertyDescriptor.GetChildProperties(Attribute[]) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetChildProperties (Attribute[] filter);
```

Returns a `PropertyDescriptorCollection` using a specified array of attributes as a filter.

Parameters:

- `filter`: An array of type `Attribute` to use as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that match the specified attributes.

#### Remarks
This method passes `null` for the `instance` parameter.

The properties for the `instance` parameter can differ from the properties of a class, because the site can add or remove properties if the `instance` parameter is sited.

The `filter` parameter can mix `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object is treated as a wildcard; it matches any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match to be included in the returned array.

- If you specify an `Attribute` instance and it is the default property, it will be included in the returned array even if there is no instance of the `Attribute` in the property.

## PropertyDescriptor.GetChildProperties(Object) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetChildProperties (object instance);
```

Returns a `PropertyDescriptorCollection` for a given object.

Parameters:

- `instance`: A component to get the properties for.

Returns: A `PropertyDescriptorCollection` with the properties for the specified component.

#### Remarks
This method passes `null` for the `filter` parameter.

The properties for the `instance` parameter can differ from the properties of a class, because the site can add or remove properties if the `instance` parameter is sited.

The `filter` parameter can mix `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object is treated as a wildcard; it matches any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match to be included in the returned array.

- If you specify an `Attribute` instance and it is the default property, it will be included in the returned array even if there is no instance of the `Attribute` in the property.
