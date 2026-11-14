---
title: "ProtectedData class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ProtectedData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProtectedData class

Namespace: `System.Security.Cryptography`

```csharp
public static class ProtectedData
```

Provides methods for encrypting and decrypting data. This class cannot be inherited.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks

This class provides access to the Data Protection API (DPAPI) available in Windows operating systems. This is a service that is provided by the operating system and does not require additional libraries. It provides protection using the user or machine credentials to encrypt or decrypt data.

> **Important:**
> Because it depends on DPAPI, the `ProtectedData` class is supported on the Windows platform only. Using this class on platforms other than Windows throws a `PlatformNotSupportedException`.

The class consists of two wrappers for the unmanaged DPAPI, `ProtectedData.Protect` and `ProtectedData.Unprotect`. These two methods can be used to encrypt and decrypt data such as passwords, keys, and connection strings.

If you use these methods during impersonation, you may receive the following error: "Key not valid for use in specified state." This occurs because the DPAPI stores the key data in user profiles. If the profile is not loaded, DPAPI won't be able to perform the decryption. To prevent this error, load the profile of the user you want to impersonate before calling either method. Using DPAPI with impersonation can incur significant complication and requires careful design choices.

#### Examples
The following example shows how to use data protection.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DataProtectionScope/Overview/dataprotectionsample.cs._

## ProtectedData.Protect(Byte[], Byte[], DataProtectionScope) method

```csharp
public static byte[] Protect (byte[] userData, byte[]? optionalEntropy, System.Security.Cryptography.DataProtectionScope scope);
```

Encrypts the data in a specified byte array and returns a byte array that contains the encrypted data.

Parameters:

- `userData`: A byte array that contains data to encrypt.
- `optionalEntropy`: An optional additional byte array used to increase the complexity of the encryption, or `null` for no additional complexity.
- `scope`: One of the enumeration values that specifies the scope of encryption.

Returns: A byte array representing the encrypted data.

Exceptions:

- `ArgumentNullException`: The `userData` parameter is `null`.
- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
This method can be used to encrypt data such as passwords, keys, or connection strings. The `optionalEntropy` parameter enables you to add data to increase the complexity of the encryption; specify `null` for no additional complexity. If provided, this information must also be used when decrypting the data using the `ProtectedData.Unprotect` method.

> **Note:**
> If you use this method during impersonation, you may receive the following error: "Key not valid for use in specified state." To prevent this error, load the profile of the user you want to impersonate before calling the method.

#### Examples
The following example shows how to use data protection.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DataProtectionScope/Overview/dataprotectionsample.cs._

## ProtectedData.Protect(Byte>, DataProtectionScope, Byte>) method

```csharp
public static byte[] Protect (ReadOnlySpan<byte> userData, System.Security.Cryptography.DataProtectionScope scope, ReadOnlySpan<byte> optionalEntropy = default);
```

Encrypts the data in a specified byte span and returns a byte array that contains the encrypted data.

Parameters:

- `userData`: A buffer that contains the data to encrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `optionalEntropy`: An optional additional byte span used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: A byte array representing the encrypted data.

Exceptions:

- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.

## ProtectedData.Protect(Byte>, DataProtectionScope, Byte>, Byte>) method

```csharp
public static int Protect (ReadOnlySpan<byte> userData, System.Security.Cryptography.DataProtectionScope scope, Span<byte> destination, ReadOnlySpan<byte> optionalEntropy = default);
```

Encrypts the data in a specified buffer and writes the encrypted data to a destination buffer.

Parameters:

- `userData`: A buffer that contains data to encrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `destination`: The buffer to receive the encrypted data.
- `optionalEntropy`: An optional additional buffer used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: The total number of bytes written to `destination`

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encrypted data.
- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.

## ProtectedData.TryProtect(Byte>, DataProtectionScope, Byte>, Int32, Byte>) method

```csharp
public static bool TryProtect (ReadOnlySpan<byte> userData, System.Security.Cryptography.DataProtectionScope scope, Span<byte> destination, out int bytesWritten, ReadOnlySpan<byte> optionalEntropy = default);
```

Encrypts the data in a specified buffer and writes the encrypted data to a destination buffer.

Parameters:

- `userData`: A buffer that contains data to encrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `destination`: The buffer to receive the encrypted data.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.
- `optionalEntropy`: An optional additional buffer used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the encrypted data.
- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.

## ProtectedData.TryUnprotect(Byte>, DataProtectionScope, Byte>, Int32, Byte>) method

```csharp
public static bool TryUnprotect (ReadOnlySpan<byte> encryptedData, System.Security.Cryptography.DataProtectionScope scope, Span<byte> destination, out int bytesWritten, ReadOnlySpan<byte> optionalEntropy = default);
```

Decrypts the data in a specified buffer and writes the decrypted data to a destination buffer.

Parameters:

- `encryptedData`: A buffer that contains data to decrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `destination`: The buffer to receive the decrypted data.
- `bytesWritten`: When this method returns, contains the number of bytes written to `destination`.
- `optionalEntropy`: An optional additional buffer used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: `true` if `destination` was large enough to receive the decrypted data; otherwise, `false`.

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the decrypted data.
- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.

## ProtectedData.Unprotect(Byte[], Byte[], DataProtectionScope) method

```csharp
public static byte[] Unprotect (byte[] encryptedData, byte[]? optionalEntropy, System.Security.Cryptography.DataProtectionScope scope);
```

Decrypts the data in a specified byte array and returns a byte array that contains the decrypted data.

Parameters:

- `encryptedData`: A byte array containing data encrypted using the `ProtectedData.Protect` method.
- `optionalEntropy`: An optional additional byte array that was used to encrypt the data, or `null` if the additional byte array was not used.
- `scope`: One of the enumeration values that specifies the scope of data protection that was used to encrypt the data.

Returns: A byte array representing the decrypted data.

Exceptions:

- `ArgumentNullException`: The `encryptedData` parameter is `null`.
- `CryptographicException`: The decryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: Out of memory.
- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
This method can be used to unprotect data that was encrypted using the `ProtectedData.Protect` method. If the `optionalEntropy` parameter was used during encryption, it must be supplied to unencrypt the data.

> **Note:**
>  If you use this method during impersonation, you may receive the following error: "Key not valid for use in specified state." To prevent this error, load the profile of the user you want to impersonate before calling the method.

#### Examples
The following code example shows how to use data protection.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DataProtectionScope/Overview/dataprotectionsample.cs._

## ProtectedData.Unprotect(Byte>, DataProtectionScope, Byte>) method

```csharp
public static byte[] Unprotect (ReadOnlySpan<byte> encryptedData, System.Security.Cryptography.DataProtectionScope scope, ReadOnlySpan<byte> optionalEntropy = default);
```

Decrypts the data in a specified byte array and returns a byte array that contains the decrypted data.

Parameters:

- `encryptedData`: A buffer that contains data to decrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `optionalEntropy`: An optional additional buffer used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: A byte array representing the encrypted data.

Exceptions:

- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while decrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.

## ProtectedData.Unprotect(Byte>, DataProtectionScope, Byte>, Byte>) method

```csharp
public static int Unprotect (ReadOnlySpan<byte> encryptedData, System.Security.Cryptography.DataProtectionScope scope, Span<byte> destination, ReadOnlySpan<byte> optionalEntropy = default);
```

Decrypts the data in a specified buffer and writes the decrypted data to a destination buffer.

Parameters:

- `encryptedData`: A buffer that contains data to decrypt.
- `scope`: One of the enumeration values that specifies the scope of encryption.
- `destination`: The buffer to receive the decrypted data.
- `optionalEntropy`: An optional additional buffer used to increase the complexity of the encryption, or empty for no additional complexity.

Returns: The total number of bytes written to `destination`

Exceptions:

- `ArgumentException`: The buffer in `destination` is too small to hold the decrypted data.
- `CryptographicException`: The encryption failed.
- `NotSupportedException`: The operating system does not support this method.
- `OutOfMemoryException`: The system ran out of memory while encrypting the data.
- `PlatformNotSupportedException`: The operating system is not Windows.

To be added.
