---
title: "RSASignaturePadding class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSASignaturePadding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSASignaturePadding class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RSASignaturePadding : IEquatable<System.Security.Cryptography.RSASignaturePadding>
```

Specifies the padding mode and parameters to use with RSA signature creation or verification operations.

To be added.

## RSASignaturePadding.Mode property

```csharp
public System.Security.Cryptography.RSASignaturePaddingMode Mode { get; }
```

Gets the padding mode of this `RSASignaturePadding` instance.

Returns: The padding mode (either `RSASignaturePaddingMode.Pkcs1` or `RSASignaturePaddingMode.Pss`) of this instance.

To be added.

## RSASignaturePadding.Pkcs1 property

```csharp
public static System.Security.Cryptography.RSASignaturePadding Pkcs1 { get; }
```

Gets an object that uses the PKCS #1 v1.5 padding mode.

Returns: An object that uses the `RSASignaturePaddingMode.Pkcs1` padding mode.

To be added.

## RSASignaturePadding.Pss property

```csharp
public static System.Security.Cryptography.RSASignaturePadding Pss { get; }
```

Gets an object that uses PSS padding mode.

Returns: An object that uses the `RSASignaturePaddingMode.Pss` padding mode with the number of salt bytes equal to the size of the hash.

To be added.

## RSASignaturePadding.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `RSASignaturePadding` instance and the `Mode` property of the two objects is equal.

## RSASignaturePadding.Equals(RSASignaturePadding) method

```csharp
public bool Equals (System.Security.Cryptography.RSASignaturePadding? other);
```

Returns a value that indicates whether this instance is equal to a specified `RSASignaturePadding` object.

Parameters:

- `other`: The object to compare with the current instance.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

#### Remarks
The current instance and `other` are equal if the `Mode` property of the two objects is equal.

## RSASignaturePadding.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this `RSASignaturePadding` instance.

Returns: The hash code for this `RSASignaturePadding` instance.

To be added.

## RSASignaturePadding.op_Equality(RSASignaturePadding, RSASignaturePadding) method

```csharp
public static bool operator == (System.Security.Cryptography.RSASignaturePadding? left, System.Security.Cryptography.RSASignaturePadding? right);
```

Indicates whether two specified `RSASignaturePadding` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are equal; otherwise, `false`.

#### Remarks
The `RSASignaturePadding.op_Equality` method defines the operation of the equality operator for `RSASignaturePadding` values.

Two `RSASignaturePadding` values are equal if their `Mode` property values are equal.

## RSASignaturePadding.op_Inequality(RSASignaturePadding, RSASignaturePadding) method

```csharp
public static bool operator != (System.Security.Cryptography.RSASignaturePadding? left, System.Security.Cryptography.RSASignaturePadding? right);
```

Indicates whether two specified `RSASignaturePadding` objects are unequal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if `left` and `right` are unequal; otherwise, `false`.

#### Remarks
The `RSASignaturePadding.op_Inequality` method defines the operation of the inequality operator for `RSASignaturePadding` values.

Two `RSASignaturePadding` values are unequal if their `Mode` property values are different.

## RSASignaturePadding.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of the current `RSASignaturePadding` instance.

Returns: The string representation of the current object.

#### Remarks
The `RSASignaturePadding.ToString` method returns the value of the `RSASignaturePadding.Mode.ToString` method.
