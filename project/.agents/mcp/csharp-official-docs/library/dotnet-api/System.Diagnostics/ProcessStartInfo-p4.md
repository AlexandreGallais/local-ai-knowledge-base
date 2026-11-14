---
title: "ProcessStartInfo class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessStartInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessStartInfo class (part 4 of 4)

## ProcessStartInfo.UseShellExecute property

```csharp
public bool UseShellExecute { get; set; }
```

Gets or sets a value indicating whether to use the operating system shell to start the process.

Returns: `true` if the shell should be used when starting the process; `false` if the process should be created directly from the executable file. The default is `false` (or `true` on .NET Framework apps).

Exceptions:

- `PlatformNotSupportedException`: An attempt to set the value to `true` on Universal Windows Platform (UWP) apps occurs.

The `ProcessStartInfo` class specifies a set of values that are used when you start a process.

Setting the `UseShellExecute` property to `false` enables you to redirect input, output, and error streams.

The word "shell" in this context (`UseShellExecute`) refers to a graphical shell (similar to the Windows shell) rather than command shells (for example, `bash` or `sh`) and lets users launch graphical applications or open documents.

> **Note:**
> `UseShellExecute` must be `false` if the `UserName` property is not `null` or an empty string, or an `InvalidOperationException` will be thrown when the `Start` method is called.

When you use the operating system shell to start processes, you can start any document (which is any registered file type associated with an executable that has a default open action) and perform operations on the file, such as printing, by using the `Process` object. When `UseShellExecute` is `false`, you can start only executables by using the `Process` object.

> **Note:**
> `UseShellExecute` must be `true` if you set the `ErrorDialog` property to `true`.

#### WorkingDirectory

The `WorkingDirectory` property behaves differently depending on the value of the `UseShellExecute` property. When `UseShellExecute` is `true`, the `WorkingDirectory` property specifies the location of the executable. If `WorkingDirectory` is an empty string, it's assumed that the current directory contains the executable.

When `UseShellExecute` is `false`, the `WorkingDirectory` property is not used to find the executable. Instead, it is used only by the process that is started and has meaning only within the context of the new process. When `UseShellExecute` is `false`, the `FileName` property can be either a fully qualified path to the executable, or a simple executable name that the system will attempt to find within folders specified by the `PATH` environment variable. The interpretation of the search path depends on the operating system. For more information, enter `HELP PATH` or `man sh` at a command prompt.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessStartInfo/RedirectStandardOutput/stdstr.cs._

## ProcessStartInfo.Verb property

```csharp
public string Verb { get; set; }
```

Gets or sets the verb to use when opening the application or document specified by the `ProcessStartInfo.FileName` property.

Returns: The action to take with the file that the process opens. The default is an empty string (""), which signifies no action.

#### Remarks

Each file name extension has its own set of verbs, which can be obtained by using the `Verbs` property. For example, the "`print`" verb prints a document specified by using `ProcessStartInfo.FileName`. The default verb can be specified by using an empty string (""). Examples of verbs are "Edit", "Open", "OpenAsReadOnly", "Print", and "Printto". You should use only verbs that appear in the set of verbs returned by the `Verbs` property.

When you use the `Verb` property, you must include the file name extension when you set the value of the `FileName` property. The file name does not need to have an extension if you manually enter a value for the `Verb` property.

#### Examples

The following code example starts a new process by using the specified verb and file name. This code example is part of a larger example provided for the `Verbs` property.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessStartInfo/Verb/source.cs._

## ProcessStartInfo.Verbs property

```csharp
public string[] Verbs { get; }
```

Gets the set of verbs associated with the type of file specified by the `ProcessStartInfo.FileName` property.

Returns: The actions that the system can apply to the file indicated by the `ProcessStartInfo.FileName` property.

#### Remarks
The `Verbs` property enables you to determine the verbs that can be used with the file specified by the `FileName` property. You can set the `Verb` property to the value of any verb in the set. Examples of verbs are "Edit", "Open", "OpenAsReadOnly", "Print", and "Printto".

Be aware that the resulting list of verbs may not contain all possible values, e.g. "New" is by design not added to the list and other possible verbs are not always detected depending on your system setup.

When you use the `Verbs` property, you must include the file name extension when you set the value of the `FileName` property. The file name extension determines the set of possible verbs.

#### Examples
The following code example displays the defined verbs for the chosen file name. If the user selects one of the defined verbs, the example starts a new process using the selected verb and the input file name.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessStartInfo/Verb/source.cs._

## ProcessStartInfo.WindowStyle property

```csharp
public System.Diagnostics.ProcessWindowStyle WindowStyle { get; set; }
```

Gets or sets the window state to use when the process is started.

Returns: One of the enumeration values that indicates whether the process is started in a window that is maximized, minimized, normal (neither maximized nor minimized), or not visible. The default is `Normal`.

Exceptions:

- `InvalidEnumArgumentException`: The window style is not one of the `ProcessWindowStyle` enumeration members.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

## ProcessStartInfo.WorkingDirectory property

```csharp
public string WorkingDirectory { get; set; }
```

When the `ProcessStartInfo.UseShellExecute` property is `false`, gets or sets the working directory for the process to be started. When `ProcessStartInfo.UseShellExecute` is `true`, gets or sets the directory that contains the process to be started.

Returns: When `ProcessStartInfo.UseShellExecute` is `true`, the fully qualified name of the directory that contains the process to be started. When the `ProcessStartInfo.UseShellExecute` property is `false`, the working directory for the process to be started. The default is an empty string ("").

#### Remarks

> **Important:**
> The `WorkingDirectory` property must be set if `ProcessStartInfo.UserName` and `ProcessStartInfo.Password` are provided. If the property is not set, the default working directory is %SYSTEMROOT%\system32.

If the directory is already part of the system path variable, you do not have to repeat the directory's location in this property.

The `WorkingDirectory` property behaves differently when `ProcessStartInfo.UseShellExecute` is `true` than when `ProcessStartInfo.UseShellExecute` is `false`. When `ProcessStartInfo.UseShellExecute` is `true`, the `WorkingDirectory` property specifies the location of the executable. If `ProcessStartInfo.WorkingDirectory` is an empty string, the current directory is understood to contain the executable.

> **Note:**
> When `ProcessStartInfo.UseShellExecute` is `true`, the working directory of the application that starts the executable is also the working directory of the executable.

When `ProcessStartInfo.UseShellExecute` is `false`, the `WorkingDirectory` property is not used to find the executable. Instead, its value applies to the process that is started and only has meaning within the context of the new process.
