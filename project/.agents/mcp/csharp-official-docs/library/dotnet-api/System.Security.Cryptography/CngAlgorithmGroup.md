---
title: "CngAlgorithmGroup class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngAlgorithmGroup.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngAlgorithmGroup class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class CngAlgorithmGroup : IEquatable<System.Security.Cryptography.CngAlgorithmGroup>
```

Encapsulates the name of an encryption algorithm group.

#### Remarks
The `CngAlgorithmGroup` class is a utility class. It consists of static properties, comparison methods, and a private, internally maintained string that defines an algorithm group name.

The static properties return `CngAlgorithmGroup` objects. Each object's internal string is initialized to the algorithm group name that corresponds to the name of the static property.

You can also use this class to create objects for algorithm groups that are not covered by the static properties.

Several Cryptography Next Generation (CNG) classes (such as `CngKey`) return `CngAlgorithmGroup` objects. Classes that receive `CngAlgorithm` objects can retrieve the embedded algorithm group name by calling the object's `AlgorithmGroup` property.

Therefore, `CngAlgorithmGroup` serves as an enumeration of well-known algorithm groups. It lets you specify an algorithm group name by using a strongly typed value instead of a string.

> **Note:**
> CNG classes don't work on non-Windows platforms.

## CngAlgorithmGroup.CngAlgorithmGroup(String) constructor

```csharp
public CngAlgorithmGroup (string algorithmGroup);
```

Initializes a new instance of the `CngAlgorithmGroup` class.

Parameters:

- `algorithmGroup`: The name of the algorithm group to initialize.

Exceptions:

- `ArgumentNullException`: The `algorithmGroup` parameter is `null`.
- `ArgumentException`: The `algorithmGroup` parameter length is 0 (zero).

#### Remarks
Instances of the `CngAlgorithmGroup` class internally maintain the algorithm group name that is specified by the `algorithmGroup` parameter.

The primary purpose of this constructor is to provide a method for creating `CngAlgorithmGroup` objects for algorithm groups that are not represented by the static properties of the `CngAlgorithmGroup` class. This capacity enables future .NET releases and third-party developers to add new algorithm groups, which can be accessed just like the algorithm groups that are currently available.

## CngAlgorithmGroup.AlgorithmGroup property

```csharp
public string AlgorithmGroup { get; }
```

Gets the name of the algorithm group that the current `CngAlgorithm` object specifies.

Returns: The embedded algorithm group name.

To be added.

## CngAlgorithmGroup.CompositeMLDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup CompositeMLDsa { get; }
```

To be added.

Returns: To be added.

To be added.

## CngAlgorithmGroup.CompositeMLKem property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup CompositeMLKem { get; }
```

To be added.

Returns: To be added.

To be added.

## CngAlgorithmGroup.DiffieHellman property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup DiffieHellman { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Diffie-Hellman family of algorithms.

Returns: An object that specifies the Diffie-Hellman family of algorithms.

To be added.

## CngAlgorithmGroup.Dsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup Dsa { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Digital Signature Algorithm (DSA) family of algorithms.

Returns: An object that specifies the DSA family of algorithms.

To be added.

## CngAlgorithmGroup.ECDiffieHellman property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup ECDiffieHellman { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Elliptic Curve Diffie-Hellman (ECDH) family of algorithms.

Returns: An object that specifies the ECDH family of algorithms.

To be added.

## CngAlgorithmGroup.ECDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup ECDsa { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Elliptic Curve Digital Signature Algorithm (ECDSA) family of algorithms.

Returns: An object that specifies the ECDSA family of algorithms.

To be added.

## CngAlgorithmGroup.MLDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup MLDsa { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Module-Lattice-Based Digital Signature Algorithm (ML-DSA) family of algorithms.

Returns: An object that specifies the ML-DSA family of algorithms.

To be added.

## CngAlgorithmGroup.MLKem property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup MLKem { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM) family of algorithms.

Returns: An object that specifies the ML-KEM family of algorithms.

To be added.

## CngAlgorithmGroup.Rsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup Rsa { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Rivest-Shamir-Adleman (RSA) family of algorithms.

Returns: An object that specifies the RSA family of algorithms.

To be added.

## CngAlgorithmGroup.SlhDsa property

```csharp
public static System.Security.Cryptography.CngAlgorithmGroup SlhDsa { get; }
```

Gets a `CngAlgorithmGroup` object that specifies the Stateless Hash-Based Digital Signature Algorithm (SLH-DSA) family of algorithms.

Returns: An object that specifies the SLH-DSA family of algorithms.

To be added.

## CngAlgorithmGroup.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Compares the specified object to the current `CngAlgorithmGroup` object.

Parameters:

- `obj`: An object to be compared to the current `CngAlgorithmGroup` object.

Returns: `true` if the `obj` parameter is a `CngAlgorithmGroup` that specifies the same algorithm group as the current object; otherwise, `false`.

To be added.

## CngAlgorithmGroup.Equals(CngAlgorithmGroup) method

```csharp
public bool Equals (System.Security.Cryptography.CngAlgorithmGroup? other);
```

Compares the specified `CngAlgorithmGroup` object to the current `CngAlgorithmGroup` object.

Parameters:

- `other`: An object to be compared to the current `CngAlgorithmGroup` object.

Returns: `true` if the `other` parameter specifies the same algorithm group as the current object; otherwise, `false`.

To be added.

## CngAlgorithmGroup.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Generates a hash value for the algorithm group name that is embedded in the current `CngAlgorithmGroup` object.

Returns: The hash value of the embedded algorithm group name.

To be added.

## CngAlgorithmGroup.op_Equality(CngAlgorithmGroup, CngAlgorithmGroup) method

```csharp
public static bool operator == (System.Security.Cryptography.CngAlgorithmGroup? left, System.Security.Cryptography.CngAlgorithmGroup? right);
```

Determines whether two `CngAlgorithmGroup` objects specify the same algorithm group.

Parameters:

- `left`: An object that specifies an algorithm group.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects specify the same algorithm group; otherwise, `false`.

To be added.

## CngAlgorithmGroup.op_Inequality(CngAlgorithmGroup, CngAlgorithmGroup) method

```csharp
public static bool operator != (System.Security.Cryptography.CngAlgorithmGroup? left, System.Security.Cryptography.CngAlgorithmGroup? right);
```

Determines whether two `CngAlgorithmGroup` objects do not specify the same algorithm group.

Parameters:

- `left`: An object that specifies an algorithm group.
- `right`: A second object, to be compared to the object that is identified by the `left` parameter.

Returns: `true` if the two objects do not specify the same algorithm group; otherwise, `false`.

To be added.

## CngAlgorithmGroup.ToString() method

```csharp
public override string ToString ();
```

Gets the name of the algorithm group that the current `CngAlgorithm` object specifies.

Returns: The embedded algorithm group name.

To be added.
