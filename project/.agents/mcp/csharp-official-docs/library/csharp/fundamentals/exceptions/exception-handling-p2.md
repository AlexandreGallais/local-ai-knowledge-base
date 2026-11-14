---
title: "Exception Handling (part 2 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/exceptions/exception-handling.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Exception Handling (part 2 of 5)

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

```
