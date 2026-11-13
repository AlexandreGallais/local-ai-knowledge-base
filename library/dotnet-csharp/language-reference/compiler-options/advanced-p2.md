---
title: "Compiler Options - advanced scenarios (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-options/advanced.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compiler Options - advanced scenarios (part 2 of 2)

## SubsystemVersion

Specifies the minimum version of the subsystem on which the executable file runs. Most commonly, this option ensures that the executable file can use security features that aren’t available with older versions of Windows.

> **Note:**
> To specify the subsystem itself, use the **OutputType** compiler option.

```xml
<SubsystemVersion>major.minor</SubsystemVersion>
```

The `major.minor` value specifies the minimum required version of the subsystem, expressed as a dot-separated major and minor version. For example, to prevent your application from running on operating systems older than Windows 7, set this option to `6.01`. Specify the values for `major` and `minor` as integers. Leading zeroes in the `minor` version don't change the version, but trailing zeroes do. For example, 6.1 and 6.01 refer to the same version, but 6.10 refers to a different version. Express the minor version as two digits to avoid confusion.

For more information about Windows subsystem versions, see Operating System Version.

The default value of the **SubsystemVersion** compiler option depends on the conditions in the following list:

- The default value is 6.02 if any compiler option in the following list is set:
  - -target:appcontainerexe
  - -target:winmdobj
  - -platform:arm
- The default value is 6.00 if you're using MSBuild, you're targeting .NET Framework 4.5 or later, and you haven't set any of the compiler options that were specified earlier in this list.
- For modern .NET projects, the default value is 6.00, which allows your application to run on Windows Vista and later versions.
- The default value is 4.00 if none of the previous conditions are true.

## ModuleAssemblyName

Specifies the name of an assembly whose nonpublic types a *.netmodule* can access.

```xml
<ModuleAssemblyName>assembly_name</ModuleAssemblyName>
```

**ModuleAssemblyName** should be used when building a *.netmodule*, and where the following conditions are true:

- The *.netmodule* needs access to nonpublic types in an existing assembly.
- You know the name of the assembly into which the .netmodule will be built.
- The existing assembly has granted friend assembly access to the assembly into which the .*netmodule* will be built.

For more information on building a .netmodule, see **OutputType** option of **module**. For more information on friend assemblies, see Friend Assemblies.

## ReportIVTs

Enable or disable additional diagnostic information about `System.Runtime.CompilerServices.InternalsVisibleToAttribute` found during the compilation:

```xml
<ReportIVTs>true</ReportIVTs>
```

The diagnostics are enabled if the element content is `true`, disabled if `false`, or not present.

**ReportIVTs** reports the following information when enabled:

1. Any inaccessible member diagnostics include their source assembly, if different than the current assembly.
1. The compiler prints the assembly identity of the project being compiled, its assembly name and public key.
1. For every reference passed to the compiler, it prints;
   1. The assembly identity of the reference
   1. Whether the reference grants the current project `InternalsVisibleTo`
   1. The name and all public keys of any assemblies granted `InternalsVisibleTo` from this assembly
