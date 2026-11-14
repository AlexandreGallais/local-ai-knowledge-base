---
title: "Process class (part 6 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 6 of 15)

## Process.StandardOutput property

```csharp
public System.IO.StreamReader StandardOutput { get; }
```

Gets a stream used to read the textual output of the application.

Returns: A `StreamReader` that can be used to read the standard output stream of the application.

Exceptions:

- `InvalidOperationException`: The `Process.StandardOutput` stream has not been defined for redirection; ensure `ProcessStartInfo.RedirectStandardOutput` is set to `true` and `ProcessStartInfo.UseShellExecute` is set to `false`.

-or-

The `Process.StandardOutput` stream has been opened for asynchronous read operations with `Process.BeginOutputReadLine`.

#### Remarks
When a `Process` writes text to its standard stream, that text is normally displayed on the console. By redirecting the `Process.StandardOutput` stream, you can manipulate or suppress the output of a process. For example, you can filter the text, format it differently, or write the output to both the console and a designated log file.

> **Note:**
> To use `Process.StandardOutput`, you must set `ProcessStartInfo.UseShellExecute` to `false`, and you must set `ProcessStartInfo.RedirectStandardOutput` to `true`. Otherwise, reading from the `Process.StandardOutput` stream throws an exception.

The redirected `Process.StandardOutput` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine`, and `StreamReader.ReadToEnd` perform synchronous read operations on the output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardOutput` stream, or closes the stream.

In contrast, `Process.BeginOutputReadLine` starts asynchronous read operations on the `Process.StandardOutput` stream. This method enables a designated event handler for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

Synchronous read operations introduce a dependency between the caller reading from the `Process.StandardOutput` stream and the child process writing to that stream. These dependencies can result in deadlock conditions. When the caller reads from the redirected stream of a child process, it is dependent on the child. The caller waits on the read operation until the child writes to the stream or closes the stream. When the child process writes enough data to fill its redirected stream, it is dependent on the parent. The child process waits on the next write operation until the parent reads from the full stream or closes the stream. The deadlock condition results when the caller and child process wait on each other to complete an operation, and neither can proceed. You can avoid deadlocks by evaluating dependencies between the caller and child process.

The last two examples in this section use the `Process.Start` method to launch an executable named *Write500Lines.exe*. The following example contains its source code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Write500Lines/write500lines.cs._

The following example shows how to read from a redirected stream and wait for the child process to exit. The example avoids a deadlock condition by calling `p.StandardOutput.ReadToEnd` before `p.WaitForExit`. A deadlock condition can result if the parent process calls `p.WaitForExit` before `p.StandardOutput.ReadToEnd` and the child process writes enough text to fill the redirected stream. The parent process would wait indefinitely for the child process to exit. The child process would wait indefinitely for the parent to read from the full `Process.StandardOutput` stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-sync.cs._

There is a similar issue when you read all text from both the standard output and standard error streams. The following example performs a read operation on both streams. It avoids the deadlock condition by performing asynchronous read operations on the `Process.StandardError` stream. A deadlock condition results if the parent process calls `p.StandardOutput.ReadToEnd` followed by `p.StandardError.ReadToEnd` and the child process writes enough text to fill its error stream. The parent process would wait indefinitely for the child process to close its `Process.StandardOutput` stream. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-async.cs._

You can use asynchronous read operations to avoid these dependencies and their deadlock potential. Alternately, you can avoid the deadlock condition by creating two threads and reading the output of each stream on a separate thread.

> **Note:**
> You cannot mix asynchronous and synchronous read operations on a redirected stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. For example, do not follow `Process.BeginOutputReadLine` with a call to `StreamReader.ReadLine` on the `Process.StandardOutput` stream, or vice versa. However, you can read two different streams in different modes. For example, you can call `Process.BeginOutputReadLine` and then call `StreamReader.ReadLine` for the `Process.StandardError` stream.

#### Examples
The following example runs the ipconfig.exe command and redirects its standard output to the example's console window.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/process_standardoutput.cs._

## Process.StartInfo property

```csharp
public System.Diagnostics.ProcessStartInfo StartInfo { get; set; }
```

Gets or sets the properties to pass to the `Process.Start` method of the `Process`.

Returns: The `ProcessStartInfo` that represents the data with which to start the process. These arguments include the name of the executable file or document used to start the process.

Exceptions:

- `ArgumentNullException`: The value that specifies the `Process.StartInfo` is `null`.
- `InvalidOperationException`: The `Process.Start` method was not used to start the process.

#### Remarks
`Process.StartInfo` represents the set of parameters to use to start a process. When `Process.Start` is called, the `Process.StartInfo` is used to specify the process to start. The only necessary `Process.StartInfo` member to set is the `FileName` property. Starting a process by specifying the `FileName` property is similar to typing the information in the **Run** dialog box of the Windows **Start** menu. Therefore, the `FileName` property does not need to represent an executable file. It can be of any file type for which the extension has been associated with an application installed on the system. For example the `ProcessStartInfo.FileName` can have a .txt extension if you have associated text files with an editor, such as Notepad, or it can have a .doc if you have associated .doc files with a word processing tool, such as Microsoft Word. Similarly, in the same way that the **Run** dialog box can accept an executable file name with or without the .exe extension, the .exe extension is optional in the `ProcessStartInfo.FileName` member. For example, you can set the `FileName` property to either "Notepad.exe" or "Notepad".

You can start a ClickOnce application by setting the `FileName` property to the location (for example, a Web address) from which you originally installed the application. Do not start a ClickOnce application by specifying its installed location on your hard drive.

If the file name involves a nonexecutable file, such as a .doc file, you can include a verb specifying what action to take on the file. For example, you could set the `ProcessStartInfo.Verb` to "Print" for a file ending in the .doc extension. The file name specified in the `FileName` property does not need to have an extension if you manually enter a value for the `Verb` property. However, if you use the `Verbs` property to determine what verbs are available, you must include the extension.

You can change the parameters specified in the `StartInfo` property up to the time that you call the `Process.Start` method on the process. After you start the process, changing the `Process.StartInfo` values does not affect or restart the associated process. If you call the `Start` method with the `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` properties set, the unmanaged `CreateProcessWithLogonW` function is called, which starts the process in a new window even if the `CreateNoWindow` property value is `true` or the `WindowStyle` property value is `Hidden`.

You should only access the `StartInfo` property on a `Process` object returned by the `Process.Start` method. For example, you should not access the `StartInfo` property on a `Process` object returned by `Process.GetProcesses`. Otherwise, the `StartInfo` property will throw an `InvalidOperationException`.

When the process is started, the file name is the file that populates the (read-only) `MainModule` property. If you want to retrieve the executable file that is associated with the process after the process has started, use the `MainModule` property. If you want to set the executable file of a `Process` instance for which an associated process has not been started, use the `StartInfo` property's `ProcessStartInfo.FileName` member. Because the members of the `StartInfo` property are arguments that are passed to the `Process.Start` method of a process, changing the `FileName` property after the associated process has started will not reset the `MainModule` property. These properties are used only to initialize the associated process.

#### Examples
The following example populates a `Process.StartInfo` with the file to execute, the action performed on it and whether it should displays a user interface. For additional examples, refer to the reference pages for properties of the `ProcessStartInfo` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstart.cs._

## Process.StartTime property

```csharp
public DateTime StartTime { get; }
```

Gets the time that the associated process was started.

Returns: A `DateTime` that indicates when the associated process was started.

Exceptions:

- `NotSupportedException`: You are attempting to access the `Process.StartTime` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: No process is associated with this object; on Windows, there is no process handle available; or on Unix, the value was not cached and is unavailable after the process exited.
- `Win32Exception`: An error occurred in the call to the Windows function.

On Windows, if a handle to the process is available, this property can be read after the process has exited.
On Unix, this property caches its value on first access. A cached value can be read after the process has exited, but accessing an uncached value after the process has exited can throw `InvalidOperationException` when the value is unavailable.

## Process.SynchronizingObject property

```csharp
public System.ComponentModel.ISynchronizeInvoke? SynchronizingObject { get; set; }
```

Gets or sets the object used to marshal the event handler calls that are issued as a result of a process exit event.

Returns: The `ISynchronizeInvoke` used to marshal event handler calls that are issued as a result of an `Process.Exited` event on the process.

#### Remarks
When `EventLog.SynchronizingObject` is `null`, methods that handle the `Exited` event are called on a thread from the system thread pool. For more information about system thread pools, see `ThreadPool`.

When the `Exited` event is handled by a visual Windows Forms component, such as a `Button`, accessing the component through the system thread pool might not work, or might result in an exception. Avoid this by setting `Process.SynchronizingObject` to a Windows Forms component, which causes the methods handling the `Exited` event to be called on the same thread on which the component was created.

If the `Process` is used inside Visual Studio 2005 in a Windows Forms designer, `Process.SynchronizingObject` is automatically set to the control that contains the `Process`. For example, if you place a `Process` on a designer for `Form1` (which inherits from `Form`) the `SynchronizingObject` property of `Process` is set to the instance of `Form1`:

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/SynchronizingObject/remarks.cs._

Typically, this property is set when the component is placed inside a control or form, because those components are bound to a specific thread.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/SynchronizingObject/process_synchronizingobject.cs._

## Process.Threads property

```csharp
public System.Diagnostics.ProcessThreadCollection Threads { get; }
```

Gets the set of threads that are running in the associated process.

Returns: An array of type `ProcessThread` representing the operating system threads currently running in the associated process.

Exceptions:

- `SystemException`: The process does not have an `Process.Id`, or no process is associated with the `Process` instance.

-or-

The associated process has exited.

#### Remarks
The value returned by this property represents the most recently refreshed threads. To get the most up to date information, you need to call `Refresh` method first.

A thread executes code in a process. Each process is started with a single thread, its primary thread. Any thread can create additional threads. Threads within a process share the address space of the process.

Use `ProcessThread` to get all the threads associated with the current process. The primary thread is not necessarily at index zero in the array.
