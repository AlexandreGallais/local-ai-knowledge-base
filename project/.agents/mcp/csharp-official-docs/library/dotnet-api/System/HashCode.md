---
title: "HashCode struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/HashCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HashCode struct

Namespace: `System`

```csharp
public struct HashCode
```

Combines the hash code for multiple values into a single hash code.

You can use `HashCode` to combine multiple values (for example, fields on a structure or class) into a single hash code. This structure has static and instance methods that operate differently:

* The static methods accept a set of up to eight values to combine.
* Two instance methods operate in a streaming fashion, accepting values one at a time.

> **Warning:**
> It's best-practice to consider hash codes as an implementation detail, as the implementation may change across assembly versions. Do not store hash codes produced by `HashCode` in serialized structures, for example, on-disk. `HashCode` uses a statically initialized random seed to enforce this best practice, meaning that the hash codes are only deterministic within the scope of an operating system process.

The static methods in this class combine the default hash codes of *up to eight* values.

_Code sample not included: ~/snippets/csharp/System/HashCode/Overview/example1.cs._

> **Important:**
> `ToHashCode` must be called at most once per instance of `HashCode`.

The instance methods in this class combine the hash codes of *more than eight* values.

_Code sample not included: ~/snippets/csharp/System/HashCode/Overview/example2.cs._

The instance methods also combine the hash codes produced by a specific
`IEqualityComparer<T>` implementation.

_Code sample not included: ~/snippets/csharp/System/HashCode/Overview/example3.cs._

The `HashCode` structure must be passed by-reference to other methods, as it is a value type.

_Code sample not included: ~/snippets/csharp/System/HashCode/Overview/example4.cs._

## HashCode.Add<T>(T) method

```csharp
public void Add<T> (T value);
```

Adds a single value to the hash code.

Parameters:

- `T`: The type of the value to add to the hash code.
- `value`: The value to add to the hash code.

To be added.

## HashCode.Add<T>(T, IEqualityComparer<T>) method

```csharp
public void Add<T> (T value, System.Collections.Generic.IEqualityComparer<T>? comparer);
```

Adds a single value to the hash code, specifying the type that provides the hash code function.

Parameters:

- `T`: The type of the value to add to the hash code.
- `value`: The value to add to the hash code.
- `comparer`: The `IEqualityComparer<T>` to use to calculate the hash code.
This value can be a null reference (Nothing in Visual Basic), which will use the default equality comparer for `T`.

To be added.

## HashCode.AddBytes(Byte>) method

```csharp
public void AddBytes (ReadOnlySpan<byte> value);
```

Adds a span of bytes to the hash code.

Parameters:

- `value`: The span to add.

#### Remarks

This method does not guarantee that the result of adding a span of bytes will match
the result of adding the same bytes individually.

## HashCode.Combine<T1>(T1) method

```csharp
public static int Combine<T1> (T1 value1);
```

Diffuses the hash code returned by the specified value.

Parameters:

- `T1`: The type of the value to add the hash code.
- `value1`: The value to add to the hash code.

Returns: The hash code that represents the single value.

Some data structures assume that hash codes are diffused across a large range. This method improves the quality of the hash code returned by the value and is useful when the underlying data type is simple, for example, an integer value.

## HashCode.Combine<T1,T2>(T1, T2) method

```csharp
public static int Combine<T1,T2> (T1 value1, T2 value2);
```

Combines two values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.

Returns: The hash code that represents the two values.

To be added.

## HashCode.Combine<T1,T2,T3>(T1, T2, T3) method

```csharp
public static int Combine<T1,T2,T3> (T1 value1, T2 value2, T3 value3);
```

Combines three values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.

Returns: The hash code that represents the three values.

To be added.

## HashCode.Combine<T1,T2,T3,T4>(T1, T2, T3, T4) method

```csharp
public static int Combine<T1,T2,T3,T4> (T1 value1, T2 value2, T3 value3, T4 value4);
```

Combines four values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `T4`: The type of the fourth value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.
- `value4`: The fourth value to combine into the hash code.

Returns: The hash code that represents the four values.

To be added.

## HashCode.Combine<T1,T2,T3,T4,T5>(T1, T2, T3, T4, T5) method

```csharp
public static int Combine<T1,T2,T3,T4,T5> (T1 value1, T2 value2, T3 value3, T4 value4, T5 value5);
```

Combines five values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `T4`: The type of the fourth value to combine into the hash code.
- `T5`: The type of the fifth value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.
- `value4`: The fourth value to combine into the hash code.
- `value5`: The fifth value to combine into the hash code.

Returns: The hash code that represents the five values.

To be added.

## HashCode.Combine<T1,T2,T3,T4,T5,T6>(T1, T2, T3, T4, T5, T6) method

```csharp
public static int Combine<T1,T2,T3,T4,T5,T6> (T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6);
```

Combines six values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `T4`: The type of the fourth value to combine into the hash code.
- `T5`: The type of the fifth value to combine into the hash code.
- `T6`: The type of the sixth value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.
- `value4`: The fourth value to combine into the hash code.
- `value5`: The fifth value to combine into the hash code.
- `value6`: The sixth value to combine into the hash code.

Returns: The hash code that represents the six values.

To be added.

## HashCode.Combine<T1,T2,T3,T4,T5,T6,T7>(T1, T2, T3, T4, T5, T6, T7) method

```csharp
public static int Combine<T1,T2,T3,T4,T5,T6,T7> (T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6, T7 value7);
```

Combines seven values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `T4`: The type of the fourth value to combine into the hash code.
- `T5`: The type of the fifth value to combine into the hash code.
- `T6`: The type of the sixth value to combine into the hash code.
- `T7`: The type of the seventh value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.
- `value4`: The fourth value to combine into the hash code.
- `value5`: The fifth value to combine into the hash code.
- `value6`: The sixth value to combine into the hash code.
- `value7`: The seventh value to combine into the hash code.

Returns: The hash code that represents the seven values.

To be added.

## HashCode.Combine<T1,T2,T3,T4,T5,T6,T7,T8>(T1, T2, T3, T4, T5, T6, T7, T8) method

```csharp
public static int Combine<T1,T2,T3,T4,T5,T6,T7,T8> (T1 value1, T2 value2, T3 value3, T4 value4, T5 value5, T6 value6, T7 value7, T8 value8);
```

Combines eight values into a hash code.

Parameters:

- `T1`: The type of the first value to combine into the hash code.
- `T2`: The type of the second value to combine into the hash code.
- `T3`: The type of the third value to combine into the hash code.
- `T4`: The type of the fourth value to combine into the hash code.
- `T5`: The type of the fifth value to combine into the hash code.
- `T6`: The type of the sixth value to combine into the hash code.
- `T7`: The type of the seventh value to combine into the hash code.
- `T8`: The type of the eighth value to combine into the hash code.
- `value1`: The first value to combine into the hash code.
- `value2`: The second value to combine into the hash code.
- `value3`: The third value to combine into the hash code.
- `value4`: The fourth value to combine into the hash code.
- `value5`: The fifth value to combine into the hash code.
- `value6`: The sixth value to combine into the hash code.
- `value7`: The seventh value to combine into the hash code.
- `value8`: The eighth value to combine into the hash code.

Returns: The hash code that represents the eight values.

To be added.

## HashCode.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

This method is not supported and should not be called.

Parameters:

- `obj`: Ignored.

Returns: This method will always throw a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown when this method is called.

To be added.

## HashCode.GetHashCode() method

```csharp
public override int GetHashCode ();
```

This method is not supported and should not be called.

Returns: This method will always throw a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Always thrown when this method is called.

To be added.

## HashCode.ToHashCode() method

```csharp
public int ToHashCode ();
```

Calculates the final hash code after consecutive `Add` invocations.

Returns: The calculated hash code.

This method must be called at most once per instance of `HashCode`.
