---
title: "IndexOutOfRangeException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IndexOutOfRangeException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IndexOutOfRangeException class

Namespace: `System`

```csharp
public sealed class IndexOutOfRangeException : SystemException
```

The exception that is thrown when an attempt is made to access an element of an array or collection with an index that is outside its bounds.

#### Remarks
An `IndexOutOfRangeException` exception is thrown when an invalid index is used to access a member of an array or a collection, or to read or write from a particular location in a buffer. This exception  inherits from the `Exception` class but adds no unique members.

Typically, an `IndexOutOfRangeException` exception is thrown as a result of developer error. Instead of handling the exception, you should diagnose the cause of the error and correct your code. The most common causes of the error are:

- Forgetting that the upper bound of a collection or a zero-based array is one less than its number of members or elements, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/length1.cs._

To correct the error, you can use code like the following.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/length2.cs._

Alternately, instead of iterating all the elements in the array by their index, you can use the `foreach` statement (in C#), the `for...in` statement (in F#), or the `For Each` statement (in Visual Basic).

- Attempting to assign an array element to another array that has not been adequately dimensioned and that has fewer elements than the original array. The following example attempts to assign the last element in the `value1` array to the same element in the `value2` array. However, the `value2` array has been incorrectly dimensioned to have six instead of seven elements. As a result, the assignment throws an `IndexOutOfRangeException` exception.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/Uninit1.cs._

- Using a value returned by a search method to iterate a portion of an array or collection starting at a particular index position. If you forget to check whether the search operation found a match, the runtime throws an `IndexOutOfRangeException` exception, as shown in this example.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/negative1.cs._

In this case, the `List<T>.IndexOf` method returns -1, which is an invalid index value, when it fails to find a match. To correct this error, check the search method's return value before iterating the array, as shown in this example.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/negative2.cs._

- Trying to use or enumerate a result set, collection, or array returned by a query without testing whether the returned object has any valid data.

- Using a computed value to define the starting index, the ending index, or the number of items to be iterated. If the result of the computation is unexpected, it might result in an `IndexOutOfRangeException` exception. You should check your program's logic in calculating the index value and validate the value before iterating the array or collection. The following conditions must all be true; otherwise, an `IndexOutOfRangeException` exception is thrown:

- The starting index must be greater than or equal to `Array.GetLowerBound` for the dimension of the array that you want to iterate, or greater than or equal to 0 for a collection.
- The ending index cannot exceed `Array.GetUpperBound` for the dimension of the array that you want to iterate, or cannot be greater than or equal to the `Count` property of a collection.
- The following equation must be true for the dimension of the array that you want to iterate:

```
    start_index >= lower_bound And start_index + items_to_iterate - 1 <= upper_bound
```

For a collection, the following equation must be true:

```
    start_index >= 0 And start_index + items_to_iterate <= Count
```

> **Tip:**
> The starting index of an array or collection can never be a negative number.

- Assuming that an array must be zero-based. Arrays that are not zero-based can be created by the `CreateInstance` method and can be returned by COM interop, although they aren't CLS-compliant. The following example illustrates the `IndexOutOfRangeException` that is thrown when you try to iterate a non-zero-based array created by the `CreateInstance` method.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/nonzero1.cs._

To correct the error, as the following example does, you can call the `Array.GetLowerBound` method instead of making assumptions about the starting index of an array.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/nonzero2.cs._

Note that when you call the `Array.GetLowerBound` method to get the starting index of an array, you should also call the `GetUpperBound` method to get its ending index.

- Confusing an index and the value at that index in a numeric array or collection. This issue usually occurs when using the `foreach` statement (in C#), the `for...in` statement (in F#), or the `For Each` statement (in Visual Basic). The following example illustrates the problem.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/foreach1.cs._

The iteration construct returns each value in an array or collection, not its index. To eliminate the exception, use this code.

_Code sample not included: ~/snippets/csharp/System/IndexOutOfRangeException/Overview/foreach2.cs._

- Providing an invalid column name to the `Sort` property.

- Violating thread safety. Operations such as reading from the same `StreamReader` object, writing to the same `StreamWriter` object from multiple threads, or enumerating the objects in a `Hashtable` from different threads can throw an `IndexOutOfRangeException` if the object isn't accessed in a thread-safe way. This exception is typically intermittent because it relies on a race condition.

Using hard-coded index values to manipulate an array is likely to throw an exception if the index value is incorrect or invalid, or if the size of the array being manipulation is unexpected. To prevent an operation from throwing an  `IndexOutOfRangeException` exception, you can do the following:

- Iterate the elements of the array using the foreach statement (in C#), the for...in statement (in F#), or the For Each...Next construct (in Visual Basic)  instead of iterating elements by index.

- Iterate the elements by index starting with the index returned by the `Array.GetLowerBound` method and ending with the index returned by the `Array.GetUpperBound` method.

- If you are assigning elements in one array to another, ensure that  the target array has at least as many elements as the source array by comparing their `Array.Length` properties.

For a list of initial property values for an instance of `IndexOutOfRangeException`, see the `IndexOutOfRangeException` constructors.

The following intermediate language (IL) instructions throw `IndexOutOfRangeException`:

- ldelem.\<type>
- ldelema
- stelem.\<type>

`IndexOutOfRangeException` uses the HRESULT COR_E_INDEXOUTOFRANGE, which has the value 0x80131508.

## IndexOutOfRangeException.IndexOutOfRangeException() constructor

```csharp
public IndexOutOfRangeException ();
```

Initializes a new instance of the `IndexOutOfRangeException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "An array index is out of range." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `IndexOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## IndexOutOfRangeException.IndexOutOfRangeException(String) constructor

```csharp
public IndexOutOfRangeException (string? message);
```

Initializes a new instance of the `IndexOutOfRangeException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `IndexOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## IndexOutOfRangeException.IndexOutOfRangeException(String, Exception) constructor

```csharp
public IndexOutOfRangeException (string? message, Exception? innerException);
```

Initializes a new instance of the `IndexOutOfRangeException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `IndexOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
