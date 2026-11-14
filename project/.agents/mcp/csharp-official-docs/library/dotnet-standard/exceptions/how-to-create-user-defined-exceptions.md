---
title: "How to: Create User-Defined Exceptions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/how-to-create-user-defined-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to create user-defined exceptions

.NET provides a hierarchy of exception classes ultimately derived from the `System.Exception` base class. However, if none of the predefined exceptions meet your needs, you can create your own exception class by deriving from the `System.Exception` class.

When creating your own exceptions, end the class name of the user-defined exception with the word "Exception", and implement the three common constructors, as shown in the following example. The example defines a new exception class named `EmployeeListNotFoundException`. The class is derived from the `System.Exception` base class and includes three constructors.
```csharp
using System;

public class EmployeeListNotFoundException : Exception
{
    public EmployeeListNotFoundException()
    {
    }

    public EmployeeListNotFoundException(string message)
        : base(message)
    {
    }

    public EmployeeListNotFoundException(string message, Exception inner)
        : base(message, inner)
    {
    }
}

public class TestExample
{
    public static void Main()
    {
        Exception ex = new();

        _ = new EmployeeListNotFoundException();
        _ = new EmployeeListNotFoundException("Hi!");
        _ = new EmployeeListNotFoundException("Hi!", ex);
    }
}
```

> **Note:**
> In situations where you're using remoting, you must ensure that the metadata for any user-defined exceptions is available at the server (callee) and to the client (the proxy object or caller). For more information, see Best practices for exceptions.

## See also

- Exceptions
