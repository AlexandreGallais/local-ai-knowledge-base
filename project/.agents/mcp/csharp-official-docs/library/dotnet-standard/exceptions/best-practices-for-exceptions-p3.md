---
title: "Best practices for exceptions (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/best-practices-for-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best practices for exceptions (part 3 of 3)

### Capture and rethrow exceptions properly

Once an exception is thrown, part of the information it carries is the stack trace. The stack trace is a list of the method call hierarchy that starts with the method that throws the exception and ends with the method that catches the exception. If you rethrow an exception by specifying the exception in the `throw` statement, for example, `throw e`, the stack trace is restarted at the current method and the list of method calls between the original method that threw the exception and the current method is lost. To keep the original stack trace information with the exception, there are two options that depend on where you're rethrowing the exception from:

- If you rethrow the exception from within the handler (`catch` block) that's caught the exception instance, use the `throw` statement without specifying the exception. Code analysis rule CA2200 helps you find places in your code where you might inadvertently lose stack trace information.
- If you're rethrowing the exception from somewhere other than the handler (`catch` block), use `System.Runtime.ExceptionServices.ExceptionDispatchInfo.Capture(System.Exception)` to capture the exception in the handler and `System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw` when you want to rethrow it. You can use the `System.Runtime.ExceptionServices.ExceptionDispatchInfo.SourceException` property to inspect the captured exception.

The following example shows how the `System.Runtime.ExceptionServices.ExceptionDispatchInfo` class can be used, and what the output might look like.

```csharp
ExceptionDispatchInfo? edi = null;
try
{
    var txt = File.ReadAllText(@"C:\temp\file.txt");
}
catch (FileNotFoundException e)
{
    edi = ExceptionDispatchInfo.Capture(e);
}

// ...

Console.WriteLine("I was here.");

if (edi is not null)
    edi.Throw();
```

If the file in the example code doesn't exist, the following output is produced:

```output
I was here.
Unhandled exception. System.IO.FileNotFoundException: Could not find file 'C:\temp\file.txt'.
File name: 'C:\temp\file.txt'
   at Microsoft.Win32.SafeHandles.SafeFileHandle.CreateFile(String fullPath, FileMode mode, FileAccess access, FileShare share, FileOptions options)
   at Microsoft.Win32.SafeHandles.SafeFileHandle.Open(String fullPath, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.Strategies.OSFileStreamStrategy..ctor(String path, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.Strategies.FileStreamHelpers.ChooseStrategyCore(String path, FileMode mode, FileAccess access, FileShare share, FileOptions options, Int64 preallocationSize, Nullable`1 unixCreateMode)
   at System.IO.StreamReader.ValidateArgsAndOpenPath(String path, Encoding encoding, Int32 bufferSize)
   at System.IO.File.ReadAllText(String path, Encoding encoding)
   at Example.ProcessFile.Main() in C:\repos\ConsoleApp1\Program.cs:line 12
--- End of stack trace from previous location ---
   at Example.ProcessFile.Main() in C:\repos\ConsoleApp1\Program.cs:line 24
```

## Throwing exceptions

The following best practices concern how you throw exceptions:

- Use predefined exception types
- Use exception builder methods
- Include a localized string message
- Use proper grammar
- Place throw statements well
- Don't raise exceptions in finally clauses
- Don't raise exceptions from unexpected places
- Throw argument validation exceptions synchronously

### Use predefined exception types

Introduce a new exception class only when a predefined one doesn't apply. For example:

- If a property set or method call isn't appropriate given the object's current state, throw an `System.InvalidOperationException` exception.
- If invalid parameters are passed, throw an `System.ArgumentException` exception or one of the predefined classes that derive from `System.ArgumentException`.

> **Note:**
> While it's best to use predefined exception types when possible, you shouldn't raise some *reserved* exception types, such as `System.AccessViolationException`, `System.IndexOutOfRangeException`, `System.NullReferenceException` and `System.StackOverflowException`. For more information, see CA2201: Don't raise reserved exception types.

### Use exception builder methods

It's common for a class to throw the same exception from different places in its implementation. To avoid excessive code, create a helper method that creates the exception and returns it. For example:

```csharp
public class FileReaderException : Exception
{
    public FileReaderException(string description) : base(description)
    {
    }
}

[Flags]
public enum ConnectionState
{
    Closed = 0,
    Open = 1
}

public class DemoDBClient
{
    public DemoDBClient()
    {
        State = ConnectionState.Open;
    }

    public ConnectionState State { get; private set; }

    public void Close()
    {
        State = ConnectionState.Closed;
    }
}

public class FileUtils
{
    public static byte[] ReadFromFile(string filename, int bytes)
    {
        return File.ReadAllBytes(filename);
    }
}

public class MyFileNotFoundException : Exception
{
}

public class ExceptionHandling
{
    public static void Main()
    {
        var conn = new DemoDBClient();

        if (conn.State != ConnectionState.Closed)
        {
            conn.Close();
        }

        try
        {
            conn.Close();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine(ex.GetType().FullName);
            Console.WriteLine(ex.Message);
        }
    }
}

class FileRead
{
    public static void ReadAll(FileStream fileToRead)
    {
        ArgumentNullException.ThrowIfNull(fileToRead);

        int b;

        // Set the stream position to the beginning of the file.
        fileToRead.Seek(0, SeekOrigin.Begin);

        // Read each byte to the end of the file.
        for (int i = 0; i < fileToRead.Length; i++)
        {
            b = fileToRead.ReadByte();
            Console.Write(b.ToString());
            // Or do something else with the byte.
        }
    }
}

class FileReader
{
    private readonly string _fileName;

    public FileReader(string path)
    {
        _fileName = path;
    }

    public byte[] Read(int bytes)
    {
        byte[] results = FileUtils.ReadFromFile(_fileName, bytes) ?? throw NewFileIOException();
        return results;
    }

    static FileReaderException NewFileIOException()
    {
        string description = "My NewFileIOException Description";

        return new FileReaderException(description);
    }
}
```

Some key .NET exception types have such static `throw` helper methods that allocate and throw the exception. You should call these methods instead of constructing and throwing the corresponding exception type:

- `System.ArgumentNullException.ThrowIfNull*`
- `System.ArgumentException.ThrowIfNullOrEmpty(System.String,System.String)`
- `System.ArgumentException.ThrowIfNullOrWhiteSpace(System.String,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfZero``1(``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfNegative``1(``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfEqual``1(``0,``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfLessThan``1(``0,``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfNotEqual``1(``0,``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfNegativeOrZero``1(``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfGreaterThan``1(``0,``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfLessThanOrEqual``1(``0,``0,System.String)`
- `System.ArgumentOutOfRangeException.ThrowIfGreaterThanOrEqual``1(``0,``0,System.String)`
- `System.ObjectDisposedException.ThrowIf*`

> **Tip:**
> The following code analysis rules can help you find places in your code where you can take advantage of these static `throw` helpers: CA1510, CA1511, CA1512, and CA1513.

If you're implementing an asynchronous method, call `System.Threading.CancellationToken.ThrowIfCancellationRequested` instead of checking if cancellation was requested and then constructing and throwing `System.OperationCanceledException`. For more information, see CA2250.

### Include a localized string message

The error message the user sees is derived from the `System.Exception.Message` property of the exception that was thrown, and not from the name of the exception class. Typically, you assign a value to the `System.Exception.Message` property by passing the message string to the `message` argument of an Exception constructor.

For localized applications, you should provide a localized message string for every exception that your application can throw. You use resource files to provide localized error messages. For information on localizing applications and retrieving localized strings, see the following articles:

- How to: Create user-defined exceptions with localized exception messages
- Resources in .NET apps
- `System.Resources.ResourceManager`

### Use proper grammar

Write clear sentences and include ending punctuation. Each sentence in the string assigned to the `System.Exception.Message` property should end in a period. For example, "The log table has overflowed." uses correct grammar and punctuation.

### Place throw statements well

Place throw statements where the stack trace is helpful. The stack trace begins at the statement where the exception is thrown and ends at the `catch` statement that catches the exception.

### Don't raise exceptions in finally clauses

Don't raise exceptions in `finally` clauses. For more information, see code analysis rule CA2219.

### Don't raise exceptions from unexpected places

Some methods, such as `Equals`, `GetHashCode`, and `ToString` methods, static constructors, and equality operators, shouldn't throw exceptions. For more information, see code analysis rule CA1065.

### Throw argument validation exceptions synchronously

In task-returning methods, you should validate arguments and throw any corresponding exceptions, such as `System.ArgumentException` and `System.ArgumentNullException`, before entering the asynchronous part of the method. Exceptions that are thrown in the asynchronous part of the method are stored in the returned task and don't emerge until, for example, the task is awaited. For more information, see Exceptions in task-returning methods.

## Custom exception types

The following best practices concern custom exception types:

- End exception class names with `Exception`
- Include three constructors
- Provide more properties as needed

### End exception class names with `Exception`

When a custom exception is necessary, name it appropriately and derive it from the `System.Exception` class. For example:

```csharp
public class FileReaderException : Exception
{
    public FileReaderException(string description) : base(description)
    {
    }
}

[Flags]
public enum ConnectionState
{
    Closed = 0,
    Open = 1
}

public class DemoDBClient
{
    public DemoDBClient()
    {
        State = ConnectionState.Open;
    }

    public ConnectionState State { get; private set; }

    public void Close()
    {
        State = ConnectionState.Closed;
    }
}

public class FileUtils
{
    public static byte[] ReadFromFile(string filename, int bytes)
    {
        return File.ReadAllBytes(filename);
    }
}

public class MyFileNotFoundException : Exception
{
}

public class ExceptionHandling
{
    public static void Main()
    {
        var conn = new DemoDBClient();

        if (conn.State != ConnectionState.Closed)
        {
            conn.Close();
        }

        try
        {
            conn.Close();
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine(ex.GetType().FullName);
            Console.WriteLine(ex.Message);
        }
    }
}

class FileRead
{
    public static void ReadAll(FileStream fileToRead)
    {
        ArgumentNullException.ThrowIfNull(fileToRead);

        int b;

        // Set the stream position to the beginning of the file.
        fileToRead.Seek(0, SeekOrigin.Begin);

        // Read each byte to the end of the file.
        for (int i = 0; i < fileToRead.Length; i++)
        {
            b = fileToRead.ReadByte();
            Console.Write(b.ToString());
            // Or do something else with the byte.
        }
    }
}

class FileReader
{
    private readonly string _fileName;

    public FileReader(string path)
    {
        _fileName = path;
    }

    public byte[] Read(int bytes)
    {
        byte[] results = FileUtils.ReadFromFile(_fileName, bytes) ?? throw NewFileIOException();
        return results;
    }

    static FileReaderException NewFileIOException()
    {
        string description = "My NewFileIOException Description";

        return new FileReaderException(description);
    }
}
```

### Include three constructors

Use at least the three common constructors when creating your own exception classes: the parameterless constructor, a constructor that takes a string message, and a constructor that takes a string message and an inner exception.

- `System.Exception.#ctor`, which uses default values.
- `System.Exception.#ctor(System.String)`, which accepts a string message.
- `System.Exception.#ctor(System.String,System.Exception)`, which accepts a string message and an inner exception.

For an example, see How to: Create user-defined exceptions.

### Provide more properties as needed

Provide more properties for an exception (in addition to the custom message string) only when there's a programmatic scenario where the additional information is useful. For example, the `System.IO.FileNotFoundException` provides the `System.IO.FileNotFoundException.FileName` property.

### See also

- Design guidelines for exceptions
