---
title: "How to: Explicitly Throw Exceptions"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/how-to-explicitly-throw-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to explicitly throw exceptions

You can explicitly throw an exception using the C# `throw` or the Visual Basic `Throw` statement. You can also throw a caught exception again using the `throw` statement. It's good coding practice to add information to an exception that's rethrown to provide more information when debugging.

The following code example uses a `try`/`catch` block to catch a possible `System.IO.FileNotFoundException`. Following the `try` block is a `catch` block that catches the `System.IO.FileNotFoundException` and writes a message to the console if the data file is not found. The next statement is the `throw` statement that throws a new `System.IO.FileNotFoundException` and adds text information to the exception.

```csharp
﻿using System;
using System.IO;

namespace Example;

public class ProcessFile
{
    public static void Main()
    {
        var fs = default(FileStream);
        try
        {
            // Open a text tile.
            fs = new FileStream(@"C:\temp\data.txt", FileMode.Open);
            var sr = new StreamReader(fs);

            // Read a value from the file and output to the console.
            string? line = sr.ReadLine();
            Console.WriteLine(line);
        }
        catch (FileNotFoundException e)
        {
            Console.WriteLine($"[Data File Missing] {e}");
            throw new FileNotFoundException(@"[data.txt not in c:\temp directory]", e);
        }
        finally
        {
            fs?.Close();
        }
    }
}
```

## See also

- Exceptions
