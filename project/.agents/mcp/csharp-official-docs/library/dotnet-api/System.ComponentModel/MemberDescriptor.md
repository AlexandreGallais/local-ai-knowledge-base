---
title: "MemberDescriptor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MemberDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemberDescriptor class

Namespace: `System.ComponentModel`

```csharp
public abstract class MemberDescriptor
```

Represents a class member, such as a property or event. This is an abstract base class.

#### Remarks
`MemberDescriptor` is the base class for the `EventDescriptor` and the `PropertyDescriptor` classes. The `EventDescriptor` class provides a description of an event, and the `PropertyDescriptor` class provides a description of a property.

This class defines properties and methods to access its stored attributes. The `Attributes` property gets the collection of attributes. The `MemberDescriptor.Category`, `MemberDescriptor.IsBrowsable`, `MemberDescriptor.Description`, and `MemberDescriptor.DesignTimeOnly` properties retrieve the values of those specific attributes. The `MemberDescriptor.Name` and `MemberDescriptor.DisplayName` properties provide the name of the member.

The `MemberDescriptor` also defines an `MemberDescriptor.Equals` method to compare this `MemberDescriptor` to another.

> **Note:**
>  Typically, you inherit from the `EventDescriptor` and `PropertyDescriptor` classes, and not from this class.

#### Examples
Since most of the usage of this class will fall on the inherited classes `EventDescriptor` and `PropertyDescriptor`, refer to the examples in these classes.

## MemberDescriptor.MemberDescriptor(MemberDescriptor) constructor

```csharp
protected MemberDescriptor (System.ComponentModel.MemberDescriptor descr);
```

Initializes a new instance of the `MemberDescriptor` class with the specified `MemberDescriptor`.

Parameters:

- `descr`: A `MemberDescriptor` that contains the name of the member and its attributes.

To be added.

## MemberDescriptor.MemberDescriptor(String) constructor

```csharp
protected MemberDescriptor (string name);
```

Initializes a new instance of the `MemberDescriptor` class with the specified name of the member.

Parameters:

- `name`: The name of the member.

Exceptions:

- `ArgumentException`: The name is an empty string ("") or `null`.

To be added.

## MemberDescriptor.MemberDescriptor(MemberDescriptor, Attribute[]) constructor

```csharp
protected MemberDescriptor (System.ComponentModel.MemberDescriptor oldMemberDescriptor, Attribute[]? newAttributes);
```

Initializes a new instance of the `MemberDescriptor` class with the name in the specified `MemberDescriptor` and the attributes in both the old `MemberDescriptor` and the `Attribute` array.

Parameters:

- `oldMemberDescriptor`: A `MemberDescriptor` that has the name of the member and its attributes.
- `newAttributes`: An array of `Attribute` objects with the attributes you want to add to the member.

#### Remarks
This constructor appends the attributes in the `Attribute` array to the attributes in the old `MemberDescriptor`.

## MemberDescriptor.MemberDescriptor(String, Attribute[]) constructor

```csharp
protected MemberDescriptor (string name, Attribute[]? attributes);
```

Initializes a new instance of the `MemberDescriptor` class with the specified name of the member and an array of attributes.

Parameters:

- `name`: The name of the member.
- `attributes`: An array of type `Attribute` that contains the member attributes.

Exceptions:

- `ArgumentException`: The name is an empty string ("") or `null`.

To be added.

## MemberDescriptor.AttributeArray property

```csharp
protected virtual Attribute[]? AttributeArray { get; set; }
```

Gets or sets an array of attributes.

Returns: An array of type `Attribute` that contains the attributes of this member.

#### Remarks
Accessing this member allows derived classes to modify the default set of attributes that are used in the `MemberDescriptor.CreateAttributeCollection` method.

## MemberDescriptor.Attributes property

```csharp
public virtual System.ComponentModel.AttributeCollection Attributes { get; }
```

Gets the collection of attributes for this member.

Returns: An `AttributeCollection` that provides the attributes for this member, or an empty collection if there are no attributes in the `MemberDescriptor.AttributeArray`.

#### Remarks
If there is no `AttributeCollection` for this member, this property calls the `MemberDescriptor.CreateAttributeCollection` method to create a new `AttributeCollection` using the array of `Attribute` objects passed to the constructor.

## MemberDescriptor.Category property

```csharp
public virtual string Category { get; }
```

Gets the name of the category to which the member belongs, as specified in the `CategoryAttribute`.

Returns: The name of the category to which the member belongs. If there is no `CategoryAttribute`, the category name is set to the default category, `Misc`.

#### Remarks
A visual designer can use this property value to display members in categories.

## MemberDescriptor.Description property

```csharp
public virtual string Description { get; }
```

Gets the description of the member, as specified in the `DescriptionAttribute`.

Returns: The description of the member. If there is no `DescriptionAttribute`, the property value is set to the default, which is an empty string ("").

#### Remarks
A visual designer can use this description to display information about this member.

## MemberDescriptor.DesignTimeOnly property

```csharp
public virtual bool DesignTimeOnly { get; }
```

Gets whether this member should be set only at design time, as specified in the `DesignOnlyAttribute`.

Returns: `true` if this member should be set only at design time; `false` if the member can be set during run time.

#### Remarks
If there is no `DesignOnlyAttribute`, the return value is the default, which is `false`.

## MemberDescriptor.DisplayName property

```csharp
public virtual string DisplayName { get; }
```

Gets the name that can be displayed in a window, such as a Properties window.

Returns: The name to display for the member.

To be added.

## MemberDescriptor.IsBrowsable property

```csharp
public virtual bool IsBrowsable { get; }
```

Gets a value indicating whether the member is browsable, as specified in the `BrowsableAttribute`.

Returns: `true` if the member is browsable; otherwise, `false`. If there is no `BrowsableAttribute`, the property value is set to the default, which is `true`.

#### Remarks
A visual designer typically displays the members that are browsable in the Properties window.

## MemberDescriptor.Name property

```csharp
public virtual string Name { get; }
```

Gets the name of the member.

Returns: The name of the member.

To be added.

## MemberDescriptor.NameHashCode property

```csharp
protected virtual int NameHashCode { get; }
```

Gets the hash code for the name of the member, as specified in `String.GetHashCode`.

Returns: The hash code for the name of the member.

To be added.

## MemberDescriptor.CreateAttributeCollection() method

```csharp
protected virtual System.ComponentModel.AttributeCollection CreateAttributeCollection ();
```

Creates a collection of attributes using the array of attributes passed to the constructor.

Returns: A new `AttributeCollection` that contains the `MemberDescriptor.AttributeArray` attributes.

#### Remarks
This method is called from the `Attributes` property when there is no `AttributeCollection` for this member. If there are no attributes in the `MemberDescriptor.AttributeArray`, this will return an empty `AttributeCollection`.

## MemberDescriptor.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares this instance to the given object to see if they are equivalent.

Parameters:

- `obj`: The object to compare to the current instance.

Returns: `true` if equivalent; otherwise, `false`.

To be added.

## MemberDescriptor.FillAttributes(IList) method

```csharp
protected virtual void FillAttributes (System.Collections.IList attributeList);
```

When overridden in a derived class, adds the attributes of the inheriting class to the specified list of attributes in the parent class.

Parameters:

- `attributeList`: An `IList` that lists the attributes in the parent class. Initially, this is empty.

#### Remarks
For duplicate attributes, the last one added to the list is kept.

The `IList` with the attributes is created once. If there are duplicate attributes in the list, only the first instance is saved; all subsequent duplicate attributes are removed from the list.

## MemberDescriptor.FindMethod(Type, String, Type[], Type) method

```csharp
protected static System.Reflection.MethodInfo? FindMethod (Type componentClass, string name, Type[] args, Type returnType);
```

Finds the given method through reflection, searching only for public methods.

Parameters:

- `componentClass`: The component that contains the method.
- `name`: The name of the method to find.
- `args`: An array of parameters for the method, used to choose between overloaded methods.
- `returnType`: The type to return for the method.

Returns: A `MethodInfo` that represents the method, or `null` if the method is not found.

To be added.

## MemberDescriptor.FindMethod(Type, String, Type[], Type, Boolean) method

```csharp
protected static System.Reflection.MethodInfo? FindMethod (Type componentClass, string name, Type[] args, Type returnType, bool publicOnly);
```

Finds the given method through reflection, with an option to search only public methods.

Parameters:

- `componentClass`: The component that contains the method.
- `name`: The name of the method to find.
- `args`: An array of parameters for the method, used to choose between overloaded methods.
- `returnType`: The type to return for the method.
- `publicOnly`: Whether to restrict search to public methods.

Returns: A `MethodInfo` that represents the method, or `null` if the method is not found.

To be added.

## MemberDescriptor.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `MemberDescriptor`.

To be added.

## MemberDescriptor.GetInvocationTarget(Type, Object) method

```csharp
protected virtual object? GetInvocationTarget (Type type, object instance);
```

Retrieves the object that should be used during invocation of members.

Parameters:

- `type`: The `Type` of the invocation target.
- `instance`: The potential invocation target.

Returns: The object to be used during member invocations.

Exceptions:

- `ArgumentNullException`: `type` or `instance` is `null`.

#### Remarks
Normally, the return value will be the same as the `instance` parameter. If another object has been associated with this instance, or if the instance is a custom type descriptor, the `MemberDescriptor.GetInvocationTarget` method may return a different value.

## MemberDescriptor.GetInvokee(Type, Object) method

```csharp
protected static object GetInvokee (Type componentClass, object component);
```

Gets the component on which to invoke a method.

Parameters:

- `componentClass`: A `Type` representing the type of component this `MemberDescriptor` is bound to. For example, if this `MemberDescriptor` describes a property, this parameter should be the class that the property is declared on.
- `component`: An instance of the object to call.

Returns: An instance of the component to invoke. This method returns a visual designer when the property is attached to a visual designer.

Exceptions:

- `ArgumentNullException`: `componentClass` or `component` is `null`.

To be added.

## MemberDescriptor.GetSite(Object) method

```csharp
protected static System.ComponentModel.ISite? GetSite (object? component);
```

Gets a component site for the given component.

Parameters:

- `component`: The component for which you want to find a site.

Returns: The site of the component, or `null` if a site does not exist.

To be added.
