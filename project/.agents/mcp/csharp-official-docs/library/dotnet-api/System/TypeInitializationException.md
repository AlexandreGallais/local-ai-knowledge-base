---
title: "TypeInitializationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/TypeInitializationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeInitializationException class

Namespace: `System`

```csharp
public sealed class TypeInitializationException : SystemException
```

The exception that is thrown as a wrapper around the exception thrown by the class initializer. This class cannot be inherited.

When a class initializer fails to initialize a type, a `TypeInitializationException` is created and passed a reference to the exception thrown by the type's class initializer. The `InnerException` property of `TypeInitializationException` holds the underlying exception.

Typically, the `TypeInitializationException` exception reflects a catastrophic condition (the runtime is unable to instantiate a type) that prevents an application from continuing. Most commonly, the `TypeInitializationException` is thrown in response to some change in the executing environment of the application. Consequently, other than possibly for troubleshooting debug code, the exception should not be handled in a `try`/`catch` block. Instead, the cause of the exception should be investigated and eliminated.

`TypeInitializationException` uses the HRESULT `COR_E_TYPEINITIALIZATION`, which has the value 0x80131534.

For a list of initial property values for an instance of `TypeInitializationException`, see the `TypeInitializationException.%23ctor` constructors.

The following sections describe some of the situations in which a `TypeInitializationException` exception is thrown.

#### Static constructors

A static constructor, if one exists, is called automatically by the runtime before creating a new instance of a type. Static constructors can be explicitly defined by a developer. If a static constructor is not explicitly defined, compilers automatically create one to initialize any `static` (in C# or F#) or `Shared` (in Visual Basic) members of the type. For more information on static constructors, see Static Constructors.

Most commonly, a `TypeInitializationException` exception is thrown when a static constructor is unable to instantiate a type. The `InnerException` property indicates why the static constructor was unable to instantiate the type. Some of the more common causes of a `TypeInitializationException` exception are:

- An unhandled exception in a static constructor

If an exception is thrown in a static constructor, that exception is wrapped in a `TypeInitializationException` exception, and the type cannot be instantiated.

What often makes this exception difficult to troubleshoot is that static constructors are not always explicitly defined in source code. A static constructor exists in a type if:

- It has been explicitly defined as a member of a type.

- The type has `static` (in C# or F#) or `Shared` (in Visual Basic) variables that are declared and initialized in a single statement. In this case, the language compiler generates a static constructor for the type. For instance, when the C# and VB compilers compile the following example, they generate the IL for a static constructor that is similar to this:

```il
    .method private specialname rtspecialname static
            void  .cctor() cil managed
    {
      // Code size       12 (0xc)
      .maxstack  8
      IL_0000:  ldc.i4.3
      IL_0001:  newobj     instance void TestClass::.ctor(int32)
      IL_0006:  stsfld     class TestClass Example::test
      IL_000b:  ret
    } // end of method Example::.cctor
```

The following example shows a `TypeInitializationException` exception thrown by a compiler-generated static constructor. The `Example` class includes a `static` (in C#) or `Shared` (in Visual Basic) field of type `TestClass` that is instantiated by passing a value of 3 to its class constructor. That value, however, is illegal; only values of 0 or 1 are permitted. As a result, the `TestClass` class constructor throws an `ArgumentOutOfRangeException`. Since this exception is not handled, it is wrapped in a `TypeInitializationException` exception.

_Code sample not included: ~/snippets/csharp/System/TypeInitializationException/Overview/ctorException1.cs._

The exception message displays information about the `InnerException` property.

- A missing assembly or data file

A common cause of a `TypeInitializationException` exception is that an assembly or data file that was present in an application's development and test environments is missing from its runtime environment. For example, you can compile the following example to an assembly named Missing1a.dll by using this command-line syntax:

```csharp
  csc -t:library Missing1a.cs
```

```fsharp
  fsc --target:library Missing1a.fs
```

```vb
  vbc Missing1a.vb -t:library
```

_Code sample not included: ~/snippets/csharp/System/TypeInitializationException/Overview/Missing1a.cs._

You can then compile the following example to an executable named Missing1.exe by including a reference to Missing1a.dll:

```csharp
  csc Missing1.cs /r:Missing1a.dll
```

```vb
  vbc Missing1.vb /r:Missing1a.dll
```

However, if you rename, move, or delete Missing1a.dll and run the example, it throws a `TypeInitializationException` exception and displays the output shown in the example. Note that the exception message includes information about the `InnerException` property. In this case,  the inner exception is a `FileNotFoundException` that is thrown because the runtime cannot find the dependent assembly.

_Code sample not included: ~/snippets/csharp/System/TypeInitializationException/Overview/Missing1.cs._

> **Note:**
> In this example, a `TypeInitializationException` exception was thrown because an assembly could not be loaded. The exception can also be thrown if a static constructor attempts to open a data file, such as a configuration file, an XML file, or a file containing serialized data, that it cannot find.

#### Regular expression match timeout values

You can set the default timeout value for a regular expression pattern matching operation on a per-application domain basis. The timeout is defined by a specifying a `TimeSpan` value for the "REGEX_DEFAULT_MATCH_TIMEOUT" property to the  `AppDomain.SetData` method. The time interval must be a valid `TimeSpan` object that is greater than zero and less than approximately 24 days. If these requirements are not met, the attempt to set the default timeout value throws an `ArgumentOutOfRangeException`, which in turn is wrapped in a `TypeInitializationException` exception.

The following example shows the `TypeInitializationException` that is thrown when the value assigned to the "REGEX_DEFAULT_MATCH_TIMEOUT" property is invalid. To eliminate the exception, set the"REGEX_DEFAULT_MATCH_TIMEOUT" property to a  `TimeSpan` value that is greater than zero and less than approximately 24 days.

_Code sample not included: ~/snippets/csharp/System/TypeInitializationException/Overview/Regex1.cs._

#### Calendars and cultural data

If you attempt to instantiate a calendar but the runtime is unable to instantiate the `CultureInfo` object that corresponds to that calendar, it throws a `TypeInitializationException` exception. This exception can be thrown by the following calendar class constructors:

- The parameterless constructor of the `JapaneseCalendar` class.
- The parameterless constructor of the `KoreanCalendar` class.
- The parameterless constructor of the `TaiwanCalendar` class.

Since cultural data for these cultures should be available on all systems, you should rarely, if ever, encounter this exception.

## TypeInitializationException.TypeInitializationException(String, Exception) constructor

```csharp
public TypeInitializationException (string? fullTypeName, Exception? innerException);
```

Initializes a new instance of the `TypeInitializationException` class with the default error message, the specified type name, and a reference to the inner exception that is the root cause of this exception.

Parameters:

- `fullTypeName`: The fully qualified name of the type that fails to initialize.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `TypeInitializationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The localized error message string.|
|`TypeInitializationException.TypeName`|The name of the type.|

## TypeInitializationException.TypeName property

```csharp
public string TypeName { get; }
```

Gets the fully qualified name of the type that fails to initialize.

Returns: The fully qualified name of the type that fails to initialize.

To be added.

## TypeInitializationException.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the type name and additional exception information.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

To be added.
