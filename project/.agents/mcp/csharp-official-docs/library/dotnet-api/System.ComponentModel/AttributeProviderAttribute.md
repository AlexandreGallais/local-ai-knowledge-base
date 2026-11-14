---
title: "AttributeProviderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/AttributeProviderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AttributeProviderAttribute class

Namespace: `System.ComponentModel`

```csharp
public class AttributeProviderAttribute : Attribute
```

Enables attribute redirection. This class cannot be inherited.

#### Remarks
There are a few cases in the .NET object model where a property is purposely typed to be vague. For example, the `DataSource` property is typed as `object`. The reason for this is that this property can accept several types of input. Unfortunately, this provides no common place to add metadata to describe the characteristics of the property. Each `DataSource` property throughout .NET needs to have identical metadata for type converters, UI type editors, and other services that require metadata. The `AttributeProviderAttribute` remedies this situation.

Once this attribute is placed on a property, the rules for obtaining attributes for the property descriptor's `MemberDescriptor.Attributes` collection differ. Typically, the property descriptor gathers local attributes, and then merges these with attributes from the property type. In this case, the attributes are taken from the type returned from the `AttributeProviderAttribute`, not from the actual property type. This attribute is used on `DataGridView.DataSource` to point the `DataGridView.DataSource` object's specific type to `IListSource`, and the appropriate metadata is placed on `IListSource` to enable data binding. In so doing, external parties can easily add metadata to all data sources.

Attributes obtained from a type declared in the `AttributeProviderAttribute` have a priority in between the attributes of the property's type and the attributes on the property. The following list, in priority order, shows the full set of available merged attributes:

- Property Attributes
- Attribute Provider Attributes
- Property Type Attributes

#### Examples
The following code example demonstrates using `AttributeProviderAttribute` to mark a `DataSource` property with a specific type of `IListSource`. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## AttributeProviderAttribute.AttributeProviderAttribute(String) constructor

```csharp
public AttributeProviderAttribute (string typeName);
```

Initializes a new instance of the `AttributeProviderAttribute` class with the given type name.

Parameters:

- `typeName`: The name of the type to specify.

Exceptions:

- `ArgumentNullException`: `typeName` is `null`.

To be added.

## AttributeProviderAttribute.AttributeProviderAttribute(Type) constructor

```csharp
public AttributeProviderAttribute (Type type);
```

Initializes a new instance of the `AttributeProviderAttribute` class with the given type.

Parameters:

- `type`: The type to specify.

Exceptions:

- `ArgumentNullException`: `type` is `null`.

#### Examples
The following code example demonstrates using `AttributeProviderAttribute` to mark a `DataSource` property with a specific type of `IListSource`. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## AttributeProviderAttribute.AttributeProviderAttribute(String, String) constructor

```csharp
public AttributeProviderAttribute (string typeName, string propertyName);
```

Initializes a new instance of the `AttributeProviderAttribute` class with the given type name and property name.

Parameters:

- `typeName`: The name of the type to specify.
- `propertyName`: The name of the property for which attributes will be retrieved.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## AttributeProviderAttribute.PropertyName property

```csharp
public string? PropertyName { get; }
```

Gets the name of the property for which attributes will be retrieved.

Returns: The name of the property for which attributes will be retrieved.

To be added.

## AttributeProviderAttribute.TypeName property

```csharp
public string? TypeName { get; }
```

Gets the assembly qualified type name passed into the constructor.

Returns: The assembly qualified name of the type specified in the constructor.

To be added.
