---
title: "HashAlgorithm class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/HashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashAlgorithm class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class HashAlgorithm : IDisposable, System.Security.Cryptography.ICryptoTransform
```

Represents the base class from which all implementations of cryptographic hash algorithms must derive.

#### Remarks
Hash functions are fundamental to modern cryptography. These functions map binary strings of an arbitrary length to small binary strings of a fixed length, known as hash values. A cryptographic hash function has the property that it is computationally infeasible to find two distinct inputs that hash to the same value. Hash functions are commonly used with digital signatures and for data integrity.

The hash is used as a unique value of fixed size representing a large amount of data. Hashes of two sets of data should match if the corresponding data also matches. Small changes to the data result in large unpredictable changes in the hash.

Due to collision problems with SHA-1, Microsoft recommends a security model based on SHA-256 or better.

#### Examples
The following code example computes the `SHA256` hash for an array. This example assumes that there is a predefined byte array `dataArray[]`. `SHA256` is a derived class of `HashAlgorithm`.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HashAlgorithm/Overview/source.cs._

## HashAlgorithm.HashAlgorithm() constructor

```csharp
protected HashAlgorithm ();
```

Initializes a new instance of the `HashAlgorithm` class.

#### Remarks
You cannot create an instance of an abstract class. Application code creates a new instance of a derived class.

## HashAlgorithm.CanReuseTransform property

```csharp
public virtual bool CanReuseTransform { get; }
```

Gets a value indicating whether the current transform can be reused.

Returns: Always `true`.

To be added.

## HashAlgorithm.CanTransformMultipleBlocks property

```csharp
public virtual bool CanTransformMultipleBlocks { get; }
```

When overridden in a derived class, gets a value indicating whether multiple blocks can be transformed.

Returns: `true` if multiple blocks can be transformed; otherwise, `false`.

To be added.

## HashAlgorithm.Hash property

```csharp
public virtual byte[]? Hash { get; }
```

Gets the value of the computed hash code.

Returns: The current value of the computed hash code.

Exceptions:

- `CryptographicUnexpectedOperationException`: `HashAlgorithm.HashValue` is `null`.
- `ObjectDisposedException`: The object has already been disposed.

#### Remarks
The `Hash` property is a byte array; the `HashSize` property is a value that represent bits. Therefore, the number of elements in `HashAlgorithm.Hash` is one-eighth the size of `HashAlgorithm.HashSize`.

## HashAlgorithm.HashSize property

```csharp
public virtual int HashSize { get; }
```

Gets the size, in bits, of the computed hash code.

Returns: The size, in bits, of the computed hash code.

To be added.

## HashAlgorithm.InputBlockSize property

```csharp
public virtual int InputBlockSize { get; }
```

When overridden in a derived class, gets the input block size.

Returns: The input block size.

#### Remarks
Unless overridden, this property returns the value 1.

## HashAlgorithm.OutputBlockSize property

```csharp
public virtual int OutputBlockSize { get; }
```

When overridden in a derived class, gets the output block size.

Returns: The output block size.

#### Remarks
Unless overridden, this property returns the value 1.

## HashAlgorithm.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `HashAlgorithm` class.

#### Remarks
This method is a simple call to the `IDisposable.Dispose` method.

Calling `Dispose` allows the resources used by the `HashAlgorithm` class to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

## HashAlgorithm.ComputeHash(Byte[]) method

```csharp
public byte[] ComputeHash (byte[] buffer);
```

Computes the hash value for the specified byte array.

Parameters:

- `buffer`: The input to compute the hash code for.

Returns: The computed hash code.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ObjectDisposedException`: The object has already been disposed.

#### Examples
The following example computes the `SHA256` hash value of a string and returns the hash as a 64-character, hexadecimal-formatted string.  The hash string created by this code example is compatible with any SHA256 hash function (on any platform) that creates a 64-character, hexadecimal-formatted hash string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HashAlgorithm/ComputeHash/example1.cs._

## HashAlgorithm.ComputeHash(Stream) method

```csharp
public byte[] ComputeHash (System.IO.Stream inputStream);
```

Computes the hash value for the specified `Stream` object.

Parameters:

- `inputStream`: The input to compute the hash code for.

Returns: The computed hash code.

Exceptions:

- `ObjectDisposedException`: The object has already been disposed.

#### Examples

The following example calculates the `SHA256` hash for all files in a directory.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HashAlgorithm/ComputeHash/source.cs._

## HashAlgorithm.ComputeHash(Byte[], Int32, Int32) method

```csharp
public byte[] ComputeHash (byte[] buffer, int offset, int count);
```

Computes the hash value for the specified region of the specified byte array.

Parameters:

- `buffer`: The input to compute the hash code for.
- `offset`: The offset into the byte array from which to begin using data.
- `count`: The number of bytes in the array to use as data.

Returns: The computed hash code.

Exceptions:

- `ArgumentException`: `count` is an invalid value.

-or-

`buffer` length is invalid.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is out of range. This parameter requires a non-negative number.
- `ObjectDisposedException`: The object has already been disposed.

To be added.

## HashAlgorithm.ComputeHashAsync(Stream, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<byte[]> ComputeHashAsync (System.IO.Stream inputStream, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously computes the hash value for the specified `Stream` object.

Parameters:

- `inputStream`: The input to compute the hash code for.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous compute hash operation and wraps the computed hash code.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `HashAlgorithm.ComputeHash`.

## HashAlgorithm.Create() method

```csharp
public static System.Security.Cryptography.HashAlgorithm Create ();
```

Creates an instance of the default implementation of a hash algorithm.

Returns: This method doesn't return a value.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## HashAlgorithm.Create(String) method

```csharp
public static System.Security.Cryptography.HashAlgorithm? Create (string hashName);
```

Creates an instance of the specified implementation of a hash algorithm.

Parameters:

- `hashName`: The hash algorithm implementation to use. The following table shows the valid values for the `hashName` parameter and the algorithms they map to.

-  SHA

: `SHA1CryptoServiceProvider`
-  SHA1

: `SHA1CryptoServiceProvider`
-  System.Security.Cryptography.SHA1

: `SHA1CryptoServiceProvider`
-  System.Security.Cryptography.HashAlgorithm

: `SHA1CryptoServiceProvider`
-  MD5

: `MD5CryptoServiceProvider`
-  System.Security.Cryptography.MD5

: `MD5CryptoServiceProvider`
-  SHA256

: `SHA256Managed`
-  SHA-256

: `SHA256Managed`
-  System.Security.Cryptography.SHA256

: `SHA256Managed`
-  SHA384

: `SHA384Managed`
-  SHA-384

: `SHA384Managed`
-  System.Security.Cryptography.SHA384

: `SHA384Managed`
-  SHA512

: `SHA512Managed`
-  SHA-512

: `SHA512Managed`
-  System.Security.Cryptography.SHA512

: `SHA512Managed`

Returns: A new instance of the specified hash algorithm, or `null` if `hashName` is not a valid hash algorithm.

To be added.

## HashAlgorithm.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `HashAlgorithm` class.

#### Remarks
Call `Dispose` when you are finished using the `HashAlgorithm`. The `Dispose` method leaves the `HashAlgorithm` in an unusable state. After calling `Dispose`, you must release all references to the `HashAlgorithm` so the garbage collector can reclaim the memory that the `HashAlgorithm` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `HashAlgorithm`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `HashAlgorithm` object's `Finalize` method.

## HashAlgorithm.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HashAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HashAlgorithm` references. This method invokes the `Dispose()` method of each referenced object.

## HashAlgorithm.HashCore(Byte>) method

```csharp
protected virtual void HashCore (ReadOnlySpan<byte> source);
```

Routes data written to the object into the hash algorithm for computing the hash.

Parameters:

- `source`: The input to compute the hash code for.

#### Remarks
The default implementation of this method copies `source` to a temporary array and calls `HashCore`.

Derived types should override this method to avoid the intermediate data copying.

## HashAlgorithm.HashCore(Byte[], Int32, Int32) method

```csharp
protected abstract void HashCore (byte[] array, int ibStart, int cbSize);
```

When overridden in a derived class, routes data written to the object into the hash algorithm for computing the hash.

Parameters:

- `array`: The input to compute the hash code for.
- `ibStart`: The offset into the byte array from which to begin using data.
- `cbSize`: The number of bytes in the byte array to use as data.

#### Remarks
This method is not called by application code.

This abstract method performs the hash computation. Every write to the cryptographic hash algorithm passes the data through this method. For each block of data, this method updates the state of the hash object so a correct hash value is returned at the end of the data.

## HashAlgorithm.HashFinal() method

```csharp
protected abstract byte[] HashFinal ();
```

When overridden in a derived class, finalizes the hash computation after the last data is processed by the cryptographic hash algorithm.

Returns: The computed hash code.

#### Remarks
This method finalizes any partial computation and returns the correct hash value for the data.

## HashAlgorithm.Initialize() method

```csharp
public abstract void Initialize ();
```

Resets the hash algorithm to its initial state.

To be added.

## HashAlgorithm.TransformBlock(Byte[], Int32, Int32, Byte[], Int32) method

```csharp
public int TransformBlock (byte[] inputBuffer, int inputOffset, int inputCount, byte[]? outputBuffer, int outputOffset);
```

Computes the hash value for the specified region of the input byte array and copies the specified region of the input byte array to the specified region of the output byte array.

Parameters:

- `inputBuffer`: The input to compute the hash code for.
- `inputOffset`: The offset into the input byte array from which to begin using data.
- `inputCount`: The number of bytes in the input byte array to use as data.
- `outputBuffer`: A copy of the part of the input array used to compute the hash code.
- `outputOffset`: The offset into the output byte array from which to begin writing data.

Returns: The number of bytes written.

Exceptions:

- `ArgumentException`: `inputCount` uses an invalid value.

-or-

`inputBuffer` has an invalid length.
- `ArgumentNullException`: `inputBuffer` is `null`.
- `ArgumentOutOfRangeException`: `inputOffset` is out of range. This parameter requires a non-negative number.
- `ObjectDisposedException`: The object has already been disposed.

#### Remarks
You must call the `HashAlgorithm.TransformBlock` method before calling the `HashAlgorithm.TransformFinalBlock` method. You must call both methods before you retrieve the final hash value.

To retrieve the final hash value after calling the `HashAlgorithm.TransformFinalBlock` method, get the byte array contained within the `Hash` property.

Calling the `HashAlgorithm.TransformBlock` method with different input and output arrays results in an `IOException`.

#### Examples
The following code examples use the `HashAlgorithm.TransformFinalBlock` method with the `HashAlgorithm.TransformBlock` method to hash a string.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/HashAlgorithm/TransformBlock/sample.cs._
