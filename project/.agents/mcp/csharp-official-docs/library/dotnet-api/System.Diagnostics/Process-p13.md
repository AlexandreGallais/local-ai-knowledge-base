---
title: "Process class (part 13 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 13 of 15)

## Process.Start(String, String) method

```csharp
public static System.Diagnostics.Process Start (string fileName, string arguments);
```

Starts a process resource by specifying the name of an application and a set of command-line arguments, and associates the resource with a new `Process` component.

Parameters:

- `fileName`: The name of an application file to run in the process.
- `arguments`: Command-line arguments to pass when starting the process.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started. Note that a new process that's started alongside already running instances of the same process will be independent from the others. In addition, Start may return a non-null Process with its `Process.HasExited` property already set to `true`. In this case, the started process may have activated an existing instance of itself and then exited.

Exceptions:

- `InvalidOperationException`: The `fileName` or `arguments` parameter is `null`.
- `Win32Exception`: An error occurred when opening the associated file.

-or-

The file specified in the `fileName` could not be found.

-or-

The sum of the length of the arguments and the length of the full path to the process exceeds 2080. The error message associated with this exception can be one of the following: "The data area passed to a system call is too small." or "Access is denied."
- `ObjectDisposedException`: The process object has already been disposed.
- `FileNotFoundException`: The PATH environment variable has a string containing quotes.

#### Remarks
Use this overload to start a process resource by specifying its file name and command-line arguments. The overload associates the resource with a new `Process` object.

> **Note:**
> If the address of the executable file to start is a URL, the process is not started and `null` is returned.

This overload lets you start a process without first creating a new `Process` instance. The overload is an alternative to the explicit steps of creating a new `Process` instance, setting the `ProcessStartInfo.FileName` and `ProcessStartInfo.Arguments` members of the `StartInfo` property, and calling `Process.Start` for the `Process` instance.

Starting a process by specifying its file name and arguments is similar to typing the file name and command-line arguments in the `Run` dialog box of the Windows `Start` menu. Therefore, the file name does not need to represent an executable file. It can be of any file type for which the extension has been associated with an application installed on the system. For example the file name can have a .txt extension if you have associated text files with an editor, such as Notepad, or it can have a .doc if you have associated .doc files with a word processing tool, such as Microsoft Word. Similarly, in the same way that the `Run` dialog box can accept an executable file name with or without the .exe extension, the .exe extension is optional in the `fileName` parameter. For example, you can set the `fileName` parameter to either "Notepad.exe" or "Notepad". If the `fileName` parameter represents an executable file, the `arguments` parameter might represent a file to act upon, such as the text file in `Notepad.exe myfile.txt`. If the `fileName` parameter represents a command (.cmd) file, the `arguments` parameter must include either a "`/c`" or "`/k`" argument to specify whether the command window exits or remains after completion.

Unlike the other overloads, the overload of `Process.Start` that has no parameters is not a `static` member. Use that overload when you have already created a `Process` instance and specified start information (including the file name), and you want to start a process resource and associate it with the existing `Process` instance. Use one of the `static` overloads when you want to create a new `Process` component rather than start a process for an existing component. Both this overload and the overload that has no parameters allow you to specify the file name of the process resource to start and command-line arguments to pass.

If you have a path variable declared in your system using quotes, you must fully qualify that path when starting any process found in that location. Otherwise, the system will not find the path. For example, if `c:\mypath` is not in your path, and you add it using quotation marks: `path = %path%;"c:\mypath"`, you must fully qualify any process in `c:\mypath` when starting it.

> **Note:**
> ASP.NET Web page and server control code executes in the context of the ASP.NET worker process on the Web server. If you use the `Process.Start` method in an ASP.NET Web page or server control, the new process executes on the Web server with restricted permissions. The process does not start in the same context as the client browser, and does not have access to the user desktop.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.

A note about apartment states in managed threads is necessary here. When `ProcessStartInfo.UseShellExecute` is `true` on the process component's `StartInfo` property, make sure you have set a threading model on your application by setting the attribute `[STAThread]` on the `main()` method. Otherwise, a managed thread can be in an `unknown` state or put in the `MTA` state, the latter of which conflicts with `ProcessStartInfo.UseShellExecute` being `true`. Some methods require that the apartment state not be `unknown`. If the state is not explicitly set, when the application encounters such a method, it defaults to `MTA`, and once set, the apartment state cannot be changed. However, `MTA` causes an exception to be thrown when the operating system shell is managing the thread.

#### Examples
The following example first spawns an instance of Internet Explorer and displays the contents of the Favorites folder in the browser. It then starts some other instances of Internet Explorer and displays some specific pages or sites. Finally it starts Internet Explorer with the window being minimized while navigating to a specific site.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

## Process.Start(String, String, SecureString, String) method

```csharp
public static System.Diagnostics.Process? Start (string fileName, string userName, System.Security.SecureString password, string domain);
```

Starts a process resource by specifying the name of an application, a user name, a password, and a domain and associates the resource with a new `Process` component.

Parameters:

- `fileName`: The name of an application file to run in the process.
- `userName`: The user name to use when starting the process.
- `password`: A `SecureString` that contains the password to use when starting the process.
- `domain`: The domain to use when starting the process.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started. Note that a new process that's started alongside already running instances of the same process will be independent from the others. In addition, Start may return a non-null Process with its `Process.HasExited` property already set to `true`. In this case, the started process may have activated an existing instance of itself and then exited.

Exceptions:

- `InvalidOperationException`: No file name was specified.
- `Win32Exception`: There was an error in opening the associated file.

-or-

The file specified in the `fileName` could not be found.
- `ObjectDisposedException`: The process object has already been disposed.
- `PlatformNotSupportedException`: This member is not supported on Linux or macOS.

#### Remarks
Use this overload to create a new process and its primary thread by specifying its file name, user name, password, and domain. The new process then runs the specified executable file in the security context of the specified credentials (user, domain, and password).

> **Note:**
> When the executable file is located on a remote drive, you must identify the network share by using a uniform resource identifier (URI), not a linked drive letter.

> **Note:**
> If the address of the executable file to start is a URL, the process is not started and `null` is returned.

This overload lets you start a process without first creating a new `Process` instance. The overload is an alternative to the explicit steps of creating a new `Process` instance, setting the `ProcessStartInfo.FileName`, `ProcessStartInfo.UserName`, `ProcessStartInfo.Password`, and `ProcessStartInfo.Domain` properties of the `StartInfo` property, and calling `Process.Start` for the `Process` instance.

Similarly, in the same way that the **Run** dialog box can accept an executable file name with or without the .exe extension, the .exe extension is optional in the `fileName` parameter. For example, you can set the `fileName` parameter to either "Notepad.exe" or "Notepad". If the `fileName` parameter represents an executable file, the `arguments` parameter might represent a file to act upon, such as the text file in `Notepad.exe myfile.txt`.

> **Note:**
> The file name must represent an executable file in the `Process.Start` overloads that have `userName`, `password`, and `domain` parameters.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.

#### Examples
The following code example shows the use of this overload to start an executable file and also demonstrates the throwing of a `Win32Exception` when an attempt is made to start an application associated with a nonexecutable file.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Start/program.cs._

## Process.Start(String, String, String, SecureString, String) method

```csharp
public static System.Diagnostics.Process? Start (string fileName, string arguments, string userName, System.Security.SecureString password, string domain);
```

Starts a process resource by specifying the name of an application, a set of command-line arguments, a user name, a password, and a domain and associates the resource with a new `Process` component.

Parameters:

- `fileName`: The name of an application file to run in the process.
- `arguments`: Command-line arguments to pass when starting the process.
- `userName`: The user name to use when starting the process.
- `password`: A `SecureString` that contains the password to use when starting the process.
- `domain`: The domain to use when starting the process.

Returns: A new `Process` that is associated with the process resource, or `null` if no process resource is started. Note that a new process that's started alongside already running instances of the same process will be independent from the others. In addition, Start may return a non-null Process with its `Process.HasExited` property already set to `true`. In this case, the started process may have activated an existing instance of itself and then exited.

Exceptions:

- `InvalidOperationException`: No file name was specified.
- `Win32Exception`: An error occurred when opening the associated file.

-or-

The file specified in the `fileName` could not be found.

-or-

The sum of the length of the arguments and the length of the full path to the associated file exceeds 2080. The error message associated with this exception can be one of the following: "The data area passed to a system call is too small." or "Access is denied."
- `ObjectDisposedException`: The process object has already been disposed.
- `PlatformNotSupportedException`: This member is not supported on Linux or macOS.

#### Remarks
Use this overload to create a new process and its primary thread by specifying its file name, command-line arguments, user name, password, and domain. The new process then runs the specified executable file in the security context of the specified credentials (user, domain, and password).

> **Note:**
> When the executable file is located on a remote drive, you must identify the network share by using a uniform resource identifier (URI), not a linked drive letter.

> **Note:**
> If the address of the executable file to start is a URL, the process is not started and `null` is returned.

This overload lets you start a process without first creating a new `Process` instance. The overload is an alternative to the explicit steps of creating a new `Process` instance, setting the `ProcessStartInfo.FileName`, `ProcessStartInfo.Arguments`, `ProcessStartInfo.UserName`, `ProcessStartInfo.Password`, and `ProcessStartInfo.Domain` properties of the `StartInfo` property, and calling `Process.Start` for the `Process` instance.

Similarly, in the same way that the **Run** dialog box can accept an executable file name with or without the .exe extension, the .exe extension is optional in the `fileName` parameter. For example, you can set the `fileName` parameter to either "Notepad.exe" or "Notepad". If the `fileName` parameter represents an executable file, the `arguments` parameter might represent a file to act upon, such as the text file in `Notepad.exe myfile.txt`.

> **Note:**
> The file name must represent an executable file in the `Process.Start` overloads that have `userName`, `password`, and `domain` parameters.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.
