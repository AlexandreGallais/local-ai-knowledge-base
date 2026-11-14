---
title: "Best practices for exceptions (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/best-practices-for-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best practices for exceptions (part 2 of 3)

## Handling exceptions

The following best practices concern how you handle exceptions:

- Use try/catch/finally blocks to recover from errors or release resources
- Handle common conditions to avoid exceptions
- Catch cancellation and asynchronous exceptions
- Design classes so that exceptions can be avoided
- Restore state when methods don't complete due to exceptions
- Capture and rethrow exceptions properly

### Use try/catch/finally blocks to recover from errors or release resources

For code that can potentially generate an exception, and when your app can recover from that exception, use `try`/`catch` blocks around the code. In `catch` blocks, always order exceptions from the most derived to the least derived. (All exceptions derive from the `System.Exception` class. More derived exceptions aren't handled by a `catch` clause that's preceded by a `catch` clause for a base exception class.) When your code can't recover from an exception, don't catch that exception. Enable methods further up the call stack to recover if possible.

Clean up resources that are allocated with either `using` statements or `finally` blocks. Prefer `using` statements to automatically clean up resources when exceptions are thrown. Use `finally` blocks to clean up resources that don't implement `System.IDisposable`. Code in a `finally` clause is almost always executed even when exceptions are thrown.

### Handle common conditions to avoid exceptions

For conditions that are likely to occur but might trigger an exception, consider handling them in a way that avoids the exception. For example, if you try to close a connection that's already closed, you get an `InvalidOperationException`. You can avoid that by using an `if` statement to check the connection state before trying to close it.

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

If you don't check the connection state before closing, you can catch the `InvalidOperationException` exception.

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

The approach to choose depends on how often you expect the event to occur.

- Use exception handling if the event doesn't occur often, that is, if the event is truly exceptional and indicates an error, such as an unexpected end-of-file. When you use exception handling, less code is executed in normal conditions.
- Check for error conditions in code if the event happens routinely and could be considered part of normal execution. When you check for common error conditions, less code is executed because you avoid exceptions.

  > **Note:**
  > Up-front checks eliminate exceptions most of the time. However, there can be race conditions where the guarded condition changes between the check and the operation, and in that case, you could still incur an exception.

### Call `Try*` methods to avoid exceptions

If the performance cost of exceptions is prohibitive, some .NET library methods provide alternative forms of error handling. For example, `System.Int32.Parse*` throws an `System.OverflowException` if the value to be parsed is too large to be represented by `System.Int32`. However, `System.Int32.TryParse*` doesn't throw this exception. Instead, it returns a Boolean and has an `out` parameter that contains the parsed valid integer upon success. `System.Collections.Generic.Dictionary`2.TryGetValue*` has similar behavior for attempting to get a value from a dictionary.

### Catch cancellation and asynchronous exceptions

It's better to catch `System.OperationCanceledException` instead of `System.Threading.Tasks.TaskCanceledException`, which derives from `OperationCanceledException`, when you call an asynchronous method. Many asynchronous methods throw an `System.OperationCanceledException` exception if cancellation is requested. These exceptions enable execution to be efficiently halted and the callstack to be unwound once a cancellation request is observed.

Asynchronous methods store exceptions that are thrown during execution in the task they return. If an exception is stored into the returned task, that exception is thrown when the task is awaited. Usage exceptions, such as `System.ArgumentException`, are still thrown synchronously. For more information, see Asynchronous exceptions.

### Design classes so that exceptions can be avoided

A class can provide methods or properties that enable you to avoid making a call that would trigger an exception. For example, the `System.IO.FileStream` class provides methods that help determine whether the end of the file has been reached. You can call these methods to avoid the exception that's thrown if you read past the end of the file. The following example shows how to read to the end of a file without triggering an exception:

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

Another way to avoid exceptions is to return `null` (or default) for most common error cases instead of throwing an exception. A common error case can be considered a normal flow of control. By returning `null` (or default) in these cases, you minimize the performance impact to an app.

For value types, consider whether to use `Nullable<T>` or `default` as the error indicator for your app. By using `Nullable<Guid>`, `default` becomes `null` instead of `Guid.Empty`. Sometimes, adding `Nullable<T>` can make it clearer when a value is present or absent. Other times, adding `Nullable<T>` can create extra cases to check that aren't necessary and only serve to create potential sources of errors.

### Restore state when methods don't complete due to exceptions

Callers should be able to assume that there are no side effects when an exception is thrown from a method. For example, if you have code that transfers money by withdrawing from one account and depositing in another account, and an exception is thrown while executing the deposit, you don't want the withdrawal to remain in effect.

```csharp
public void TransferFunds(Account from, Account to, decimal amount)
{
    from.Withdrawal(amount);
    // If the deposit fails, the withdrawal shouldn't remain in effect.
    to.Deposit(amount);
}
```

```vb
Public Sub TransferFunds(from As Account, [to] As Account, amount As Decimal)
    from.Withdrawal(amount)
    ' If the deposit fails, the withdrawal shouldn't remain in effect.
    [to].Deposit(amount)
End Sub
```

The preceding method doesn't directly throw any exceptions. However, you must write the method so that the withdrawal is reversed if the deposit operation fails.

One way to handle this situation is to catch any exceptions thrown by the deposit transaction and roll back the withdrawal.

```csharp
private static void TransferFunds(Account from, Account to, decimal amount)
{
    string withdrawalTrxID = from.Withdrawal(amount);
    try
    {
        to.Deposit(amount);
    }
    catch
    {
        from.RollbackTransaction(withdrawalTrxID);
        throw;
    }
}
```

```vb
Private Shared Sub TransferFunds(from As Account, [to] As Account, amount As Decimal)
    Dim withdrawalTrxID As String = from.Withdrawal(amount)
    Try
        [to].Deposit(amount)
    Catch
        from.RollbackTransaction(withdrawalTrxID)
        Throw
    End Try
End Sub
```

This example illustrates the use of `throw` to rethrow the original exception, making it easier for callers to see the real cause of the problem without having to examine the `System.Exception.InnerException` property. An alternative is to throw a new exception and include the original exception as the inner exception.

```csharp
catch (Exception ex)
{
    from.RollbackTransaction(withdrawalTrxID);
    throw new TransferFundsException("Withdrawal failed.", innerException: ex)
    {
        From = from,
        To = to,
        Amount = amount
    };
}
```

```vb
Catch ex As Exception
    from.RollbackTransaction(withdrawalTrxID)
    Throw New TransferFundsException("Withdrawal failed.", innerException:=ex) With
    {
        .From = from,
        .[To] = [to],
        .Amount = amount
    }
End Try
```
