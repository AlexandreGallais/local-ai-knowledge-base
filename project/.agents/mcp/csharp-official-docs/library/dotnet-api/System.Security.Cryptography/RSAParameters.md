---
title: "RSAParameters struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAParameters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAParameters struct

Namespace: `System.Security.Cryptography`

```csharp
public struct RSAParameters
```

Represents the standard parameters for the `RSA` algorithm.

The `RSAParameters` structure represents the standard parameters for the RSA algorithm.

The `RSA` class exposes an `RSA.ExportParameters` method that enables you to retrieve the raw RSA key in the form of an `RSAParameters` structure.

To understand the contents of this structure, it helps to be familiar with how the `RSA` algorithm works. The next section discusses the algorithm briefly.

#### RSA algorithm

To generate a key pair, you start by creating two large prime numbers named p and q. These numbers are multiplied and the result is called n. Because p and q are both prime numbers, the only factors of n are 1, p, q, and n.

If we consider only numbers that are less than n, the count of numbers that are relatively prime to n, that is, have no factors in common with n, equals (p - 1)(q - 1).

Now you choose a number e, which is relatively prime to the value you calculated. The public key is now represented as {e, n}.

To create the private key, you must calculate d, which is a number such that (d)(e) mod (p - 1)(q - 1) = 1. In accordance with the Euclidean algorithm, the private key is now {d, n}.

Encryption of plaintext m to ciphertext c is defined as c = (m ^ e) mod n. Decryption would then be defined as m = (c ^ d) mod n.

#### Summary of fields

Section A.1.2 of the PKCS #1: RSA Cryptography Standard defines a format for RSA private keys.

The following table summarizes the fields of the `RSAParameters` structure. The third column provides the corresponding field in section A.1.2 of PKCS #1: RSA Cryptography Standard.

| `RSAParameters` field    | Contains                | Corresponding PKCS #1 field |
| ---------------------------------------------------------- | ----------------------- | --------------------------- |
| `D`        | d, the private exponent | privateExponent             |
| `DP`       | d mod (p - 1)           | exponent1                   |
| `DQ`       | d mod (q - 1)           | exponent2                   |
| `Exponent` | e, the public exponent  | publicExponent              |
| `InverseQ` | (InverseQ)(q) = 1 mod p | coefficient                 |
| `Modulus`  | n                       | modulus                     |
| `P`        | p                       | prime1                      |
| `Q`        | q                       | prime2                      |

The security of RSA derives from the fact that, given the public key { e, n }, it is computationally infeasible to calculate d, either directly or by factoring n into p and q. Therefore, any part of the key <example-value> to d, p, or q must be kept secret. If you call `RSACryptoServiceProvider.ExportParameters` and ask for only the public key <example-value>, this is why you will receive only `Exponent` and `Modulus`. The other fields are available only if you have access to the private key, and you request it.

`RSAParameters` is not encrypted in any way, so you must be careful when you use it with the private key information. All members of `RSAParameters` are serialized. If anyone can derive or intercept the private key <example-value>, the key and all the information encrypted or signed with it are compromised.

## RSAParameters.D field

```csharp
public byte[]? D;
```

Represents the `D` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.DP field

```csharp
public byte[]? DP;
```

Represents the `DP` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.DQ field

```csharp
public byte[]? DQ;
```

Represents the `DQ` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.Exponent field

```csharp
public byte[]? Exponent;
```

Represents the `Exponent` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.InverseQ field

```csharp
public byte[]? InverseQ;
```

Represents the `InverseQ` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.Modulus field

```csharp
public byte[]? Modulus;
```

Represents the `Modulus` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.P field

```csharp
public byte[]? P;
```

Represents the `P` parameter for the `RSA` algorithm.

To be added.

## RSAParameters.Q field

```csharp
public byte[]? Q;
```

Represents the `Q` parameter for the `RSA` algorithm.

To be added.
