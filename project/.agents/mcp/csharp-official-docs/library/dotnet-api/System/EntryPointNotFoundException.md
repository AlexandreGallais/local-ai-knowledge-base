---
title: "EntryPointNotFoundException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/EntryPointNotFoundException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntryPointNotFoundException class

Namespace: `System`

```csharp
public class EntryPointNotFoundException : TypeLoadException
```

The exception that is thrown when an attempt to load a class fails due to the absence of an entry method.

#### Remarks
An `EntryPointNotFoundException` exception is thrown when the common language runtime is unable to load an assembly because it cannot identify the assembly's entry point.  This exception can be thrown under the following conditions:

- The common language runtime is unable to locate an application entry point (typically a `Main` method) in an executable assembly. The application entry point must be a global or `static` method that has either no parameters or a string array as its only parameter. The entry point can return `void`, or it can return an `Int32` or `UInt32` exit code. An application assembly cannot define more than one entry point.

- The call to a function in a Windows DLL cannot be resolved because the function cannot be found. In the following example, an `EntryPointNotFoundException` exception is thrown because User32.dll does not include a function named `GetMyNumber`.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/nofunction1.cs._

- The call to a function in a Windows DLL cannot be resolved because the name used in the method call does not match a name found in the assembly. Frequently, this occurs because the `ExactSpelling` field is either implicitly or explicitly set to `true`, the called method includes one or more string parameters and has both an ANSI and a Unicode version, and the name used in the method call does not correspond to the name of this ANSI or Unicode version. The following example provides an illustration by attempting to call the Windows `MessageBox` function in User32.dll. Because the first method definition specifies `Unicode` for string marshaling, the common language looks for the wide-character version of the function, `MessageBoxW`, instead of the name used in the method call, `MessageBox`.  The second method definition corrects this problem by calling the `MessageBoxW` instead of the `MessageBox` function.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/badcall1.cs._

- You're trying to call a function in a dynamic link library by its simple name rather than its decorated name. Typically, the C++ compiler generates a decorated name for DLL functions. For example, the following C++ code defines a function named `Double` in a library named TestDll.dll.

When the code in the following example tries to call the function, an `EntryPointNotFoundException` exception is thrown because the `Double` function cannot be found.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/mangle1.cs._

However, if the function is called by using its decorated name (in this case, `?Double@@YAHH@Z`), the function call succeeds, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/mangle2.cs._

You can find the decorated names of functions exported by a DLL by using a utility such as Dumpbin.exe.

- You are attempting to call a method in a managed assembly as if it were an unmanaged dynamic link library. To see this in action, compile the following example to an assembly named StringUtilities.dll.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/stringutilities.cs._

Then compile and execute the following example, which attempts to call the `StringUtilities.SayGoodMorning` method in the StringUtilities.dll dynamic link library as if it were unmanaged code. The result is an `EntryPointNotFoundException` exception.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/importassembly1.cs._

To eliminate the exception, add a reference to the managed assembly and access the `StringUtilities.SayGoodMorning` method just as you would access any other method in managed code, as the following example does.

_Code sample not included: ~/snippets/csharp/System/EntryPointNotFoundException/Overview/fiximportassembly1.cs._

- You are trying to call a method in a COM DLL as if it were a Windows DLL. To access a COM DLL, select the **Add Reference** option in Visual Studio to add a reference to the project, and then select the type library from the **COM** tab.

For a list of initial property values for an instance of `EntryPointNotFoundException`, see the `EntryPointNotFoundException.%23ctor` constructors.

## EntryPointNotFoundException.EntryPointNotFoundException() constructor

```csharp
public EntryPointNotFoundException ();
```

Initializes a new instance of the `EntryPointNotFoundException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "Entry point was not found." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `EntryPointNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The localized error message string.|

## EntryPointNotFoundException.EntryPointNotFoundException(String) constructor

```csharp
public EntryPointNotFoundException (string? message);
```

Initializes a new instance of the `EntryPointNotFoundException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `EntryPointNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`TypeLoadException.Message`|The error message string.|

## EntryPointNotFoundException.EntryPointNotFoundException(SerializationInfo, StreamingContext) constructor

```csharp
protected EntryPointNotFoundException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `EntryPointNotFoundException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## EntryPointNotFoundException.EntryPointNotFoundException(String, Exception) constructor

```csharp
public EntryPointNotFoundException (string? message, Exception? inner);
```

Initializes a new instance of the `EntryPointNotFoundException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `EntryPointNotFoundException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`TypeLoadException.Message`|The error message string.|
