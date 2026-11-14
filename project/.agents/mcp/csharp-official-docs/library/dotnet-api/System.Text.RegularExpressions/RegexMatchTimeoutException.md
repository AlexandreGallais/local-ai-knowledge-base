---
title: "RegexMatchTimeoutException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexMatchTimeoutException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexMatchTimeoutException class

Namespace: `System.Text.RegularExpressions`

```csharp
public class RegexMatchTimeoutException : TimeoutException
```

The exception that is thrown when the execution time of a regular expression pattern-matching
method exceeds its time-out interval.

The presence of a `RegexMatchTimeoutException` exception generally indicates one
of the following conditions:

The regular expression engine is backtracking excessively as it attempts to match the input
text to the regular expression pattern.

The time-out interval has been set too low, especially given high machine load.

The way in which an exception handler handles an exception depends on the cause of the exception:

If the time-out results from excessive backtracking, your exception handler should abandon the
attempt to match the input and inform the user that a time-out has occurred in the regular
expression pattern-matching method. If possible, information about the regular expression pattern,
which is available from the `RegexMatchTimeoutException.Pattern` property, and the input that caused excessive
backtracking, which is available from the `RegexMatchTimeoutException.Input` property, should be logged so that
the issue can be investigated and the regular expression pattern modified. Time-outs due to
excessive backtracking are always reproducible.

If the time-out results from setting the time-out threshold too low, you can increase the time-out
interval and retry the matching operation. The current time-out interval is available from the
`RegexMatchTimeoutException.MatchTimeout` property. When a `RegexMatchTimeoutException` exception is
thrown, the regular expression engine maintains its state so that any future invocations return the
same result, as if the exception did not occur. The recommended pattern is to wait for a brief,
random time interval after the exception is thrown before calling the matching method again. This
can be repeated several times. However, the number of repetitions should be small in case the
time-out is caused by excessive backtracking.

## RegexMatchTimeoutException.RegexMatchTimeoutException() constructor

```csharp
public RegexMatchTimeoutException ();
```

Initializes a new instance of the `RegexMatchTimeoutException` class with a
system-supplied message.

This constructor initializes the `Exception.Message` property of the new instance
to a system-supplied message that describes the error. This message is localized for the
current system culture.

## RegexMatchTimeoutException.RegexMatchTimeoutException(String) constructor

```csharp
public RegexMatchTimeoutException (string message);
```

Initializes a new instance of the `RegexMatchTimeoutException` class with the
specified message string.

Parameters:

- `message`: A string that describes the exception.

The `message` string is assigned to the
`Exception.Message` property. The string should be localized for the current
culture.

## RegexMatchTimeoutException.RegexMatchTimeoutException(SerializationInfo, StreamingContext) constructor

```csharp
protected RegexMatchTimeoutException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `RegexMatchTimeoutException` class with
serialized data.

Parameters:

- `info`: The object that contains the serialized data.
- `context`: The stream that contains the serialized data.

#### Remarks
This constructor is not called directly by your code to instantiate the `RegexMatchTimeoutException` object. Instead, it is called by the `IFormatter.Deserialize` method when deserializing the `RegexMatchTimeoutException` object from a stream.

## RegexMatchTimeoutException.RegexMatchTimeoutException(String, Exception) constructor

```csharp
public RegexMatchTimeoutException (string message, Exception inner);
```

Initializes a new instance of the `RegexMatchTimeoutException` class with a
specified error message and a reference to the inner exception that is the cause of this
exception.

Parameters:

- `message`: A string that describes the exception.
- `inner`: The exception that is the cause of the current exception.

Typically, you use this overload to handle an exception in a `try`/`catch` block.
The `inner` parameter should be a reference to the exception object handled
in the `catch` block, or it can be `null`. This value is then assigned
to the `Exception.InnerException` property.

The `message` string is assigned to the
`Exception.Message` property. The string should be localized for the current
culture.

## RegexMatchTimeoutException.RegexMatchTimeoutException(String, String, TimeSpan) constructor

```csharp
public RegexMatchTimeoutException (string regexInput, string regexPattern, TimeSpan matchTimeout);
```

Initializes a new instance of the `RegexMatchTimeoutException` class with
information about the regular expression pattern, the input text, and the time-out interval.

Parameters:

- `regexInput`: The input text processed by the regular expression engine when the
time-out occurred.
- `regexPattern`: The pattern used by the regular expression engine when the time-out
occurred.
- `matchTimeout`: The time-out interval.

The `regexInput`, `regexPattern`, and
`matchTimeout` values are assigned to the `RegexMatchTimeoutException.Input`,
`RegexMatchTimeoutException.Pattern`, and `RegexMatchTimeoutException.MatchTimeout` properties of the new
`RegexMatchTimeoutException` object.

## RegexMatchTimeoutException.Input property

```csharp
public string Input { get; }
```

Gets the input text that the regular expression engine was processing when the time-out
occurred.

Returns: The regular expression input text.

This property reflects the value of the `regexInput` parameter of the
`RegexMatchTimeoutException.#ctor` constructor. If this
parameter is not explicitly initialized in a constructor call, its value is
`String.Empty`.

When the exception is thrown by the regular expression engine, the value of the
`RegexMatchTimeoutException.Input` property reflects the entire input string passed to the regular
expression engine. It does not reflect a partial string, such as the substring that the
engine searches in the call to a method such as
`Regex.Match`.

## RegexMatchTimeoutException.MatchTimeout property

```csharp
public TimeSpan MatchTimeout { get; }
```

Gets the time-out interval for a regular expression match.

Returns: The time-out interval.

This property reflects the value of the `matchTimeout` parameter of the
`RegexMatchTimeoutException.#ctor` constructor. If the
parameter is not properly initialized in a constructor call, its value is
`TimeSpan.FromTicks(-1)`.

The value of this property reflects the time-out interval set in the call to the
`Regex` constructor or static method. It does not reflect the exact interval
that has elapsed from the beginning of the method call to the time the exception is thrown.

## RegexMatchTimeoutException.Pattern property

```csharp
public string Pattern { get; }
```

Gets the regular expression pattern that was used in the matching operation when the time-out
occurred.

Returns: The regular expression pattern.

This property reflects the value of the `regexPattern` parameter of the
`RegexMatchTimeoutException.#ctor` constructor. If the
parameter is not properly initialized in a constructor call, its value is
`String.Empty`.

## RegexMatchTimeoutException.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data needed to serialize a
`RegexMatchTimeoutException` object.

Parameters:

- `info`: The serialization information object to populate with data.
- `context`: The destination for this serialization.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `RegexMatchTimeoutException` instance is cast to an `ISerializable` interface object.

Any objects that are included in the `SerializationInfo` object are automatically tracked and serialized by the formatter.
