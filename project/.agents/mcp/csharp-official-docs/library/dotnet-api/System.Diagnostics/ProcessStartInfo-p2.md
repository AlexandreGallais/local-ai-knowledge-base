---
title: "ProcessStartInfo class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessStartInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessStartInfo class (part 2 of 4)

## ProcessStartInfo.ErrorDialog property

```csharp
public bool ErrorDialog { get; set; }
```

Gets or sets a value indicating whether an error dialog box is displayed to the user if the process cannot be started.

Returns: `true` if an error dialog box should be displayed on the screen if the process cannot be started; otherwise, `false`. The default is `false`.

#### Remarks

> **Note:**
> `ProcessStartInfo.UseShellExecute` must be `true` if you want to set `ProcessStartInfo.ErrorDialog` to `true`.

## ProcessStartInfo.ErrorDialogParentHandle property

```csharp
public IntPtr ErrorDialogParentHandle { get; set; }
```

Gets or sets the window handle to use when an error dialog box is shown for a process that cannot be started.

Returns: A pointer to the handle of the error dialog box that results from a process start failure.

#### Remarks
If `ProcessStartInfo.ErrorDialog` is `true`, the `ErrorDialogParentHandle` property specifies the parent window for the dialog box that is shown. It is useful to specify a parent to keep the dialog box in front of the application.

## ProcessStartInfo.FileName property

```csharp
public string FileName { get; set; }
```

Gets or sets the application or document to start.

Returns: The name of the application to start, or the name of a document of a file type that is associated with an application and that has a default open action available to it. The default is an empty string ("").

#### Remarks
You must set at least the `FileName` property before you start the process. The file name is any application or document. A document is defined to be any file type that has an open or default action associated with it. You can view registered file types and their associated applications for your computer by using the **Folder Options** dialog box, which is available through the operating system. The **Advanced** button leads to a dialog box that shows whether there is an open action associated with a specific registered file type.

The set of file types available to you depends in part on the value of the `UseShellExecute` property. If `ProcessStartInfo.UseShellExecute` is `true`, you can start any document and perform operations on the file, such as printing, with the `Process` component. When `ProcessStartInfo.UseShellExecute` is `false`, you can start only executables with the `Process` component.

You can start a ClickOnce application by setting the `FileName` property to the location (for example, a Web address) from which you originally installed the application. Do not start a ClickOnce application by specifying its installed location on your hard disk.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstart.cs._

## ProcessStartInfo.InheritedHandles property

```csharp
public System.Collections.Generic.IList<System.Runtime.InteropServices.SafeHandle>? InheritedHandles { get; set; }
```

Gets or sets a list of handles to be inherited by the child process.

Returns: A list of `SafeHandle` objects to be explicitly inherited by the child process, or `null` to use the default handle inheritance behavior.

When this property is not `null`, handle inheritance is restricted to the standard handles and the handles from this list. If the list is empty, only the standard handles are inherited.

Only `SafeFileHandle` and `SafePipeHandle` are supported in this list.

Setting this property on Unix systems that do not have native support for controlling handle inheritance can severely degrade process start performance.

Handles in this list should not have inheritance enabled beforehand. If they do, they could be unintentionally inherited by other processes started concurrently with different APIs, which might lead to security or resource management issues.

Two concurrent process starts that pass the same handle in `InheritedHandles` are not supported. On Windows, the implementation temporarily modifies each handle's inheritance flags. Those modifications aren't thread-safe across concurrent starts sharing the same handle.

This API can't be used together with `UseShellExecute` set to `true` or when specifying a user name via the `UserName` property.

On Windows, the implementation temporarily enables inheritance on each handle in this list by modifying the handle's flags using SetHandleInformation. After the child process is created, inheritance is unconditionally disabled on these handles to prevent them from being inherited by other processes started with different APIs. The handles themselves aren't duplicated; they're made inheritable and passed to the child process.

On Unix, the implementation modifies each file descriptor in the child process by removing the FD_CLOEXEC flag. The modification occurs after the fork and before the exec, so it doesn't affect the parent process.

## ProcessStartInfo.KillOnParentExit property

```csharp
public bool KillOnParentExit { get; set; }
```

Gets or sets a value indicating whether the child process should be terminated when the parent process exits.

Returns: `true` to terminate the child process when the parent exits; otherwise, `false`. The default is `false`.

When this property is set to `true`, the operating system automatically terminates the child process when the parent process exits, regardless of whether the parent exits gracefully or crashes.

This property cannot be used together with `UseShellExecute` set to `true`.

On Windows, the behavior is implemented using Job Objects with the JOB_OBJECT_LIMIT_KILL_ON_JOB_CLOSE flag.

On Linux and Android, the behavior is implemented using `prctl(PR_SET_PDEATHSIG)`.

## ProcessStartInfo.LoadUserProfile property

```csharp
public bool LoadUserProfile { get; set; }
```

Gets or sets a value that indicates whether the Windows user profile is to be loaded from the registry.

Returns: `true` if the Windows user profile should be loaded; otherwise, `false`. The default is `false`.

Exceptions:

- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

#### Remarks
This property is referenced if the process is being started by using the user name, password, and domain.

If the value is `true`, the user's profile in the `HKEY_USERS` registry key is loaded. Loading the profile can be time-consuming. Therefore, it is best to use this value only if you must access the information in the `HKEY_CURRENT_USER` registry key.

The profile is unloaded after the new process and all child processes it has created have been terminated.

## ProcessStartInfo.Password <example-value>

```csharp
public System.Security.SecureString? Password { get; set; }
```

Gets or sets a secure string that contains the user password to use when starting the process.

Returns: The user password to use when starting the process.

#### Remarks

> **Important:**
> The `WorkingDirectory` property must be set if `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` are provided. If the property is not set, the default working directory is %SYSTEMROOT%\system32.

> **Note:**
> Setting the `ProcessStartInfo.Domain`, `ProcessStartInfo.UserName`, and the `ProcessStartInfo.Password` properties in a `ProcessStartInfo` object is the recommended practice for starting a process with user credentials.

A `SecureString` object is like a `String` object in that it has a text value. However, the value of a `SecureString` object is automatically encrypted, it can be modified until your application marks it as read-only, and it can be deleted from computer memory by either your application or the .NET garbage collector.

For more information about secure strings and an example of how to obtain a password to set this property, see the `SecureString` class.

> **Note:**
> If you provide a value for the `Password` property, the `UseShellExecute` property must be `false`, or an `InvalidOperationException` will be thrown when the `Start` method is called.

## ProcessStartInfo.PasswordInClearText property

```csharp
public string? PasswordInClearText { get; set; }
```

Gets or sets the user password in clear text to use when starting the process.

Returns: The user password in clear text.

Exceptions:

- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

To be added.

## ProcessStartInfo.RedirectStandardError property

```csharp
public bool RedirectStandardError { get; set; }
```

Gets or sets a value that indicates whether the error output of an application is written to the `Process.StandardError` stream.

Returns: `true` if error output should be written to `Process.StandardError`; otherwise, `false`. The default is `false`.

#### Remarks
When a `Process` writes text to its standard error stream, that text is typically displayed on the console. By redirecting the `Process.StandardError` stream, you can manipulate or suppress the error output of a process. For example, you can filter the text, format it differently, or write the output to both the console and a designated log file.

> **Note:**
> You must set `ProcessStartInfo.UseShellExecute` to `false` if you want to set `ProcessStartInfo.RedirectStandardError` to `true`. Otherwise, reading from the `Process.StandardError` stream throws an exception.

The redirected `Process.StandardError` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine` and `StreamReader.ReadToEnd` perform synchronous read operations on the error output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardError` stream, or closes the stream.

In contrast, `Process.BeginErrorReadLine` starts asynchronous read operations on the `Process.StandardError` stream. This method enables a designated event handler for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

> **Note:**
> The application that is processing the asynchronous output should call the `Process.WaitForExit` method to ensure that the output buffer has been flushed.

Synchronous read operations introduce a dependency between the caller reading from the `Process.StandardError` stream and the child process writing to that stream. These dependencies can cause deadlock conditions. When the caller reads from the redirected stream of a child process, it is dependent on the child. The caller waits for the read operation until the child writes to the stream or closes the stream. When the child process writes enough data to fill its redirected stream, it is dependent on the parent. The child process waits for the next write operation until the parent reads from the full stream or closes the stream. The deadlock condition results when the caller and child process wait for each other to complete an operation, and neither can continue. You can avoid deadlocks by evaluating dependencies between the caller and child process.

The last two examples in this section use the `Process.Start` method to launch an executable named *Write500Lines.exe*. The following example contains its source code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Write500Lines/write500lines.cs._

The following example shows how to read from a redirected error stream and wait for the child process to exit. It avoids a deadlock condition by calling `p.StandardError.ReadToEnd` before `p.WaitForExit`. A deadlock condition can result if the parent process calls `p.WaitForExit` before `p.StandardError.ReadToEnd` and the child process writes enough text to fill the redirected stream. The parent process would wait indefinitely for the child process to exit. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardError/stderror-sync.cs._

There is a similar issue when you read all text from both the standard output and standard error streams. The following C# code, for example, performs a read operation on both streams. It avoids the deadlock condition by performing asynchronous read operations on the `Process.StandardError` stream. A deadlock condition results if the parent process calls `p.StandardOutput.ReadToEnd` followed by `p.StandardError.ReadToEnd` and the child process writes enough text to fill its error stream. The parent process would wait indefinitely for the child process to close its `Process.StandardOutput` stream. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-async.cs._

You can use asynchronous read operations to avoid these dependencies and their deadlock potential. Alternately, you can avoid the deadlock condition by creating two threads and reading the output of each stream on a separate thread.

#### Examples
The following example uses the `net use` command together with a user-supplied argument to map a network resource. It then reads the standard error stream of the net command and writes it to console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardError/source.cs._

## ProcessStartInfo.RedirectStandardInput property

```csharp
public bool RedirectStandardInput { get; set; }
```

Gets or sets a value indicating whether the input for an application is read from the `Process.StandardInput` stream.

Returns: `true` if input should be read from `Process.StandardInput`; otherwise, `false`. The default is `false`.

#### Remarks
A `Process` can read input text from its standard input stream, typically the keyboard. By redirecting the `Process.StandardInput` stream, you can programmatically specify the input of a process. For example, instead of using keyboard input, you can provide text from the contents of a designated file or output from another application.

> **Note:**
> You must set `ProcessStartInfo.UseShellExecute` to `false` if you want to set `ProcessStartInfo.RedirectStandardInput` to `true`. Otherwise, writing to the `Process.StandardInput` stream throws an exception.

#### Examples
The following example illustrates how to redirect the `Process.StandardInput` stream of a process. The `sort` command is a console application that reads and sorts text input.

The example starts the `sort` command with redirected input. It then prompts the user for text, and passes the text to the `sort` process through the redirected `Process.StandardInput` stream. The `sort` results are displayed to the user on the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardInput/process_standardinput.cs._
