---
title: "DefaultEventAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DefaultEventAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultEventAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DefaultEventAttribute : Attribute
```

Specifies the default event for a component.

#### Remarks
Use the `Name` property to get the name of the default event.

For more information, see Attributes.

#### Examples
The following example defines a collection class named `MyCollection`. The class is marked with a `DefaultEventAttribute` that specifies `CollectionChanged` as the default event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultEventAttribute/Overview/source.cs._

The next example creates an instance of `MyCollection`. Then it gets the attributes for the class, extracts the `DefaultEventAttribute`, and prints the name of the default event.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultEventAttribute/Overview/source.cs._

## DefaultEventAttribute.DefaultEventAttribute(String) constructor

```csharp
public DefaultEventAttribute (string? name);
```

Initializes a new instance of the `DefaultEventAttribute` class.

Parameters:

- `name`: The name of the default event for the component this attribute is bound to.

To be added.

## DefaultEventAttribute.Name property

```csharp
public string? Name { get; }
```

Gets the name of the default event for the component this attribute is bound to.

Returns: The name of the default event for the component this attribute is bound to. The default value is `null`.

To be added.

## DefaultEventAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DefaultEventAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DefaultEventAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DefaultEventAttribute.Default field

```csharp
public static readonly System.ComponentModel.DefaultEventAttribute Default;
```

Specifies the default value for the `DefaultEventAttribute`, which is `null`. This `static` field is read-only.

To be added.
