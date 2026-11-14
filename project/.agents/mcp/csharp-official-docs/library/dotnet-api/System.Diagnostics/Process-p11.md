---
title: "Process class (part 11 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 11 of 15)

## Process.RunAndCaptureText(String, String>, TimeSpan>) method

```csharp
public static System.Diagnostics.ProcessTextOutput RunAndCaptureText (string fileName, System.Collections.Generic.IEnumerable<string>? arguments = default, TimeSpan? timeout = default);
```

Starts a process with the specified file name and optional arguments, captures its standard output and error, waits for it to exit, and returns the captured text and exit status.

Parameters:

- `fileName`: The name of the executable to start.
- `arguments`: The command-line arguments to pass to the process. Pass `null` or an empty sequence to start the process without additional arguments.
- `timeout`: The maximum amount of time to wait for the process to exit. When `null`, waits indefinitely. If the process does not exit within the specified timeout, it is killed.

Returns: The captured text output and exit status of the process.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `ArgumentNullException`: `fileName` is `null`.
- `ArgumentException`: `fileName` is empty.
- `TimeoutException`: The redirected streams were not fully read within the specified `timeout`.

If the timeout expires while reading the redirected streams, the method attempts to kill the process and throws `TimeoutException`. If the streams have been fully read but the process doesn't exit within the remaining timeout, the process is killed and the returned `ExitStatus` has `Canceled` set to `true`.

## Process.RunAndCaptureTextAsync(ProcessStartInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Diagnostics.ProcessTextOutput> RunAndCaptureTextAsync (System.Diagnostics.ProcessStartInfo startInfo, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously starts the process described by `startInfo`, captures its standard output and error, waits for it to exit, and returns the captured text and exit status.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information used to start the process.
- `cancellationToken`: A token to cancel the asynchronous operation. If the token is canceled, the process is killed.

Returns: A task that represents the asynchronous operation. The value of the task contains the captured text output and exit status of the process.

Exceptions:

- `ArgumentNullException`: `startInfo` is `null`.
- `InvalidOperationException`: `ProcessStartInfo.UseShellExecute` is set to `true`.

-or-

`ProcessStartInfo.RedirectStandardOutput` or `ProcessStartInfo.RedirectStandardError` is not set to `true`.
- `OperationCanceledException`: The `cancellationToken` was canceled while reading the redirected streams.

If cancellation occurs while reading the redirected streams, the method attempts to kill the process and throws `OperationCanceledException`. If cancellation occurs after the streams have been fully read but while waiting for the process to exit, the process is killed and the returned `ExitStatus` has `Canceled` set to `true`.

## Process.RunAndCaptureTextAsync(String, String>, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Diagnostics.ProcessTextOutput> RunAndCaptureTextAsync (string fileName, System.Collections.Generic.IEnumerable<string>? arguments = default, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously starts a process with the specified file name and optional arguments, captures its standard output and error, waits for it to exit, and returns the captured text and exit status.

Parameters:

- `fileName`: The name of the executable to start.
- `arguments`: The command-line arguments to pass to the process. Pass `null` or an empty sequence to start the process without additional arguments.
- `cancellationToken`: A token to cancel the asynchronous operation. If the token is canceled, the process is killed.

Returns: A task that represents the asynchronous operation. The value of the task contains the captured text output and exit status of the process.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.
- `ArgumentException`: `fileName` is empty.
- `OperationCanceledException`: The `cancellationToken` was canceled while reading the redirected streams.

If cancellation occurs while reading the redirected streams, the method attempts to kill the process and throws `OperationCanceledException`. If cancellation occurs after the streams have been fully read but while waiting for the process to exit, the process is killed and the returned `ExitStatus` has `Canceled` set to `true`.

## Process.RunAsync(ProcessStartInfo, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Diagnostics.ProcessExitStatus> RunAsync (System.Diagnostics.ProcessStartInfo startInfo, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously starts the process described by `startInfo`, waits for it to exit, and returns its exit status.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information used to start the process.
- `cancellationToken`: A token to cancel the asynchronous operation. If the token is canceled, the process is killed.

Returns: A task that represents the asynchronous operation. The value of the task contains the exit status of the process. If the process is killed due to cancellation, `ProcessExitStatus.Canceled` is `true`.

Exceptions:

- `ArgumentNullException`: `startInfo` is `null`.
- `InvalidOperationException`: `ProcessStartInfo.UseShellExecute` is set to `true`.

-or-

`ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` is set to `true`. Use the corresponding standard handle properties to supply handles instead.

To be added.

## Process.RunAsync(String, String>, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Diagnostics.ProcessExitStatus> RunAsync (string fileName, System.Collections.Generic.IEnumerable<string>? arguments = default, bool silent = false, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously starts a process with the specified file name and optional arguments, waits for it to exit, and returns its exit status.

Parameters:

- `fileName`: The name of the executable to start.
- `arguments`: The command-line arguments to pass to the process. Pass `null` or an empty sequence to start the process without additional arguments.
- `silent`: When `true`, redirects standard input, output, and error to the null device, ensuring the process produces no visible console output. When `false`, the process inherits standard handles from the parent.
- `cancellationToken`: A token to cancel the asynchronous operation. If the token is canceled, the process is killed.

Returns: A task that represents the asynchronous operation. The value of the task contains the exit status of the process. If the process is killed due to cancellation, `ProcessExitStatus.Canceled` is `true`.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.
- `ArgumentException`: `fileName` is empty.

To be added.

## Process.Signal(PosixSignal) method

```csharp
public bool Signal (System.Runtime.InteropServices.PosixSignal signal);
```

Sends a signal to the associated process.

Parameters:

- `signal`: The signal to send.

Returns: `true` if the signal was sent successfully; `false` if the process has already exited or no longer exists and the signal was not delivered.

Exceptions:

- `InvalidOperationException`: There is no process associated with this object, or the process handle is invalid.
- `ObjectDisposedException`: The process object has been disposed.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: The current platform or the specified signal is not supported.
- `Win32Exception`: The signal could not be sent.

On Windows, only `SIGKILL` is supported, and sending it terminates the process. The process handle must have `PROCESS_TERMINATE` access.

## Process.Start() method

```csharp
public bool Start ();
```

Starts (or reuses) the process resource that is specified by the `Process.StartInfo` property of this `Process` component and associates it with the component.

Returns: `true` if a process resource is started; `false` if no new process resource is started (for example, if an existing process is reused).

Exceptions:

- `InvalidOperationException`: No file name was specified in the `Process` component's `Process.StartInfo`.

-or-

The `ProcessStartInfo.UseShellExecute` member of the `Process.StartInfo` property is `true` while `ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` is `true`.
- `Win32Exception`: There was an error in opening the associated file.
- `ObjectDisposedException`: The process object has already been disposed.
- `PlatformNotSupportedException`: Method not supported on operating systems without shell support, such as Nano Server.

#### Remarks
Use this overload to start a process resource and associate it with the current `Process` component. The return value `true` indicates that a new process resource was started. If the process resource specified by the `ProcessStartInfo.FileName` member of the `StartInfo` property is already running on the computer, no additional process resource is started. Instead, the running process resource is reused and `false` is returned.

You can start a ClickOnce application by specifying the location (for example, a Web address) from which you originally installed the application. Do not start a ClickOnce application by specifying its installed location on your hard drive.

> **Note:**
> If you are using Visual Studio, this overload of the `Process.Start` method is the one that you insert into your code after you drag a `Process` component onto the designer. Use the `Properties` window to expand the `StartInfo` category and write the appropriate value into the `FileName` property. Your changes will appear in the form's `InitializeComponent` procedure.

This overload of `Process.Start` is not a `static` method. You must call it from an instance of the `Process` class. Before calling `Process.Start`, you must first specify `StartInfo` property information for this `Process` instance, because that information is used to determine the process resource to start.

The other overloads of the `Process.Start` method are `static` members. You do not need to create an instance of the `Process` component before you call those overloads of the method. Instead, you can call `Process.Start` for the `Process` class itself, and a new `Process` component is created if the process was started. Or, `null` is returned if a process was reused. The process resource is automatically associated with the new `Process` component that is returned by the `Process.Start` method.

The `Process.StartInfo` members can be used to duplicate the functionality of the `Run` dialog box of the Windows `Start` menu. Anything that can be typed into a command line can be started by setting the appropriate values in the `StartInfo` property. The only `StartInfo` property that must be set is the `FileName` property. The `FileName` property does not have to be an executable file. It can be of any file type for which the extension has been associated with an application that is installed on the system. For example, the `FileName` property can have a .txt extension if you have associated text files with an editor, such as Notepad, or it can have a .doc extension if you have associated .doc files with a word processing tool, such as Microsoft Word.

In the command line, you can specify actions to take for certain types of files. For example, you can print documents or edit text files. Specify these actions using the `ProcessStartInfo.Verb` member of the `StartInfo` property. For other types of files, you can specify command-line arguments when you start the file from the `Run` dialog box. For example, you can pass a URL as an argument if you specify your browser as the `ProcessStartInfo.FileName`. These arguments can be specified in the `StartInfo` property's `ProcessStartInfo.Arguments` member.

If you have a path variable declared in your system using quotes, you must fully qualify that path when starting any process found in that location. Otherwise, the system will not find the path. For example, if `c:\mypath` is not in your path, and you add it using quotation marks: `path = %path%;"c:\mypath"`, you must fully qualify any process in `c:\mypath` when starting it.

> **Note:**
> ASP.NET Web page and server control code executes in the context of the ASP.NET worker process on the Web server. If you use the `Process.Start` method in an ASP.NET Web page or server control, the new process executes on the Web server with restricted permissions. The process does not start in the same context as the client browser, and does not have access to the user desktop.

Whenever you use `Process.Start` to start a process, you might need to close it or you risk losing system resources. Close processes using `Process.CloseMainWindow` or `Process.Kill`. You can check whether a process has already been closed by using its `HasExited` property.

A note about apartment states in managed threads is necessary here. When `ProcessStartInfo.UseShellExecute` is `true` on the process component's `StartInfo` property, make sure you have set a threading model on your application by setting the attribute `[STAThread]` on the `main()` method. Otherwise, a managed thread can be in an `unknown` state or put in the `MTA` state, the latter of which conflicts with `ProcessStartInfo.UseShellExecute` being `true`. Some methods require that the apartment state not be `unknown`. If the state is not explicitly set, when the application encounters such a method, it defaults to `MTA`, and once set, the apartment state cannot be changed. However, `MTA` causes an exception to be thrown when the operating system shell is managing the thread.

#### Examples
The following example uses an instance of the `Process` class to start a process.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstart.cs._
