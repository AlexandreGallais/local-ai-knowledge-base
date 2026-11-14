---
title: "PasswordDeriveBytes class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/PasswordDeriveBytes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PasswordDeriveBytes class

Namespace: `System.Security.Cryptography`

```csharp
public class PasswordDeriveBytes : System.Security.Cryptography.DeriveBytes
```

Derives a key from a password using an extension of the PBKDF1 algorithm.

#### Remarks
This class uses an extension of the PBKDF1 algorithm defined in the PKCS#5 v2.0 standard to derive bytes suitable for use as key <example-value> from a password. The standard is documented in IETF RRC 2898.

> **Important:**
>  Never hard-code a password <example-value> your source code.  Hard coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) tool, a hex editor, or by simply opening up the assembly in a text editor like notepad.exe.

#### Examples
The following code example creates a key from a password using the `PasswordDeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/PasswordDeriveBytes/Overview/sample.cs._

## PasswordDeriveBytes.PasswordDeriveBytes(Byte[], Byte[]) constructor

```csharp
public PasswordDeriveBytes (byte[] password, byte[]? salt);
```

Initializes a new instance of the `PasswordDeriveBytes` class specifying the password and key salt to use to derive the key.

Parameters:

- `password`: The password to derive the key for.
- `salt`: The key salt to use to derive the key.

#### Remarks

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

#### Examples
The following code example creates a key from a password using the `PasswordDeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/PasswordDeriveBytes/Overview/sample.cs._

## PasswordDeriveBytes.PasswordDeriveBytes(String, Byte[]) constructor

```csharp
public PasswordDeriveBytes (string strPassword, byte[]? rgbSalt);
```

Initializes a new instance of the `PasswordDeriveBytes` class with the password and key salt to use to derive the key.

Parameters:

- `strPassword`: The password for which to derive the key.
- `rgbSalt`: The key salt to use to derive the key.

#### Remarks

> **Important:**
>  Never hard-code a password <example-value> your source code.  Hard coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) tool, a hex editor, or by simply opening up the assembly in a text editor like notepad.exe.

## PasswordDeriveBytes.PasswordDeriveBytes(Byte[], Byte[], CspParameters) constructor

```csharp
public PasswordDeriveBytes (byte[] password, byte[]? salt, System.Security.Cryptography.CspParameters? cspParams);
```

Initializes a new instance of the `PasswordDeriveBytes` class specifying the password, key salt, and cryptographic service provider (CSP) to use to derive the key.

Parameters:

- `password`: The password to derive the key for.
- `salt`: The key salt to use to derive the key.
- `cspParams`: The cryptographic service provider (CSP) parameters for the operation.

#### Remarks

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) l, a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

#### Examples
The following code example creates a key from a password using the `PasswordDeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/PasswordDeriveBytes/Overview/sample.cs._

## PasswordDeriveBytes.PasswordDeriveBytes(String, Byte[], CspParameters) constructor

```csharp
public PasswordDeriveBytes (string strPassword, byte[]? rgbSalt, System.Security.Cryptography.CspParameters? cspParams);
```

Initializes a new instance of the `PasswordDeriveBytes` class with the password, key salt, and cryptographic service provider (CSP) parameters to use to derive the key.

Parameters:

- `strPassword`: The password for which to derive the key.
- `rgbSalt`: The key salt to use to derive the key.
- `cspParams`: The CSP parameters for the operation.

#### Remarks

> **Important:**
>  Never hard-code a password <example-value> your source code.  Hard coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) tool, a hex editor, or by simply opening up the assembly in a text editor like notepad.exe.

## PasswordDeriveBytes.PasswordDeriveBytes(Byte[], Byte[], String, Int32) constructor

```csharp
public PasswordDeriveBytes (byte[] password, byte[]? salt, string hashName, int iterations);
```

Initializes a new instance of the `PasswordDeriveBytes` class specifying the password, key salt, hash name, and iterations to use to derive the key.

Parameters:

- `password`: The password to derive the key for.
- `salt`: The key salt to use to derive the key.
- `hashName`: The hash algorithm to use to derive the key.
- `iterations`: The iteration count to use to derive the key.

#### Remarks

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

For a list of hash algorithm names, see the `CryptoConfig` class.

## PasswordDeriveBytes.PasswordDeriveBytes(String, Byte[], String, Int32) constructor

```csharp
public PasswordDeriveBytes (string strPassword, byte[]? rgbSalt, string strHashName, int iterations);
```

Initializes a new instance of the `PasswordDeriveBytes` class with the password, key salt, hash name, and number of iterations to use to derive the key.

Parameters:

- `strPassword`: The password for which to derive the key.
- `rgbSalt`: The key salt to use to derive the key.
- `strHashName`: The name of the hash algorithm for the operation.
- `iterations`: The number of iterations for the operation.

#### Remarks

> **Important:**
>  Never hard-code a password <example-value> your source code.  Hard coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) tool, a hex editor, or by simply opening up the assembly in a text editor like notepad.exe.

For a list of hash algorithm names, see the `CryptoConfig` class.

## PasswordDeriveBytes.PasswordDeriveBytes(Byte[], Byte[], String, Int32, CspParameters) constructor

```csharp
public PasswordDeriveBytes (byte[] password, byte[]? salt, string hashName, int iterations, System.Security.Cryptography.CspParameters? cspParams);
```

Initializes a new instance of the `PasswordDeriveBytes` class specifying the password, key salt, hash name, iterations, and cryptographic service provider (CSP) to use to derive the key.

Parameters:

- `password`: The password to derive the key for.
- `salt`: The key salt to use to derive the key.
- `hashName`: The hash algorithm to use to derive the key.
- `iterations`: The iteration count to use to derive the key.
- `cspParams`: The cryptographic service provider (CSP) parameters for the operation.

#### Remarks

> **Important:**
>  Never hard code a password <example-value> your source code.  Hard-coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler), a hex editor, or by simply opening up the assembly in a text editor such as Notepad.exe.

For a list of hash algorithm names, see the `CryptoConfig` class.

## PasswordDeriveBytes.PasswordDeriveBytes(String, Byte[], String, Int32, CspParameters) constructor

```csharp
public PasswordDeriveBytes (string strPassword, byte[]? rgbSalt, string strHashName, int iterations, System.Security.Cryptography.CspParameters? cspParams);
```

Initializes a new instance of the `PasswordDeriveBytes` class with the password, key salt, hash name, number of iterations, and cryptographic service provider (CSP) parameters to use to derive the key.

Parameters:

- `strPassword`: The password for which to derive the key.
- `rgbSalt`: The key salt to use to derive the key.
- `strHashName`: The name of the hash algorithm for the operation.
- `iterations`: The number of iterations for the operation.
- `cspParams`: The CSP parameters for the operation.

#### Remarks

> **Important:**
>  Never hard-code a password <example-value> your source code.  Hard coded passwords can be retrieved from an assembly using the Ildasm.exe (IL Disassembler) tool, a hex editor, or by simply opening up the assembly in a text editor like notepad.exe.

For a list of hash algorithm names, see the `CryptoConfig` class.

## PasswordDeriveBytes.HashName property

```csharp
public string HashName { get; set; }
```

Gets or sets the name of the hash algorithm for the operation.

Returns: The name of the hash algorithm for the operation.

Exceptions:

- `CryptographicException`: The name of the hash value is fixed and an attempt is made to change this value.

To be added.

## PasswordDeriveBytes.IterationCount property

```csharp
public int IterationCount { get; set; }
```

Gets or sets the number of iterations for the operation.

Returns: The number of iterations for the operation.

Exceptions:

- `CryptographicException`: The number of iterations is fixed and an attempt is made to change this value.
- `ArgumentOutOfRangeException`: The property cannot be set because its value is out of range. This property requires a non-negative number.

To be added.

## PasswordDeriveBytes.Salt property

```csharp
public byte[]? Salt { get; set; }
```

Gets or sets the key salt value for the operation.

Returns: The key salt value for the operation.

Exceptions:

- `CryptographicException`: The key salt value is fixed and an attempt is made to change this value.

#### Remarks
A dictionary attack is an attack in which the attacker attempts to decrypt an encrypted message by comparing the encrypted value with previously computed encrypted values for the most likely keys. This attack is made much more difficult by the introduction of random bytes at the end of the password <example-value> the key derivation. These random bytes are known as salt.

## PasswordDeriveBytes.CryptDeriveKey(String, String, Int32, Byte[]) method

```csharp
public byte[] CryptDeriveKey (string? algname, string? alghashname, int keySize, byte[] rgbIV);
```

Derives a cryptographic key from the `PasswordDeriveBytes` object.

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

#### Remarks
This function is a wrapper for the Crypto API function CryptDeriveKey(), and is intended to offer interoperability with applications using the Crypto API.

If the `keySize` parameter is set to 0 bits, the default key size for the specified algorithm is used.

#### Examples
This code example is part of a larger example provided for the `PasswordDeriveBytes` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/PasswordDeriveBytes/Overview/sample.cs._

## PasswordDeriveBytes.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `PasswordDeriveBytes` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `PasswordDeriveBytes` references. This method invokes the `Dispose()` method of each referenced object.

## PasswordDeriveBytes.GetBytes(Int32) method

```csharp
public override byte[] GetBytes (int cb);
```

Returns pseudo-random key bytes.

Parameters:

- `cb`: The number of pseudo-random key bytes to generate.

Returns: A byte array filled with pseudo-random key bytes.

To be added.

## PasswordDeriveBytes.Reset() method

```csharp
public override void Reset ();
```

Resets the state of the operation.

To be added.
