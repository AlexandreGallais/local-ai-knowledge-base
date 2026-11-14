---
title: "ArgumentOutOfRangeException class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ArgumentOutOfRangeException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ArgumentOutOfRangeException class

Namespace: `System`

```csharp
public class ArgumentOutOfRangeException : ArgumentException
```

The exception that is thrown when the value of an argument is outside the allowable range of values as defined by the invoked method.

#### Remarks

An `ArgumentOutOfRangeException` exception is thrown when a method is invoked and at least one of the arguments passed to the method is not `null` and contains an invalid value that is not a member of the set of values expected for the argument. The `ParamName` property identifies the invalid argument, and the `ActualValue` property, if a value is present, identifies the invalid value.

Typically, an `ArgumentOutOfRangeException` results from developer error. Instead of handling the exception in a `try`/`catch` block, you should eliminate the cause of the exception or, if the argument is returned by a method call or input by the user before being passed to the method that throws the exception, you should validate arguments before passing them to the method.

`ArgumentOutOfRangeException` is used extensively by:

- Classes in the `Collections` and `IO` namespaces.

- The `Array` class.

- String manipulation methods in the `String` class.

The conditions in which an `ArgumentOutOfRangeException` exception is thrown include the following:

- You are retrieving the member of a collection by its index number, and the index number is invalid.

This is the most common cause of an `ArgumentOutOfRangeException` exception. Typically, the index number is invalid for one of four reasons:

1. The collection has no members, and your code assumes that it does. The following example attempts to retrieve the first element of a collection that has no elements:

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoElements.cs._

To prevent the exception, check whether the collection's `Count` property is greater than zero before attempting to retrieve any members, as the following code fragment does.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoElements.cs._

2. In some cases, the exception may occur because you are attempting to add a member to a collection by using an index that does not exist, rather than by calling the method, such as `Add`, that exists for this purpose.  The following example attempts to add an element to a collection by using a non-existent index rather than calling the `List<T>.Add` method.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoElements2.cs._

The following code fragment corrects this error:

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoElements2.cs._

3. You're attempting to retrieve an item whose index is negative. This usually occurs because you've searched a collection for the index of a particular element and have erroneously assumed that the search is successful. In the following example, the call to the `FindIndex` method fails  to find a string equal to "Z" and so returns -1. However, this is an invalid index value.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/BadSearch.cs._

To prevent the exception, check that the search is successful by making sure that the returned index is greater than or equal to zero before attempting to retrieve the item from the collection, as the following code fragment does.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/BadSearch.cs._

4. You're attempting to retrieve an element whose index is equal to the value of the collection's `Count` property, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/OOR2.cs._

Because collections in .NET use zero-based indexing, the first element of the collection is at index 0, and the last element is at index `Count` - 1. You can eliminate the error by ensuring that you access the last element at index  `Count` - 1, as the following code does.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/OOR2.cs._

- You are attempting to perform a string operation by calling a string manipulation method, and the starting index does not exist in the string.

Overloads of methods such as such as `String.Compare`, `String.CompareOrdinal`, `String.IndexOf`, `String.IndexOfAny`, `String.Insert`, `String.LastIndexOf`, `String.LastIndexOfAny`, `String.Remove`,  or `String.Substring` that allow you to specify the starting index of the operation require that the index be a valid position within the string. Valid indexes range from 0 to `String.Length` - 1.

There are four common causes of this `ArgumentOutOfRangeException` exception:

1. You are working with an empty string, or `Empty`. Because its `Length` property returns 0, any attempt to manipulate it by index throws an `ArgumentOutOfRangeException` exception. The following example, defines a `GetFirstCharacter` method that returns the first character of a string. If the string is empty, as the final string passed to the method is, the method throws an `ArgumentOutOfRangeException` exception.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/EmptyString1.cs._

You can eliminate the exception by testing whether the string's `String.Length` is greater than zero or by calling the `String.IsNullOrEmpty` method to ensure that the string is not `null` or empty. The following code fragment does the latter. In this case, if the string is `null` or empty, the `GetFirstCharacter` method returns U+0000.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/EmptyString1.cs._

2. You're manipulating a string based on the position of a substring within that string, and you've failed to determine whether the substring was actually found.

The following example extracts the second word of a two-word phrase. It throws an `ArgumentOutOfRangeException` exception if the phrase consists of only one word, and therefore does not contain an embedded space character.  This occurs because the call to the `IndexOf` method returns -1 to indicate that the search failed, and this invalid value is then passed to the  `Substring` method.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoFind1.cs._

To eliminate the exception, validate the value returned by the string search method before calling the string manipulation method.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/NoFind2.cs._

3. You've attempted to extract a substring that is outside the range of the current string.

The methods that extract substrings all require that you specify the starting position of the substring and, for substrings that do not continue to the end of the string, the number of characters in the substring. Note that this is not the *index* of the last character in the substring.

An `ArgumentOutOfRangeException` exception is typically thrown in this case because you've incorrectly calculated the number of characters in the substring.  If you are using a search method like `String.IndexOf` to identify the starting and ending positions of a substring:

- If the character in the ending position returned by `String.IndexOf` is to be included in the substring, the ending position of the substring is given by the formula

```
         endIndex - startIndex + 1
```

- If the character in the ending position returned by `String.IndexOf` is to be excluded from the substring, the ending position of the substring is given by the formula

```
         endIndex - startIndex
```

The following example defines a `FindWords` method that uses the `IndexOfAny` method to identify space characters and punctuation marks in a string and returns an array that contains the words found in the string.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/FindWords1.cs._

- You have passed a negative number to a method with an argument that requires only positive numbers and zero, or you have passed either a negative number or zero to a method with an argument that requires only positive numbers.

For example, the `CreateInstance` method requires that you specify the number of elements in each dimension of a two-dimensional array; valid values for each dimension can range from 0 to `MaxValue`. But because the dimension argument in the following example has a negative value, the method throws an `ArgumentOutOfRangeException` exception.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/OOR1.cs._

To correct the error, ensure that the value of the invalid argument is non-negative. You can do this by providing a valid value, as the following code fragment does.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/OOR1.cs._

You can also validate the input and, if it is invalid, take some action. The following code fragment displays an error message instead of calling the method.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/OOR1.cs._

- A race condition exists in an app that is multithreaded or has tasks that  execute asynchronously and that updates an array or collection.

The following example uses a `List<T>` object to populate a collection of `Continent` objects. It throws an `ArgumentOutOfRangeException` if the example attempts to display the seven items in the collection before the collection is fully populated.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/Race1.cs._

In this case, two resources are accessed from multiple threads:

- The `continents` collection. Its `List<T>.Add` method is called from multiple threads. In addition, the main or primary thread assumes the collection is fully populated with seven elements when it iterates its members.

- The `msg` string, which is concatenated from multiple threads.

To correct the error, ensure that shared state is accessed in a thread-safe way, as follows.

- if your app uses an array or collection object, consider using a thread-safe collection class, such as the types in the `Concurrent` namespace or the `Immutable` out-of-band release.

- Ensure that shared state (that is, resources that can be accessed by multiple threads) is accessed in a thread-safe way, so that only one thread at a time has exclusive access to the resources. A large number of classes, such as `CountdownEvent`, `Interlocked`, `Monitor`, and `Mutex`, are available to synchronize access to resources. For more information, see Threading. In addition, language support is available through the lock statement in C# and the SyncLock construct in Visual Basic.

The following example addresses the `ArgumentOutOfRangeException` and the other issues from the previous example. It replaces the `List<T>` object with a   `ConcurrentBag<T>` object to ensure that access to the collection is thread-safe, uses a `CountdownEvent` object to ensure that the application thread continues only after other threads have executed, and uses a lock to ensure that only one thread can access the `msg` variable at a time.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/Race2.cs._

`ArgumentOutOfRangeException` uses the HRESULT COR_E_ARGUMENTOUTOFRANGE, which has the value 0x80131502.

For a list of initial property values for an instance of `ArgumentOutOfRangeException`, see the `ArgumentOutOfRangeException` constructors.

#### Examples

The following example defines a class to contain information about an invited guest. If the guest is younger than 21, an `ArgumentOutOfRangeException` exception is thrown.

_Code sample not included: ~/snippets/csharp/System/ArgumentOutOfRangeException/Overview/program.cs._

## ArgumentOutOfRangeException.ArgumentOutOfRangeException() constructor

```csharp
public ArgumentOutOfRangeException ();
```

Initializes a new instance of the `ArgumentOutOfRangeException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Nonnegative number required." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `ArgumentOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentOutOfRangeException.Message`|The localized error message string.|

## ArgumentOutOfRangeException.ArgumentOutOfRangeException(String) constructor

```csharp
public ArgumentOutOfRangeException (string? paramName);
```

Initializes a new instance of the `ArgumentOutOfRangeException` class with the name of the parameter that causes this exception.

Parameters:

- `paramName`: The name of the parameter that causes this exception.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Nonnegative number required." This message takes into account the current system culture.

This constructor initializes the `ParamName` property of the new instance using the `paramName` parameter. The content of `paramName` is intended to be understood by humans.

The following table shows the initial property values for an instance of `ArgumentOutOfRangeException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`ArgumentOutOfRangeException.Message`|The empty string ("").|
|`ArgumentException.ParamName`|The parameter name string.|

## ArgumentOutOfRangeException.ArgumentOutOfRangeException(SerializationInfo, StreamingContext) constructor

```csharp
protected ArgumentOutOfRangeException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `ArgumentOutOfRangeException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: An object that describes the source or destination of the serialized data.

To be added.
