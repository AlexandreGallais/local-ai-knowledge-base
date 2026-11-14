---
title: "Resolve errors and warnings related to compiler options and build configuration (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/invalid-build-command-line.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors and warnings related to compiler options and build configuration (part 2 of 2)

## Conflicting or missing options

- **CS1564**: *Conflicting options specified: Win32 resource file; Win32 manifest*
- **CS1616**: *Option 'option' overrides attribute 'attribute' given in a source file or added module*
- **CS2036**: *The /pdb option requires that the /debug option also be used*
- **CS2044**: */sourcelink switch is only supported when emitting PDB.*
- **CS2045**: */embed switch is only supported when emitting a PDB.*
- **CS8771**: *Output directory could not be determined*

These errors indicate that compiler options contradict each other, override source-level attributes, or require companion options that you didn't specify. For the full list of compiler options, see C# Compiler Options.

- Include the custom Win32 manifest inside the Win32 resource file and remove the **/win32manifest** compiler option (**CS1564**). You can't specify both **Win32Resource** and **Win32Manifest** simultaneously. If you use **/Win32res**, include the manifest in the resource file.
- Remove the conflicting source attribute or the conflicting command-line option so they don't contradict each other (**CS1616**). This warning occurs when assembly attributes like `System.Reflection.AssemblyKeyFileAttribute` or `System.Reflection.AssemblyKeyNameAttribute` in source conflict with the **KeyFile** or **KeyContainer** command-line option.
- Enable **/debug** when you want output at the **PdbFile** path, or remove **/pdb** if you don't need a PDB (**CS2036**). The **/pdb** option selects the PDB path; it doesn't enable PDB generation. Current Roslyn accepts **/pdb** without **/debug**, but doesn't generate a PDB or report CS2036 for that combination. For more information, see **DebugType** (C# Compiler Options).
- Add the **/debug** option (or set `DebugType` in the project) to enable PDB generation when using **/sourcelink** or **/embed** (**CS2044**, **CS2045**). Source links and embedded source both require PDB output because the source information is stored in the PDB file.
- Ensure the project or command line specifies a valid output directory (**CS8771**). Verify the `OutputPath` or `OutDir` property in your project file, or pass a valid `/out:` argument to the compiler.

## Module and assembly configuration

- **CS3012**: *You must specify the CLSCompliant attribute on the assembly, not the module, to enable CLS compliance checking*
- **CS3013**: *Added modules must be marked with the CLSCompliant attribute to match the assembly*

These warnings involve mismatches between the CLSCompliant attribute on modules and assemblies. For more information on the CLS, see Language independence and language-independent components.

- Put `[assembly:System.CLSCompliant(true)]` on the assembly to enable CLS compliance checking, rather than specifying only `[module:System.CLSCompliant(true)]` (**CS3012**). A module-level declaration alone doesn't enable checking for the assembly.
- When building a CLS-compliant assembly, rebuild each unmarked module added via **AddModule** with `[assembly:System.CLSCompliant(true)]` in its source (**CS3013**). This declaration is preserved when the source is compiled as a netmodule. Marking only the consuming assembly doesn't mark the modules it includes.

## Public signing and reference assembly output

- **CS8202**: *Public signing is not supported for netmodules.*
- **CS8308**: *Do not use refout when using refonly.*
- **CS8309**: *Cannot compile net modules when using /refout or /refonly.*

A netmodule contains metadata and compiled code but no assembly manifest. Because public signing applies a public key and signed flag to an assembly manifest, don't combine **PublicSign** with the `module` **OutputType** (**CS8202**). Produce an assembly, or disable public signing for the netmodule.

The `/refout` option produces a reference assembly in addition to the implementation assembly. The `/refonly` option produces only a reference assembly as the primary output. Remove `/refout` when using `/refonly` (**CS8308**). Reference assemblies require an assembly manifest, so don't combine either option with `/target:module` (**CS8309**). For MSBuild projects, use **ProduceReferenceAssembly** or **ProduceOnlyReferenceAssembly**, but not both.

## Deterministic assembly versions

- **CS8357**: *The specified version string 'version string' contains wildcards, which are not compatible with determinism. Either remove wildcards from the version string, or disable determinism for this compilation*

Deterministic compilation requires the same inputs to produce the same output. A wildcard in `System.Reflection.AssemblyVersionAttribute` derives part of the version from changing values, so it isn't compatible with **Deterministic** compilation. Replace the wildcard with fixed numeric components. Disable deterministic compilation only when a generated wildcard version is required.

## Compiler infrastructure errors

- **CS0007**: *Unexpected common language runtime initialization error — 'description'*
- **CS7038**: *Failed to emit module 'module': error*
- **CS8751**: *Internal error in the C# compiler.*

These errors indicate failures in the compiler's own infrastructure rather than problems with your source code or command-line options.

- Verify that the runtime version specified in *csc.exe.config* is installed and not corrupted (**CS0007**). The setup process configures this file and you shouldn't change it. If you modified the file, check that the specified runtime version is present on the machine. If the correct version is present but might be corrupted, reinstall the common language runtime. Newer versions of the compiler no longer generate this error and it doesn't apply to the modern `dotnet build` toolchain.
- Try a clean rebuild, verify all assembly references are valid and not corrupted, and check for conflicting reference versions (**CS7038**). This error wraps a lower-level failure during the assembly emit phase. The nested error message provides more specific details about what went wrong.
- File an issue in the Roslyn repository with a minimal reproduction (**CS8751**). This error indicates a bug in the compiler itself. Your code exposed a code path the compiler team didn't anticipate.

## Validate configuration and response files

- **CS2011**: *Error opening response file 'file'*
- **CS7089**: *AppConfigPath must be absolute.*
- **CS7093**: *Cannot read config file 'file' -- 'reason'*
- **CS8035**: *Error reading ruleset file path - reason*

Correct the path to the response file passed as `@file.rsp`, and ensure the file exists and is readable by the process that runs the compiler (**CS2011**). A response file contains compiler arguments; supply its path after `@` rather than treating it as a source file. Quote a path containing spaces, for example `@"C:\build settings\options.rsp"`.

Use an absolute application-configuration path when a compiler integration requires `AppConfigPath` (**CS7089**). This diagnostic remains defined in the compiler, but current command-line parsing resolves relative `/appconfig` paths against the compiler's base directory rather than reporting CS7089. A relative command-line path alone isn't a reproduction of this diagnostic.

Check the file and reason named in **CS7093**, and correct the **ApplicationConfiguration** input supplied through `/appconfig`. Ensure the file exists, is readable, and contains valid application-configuration XML. For example, `/appconfig:missing.config` produces CS7093 when that file doesn't exist; point the option to an existing, valid configuration file instead. A file that opens successfully can still produce this error if its XML can't be read.

Correct the **CodeAnalysisRuleSet** path supplied through `/ruleset`, and use the reason in **CS8035** to fix missing or invalid ruleset files. The file must contain valid ruleset XML, not an EditorConfig file renamed to `.ruleset`. If the reason identifies an invalid included ruleset, correct that file too. Relative `<Include Path="...">` values are resolved against the directory containing the including ruleset.

## Correct unrecognized or ignored switches

- **CS2007**: *Unrecognized option: 'option'*
- **CS2023**: *Ignoring /noconfig option because it was specified in a response file*
- **CS8001**: *The command line switch 'switch' is not yet implemented and was ignored.*

Remove an unrecognized option, or use the documented spelling and argument from C# compiler options (**CS2007**). For example, the following source produces CS2007 when you compile it with `/recur`:

```csharp
// Compile with: csc /recur Example.cs
class Example
{
    public static void Main() { }
}
```

To include source files recursively, use `/recurse:*.cs`, or remove `/recur` and pass the source file directly.

Move `/noconfig` out of the response file and onto the compiler command line (**CS2023**). The option controls whether the compiler uses its default response file, so you must supply it on the command line rather than inside a response file. For example, remove `/noconfig` from `options.rsp` and invoke `csc /noconfig @options.rsp Example.cs` instead. You can't suppress this warning by using the NoWarn option.

Remove a recognized but unimplemented switch, such as `/bugreport`, from the command line or response file (**CS8001**). Unlike CS2007, this warning means the compiler recognizes the switch but ignores it; the requested behavior doesn't occur. Removing it doesn't remove an active compiler feature. To report a compiler problem, collect a minimal reproduction and file an issue in the Roslyn repository instead.
