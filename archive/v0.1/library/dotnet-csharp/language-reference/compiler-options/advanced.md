---
title: "Compiler Options - advanced scenarios (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-options/advanced.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Advanced C# compiler options

The following options support advanced scenarios. The new MSBuild syntax is shown in **Bold**. The older `csc.exe` syntax is shown in `code style`.

- **StartupObject** / `-main`: Specify the type that contains the entry point.
- **PdbFile** / `-pdb`: Specify debug information file name.
- **PathMap** / `-pathmap`: Specify a mapping for source path names output by the compiler.
- **ApplicationConfiguration** / `-appconfig`: Specify an application configuration file containing assembly binding settings.
- **AdditionalLibPaths** / `-lib`: Specify additional directories to search in for references.
- **GenerateFullPaths** / `-fullpath`: Compiler generates fully qualified paths.
- **PreferredUILang** / `-preferreduilang`: Specify the preferred output language name.
- **BaseAddress** / `-baseaddress`: Specify the base address for the library to be built.
- **ChecksumAlgorithm** / `-checksumalgorithm` : Specify algorithm for calculating source file checksum stored in PDB.
- **CodePage** / `-codepage`: Specify the codepage to use when opening source files.
- **Utf8Output** / `-utf8output`: Output compiler messages in UTF-8 encoding.
- **FileAlignment** / `-filealign`: Specify the alignment used for output file sections.
- **ErrorEndLocation** / `-errorendlocation`: Output line and column of the end location of each error.
- **NoStandardLib** / `-nostdlib`: Don't reference standard library. (Prevents automatic reference to the .NET Base Class Library - *mscorlib.dll* in .NET Framework projects, *System.Private.CoreLib.dll* in modern .NET projects.)
- **SubsystemVersion** / `-subsystemversion`: Specify subsystem version of this assembly.
- **ModuleAssemblyName** / `-moduleassemblyname`: Name of the assembly that this module will be a part of.
- **ReportIVTs** / `-reportivts`: Produce additional information on `System.Runtime.CompilerServices.InternalsVisibleToAttribute` information.

You add any of these options in a `<PropertyGroup>` element in your `*.csproj` file:

```xml
<PropertyGroup>
    <StartupObject>...</StartupObject>
    ...
</PropertyGroup>
``````

## StartupObject

This option specifies the class that contains the entry point to the program when your project includes more than one type with a `Main` method. When there's exactly one acceptable `Main` method in the project, this option is ignored.

```xml
<StartupObject>MyNamespace.Program</StartupObject>
```

Where `Program` is the type that contains the `Main` method. When this option is required (multiple `Main` methods exist), the provided class name must be fully qualified; it must include the full namespace containing the class, followed by the class name. For example, when the `Main` method is located inside the `Program` class in the `MyApplication.Core` namespace, the compiler option has to be `-main:MyApplication.Core.Program`. If the class is in the global namespace, the fully qualified name is the same as the simple class name (for example, `Program` instead of `MyNamespace.Program`).

> **Note:**
> This option can't be used for a project that includes top-level statements, even if that project contains one or more `Main` methods.

## PdbFile

The **PdbFile** compiler option specifies the name and location of the debug symbols file.  The `filename` value specifies the name and location of the debug symbols file.

```xml
<PdbFile>filename</PdbFile>
```

When you specify **DebugType**, the compiler creates a *.pdb* file in the same directory where the compiler creates the output file (.exe or .dll). The *.pdb* file has the same base file name as the name of the output file. **PdbFile** allows you to specify a nondefault file name and location for the .pdb file. This compiler option can't be set in the Visual Studio development environment, nor can it be changed programmatically.

## PathMap

> **Note:**
>
> Specifying **PathMap** prevents breakpoints from working in local debug builds. Only set **PathMap** for production or continuous integration builds.

The **PathMap** compiler option specifies how to map physical paths to source path names output by the compiler. This option maps each physical path on the machine where the compiler runs to a corresponding path that should be written in the output files. In the following example, `path1` is the full path to the source files in the current environment, and `sourcePath1` is the source path substituted for `path1` in any output files. To specify multiple mapped source paths, separate each with a comma.

```xml
<PathMap>path1=sourcePath1,path2=sourcePath2</PathMap>
```

The compiler writes the source path into its output for the following reasons:

1. The source path is substituted for an argument when the `System.Runtime.CompilerServices.CallerFilePathAttribute` is applied to an optional parameter.
1. The source path is embedded in a PDB file.
1. The path of the PDB file is embedded into a PE (portable executable) file.

## ApplicationConfiguration

The **ApplicationConfiguration** compiler option enables a C# application to specify the location of an assembly's application configuration (app.config) file to the common language runtime (CLR) at assembly binding time.

```xml
<ApplicationConfiguration>file</ApplicationConfiguration>
```

Where `file` is the application configuration file that contains assembly binding settings. One use of **ApplicationConfiguration** is advanced scenarios in which an assembly has to reference both the .NET Framework version and the .NET Framework for Silverlight version of a particular reference assembly at the same time. For example, a XAML designer written in Windows Presentation Foundation (WPF) might have to reference both the WPF Desktop, for the designer's user interface, and the subset of WPF that is included with Silverlight. The same designer assembly has to access both assemblies. By default, the separate references cause a compiler error, because assembly binding sees the two assemblies as equivalent. The **ApplicationConfiguration** compiler option enables you to specify the location of an app.config file that disables the default behavior by using a `<supportPortability>` tag, as shown in the following example.

```xml
<supportPortability PKT="7cec85d7bea7798e" enable="false"/>
```

The compiler passes the location of the file to the CLR's assembly-binding logic.

> **Note:**
> To use the app.config file that is already set in the project, add property tag `<UseAppConfigForCompiler>` to the *.csproj* file and set its value to `true`. To specify a different app.config file, add property tag `<AppConfigForCompiler>` and set its value to the location of the file.

The following example shows an app.config file that enables an application to have references to both the .NET Framework implementation and the .NET Framework for Silverlight implementation of any .NET Framework assembly that exists in both implementations. The **ApplicationConfiguration** compiler option specifies the location of this app.config file.

```xml
<configuration>
  <runtime>
    <assemblyBinding>
      <supportPortability PKT="7cec85d7bea7798e" enable="false"/>
      <supportPortability PKT="31bf3856ad364e35" enable="false"/>
    </assemblyBinding>
  </runtime>
</configuration>
```

## AdditionalLibPaths

The **AdditionalLibPaths** option specifies the location of assemblies referenced with the **References** option.

```xml
<AdditionalLibPaths>dir1[,dir2]</AdditionalLibPaths>
```

Where `dir1` is a directory for the compiler to look in if a referenced assembly isn't found in the current working directory (the directory from which you're invoking the compiler) or in the common language runtime's system directory. `dir2` is one or more additional directories to search in for assembly references. Separate directory names with a comma, and without white space between them. The compiler searches for assembly references that aren't fully qualified in the following order:

1. Current working directory.
1. The common language runtime system directory.
1. Directories specified by **AdditionalLibPaths**.
1. Directories specified by the LIB environment variable.

Use **Reference** to specify an assembly reference. **AdditionalLibPaths** is additive. Specifying it more than once appends to any prior values. Since the path to the dependent assembly isn't specified in the assembly manifest, the application will find and use the assembly in the global assembly cache. The compiler referencing the assembly doesn't imply the common language runtime can find and load the assembly at run time. See How the Runtime Locates Assemblies for details on how the runtime searches for referenced assemblies.

## GenerateFullPaths

The **GenerateFullPaths** option causes the compiler to specify the full path to the file when listing compilation errors and warnings.

```xml
<GenerateFullPaths>true</GenerateFullPaths>
```

By default, errors and warnings that result from compilation specify the name of the file in which an error was found. The **GenerateFullPaths** option causes the compiler to specify the full path to the file. This compiler option is unavailable in Visual Studio and can't be changed programmatically.

## PreferredUILang

By using the **PreferredUILang** compiler option, you can specify the language in which the C# compiler displays output, such as error messages.

```xml
<PreferredUILang>language</PreferredUILang>
```

Where `language` is the language name of the language to use for compiler output. You can use the **PreferredUILang** compiler option to specify the language that you want the C# compiler to use for error messages and other command-line output. If the language pack for the language isn't installed, the language setting of the operating system is used instead.

## BaseAddress

The **BaseAddress** option lets you specify the preferred base address at which to load a DLL. For more information about when and why to use this option, see Larry Osterman's WebLog.

```xml
<BaseAddress>address</BaseAddress>
```

Where `address` is the base address for the DLL. This address can be specified as a decimal, hexadecimal, or octal number. The default base address for a DLL is set by the .NET common language runtime. The lower-order word in this address will be rounded. For example, if you specify `0x11110001`, it is rounded to `0x11110000`. To complete the signing process for a DLL, use SN.EXE with the -R option.

## ChecksumAlgorithm

This option controls the checksum algorithm we use to encode source files in the PDB.

```xml
<ChecksumAlgorithm>algorithm</ChecksumAlgorithm>
```

The `algorithm` must be either `SHA1` (default) or `SHA256`.

## CodePage

This option specifies which codepage to use during compilation if the required page isn't the current default codepage for the system.

```xml
<CodePage>id</CodePage>
```

Where `id` is the ID of the code page to use for all source code files in the compilation. The compiler first attempts to interpret all source files as UTF-8. If your source code files are in an encoding other than UTF-8 and use characters other than 7-bit ASCII characters, use the **CodePage** option to specify which code page should be used. **CodePage** applies to all source code files in your compilation. See GetCPInfo for information on how to find which code pages are supported on your system.

## Utf8Output

The **Utf8Output** option displays compiler output using UTF-8 encoding.

```xml
<Utf8Output>true</Utf8Output>
```

In some international configurations, compiler output can't correctly be displayed in the console. Use **Utf8Output** and redirect compiler output to a file.

## FileAlignment

The **FileAlignment** option lets you specify the size of sections in your output file. Valid values are 512, 1024, 2048, 4096, and 8192. These values are in bytes.

```xml
<FileAlignment>number</FileAlignment>
```

You set the **FileAlignment** option from the **Advanced** page of the **Build** properties for your project in Visual Studio. Each section is aligned on a boundary that is a multiple of the **FileAlignment** value. There's no fixed default. If **FileAlignment** isn't specified, the common language runtime picks a default at compile time. By specifying the section size, you affect the size of the output file. Modifying section size may be useful for programs that run on smaller devices. Use DUMPBIN to see information about sections in your output file.

## ErrorEndLocation

Instructs the compiler to output line and column of the end location of each error.

```xml
<ErrorEndLocation>true</ErrorEndLocation>
```

By default, the compiler writes the starting location in source for all errors and warnings. When this option is set to true, the compiler writes both the starting and end location for each error and warning.

## NoStandardLib

**NoStandardLib** prevents the automatic reference to the .NET Base Class Library. In .NET Framework projects, this refers to *mscorlib.dll*, while in modern .NET projects, this refers to *System.Private.CoreLib.dll*. Both assemblies define the entire System namespace.

```xml
<NoStandardLib>true</NoStandardLib>
```

Use this option if you want to define or create your own System namespace and objects. If you don't specify **NoStandardLib**, the appropriate base class library is automatically referenced (same as specifying `<NoStandardLib>false</NoStandardLib>`).
