---
title: "Resolve errors and warnings related to compiler options and build configuration (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/invalid-build-command-line.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings for compiler options and build configuration

This article covers the following compiler errors and warnings:

- **CS0006**: *Metadata file 'file' could not be found*
- **CS0007**: *Unexpected common language runtime initialization error — 'description'*
- **CS0016**: *Could not write to output file 'file' -- 'reason'*
- **CS1564**: *Conflicting options specified: Win32 resource file; Win32 manifest*
- **CS1616**: *Option 'option' overrides attribute 'attribute' given in a source file or added module*
- **CS1668**: *Invalid search path 'path' specified in 'option' -- 'reason'*
- **CS1719**: *Error opening Win32 resource file 'file' -- 'reason'*
- **CS1773**: *Invalid version value for /subsystemversion. The version must be 6.02 or greater for ARM or AppContainerExe, and 4.00 or greater otherwise*
- **CS2007**: *Unrecognized option: 'option'*
- **CS2008**: *No source files specified.*
- **CS2011**: *Error opening response file 'file'*
- **CS2019**: *Invalid target type for /target: must specify 'exe', 'winexe', 'library', or 'module'*
- **CS2023**: *Ignoring /noconfig option because it was specified in a response file*
- **CS2029**: *Invalid name for a preprocessing symbol; 'identifier' is not a valid identifier*
- **CS2032**: *Character 'character' is not allowed on the command-line or in response files*
- **CS2036**: *The /pdb option requires that the /debug option also be used*
- **CS2038**: *The language name 'name' is invalid.*
- **CS2039**: *Command-line syntax error: Invalid Guid format 'value' for option 'option'*
- **CS2040**: *Command-line syntax error: Missing Guid for option 'option'*
- **CS2041**: *Invalid output name: name*
- **CS2042**: *Invalid debug information format: format*
- **CS2043**: *'id#' syntax is no longer supported. Use '$id' instead.*
- **CS2044**: */sourcelink switch is only supported when emitting PDB.*
- **CS2045**: */embed switch is only supported when emitting a PDB.*
- **CS2046**: *Command-line syntax error: 'value' is not a valid value for the 'option' option. The value must be of the form 'format'.*
- **CS3012**: *You must specify the CLSCompliant attribute on the assembly, not the module, to enable CLS compliance checking*
- **CS3013**: *Added modules must be marked with the CLSCompliant attribute to match the assembly*
- **CS7038**: *Failed to emit module 'module': error*
- **CS7089**: *AppConfigPath must be absolute.*
- **CS7093**: *Cannot read config file 'file' -- 'reason'*
- **CS8001**: *The command line switch 'switch' is not yet implemented and was ignored.*
- **CS8035**: *Error reading ruleset file path - reason*
- **CS8101**: *The pathmap option was incorrectly formatted.*
- **CS8111**: *Invalid instrumentation kind: instrumentation kind*
- **CS8113**: *Invalid hash algorithm name: 'hash algorithm name'*
- **CS8190**: *Provided source code kind is unsupported or invalid: 'source code kind'*
- **CS8191**: *Provided documentation mode is unsupported or invalid: 'documentation mode'.*
- **CS8202**: *Public signing is not supported for netmodules.*
- **CS8308**: *Do not use refout when using refonly.*
- **CS8309**: *Cannot compile net modules when using /refout or /refonly.*
- **CS8357**: *The specified version string 'version string' contains wildcards, which are not compatible with determinism. Either remove wildcards from the version string, or disable determinism for this compilation*
- **CS8751**: *Internal error in the C# compiler.*
- **CS8771**: *Output directory could not be determined*
- **CS8772**: *stdin argument '-' is specified, but input has not been redirected from the standard input stream.*
- **CS9400**: *Invalid 'option' value: 'value'. Accepted values are: value1, value2, ...*

## Input and output file errors

- **CS0006**: *Metadata file 'file' could not be found*
- **CS0016**: *Could not write to output file 'file' -- 'reason'*
- **CS1668**: *Invalid search path 'path' specified in 'option' -- 'reason'*
- **CS1719**: *Error opening Win32 resource file 'file' -- 'reason'*
- **CS2008**: *No source files specified.*

These errors indicate that the compiler can't find, read, or write files needed for compilation. For the full list of file-related compiler options, see C# compiler options - Inputs and C# compiler options - Resources.

- Verify the path you pass to **References** or related options points to an existing assembly (**CS0006**). This error typically occurs when an assembly reference in the project file or command line specifies a path that doesn't exist. Check for typos, ensure the referenced project is built, and confirm the file isn't moved or deleted.
- Check the output path to make sure it exists and is writable, and ensure no process currently has a lock on the file (**CS0016**). For example, ensure your executable isn't running when you attempt to build. If a previously built file is already at the location, verify that it isn't read-only.
- Verify that the path you supply to **AdditionalLibPaths** or the LIB environment variable exists and is accessible (**CS1668**). The error message in single quotation marks contains the operating system error that explains why the path is invalid.
- Correct the problem described in the error reason for the Win32 resource file (**CS1719**). The most common causes are "file not found" (verify the path) or "access denied" (check file permissions).
- Pass at least one source-code file to the compiler (**CS2008**). This error occurs when you specify compiler options but don't provide any `.cs` files as input.

## Invalid option values

- **CS1773**: *Invalid version value for /subsystemversion. The version must be 6.02 or greater for ARM or AppContainerExe, and 4.00 or greater otherwise*
- **CS2019**: *Invalid target type for /target: must specify 'exe', 'winexe', 'library', or 'module'*
- **CS2029**: *Invalid name for a preprocessing symbol; 'identifier' is not a valid identifier*
- **CS2032**: *Character 'character' is not allowed on the command-line or in response files*
- **CS2038**: *The language name 'name' is invalid.*
- **CS2039**: *Command-line syntax error: Invalid Guid format 'value' for option 'option'*
- **CS2040**: *Command-line syntax error: Missing Guid for option 'option'*
- **CS2041**: *Invalid output name: name*
- **CS2042**: *Invalid debug information format: format*
- **CS2043**: *'id#' syntax is no longer supported. Use '$id' instead.*
- **CS2046**: *Command-line syntax error: 'value' is not a valid value for the 'option' option. The value must be of the form 'format'.*
- **CS8101**: *The pathmap option was incorrectly formatted.*
- **CS8772**: *stdin argument '-' is specified, but input has not been redirected from the standard input stream.*
- **CS9400**: *Invalid 'option' value: 'value'. Accepted values are: value1, value2, ...*

These errors indicate that a value you passed to a compiler option is malformed or outside the allowed set of values. For the full list of compiler options, see C# Compiler Options.

- Supply a valid version number for the **SubsystemVersion** option (**CS1773**). ARM and AppContainerExe targets require version 6.02 or greater; other targets require 4.00 or greater.
- Use one of the valid **OutputType** values: `exe`, `winexe`, `library`, or `module` (**CS2019**). The compiler rejects any other value for the **/target** option.
- Ensure preprocessing symbols you pass to **DefineConstants** are valid C# identifiers (**CS2029**). Identifiers must start with a letter or underscore and contain only letters, digits, or underscores. You can't suppress this warning by using the **NoWarn** option.
- Remove ASCII control characters (range 0–31) and the pipe (`|`) character from command-line arguments and response files (**CS2032**). The command-line processor and IDE typically filter these characters, so this error most commonly appears when you use response files that contain invalid characters. Newer versions of the compiler don't generate this error.
- Supply a valid culture name recognized by the compiler (**CS2038**). Check the spelling against the list of supported culture names.
- Supply a properly formatted GUID to the legacy `/sqmsessionguid` option, or remove that option (**CS2039**, **CS2040**). For example, `/sqmsessionguid:01234567-89ab-cdef-0123-456789abcdef` supplies a valid GUID. CS2039 indicates an invalid GUID value, and CS2040 indicates a missing value. The compiler retains this option's parsing for backward compatibility. These diagnostics don't describe the **ChecksumAlgorithm** option, which accepts `SHA1` or `SHA256`, not a GUID.
- Remove invalid characters from the output file name (**CS2041**). Output names can't contain characters that are invalid in file paths on the target operating system.
- Provide a valid debug information format value (**CS2042**). Accepted values depend on the compiler version and typically include `full`, `pdbonly`, `portable`, and `embedded`.
- Replace the legacy `id#` syntax with `$id` (**CS2043**). The compiler no longer supports the older syntax.
- Supply a value that matches the expected format for the specified option (**CS2046**). The error message indicates the expected form.
- Format each **PathMap** entry as `source=destination`, with a nonempty value on both sides, and separate mappings with commas (**CS8101**). For example, `/pathmap:C:\work\src=/_/src,C:\work\generated=/_/generated` supplies two mappings. An entry such as `/pathmap:C:\work\src` is missing `=destination`. Double a literal comma or equals sign within a path as `,,` or `==`; quotation marks alone don't escape these mapping separators.

  On the compiler command line, quote paths containing spaces so the shell passes the complete option as one argument, for example `/pathmap:"C:\work tree=/_/src"`. In a project file, use `<PathMap>C:\work tree=/_/src</PathMap>` without command-line quotation marks. XML escaping still applies to characters such as `&`, which you write as `&` in element text.

- Redirect standard input when using the `-` (stdin) argument (**CS8772**). The compiler expects piped input when you pass `-` as the source file argument. Use a pipeline (for example, `cat file.cs | csc -`) or remove the `-` argument and pass the source file directly.
- Set the experimental Roslyn `CSharpCompilationOptions.MemorySafetyRulesVersion` option to a supported enum member (**CS9400**). `WithMemorySafetyRulesVersion` accepts `MemorySafetyRulesVersion.Version1` (`1`, legacy rules) or `MemorySafetyRulesVersion.Version2` (`2`, updated rules). Casting another integer, such as `0` or `3`, to this enum produces CS9400 with the accepted values `1, 2`. This diagnostic validates the Roslyn API option, not values passed to the `updated-memory-safety-rules` feature flag. A valid value can still require another language version: `Version2` with C# 15.0 produces CS8630, because the updated rules require `preview`.

## Instrumentation and PDB options

- **CS8111**: *Invalid instrumentation kind: instrumentation kind*
- **CS8113**: *Invalid hash algorithm name: 'hash algorithm name'*

Use a supported instrumentation kind when you pass the `/instrument` option. The command-line option accepts `TestCoverage`; Roslyn API consumers must provide a valid `Microsoft.CodeAnalysis.Emit.InstrumentationKind` value in `Microsoft.CodeAnalysis.Emit.EmitOptions.InstrumentationKinds` (**CS8111**).

Provide a cryptographic hash algorithm supported by the current platform in `Microsoft.CodeAnalysis.Emit.EmitOptions.PdbChecksumAlgorithm` (**CS8113**). Deterministic emission also requires a nonempty PDB checksum algorithm. This API setting calculates the PDB checksum stored in the compiled file. It's distinct from the **ChecksumAlgorithm** compiler option, which selects `SHA1` or `SHA256` for source-file checksums stored in the PDB. Invalid command-line values are rejected while parsing the command line rather than reported as CS8113.

## Parse and documentation API options

- **CS8190**: *Provided source code kind is unsupported or invalid: 'source code kind'*
- **CS8191**: *Provided documentation mode is unsupported or invalid: 'documentation mode'.*

Ordinary `csc` command-line option parsing doesn't produce these public Roslyn API diagnostics. When a `Microsoft.CodeAnalysis.CSharp.CSharpParseOptions` instance contains an invalid enum value, `CSharpParseOptions.Errors` exposes them. `CSharpCompilation.GetDiagnostics()` also reports them after a syntax tree that uses those options is included in a compilation, but `CSharpSyntaxTree.GetDiagnostics()` doesn't report them.

- Use `Microsoft.CodeAnalysis.SourceCodeKind.Regular` for C# source files or `Microsoft.CodeAnalysis.SourceCodeKind.Script` for scripts (**CS8190**). The obsolete `Interactive` value is rejected; use `Script` instead.
- Use `Microsoft.CodeAnalysis.DocumentationMode.None`, `Microsoft.CodeAnalysis.DocumentationMode.Parse`, or `Microsoft.CodeAnalysis.DocumentationMode.Diagnose` (**CS8191**). Don't cast an arbitrary integer to `DocumentationMode`.
