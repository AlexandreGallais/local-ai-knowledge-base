---
title: "Array class (part 5 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 5 of 18)

## Array.ConvertAll<TInput,TOutput>(TInput[], Converter<TInput,TOutput>) method

```csharp
public static TOutput[] ConvertAll<TInput,TOutput> (TInput[] array, Converter<TInput,TOutput> converter);
```

Converts an array of one type to an array of another type.

Parameters:

- `TInput`: The type of the elements of the source array.
- `TOutput`: The type of the elements of the target array.
- `array`: The one-dimensional, zero-based `Array` to convert to a target type.
- `converter`: A `Converter<T1,T2>` that converts each element from one type to another type.

Returns: An array of the target type containing the converted elements from the source array.

Exceptions:

- `ArgumentNullException`: `array` is `null`.

-or-

`converter` is `null`.

#### Remarks
The `Converter<T1,T2>` is a delegate to a method that converts an object to the target type.  The elements of `array` are individually passed to the `Converter<T1,T2>`, and the converted elements are saved in the new array.

The source `array` remains unchanged.

This method is an O(`n`) operation, where `n` is the `Array.Length` of `array`.

In F#, the Array.map function is generally used instead.

#### Examples
The following code example defines a method named `PointFToPoint` that converts a `PointF` structure to a `Point` structure. The example then creates an array of `PointF` structures, creates a `Converter<PointF, Point>` delegate (`Converter(Of PointF, Point)` in Visual Basic) to represent the `PointFToPoint` method, and passes the delegate to the `Array.ConvertAll` method. The `Array.ConvertAll` method passes each element of the input list to the `PointFToPoint` method and puts the converted elements into a new list of `Point` structures. In the F# example, the `pointFToPoint` function is implicitly casted to the `Converter<PointF, Point>` delegate. Both lists are displayed.

_Code sample not included: ~/snippets/csharp/System/Array/ConvertAllTInput,TOutput/source.cs._

## Array.Copy(Array, Array, Int32) method

```csharp
public static void Copy (Array sourceArray, Array destinationArray, int length);
```

Copies a range of elements from an `Array` starting at the first element and pastes them into another `Array` starting at the first element. The length is specified as a 32-bit integer.

Parameters:

- `sourceArray`: The `Array` that contains the data to copy.
- `destinationArray`: The `Array` that receives the data.
- `length`: A 32-bit integer that represents the number of elements to copy.

Exceptions:

- `ArgumentNullException`: `sourceArray` is `null`.

-or-

`destinationArray` is `null`.
- `RankException`: `sourceArray` and `destinationArray` have different ranks.
- `ArrayTypeMismatchException`: `sourceArray` and `destinationArray` are of incompatible types.
- `InvalidCastException`: At least one element in `sourceArray` cannot be cast to the type of `destinationArray`.
- `ArgumentOutOfRangeException`: `length` is less than zero.
- `ArgumentException`: `length` is greater than the number of elements in `sourceArray`.

-or-

`length` is greater than the number of elements in `destinationArray`.

#### Remarks
The `sourceArray` and `destinationArray` parameters must have the same number of dimensions. In addition, `destinationArray` must already have been dimensioned and must have a sufficient number of elements to accommodate the copied data.

When copying between multidimensional arrays, the array behaves like a long one-dimensional array, where the rows (or columns) are conceptually laid end to end. For example, if an array has three rows (or columns) with four elements each, copying six elements from the beginning of the array would copy all four elements of the first row (or column) and the first two elements of the second row (or column).

If `sourceArray` and `destinationArray` overlap, this method behaves as if the original values of `sourceArray` were preserved in a temporary location before `destinationArray` is overwritten.

[C++]

This method is equivalent to the standard C/C++ function `memmove`, not `memcpy`.

The arrays can be reference-type arrays or value-type arrays. Type downcasting is performed, as required.

- When copying from a reference-type array to a value-type array, each element is unboxed and then copied. When copying from a value-type array to a reference-type array, each element is boxed and then copied.

- When copying from a reference-type or value-type array to an `Object` array, an `Object` is created to hold each value or reference and then copied. When copying from an `Object` array to a reference-type or value-type array and the assignment is not possible, an `InvalidCastException` is thrown.

- If `sourceArray` and `destinationArray` are both reference-type arrays or are both arrays of type `Object`, a shallow copy is performed. A shallow copy of an `Array` is a new `Array` containing references to the same elements as the original `Array`. The elements themselves or anything referenced by the elements are not copied. In contrast, a deep copy of an `Array` copies the elements and everything directly or indirectly referenced by the elements.

An `ArrayTypeMismatchException` is thrown if the arrays are of incompatible types. Type compatibility is defined as follows:

- A type is compatible with itself.

- A value type is compatible with `Object` and with an interface type implemented by that value type. A value type is considered connected to an interface only if it implements that interface directly. Disconnected types are not compatible.

- Two intrinsic (predefined) value types are compatible if copying from the source type to the destination type is a widening conversion. A widening conversion never loses information, whereas a narrowing conversion can lose information. For example, converting a 32-bit signed integer to a 64-bit signed integer is a widening conversion, and converting a 64-bit signed integer to a 32-bit signed integer is a narrowing conversion. For more information about conversions, see `Convert`.

- A nonintrinsic (user-defined) value type is compatible only with itself.

- Enumerations have an implicit conversion to `Enum` and to their underlying type.

If every element in `sourceArray` requires a downcast (for example, from a base class to a derived class or from an interface to an object) and one or more elements cannot be cast to the corresponding type in `destinationArray`, an `InvalidCastException` is thrown.

If this method throws an exception while copying, the state of `destinationArray` is undefined.

This method is an O(`n`) operation, where `n` is `length`.

## Array.Copy(Array, Array, Int64) method

```csharp
public static void Copy (Array sourceArray, Array destinationArray, long length);
```

Copies a range of elements from an `Array` starting at the first element and pastes them into another `Array` starting at the first element. The length is specified as a 64-bit integer.

Parameters:

- `sourceArray`: The `Array` that contains the data to copy.
- `destinationArray`: The `Array` that receives the data.
- `length`: A 64-bit integer that represents the number of elements to copy. The integer must be between zero and <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>, inclusive.

Exceptions:

- `ArgumentNullException`: `sourceArray` is `null`.

-or-

`destinationArray` is `null`.
- `RankException`: `sourceArray` and `destinationArray` have different ranks.
- `ArrayTypeMismatchException`: `sourceArray` and `destinationArray` are of incompatible types.
- `InvalidCastException`: At least one element in `sourceArray` cannot be cast to the type of `destinationArray`.
- `ArgumentOutOfRangeException`: `length` is less than 0 or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentException`: `length` is greater than the number of elements in `sourceArray`.

-or-

`length` is greater than the number of elements in `destinationArray`.

#### Remarks
The `sourceArray` and `destinationArray` parameters must have the same number of dimensions. In addition, `destinationArray` must already have been dimensioned and must have a sufficient number of elements to accommodate the copied data.

When copying between multidimensional arrays, the array behaves like a long one-dimensional array, where the rows (or columns) are conceptually laid end to end. For example, if an array has three rows (or columns) with four elements each, copying six elements from the beginning of the array would copy all four elements of the first row (or column) and the first two elements of the second row (or column).

If `sourceArray` and `destinationArray` overlap, this method behaves as if the original values of `sourceArray` were preserved in a temporary location before `destinationArray` is overwritten.

[C++]

This method is equivalent to the standard C/C++ function `memmove`, not `memcpy`.

The arrays can be reference-type arrays or value-type arrays. Type downcasting is performed, as required.

- When copying from a reference-type array to a value-type array, each element is unboxed and then copied. When copying from a value-type array to a reference-type array, each element is boxed and then copied.

- When copying from a reference-type or value-type array to an `Object` array, an `Object` is created to hold each value or reference and then copied. When copying from an `Object` array to a reference-type or value-type array and the assignment is not possible, an `InvalidCastException` is thrown.

- If `sourceArray` and `destinationArray` are both reference-type arrays or are both arrays of type `Object`, a shallow copy is performed. A shallow copy of an `Array` is a new `Array` containing references to the same elements as the original `Array`. The elements themselves or anything referenced by the elements are not copied. In contrast, a deep copy of an `Array` copies the elements and everything directly or indirectly referenced by the elements.

An `ArrayTypeMismatchException` is thrown if the arrays are of incompatible types. Type compatibility is defined as follows:

- A type is compatible with itself.

- A value type is compatible with `Object` and with an interface type implemented by that value type. A value type is considered connected to an interface only if it implements that interface directly. Disconnected types are not compatible.

- Two intrinsic (predefined) value types are compatible if copying from the source type to the destination type is a widening conversion. A widening conversion never loses information, whereas a narrowing conversion can lose information. For example, converting a 32-bit signed integer to a 64-bit signed integer is a widening conversion, and converting a 64-bit signed integer to a 32-bit signed integer is a narrowing conversion. For more information about conversions, see `Convert`.

- A nonintrinsic (user-defined) value type is compatible only with itself.

- Enumerations have an implicit conversion to `Enum` and to their underlying type.

If every element in `sourceArray` requires a downcast (for example, from a base class to a derived class or from an interface to an object) and one or more elements cannot be cast to the corresponding type in `destinationArray`, an `InvalidCastException` is thrown.

If this method throws an exception while copying, the state of `destinationArray` is undefined.

This method is an O(`n`) operation, where `n` is `length`.
