---
title: "InstallerTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InstallerTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstallerTypeAttribute class

Namespace: `System.ComponentModel`

```csharp
public class InstallerTypeAttribute : Attribute
```

Specifies the installer for a type that installs components.

#### Remarks
The class used for the installer must implement the `IDesigner` interface. Use the `InstallerType` property to get the installer associated with this attribute.

For more information, see Attributes.

## InstallerTypeAttribute.InstallerTypeAttribute(String) constructor

```csharp
public InstallerTypeAttribute (string? typeName);
```

Initializes a new instance of the `InstallerTypeAttribute` class with the name of the component's installer type.

Parameters:

- `typeName`: The name of a `Type` that represents the installer for the component this attribute is bound to. This class must implement `IDesigner`.

To be added.

## InstallerTypeAttribute.InstallerTypeAttribute(Type) constructor

```csharp
public InstallerTypeAttribute (Type installerType);
```

Initializes a new instance of the `InstallerTypeAttribute` class, when given a `Type` that represents the installer for a component.

Parameters:

- `installerType`: A `Type` that represents the installer for the component this attribute is bound to. This class must implement `IDesigner`.

To be added.

## InstallerTypeAttribute.InstallerType property

```csharp
public virtual Type? InstallerType { get; }
```

Gets the type of installer associated with this attribute.

Returns: A `Type` that represents the type of installer associated with this attribute, or `null` if an installer does not exist.

To be added.

## InstallerTypeAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `InstallerTypeAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## InstallerTypeAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hashcode for this object.

Returns: A hash code for the current `InstallerTypeAttribute`.

To be added.
