---
title: "KeyedHashAlgorithm class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/KeyedHashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedHashAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class KeyedHashAlgorithm : System.Security.Cryptography.HashAlgorithm
```

Represents the abstract class from which all implementations of keyed hash algorithms must derive.

#### Remarks
Hash functions map binary strings of an arbitrary length to small binary strings of a fixed length. A cryptographic hash function has the property that it is computationally infeasible to find two distinct inputs that hash to the same value. Small changes to the data result in large, unpredictable changes in the hash.

A keyed hash algorithm is a key-dependent, one-way hash function used as a message authentication code. Only someone who knows the key can verify the hash. Keyed hash algorithms provide authenticity without secrecy.

Hash functions are commonly used with digital signatures and for data integrity. The `HMACSHA1` class is an example of a keyed hash algorithm.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

#### Examples
The following code example demonstrates how to derive from the `KeyedHashAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeyedHashAlgorithm/Overview/program.cs._

## KeyedHashAlgorithm.KeyedHashAlgorithm() constructor

```csharp
protected KeyedHashAlgorithm ();
```

Initializes a new instance of the `KeyedHashAlgorithm` class.

#### Remarks
You cannot create an instance of an abstract class. Application code creates a new instance of a derived class.

## KeyedHashAlgorithm.Key <example-value>

```csharp
public virtual byte[] Key { get; set; }
```

Gets or sets the key to use in the hash algorithm.

Returns: The key to use in the hash algorithm.

Exceptions:

- `CryptographicException`: An attempt was made to change the `KeyedHashAlgorithm.Key` property after hashing has begun.

#### Remarks
This property is the public accessor for the `KeyValue` field.

#### Examples
The following code example demonstrates how to override the `Key` property to retrieve the key used in the current `KeyedHashAlgorithm` object. This code example is part of a larger example provided for the `KeyedHashAlgorithm` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/KeyedHashAlgorithm/Key/contosokeyedhash.cs._

## KeyedHashAlgorithm.Create() method

```csharp
public static System.Security.Cryptography.KeyedHashAlgorithm Create ();
```

Creates an instance of the default implementation of a keyed hash algorithm.

Returns: A new `HMACSHA1` instance, unless the default settings have been changed.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## KeyedHashAlgorithm.Create(String) method

```csharp
public static System.Security.Cryptography.KeyedHashAlgorithm? Create (string algName);
```

Creates an instance of the specified implementation of a keyed hash algorithm.

Parameters:

- `algName`: The keyed hash algorithm implementation to use. The following table shows the valid values for the `algName` parameter and the algorithms they map to.

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

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## KeyedHashAlgorithm.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `KeyedHashAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `KeyedHashAlgorithm` references. This method invokes the `Dispose()` method of each referenced object.

## KeyedHashAlgorithm.KeyValue field

```csharp
protected byte[] KeyValue;
```

The key to use in the hash algorithm.

#### Remarks
This field is accessed through the `Key` property.
