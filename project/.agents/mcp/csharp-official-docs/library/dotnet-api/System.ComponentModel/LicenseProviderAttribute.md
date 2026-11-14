---
title: "LicenseProviderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/LicenseProviderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LicenseProviderAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class LicenseProviderAttribute : Attribute
```

Specifies the `LicenseProvider` to use with a class. This class cannot be inherited.

#### Remarks
When you create a component that you want to license, you must specify the `LicenseProvider` by marking the component with a `LicenseProviderAttribute`.

Use the `LicenseProvider` property to get the `Type` of the `LicenseProvider`.

For more information about attributes, see Attributes.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `SharedState`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example uses the `LicFileLicenseProvider` as the license provider for `MyControl`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseProviderAttribute/Overview/source.cs._

The next code example creates an instance of the `MyControl` class. Then, it gets the attributes for the class, and prints the name of the license provider used by `myNewControl`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/LicenseProviderAttribute/Overview/source.cs._

## LicenseProviderAttribute.LicenseProviderAttribute() constructor

```csharp
public LicenseProviderAttribute ();
```

Initializes a new instance of the `LicenseProviderAttribute` class without a license provider.

To be added.

## LicenseProviderAttribute.LicenseProviderAttribute(String) constructor

```csharp
public LicenseProviderAttribute (string? typeName);
```

Initializes a new instance of the `LicenseProviderAttribute` class with the specified type.

Parameters:

- `typeName`: The fully qualified name of the license provider class.

To be added.

## LicenseProviderAttribute.LicenseProviderAttribute(Type) constructor

```csharp
public LicenseProviderAttribute (Type type);
```

Initializes a new instance of the `LicenseProviderAttribute` class with the specified type of license provider.

Parameters:

- `type`: A `Type` that represents the type of the license provider class.

To be added.

## LicenseProviderAttribute.LicenseProvider property

```csharp
public Type? LicenseProvider { get; }
```

Gets the license provider that must be used with the associated class.

Returns: A `Type` that represents the type of the license provider. The default value is `null`.

To be added.

## LicenseProviderAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Indicates a unique ID for this attribute type.

Returns: A unique ID for this attribute type.

To be added.

## LicenseProviderAttribute.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `value`: Another object to compare to.

Returns: `true` if `value` is equal to this instance; otherwise, `false`.

To be added.

## LicenseProviderAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `LicenseProviderAttribute`.

To be added.

## LicenseProviderAttribute.Default field

```csharp
public static readonly System.ComponentModel.LicenseProviderAttribute Default;
```

Specifies the default value, which is no provider. This `static` field is read-only.

To be added.
