---
title: "Marshal class (part 2 of 13)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/Marshal.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Marshal class (part 2 of 13)

## Marshal.Copy(Int32[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (int[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed 32-bit signed integer array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `startIndex` or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample3.cs._

## Marshal.Copy(Int64[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (long[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed 64-bit signed integer array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `source`, `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample5.cs._

## Marshal.Copy(IntPtr, Byte[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, byte[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed 8-bit unsigned integer array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample.cs._

## Marshal.Copy(IntPtr, Char[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, char[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed character array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample1.cs._

## Marshal.Copy(IntPtr, Double[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, double[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed double-precision floating-point number array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample2.cs._

## Marshal.Copy(IntPtr, Int16[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, short[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed 16-bit signed integer array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample4.cs._

## Marshal.Copy(IntPtr, Int32[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, int[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed 32-bit signed integer array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample3.cs._

## Marshal.Copy(IntPtr, Int64[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, long[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed 64-bit signed integer array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the`source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

#### Examples
The following example copies an array to unmanaged memory and then copies the unmanaged array back to managed memory.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/Marshal/Copy/sample5.cs._

## Marshal.Copy(IntPtr, IntPtr[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, IntPtr[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed `IntPtr` array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Therefore, the unmanaged data that corresponds to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling the `Marshal.Copy` method.

## Marshal.Copy(IntPtr, Single[], Int32, Int32) method

```csharp
public static void Copy (IntPtr source, float[] destination, int startIndex, int length);
```

Copies data from an unmanaged memory pointer to a managed single-precision floating-point number array.

Parameters:

- `source`: The memory pointer to copy from.
- `destination`: The array to copy to.
- `startIndex`: The zero-based index in the destination array where copying should start.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
Unmanaged, C-style arrays do not contain bounds information, which prevents the `startIndex` and `length` parameters from being validated. Thus, the unmanaged data corresponding to the `source` parameter populates the managed array regardless of its usefulness. You must initialize the managed array with the appropriate size before calling this method.

## Marshal.Copy(IntPtr[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (IntPtr[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed `IntPtr` array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentNullException`: `source`, `destination`, `startIndex`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed `IntPtr` array to an unmanaged C-style array.

## Marshal.Copy(Single[], Int32, IntPtr, Int32) method

```csharp
public static void Copy (float[] source, int startIndex, IntPtr destination, int length);
```

Copies data from a one-dimensional, managed single-precision floating-point number array to an unmanaged memory pointer.

Parameters:

- `source`: The one-dimensional array to copy from.
- `startIndex`: The zero-based index in the source array where copying should start.
- `destination`: The memory pointer to copy to.
- `length`: The number of array elements to copy.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` and `length` are not valid.
- `ArgumentNullException`: `source`, `startIndex`, `destination`, or `length` is `null`.

#### Remarks
You can use this method to copy a subset of a one-dimensional managed array to an unmanaged C-style array.

## Marshal.CreateAggregatedObject(IntPtr, Object) method

```csharp
public static IntPtr CreateAggregatedObject (IntPtr pOuter, object o);
```

Aggregates a managed object with the specified COM object.

Parameters:

- `pOuter`: The outer `IUnknown` pointer.
- `o`: An object to aggregate.

Returns: The inner `IUnknown` pointer of the managed object.

Exceptions:

- `ArgumentException`: `o` is a Windows Runtime object.

#### Remarks
The `Marshal.CreateAggregatedObject` method aggregates the inner managed pointer of a managed object with the specified outer pointer, and then returns an inner IUnknown pointer of the managed object.

## Marshal.CreateAggregatedObject<T>(IntPtr, T) method

```csharp
public static IntPtr CreateAggregatedObject<T> (IntPtr pOuter, T o);
```

Aggregates a managed object of the specified type with the specified COM object.

Parameters:

- `T`: The type of the managed object to aggregate.
- `pOuter`: The outer IUnknown pointer.
- `o`: The managed object to aggregate.

Returns: The inner IUnknown pointer of the managed object.

Exceptions:

- `ArgumentException`: `o` is a Windows Runtime object.

#### Remarks
The `Marshal.CreateAggregatedObject` method aggregates the inner managed pointer of a managed object of a specified type with the specified outer pointer, and returns an inner IUnknown pointer of the managed object.
