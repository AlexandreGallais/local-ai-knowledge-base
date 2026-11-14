---
title: "AssemblyVersionAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/AssemblyVersionAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AssemblyVersionAttribute class

Namespace: `System.Reflection`

```csharp
public sealed class AssemblyVersionAttribute : Attribute
```

Specifies the version of the assembly being attributed.

#### Remarks
The `AssemblyVersionAttribute` attribute is used to assign a version number to an assembly. That version number is then stored with the assembly's metadata.

The assembly version number is part of an assembly's identity and plays a key part in binding to the assembly and in version policy. The default version policy for the runtime is that applications run only with the versions they were built and tested with, unless overridden by explicit version policy in configuration files (the application configuration file, the publisher policy file, and the computer's administrator configuration file). See Assemblies in .NET for more information.

> **Note:**
>  Version checking only occurs with strong-named assemblies.

The version number has four parts, as follows:

\<major version>.\<minor version>.\<build number>.\<revision>

> **Important:**
>  All components of the version must be integers greater than or equal to 0. Metadata restricts the major, minor, build, and revision components for an assembly to a maximum value of `MaxValue` - 1. If a component exceeds this value, a compilation error occurs.

For example, `[assembly:AssemblyVersion("2.3.25.1")]` indicates 2 as the major version, 3 as the minor version, 25 as the build number, and 1 as the revision number.

The `AssemblyVersionAttribute` attribute allows you to specify an asterisk (\*) in place of the build or revision number. A version number such as `[assembly:AssemblyVersion("1.2.*")]` specifies 1 as the major version and 2 as the minor version, and accepts the default build and revision numbers. A version number such as `[assembly:AssemblyVersion("1.2.15.*")]` specifies 1 as the major version, 2 as the minor version, and 15 as the build number, and accepts the default revision number. The default build number increments daily. The default revision number is the number of seconds since midnight local time (without taking into account time zone adjustments for daylight saving time), divided by 2. If you specify an asterisk for the build number, you can't specify a revision number.

> **Important:**
> Use of the `AssemblyVersionAttribute` attribute that specifies an asterisk:
>
> - Makes the build outputs non-reproducible (see Reproducible builds). If the project sets `Deterministic` build property to `true` an error `CS8357` is reported by the compiler.
> - Might degrade build performance, as it prevents build from caching compiler outputs.
> - Is incompatible with the Edit & Continue and Hot Reload features.

You can mitigate some of these issues by limiting the use of time-based versions to release builds using conditional compilation, like so:

```csharp
#if DEBUG
[assembly: AssemblyVersion("1.0.0.0")]
#else
[assembly: AssemblyVersion("1.0.*")]
#endif
```

A better approach to versioning is to derive the assembly or file version from the `HEAD` commit SHA (for git repositories). See, for example, Nerdbank.GitVersioning.

The assembly major and minor versions are used as the type library version number when the assembly is exported. Some COM hosts do not accept type libraries with the version number 0.0. Therefore, if you want to expose an assembly to COM clients, set the assembly version explicitly to 1.0 in the `AssemblyVersionAttribute` page for projects created outside Visual Studio 2005 and with no `AssemblyVersionAttribute` specified. Do this even when the assembly version is 0.0. All projects created in Visual Studio 2005 have a default assembly version of 1.0.*.

To get the name of an assembly you have loaded, call `Assembly.GetName` on the assembly to get an `AssemblyName`, and then get the `Version` property. To get the name of an assembly you have not loaded, call `AssemblyName.GetAssemblyName` from your client application to check the assembly version that your application uses.

The `AssemblyVersionAttribute` attribute can only be applied once. Some Visual Studio project templates already include the attribute. In those projects, adding the attribute in code causes a compiler error.

#### Examples
The following example uses the `AssemblyVersionAttribute` attribute to assign a version number to an assembly. At compile time, this version information is stored with the assembly's metadata. At run time, the example retrieves the value of the `Assembly` property on a type found in the assembly to get a reference to the executing assembly, and it retrieves the assembly's version information from the `Version` property of the `AssemblyName` object returned by the `Assembly.GetName` method.

_Code sample not included: ~/snippets/csharp/System/Version/Overview/example1.cs._

## AssemblyVersionAttribute.AssemblyVersionAttribute(String) constructor

```csharp
public AssemblyVersionAttribute (string version);
```

Initializes a new instance of the `AssemblyVersionAttribute` class with the version number of the assembly being attributed.

Parameters:

- `version`: The version number of the attributed assembly.

#### Remarks
The format of the `version` string is: `major`. `minor`. `build`. `revision`.

When specifying a version, you have to at least specify `major`. If you specify `major` and `minor`, you can specify an asterisk (*) for `build`. This will cause `build` to be equal to the number of days since January 1, 2000 local time, and for `revision` to be equal to the number of seconds since midnight local time (without taking into account time zone adjustments for daylight saving time), divided by 2.

If you specify `major`, `minor`, and `build`, you can specify an asterisk for `revision`. This will cause `revision` to be equal to the number of seconds since midnight local time, divided by 2.

Examples of valid version strings include:

1

1.1

1.1.*

1.1.1

1.1.1.*

1.1.1.1

## AssemblyVersionAttribute.Version property

```csharp
public string Version { get; }
```

Gets the version number of the attributed assembly.

Returns: A string containing the assembly version number.

To be added.
