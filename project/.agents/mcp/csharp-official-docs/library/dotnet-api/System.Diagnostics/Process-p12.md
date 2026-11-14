---
title: "Process class (part 12 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 12 of 15)

## Process.Start(ProcessStartInfo) method

```csharp
public static System.Diagnostics.Process? Start (System.Diagnostics.ProcessStartInfo startInfo);
```

Starts the process resource that is specified by the parameter containing process start information (for example, the file name of the process to start) and associates the resource with a new `Process` component.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information that is used to start the process, including the file name and any command-line arguments.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started. Note that a new process that's started alongside already running instances of the same process will be independent from the others. In addition, Start may return a non-null Process with its `Process.HasExited` property already set to `true`. In this case, the started process may have activated an existing instance of itself and then exited.

Exceptions:

- `InvalidOperationException`: No file name was specified in the `startInfo` parameter's `ProcessStartInfo.FileName` property.

-or-

The `ProcessStartInfo.UseShellExecute` property of the `startInfo` parameter is `true` and the `ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` property is also `true`.

-or-

The `ProcessStartInfo.UseShellExecute` property of the `startInfo` parameter is `true` and the `ProcessStartInfo.UserName` property is not `null` or empty or the `ProcessStartInfo.Password` property is not `null`.
- `ArgumentNullException`: The `startInfo` parameter is `null`.
- `ObjectDisposedException`: The process object has already been disposed.
- `Win32Exception`: An error occurred when opening the associated file.

-or-

The file specified in the `startInfo` parameter's `ProcessStartInfo.FileName` property could not be found.

-or-

The sum of the length of the arguments and the length of the full path to the process exceeds 2080. The error message associated with this exception can be one of the following: "The data area passed to a system call is too small." or "Access is denied."
- `PlatformNotSupportedException`: Method not supported on operating systems without shell support, such as Nano Server.

#### Remarks
Use this overload to start a process resource by specifying a `ProcessStartInfo` instance. The overload associates the resource with a new `Process` object.

> **Note:**
> If the address of the executable file to start is a URL, the process is not started and `null` is returned.

This overload lets you start a process without first creating a new `Process` instance. Using this overload with a `ProcessStartInfo` parameter is an alternative to the explicit steps of creating a new `Process` instance, setting its `Process.StartInfo` properties, and calling `Process.Start` for the `Process` instance.

Using a `ProcessStartInfo` instance as the parameter lets you call `Process.Start` with the most control over what is passed into the call to start the process. If you need to pass only a file name or a file name and arguments, it is not necessary to create a new `ProcessStartInfo` instance, although that is an option. The only `StartInfo` property that must be set is the `FileName` property. The `FileName` property does not need to represent an executable file. It can be of any file type for which the extension has been associated with an application that is installed on the system. For example, the `FileName` property can have a .txt extension if you have associated text files with an editor, such as Notepad, or it can have a .doc extension if you have associated .doc files with a word processing tool, such as Microsoft Word.

You can start a ClickOnce application by specifying the location (for example, a Web address) from which you originally installed the application. Do not start a ClickOnce application by specifying its installed location on your hard drive.

If the `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` properties of the `Process.StartInfo` instance are set, the unmanaged `CreateProcessWithLogonW` function is called, which starts the process in a new window even if the `CreateNoWindow` property value is `true` or the `WindowStyle` property value is `Hidden`. If the `Domain` property is `null`, the `UserName` property must be in UPN format, *user*@*DNS_domain_name*.

Unlike the other overloads, the overload of `Process.Start` that has no parameters is not a `static` member. Use that overload when you have already created a `Process` instance and specified start information (including the file name), and you want to start a process resource and associate it with the existing `Process` instance. Use one of the `static` overloads when you want to create a new `Process` component rather than start a process for an existing component. Both this overload and the overload that has no parameters allow you to specify the start information for the process resource by using a `ProcessStartInfo` instance.

If you have a path variable declared in your system using quotes, you must fully qualify that path when starting any process found in that location. Otherwise, the system will not find the path. For example, if `c:\mypath` is not in your path, and you add it using quotation marks: `path = %path%;"c:\mypath"`, you must fully qualify any process in `c:\mypath` when starting it.

> **Note:**
> ASP.NET Web page and server control code executes in the context of the ASP.NET worker process on the Web server. If you use the `Process.Start` method in an ASP.NET Web page or server control, the new process executes on the Web server with restricted permissions. The process does not start in the same context as the client browser, and does not have access to the user desktop.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.

A note about apartment states in managed threads is necessary here. When `ProcessStartInfo.UseShellExecute` is `true` on the `startInfo` parameter, make sure you have set a threading model on your application by setting the attribute `[STAThread]` on the `main()` method. Otherwise, a managed thread can be in an `unknown` state or put in the `MTA` state, the latter of which conflicts with `ProcessStartInfo.UseShellExecute` being `true`. Some methods require that the apartment state not be `unknown`. If the state is not explicitly set, when the application encounters such a method, it defaults to `MTA`, and once set, the apartment state cannot be changed. However, `MTA` causes an exception to be thrown when the operating system shell is managing the thread.

#### Examples
The following example first spawns an instance of Internet Explorer and displays the contents of the Favorites folder in the browser. It then starts some other instances of Internet Explorer and displays some specific pages or sites. Finally it starts Internet Explorer with the window being minimized while navigating to a specific site.

For additional examples of other uses of this method, refer to the individual properties of the `ProcessStartInfo` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

## Process.Start(String) method

```csharp
public static System.Diagnostics.Process Start (string fileName);
```

Starts a process resource by specifying the name of a document or application file and associates the resource with a new `Process` component.

Parameters:

- `fileName`: The name of a document or application file to run in the process.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started. Note that a new process that's started alongside already running instances of the same process will be independent from the others. In addition, Start may return a non-null Process with its `Process.HasExited` property already set to `true`. In this case, the started process may have activated an existing instance of itself and then exited.

Exceptions:

- `Win32Exception`: An error occurred when opening the associated file.

-or-

The file specified in the `fileName` could not be found.
- `ObjectDisposedException`: The process object has already been disposed.
- `FileNotFoundException`: The PATH environment variable has a string containing quotes.

#### Remarks
Use this overload to start a process resource by specifying its file name. The overload associates the resource with a new `Process` object.

> **Note:**
> If the address of the executable file to start is a URL, the process is not started and `null` is returned.

This overload lets you start a process without first creating a new `Process` instance. The overload is an alternative to the explicit steps of creating a new `Process` instance, setting the `ProcessStartInfo.FileName` member of the `StartInfo` property, and calling `Process.Start` for the `Process` instance.

You can start a ClickOnce application by setting the `fileName` parameter to the location (for example, a Web address) from which you originally installed the application. Do not start a ClickOnce application by specifying its installed location on your hard drive.

Starting a process by specifying its file name is similar to typing the information in the `Run` dialog box of the Windows `Start` menu. Therefore, the file name does not need to represent an executable file. It can be of any file type for which the extension has been associated with an application installed on the system. For example the file name can have a .txt extension if you have associated text files with an editor, such as Notepad, or it can have a .doc if you have associated .doc files with a word processing tool, such as Microsoft Word. Similarly, in the same way that the `Run` dialog box can accept an executable file name with or without the .exe extension, the .exe extension is optional in the `fileName` parameter. For example, you can set the `fileName` parameter to either "Notepad.exe" or "Notepad".

This overload does not allow command-line arguments for the process. If you need to specify one or more command-line arguments for the process, use the `Start` or `Start` overloads.

Unlike the other overloads, the overload of `Process.Start` that has no parameters is not a `static` member. Use that overload when you have already created a `Process` instance and specified start information (including the file name), and you want to start a process resource and associate it with the existing `Process` instance. Use one of the `static` overloads when you want to create a new `Process` component rather than start a process for an existing component. Both this overload and the overload that has no parameters allow you to specify the file name of the process resource to start.

If you have a path variable declared in your system using quotes, you must fully qualify that path when starting any process found in that location. Otherwise, the system will not find the path. For example, if `c:\mypath` is not in your path, and you add it using quotation marks: `path = %path%;"c:\mypath"`, you must fully qualify any process in `c:\mypath` when starting it.

> **Note:**
> ASP.NET Web page and server control code executes in the context of the ASP.NET worker process on the Web server. If you use the `Process.Start` method in an ASP.NET Web page or server control, the new process executes on the Web server with restricted permissions. The process does not start in the same context as the client browser, and does not have access to the user desktop.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.

A note about apartment states in managed threads is necessary here. When `ProcessStartInfo.UseShellExecute` is `true` on the process component's `StartInfo` property, make sure you have set a threading model on your application by setting the attribute `[STAThread]` on the `main()` method. Otherwise, a managed thread can be in an `unknown` state or put in the `MTA` state, the latter of which conflicts with `ProcessStartInfo.UseShellExecute` being `true`. Some methods require that the apartment state not be `unknown`. If the state is not explicitly set, when the application encounters such a method, it defaults to `MTA`, and once set, the apartment state cannot be changed. However, `MTA` causes an exception to be thrown when the operating system shell is managing the thread.

#### Examples
The following example first spawns an instance of Internet Explorer and displays the contents of the Favorites folder in the browser. It then starts some other instances of Internet Explorer and displays some specific pages or sites. Finally it starts Internet Explorer with the window being minimized while navigating to a specific site.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

## Process.Start(String, String>) method

```csharp
public static System.Diagnostics.Process Start (string fileName, System.Collections.Generic.IEnumerable<string> arguments);
```

Starts a process resource by specifying the name of an application and a set of command line arguments.

Parameters:

- `fileName`: The name of a document or application file to run in the process.
- `arguments`: The command-line arguments to pass when starting the process.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started.

#### Remarks
Each argument will be escaped automatically if required.
