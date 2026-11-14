---
title: "ProcessStartInfo class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessStartInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessStartInfo class (part 3 of 4)

## ProcessStartInfo.RedirectStandardOutput property

```csharp
public bool RedirectStandardOutput { get; set; }
```

Gets or sets a value that indicates whether the textual output of an application is written to the `Process.StandardOutput` stream.

Returns: `true` if output should be written to `Process.StandardOutput`; otherwise, `false`. The default is `false`.

#### Remarks
When a `Process` writes text to its standard stream, that text is typically displayed on the console. By setting `ProcessStartInfo.RedirectStandardOutput` to `true` to redirect the `Process.StandardOutput` stream, you can manipulate or suppress the output of a process. For example, you can filter the text, format it differently, or write the output to both the console and a designated log file.

> **Note:**
> You must set `ProcessStartInfo.UseShellExecute` to `false` if you want to set `ProcessStartInfo.RedirectStandardOutput` to `true`. Otherwise, reading from the `Process.StandardOutput` stream throws an exception.

The redirected `Process.StandardOutput` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine`, and `StreamReader.ReadToEnd` perform synchronous read operations on the output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardOutput` stream, or closes the stream.

In contrast, `Process.BeginOutputReadLine` starts asynchronous read operations on the `Process.StandardOutput` stream. This method enables a designated event handler (see `OutputDataReceived`) for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

> **Note:**
> The application that is processing the asynchronous output should call the `Process.WaitForExit` method to ensure that the output buffer has been flushed.

Synchronous read operations introduce a dependency between the caller reading from the `Process.StandardOutput` stream and the child process writing to that stream. These dependencies can cause deadlock conditions. When the caller reads from the redirected stream of a child process, it is dependent on the child. The caller waits for the read operation until the child writes to the stream or closes the stream. When the child process writes enough data to fill its redirected stream, it is dependent on the parent. The child process waits for the next write operation until the parent reads from the full stream or closes the stream. The deadlock condition results when the caller and child process wait for each other to complete an operation, and neither can continue. You can avoid deadlocks by evaluating dependencies between the caller and child process.

The last two examples in this section use the `Process.Start` method to launch an executable named *Write500Lines.exe*. The following example contains its source code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Write500Lines/write500lines.cs._

The following example shows how to read from a redirected stream and wait for the child process to exit. The example avoids a deadlock condition by calling `p.StandardOutput.ReadToEnd` before `p.WaitForExit`. A deadlock condition can result if the parent process calls `p.WaitForExit` before `p.StandardOutput.ReadToEnd` and the child process writes enough text to fill the redirected stream. The parent process would wait indefinitely for the child process to exit. The child process would wait indefinitely for the parent to read from the full `Process.StandardOutput` stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-sync.cs._

There is a similar issue when you read all text from both the standard output and standard error streams. The following example performs a read operation on both streams. It avoids the deadlock condition by performing asynchronous read operations on the `Process.StandardError` stream. A deadlock condition results if the parent process calls `p.StandardOutput.ReadToEnd` followed by `p.StandardError.ReadToEnd` and the child process writes enough text to fill its error stream. The parent process would wait indefinitely for the child process to close its `Process.StandardOutput` stream. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-async.cs._

You can use asynchronous read operations to avoid these dependencies and their deadlock potential. Alternately, you can avoid the deadlock condition by creating two threads and reading the output of each stream on a separate thread.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessStartInfo/RedirectStandardOutput/stdstr.cs._

## ProcessStartInfo.StandardErrorEncoding property

```csharp
public System.Text.Encoding? StandardErrorEncoding { get; set; }
```

Gets or sets the preferred encoding for error output.

Returns: An object that represents the preferred encoding for error output. The default is `null`.

#### Remarks
If the value of the `StandardErrorEncoding` property is `null`, the process uses the default standard error encoding for error output. The `StandardErrorEncoding` property must be set before the process is started. Setting this property does not guarantee that the process will use the specified encoding; the process will use only those encodings that it supports. The application should be tested to determine which encodings are supported.

## ProcessStartInfo.StandardErrorHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeFileHandle? StandardErrorHandle { get; set; }
```

Gets or sets a `SafeFileHandle` to use as the standard error of the child process.

Returns: A `SafeFileHandle` to use as the standard error handle of the child process, or `null` to use the default behavior.

The handle doesn't need to be inheritable; the runtime duplicates it as inheritable if needed.

Use `SafeFileHandle.CreateAnonymousPipe` to create a pair of connected pipe handles, `File.OpenHandle` to open a file handle, `File.OpenNullHandle` to discard error output, or `Console.OpenStandardErrorHandle` to inherit the parent's standard error.

When this property is `null` and `RedirectStandardError` is `false`, the process normally inherits the parent's standard error. However, if `StartDetached` is `true` or the process is started with `StartAndForget`, standard error is redirected to the null device instead.

It's recommended to dispose the handle right after starting the process.

When this property is not `null`, `RedirectStandardError` and `UseShellExecute` must both be `false`.

## ProcessStartInfo.StandardInputEncoding property

```csharp
public System.Text.Encoding? StandardInputEncoding { get; set; }
```

Gets or sets the preferred encoding for standard input.

Returns: An object that represents the preferred encoding for standard input. The default is `null`.

#### Remarks
If the value of the `StandardInputEncoding` property is `null`, the process uses the default standard input encoding for the standard input. The `StandardInputEncoding` property must be set before the process is started. Setting this property does not guarantee that the process will use the specified encoding. The application should be tested to determine which encodings the process supports.

## ProcessStartInfo.StandardInputHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeFileHandle? StandardInputHandle { get; set; }
```

Gets or sets a `SafeFileHandle` to use as the standard input of the child process.

Returns: A `SafeFileHandle` to use as the standard input handle of the child process, or `null` to use the default behavior.

The handle doesn't need to be inheritable; the runtime duplicates it as inheritable if needed.

Use `SafeFileHandle.CreateAnonymousPipe` to create a pair of connected pipe handles, `File.OpenHandle` to open a file handle, `File.OpenNullHandle` to provide an empty input, or `Console.OpenStandardInputHandle` to inherit the parent's standard input.

When this property is `null` and `RedirectStandardInput` is `false`, the process normally inherits the parent's standard input. However, if `StartDetached` is `true` or the process is started with `StartAndForget`, standard input is redirected to the null device instead.

It's recommended to dispose the handle right after starting the process.

When this property is not `null`, `RedirectStandardInput` and `UseShellExecute` must both be `false`.

## ProcessStartInfo.StandardOutputEncoding property

```csharp
public System.Text.Encoding? StandardOutputEncoding { get; set; }
```

Gets or sets the preferred encoding for standard output.

Returns: An object that represents the preferred encoding for standard output. The default is `null`.

#### Remarks
If the value of the `StandardOutputEncoding` property is `null`, the process uses the default standard output encoding for the standard output. The `StandardOutputEncoding` property must be set before the process is started. Setting this property does not guarantee that the process will use the specified encoding. The application should be tested to determine which encodings the process supports.

## ProcessStartInfo.StandardOutputHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeFileHandle? StandardOutputHandle { get; set; }
```

Gets or sets a `SafeFileHandle` to use as the standard output of the child process.

Returns: A `SafeFileHandle` to use as the standard output handle of the child process, or `null` to use the default behavior.

The handle doesn't need to be inheritable; the runtime duplicates it as inheritable if needed.

Use `SafeFileHandle.CreateAnonymousPipe` to create a pair of connected pipe handles, `File.OpenHandle` to open a file handle, `File.OpenNullHandle` to discard output, or `Console.OpenStandardOutputHandle` to inherit the parent's standard output.

When this property is `null` and `RedirectStandardOutput` is `false`, the process normally inherits the parent's standard output. However, if `StartDetached` is `true` or the process is started with `StartAndForget`, standard output is redirected to the null device instead.

It's recommended to dispose the handle right after starting the process.

When this property is not `null`, `RedirectStandardOutput` and `UseShellExecute` must both be `false`.

## ProcessStartInfo.StartDetached property

```csharp
public bool StartDetached { get; set; }
```

Gets or sets a value indicating whether the process should be started in a detached manner.

Returns: `true` to start the process detached from the parent; otherwise, `false`. The default is `false`.

Starts a new detached process with standard input, output, and error redirected to the null device (`NUL` on Windows, `/dev/null` on Unix) unless explicitly configured by the user with `RedirectStandardInput`, `RedirectStandardOutput`, `RedirectStandardError`, `StandardInputHandle`, `StandardOutputHandle`, or `StandardErrorHandle`.

On Windows, the process is started with the DETACHED_PROCESS flag.

On Unix, the process is started as a leader of a new session.

This property cannot be used together with `UseShellExecute` set to `true`.

## ProcessStartInfo.StartSuspended property

```csharp
public bool StartSuspended { get; set; }
```

Gets or sets a value indicating whether the process should be started in a suspended state.

Returns: `true` if the process should be started suspended; otherwise, `false`. The default is `false`.

When this property is `true`, the process is created with its main thread suspended. The process doesn't begin execution until `Resume` is called on the process handle, such as the handle returned by `Start`.

On Windows, the process is started with the CREATE_SUSPENDED flag.

On macOS, the process is started with the `POSIX_SPAWN_START_SUSPENDED` flag.

This property cannot be used together with `UseShellExecute` set to `true`.

## ProcessStartInfo.UseCredentialsForNetworkingOnly property

```csharp
public bool UseCredentialsForNetworkingOnly { get; set; }
```

Gets or sets a value that indicates whether the user credentials are only used for network resources.

Returns: `true` if the user credentials are only used for network resources; otherwise, `false`.

This property is referenced if the process is being started by using the user name, password, and domain.

If the value is `true`, the process is started with the caller's identity. The system creates a new logon session with the given credentials, which is used on the network only.

The system does not validate the specified credentials. Therefore, the process can start, but it may not have access to network resources.

## ProcessStartInfo.UserName property

```csharp
public string UserName { get; set; }
```

Gets or sets the user name to use when starting the process. If you use the UPN format,
```csharp
user@DNS_domain_name
```
, the `ProcessStartInfo.Domain` property must be `null`.

Returns: The user name to use when starting the process.

#### Remarks

> **Important:**
> The `WorkingDirectory` property must be set if `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` are provided. If the property is not set, the default working directory is %SYSTEMROOT%\system32.

If the `UserName` property is not `null` or an empty string, the `UseShellExecute` property must be `false`, or an `InvalidOperationException` will be thrown when the `Start` method is called.
