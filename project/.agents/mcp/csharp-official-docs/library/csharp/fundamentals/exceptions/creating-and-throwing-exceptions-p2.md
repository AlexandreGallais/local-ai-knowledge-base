---
title: "Creating and Throwing Exceptions (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/exceptions/creating-and-throwing-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Creating and Throwing Exceptions (part 2 of 2)

## Exceptions in task-returning methods

Methods declared with the `async` modifier have some special considerations when it comes to exceptions. Exceptions thrown in an `async` method are stored in the returned task and don't emerge until, for example, the task is awaited. For more information about stored exceptions, see Asynchronous exceptions.

We recommend that you validate arguments and throw any corresponding exceptions, such as `System.ArgumentException` and `System.ArgumentNullException`, before entering the asynchronous parts of your methods. That is, these validation exceptions should emerge synchronously before the work starts. The following code snippet shows an example where, if the exceptions are thrown, the `System.ArgumentException` exceptions would emerge synchronously, whereas the `System.InvalidOperationException` would be stored in the returned task.

```csharp
﻿namespace exceptions;

class KitchenHelpers
{
    public class Toast { }

    // Non-async, task-returning method.
    // Within this method (but outside of the local function),
    // any thrown exceptions emerge synchronously.
    public static Task<Toast> ToastBreadAsync(int slices, int toastTime)
    {
        if (slices is < 1 or > 4)
        {
            throw new ArgumentException(
                "You must specify between 1 and 4 slices of bread.",
                nameof(slices));
        }

        if (toastTime < 1)
        {
            throw new ArgumentException(
                "Toast time is too short.", nameof(toastTime));
        }

        return ToastBreadAsyncCore(slices, toastTime);

        // Local async function.
        // Within this function, any thrown exceptions are stored in the task.
        static async Task<Toast> ToastBreadAsyncCore(int slices, int time)
        {
            for (int slice = 0; slice < slices; slice++)
            {
                Console.WriteLine("Putting a slice of bread in the toaster");
            }
            // Start toasting.
            await Task.Delay(time);

            if (time > 2_000)
            {
                throw new InvalidOperationException("The toaster is on fire!");
            }

            Console.WriteLine("Toast is ready!");

            return new Toast();
        }
    }
}
```
## Define exception classes

Programs can throw a predefined exception class in the `System` namespace (except where previously noted), or create their own exception classes by deriving from `System.Exception`. The derived classes should define at least three constructors: one parameterless constructor, one that sets the message property, and one that sets both the `System.Exception.Message*` and `System.Exception.InnerException` properties. For example:

```csharp
﻿using System;

namespace Exceptions
{
    [Serializable]
    public class InvalidDepartmentException : Exception
    {
        public InvalidDepartmentException() : base() { }
        public InvalidDepartmentException(string message) : base(message) { }
        public InvalidDepartmentException(string message, Exception inner) : base(message, inner) { }
    }
}
```
Add new properties to the exception class when the data they provide is useful to resolving the exception. If new properties are added to the derived exception class, `ToString()` should be overridden to return the added information.

## C# language specification

For more information, see Exceptions and The throw statement in the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- Exception Hierarchy
