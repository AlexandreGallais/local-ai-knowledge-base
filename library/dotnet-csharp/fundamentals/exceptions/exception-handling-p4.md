---
title: "Exception Handling (part 4 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/exceptions/exception-handling.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Exception Handling (part 4 of 5)

## Catch Blocks

A `catch` block can specify the type of exception to catch. The type specification is called an *exception filter*. The exception type should be derived from `System.Exception`. In general, don't specify `System.Exception` as the exception filter unless either you know how to handle all exceptions that might be thrown in the `try` block, or you've included a `throw` statement at the end of your `catch` block.

Multiple `catch` blocks with different exception classes can be chained together. The `catch` blocks are evaluated from top to bottom in your code, but only one `catch` block is executed for each exception that is thrown. The first `catch` block that specifies the exact type or a base class of the thrown exception is executed. If no `catch` block specifies a matching exception class, a `catch` block that doesn't have any type is selected, if one is present in the statement. It's important to position `catch` blocks with the most specific (that is, the most derived) exception classes first.

Catch exceptions when the following conditions are true:

- You have a good understanding of why the exception might be thrown, and you can implement a specific recovery, such as prompting the user to enter a new file name when you catch a `System.IO.FileNotFoundException` object.
- You can create and throw a new, more specific exception.
```csharp
﻿using System;
using System.IO;
using exceptions;

namespace Exceptions
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var toast = await KitchenHelpers.ToastBreadAsync(2, 100);

            ExceptionTest.Main();
            TestThrowCatch();
            CatchOrder.Main();
            TestFinally();
        }

        private static void TestThrowCatch()
        {
            try
            {
                TestThrow();
            }
            catch (CustomException ex)
            {
                System.Console.WriteLine(ex.ToString());
            }
        }

        class CustomException : Exception
        {
            public CustomException(string message)
            {
            }
        }
        private static void TestThrow()
        {
            throw new CustomException("Custom exception in TestThrow()");
        }

        static void TestFinally()
        {
            FileStream? file = null;
            //Change the path to something that works on your machine.
            FileInfo fileInfo = new System.IO.FileInfo("./file.txt");

            try
            {
                file = fileInfo.OpenWrite();
                file.WriteByte(0xF);
            }
            finally
            {
                // Closing the file allows you to reopen it immediately - otherwise IOException is thrown.
                file?.Close();
            }

            try
            {
                file = fileInfo.OpenWrite();
                Console.WriteLine("OpenWrite() succeeded");
            }
            catch (IOException)
            {
                Console.WriteLine("OpenWrite() failed");
            }
        }

        class SomeSpecificException : Exception { }

        private static void Structure()
        {
            try
            {
                // Code to try goes here.
            }
            catch (SomeSpecificException ex)
            {
                // Code to handle the exception goes here.
                // Only catch exceptions that you know how to handle.
                // Never catch base class System.Exception without
                // rethrowing it at the end of the catch block.
            }

            try
            {
                // Code to try goes here.
            }
            finally
            {
                // Code to execute after the try block goes here.
            }

            try
            {
                // Code to try goes here.
            }
            catch (SomeSpecificException ex)
            {
                // Code to handle the exception goes here.
            }
            finally
            {
                // Code to execute after the try (and possibly catch) blocks
                // goes here.
            }
        }

        int GetInt(int[] array, int index)
        {
            try
            {
                return array[index];
            }
            catch (IndexOutOfRangeException e)
            {
                throw new ArgumentOutOfRangeException(
                    "Parameter index is out of range.", e);
            }
        }

        private static void ReThrow()
        {
            try
            {
                // Try to access a resource.
            }
            catch (UnauthorizedAccessException e)
            {
                // Call a custom error logging procedure.
                LogError(e);
                // Re-throw the error.
                throw;
            }
        }
        static void LogError(Exception ex) { }

        static void CloseOptionally()
        {
            FileStream? file = null;
            FileInfo fileinfo = new System.IO.FileInfo("./file.txt");
            try
            {
                file = fileinfo.OpenWrite();
                file.WriteByte(0xF);
            }
            finally
            {
                // Check for null because OpenWrite might have failed.
                file?.Close();
            }
        }

        static void CopyObject(SampleClass original)
        {
            _ = original ?? throw new ArgumentException("Parameter cannot be null", nameof(original));
        }

        static int GetValueFromArray(int[] array, int index)
        {
            try
            {
                return array[index];
            }
            catch (IndexOutOfRangeException e)
            {
                throw new ArgumentOutOfRangeException(
                    "Parameter index is out of range.", e);
            }
        }

        static void CodeWithoutCleanup()
        {
            FileStream? file = null;
            FileInfo fileInfo = new FileInfo("./file.txt");

            file = fileInfo.OpenWrite();
            file.WriteByte(0xF);

            file.Close();
        }

        static void CodeWithCleanup()
        {
            FileStream? file = null;
            FileInfo? fileInfo = null;

            try
            {
                fileInfo = new FileInfo("./file.txt");

                file = fileInfo.OpenWrite();
                file.WriteByte(0xF);
            }
            catch (UnauthorizedAccessException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                file?.Close();
            }
        }
    }

    public class SampleClass { }
}
```
- You want to partially handle an exception before passing it on for more handling. In the following example, a `catch` block is used to add an entry to an error log before rethrowing the exception.
```csharp
﻿using System;
using System.IO;
using exceptions;

namespace Exceptions
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var toast = await KitchenHelpers.ToastBreadAsync(2, 100);

            ExceptionTest.Main();
            TestThrowCatch();
            CatchOrder.Main();
            TestFinally();
        }

        private static void TestThrowCatch()
        {
            try
            {
                TestThrow();
            }
            catch (CustomException ex)
            {
                System.Console.WriteLine(ex.ToString());
            }
        }

        class CustomException : Exception
        {
            public CustomException(string message)
            {
            }
        }
        private static void TestThrow()
        {
            throw new CustomException("Custom exception in TestThrow()");
        }

        static void TestFinally()
        {
            FileStream? file = null;
            //Change the path to something that works on your machine.
            FileInfo fileInfo = new System.IO.FileInfo("./file.txt");

            try
            {
                file = fileInfo.OpenWrite();
                file.WriteByte(0xF);
            }
            finally
            {
                // Closing the file allows you to reopen it immediately - otherwise IOException is thrown.
                file?.Close();
            }

            try
            {
                file = fileInfo.OpenWrite();
                Console.WriteLine("OpenWrite() succeeded");
            }
            catch (IOException)
            {
                Console.WriteLine("OpenWrite() failed");
            }
        }

        class SomeSpecificException : Exception { }

        private static void Structure()
        {
            try
            {
                // Code to try goes here.
            }
            catch (SomeSpecificException ex)
            {
                // Code to handle the exception goes here.
                // Only catch exceptions that you know how to handle.
                // Never catch base class System.Exception without
                // rethrowing it at the end of the catch block.
            }

            try
            {
                // Code to try goes here.
            }
            finally
            {
                // Code to execute after the try block goes here.
            }

            try
            {
                // Code to try goes here.
            }
            catch (SomeSpecificException ex)
            {
                // Code to handle the exception goes here.
            }
            finally
            {
                // Code to execute after the try (and possibly catch) blocks
                // goes here.
            }
        }

        int GetInt(int[] array, int index)
        {
            try
            {
                return array[index];
            }
            catch (IndexOutOfRangeException e)
            {
                throw new ArgumentOutOfRangeException(
                    "Parameter index is out of range.", e);
            }
        }

        private static void ReThrow()
        {
            try
            {
                // Try to access a resource.
            }
            catch (UnauthorizedAccessException e)
            {
                // Call a custom error logging procedure.
                LogError(e);
                // Re-throw the error.
                throw;
            }
        }
        static void LogError(Exception ex) { }

        static void CloseOptionally()
        {
            FileStream? file = null;
            FileInfo fileinfo = new System.IO.FileInfo("./file.txt");
            try
            {
                file = fileinfo.OpenWrite();
                file.WriteByte(0xF);
            }
            finally
            {
                // Check for null because OpenWrite might have failed.
                file?.Close();
            }
        }

        static void CopyObject(SampleClass original)
        {
            _ = original ?? throw new ArgumentException("Parameter cannot be null", nameof(original));
        }

        static int GetValueFromArray(int[] array, int index)
        {
            try
            {
                return array[index];
            }
            catch (IndexOutOfRangeException e)
            {
                throw new ArgumentOutOfRangeException(
                    "Parameter index is out of range.", e);
            }
        }

        static void CodeWithoutCleanup()
        {
            FileStream? file = null;
            FileInfo fileInfo = new FileInfo("./file.txt");

            file = fileInfo.OpenWrite();
            file.WriteByte(0xF);

            file.Close();
        }

        static void CodeWithCleanup()
        {
            FileStream? file = null;
            FileInfo? fileInfo = null;

            try
            {
                fileInfo = new FileInfo("./file.txt");

                file = fileInfo.OpenWrite();
                file.WriteByte(0xF);
            }
            catch (UnauthorizedAccessException e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                file?.Close();
            }
        }
    }

    public class SampleClass { }
}
```
You can also specify *exception filters* to add a boolean expression to a catch clause. Exception filters indicate that a specific catch clause matches only when that condition is true. In the following example, both catch clauses use the same exception class, but an extra condition is checked to create a different error message:

```csharp
﻿namespace Exceptions;

public class ExceptionFilter
{
    public static void Main()
    {
        try
        {
            string? s = null;
            Console.WriteLine(s.Length);
        }
        catch (Exception e) when (LogException(e))
        {
        }
        Console.WriteLine("Exception must have been handled");
    }

    private static bool LogException(Exception e)
    {
        Console.WriteLine($"\tIn the log routine. Caught {e.GetType()}");
        Console.WriteLine($"\tMessage: {e.Message}");
        return false;
    }
}

public class ExceptionFilter2
{
    int GetInt(int[] array, int index)
    {
        try
        {
            return array[index];
        }
        catch (IndexOutOfRangeException e) when (index < 0) 
        {
            throw new ArgumentOutOfRangeException(
                "Parameter index cannot be negative.", e);
        }
        catch (IndexOutOfRangeException e)
        {
            throw new ArgumentOutOfRangeException(
                "Parameter index cannot be greater than the array size.", e);
        }
    }
}
```
An exception filter that always returns `false` can be used to examine all exceptions but not process them. A typical use is to log exceptions:
