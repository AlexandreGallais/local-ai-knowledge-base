---
title: "Rfc2898DeriveBytes class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/Rfc2898DeriveBytes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rfc2898DeriveBytes class

Namespace: `System.Security.Cryptography`

```csharp
public class Rfc2898DeriveBytes : System.Security.Cryptography.DeriveBytes
```

Implements password-based key <example-value> functionality, PBKDF2, by using a pseudo-random number generator based on `HMACSHA1`.

#### Remarks
`Rfc2898DeriveBytes` takes a password, a salt, and an iteration count, and then generates keys through calls to the `Rfc2898DeriveBytes.GetBytes` method.

RFC 2898 includes methods for creating a key and initialization vector (IV) from a password and salt. You can use PBKDF2, a password-based key <example-value> function, to derive keys using a pseudo-random function that allows keys of virtually unlimited length to be generated. The `Rfc2898DeriveBytes` class can be used to produce a derived key from a base key and other parameters. In a password-based key <example-value> function, the base key is a password and the other parameters are a salt value and an iteration count.

For more information about PBKDF2, see RFC 2898, titled "<example-value>". See section 5.2, "<example-value>" for complete details.

> **Important:**
> Never hard-code a password <example-value> your source code. Hard-coded passwords can be retrieved from an assembly by using the Ildasm.exe (IL Disassembler), by using a hexadecimal editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

#### Examples
The following code example uses the `Rfc2898DeriveBytes` class to create two identical keys for the `Aes` class.  It then encrypts and decrypts some data using the keys.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Rfc2898DeriveBytes/Overview/rfc28981.cs._

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Byte[]) constructor

```csharp
public Rfc2898DeriveBytes (string password, byte[] salt);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using a password and salt to derive the key.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes or the iteration count is less than 1.
- `ArgumentNullException`: The password or salt is `null`.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Int32) constructor

```csharp
public Rfc2898DeriveBytes (string password, int saltSize);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using the password and salt size to derive the key.

Parameters:

- `password`: The password used to derive the key.
- `saltSize`: The size of the random salt that you want the class to generate.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes.
- `ArgumentNullException`: The password or salt is `null`.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(Byte[], Byte[], Int32) constructor

```csharp
public Rfc2898DeriveBytes (byte[] password, byte[] salt, int iterations);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using a password, a salt, and number of iterations to derive the key.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes or the iteration count is less than 1.
- `ArgumentNullException`: The password or salt is `null`.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Byte[], Int32) constructor

```csharp
public Rfc2898DeriveBytes (string password, byte[] salt, int iterations);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using a password, a salt, and number of iterations to derive the key.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes or the iteration count is less than 1.
- `ArgumentNullException`: The password or salt is `null`.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Int32, Int32) constructor

```csharp
public Rfc2898DeriveBytes (string password, int saltSize, int iterations);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using a password, a salt size, and number of iterations to derive the key.

Parameters:

- `password`: The password used to derive the key.
- `saltSize`: The size of the random salt that you want the class to generate.
- `iterations`: The number of iterations for the operation.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes or the iteration count is less than 1.
- `ArgumentNullException`: The password or salt is `null`.
- `ArgumentOutOfRangeException`: `iterations` is out of range. This parameter requires a non-negative number.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(Byte[], Byte[], Int32, HashAlgorithmName) constructor

```csharp
public Rfc2898DeriveBytes (byte[] password, byte[] salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using the specified password, salt, number of iterations and the hash algorithm name to derive the key.

Parameters:

- `password`: The password to use to derive the key.
- `salt`: The key salt to use to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.

Exceptions:

- `ArgumentException`: The `HashAlgorithmName.Name` property of `hashAlgorithm` is either `null` or `String.Empty`.
- `CryptographicException`: Hash algorithm name is invalid.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Byte[], Int32, HashAlgorithmName) constructor

```csharp
public Rfc2898DeriveBytes (string password, byte[] salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using the specified password, salt, number of iterations and the hash algorithm name to derive the key.

Parameters:

- `password`: The password to use to derive the key.
- `salt`: The key salt to use to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.

Exceptions:

- `ArgumentException`: The `HashAlgorithmName.Name` property of `hashAlgorithm` is either `null` or `String.Empty`.
- `CryptographicException`: Hash algorithm name is invalid.

To be added.

## Rfc2898DeriveBytes.Rfc2898DeriveBytes(String, Int32, Int32, HashAlgorithmName) constructor

```csharp
public Rfc2898DeriveBytes (string password, int saltSize, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `Rfc2898DeriveBytes` class using the specified password, salt size, number of iterations and the hash algorithm name to derive the key.

Parameters:

- `password`: The password to use to derive the key.
- `saltSize`: The size of the random salt that you want the class to generate.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.

Exceptions:

- `ArgumentOutOfRangeException`: `saltSize` is less than zero.
- `ArgumentException`: The `HashAlgorithmName.Name` property of `hashAlgorithm` is either `null` or `String.Empty`.
- `CryptographicException`: Hash algorithm name is invalid.

To be added.

## Rfc2898DeriveBytes.HashAlgorithm property

```csharp
public System.Security.Cryptography.HashAlgorithmName HashAlgorithm { get; }
```

Gets the hash algorithm used for byte derivation.

Returns: The hash algorithm used for byte derivation.

To be added.

## Rfc2898DeriveBytes.IterationCount property

```csharp
public int IterationCount { get; set; }
```

Gets or sets the number of iterations for the operation.

Returns: The number of iterations for the operation.

Exceptions:

- `ArgumentOutOfRangeException`: The number of iterations is less than 1.

#### Examples
The following example shows how to use the `IterationCount` property to display the number of iterations used in the generation of the key. This code example is part of a larger example provided for the `Rfc2898DeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Rfc2898DeriveBytes/Overview/rfc28981.cs._

## Rfc2898DeriveBytes.Salt property

```csharp
public byte[] Salt { get; set; }
```

Gets or sets the key salt value for the operation.

Returns: The key salt value for the operation.

Exceptions:

- `ArgumentException`: The specified salt size is smaller than 8 bytes.
- `ArgumentNullException`: The salt is `null`.

#### Remarks
Salt, a random set of bytes, is used to make unauthorized decrypting of a message more difficult. A dictionary attack is an attack in which the attacker attempts to decrypt an encrypted message by comparing the encrypted value with previously computed encrypted values for the most likely keys. This attack is made much more difficult by the introduction of salt, or random bytes, at the end of the password <example-value> the key derivation.

## Rfc2898DeriveBytes.CryptDeriveKey(String, String, Int32, Byte[]) method

```csharp
public byte[] CryptDeriveKey (string algname, string alghashname, int keySize, byte[] rgbIV);
```

Derives a cryptographic key from the `Rfc2898DeriveBytes` object.

Parameters:

- `algname`: The algorithm name for which to derive the key.
- `alghashname`: The hash algorithm name to use to derive the key.
- `keySize`: The size of the key, in bits, to derive.
- `rgbIV`: The initialization vector (IV) to use to derive the key.

Returns: The derived key.

Exceptions:

- `CryptographicException`: The `keySize` parameter is incorrect.

-or-

The cryptographic service provider (CSP) cannot be acquired.

-or-

The `algname` parameter is not a valid algorithm name.

-or-

The `alghashname` parameter is not a valid hash algorithm name.

To be added.

## Rfc2898DeriveBytes.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Rfc2898DeriveBytes` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `Rfc2898DeriveBytes` references. This method invokes the `Dispose()` method of each referenced object.

## Rfc2898DeriveBytes.GetBytes(Int32) method

```csharp
public override byte[] GetBytes (int cb);
```

Returns the pseudo-random key for this object.

Parameters:

- `cb`: The number of pseudo-random key bytes to generate.

Returns: A byte array filled with pseudo-random key bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `cb` is out of range. This parameter requires a non-negative number.

#### Remarks
The `Rfc2898DeriveBytes` class implements PBKDF2 functionality by using a pseudorandom number generator based on `HMACSHA1`. The `Rfc2898DeriveBytes` class takes a password, a salt, and an iteration count, and then generates keys through calls to the `Rfc2898DeriveBytes.GetBytes` method. Repeated calls to this method will not generate the same key; instead, appending two calls of the `Rfc2898DeriveBytes.GetBytes` method with a `cb` parameter value of `20` is the equivalent of calling the `Rfc2898DeriveBytes.GetBytes` method once with a `cb` parameter value of `40`.

#### Examples
The following example shows how to use the `Rfc2898DeriveBytes.GetBytes` method to get the key for an instance of `Rfc2898DeriveBytes`. This code example is part of a larger example provided for the `Rfc2898DeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/Rfc2898DeriveBytes/Overview/rfc28981.cs._

## Rfc2898DeriveBytes.Pbkdf2(Byte[], Byte[], Int32, HashAlgorithmName, Int32) method

```csharp
public static byte[] Pbkdf2 (byte[] password, byte[] salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, int outputLength);
```

Creates a PBKDF2 derived key from password bytes.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.
- `outputLength`: The size of the key to derive, in bytes.

Returns: A byte array containing the created PBKDF2 derived key.

Exceptions:

- `ArgumentNullException`: `password` or `salt` is `null`.
- `ArgumentOutOfRangeException`: `outputLength` is not zero or a positive value.

-or-

`iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.

To be added.

## Rfc2898DeriveBytes.Pbkdf2(Byte>, Byte>, Int32, HashAlgorithmName, Int32) method

```csharp
public static byte[] Pbkdf2 (ReadOnlySpan<byte> password, ReadOnlySpan<byte> salt, int iterations, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, int outputLength);
```

Creates a PBKDF2 derived key from password bytes.

Parameters:

- `password`: The password used to derive the key.
- `salt`: The key salt used to derive the key.
- `iterations`: The number of iterations for the operation.
- `hashAlgorithm`: The hash algorithm to use to derive the key.
- `outputLength`: The size of the key to derive, in bytes.

Returns: A byte array containing the created PBKDF2 derived key.

Exceptions:

- `ArgumentOutOfRangeException`: `outputLength` is not zero or a positive value.

-or-

`iterations` is not a positive value.
- `ArgumentException`: `hashAlgorithm` has a `HashAlgorithmName.Name` that is empty or `null`.
- `CryptographicException`: `hashAlgorithm` is an unsupported hash algorithm. Supported algorithms are `HashAlgorithmName.SHA1`, `HashAlgorithmName.SHA256`, `HashAlgorithmName.SHA384`, and `HashAlgorithmName.SHA512`.

To be added.
