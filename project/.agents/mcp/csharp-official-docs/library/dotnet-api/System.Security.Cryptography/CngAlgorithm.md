---
title: "CngAlgorithm class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngAlgorithm : IEquatable<System.Security.Cryptography.CngAlgorithm>
```

Encapsulates the name of an encryption algorithm.

#### Remarks
The `CngAlgorithm` class is a utility class. It consists of static properties, comparison methods, and a private, internally maintained, algorithm name string.

The static properties return `CngAlgorithm` objects. Each object's internal string is initialized to the algorithm name that corresponds to the name of the static property.

You can also use this class to create objects for algorithm types that are not covered by the static properties.

Several Cryptography Next Generation (CNG) classes (such as `CngKey`) accept `CngAlgorithm` objects through an `algorithm` parameter. When the class receives the `CngAlgorithm` object, it retrieves the embedded algorithm name by calling the object's `Algorithm` property.

Therefore, `CngAlgorithm` serves as an enumeration of well-known algorithms. It lets you specify a well-known algorithm by using a strongly typed value instead of a string.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngAlgorithm.CngAlgorithm(String) constructor

```csharp
public CngAlgorithm (string algorithm);
```

Initializes a new instance of the `CngAlgorithm` class.

Parameters:

- `algorithm`: The name of the algorithm to initialize.

Exceptions:

- `ArgumentNullException`: The `algorithm` parameter is `null`.
- `ArgumentException`: The `algorithm` parameter length is 0 (zero).

#### Remarks
Instances of the `CngAlgorithm` class internally maintain the algorithm name that is specified by the `algorithm` parameter.

The primary purpose of this constructor is to provide a method for creating `CngAlgorithm` objects for algorithm types that are not represented by the static properties of the `CngAlgorithm` class. This capacity enables future .NET releases and third-party developers to add new algorithms, which can be accessed just like the algorithms that are currently available.

## CngAlgorithm.Algorithm property

```csharp
public string Algorithm { get; }
```

Gets the algorithm name that the current `CngAlgorithm` object specifies.

Returns: The embedded algorithm name.

To be added.

## CngAlgorithm.CompositeMLDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithm CompositeMLDsa { get; }
```

To be added.

Returns: To be added.

To be added.

## CngAlgorithm.CompositeMLKem property

```csharp
public static System.Security.Cryptography.CngAlgorithm CompositeMLKem { get; }
```

To be added.

Returns: To be added.

To be added.

## CngAlgorithm.ECDiffieHellman property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDiffieHellman { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Diffie-Hellman (ECDH) key <example-value> algorithm whose curve is described via a key property.

Returns: An object that specifies an ECDH key <example-value> algorithm whose curve is described via a key property.

To be added.

## CngAlgorithm.ECDiffieHellmanP256 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDiffieHellmanP256 { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Diffie-Hellman (ECDH) key <example-value> algorithm that uses the P-256 curve.

Returns: An object that specifies an ECDH algorithm that uses the P-256 curve.

To be added.

## CngAlgorithm.ECDiffieHellmanP384 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDiffieHellmanP384 { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Diffie-Hellman (ECDH) key <example-value> algorithm that uses the P-384 curve.

Returns: An object that specifies an ECDH algorithm that uses the P-384 curve.

To be added.

## CngAlgorithm.ECDiffieHellmanP521 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDiffieHellmanP521 { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Diffie-Hellman (ECDH) key <example-value> algorithm that uses the P-521 curve.

Returns: An object that specifies an ECDH algorithm that uses the P-521 curve.

To be added.

## CngAlgorithm.ECDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDsa { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Digital Signature Algorithm (ECDSA) whose curve is described via a key property.

Returns: An object that specifies an ECDSA whose curve is described via a key property.

To be added.

## CngAlgorithm.ECDsaP256 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDsaP256 { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Digital Signature Algorithm (ECDSA) that uses the P-256 curve.

Returns: An object that specifies an ECDSA algorithm that uses the P-256 curve.

To be added.

## CngAlgorithm.ECDsaP384 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDsaP384 { get; }
```

Gets a `CngAlgorithm` object that specifies an Elliptic Curve Digital Signature Algorithm (ECDSA) that uses the P-384 curve.

Returns: An object that specifies an ECDSA algorithm that uses the P-384 curve.

To be added.

## CngAlgorithm.ECDsaP521 property

```csharp
public static System.Security.Cryptography.CngAlgorithm ECDsaP521 { get; }
```

Gets a new `CngAlgorithm` object that specifies an Elliptic Curve Digital Signature Algorithm (ECDSA) that uses the P-521 curve.

Returns: An object that specifies an ECDSA algorithm that uses the P-521 curve.

To be added.

## CngAlgorithm.MD5 property

```csharp
public static System.Security.Cryptography.CngAlgorithm MD5 { get; }
```

Gets a new `CngAlgorithm` object that specifies the Message Digest 5 (MD5) hash algorithm.

Returns: An object that specifies the MD5 algorithm.

Due to collision problems with MD5, Microsoft recommends a security model based on SHA-256.

## CngAlgorithm.MLDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithm MLDsa { get; }
```

Gets a new `CngAlgorithm` object that specifies the Module-Lattice-Based Digital Signature Algorithm (ML-DSA).

Returns: A new `CngAlgorithm` object that specifies the Module-Lattice-Based Digital Signature Algorithm (ML-DSA).

To be added.

## CngAlgorithm.MLKem property

```csharp
public static System.Security.Cryptography.CngAlgorithm MLKem { get; }
```

Gets a new `CngAlgorithm` object that specifies the Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM).

Returns: A new `CngAlgorithm` object that specifies the Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM).

To be added.

## CngAlgorithm.Rsa property

```csharp
public static System.Security.Cryptography.CngAlgorithm Rsa { get; }
```

Gets a new `CngAlgorithm` object that specifies the RSA hash algorithm.

Returns: An object that specifies the RSA algorithm.

To be added.

## CngAlgorithm.Sha1 property

```csharp
public static System.Security.Cryptography.CngAlgorithm Sha1 { get; }
```

Gets a new `CngAlgorithm` object that specifies the Secure Hash Algorithm 1 (SHA-1) algorithm.

Returns: An object that specifies the SHA-1 algorithm.

Due to collision problems with SHA-1, Microsoft recommends SHA-256.

## CngAlgorithm.Sha256 property

```csharp
public static System.Security.Cryptography.CngAlgorithm Sha256 { get; }
```

Gets a new `CngAlgorithm` object that specifies the Secure Hash Algorithm 256 (SHA-256) algorithm.

Returns: An object that specifies the SHA-256 algorithm.

To be added.

## CngAlgorithm.Sha384 property

```csharp
public static System.Security.Cryptography.CngAlgorithm Sha384 { get; }
```

Gets a new `CngAlgorithm` object that specifies the Secure Hash Algorithm 384 (SHA-384) algorithm.

Returns: An object that specifies the SHA-384 algorithm.

To be added.

## CngAlgorithm.Sha512 property

```csharp
public static System.Security.Cryptography.CngAlgorithm Sha512 { get; }
```

Gets a new `CngAlgorithm` object that specifies the Secure Hash Algorithm 512 (SHA-512) algorithm.

Returns: An object that specifies the SHA-512 algorithm.

To be added.

## CngAlgorithm.SlhDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithm SlhDsa { get; }
```

Gets a new `CngAlgorithm` object that specifies the Stateless Hash-Based Digital Signature Algorithm (SLH-DSA).

Returns: A new `CngAlgorithm` object that specifies the Stateless Hash-Based Digital Signature Algorithm (SLH-DSA).

To be added.

## CngAlgorithm.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to the current `CngAlgorithm` object.

Parameters:

- `obj`: An object to be compared to the current `CngAlgorithm` object.

Returns: `true` if the `obj` parameter is a `CngAlgorithm` that specifies the same algorithm as the current object; otherwise, `false`.

To be added.

## CngAlgorithm.Equals(CngAlgorithm) method

```csharp
public bool Equals (System.Security.Cryptography.CngAlgorithm? other);
```

Compares the specified `CngAlgorithm` object to the current `CngAlgorithm` object.

Parameters:

- `other`: An object to be compared to the current `CngAlgorithm` object.

Returns: `true` if the `other` parameter specifies the same algorithm as the current object; otherwise, `false`.

To be added.

## CngAlgorithm.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash value for the algorithm name that is embedded in the current `CngAlgorithm` object.

Returns: The hash value of the embedded algorithm name.

To be added.

## CngAlgorithm.op_Equality(CngAlgorithm, CngAlgorithm) method

```csharp
public static bool operator == (System.Security.Cryptography.CngAlgorithm? left, System.Security.Cryptography.CngAlgorithm? right);
```

Determines whether two `CngAlgorithm` objects specify the same algorithm name.

Parameters:

- `left`: An object that specifies an algorithm name.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects specify the same algorithm name; otherwise, `false`.

To be added.

## CngAlgorithm.op_Inequality(CngAlgorithm, CngAlgorithm) method

```csharp
public static bool operator != (System.Security.Cryptography.CngAlgorithm? left, System.Security.Cryptography.CngAlgorithm? right);
```

Determines whether two `CngAlgorithm` objects do not specify the same algorithm.

Parameters:

- `left`: An object that specifies an algorithm name.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects do not specify the same algorithm name; otherwise, `false`.

To be added.

## CngAlgorithm.ToString() method

```csharp
public override string ToString ();
```

Gets the name of the algorithm that the current `CngAlgorithm` object specifies.

Returns: The embedded algorithm name.

To be added.
