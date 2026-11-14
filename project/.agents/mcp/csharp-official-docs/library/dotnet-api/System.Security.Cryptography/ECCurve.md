---
title: "ECCurve struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECCurve.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECCurve struct

Namespace: `System.Security.Cryptography`

```csharp
public struct ECCurve
```

Represents an elliptic curve.

#### Remarks
Use the `CurveType` field to determine whether the curve is a named curve or an explicit curve (either a prime or a characteristic 2 curve).

## ECCurve.IsCharacteristic2 property

```csharp
public bool IsCharacteristic2 { get; }
```

Gets a value that indicates whether the curve type indicates an explicit characteristic 2 curve.

Returns: `true` if the curve is an explicit characteristic 2 curve; `false` if the curve is a named characteristic 2, prime, or implicit curve.

To be added.

## ECCurve.IsExplicit property

```csharp
public bool IsExplicit { get; }
```

Gets a value that indicates whether the curve type indicates an explicit curve (either prime or characteristic 2).

Returns: `true` if the curve is an explicit curve (either prime or characteristic 2); `false` if the curve is a named or implicit curve.

To be added.

## ECCurve.IsNamed property

```csharp
public bool IsNamed { get; }
```

Gets a value that indicates whether the curve type indicates a named curve.

Returns: `true` if the curve is a named curve; `false` if the curve is an implicit or an explicit curve (either prime or characteristic 2).

To be added.

## ECCurve.IsPrime property

```csharp
public bool IsPrime { get; }
```

Gets a value that indicates whether the curve type indicates an explicit prime curve.

Returns: `true` if the curve is an explicit prime curve; `false` if the curve is a named prime, characteristic 2 or implicit curves.

To be added.

## ECCurve.Oid property

```csharp
public System.Security.Cryptography.Oid Oid { get; }
```

Gets the identifier of a named curve.

Returns: The identifier of a named curve.

#### Remarks
You cannot set a value for the `Oid` property directly. Instead, to create a named curve, use the `ECCurve.CreateFromFriendlyName`, the `ECCurve.CreateFromOid` , or the `ECCurve.CreateFromValue` methods.

On some systems, the `Value` property is the primary referenced identifier, while on others it's the `FriendlyName` property.  Manually creating an `Oid` object with mismatched values may produce undesirable results.

## ECCurve.CreateFromFriendlyName(String) method

```csharp
public static System.Security.Cryptography.ECCurve CreateFromFriendlyName (string oidFriendlyName);
```

Creates a named curve using the specified friendly name of the identifier.

Parameters:

- `oidFriendlyName`: The friendly name of the identifier.

Returns: An object representing the named curve.

Exceptions:

- `ArgumentNullException`: `oidFriendlyName` is `null`.

To be added.

## ECCurve.CreateFromOid(Oid) method

```csharp
public static System.Security.Cryptography.ECCurve CreateFromOid (System.Security.Cryptography.Oid curveOid);
```

Creates a named curve using the specified `Oid` object.

Parameters:

- `curveOid`: The object identifier to use.

Returns: An object representing the named curve.

To be added.

## ECCurve.CreateFromValue(String) method

```csharp
public static System.Security.Cryptography.ECCurve CreateFromValue (string oidValue);
```

Creates a named curve using the specified dotted-decimal representation of the identifier.

Parameters:

- `oidValue`: The dotted number of the identifier.

Returns: An object representing the named curve.

Exceptions:

- `ArgumentNullException`: `oidValue` is `null`.

To be added.

## ECCurve.Validate() method

```csharp
public void Validate ();
```

Validates the integrity of the current curve. Throws a `CryptographicException` exception if the structure is not valid.

Exceptions:

- `CryptographicException`: The curve parameters are not valid for the current curve type.

To be added.

## ECCurve.A field

```csharp
public byte[]? A;
```

The first coefficient for an explicit curve. `A` for short Weierstrass, Montgomery, and Twisted Edwards curves.

To be added.

## ECCurve.B field

```csharp
public byte[]? B;
```

The second coefficient for an explicit curve. `B` for short Weierstrass and `d` for Twisted Edwards curves.

To be added.

## ECCurve.Cofactor field

```csharp
public byte[]? Cofactor;
```

The cofactor of the curve.

To be added.

## ECCurve.CurveType field

```csharp
public System.Security.Cryptography.ECCurve.ECCurveType CurveType;
```

Identifies the composition of the `ECCurve` object.

To be added.

## ECCurve.G field

```csharp
public System.Security.Cryptography.ECPoint G;
```

The generator, or base point, for operations on the curve.

To be added.

## ECCurve.Hash field

```csharp
public System.Security.Cryptography.HashAlgorithmName? Hash;
```

The name of the hash algorithm which was used to generate the curve coefficients (`ECCurve.A` and `ECCurve.B`) from the `ECCurve.Seed` under the ANSI X9.62 generation algorithm. Applies only to explicit curves.

To be added.

## ECCurve.Order field

```csharp
public byte[]? Order;
```

The order of the curve. Applies only to explicit curves.

#### Remarks
The `Order` field represents the order of the group generated by G = (x,y).

## ECCurve.Polynomial field

```csharp
public byte[]? Polynomial;
```

The curve polynomial. Applies only to characteristic 2 curves.

To be added.

## ECCurve.Prime field

```csharp
public byte[]? Prime;
```

The prime specifying the base field. Applies only to prime curves.

To be added.

## ECCurve.Seed field

```csharp
public byte[]? Seed;
```

The seed value for coefficient generation under the ANSI X9.62 generation algorithm. Applies only to explicit curves.

To be added.
