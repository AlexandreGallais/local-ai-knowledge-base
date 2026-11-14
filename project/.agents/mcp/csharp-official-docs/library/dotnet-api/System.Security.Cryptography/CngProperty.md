---
title: "CngProperty struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngProperty.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngProperty struct

Namespace: `System.Security.Cryptography`

```csharp
public struct CngProperty : IEquatable<System.Security.Cryptography.CngProperty>
```

Encapsulates a property of a Cryptography Next Generation (CNG) key or provider.

#### Remarks
This struct encapsulates a property name (a string), a value (byte array), a `CngPropertyOptions` flag, accessor properties, and comparison and hashing functions.

This struct is used with the `CngKey.SetProperty` and `CngKey.GetProperty` methods.

## CngProperty.CngProperty(String, Byte[], CngPropertyOptions) constructor

```csharp
public CngProperty (string name, byte[]? value, System.Security.Cryptography.CngPropertyOptions options);
```

Initializes a new instance of the `CngProperty` struct.

Parameters:

- `name`: The property name to initialize.
- `value`: The property value to initialize.
- `options`: A bitwise combination of the enumeration values that specify how the property is stored.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
Properties that are stored with a specific set of `CngPropertyOptions` flags require the same set of flags when they are retrieved.

## CngProperty.CngProperty(String, Byte>, CngPropertyOptions) constructor

```csharp
public CngProperty (string name, ReadOnlySpan<byte> value, System.Security.Cryptography.CngPropertyOptions options);
```

To be added.

Parameters:

- `name`: To be added.
- `value`: To be added.
- `options`: To be added.

To be added.

## CngProperty.Name property

```csharp
public string Name { get; }
```

Gets the property name that the current `CngProperty` object specifies.

Returns: The property name that is set in the current `CngProperty` object.

To be added.

## CngProperty.Options property

```csharp
public System.Security.Cryptography.CngPropertyOptions Options { get; }
```

Gets the property options that the current `CngProperty` object specifies.

Returns: An object that specifies the options that are set in the current `CngProperty` object.

#### Remarks
`CngKey` objects contain `CngProperty` objects, which contain the `CngPropertyOptions` that the property was stored with.

## CngProperty.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to the current `CngProperty` object.

Parameters:

- `obj`: An object to be compared to the current `CngProperty` object.

Returns: `true` if the `obj` parameter is a `CngProperty` object that specifies the same property as the current object; otherwise, `false`.

#### Remarks
`CngProperty` objects are considered equal if their names, values, and options are equivalent. Name comparison is performed in a case-sensitive manner.

## CngProperty.Equals(CngProperty) method

```csharp
public bool Equals (System.Security.Cryptography.CngProperty other);
```

Compares the specified `CngProperty` object to the current `CngProperty` object.

Parameters:

- `other`: An object to be compared to the current `CngProperty` object.

Returns: `true` if the `other` parameter represents the same property as the current object; otherwise, `false`.

#### Remarks
`CngProperty` objects are considered equal if their names, values, and options are equivalent. Name comparison is performed in a case-sensitive manner.

## CngProperty.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash value for the current `CngProperty` object.

Returns: The hash value of the current `CngProperty` object.

To be added.

## CngProperty.GetValue() method

```csharp
public byte[]? GetValue ();
```

Gets the property value that the current `CngProperty` object specifies.

Returns: An array that represents the value stored in the property.

To be added.

## CngProperty.op_Equality(CngProperty, CngProperty) method

```csharp
public static bool operator == (System.Security.Cryptography.CngProperty left, System.Security.Cryptography.CngProperty right);
```

Determines whether two `CngProperty` objects specify the same property name, value, and options.

Parameters:

- `left`: An object that specifies a property of a Cryptography Next Generation (CNG) key or provider.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects specify the same property; otherwise, `false`.

#### Remarks
`CngProperty` objects are considered equal if their names, values, and options are equivalent. Name comparison is performed in a case-sensitive manner.

The equivalent method for this operator is `Equals`.

## CngProperty.op_Inequality(CngProperty, CngProperty) method

```csharp
public static bool operator != (System.Security.Cryptography.CngProperty left, System.Security.Cryptography.CngProperty right);
```

Determines whether two `CngProperty` objects do not specify the same property name, value, and options.

Parameters:

- `left`: An object that specifies a property of a Cryptography Next Generation (CNG) key or provider.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects do not specify the same property; otherwise, `false`.

#### Remarks
`CngProperty` objects are considered equal if their names, values, and options are equivalent. Name comparison is performed in a case-sensitive manner.

The equivalent method for this operator is `Equals`.
