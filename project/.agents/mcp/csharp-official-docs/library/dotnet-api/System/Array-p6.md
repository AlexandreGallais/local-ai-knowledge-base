---
title: "Array class (part 6 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Array.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Array class (part 6 of 18)

## Array.Copy(Array, Int32, Array, Int32, Int32) method

```csharp
public static void Copy (Array sourceArray, int sourceIndex, Array destinationArray, int destinationIndex, int length);
```

Copies a range of elements from an `Array` starting at the specified source index and pastes them to another `Array` starting at the specified destination index. The length and the indexes are specified as 32-bit integers.

Parameters:

- `sourceArray`: The `Array` that contains the data to copy.
- `sourceIndex`: A 32-bit integer that represents the index in `sourceArray` at which copying begins.
- `destinationArray`: The `Array` that receives the data.
- `destinationIndex`: A 32-bit integer that represents the index in `destinationArray` at which storing begins.
- `length`: A 32-bit integer that represents the number of elements to copy.

Exceptions:

- `ArgumentNullException`: `sourceArray` is `null`.

-or-

`destinationArray` is `null`.
- `RankException`: `sourceArray` and `destinationArray` have different ranks.
- `ArrayTypeMismatchException`: `sourceArray` and `destinationArray` are of incompatible types.
- `InvalidCastException`: At least one element in `sourceArray` cannot be cast to the type of `destinationArray`.
- `ArgumentOutOfRangeException`: `sourceIndex` is less than the lower bound of the first dimension of `sourceArray`.

-or-

`destinationIndex` is less than the lower bound of the first dimension of `destinationArray`.

-or-

`length` is less than zero.
- `ArgumentException`: `length` is greater than the number of elements from `sourceIndex` to the end of `sourceArray`.

-or-

`length` is greater than the number of elements from `destinationIndex` to the end of `destinationArray`.

#### Remarks
The `sourceArray` and `destinationArray` parameters must have the same number of dimensions. In addition, `destinationArray` must already have been dimensioned and must have a sufficient number of elements starting from the `destinationIndex` position to accommodate the copied data.

When copying between multidimensional arrays, the array behaves like a long one-dimensional array, where the rows (or columns) are conceptually laid end-to-end. For example, if an array has three rows (or columns) with four elements each, copying six elements from the beginning of the array would copy all four elements of the first row (or column) and the first two elements of the second row (or column). To start copying from the second element of the third row (or column), `sourceIndex` must be the upper bound of the first row (or column) plus the length of the second row (or column) plus two.

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

## Array.Copy(Array, Int64, Array, Int64, Int64) method

```csharp
public static void Copy (Array sourceArray, long sourceIndex, Array destinationArray, long destinationIndex, long length);
```

Copies a range of elements from an `Array` starting at the specified source index and pastes them to another `Array` starting at the specified destination index. The length and the indexes are specified as 64-bit integers.

Parameters:

- `sourceArray`: The `Array` that contains the data to copy.
- `sourceIndex`: A 64-bit integer that represents the index in `sourceArray` at which copying begins.
- `destinationArray`: The `Array` that receives the data.
- `destinationIndex`: A 64-bit integer that represents the index in `destinationArray` at which storing begins.
- `length`: A 64-bit integer that represents the number of elements to copy. The integer must be between zero and <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>, inclusive.

Exceptions:

- `ArgumentNullException`: `sourceArray` is `null`.

-or-

`destinationArray` is `null`.
- `RankException`: `sourceArray` and `destinationArray` have different ranks.
- `ArrayTypeMismatchException`: `sourceArray` and `destinationArray` are of incompatible types.
- `InvalidCastException`: At least one element in `sourceArray` cannot be cast to the type of `destinationArray`.
- `ArgumentOutOfRangeException`: `sourceIndex` is outside the range of valid indexes for the `sourceArray`.

-or-

`destinationIndex` is outside the range of valid indexes for the `destinationArray`.

-or-

`length` is less than 0 or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentException`: `length` is greater than the number of elements from `sourceIndex` to the end of `sourceArray`.

-or-

`length` is greater than the number of elements from `destinationIndex` to the end of `destinationArray`.

#### Remarks
The `sourceArray` and `destinationArray` parameters must have the same number of dimensions. In addition, `destinationArray` must already have been dimensioned and must have a sufficient number of elements starting from the `destinationIndex` position to accommodate the copied data.

When copying between multidimensional arrays, the array behaves like a long one-dimensional array, where the rows (or columns) are conceptually laid end-to-end. For example, if an array has three rows (or columns) with four elements each, copying six elements from the beginning of the array would copy all four elements of the first row (or column) and the first two elements of the second row (or column). To start copying from the second element of the third row (or column), `sourceIndex` must be the upper bound of the first row (or column) plus the length of the second row (or column) plus two.

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

## Array.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies all the elements of the current one-dimensional array to the specified one-dimensional array starting at the specified destination array index. The index is specified as a 32-bit integer.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the current array.
- `index`: A 32-bit integer that represents the index in the destination array at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than the lower bound of `array`.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source array is greater than the available number of elements from `index` to the end of the destination `array`.
- `ArrayTypeMismatchException`: The type of the source `Array` cannot be cast automatically to the type of the destination `array`.
- `RankException`: The source array is multidimensional.
- `InvalidCastException`: At least one element in the source `Array` cannot be cast to the type of destination `array`.

#### Remarks
This method copies all the elements of the current array instance to the `array` destination array, starting at index `index`. The `array` destination array must already have been dimensioned and must have a sufficient number of elements to accommodate the copied elements. Otherwise, the method throws an exception.

This method supports the `ICollection` interface. If implementing `ICollection` is not explicitly required, use `Array.Copy` to avoid an extra indirection.

If this method throws an exception while copying, the state of `array` is undefined.

This method is an O(`n`) operation, where `n` is `Array.Length`. It performs a shallow copy only.

## Array.CopyTo(Array, Int64) method

```csharp
public void CopyTo (Array array, long index);
```

Copies all the elements of the current one-dimensional array to the specified one-dimensional array starting at the specified destination array index. The index is specified as a 64-bit integer.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the current array.
- `index`: A 64-bit integer that represents the index in the destination array at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for `array`.
- `ArgumentException`: `array` is multidimensional.

-or-

The number of elements in the source array is greater than the available number of elements from `index` to the end of the destination `array`.
- `ArrayTypeMismatchException`: The type of the source `Array` cannot be cast automatically to the type of the destination `array`.
- `RankException`: The source `Array` is multidimensional.
- `InvalidCastException`: At least one element in the source `Array` cannot be cast to the type of destination `array`.

#### Remarks
This method copies all the elements of the current array instance to the `array` destination array, starting at index `index`. The `array` destination array must already have been dimensioned and must have a sufficient number of elements to accommodate the copied elements. Otherwise, the method throws an exception.

This method supports the `ICollection` interface. If implementing `ICollection` is not explicitly required, use `Array.Copy` to avoid an extra indirection.

If this method throws an exception while copying, the state of `array` is undefined.

This method is an O(`n`) operation, where `n` is `Array.Length`. It performs a shallow copy only.
