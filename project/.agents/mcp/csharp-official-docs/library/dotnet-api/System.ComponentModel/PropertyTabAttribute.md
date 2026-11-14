---
title: "PropertyTabAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyTabAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyTabAttribute class

Namespace: `System.ComponentModel`

```csharp
public class PropertyTabAttribute : Attribute
```

Identifies the property tab or tabs to display for the specified class or classes.

#### Remarks
The `PropertyTabAttribute` lets you add a new property page to a `PropertyGrid` control. The `PropertyTabAttribute` can add additional property tabs to expose property information other than a component's default set of properties.

#### Examples
The following code example demonstrates how to use the `PropertyTabAttribute` to specify a property tab. The code example defines a component that exposes the properties of another selected component by type.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyTabAttribute/Overview/class1.cs._
## PropertyTabAttribute.PropertyTabAttribute() constructor

```csharp
public PropertyTabAttribute ();
```

Initializes a new instance of the `PropertyTabAttribute` class.

#### Remarks
This is a parameterless constructor that creates an uninitialized `PropertyTabAttribute`. This constructor can be used to derive from this attribute and specify multiple tab types by calling `PropertyTabAttribute.InitializeArrays`.

## PropertyTabAttribute.PropertyTabAttribute(String) constructor

```csharp
public PropertyTabAttribute (string tabClassName);
```

Initializes a new instance of the `PropertyTabAttribute` class using the specified tab class name.

Parameters:

- `tabClassName`: The assembly qualified name of the type of tab to create. For an example of this format convention, see `Type.AssemblyQualifiedName`.

To be added.

## PropertyTabAttribute.PropertyTabAttribute(Type) constructor

```csharp
public PropertyTabAttribute (Type tabClass);
```

Initializes a new instance of the `PropertyTabAttribute` class using the specified type of tab.

Parameters:

- `tabClass`: The type of tab to create.

To be added.

## PropertyTabAttribute.PropertyTabAttribute(String, PropertyTabScope) constructor

```csharp
public PropertyTabAttribute (string tabClassName, System.ComponentModel.PropertyTabScope tabScope);
```

Initializes a new instance of the `PropertyTabAttribute` class using the specified tab class name and tab scope.

Parameters:

- `tabClassName`: The assembly qualified name of the type of tab to create. For an example of this format convention, see `Type.AssemblyQualifiedName`.
- `tabScope`: A `PropertyTabScope` that indicates the scope of this tab. If the scope is `PropertyTabScope.Component`, it is shown only for components with the corresponding `PropertyTabAttribute`. If it is `PropertyTabScope.Document`, it is shown for all components on the document.

Exceptions:

- `ArgumentException`: `tabScope` is not `PropertyTabScope.Document` or `PropertyTabScope.Component`.

To be added.

## PropertyTabAttribute.PropertyTabAttribute(Type, PropertyTabScope) constructor

```csharp
public PropertyTabAttribute (Type tabClass, System.ComponentModel.PropertyTabScope tabScope);
```

Initializes a new instance of the `PropertyTabAttribute` class using the specified type of tab and tab scope.

Parameters:

- `tabClass`: The type of tab to create.
- `tabScope`: A `PropertyTabScope` that indicates the scope of this tab. If the scope is `PropertyTabScope.Component`, it is shown only for components with the corresponding `PropertyTabAttribute`. If it is `PropertyTabScope.Document`, it is shown for all components on the document.

Exceptions:

- `ArgumentException`: `tabScope` is not `PropertyTabScope.Document` or `PropertyTabScope.Component`.

#### Examples
The following code example demonstrates how to use the `PropertyTabAttribute` to specify a property tab.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/PropertyTabAttribute/Overview/class1.cs._
## PropertyTabAttribute.TabClasses property

```csharp
public Type[] TabClasses { get; }
```

Gets the types of tabs that this attribute uses.

Returns: An array of types indicating the types of tabs that this attribute uses.

Exceptions:

- `TypeLoadException`: The types specified by the `PropertyTabAttribute.TabClassNames` property could not be found.

#### Remarks
All specified types must be able to be assigned to a `PropertyTab`.

## PropertyTabAttribute.TabClassNames property

```csharp
protected string[]? TabClassNames { get; }
```

Gets the names of the tab classes that this attribute uses.

Returns: The names of the tab classes that this attribute uses.

To be added.

## PropertyTabAttribute.TabScopes property

```csharp
public System.ComponentModel.PropertyTabScope[] TabScopes { get; }
```

Gets an array of tab scopes of each tab of this `PropertyTabAttribute`.

Returns: An array of `PropertyTabScope` objects that indicate the scopes of the tabs.

To be added.

## PropertyTabAttribute.Equals(PropertyTabAttribute) method

```csharp
public bool Equals (System.ComponentModel.PropertyTabAttribute? other);
```

Returns a value indicating whether this instance is equal to a specified attribute.

Parameters:

- `other`: A `PropertyTabAttribute` to compare to this instance, or `null`.

Returns: `true` if the `PropertyTabAttribute` instances are equal; otherwise, `false`.

Exceptions:

- `TypeLoadException`: The types specified by the `PropertyTabAttribute.TabClassNames` property of the `other` parameter cannot be found.

To be added.

## PropertyTabAttribute.Equals(Object) method

```csharp
public override bool Equals (object? other);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `other`: An object to compare to this instance, or `null`.

Returns: `true` if `other` refers to the same `PropertyTabAttribute` instance; otherwise, `false`.

Exceptions:

- `TypeLoadException`: The types specified by the `PropertyTabAttribute.TabClassNames` property of the `other` parameter could not be found.

To be added.

## PropertyTabAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for this object.

Returns: The hash code for the object the attribute belongs to.

To be added.

## PropertyTabAttribute.InitializeArrays(String[], PropertyTabScope[]) method

```csharp
protected void InitializeArrays (string[]? tabClassNames, System.ComponentModel.PropertyTabScope[]? tabScopes);
```

Initializes the attribute using the specified names of tab classes and array of tab scopes.

Parameters:

- `tabClassNames`: An array of fully qualified type names of the types to create for tabs on the Properties window.
- `tabScopes`: The scope of each tab. If the scope is `PropertyTabScope.Component`, it is shown only for components with the corresponding `PropertyTabAttribute`. If it is `PropertyTabScope.Document`, it is shown for all components on the document.

Exceptions:

- `ArgumentException`: One or more of the values in `tabScopes` is not `PropertyTabScope.Document` or `PropertyTabScope.Component`.

-or-

The lengths of the `tabClassNames` and `tabScopes` arrays do not match.

-or-

`tabClassNames` or `tabScopes` is `null`.

#### Remarks
`PropertyTabAttribute.InitializeArrays` provides a utility function that can be used to set the types of tab classes that this `PropertyTabAttribute` specifies.

## PropertyTabAttribute.InitializeArrays(Type[], PropertyTabScope[]) method

```csharp
protected void InitializeArrays (Type[]? tabClasses, System.ComponentModel.PropertyTabScope[]? tabScopes);
```

Initializes the attribute using the specified names of tab classes and array of tab scopes.

Parameters:

- `tabClasses`: The types of tabs to create.
- `tabScopes`: The scope of each tab. If the scope is `PropertyTabScope.Component`, it is shown only for components with the corresponding `PropertyTabAttribute`. If it is `PropertyTabScope.Document`, it is shown for all components on the document.

Exceptions:

- `ArgumentException`: One or more of the values in `tabScopes` is not `PropertyTabScope.Document` or `PropertyTabScope.Component`.

-or-

The lengths of the `tabClasses` and `tabScopes` arrays do not match.

-or-

`tabClasses` or `tabScopes` is `null`.

#### Remarks
`PropertyTabAttribute.InitializeArrays` provides a utility function that can be used to set the types of tab classes that this `PropertyTabAttribute` specifies.
