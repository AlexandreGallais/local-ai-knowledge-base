---
title: "Using objects that implement IDisposable"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/using-objects.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Using objects that implement IDisposable

The common language runtime's garbage collector (GC) reclaims the memory used by managed objects. Typically, types that use unmanaged resources implement the `System.IDisposable` or `System.IAsyncDisposable` interface to allow the unmanaged resources to be reclaimed. When you finish using an object that implements `System.IDisposable`, you call the object's `System.IDisposable.Dispose*` or `System.IAsyncDisposable.DisposeAsync*` implementation to explicitly perform cleanup. You can do this in one of two ways:

- With the C# `using` statement or declaration (`Using` in Visual Basic).
- By implementing a `try/finally` block, and calling the `System.IDisposable.Dispose*` or `System.IAsyncDisposable.DisposeAsync*` method in the `finally`.

> **Important:**
> The GC does ***not*** dispose your objects, as it has no knowledge of `System.IDisposable.Dispose` or `System.IAsyncDisposable.DisposeAsync`. The GC only knows whether an object is finalizable (that is, it defines an `System.Object.Finalize` method), and when the object's finalizer needs to be called. For more information, see How finalization works. For additional details on implementing `Dispose` and `DisposeAsync`, see:
>
> - Implement a Dispose method
> - Implement a DisposeAsync method

Objects that implement `System.IDisposable` or `System.IAsyncDisposable` should always be properly disposed of, regardless of variable scoping, unless otherwise explicitly stated. Types that define a finalizer to release unmanaged resources usually call `System.GC.SuppressFinalize*` from either their `Dispose` or `DisposeAsync` implementation. Calling `System.GC.SuppressFinalize*` indicates to the GC that the finalizer has already been run and the object shouldn't be promoted for finalization.

## The using statement

The `using` statement in C# and the `Using` statement in Visual Basic simplify the code that you must write to cleanup an object. The `using` statement obtains one or more resources, executes the statements that you specify, and automatically disposes of the object. However, the `using` statement is useful only for objects that are used within the scope of the method in which they are constructed.

The following example uses the `using` statement to create and release a `System.IO.StreamReader` object.

```csharp
﻿using System.IO;

class UsingStatement
{
    static void Main()
    {
        var buffer = new char[50];
        using (StreamReader streamReader = new("file1.txt"))
        {
            int charsRead = 0;
            while (streamReader.Peek() != -1)
            {
                charsRead = streamReader.Read(buffer, 0, buffer.Length);
                //
                // Process characters read.
                //
            }
        }
    }
}
```

A `using` declaration is an alternative syntax available where the braces are removed, and scoping is implicit.

```csharp
﻿using System.IO;

class UsingDeclaration
{
    static void Main()
    {
        var buffer = new char[50];
        using StreamReader streamReader = new("file1.txt");

        int charsRead = 0;
        while (streamReader.Peek() != -1)
        {
            charsRead = streamReader.Read(buffer, 0, buffer.Length);
            //
            // Process characters read.
            //
        }
    }
}
```
Although the `System.IO.StreamReader` class implements the `System.IDisposable` interface, which indicates that it uses an unmanaged resource, the example doesn't explicitly call the `System.IO.StreamReader.Dispose*` method. When the C# or Visual Basic compiler encounters the `using` statement, it emits intermediate language (IL) that is equivalent to the following code that explicitly contains a `try/finally` block.

```csharp
﻿using System.IO;

class TryFinallyGenerated
{
    static void Main()
    {
        var buffer = new char[50];
        StreamReader? streamReader = null;
        try
        {
            streamReader = new StreamReader("file1.txt");
            int charsRead = 0;
            while (streamReader.Peek() != -1)
            {
                charsRead = streamReader.Read(buffer, 0, buffer.Length);
                //
                // Process characters read.
                //
            }
        }
        finally
        {
            // If non-null, call the object's Dispose method.
            streamReader?.Dispose();
        }
    }
}
```

The C# `using` statement also allows you to acquire multiple resources in a single statement, which is internally equivalent to nested `using` statements. The following example instantiates two `System.IO.StreamReader` objects to read the contents of two different files.

```csharp
﻿using System.IO;

class SingleStatementMultiple
{
    static void Main()
    {
        var buffer1 = new char[50];
        var buffer2 = new char[50];

        using StreamReader version1 = new("file1.txt"),
                           version2 = new("file2.txt");

        int charsRead1, charsRead2 = 0;
        while (version1.Peek() != -1 && version2.Peek() != -1)
        {
            charsRead1 = version1.Read(buffer1, 0, buffer1.Length);
            charsRead2 = version2.Read(buffer2, 0, buffer2.Length);
            //
            // Process characters read.
            //
        }
    }
}
```
## Try/finally block

Instead of wrapping a `try/finally` block in a `using` statement, you may choose to implement the `try/finally` block directly. It may be your personal coding style, or you might want to do this for one of the following reasons:

- To include a `catch` block to handle exceptions thrown in the `try` block. Otherwise, any exceptions thrown within the `using` statement are unhandled.
- To instantiate an object that implements `System.IDisposable` whose scope is not local to the block within which it is declared.

The following example is similar to the previous example, except that it uses a `try/catch/finally` block to instantiate, use, and dispose of a `System.IO.StreamReader` object, and to handle any exceptions thrown by the `System.IO.StreamReader` constructor and its `System.IO.StreamReader.ReadToEnd*` method. The code in the `finally` block checks that the object that implements `System.IDisposable` isn't `null` before it calls the `System.IDisposable.Dispose*` method. Failure to do this can result in a `System.NullReferenceException` exception at runtime.

```csharp
﻿using System;
using System.Globalization;
using System.IO;

class TryExplicitCatchFinally
{
    static void Main()
    {
        StreamReader? streamReader = null;
        try
        {
            streamReader = new StreamReader("file1.txt");
            string contents = streamReader.ReadToEnd();
            var info = new StringInfo(contents);
            Console.WriteLine($"The file has {info.LengthInTextElements} text elements.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("The file cannot be found.");
        }
        catch (IOException)
        {
            Console.WriteLine("An I/O error has occurred.");
        }
        catch (OutOfMemoryException)
        {
            Console.WriteLine("There is insufficient memory to read the file.");
        }
        finally
        {
            streamReader?.Dispose();
        }
    }
}
```

You can follow this basic pattern if you choose to implement or must implement a `try/finally` block, because your programming language doesn't support a `using` statement but does allow direct calls to the `System.IDisposable.Dispose*` method.

## IDisposable instance members

If a class owns an instance field or property and its type implements `System.IDisposable`, the class should also implement `System.IDisposable`. For more information, see Implement a cascade dispose.

## See also

- Cleaning up unmanaged resources
- using Statement (C# Reference)
- Using Statement (Visual Basic)
