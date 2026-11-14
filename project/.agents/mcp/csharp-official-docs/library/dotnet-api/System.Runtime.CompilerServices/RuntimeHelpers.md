---
title: "RuntimeHelpers class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeHelpers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeHelpers class

Namespace: `System.Runtime.CompilerServices`

```csharp
public static class RuntimeHelpers
```

Provides a set of static methods and properties that provide support for compilers. This class cannot be inherited.

#### Examples
The following example shows how to reliably set handles by using the `RuntimeHelpers.PrepareConstrainedRegions` method. To reliably set a handle to a specified pre-existing handle, you must ensure that the allocation of the native handle and the subsequent recording of that handle within a `SafeHandle` object is atomic. Any failure between these operations (such as a thread abort or out-of-memory exception) will result in the native handle being leaked.  You can use the `RuntimeHelpers.PrepareConstrainedRegions` method to make sure that the handle is not leaked.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/RuntimeHelpers/Overview/sample.cs._

## RuntimeHelpers.OffsetToStringData property

```csharp
public static int OffsetToStringData { get; }
```

Gets the offset, in bytes, to the data in the given string.

Returns: The byte offset, from the start of the `String` object to the first character in the string.

To be added.

## RuntimeHelpers.AllocateTypeAssociatedMemory(Type, Int32) method

```csharp
public static IntPtr AllocateTypeAssociatedMemory (Type type, int size);
```

Allocates memory that's associated with the `type` and is freed if and when the `Type` is unloaded.

Parameters:

- `type`: The type associated with the allocated memory.
- `size`: The amount of memory to allocate, in bytes.

Returns: The allocated memory.

To be added.

## RuntimeHelpers.AllocateTypeAssociatedMemory(Type, Int32, Int32) method

```csharp
public static IntPtr AllocateTypeAssociatedMemory (Type type, int size, int alignment);
```

To be added.

Parameters:

- `type`: To be added.
- `size`: To be added.
- `alignment`: To be added.

Returns: To be added.

To be added.

## RuntimeHelpers.Box(Byte, RuntimeTypeHandle) method

```csharp
public static object? Box (ref byte target, RuntimeTypeHandle type);
```

Creates a boxed object of the specified type from the data located at the target reference.

Parameters:

- `target`: The target data.
- `type`: The type of box to create.

Returns: A boxed object containing the specified data.

Exceptions:

- `ArgumentNullException`: The specified type handle is `null`.
- `ArgumentException`: The specified type cannot have a boxed instance of itself created.
- `NotSupportedException`: The passed in type is a byref-like type.

To be added.

## RuntimeHelpers.CreateSpan<T>(RuntimeFieldHandle) method

```csharp
public static ReadOnlySpan<T> CreateSpan<T> (RuntimeFieldHandle fldHandle);
```

Provides a fast way to access constant data stored in a module as a `ReadOnlySpan<T>`.

Parameters:

- `T`: The type of the `ReadOnlySpan` data.
- `fldHandle`: A field handle that specifies the location of the data to be referred to by the `ReadOnlySpan<T>`. The Rva of the field must be aligned on a natural boundary of `T`.

Returns: The data stored in the field.

Exceptions:

- `ArgumentException`: `fldHandle` refers to a field that's not an Rva or is misaligned, or `T` is of an invalid type.

#### Remarks

This method is intended for compiler use rather than use directly in code. `T` must be one of `byte`, `sbyte`, `char`, `short`, `ushort`, `int`, `long`, `ulong`, `float`, or `double`.

## RuntimeHelpers.EnsureSufficientExecutionStack() method

```csharp
public static void EnsureSufficientExecutionStack ();
```

Ensures that the remaining stack space is large enough to execute the average .NET function.

Exceptions:

- `InsufficientExecutionStackException`: The available stack space is insufficient to execute the average .NET function.

#### Remarks
`RuntimeHelpers.EnsureSufficientExecutionStack` provides information about an artificially limited stack that preserves enough space for an exception to be raised and recovery action to be taken. The artificial stack limit is chosen by the common language runtime to ensure that enough space remains to throw an exception safely.

This method is useful in situations where stack overflow might occur as a result of unbounded recursion. It is intended for use in compiler services scenarios, although it can also be used safely in other development scenarios.

If the stack space is sufficient, the exception is not thrown, and most .NET types and members can still be called.

## RuntimeHelpers.Equals(Object, Object) method

```csharp
public static bool Equals (object? o1, object? o2);
```

Determines whether the specified `Object` instances are considered equal.

Parameters:

- `o1`: The first object to compare.
- `o2`: The second object to compare.

Returns: `true` if `o1` is the same instance as `o2`, or if both are `null`, or if both are the same value type and the values of their underlying memory are equal; otherwise, `false`.

#### Remarks
This method is used by compilers.

#### Examples
The following example demonstrates how to compare two objects by using the `RuntimeHelpers.Equals` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/RuntimeHelpers/Equals/example.cs._

## RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup(RuntimeHelpers+TryCode, RuntimeHelpers+CleanupCode, Object) method

```csharp
public static void ExecuteCodeWithGuaranteedCleanup (System.Runtime.CompilerServices.RuntimeHelpers.TryCode code, System.Runtime.CompilerServices.RuntimeHelpers.CleanupCode backoutCode, object? userData);
```

Executes code using a `Delegate` while using another `Delegate` to execute additional code in case of an exception.

Parameters:

- `code`: A delegate to the code to try.
- `backoutCode`: A delegate to the code to run if an exception occurs.
- `userData`: The data to pass to `code` and `backoutCode`.

To be added.

## RuntimeHelpers.GetHashCode(Object) method

```csharp
public static int GetHashCode (object? o);
```

Serves as a hash function for a particular object, and is suitable for use in algorithms and data structures that use hash codes, such as a hash table.

Parameters:

- `o`: An object to retrieve the hash code for.

Returns: A hash code for the object identified by the `o` parameter.

The `RuntimeHelpers.GetHashCode` method always calls the `Object.GetHashCode` method non-virtually, even if the object's type has overridden the `Object.GetHashCode` method. Therefore, using `RuntimeHelpers.GetHashCode` might differ from calling `GetHashCode` directly on the object with the `Object.GetHashCode` method.

> **Warning:**
> Although the `RuntimeHelpers.GetHashCode` method returns identical hash codes for identical object references, you should not use this method to test for object identity, because this hash code does not uniquely identify an object reference. To test for object identity (that is, to test that two objects reference the same object in memory), call the `Object.ReferenceEquals` method. Nor should you use `RuntimeHelpers.GetHashCode` to test whether two strings represent equal object references, because the string is interned. To test for string interning, call the `String.IsInterned` method.

The `Object.GetHashCode` and `RuntimeHelpers.GetHashCode` methods differ as follows:

- `Object.GetHashCode` returns a hash code that is based on the object's definition of equality. For example, two strings with identical contents will return the same value for `Object.GetHashCode`.
- `RuntimeHelpers.GetHashCode` returns a hash code that indicates object identity. That is, two string variables whose contents are identical and that represent a string that is interned (see the String Interning section) or that represent a single string in memory return identical hash codes.

> **Important:**
> Note that `RuntimeHelpers.GetHashCode` always returns identical hash codes for equal object references. However, the reverse is not true: equal hash codes do not indicate equal object references. A particular hash code value is not unique to a particular object reference; different object references can generate identical hash codes.

This method is used by compilers.

#### String interning

The common language runtime (CLR) maintains an internal pool of strings and stores literals in the pool. If two strings (for example, `str1` and `str2`) are formed from an identical string literal, the CLR will set `str1` and `str2` to point to the same location on the managed heap to conserve memory. Calling `RuntimeHelpers.GetHashCode` on these two string objects will produce the same hash code, contrary to the second bulleted item in the previous section.

The CLR adds only literals to the pool. Results of string operations such as concatenation are not added to the pool, unless the compiler resolves the string concatenation as a single string literal. Therefore, if `str2` was created as the result of a concatenation operation, and `str2` is identical to `str1`, using `RuntimeHelpers.GetHashCode` on these two string objects will not produce the same hash code.

If you want to add a concatenated string to the pool explicitly, use the `String.Intern` method.

You can also use the `String.IsInterned` method to check whether a string has an interned reference.

#### Examples

The following example demonstrates the difference between the `Object.GetHashCode` and `RuntimeHelpers.GetHashCode` methods. The output from the example illustrates the following:

- Both sets of hash codes for the first set of strings passed to the `ShowHashCodes` method are different, because the strings are completely different.

- `Object.GetHashCode` generates the same hash code for the second set of strings passed to the `ShowHashCodes` method, because the strings are equal. However, the `RuntimeHelpers.GetHashCode` method does not. The first string is defined by using a string literal and so is interned. Although the value of the second string is the same, it is not interned, because it is returned by a call to the `String.Format` method.

- In the case of the third string, the hash codes produced by `Object.GetHashCode` for both strings are identical, as are the hash codes produced by `RuntimeHelpers.GetHashCode`. This is because the compiler has treated the value assigned to both strings as a single string literal, and so the string variables refer to the same interned string.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/RuntimeHelpers/GetHashCode/gethashcodeex1.cs._

## RuntimeHelpers.GetObjectValue(Object) method

```csharp
public static object? GetObjectValue (object? obj);
```

Boxes a value type.

Parameters:

- `obj`: The value type to be boxed.

Returns: A boxed copy of `obj` if it is a value class; otherwise, `obj` itself.

#### Remarks
Boxing a value type creates an object and performs a shallow copy of the fields of the specified value type into the new object.

This method allows a value class to be manipulated as an object while it retains the aliasing behavior of a value class.

The return value depends on whether the value class is mutable or immutable:

- If the value being assigned is a mutable value class, the method returns a shallow copy of the class, because value classes have copy semantics.

- If the value being assigned is an immutable value class, the method returns the object itself, instead of a copy of the class.

Compilers of dynamically typed languages can use this method to make sure that boxed value types work identically to unboxed value types. That is, boxed value types get cloned when you pass them around, and they are always passed by value. The compiler can call `RuntimeHelpers.GetObjectValue` to assign a value type to an object or to pass a value type as a parameter of a type object.

This method is used by compilers.

#### Examples
The following example demonstrates how to box a value class by using the `RuntimeHelpers.GetObjectValue` method.

_Code sample not included: ~/snippets/csharp/System.Runtime.CompilerServices/RuntimeHelpers/GetObjectValue/example.cs._

## RuntimeHelpers.GetSubArray<T>(T[], Range) method

```csharp
public static T[] GetSubArray<T> (T[] array, Range range);
```

Slices the specified array using the specified range.

Parameters:

- `T`: The type of the elements in the array.
- `array`: The array to slice.
- `range`: An object that determines the portion of `array` to include in the slice.

Returns: The subarray defined by `range`.

To be added.

## RuntimeHelpers.GetUninitializedObject(Type) method

```csharp
public static object GetUninitializedObject (Type type);
```

Returns an uninitialized instance of the system-provided type.

Parameters:

- `type`: A system-provided type.

Returns: An object representing the uninitialized system-provided type instance.

To be added.

## RuntimeHelpers.InitializeArray(Array, RuntimeFieldHandle) method

```csharp
public static void InitializeArray (Array array, RuntimeFieldHandle fldHandle);
```

Provides a fast way to initialize an array from data that is stored in a module.

Parameters:

- `array`: The array to be initialized.
- `fldHandle`: A field handle that specifies the location of the data used to initialize the array.

#### Remarks
This method is used by compilers.

## RuntimeHelpers.IsReferenceOrContainsReferences<T>() method

```csharp
public static bool IsReferenceOrContainsReferences<T> () where T : allows ref struct;
```

Returns a value that indicates whether the specified type is a reference type or a value type that contains references or by-refs.

Parameters:

- `T`: The type.

Returns: `true` if the given type is a reference type or a value type that contains references or by-refs; otherwise, `false`.

Prior to .NET 9, this API doesn't support types that can contain by-refs.

## RuntimeHelpers.PrepareConstrainedRegions() method

```csharp
public static void PrepareConstrainedRegions ();
```

Designates a body of code as a constrained execution region (CER).

To be added.

## RuntimeHelpers.PrepareConstrainedRegionsNoOP() method

```csharp
public static void PrepareConstrainedRegionsNoOP ();
```

Designates a body of code as a constrained execution region (CER) without performing any probing.

To be added.

## RuntimeHelpers.PrepareContractedDelegate(Delegate) method

```csharp
public static void PrepareContractedDelegate (Delegate d);
```

Provides a way for applications to dynamically prepare `AppDomain` event delegates.

Parameters:

- `d`: The event delegate to prepare.

To be added.

## RuntimeHelpers.PrepareDelegate(Delegate) method

```csharp
public static void PrepareDelegate (Delegate d);
```

Indicates that the specified delegate should be prepared for inclusion in a constrained execution region (CER).

Parameters:

- `d`: The delegate type to prepare.

To be added.
