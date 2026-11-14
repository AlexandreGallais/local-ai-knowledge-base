---
title: "DependencyPropertyDescriptor class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DependencyPropertyDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DependencyPropertyDescriptor class

Namespace: `System.ComponentModel`

```csharp
public sealed class DependencyPropertyDescriptor : System.ComponentModel.PropertyDescriptor
```

Provides an extension of `PropertyDescriptor` that accounts for the additional property characteristics of a dependency property.

#### Remarks
This class is primarily used by designer applications. These applications may need to report the dependency property characteristics through property windows or other tools used for editing property values.

In order to check a specific property to determine whether it has `DependencyPropertyDescriptor` available to serve as a `PropertyDescriptor`, call either `FromProperty`, or `DependencyPropertyDescriptor.FromName`. If either method returns `null`, then the property is not a dependency property. If the method returns a valid `DependencyPropertyDescriptor` , then the property is a dependency property.

## DependencyPropertyDescriptor.Attributes property

```csharp
public override System.ComponentModel.AttributeCollection Attributes { get; }
```

Gets the collection of attributes for this member.

Returns: The `AttributeCollection` collection of attributes.

To be added.

## DependencyPropertyDescriptor.Category property

```csharp
public override string Category { get; }
```

Gets the name of the category that the member belongs to, as specified in the `CategoryAttribute`.

Returns: The name of the category to which the member belongs. If there is no `CategoryAttribute`, the category name is set to the default category, `Misc`.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.ComponentType property

```csharp
public override Type ComponentType { get; }
```

Gets the type of the component this property is bound to.

Returns: A `Type` that represents the type of component this property is bound to. When `DependencyPropertyDescriptor.GetValue` or `DependencyPropertyDescriptor.SetValue` are invoked, the object specified might be an instance of this type.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.Converter property

```csharp
public override System.ComponentModel.TypeConverter Converter { get; }
```

Gets the type converter for this property.

Returns: A `TypeConverter` that is used to convert the `Type` of this property.

#### Remarks
This property may be `null` in cases where the attributed `TypeConverter` is not a public class.

## DependencyPropertyDescriptor.DependencyProperty property

```csharp
public System.Windows.DependencyProperty DependencyProperty { get; }
```

Returns the dependency property identifier.

Returns: The dependency property identifier.

#### Remarks
This property may be `null` if a `DependencyPropertyDescriptor` instance was created for a property that is not a dependency property.

## DependencyPropertyDescriptor.Description property

```csharp
public override string Description { get; }
```

Gets the description of the member, as specified in the `DescriptionAttribute`.

Returns: The description of the member. If there is no `DescriptionAttribute`, the property value is set to the default, which is an empty string ("").

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.DesignerCoerceValueCallback property

```csharp
public System.Windows.CoerceValueCallback DesignerCoerceValueCallback { get; set; }
```

Gets or sets a callback that designers use to modify the effective value of a dependency property before the dependency property value is stored in the dependency property engine.

Returns: A callback that designers use to modify the effective value of a dependency property before the dependency property value is stored in the dependency property engine.

To be added.

## DependencyPropertyDescriptor.DesignTimeOnly property

```csharp
public override bool DesignTimeOnly { get; }
```

Gets whether this member should be set only at design time, as specified in the `DesignOnlyAttribute`.

Returns: `true` if this member should be set only at design time; `false` if the member can be set during run time. If there is no `DesignOnlyAttribute`, the return value is the default, which is `false`.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.DisplayName property

```csharp
public override string DisplayName { get; }
```

Gets the name that can be displayed in a window, such as a Properties window.

Returns: The name to display for the property.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.IsAttached property

```csharp
public bool IsAttached { get; }
```

Gets a value that indicates whether the property is registered as an attached property and is being used through an attached usage.

Returns: `true` if the property is an attached property; otherwise, `false`.

To be added.

## DependencyPropertyDescriptor.IsBrowsable property

```csharp
public override bool IsBrowsable { get; }
```

Gets a value that indicates the value of the `BrowsableAttribute` on the property.

Returns: `true` if the `BrowsableAttribute` was specified on the property; otherwise, `false`.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.IsLocalizable property

```csharp
public override bool IsLocalizable { get; }
```

Gets a value indicating whether this property should be localized, as specified in the `LocalizableAttribute`.

Returns: `true` if the member is marked with the `LocalizableAttribute` constructor of the value true; otherwise, `false`.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.IsReadOnly property

```csharp
public override bool IsReadOnly { get; }
```

Gets a value indicating whether this property is read-only.

Returns: `true` if the property is read-only; otherwise, `false`.

#### Remarks
This property relies on the underlying `PropertyDescriptor`.

Dependency properties are registered as read-only using particular method calls, and by convention the CLR wrapper properties that are the properties viewed by reflection and the descriptors must also be read-only. However, since this is a convention and not a requirement to compile, you might want to double check the dependency property identifier read-only state. To do this, get the identifier (`DependencyProperty`) value for this `DependencyPropertyDescriptor` and then check the value of `DependencyProperty.ReadOnly`. Note that the `DependencyProperty.ReadOnly` is on the identifier itself, not metadata.

## DependencyPropertyDescriptor.Metadata property

```csharp
public System.Windows.PropertyMetadata Metadata { get; }
```

Gets the metadata associated with the dependency property.

Returns: The dependency property metadata.

#### Remarks
The value can be `null` if there is  no metadata or if the property is not a dependency property.

Metadata that has matching concepts in CLR attributes is re-exposed as attributes in the `DependencyPropertyDescriptor.Attributes` collection.

## DependencyPropertyDescriptor.PropertyType property

```csharp
public override Type PropertyType { get; }
```

Gets the represented `Type` of the dependency property.

Returns: The `Type` of the dependency property.

#### Remarks
This property returns the `Type` that the dependency property was registered with.

## DependencyPropertyDescriptor.SupportsChangeEvents property

```csharp
public override bool SupportsChangeEvents { get; }
```

Indicates whether value change notifications for this property may originate from outside the property descriptor, such as from the component itself, or whether notifications will only originate from direct calls made to `DependencyPropertyDescriptor.SetValue`.

Returns: `true` if notifications for this property may originate from outside the property descriptor, such as from the component itself. `false` if notifications will only originate from direct calls made to `DependencyPropertyDescriptor.SetValue`.

#### Remarks
For example, for the `true` case, the component may implement the `INotifyPropertyChanged` interface, or may have an explicit `propertyName.Changed` event for this property.

This property relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.AddValueChanged(Object, EventHandler) method

```csharp
public override void AddValueChanged (object component, EventHandler handler);
```

Enables other objects to be notified when this property changes.

Parameters:

- `component`: The component to add the handler for.
- `handler`: The delegate to add as a listener.

To be added.

## DependencyPropertyDescriptor.CanResetValue(Object) method

```csharp
public override bool CanResetValue (object component);
```

Returns whether resetting an object changes its value.

Parameters:

- `component`: The component to test for reset capability.

Returns: `true` if resetting the component changes its value; otherwise, `false`.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.Equals(Object) method

```csharp
public override bool Equals (object obj);
```

Compares two `DependencyPropertyDescriptor` instances for equality.

Parameters:

- `obj`: The `DependencyPropertyDescriptor` to compare with the current instance.

Returns: `true` if the values are equivalent; otherwise, `false`.

To be added.

## DependencyPropertyDescriptor.FromName(String, Type, Type) method

```csharp
public static System.ComponentModel.DependencyPropertyDescriptor FromName (string name, Type ownerType, Type targetType);
```

Returns a `DependencyPropertyDescriptor` for a provided property name.

Parameters:

- `name`: The registered name of a dependency property or an attached property.
- `ownerType`: The `Type` of the object that owns the property definition.
- `targetType`: The `Type` of the object you want to set the property for.

Returns: The requested `DependencyPropertyDescriptor`.

#### Remarks
The `name` may refer to a dependency property or an attached property, and is the `name` parameter as passed to the `DependencyProperty.Register` or `DependencyProperty.RegisterAttached` call that defined the property in question. `ownerType` is the type of object that owns the property, again as passed to `DependencyProperty.Register` or `DependencyProperty.RegisterAttached`. `targetType` is the type of object you want to set the property for. For dependency properties, `ownerType` and `targetType` are the same type. For attached properties they usually differ.

## DependencyPropertyDescriptor.FromName(String, Type, Type, Boolean) method

```csharp
public static System.ComponentModel.DependencyPropertyDescriptor FromName (string name, Type ownerType, Type targetType, bool ignorePropertyType);
```

Returns a `DependencyPropertyDescriptor` for a provided property name.

Parameters:

- `name`: The registered name of a dependency property or an attached property.
- `ownerType`: The `Type` of the object that owns the property definition.
- `targetType`: The `Type` of the object you want to set the property for.
- `ignorePropertyType`: Specifies to ignore the property type.

Returns: The requested `DependencyPropertyDescriptor`.

#### Remarks
The `name` may refer to a dependency property or an attached property, and is the `name` parameter as passed to the `DependencyProperty.Register` or `DependencyProperty.RegisterAttached` call that defined the property in question. `ownerType` is the type of object that owns the property, again as passed to `DependencyProperty.Register` or `DependencyProperty.RegisterAttached`. `targetType` is the type of object you want to set the property for. For dependency properties, `ownerType` and `targetType` are the same type. For attached properties they usually differ.

## DependencyPropertyDescriptor.FromProperty(PropertyDescriptor) method

```csharp
public static System.ComponentModel.DependencyPropertyDescriptor FromProperty (System.ComponentModel.PropertyDescriptor property);
```

Returns a `DependencyPropertyDescriptor` for a provided `PropertyDescriptor`.

Parameters:

- `property`: The `PropertyDescriptor` to check.

Returns: If the property described by `property` is a dependency property, returns a valid `DependencyPropertyDescriptor`. Otherwise, returns a `null``DependencyPropertyDescriptor`.

#### Remarks
This method is the primary method used by designer applications to obtain a `DependencyPropertyDescriptor` on basis of checking all properties for a `PropertyDescriptor`.

## DependencyPropertyDescriptor.FromProperty(DependencyProperty, Type) method

```csharp
public static System.ComponentModel.DependencyPropertyDescriptor FromProperty (System.Windows.DependencyProperty dependencyProperty, Type targetType);
```

Returns a `DependencyPropertyDescriptor` for a provided dependency property and target type.

Parameters:

- `dependencyProperty`: The identifier for a dependency property.
- `targetType`: The type of the object where the property is set.

Returns: A `DependencyPropertyDescriptor` for the provided dependency property.

#### Remarks
The `dependencyProperty` may refer to a dependency property or an attached property. `targetType` is the type of object you want to set the property for. For dependency properties, that type is equivalent to the `DependencyProperty.OwnerType` for the `dependencyProperty`. For attached properties the `targetType` is typically some other `DependencyObject` type.

## DependencyPropertyDescriptor.GetChildProperties(Object, Attribute[]) method

```csharp
public override System.ComponentModel.PropertyDescriptorCollection GetChildProperties (object instance, Attribute[] filter);
```

Returns a `PropertyDescriptorCollection`.

Parameters:

- `instance`: A component to get the properties for.
- `filter`: An array of type `Attribute` to use as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that match the specified attributes for the specified component.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.GetEditor(Type) method

```csharp
public override object GetEditor (Type editorBaseType);
```

Gets an editor of the specified type.

Parameters:

- `editorBaseType`: The base type of editor, which is used to differentiate between multiple editors that a property supports.

Returns: An instance of the requested editor type, or `null` if an editor cannot be found.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.
