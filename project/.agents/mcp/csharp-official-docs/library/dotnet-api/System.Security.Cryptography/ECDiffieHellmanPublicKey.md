---
title: "ECDiffieHellmanPublicKey class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECDiffieHellmanPublicKey.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDiffieHellmanPublicKey class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class ECDiffieHellmanPublicKey : <example-value>
```

Provides an abstract base class from which all `ECDiffieHellmanCngPublicKey` implementations must inherit.

To be added.

## ECDiffieHellmanPublicKey.ECDiffieHellmanPublicKey() constructor

```csharp
protected ECDiffieHellmanPublicKey ();
```

Initializes a new instance of the `ECDiffieHellmanPublicKey` class.

To be added.

## ECDiffieHellmanPublicKey.ECDiffieHellmanPublicKey(Byte[]) constructor

```csharp
protected ECDiffieHellmanPublicKey (byte[] keyBlob);
```

Initializes a new instance of the `ECDiffieHellmanPublicKey` class.

Parameters:

- `keyBlob`: A byte array that represents an `ECDiffieHellmanPublicKey` object.

Exceptions:

- `ArgumentNullException`: `keyBlob` is `null`.

To be added.

## ECDiffieHellmanPublicKey.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ECDiffieHellman` class.

#### Remarks
Call `ECDiffieHellmanPublicKey.Dispose` when you are finished using the `ECDiffieHellman`. The `ECDiffieHellmanPublicKey.Dispose` method leaves the `ECDiffieHellman` in an unusable state. After calling `ECDiffieHellmanPublicKey.Dispose`, you must release all references to the `ECDiffieHellman` so the garbage collector can reclaim the memory that the `ECDiffieHellman` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

## ECDiffieHellmanPublicKey.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `ECDiffieHellman` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method executes in two distinct scenarios:

- If `disposing` equals `true`, the method has been called directly or indirectly by a user's code. Managed and unmanaged resources can be disposed.

- If `disposing` equals `false`, the method has been called by the runtime from inside the finalizer, and you should not reference managed resources. Only unmanaged resources can be disposed.

If you need to provide cleanup code for managed and unmanaged resources that an object created, you should override this method.

This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `ECDiffieHellmanPublicKey` references. This method invokes the `Dispose()` method of each referenced object.

## ECDiffieHellmanPublicKey.ExportExplicitParameters() method

```csharp
public virtual System.Security.Cryptography.ECParameters ExportExplicitParameters ();
```

When overridden in a derived class, exports the explicit `ECParameters` for an `ECCurve` object.

Returns: An object that represents the point on the curve for this key, using the explicit curve format.

Exceptions:

- `NotSupportedException`: A derived class must override this method.

To be added.

## ECDiffieHellmanPublicKey.ExportParameters() method

```csharp
public virtual System.Security.Cryptography.ECParameters ExportParameters ();
```

When overridden in a derived class, exports the named or explicit `ECParameters` for an `ECCurve` object.

Returns: An object that represents the point on the curve for this key.

Exceptions:

- `NotSupportedException`: A derived class must override this method.

To be added.

## ECDiffieHellmanPublicKey.ExportSubjectPublicKeyInfo() method

```csharp
public virtual byte[] ExportSubjectPublicKeyInfo ();
```

Exports the current key in the X.509 SubjectPublicKeyInfo format.

Returns: A byte array containing the X.509 SubjectPublicKeyInfo representation of this key.

Exceptions:

- `NotSupportedException`: The member `ECDiffieHellmanPublicKey.ExportParameters` has not been overridden in a derived class.
- `ObjectDisposedException`: The object has already been disposed.
- `CryptographicException`: The key is invalid and could not be exported.

To be added.

## ECDiffieHellmanPublicKey.ToByteArray() method

```csharp
public virtual byte[] ToByteArray ();
```

Serializes the `ECDiffieHellmanPublicKey` key BLOB to a byte array.

Returns: A byte array that contains the serialized Elliptic Curve Diffie-Hellman (ECDH) public key.

Exceptions:

- `PlatformNotSupportedException`: On macOS and Linux: In all cases.

To be added.

## ECDiffieHellmanPublicKey.ToXmlString() method

```csharp
public virtual string ToXmlString ();
```

Serializes the `ECDiffieHellmanPublicKey` public key to an XML string.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## ECDiffieHellmanPublicKey.TryExportSubjectPublicKeyInfo(Byte>, Int32) method

```csharp
public virtual bool TryExportSubjectPublicKeyInfo (Span<byte> destination, out int bytesWritten);
```

Attempts to export the current key in the X.509 SubjectPublicKeyInfo format.

Parameters:

- `destination`: The byte span to receive the X.509 SubjectPublicKeyInfo data.
- `bytesWritten`: When this method returns, contains a value that indicates the number of bytes written to `destination`.
This parameter is treated as uninitialized.

Returns: `true` if `destination` is big enough to receive the output; otherwise, `false`.

Exceptions:

- `NotSupportedException`: The member `ECDiffieHellmanPublicKey.ExportParameters` has not been overridden in a derived class.
- `ObjectDisposedException`: The object has already been disposed.
- `CryptographicException`: The key is invalid and could not be exported.

To be added.
