---
title: "HashAlgorithmName struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HashAlgorithmName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashAlgorithmName struct

Namespace: `System.Security.Cryptography`

```csharp
public readonly struct HashAlgorithmName : IEquatable<System.Security.Cryptography.HashAlgorithmName>
```

Specifies the name of a cryptographic hash algorithm.

#### Remarks
The `HashAlgorithmName` structure includes some static properties that return predefined hash algorithm names, as well as a `Name` property that can represent a custom hash algorithm name as a strongly-typed string. Hash algorithm names are case-sensitive.

Asymmetric algorithms implemented using Microsoft's CNG (Cryptographic Next Generation) API interpret the underlying string value as a CNG algorithm identifier.

Asymmetric algorithms implemented using other technologies:

- Must recognize at least "MD5", "SHA1", "SHA256", "SHA384", and "SHA512".
- Should recognize additional CNG identifiers for any additional hash algorithms that they support.

Due to collision problems with MD5 and SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HashAlgorithmName.HashAlgorithmName(String) constructor

```csharp
public HashAlgorithmName (string? name);
```

Initializes a new instance of the `HashAlgorithmName` structure with a custom name.

Parameters:

- `name`: The custom hash algorithm name.

#### Remarks
The constructor performs no validation on `name`.

## HashAlgorithmName.MD5 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName MD5 { get; }
```

Gets a hash algorithm name that represents "MD5".

Returns: A hash algorithm name that represents "MD5".

Due to collision problems with MD5, Microsoft recommends a security model based on SHA-256 or better.

## HashAlgorithmName.Name property

```csharp
public string? Name { get; }
```

Gets the underlying string representation of the algorithm name.

Returns: The string representation of the algorithm name, or `default` if no hash algorithm is available.

#### Remarks

May be `null` or empty to indicate that no hash algorithm is applicable.

## HashAlgorithmName.SHA1 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA1 { get; }
```

Gets a hash algorithm name that represents "SHA1".

Returns: A hash algorithm name that represents "SHA1".

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HashAlgorithmName.SHA256 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA256 { get; }
```

Gets a hash algorithm name that represents "SHA256".

Returns: A hash algorithm name that represents "SHA256".

To be added.

## HashAlgorithmName.SHA3_256 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA3_256 { get; }
```

Gets a `HashAlgorithmName` representing "SHA3-256"

Returns: To be added.

To be added.

## HashAlgorithmName.SHA3_384 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA3_384 { get; }
```

Gets a `HashAlgorithmName` representing "SHA3-384"

Returns: To be added.

To be added.

## HashAlgorithmName.SHA3_512 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA3_512 { get; }
```

Gets a `HashAlgorithmName` representing "SHA3-512"

Returns: To be added.

To be added.

## HashAlgorithmName.SHA384 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA384 { get; }
```

Gets a hash algorithm name that represents "SHA384".

Returns: A hash algorithm name that represents "SHA384".

To be added.

## HashAlgorithmName.SHA512 property

```csharp
public static System.Security.Cryptography.HashAlgorithmName SHA512 { get; }
```

Gets a hash algorithm name that represents "SHA512".

Returns: A hash algorithm name that represents "SHA512".

To be added.

## HashAlgorithmName.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if `obj` is a `HashAlgorithmName` object and its `HashAlgorithmName.Name` property is equal to that of the current instance. The comparison is ordinal and case-sensitive.

To be added.

## HashAlgorithmName.Equals(HashAlgorithmName) method

```csharp
public bool Equals (System.Security.Cryptography.HashAlgorithmName other);
```

Returns a value that indicates whether two `HashAlgorithmName` instances are equal.

Parameters:

- `other`: The object to compare with the current instance.

Returns: `true` if the `HashAlgorithmName.Name` property of `other` is equal to that of the current instance. The comparison is ordinal and case-sensitive.

To be added.

## HashAlgorithmName.FromOid(String) method

```csharp
public static System.Security.Cryptography.HashAlgorithmName FromOid (string oidValue);
```

Converts the specified OID to a hash algorithm name.

Parameters:

- `oidValue`: The OID of the hash algorithm.

Returns: The hash algorithm name identified by the OID.

Exceptions:

- `ArgumentNullException`: `oidValue` is `null`.
- `CryptographicException`: `oidValue` does not represent a known hash algorithm.

To be added.

## HashAlgorithmName.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current instance.

Returns: The hash code for the current instance, or 0 if no `name` value was supplied to the `HashAlgorithmName` constructor.

To be added.

## HashAlgorithmName.op_Equality(HashAlgorithmName, HashAlgorithmName) method

```csharp
public static bool operator == (System.Security.Cryptography.HashAlgorithmName left, System.Security.Cryptography.HashAlgorithmName right);
```

Determines whether two specified `HashAlgorithmName` objects are equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if both `left` and `right` have the same `HashAlgorithmName.Name` value; otherwise, `false`.

#### Remarks
The `HashAlgorithmName.op_Equality` method defines the operation of the equality operator for `HashAlgorithmName` values.

## HashAlgorithmName.op_Inequality(HashAlgorithmName, HashAlgorithmName) method

```csharp
public static bool operator != (System.Security.Cryptography.HashAlgorithmName left, System.Security.Cryptography.HashAlgorithmName right);
```

Determines whether two specified `HashAlgorithmName` objects are not equal.

Parameters:

- `left`: The first object to compare.
- `right`: The second object to compare.

Returns: `true` if both `left` and `right` do not have the same `HashAlgorithmName.Name` value; otherwise, `false`.

#### Remarks
The `HashAlgorithmName.op_Inequality` method defines the operation of the inequality operator for `HashAlgorithmName` values.

## HashAlgorithmName.ToString() method

```csharp
public override string ToString ();
```

Returns the string representation of the current `HashAlgorithmName` instance.

Returns: The string representation of the current `HashAlgorithmName` instance.

#### Remarks
The `HashAlgorithmName.ToString` method returns the `Name` property, if it has been assigned. Otherwise, it returns `Empty`.

## HashAlgorithmName.TryFromOid(String, HashAlgorithmName) method

```csharp
public static bool TryFromOid (string oidValue, out System.Security.Cryptography.HashAlgorithmName value);
```

Tries to convert the specified OID to a hash algorithm name.

Parameters:

- `oidValue`: The OID of the hash algorithm.
- `value`: When this method returns `true`, the hash algorithm. When this method returns `false`, contains `default`.

Returns: `true` if the OID was successfully mapped to a hash algorithm; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `oidValue` is `null`.

To be added.
