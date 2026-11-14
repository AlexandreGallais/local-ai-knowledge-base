---
title: "FormatException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/FormatException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FormatException class

Namespace: `System`

```csharp
public class FormatException : SystemException
```

The exception that is thrown when the format of an argument is invalid, or when a composite format string is not well formed.

#### Remarks
A `FormatException` exception can be thrown for one of the following reasons:

- In a call to a method that converts a string to some other data type, the string doesn't conform to the required pattern. This typically occurs when calling some methods of the `Convert` class and the `Parse` and `ParseExact` methods of some types.

In most cases, particularly if the string that you're converting is input by a user or read from a file, you should use a `try/catch` (`try/with` in F#) block and handle the `FormatException` exception if the conversion is unsuccessful. You can also replace the call to the conversion method with a call to a `TryParse` or `TryParseExact` method, if one exists. However, a `FormatException` exception that is thrown when you're trying to parse a predefined or hard-coded string indicates a program error. In this case, you should correct the error rather than handle the exception.

The conversion of a string to the following types in the `System` namespace can throw a `FormatException` exception:

- `Boolean`. The `Parse` and `ToBoolean` methods require the string to be converted to be "True", "true", "False", or "false". Any other value throws a `FormatException` exception.

- `DateTime` and `DateTimeOffset`. All date and time data is interpreted based on the formatting conventions of a particular culture: either the current culture, the invariant culture, or a specified culture. When you call the `ParseExact` and `ParseExact` methods, date and time data must also conform *exactly* to a pattern specified by one or more standard format strings or custom format strings that are provided as arguments in the method call. If it doesn't conform to an expected culture-specific pattern, a `FormatException` exception is thrown. This means that date and time data saved in a culture-specific format on one system might not parse successfully on another system.

For more information about parsing dates and times, see Parsing Date and Time Strings and the documentation for the method that threw the exception.

- **GUIDs.** The string representation of a GUID must consist of 32 hexadecimal digits (0-F), and must be in one of the five formats output by the `Guid.ToString` method. For more information, see the `Guid.Parse` method.

- **Numeric types, including all signed integers, unsigned integers, and floating-point types.** The string to be parsed must consist of the Latin digits 0-9. A positive or negative sign, decimal separator, group separators, and currency symbol may also be permitted. Trying to parse a string that contains any other character always throws a `FormatException` exception.

All numeric strings are interpreted based on the formatting conventions of a particular culture: either the current culture, the invariant culture, or a specified culture. As a result, a numeric string that is parsed by using the conventions of one culture might fail when using the conventions of another.

For more information about parsing numeric strings, see Parsing Numeric Strings and the documentation for the specific method that threw the exception.

- **Time intervals.** The string to be parsed must be either in fixed culture-insensitive format or in a culture-sensitive format defined by the current culture, the invariant culture, or a specified culture. If the string isn't in an appropriate format, or if, at the minimum, the days, hours, and minutes components of the time interval aren't present, the parsing method throws a `FormatException` exception. For more information, see the documentation for the `TimeSpan` parsing method that threw the exception.

- A type implements the `IFormattable` interface, which supports format strings that define how an object is converted to its string representation, and an invalid format string is used. This is most common in a formatting operation. In the following example, the "Q" standard format string is used in a composite format string to format a number. However, "Q" is not a valid standard format string.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/iformattable1.cs._

This exception results from a coding error. To correct the error, either remove the format string or substitute a valid one. The following example corrects the error by replacing the invalid format string with the "C" (currency) format string.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/iformattable2.cs._

A `FormatException` exception can also be thrown by parsing methods, such as `DateTime.ParseExact` and `Guid.ParseExact`, that require the string to be parsed to conform exactly to the pattern specified by a format string. In the following example, the string representation of a GUID is expected to conform to the pattern specified by the "G" standard format string. However, the `Guid` structure's implementation of `IFormattable` does not support the "G" format string.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/iformattable3.cs._

This exception also results from a coding error. To correct it, call a parsing method that doesn't require a precise format, such as `DateTime.Parse` or `Guid.Parse`, or substitute a valid format string. The following example corrects the error by calling the `Guid.Parse` method.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/iformattable4.cs._

- One or more of the indexes of the format items in a composite format string is greater than the indexes of the items in the object list or parameter array. In the following example, the largest index of a format item in the format string is 3. Because the indexes of items in the object list are zero-based, this format string would require the object list to have four items. Instead, it has only three, `dat`, `temp`, and `scale`, so the code results in a `FormatException` exception at run time:.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/example1.cs._

In this case, the `FormatException` exception is a result of developer error. It should be corrected rather than handled in a `try/catch` block by making sure that each item in the object list corresponds to the index of a format item. To correct this example, change the index of the second format item to refer to the `dat` variable, and decrement the index of each subsequent format item by one.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/example2.cs._

- The composite format string isn't well-formed. When this happens, the `FormatException` exception is always a result of developer error. It should be corrected rather than handled in a `try/catch` block.

Trying to include literal braces in a string, as the following example does, will throw the exception.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/qa3.cs._

The recommended technique for including literal braces in a composite format string is to include them in the object list and use format items to insert them into the result string. For example, you can modify the previous composite format string as shown here.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/qa3.cs._

The exception is also thrown if your format string contains a typo. The following call to the `String.Format` method omits a closing brace and pairs an opening brace with a closing bracket.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/example3.cs._

To correct the error, ensure that all opening and closing braces correspond.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/example3.cs._

- You've supplied the object list in a composite formatting method as a strongly typed parameter array, and the `FormatException` exception indicates that the index of one or more format items exceeds the number of arguments in the object list. This occurs because no explicit conversion between array types exists, so instead the compiler treats the array as a single argument rather than as a parameter array. For example, the following call to the `WriteLine` method throws a `FormatException` exception, although the highest index of the format items is 3, and the parameter array of type `Int32` has four elements.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/qa1.cs._

Instead of handling this exception, you should eliminate its cause. Because neither Visual Basic nor C# can convert an integer array to an object array, you have to perform the conversion yourself before calling the composite formatting method. The following example provides one implementation.

_Code sample not included: ~/snippets/csharp/System/FormatException/Overview/qa2.cs._

`FormatException` uses the HRESULT COR_E_FORMAT, which has the value 0x80131537.

The `FormatException` class derives from `Exception` and adds no unique members. For a list of initial property values for an instance of `FormatException`, see the `FormatException.%23ctor` constructors.

## FormatException.FormatException() constructor

```csharp
public FormatException ();
```

Initializes a new instance of the `FormatException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Invalid format." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `FormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## FormatException.FormatException(String) constructor

```csharp
public FormatException (string? message);
```

Initializes a new instance of the `FormatException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new exception using the `message` parameter. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `FormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## FormatException.FormatException(SerializationInfo, StreamingContext) constructor

```csharp
protected FormatException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `FormatException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## FormatException.FormatException(String, Exception) constructor

```csharp
public FormatException (string? message, Exception? innerException);
```

Initializes a new instance of the `FormatException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `FormatException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
