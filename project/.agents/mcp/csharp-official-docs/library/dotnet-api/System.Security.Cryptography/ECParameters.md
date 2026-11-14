---
title: "ECParameters struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECParameters struct

Namespace: `System.Security.Cryptography`

```csharp
public struct ECParameters
```

Represents the standard parameters for the elliptic curve cryptography (ECC) algorithm.

To be added.

## ECParameters.Validate() method

```csharp
public void Validate ();
```

Validates the current object.

Exceptions:

- `CryptographicException`: The key or curve parameters are not valid for the current curve type.

#### Remarks
The `ECParameters.Validate` method checks the integrity of the `ECParameters` structure, throwing a `CryptographicException` when it is not valid. The following are the requirements:

-   `Q`.`X` and `Q`.`Y` are required fields and must have the same length.

- If the curve is an explicit curve, `D` is required and must have the same length as `Curve`.`Order`.

- If the curve is a named curve, `D` is required and must have the same length as `Q`.`X` and `Q`.`Y`.

-   `Curve`.`ECCurve.Validate` must also succeed.

## ECParameters.Curve field

```csharp
public System.Security.Cryptography.ECCurve Curve;
```

Represents the curve associated with the public key (`ECParameters.Q`) and the optional private key (`ECParameters.D`).

To be added.

## ECParameters.D field

```csharp
public byte[]? D;
```

Represents the private key `D` for the elliptic curve cryptography (ECC) algorithm, stored in big-endian format.

To be added.

## ECParameters.Q field

```csharp
public System.Security.Cryptography.ECPoint Q;
```

Represents the public key `Q` for the elliptic curve cryptography (ECC) algorithm.

To be added.
