---
title: "ProcessStartInfo class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessStartInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessStartInfo class

Namespace: `System.Diagnostics`

```csharp
public sealed class ProcessStartInfo
```

Specifies a set of values that are used when you start a process.

#### Remarks
`ProcessStartInfo` is used together with the `Process` component. When you start a process using the `Process` class, you have access to process information in addition to that available when attaching to a running process.

You can use the `ProcessStartInfo` class for better control over the process you start. You must at least set the `FileName` property, either manually or using the constructor. The file name is any application or document. Here a document is defined to be any file type that has an open or default action associated with it. You can view registered file types and their associated applications for your computer by using the **Folder Options** dialog box, which is available through the operating system. The **Advanced** button leads to a dialog box that shows whether there is an open action associated with a specific registered file type.

In addition, you can set other properties that define actions to take with that file. You can specify a value specific to the type of the `FileName` property for the `Verb` property. For example, you can specify "print" for a document type. Additionally, you can specify `Arguments` property values to be command-line arguments to pass to the file's open procedure. For example, if you specify a text editor application in the `FileName` property, you can use the `Arguments` property to specify a text file to be opened by the editor.

Standard input is usually the keyboard, and standard output and standard error are usually the monitor screen. However, you can use the `ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, and `ProcessStartInfo.RedirectStandardError` properties to cause the process to get input from or return output to a file or other device. If you use the `Process.StandardInput`, `Process.StandardOutput`, or `Process.StandardError` properties on the `Process` component, you must first set the corresponding value on the `ProcessStartInfo` property. Otherwise, the system throws an exception when you read or write to the stream.

Set the `UseShellExecute` property to specify whether to start the process by using the operating system shell. If `ProcessStartInfo.UseShellExecute` is set to `false`, the new process inherits the standard input, standard output, and standard error streams of the calling process, unless the `ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` properties, respectively, are set to `true`.

You can change the value of any `ProcessStartInfo` property up to the time that the process starts. After you start the process, changing these values has no effect.

#### Examples
The following code example demonstrates how to use the `ProcessStartInfo` class to start Internet Explorer. The destination URLs are provided as `ProcessStartInfo` arguments.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

## ProcessStartInfo.ProcessStartInfo() constructor

```csharp
public ProcessStartInfo ();
```

Initializes a new instance of the `ProcessStartInfo` class without specifying a file name with which to start the process.

#### Remarks
You must set at least the `FileName` property before you start the process. The file name is any application or document. In this case, a document is defined to be any file type that has an open or default action associated with it. You can view registered file types and their associated applications for your computer by using the **Folder Options** dialog box, which is available through the operating system. The **Advanced** button leads to a dialog box that shows whether there is an open action associated with a specific registered file type.

Optionally, you can also set other properties before you start the process. The `Verb` property supplies actions to take, such as "print", with the file indicated in the `FileName` property. The `Arguments` property supplies a way to pass <example-value> arguments to the file when the system opens it.

## ProcessStartInfo.ProcessStartInfo(String) constructor

```csharp
public ProcessStartInfo (string fileName);
```

Initializes a new instance of the `ProcessStartInfo` class and specifies a file name such as an application or document with which to start the process.

Parameters:

- `fileName`: An application or document with which to start a process.

#### Remarks
The file name is any application or document. In this case, a document is defined to be any file type that has an open or default action associated with it. You can view registered file types and their associated applications for your computer by using the **Folder Options** dialog box, which is available through the operating system. The **Advanced** button leads to a dialog box that shows whether there is an open action associated with a specific registered file type.

You can change the `FileName` property after you call this constructor, up to the time that the process starts. After you start the process, changing these values has no effect.

## ProcessStartInfo.ProcessStartInfo(String, String>) constructor

```csharp
public ProcessStartInfo (string fileName, System.Collections.Generic.IEnumerable<string> arguments);
```

Initializes a new instance of the `ProcessStartInfo` class and specifies the name of the application to start and a set of command-line arguments to pass to the application.

Parameters:

- `fileName`: The name of the application or document to start.
- `arguments`: A collection of command-line arguments to pass to the application.

Exceptions:

- `ArgumentNullException`: `fileName` or `arguments` is `null`.

To be added.

## ProcessStartInfo.ProcessStartInfo(String, String) constructor

```csharp
public ProcessStartInfo (string fileName, string arguments);
```

Initializes a new instance of the `ProcessStartInfo` class, specifies an application file name with which to start the process, and specifies a set of command-line arguments to pass to the application.

Parameters:

- `fileName`: An application with which to start a process.
- `arguments`: Command-line arguments to pass to the application when the process starts.

#### Remarks
The file name is any application or document. In this case, a document is defined to be any file type that has an open or default action associated with it. You can view registered file types and their associated applications for your computer by using the **Folder Options** dialog box, which is available through the operating system. The **Advanced** button leads to a dialog box that shows whether there is an open action associated with a specific registered file type.

You can change the `ProcessStartInfo.FileName` or `ProcessStartInfo.Arguments` properties after you call this constructor, up to the time that the process starts. After you start the process, changing these values has no effect.

## ProcessStartInfo.ArgumentList property

```csharp
public System.Collections.ObjectModel.Collection<string> ArgumentList { get; }
```

Gets a collection of command-line arguments to use when starting the application. Strings added to the list don't need to be previously escaped.

Returns: A collection of command-line arguments.

`ArgumentList` and the `Arguments` property are independent of one another and **only one of them can be used at the same time**. The main difference between these APIs is that `ArgumentList` escapes the provided arguments and **internally** builds a single string that's passed to the operating system when calling `Process.Start(info)`. So if you aren't sure how to properly escape your arguments, you should choose `ArgumentList` over `Arguments`.

#### Examples

This example adds three arguments to the process start info.

```csharp
var info = new System.Diagnostics.ProcessStartInfo("cmd.exe")
{
    ArgumentList = {
        "/c",
        "dir",
        @"C:\Program Files\dotnet" // The space character is escaped automatically.
    }
};

// The corresponding assignment to the Arguments property is:
var info = new System.Diagnostics.ProcessStartInfo("cmd.exe")
{
    Arguments = "/c dir \"C:\\Program Files\\dotnet\""
};
```

```vb
Dim info As New System.Diagnostics.ProcessStartInfo("cmd.exe")
info.ArgumentList.Add("/c")
info.ArgumentList.Add("dir")
info.ArgumentList.Add("C:\Program Files\dotnet")

' The corresponding assignment to the Arguments property is:
info.Arguments = "/c dir ""C:\Program Files\dotnet"""
```

## ProcessStartInfo.Arguments property

```csharp
public string Arguments { get; set; }
```

Gets or sets the set of command-line arguments to use when starting the application.

Returns: A single string containing the arguments to pass to the target application specified in the `ProcessStartInfo.FileName` property. The default is an empty string ("").

The length of the string assigned to the `Arguments` property must be less than 32,699.

Arguments are parsed and interpreted by the target application, so must align with the expectations of that application. For .NET applications as demonstrated in the Examples below, spaces are interpreted as a separator between multiple arguments. A single argument that includes spaces must be surrounded by quotation marks, but those quotation marks are not carried through to the target application. To include quotation marks in the final parsed argument, triple-escape each mark.
If you use this property to set command-line arguments, `ArgumentList` must not contain any elements.

`Arguments` and `ArgumentList` are independent of one another. That is, the string assigned to the `Arguments` property does not populate the `ArgumentList` collection, and the members of the `ArgumentList` collection are not assigned to the `Arguments` property.

#### Examples
The first example creates a small application (argsecho.exe) that echos its arguments to the console. The second example creates an application that invokes argsecho.exe to demonstrate different variations for the `Arguments` property.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/ArgsEcho/processstartstatic3.cs._

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic2.cs._

## ProcessStartInfo.CreateNewProcessGroup property

```csharp
public bool CreateNewProcessGroup { get; set; }
```

Gets or sets a value indicating whether to start the process in a new process group.

Returns: `true` if the process starts in a new process group; otherwise, `false`. The default is `false`.

When a process is created in a new process group, it becomes the root of a new process group.

An implicit call to `SetConsoleCtrlHandler(NULL,TRUE)` is made on behalf of the new process, which means that the new process has Ctrl+C disabled.

This property is useful for preventing console control events sent to the child process from affecting the parent process.

## ProcessStartInfo.CreateNoWindow property

```csharp
public bool CreateNoWindow { get; set; }
```

Gets or sets a value indicating whether to start the process in a new window.

Returns: `true` if the process should be started without creating a new window to contain it; otherwise, `false`. The default is `false`.

#### Remarks
If the `UseShellExecute` property is `true` or the `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` properties are not `null`, the `CreateNoWindow` property value is ignored and a new window is created.

.NET does not support creating windows directly on Unix-like platforms, including macOS and Linux. This property is ignored on such platforms.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstart.cs._

## ProcessStartInfo.Domain property

```csharp
public string Domain { get; set; }
```

Gets or sets a value that identifies the domain to use when starting the process. If this value is `null`, the `ProcessStartInfo.UserName` property must be specified in UPN format.

Returns: The Active Directory domain to use when starting the process. If this value is `null`, the `ProcessStartInfo.UserName` property must be specified in UPN format.

Exceptions:

- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

This property is primarily of interest to users within enterprise environments that use Active Directory.

## ProcessStartInfo.Environment property

```csharp
public System.Collections.Generic.IDictionary<string,string?> Environment { get; }
```

Gets the environment variables that apply to this process and its child processes.

Returns: A generic dictionary containing the environment variables that apply to this process and its child processes.

#### Remarks
The environment variables contain search paths for files, directories for temporary files, application-specific options, and other similar information. Although you cannot directly set the `Environment` property, you can modify the generic dictionary returned by the property. For example, the following code adds a TempPath environment variable: `myProcess.StartInfo.Environment.Add("TempPath", "C:\\Temp")`.  You must set the `UseShellExecute` property to `false` to start the process after changing the `Environment` property. If `ProcessStartInfo.UseShellExecute` is `true`, an `InvalidOperationException` is thrown when the `Process.Start` method is called.

## ProcessStartInfo.EnvironmentVariables property

```csharp
public System.Collections.Specialized.StringDictionary EnvironmentVariables { get; }
```

Gets search paths for files, directories for temporary files, application-specific options, and other similar information.

Returns: A string dictionary that provides environment variables that apply to this process and child processes.

#### Remarks
Although you cannot set the `EnvironmentVariables` property, you can modify the `StringDictionary` returned by the property. For example, the following code adds a TempPath environment variable: `myProcess.StartInfo.EnvironmentVariables.Add("TempPath", "C:\\Temp")`.  You must set the `UseShellExecute` property to `false` to start the process after changing the `EnvironmentVariables` property. If `ProcessStartInfo.UseShellExecute` is `true`, an `InvalidOperationException` is thrown when the `Process.Start` method is called.
