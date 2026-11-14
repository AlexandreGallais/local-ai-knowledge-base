---
title: "RandomNumberGenerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RandomNumberGenerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RandomNumberGenerator class

Namespace: `System.Security.Cryptography`

```csharp
public abstract class RandomNumberGenerator : IDisposable
```

Provides functionality for generating random values.

#### Remarks
Cryptographic random number generators create cryptographically strong random values.

Using the static members of this class is the preferred way to generate random values.

To create a random number generator, call the @System.Security.Cryptography.RandomNumberGenerator.Create method. This is preferred over calling the constructor of the derived class @System.Security.Cryptography.RNGCryptoServiceProvider, which is not available on all platforms.

On browser WebAssembly, the static @System.Security.Cryptography.RandomNumberGenerator methods and the default implementation returned by @System.Security.Cryptography.RandomNumberGenerator.Create obtain random bytes through the browser's Web Crypto API `crypto.getRandomValues()` method. The security of the generated values depends on the browser implementing this API correctly.

## RandomNumberGenerator.RandomNumberGenerator() constructor

```csharp
protected RandomNumberGenerator ();
```

Initializes a new instance of `RandomNumberGenerator`.

#### Remarks
You cannot create an instance of an abstract class. Application code will create a new instance of a derived class. For an implementation of a cryptographic random number generator, use the derived class `RNGCryptoServiceProvider`.

## RandomNumberGenerator.Create() method

```csharp
public static System.Security.Cryptography.RandomNumberGenerator Create ();
```

Creates an instance of the default implementation of a cryptographic random number generator that can be used to generate random data.

Returns: A new instance of a cryptographic random number generator.

To be added.

## RandomNumberGenerator.Create(String) method

```csharp
public static System.Security.Cryptography.RandomNumberGenerator? Create (string rngName);
```

Creates an instance of the specified implementation of a cryptographic random number generator.

Parameters:

- `rngName`: The name of the random number generator implementation to use.

Returns: A new instance of a cryptographic random number generator.

To be added.

## RandomNumberGenerator.Dispose() method

```csharp
public void Dispose ();
```

When overridden in a derived class, releases all resources used by the current instance of the `RandomNumberGenerator` class.

#### Remarks
Call `Dispose` when you are finished using the `RandomNumberGenerator`. The `Dispose` method leaves the `RandomNumberGenerator` in an unusable state. After calling `Dispose`, you must release all references to the `RandomNumberGenerator` so the garbage collector can reclaim the memory that the `RandomNumberGenerator` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
>  Always call `Dispose` before you release your last reference to the `RandomNumberGenerator`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `RandomNumberGenerator` object's `Finalize` method.

## RandomNumberGenerator.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

When overridden in a derived class, releases the unmanaged resources used by the `RandomNumberGenerator` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `RandomNumberGenerator` references. This method invokes the `Dispose()` method of each referenced object.

## RandomNumberGenerator.Fill(Byte>) method

```csharp
public static void Fill (Span<byte> data);
```

Fills a span with cryptographically strong random bytes.

Parameters:

- `data`: The span to fill with cryptographically strong random bytes.

To be added.

## RandomNumberGenerator.GetBytes(Byte[]) method

```csharp
public abstract void GetBytes (byte[] data);
```

When overridden in a derived class, fills an array of bytes with a cryptographically strong random sequence of values.

Parameters:

- `data`: The array to fill with cryptographically strong random bytes.

#### Remarks
The length of the byte array determines how many random bytes are produced.

#### Examples
The following example creates a random sequence 100 bytes long and stores it in `random`.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RandomNumberGenerator/GetBytes/source.cs._

## RandomNumberGenerator.GetBytes(Int32) method

```csharp
public static byte[] GetBytes (int count);
```

Creates an array of bytes with a cryptographically strong random sequence of values.

Parameters:

- `count`: The number of bytes of random values to create.

Returns: An array populated with cryptographically strong random values.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than zero.

To be added.

## RandomNumberGenerator.GetBytes(Byte>) method

```csharp
public virtual void GetBytes (Span<byte> data);
```

Fills a span with cryptographically strong random bytes.

Parameters:

- `data`: The span to fill with cryptographically strong random bytes.

To be added.

## RandomNumberGenerator.GetBytes(Byte[], Int32, Int32) method

```csharp
public virtual void GetBytes (byte[] data, int offset, int count);
```

Fills the specified byte array with a cryptographically strong random sequence of values.

Parameters:

- `data`: The array to fill with cryptographically strong random bytes.
- `offset`: The index of the array to start the fill operation.
- `count`: The number of bytes to fill.

Exceptions:

- `ArgumentNullException`: `data` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than 0
- `ArgumentException`: `offset` plus `count` exceeds the length of `data`.

To be added.

## RandomNumberGenerator.GetHexString(Int32, Boolean) method

```csharp
public static string GetHexString (int stringLength, bool lowercase = false);
```

Creates a string filled with cryptographically random hexadecimal characters.

Parameters:

- `stringLength`: The length of string to create.
- `lowercase`: `true` if the hexadecimal characters should be lowercase; `false` if they should be uppercase.
The default is `false`.

Returns: A string populated with random hexadecimal characters.

The behavior of this is the same as using `RandomNumberGenerator.GetString` and specifying hexadecimal characters as the choices. This implementation is optimized specifically for hexadecimal characters.

## RandomNumberGenerator.GetHexString(Char>, Boolean) method

```csharp
public static void GetHexString (Span<char> destination, bool lowercase = false);
```

Fills a buffer with cryptographically random hexadecimal characters.

Parameters:

- `destination`: The buffer to receive the characters.
- `lowercase`: `true` if the hexadecimal characters should be lowercase; `false` if they should be uppercase.
The default is `false`.

The behavior of this is the same as using `RandomNumberGenerator.GetItems<T>` and specifying hexadecimal characters as the choices. This implementation is optimized specifically for hexadecimal characters.

## RandomNumberGenerator.GetInt32(Int32) method

```csharp
public static int GetInt32 (int toExclusive);
```

Generates a random integer between 0 (inclusive) and a specified exclusive upper bound using a cryptographically strong random number generator.

Parameters:

- `toExclusive`: The exclusive upper bound of the random range.

Returns: A random integer between 0 (inclusive) and `toExclusive` (exclusive).

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` parameter is less than or equal to 0.

#### Remarks

The upper bound is exclusive to enable passing in a length value from an array, span, or list.
Because it is an exclusive upper bound this method can never generate `MaxValue`.

This method uses a discard-and-retry strategy to avoid the low value bias that a simple modular arithmetic operation would produce.

## RandomNumberGenerator.GetInt32(Int32, Int32) method

```csharp
public static int GetInt32 (int fromInclusive, int toExclusive);
```

Generates a random integer between a specified inclusive lower bound and a specified exclusive upper bound using a cryptographically strong random number generator.

Parameters:

- `fromInclusive`: The inclusive lower bound of the random range.
- `toExclusive`: The exclusive upper bound of the random range.

Returns: A random integer between `fromInclusive` (inclusive) and `toExclusive` (exclusive).

Exceptions:

- `ArgumentOutOfRangeException`: The `toExclusive` parameter is less than or equal to the `fromInclusive` parameter.

#### Remarks

The upper bound is exclusive to enable passing in a length value from an array, span, or list.
Because it is an exclusive upper bound this method can never generate `MaxValue`.

This method uses a discard-and-retry strategy to avoid the low value bias that a simple modular arithmetic operation would produce.

Negative values are permitted for both `fromInclusive` and `toExclusive`.

## RandomNumberGenerator.GetItems<T>(ReadOnlySpan<T>, Int32) method

```csharp
public static T[] GetItems<T> (ReadOnlySpan<T> choices, int length);
```

Creates an array populated with items chosen at random from choices.

Parameters:

- `T`: The type of items.
- `choices`: The items to use to populate the array.
- `length`: The length of array to return populated with items.

Returns: An array populated with random choices.

Exceptions:

- `ArgumentException`: `choices` is empty.
- `ArgumentOutOfRangeException`: `length` is not zero or a positive number.

To be added.

## RandomNumberGenerator.GetItems<T>(ReadOnlySpan<T>, Span<T>) method

```csharp
public static void GetItems<T> (ReadOnlySpan<T> choices, Span<T> destination);
```

Fills the elements of a specified span with items chosen at random from the provided set of choices.

Parameters:

- `T`: The type of items.
- `choices`: The items to use to fill the buffer.
- `destination`: The buffer to receive the items.

Exceptions:

- `ArgumentException`: `choices` is empty.

To be added.

## RandomNumberGenerator.GetNonZeroBytes(Byte[]) method

```csharp
public virtual void GetNonZeroBytes (byte[] data);
```

When overridden in a derived class, fills an array of bytes with a cryptographically strong random sequence of nonzero values.

Parameters:

- `data`: The array to fill with cryptographically strong random nonzero bytes.

#### Remarks
The length of the byte array determines how many random bytes are produced.

#### Examples
The following example creates a random sequence of 100 nonzero bytes and stores it in `random`.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RandomNumberGenerator/GetNonZeroBytes/source.cs._

## RandomNumberGenerator.GetNonZeroBytes(Byte>) method

```csharp
public virtual void GetNonZeroBytes (Span<byte> data);
```

Fills a byte span with a cryptographically strong random sequence of nonzero values.

Parameters:

- `data`: The span to fill with cryptographically strong random nonzero bytes.

To be added.

## RandomNumberGenerator.GetString(Char>, Int32) method

```csharp
public static string GetString (ReadOnlySpan<char> choices, int length);
```

Creates a string populated with characters chosen at random from choices.

Parameters:

- `choices`: The characters to use to populate the string.
- `length`: The length of string to return.

Returns: A string populated with random choices.

Exceptions:

- `ArgumentException`: `choices` is empty.
- `ArgumentOutOfRangeException`: `length` is not zero or a positive number.

To be added.

## RandomNumberGenerator.Shuffle<T>(Span<T>) method

```csharp
public static void Shuffle<T> (Span<T> values);
```

Performs an in-place shuffle of a span using cryptographically random number generation.

Parameters:

- `T`: The type of span.
- `values`: The span to shuffle.

To be added.
