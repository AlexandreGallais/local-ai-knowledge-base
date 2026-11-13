---
title: "Create Console Applications in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/building-console-apps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Console apps in .NET

.NET applications can use the `System.Console` class to read characters from and write characters to the console. Data from the console is read from the standard input stream, data to the console is written to the standard output stream, and error data to the console is written to the standard error output stream. These streams are automatically associated with the console when the application starts and are presented as the `System.Console.In*`, `System.Console.Out*`, and `System.Console.Error` properties, respectively.

The value of the `System.Console.In` property is a `System.IO.TextReader` object, whereas the values of the `System.Console.Out*` and `System.Console.Error` properties are `System.IO.TextWriter` objects. You can associate these properties with streams that do not represent the console, making it possible for you to point the stream to a different location for input or output. For example, you can redirect the output to a file by setting the `System.Console.Out` property to a `System.IO.StreamWriter`, which encapsulates a `System.IO.FileStream` by means of the `System.Console.SetOut*` method. The `System.Console.In*` and `System.Console.Out` properties do not need to refer to the same stream.

> **Note:**
> For more information about building console applications, including examples in C#, Visual Basic, and C++, see the documentation for the `System.Console` class.

If the console does not exist, for example, in a Windows Forms application, output written to the standard output stream will not be visible, because there is no console to write the information to. Writing information to an inaccessible console does not cause an exception to be raised. (You can always change the application type to **Console Application**, for example, in the project property pages in Visual Studio).

The **System.Console** class has methods that can read individual characters or entire lines from the console. Other methods convert data and format strings, and then write the formatted strings to the console. For more information on formatting strings, see Formatting types.

> **Tip:**
> Console applications lack a message pump that starts by default. Therefore, console calls to Microsoft Win32 timers might fail.

## See also

- `System.Console`
- Formatting Types
