---
title: "HMAC class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HMAC.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HMAC class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class HMAC : System.Security.Cryptography.KeyedHashAlgorithm
```

Represents the abstract class from which all implementations of Hash-based Message Authentication Code (HMAC) must derive.

#### Remarks
A Hash-based Message Authentication Code (HMAC) can be used to determine whether a message sent over an insecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and the HMAC as a single message. The receiver recomputes the hash value on the received message and checks that the computed hash value matches the transmitted hash value.

HMAC can be used with any iterative cryptographic hash function, such as MD5 or SHA-1, in combination with a secret <example-value> key. The cryptographic strength of HMAC depends on the properties of the underlying hash function.

Any change to the data or the hash value results in a mismatch, because knowledge of the secret key is required to change the message and reproduce the correct hash value. Therefore, if the original and computed hash values match, the message is authenticated.

Due to collision problems with MD5 and SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HMAC.HMAC() constructor

```csharp
protected HMAC ();
```

Initializes a new instance of the `HMAC` class.

To be added.

## HMAC.BlockSizeValue property

```csharp
protected int BlockSizeValue { get; set; }
```

Gets or sets the block size to use in the hash value.

Returns: The block size to use in the hash value.

#### Remarks
A Hash-based Message Authentication Code (HMAC) uses a hash function where data is hashed by iterating a basic <example-value> function on blocks of data. `HMAC.BlockSizeValue` is the byte size of such a block. Its value is 64 bytes.

## HMAC.HashName property

```csharp
public string HashName { get; set; }
```

Gets or sets the name of the hash algorithm to use for hashing.

Returns: The name of the hash algorithm.

Exceptions:

- `CryptographicException`: The current hash algorithm cannot be changed.

To be added.

## HMAC.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key to use in the HMAC calculation.

Returns: The key to use in the HMAC calculation.

Exceptions:

- `CryptographicException`: An attempt is made to change the `HMAC.Key` property after hashing has begun.

#### Remarks
This property is the key for the keyed hash algorithm.

A Hash-based Message Authentication Code (HMAC) can be used to determine whether a message sent over an insecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and the HMAC as a single message. The receiver recomputes the hash value on the received message and checks that the computed hash value matches the transmitted hash value.

HMAC can be used with any iterative cryptographic hash function, such as MD5 or SHA-1, in combination with a secret <example-value> key. The cryptographic strength of HMAC depends on the properties of the underlying hash function.

Any change to the data or the hash value results in a mismatch, because knowledge of the secret key is required to change the message and reproduce the correct hash value. Therefore, if the original and computed hash values match, the message is authenticated.

Due to collision problems with MD5 and SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HMAC.Create() method

```csharp
public static System.Security.Cryptography.HMAC Create ();
```

Creates an instance of the default implementation of a Hash-based Message Authentication Code (HMAC).

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## HMAC.Create(String) method

```csharp
public static System.Security.Cryptography.HMAC? Create (string algorithmName);
```

Creates an instance of the specified implementation of a Hash-based Message Authentication Code (HMAC).

Parameters:

- `algorithmName`: The HMAC implementation to use. The following table shows the valid values for the `algorithmName` parameter and the algorithms they map to.

-  System.Security.Cryptography.HMAC

: `HMACSHA1`
-  System.Security.Cryptography.KeyedHashAlgorithm

: `HMACSHA1`
-  HMACMD5

: `HMACMD5`
-  System.Security.Cryptography.HMACMD5

: `HMACMD5`
-  HMACRIPEMD160

: `HMACRIPEMD160`
-  System.Security.Cryptography.HMACRIPEMD160

: `HMACRIPEMD160`
-  HMACSHA1

: `HMACSHA1`
-  System.Security.Cryptography.HMACSHA1

: `HMACSHA1`
-  HMACSHA256

: `HMACSHA256`
-  System.Security.Cryptography.HMACSHA256

: `HMACSHA256`
-  HMACSHA384

: `HMACSHA384`
-  System.Security.Cryptography.HMACSHA384

: `HMACSHA384`
-  HMACSHA512

: `HMACSHA512`
-  System.Security.Cryptography.HMACSHA512

: `HMACSHA512`
-  MACTripleDES

: `MACTripleDES`
-  System.Security.Cryptography.MACTripleDES

: `MACTripleDES`

Returns: A new instance of the specified HMAC implementation.

To be added.

## HMAC.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HMAC` class when a key <example-value> is legitimate and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HMAC` references. This method invokes the `Dispose()` method of each referenced object.

## HMAC.HashCore(Byte>) method

```csharp
protected override void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the HMAC algorithm for computing the HMAC.

Parameters:

- `source`: The input to compute the HMAC code for.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
The default implementation of this method throws a `PlatformNotSupportedException`
because there is no managed implementation of HMAC.

Derived types must override this method.

## HMAC.HashCore(Byte[], Int32, Int32) method

```csharp
protected override void HashCore (byte[] rgb, int ib, int cb);
```

When overridden in a derived class, routes data written to the object into the HMAC algorithm for computing the HMAC value.

Parameters:

- `rgb`: The input data.
- `ib`: The offset into the byte array from which to begin using data.
- `cb`: The number of bytes in the array to use as data.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
This method is not called by application code.

## HMAC.HashFinal() method

```csharp
protected override byte[] HashFinal ();
```

When overridden in a derived class, finalizes the HMAC computation after the last data is processed by the algorithm.

Returns: The computed HMAC value in a byte array.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
This method is not called by application code. This method finalizes any partial computation and returns the correct hash value of the data stream.

## HMAC.Initialize() method

```csharp
public override void Initialize ();
```

Initializes an instance of the default implementation of `HMAC`.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

#### Remarks
A Hash-based Message Authentication Code (HMAC) can be used to determine whether a message sent over an insecure channel has been tampered with, provided that the sender and receiver share a secret key. The sender computes the hash value for the original data and sends both the original data and the HMAC as a single message. The receiver recomputes the hash value on the received message and checks that the computed hash value matches the transmitted hash value.

HMAC can be used with any iterative cryptographic hash function, such as MD5 or SHA-1, in combination with a secret <example-value> key. The cryptographic strength of HMAC depends on the properties of the underlying hash function.

Any change to the data or the hash value will result in a mismatch, because knowledge of the secret key is required to change the message and reproduce the correct hash value. Therefore, if the original and computed hash values match, the message is authenticated.

Due to collision problems with MD5 and SHA-1, Microsoft recommends a security model based on SHA-256 or better.

## HMAC.TryHashFinal(Byte>, Int32) method

```csharp
protected override bool TryHashFinal (Span<byte> destination, out int bytesWritten);
```

Attempts to finalize the HMAC computation after the last data is processed by the HMAC algorithm.

Parameters:

- `destination`: The buffer to receive the HMAC value.
- `bytesWritten`: When this method returns, contains the total number of bytes written into `destination`. This parameter is treated as uninitialized.

Returns: `true` if `destination` is long enough to receive the HMAC value; otherwise, `false`.

Exceptions:

- `PlatformNotSupportedException`: The method is not overriden in the derived type.

#### Remarks
The default implementation of this method throws a `PlatformNotSupportedException`
because there is no managed implementation of HMAC.

Derived types must override this method.
