---
title: "DefaultPropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DefaultPropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultPropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DefaultPropertyAttribute : Attribute
```

Specifies the default property for a component.

#### Remarks
Use the `Name` property to get the name of the default property.

For more information, see Attributes.

#### Examples
The following example defines a control named `MyControl`. The class is marked with a `DefaultPropertyAttribute` that specifies `MyProperty` as the default property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultPropertyAttribute/Overview/source.cs._

The next example creates an instance of `MyControl`. Then it gets the attributes for the class, extracts the `DefaultPropertyAttribute`, and prints the name of the default property.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultPropertyAttribute/Overview/source.cs._

## DefaultPropertyAttribute.DefaultPropertyAttribute(String) constructor

```csharp
public DefaultPropertyAttribute (string? name);
```

Initializes a new instance of the `DefaultPropertyAttribute` class.

Parameters:

- `name`: The name of the default property for the component this attribute is bound to.

To be added.

## DefaultPropertyAttribute.Name property

```csharp
public string? Name { get; }
```

Gets the name of the default property for the component this attribute is bound to.

Returns: The name of the default property for the component this attribute is bound to. The default value is `null`.

To be added.

## DefaultPropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DefaultPropertyAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DefaultPropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DefaultPropertyAttribute.Default field

```csharp
public static readonly System.ComponentModel.DefaultPropertyAttribute Default;
```

Specifies the default value for the `DefaultPropertyAttribute`, which is `null`. This `static` field is read-only.

To be added.
