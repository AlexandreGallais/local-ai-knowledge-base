---
title: "ProcessModule class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessModule.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessModule class

Namespace: `System.Diagnostics`

```csharp
public class ProcessModule : System.ComponentModel.Component
```

Represents a .dll or .exe file that is loaded into a particular process.

#### Remarks
A module is an executable file or a dynamic link library (DLL). Each process consists of one or more modules. You can use this class to get information about the module.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The following code sample demonstrates how to use the `ProcessModule` class to get and display information about all the modules that are used by the Notepad.exe application.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/Overview/processmodule.cs._

## ProcessModule.BaseAddress property

```csharp
public IntPtr BaseAddress { get; }
```

Gets the memory address where the module was loaded.

Returns: The load address of the module.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ModuleName` and  `ProcessModule.BaseAddress` properties are used to display the module name and the memory address where each module was loaded.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/BaseAddress/processmodule_baseaddress.cs._

## ProcessModule.EntryPointAddress property

```csharp
public IntPtr EntryPointAddress { get; }
```

Gets the memory address for the function that runs when the system loads and runs the module.

Returns: The entry point of the module.

#### Remarks
The module's entry point is the location of the function that is called during process startup, thread startup, process shutdown, and thread shutdown. While the entry point is not the address of the DllMain function, it should be close enough for most purposes.

> **Note:**
> Due to changes in the way that Windows loads assemblies, `ProcessModule.EntryPointAddress` will always return 0 on Windows 8 or Windows 8.1 and should not be relied on for those platforms.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ModuleName` and `ProcessModule.EntryPointAddress` properties are used to display the name and the entry point address for each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/EntryPointAddress/processmodule_entrypoint.cs._

## ProcessModule.FileName property

```csharp
public string FileName { get; }
```

Gets the full path to the module.

Returns: The fully qualified path that defines the location of the module.

#### Remarks
If the file name is longer than the maximum number of characters allowed, the file name is truncated.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ModuleName` and `ProcessModule.FileName` properties are used to display the module name and the full path information for each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/FileName/processmodule_filename.cs._

## ProcessModule.FileVersionInfo property

```csharp
public System.Diagnostics.FileVersionInfo FileVersionInfo { get; }
```

Gets version information about the module.

Returns: A `FileVersionInfo` that contains the module's version information.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ModuleName` and `ProcessModule.FileVersionInfo` properties are used to display the module name and the file version information for each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/FileVersionInfo/processmodule_fileversioninfo.cs._

## ProcessModule.ModuleMemorySize property

```csharp
public int ModuleMemorySize { get; }
```

Gets the amount of memory that is required to load the module.

Returns: The size, in bytes, of the memory that the module occupies.

#### Remarks
`ProcessModule.ModuleMemorySize` does not include any additional memory allocations that the module makes once it is running; it includes only the size of the static code and data in the module file.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ModuleName` and `ProcessModule.ModuleMemorySize` properties are used to display the module name and the amount of memory needed for each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/ModuleMemorySize/processmodule_modulememorysize.cs._

## ProcessModule.ModuleName property

```csharp
public string ModuleName { get; }
```

Gets the name of the process module.

Returns: The name of the module.

#### Remarks
If the name is longer than the maximum number of characters allowed, it is truncated.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ModuleName` property is used to display the name of each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/ModuleName/processmodule_modulename.cs._

## ProcessModule.ToString() method

```csharp
public override string ToString ();
```

Converts the name of the module to a string.

Returns: The value of the `ProcessModule.ModuleName` property.

#### Examples
The following code example creates a new process for the Notepad.exe application. The code iterates through the `ProcessModuleCollection` class to obtain a `ProcessModule` object for each module in the collection. The `ProcessModule.ToString` method is used to display the name for each module.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessModule/ToString/processmodule_tostring.cs._
