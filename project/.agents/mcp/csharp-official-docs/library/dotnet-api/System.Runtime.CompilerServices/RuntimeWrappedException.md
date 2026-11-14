---
title: "RuntimeWrappedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeWrappedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeWrappedException class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class RuntimeWrappedException : Exception
```

Wraps an exception that does not derive from the `Exception` class. This class cannot be inherited.

#### Remarks
Some languages, such as C++, allow you to throw exceptions of any managed type. Other languages, such as Microsoft C# and Visual Basic, require that every thrown exception be derived from the `Exception` class. To maintain compatibility between languages, the common language runtime (CLR) wraps objects that do not derive from `Exception` in a `RuntimeWrappedException` object.

You can use the `RuntimeCompatibilityAttribute` class to specify whether exceptions should appear wrapped inside catch blocks and exception filters for an assembly. Many language compilers, including the Microsoft C# and Visual Basic <example-value>, apply this attribute by default to specify the wrapping behavior.

Note that the runtime still wraps exceptions even if you use the `RuntimeCompatibilityAttribute` class to specify that you do not want them wrapped. In this case, exceptions are unwrapped only inside catch blocks or exception filters.

#### Examples
The following code example demonstrates how to throw a `String` object as an exception in C++ and catch it using a `RuntimeWrappedException` object.

## RuntimeWrappedException.RuntimeWrappedException(Object) constructor

```csharp
public RuntimeWrappedException (object thrownObject);
```

Initializes a new instance of the `RuntimeWrappedException` that contains the inner exception object.

Parameters:

- `thrownObject`: The exception getting wrapped.

To be added.

## RuntimeWrappedException.WrappedException property

```csharp
public object WrappedException { get; }
```

Gets the object that was wrapped by the `RuntimeWrappedException` object.

Returns: The object that was wrapped by the `RuntimeWrappedException` object.

#### Remarks
The `WrappedException` property gets an object that was thrown as an exception from a language that allows exceptions that do not derive from the `Exception` class.

## RuntimeWrappedException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with information about the exception.

Parameters:

- `info`: The `SerializationInfo` object that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` object that contains contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.

To be added.
