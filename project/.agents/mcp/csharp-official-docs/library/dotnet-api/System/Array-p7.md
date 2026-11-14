---
title: "Array class (part 7 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 7 of 18)

## Array.CreateInstance(Type, Int32) method

```csharp
public static Array CreateInstance (Type elementType, int length);
```

Creates a one-dimensional `Array` of the specified `Type` and length, with zero-based indexing.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `length`: The size of the `Array` to create.

Returns: A new one-dimensional `Array` of the specified `Type` with the specified length, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: `length` is less than zero.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is `length`.

In F#, the Array.zeroCreate function is usually used instead.

#### Examples
The following code example shows how to create and initialize a one-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source.cs._

## Array.CreateInstance(Type, Int32[]) method

```csharp
public static Array CreateInstance (Type elementType, params int[] lengths);
```

Creates a multidimensional `Array` of the specified `Type` and dimension lengths, with zero-based indexing. The dimension lengths are specified in an array of 32-bit integers.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `lengths`: An array of 32-bit integers that represent the size of each dimension of the `Array` to create.

Returns: A new multidimensional `Array` of the specified `Type` with the specified length for each dimension, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.

-or-

`lengths` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.

-or-

The `lengths` array contains less than one element.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: Any value in `lengths` is less than zero.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

The number of elements in the `lengths` array must equal the number of dimensions in the new `Array`. Each element of the `lengths` array must specify the length of the corresponding dimension in the new `Array`.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is the product of all values in `lengths`.

#### Examples
The following code example shows how to create and initialize a multidimensional `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source3.cs._

## Array.CreateInstance(Type, Int64[]) method

```csharp
public static Array CreateInstance (Type elementType, params long[] lengths);
```

Creates a multidimensional `Array` of the specified `Type` and dimension lengths, with zero-based indexing. The dimension lengths are specified in an array of 64-bit integers.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `lengths`: An array of 64-bit integers that represent the size of each dimension of the `Array` to create. Each integer in the array must be between zero and <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>, inclusive.

Returns: A new multidimensional `Array` of the specified `Type` with the specified length for each dimension, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.

-or-

`lengths` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.

-or-

The `lengths` array contains less than one element.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: Any value in `lengths` is less than zero or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

The number of elements in the `lengths` array must equal the number of dimensions in the new `Array`. Each element of the `lengths` array must specify the length of the corresponding dimension in the new `Array`.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is the product of all values in `lengths`.

#### Examples
The following code example shows how to create and initialize a multidimensional `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source3.cs._

## Array.CreateInstance(Type, Int32, Int32) method

```csharp
public static Array CreateInstance (Type elementType, int length1, int length2);
```

Creates a two-dimensional `Array` of the specified `Type` and dimension lengths, with zero-based indexing.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `length1`: The size of the first dimension of the `Array` to create.
- `length2`: The size of the second dimension of the `Array` to create.

Returns: A new two-dimensional `Array` of the specified `Type` with the specified length for each dimension, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: `length1` is less than zero.

-or-

`length2` is less than zero.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is the product of `length1` and `length2`.

In F#, the Array2D.zeroCreate function can be used instead.

#### Examples
The following code example shows how to create and initialize a two-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source1.cs._

## Array.CreateInstance(Type, Int32[], Int32[]) method

```csharp
public static Array CreateInstance (Type elementType, int[] lengths, int[] lowerBounds);
```

Creates a multidimensional `Array` of the specified `Type` and dimension lengths, with the specified lower bounds.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `lengths`: A one-dimensional array that contains the size of each dimension of the `Array` to create.
- `lowerBounds`: A one-dimensional array that contains the lower bound (starting index) of each dimension of the `Array` to create.

Returns: A new multidimensional `Array` of the specified `Type` with the specified length and lower bound for each dimension.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.

-or-

`lengths` is `null`.

-or-

`lowerBounds` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.

-or-

The `lengths` array contains less than one element.

-or-

The `lengths` and `lowerBounds` arrays do not contain the same number of elements.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: Any value in `lengths` is less than zero.

-or-

Any value in `lowerBounds` is very large, such that the sum of a dimension's lower bound and length is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

The `lengths` and `lowerBounds` arrays must have the same number of elements. The number of elements in the `lengths` array must equal the number of dimensions in the new `Array`.

Each element of the `lengths` array must specify the length of the corresponding dimension in the new `Array`.

Each element of the `lowerBounds` array must specify the lower bound of the corresponding dimension in the new `Array`. Generally, the .NET class library and many programming languages do not handle non-zero lower bounds.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is the product of all values in `lengths`.

> **Note:**
> Not all languages support arrays with non-zero lower bounds, and therefore you may not be able to cast instances of non-zero based `Array` to the language's array type. For example, you cannot cast a 1-dimensional integer array with the lower bound 6 to C#'s `int[]` type. This results in `InvalidCastException` during runtime with the message "Unable to cast object of type 'System.Int32[\*]' to type 'System.Int32[]'.", where the asterisk (\*) means non-zero based index. However, you can cast zero based arrays of any rank created with `CreateInstance` to the language's array. For example, you can cast a 2-dimensional zero based integer array created with this method to C#'s `int[,]` type.

#### Examples
The following code example shows how to create and initialize a multidimensional `Array` with specified lower bounds.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source4.cs._

## Array.CreateInstance(Type, Int32, Int32, Int32) method

```csharp
public static Array CreateInstance (Type elementType, int length1, int length2, int length3);
```

Creates a three-dimensional `Array` of the specified `Type` and dimension lengths, with zero-based indexing.

Parameters:

- `elementType`: The `Type` of the `Array` to create.
- `length1`: The size of the first dimension of the `Array` to create.
- `length2`: The size of the second dimension of the `Array` to create.
- `length3`: The size of the third dimension of the `Array` to create.

Returns: A new three-dimensional `Array` of the specified `Type` with the specified length for each dimension, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `elementType` is `null`.
- `ArgumentException`: `elementType` is not a valid `Type`.
- `NotSupportedException`: `elementType` is not supported. For example, `Void` is not supported.

-or-

`elementType` is an open generic type.
- `ArgumentOutOfRangeException`: `length1` is less than zero.

-or-

`length2` is less than zero.

-or-

`length3` is less than zero.

#### Remarks
Unlike most classes, `Array` provides the `Array.CreateInstance` method, instead of public constructors, to allow for late bound access.

Reference-type elements are initialized to `null`. Value-type elements are initialized to zero.

This method is an O(`n`) operation, where `n` is the product of `length1`, `length2`, and `length3`.

In F#, the Array3D.zeroCreate function can be used instead.

#### Examples
The following code example shows how to create and initialize a three-dimensional `Array`.

_Code sample not included: ~/snippets/csharp/System/Array/CreateInstance/source2.cs._

## Array.CreateInstanceFromArrayType(Type, Int32) method

```csharp
public static Array CreateInstanceFromArrayType (Type arrayType, int length);
```

Creates a one-dimensional `Array` of the specified array type and length, with zero-based indexing.

Parameters:

- `arrayType`: The type of the array (not of the array element type).
- `length`: The size of the `Array` to create.

Returns: A new one-dimensional `Array` of the specified `Type` with the specified length.

Exceptions:

- `ArgumentNullException`: `arrayType` is `null`.
- `ArgumentOutOfRangeException`: `length` is negative.
- `ArgumentException`: `arrayType` is not an array type.

-or-

`arrayType` is not one-dimensional array.

When the array type is readily available, this method should be preferred over `Array.CreateInstance`, as it has better performance and it is AOT-friendly.

## Array.CreateInstanceFromArrayType(Type, Int32[]) method

```csharp
public static Array CreateInstanceFromArrayType (Type arrayType, params int[] lengths);
```

Creates a multidimensional `Array` of the specified `Type` and dimension lengths, with zero-based indexing.

Parameters:

- `arrayType`: The type of the array (not of the array element type).
- `lengths`: The dimension lengths, specified in an array of 32-bit integers.

Returns: A new multidimensional `Array` of the specified Type with the specified length for each dimension, using zero-based indexing.

Exceptions:

- `ArgumentNullException`: `arrayType` is `null`.

-or-

`lengths` is `null`.
- `ArgumentOutOfRangeException`: Any value in `lengths` is less than zero.
- `ArgumentException`: The lengths array is empty.

-or-

`arrayType` is not an array type.

-or-

`arrayType` rank does not match `lengths` length.

When the array type is readily available, this method should be preferred over `Array.CreateInstance`, as it has better performance and it is AOT-friendly.

## Array.CreateInstanceFromArrayType(Type, Int32[], Int32[]) method

```csharp
public static Array CreateInstanceFromArrayType (Type arrayType, int[] lengths, int[] lowerBounds);
```

Creates a multidimensional `Array` of the specified `Type` and dimension lengths, with the specified lower bounds.

Parameters:

- `arrayType`: The type of the array (not of the array element type).
- `lengths`: The dimension lengths, specified in an array of 32-bit integers.
- `lowerBounds`: A one-dimensional array that contains the lower bound (starting index) of each dimension of the `Array` to create.

Returns: A new multidimensional `Array` of the specified `Type` with the specified length and lower bound for each dimension.

Exceptions:

- `ArgumentNullException`: `arrayType` is `null`.

-or-

`lengths` is `null`.

-or-

`lowerBounds` is `null`.
- `ArgumentException`: The `lengths` and `lowerBounds` arrays do not contain the same number of elements.

-or-

The lengths array is empty.

-or-

`arrayType` is not an array type.

-or-

`arrayType` rank does not match `lengths` length.
- `ArgumentOutOfRangeException`: Any value in `lengths` is less than zero.
- `PlatformNotSupportedException`: Native AOT: any value in `lowerBounds` is different than zero.

When the array type is readily available, this method should be preferred over `Array.CreateInstance`, as it has better performance and it is AOT-friendly.
