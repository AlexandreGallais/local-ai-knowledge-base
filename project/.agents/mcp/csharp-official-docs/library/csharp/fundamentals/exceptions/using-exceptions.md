---
title: "Using Exceptions (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/exceptions/using-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Use exceptions

In C#, errors in the program at run time are propagated through the program by using a mechanism called exceptions. Exceptions are thrown by code that encounters an error and caught by code that can correct the error. Exceptions can be thrown by the .NET runtime or by code in a program. Once an exception is thrown, it propagates up the call stack until a `catch` statement for the exception is found. Uncaught exceptions are handled by a generic exception handler provided by the system that displays a dialog box.

Exceptions are represented by classes derived from `System.Exception`. This class identifies the type of exception and contains properties that have details about the exception. Throwing an exception involves creating an instance of an exception-derived class, optionally configuring properties of the exception, and then throwing the object by using the `throw` keyword. For example:

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
After an exception is thrown, the runtime checks the current statement to see whether it is within a `try` block. If it is, any `catch` blocks associated with the `try` block are checked to see whether they can catch the exception. `Catch` blocks typically specify exception types; if the type of the `catch` block is the same type as the exception, or a base class of the exception, the `catch` block can handle the method. For example:

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
If the statement that throws an exception isn't within a `try` block or if the `try` block that encloses it has no matching `catch` block, the runtime checks the calling method for a `try` statement and `catch` blocks. The runtime continues up the calling stack, searching for a compatible `catch` block. After the `catch` block is found and executed, control is passed to the next statement after that `catch` block.

A `try` statement can contain more than one `catch` block. The first `catch` statement that can handle the exception is executed; any following `catch` statements, even if they're compatible, are ignored. Order catch blocks from most specific (or most-derived) to least specific. For example:

```csharp
﻿using System;
using System.IO;

namespace Exceptions
{
    public class CatchOrder
    {
        public static void Main()
        {
            try
            {
                using (var sw = new StreamWriter("./test.txt"))
                {
                    sw.WriteLine("Hello");
                }
            }
            // Put the more specific exceptions first.
            catch (DirectoryNotFoundException ex)
            {
                Console.WriteLine(ex);
            }
            catch (FileNotFoundException ex)
            {
                Console.WriteLine(ex);
            }
            // Put the least specific exception last.
            catch (IOException ex)
            {
                Console.WriteLine(ex);
            }
            Console.WriteLine("Done");
        }
    }
}
```
Before the `catch` block is executed, the runtime checks for `finally` blocks. `Finally` blocks enable the programmer to clean up any ambiguous state that could be left over from an aborted `try` block, or to release any external resources (such as graphics handles, database connections, or file streams) without waiting for the garbage collector in the runtime to finalize the objects. For example:
