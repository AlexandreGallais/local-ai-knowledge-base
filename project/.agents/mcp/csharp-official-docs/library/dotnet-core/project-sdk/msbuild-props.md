---
title: "MSBuild properties for Microsoft.NET.Sdk (part 1 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild reference for .NET SDK projects

This page is a reference for the MSBuild properties and items that you can use to configure .NET projects.

> **Note:**
> This page is a work in progress and does not list all of the useful MSBuild properties for the .NET SDK. For a list of common MSBuild properties, see Common MSBuild properties.

## Assembly validation properties

These properties and items are passed to the `ValidateAssemblies` task. For more information about assembly validation, see Assembly validation.

The following MSBuild properties are documented in this section:

- ApiCompatStrictMode
- ApiCompatValidateAssemblies

> **Note:**
> These properties aren't part of the .NET SDK (yet). To use them, you must also add a `PackageReference` to Microsoft.DotNet.ApiCompat.Task.

In addition, the following properties that are documented in the Package validation properties also apply to assembly validation:

- ApiCompatEnableRuleAttributesMustMatch
- ApiCompatEnableRuleCannotChangeParameterName
- ApiCompatExcludeAttributesFile
- ApiCompatGenerateSuppressionFile
- ApiCompatPermitUnnecessarySuppressions
- ApiCompatPreserveUnnecessarySuppressions
- ApiCompatRespectInternals
- ApiCompatSuppressionFile
- ApiCompatSuppressionOutputFile
- NoWarn
- RoslynAssembliesPath

### ApiCompatStrictMode

When set to `true`, the `ApiCompatStrictMode` property specifies that API compatibility checks should be performed in strict mode.

```xml
<PropertyGroup>
  <ApiCompatStrictMode>true</ApiCompatStrictMode>
</PropertyGroup>
```

### ApiCompatValidateAssemblies

The `ApiCompatValidateAssemblies` property enables a series of validations on the specified assemblies. For more information, see Assembly validation.

```xml
<PropertyGroup>
  <ApiCompatValidateAssemblies>true</ApiCompatValidateAssemblies>
</PropertyGroup>
```

## Assembly attribute properties

- GenerateAssemblyInfo
- GeneratedAssemblyInfoFile
- IncludeSourceRevisionInInformationalVersion
- SourceRevisionId

### GenerateAssemblyInfo

The `GenerateAssemblyInfo` property controls `AssemblyInfo` attribute generation for the project. The default value is `true`. Use `false` to disable generation of the file:

```xml
<PropertyGroup>
  <GenerateAssemblyInfo>false</GenerateAssemblyInfo>
</PropertyGroup>
```

The GeneratedAssemblyInfoFile setting controls the name of the generated file.

When the `GenerateAssemblyInfo` value is `true`, package-related project properties are transformed into assembly attributes.

For more information about generating assembly attributes using a project file, see Set assembly attributes in a project file.

### GeneratedAssemblyInfoFile

The `GeneratedAssemblyInfoFile` property defines the relative or absolute path of the generated assembly info file. Defaults to a file named *[project-name].AssemblyInfo.[cs|vb]* in the `$(IntermediateOutputPath)` (usually the *obj*) directory.

```xml
<PropertyGroup>
  <GeneratedAssemblyInfoFile>assemblyinfo.cs</GeneratedAssemblyInfoFile>
</PropertyGroup>
```

### IncludeSourceRevisionInInformationalVersion

The `IncludeSourceRevisionInInformationalVersion` property controls whether the `SourceRevisionId` value is appended to the `InformationalVersion` assembly attribute. The default value is `true`. Set it to `false` to disable this behavior:

```xml
<PropertyGroup>
  <IncludeSourceRevisionInInformationalVersion>false</IncludeSourceRevisionInInformationalVersion>
</PropertyGroup>
```

For more information, see Source Link included in the .NET SDK.

### SourceRevisionId

The `SourceRevisionId` property holds the source control revision ID for the build, such as a Git commit hash. Starting in .NET 8, the .NET SDK automatically populates this property with the commit hash when Source Link is present. When set, its value is appended to the `InformationalVersion` assembly attribute.

```xml
<PropertyGroup>
  <SourceRevisionId>abc1234</SourceRevisionId>
</PropertyGroup>
```

For more information, see Source Link included in the .NET SDK.

## Framework properties

The following MSBuild properties are documented in this section:

- TargetFramework
- TargetFrameworks
- NetStandardImplicitPackageVersion

### TargetFramework

The `TargetFramework` property specifies the target framework version for the app. For a list of valid target framework monikers, see Target frameworks in SDK-style projects.

```xml
<PropertyGroup>
  <TargetFramework>net8.0</TargetFramework>
</PropertyGroup>
```

> **Note:**
> The `TargetFramework` value is an alias. The .NET SDK parses it and sets the canonical moniker properties: `TargetFrameworkMoniker`, `TargetFrameworkIdentifier`, `TargetFrameworkVersion`, and, if applicable, `TargetPlatformIdentifier`, `TargetPlatformVersion`, and `TargetPlatformMoniker`. If you use a custom alias, you can set these properties directly in your project file.

For more information, see Target frameworks in SDK-style projects.

### TargetFrameworks

Use the `TargetFrameworks` property when you want your app to target multiple platforms. For a list of valid target framework monikers, see Target frameworks in SDK-style projects.

> **Note:**
> If `TargetFramework` (singular) is specified, `TargetFrameworks` (plural) is ignored, and the project builds as a single-target project.

```xml
<PropertyGroup>
  <TargetFrameworks>net8.0;net462</TargetFrameworks>
</PropertyGroup>
```

> **Note:**
> Starting with .NET SDK 10.0.300, multiple values can resolve to the same effective framework. For example, `<TargetFrameworks>linux;mac</TargetFrameworks>` is valid where both aliases resolve to `net10.0` as the target framework.

For more information, see Target frameworks in SDK-style projects.

### NetStandardImplicitPackageVersion

> **Note:**
> This property only applies to projects using `netstandard1.x`. It doesn't apply to projects that use `netstandard2.x`.

Use the `NetStandardImplicitPackageVersion` property when you want to specify a framework version that's lower than the metapackage version. The project file in the following example targets `netstandard1.3` but uses the 1.6.0 version of `NETStandard.Library`.

```xml
<PropertyGroup>
  <TargetFramework>netstandard1.3</TargetFramework>
  <NetStandardImplicitPackageVersion>1.6.0</NetStandardImplicitPackageVersion>
</PropertyGroup>
```

## Package properties

- Descriptive properties
- PackRelease

### Descriptive properties

You can specify properties such as `PackageId`, `PackageVersion`, `PackageIcon`, `Title`, and `Description` to describe the package that gets created from your project. For information about these and other properties, see pack target.

```xml
<PropertyGroup>
  ...
  <PackageId>ClassLibDotNetStandard</PackageId>
  <Version>1.0.0</Version>
  <Authors>John Doe</Authors>
  <Company>Contoso</Company>
</PropertyGroup>
```

### PackRelease

The `PackRelease` property is similar to the PublishRelease property, except that it changes the default behavior of `dotnet pack`. This property was introduced in .NET 7.

```xml
<PropertyGroup>
  <PackRelease>true</PackRelease>
</PropertyGroup>
```

> **Note:**
>
> Starting in the .NET 8 SDK, `PackRelease` defaults to `true`. For more information, see 'dotnet pack' uses Release configuration.

## Package validation properties

These properties and items are passed to the `ValidatePackage` task. For more information about package validation, see Package validation overview.

For properties for the `ValidateAssemblies` task, see Assembly validation properties.

The following MSBuild properties and items are documented in this section:

- ApiCompatEnableRuleAttributesMustMatch
- ApiCompatEnableRuleCannotChangeParameterName
- ApiCompatExcludeAttributesFile
- ApiCompatGenerateSuppressionFile
- ApiCompatPermitUnnecessarySuppressions
- ApiCompatPreserveUnnecessarySuppressions
- ApiCompatRespectInternals
- ApiCompatSuppressionFile
- ApiCompatSuppressionOutputFile
- EnablePackageValidation
- EnableStrictModeForBaselineValidation
- EnableStrictModeForCompatibleFrameworksInPackage
- EnableStrictModeForCompatibleTfms
- NoWarn
- PackageValidationBaselineFrameworkToIgnore
- PackageValidationBaselineName
- PackageValidationBaselineVersion
- PackageValidationReferencePath
- RoslynAssembliesPath

### ApiCompatEnableRuleAttributesMustMatch

When set to `true`, the `ApiCompatEnableRuleAttributesMustMatch` property enables the validation rule that checks if attributes match. The default is `false`.

```xml
<PropertyGroup>
  <ApiCompatEnableRuleAttributesMustMatch>true</ApiCompatEnableRuleAttributesMustMatch>
</PropertyGroup>
```

### ApiCompatEnableRuleCannotChangeParameterName

When set to `true`, the `ApiCompatEnableRuleCannotChangeParameterName` property enables the validation rule that checks whether parameter names have changed in public methods. The default is `false`.

```xml
<PropertyGroup>
  <ApiCompatEnableRuleCannotChangeParameterName>true</ApiCompatEnableRuleCannotChangeParameterName>
</PropertyGroup>
```

### ApiCompatExcludeAttributesFile

The `ApiCompatExcludeAttributesFile` item specifies the path to a file that contains attributes to exclude in DocId format.

```xml
<ItemGroup>
  <ApiCompatExcludeAttributesFile Include="ApiCompatExcludedAttributes.txt" />
  <ApiCompatExcludeAttributesFile Include="ApiCompatBaselineExcludedAttributes.txt" />
</ItemGroup>
```

### ApiCompatGenerateSuppressionFile

The `ApiCompatGenerateSuppressionFile` property specifies whether to generate a compatibility suppression file.

```xml
<PropertyGroup>
  <ApiCompatGenerateSuppressionFile>true</ApiCompatGenerateSuppressionFile>
</PropertyGroup>
```

### ApiCompatPermitUnnecessarySuppressions

The `ApiCompatPermitUnnecessarySuppressions` property specifies whether to permit unnecessary suppressions in the suppression file.

The default is `false`.

```xml
<PropertyGroup>
  <ApiCompatPermitUnnecessarySuppressions>true</ApiCompatPermitUnnecessarySuppressions>
</PropertyGroup>
```

### ApiCompatPreserveUnnecessarySuppressions

The `ApiCompatPreserveUnnecessarySuppressions` property specifies whether to preserve unnecessary suppressions when regenerating the suppression file. When an existing suppression file is regenerated, its content is read, deserialized into a set of suppressions, and then stored in a list. Some of the suppressions might no longer be necessary if the incompatibility has been fixed. When the suppressions are serialized back to disk, you can choose to keep *all* the existing (deserialized) expressions by setting this property to `true`.

The default is `false`.

```xml
<PropertyGroup>
  <ApiCompatPreserveUnnecessarySuppressions>true</ApiCompatPreserveUnnecessarySuppressions>
</PropertyGroup>
```

### ApiCompatRespectInternals

The `ApiCompatRespectInternals` property specifies whether `internal` APIs should be checked for compatibility in addition to `public` APIs.

```xml
<PropertyGroup>
  <ApiCompatRespectInternals>true</ApiCompatRespectInternals>
</PropertyGroup>
```

### ApiCompatSuppressionFile

The `ApiCompatSuppressionFile` item specifies the path to one or more suppression files to read from. If unspecified, the suppression file *\<project-directory>/CompatibilitySuppressions.xml* is read (if it exists).

```xml
<ItemGroup>
  <ApiCompatSuppressionFile Include="CompatibilitySuppressions.xml;CompatibilitySuppressions.WasmThreads.xml" />
</ItemGroup>
```

### ApiCompatSuppressionOutputFile

The `ApiCompatSuppressionOutputFile` property specifies the path to a suppression file to write to when `<ApiCompatGenerateSuppressionFile>` is `true`. If unspecified, the first `ApiCompatSuppressionFile` item is used.

### EnablePackageValidation

The `EnablePackageValidation` property enables a series of validations on the package after the `Pack` task. For more information, see package validation.

```xml
<PropertyGroup>
  <EnablePackageValidation>true</EnablePackageValidation>
</PropertyGroup>
```

### EnableStrictModeForBaselineValidation

When set to `true`, the `EnableStrictModeForBaselineValidation` property enables strict mode for package baseline checks. The default is `false`.

### EnableStrictModeForCompatibleFrameworksInPackage

When set to `true`, the `EnableStrictModeForCompatibleFrameworksInPackage` property enables strict mode for assemblies that are compatible based on their target framework. The default is `false`.

### EnableStrictModeForCompatibleTfms

When set to `true`, the `EnableStrictModeForCompatibleTfms` property enables strict mode for contract and implementation assemblies for all compatible target frameworks. The default is `true`.

### NoWarn

The `NoWarn` property specifies the diagnostic IDs to suppress.

```xml
<PropertyGroup>
  <NoWarn>$(NoWarn);PKV0001</NoWarn>
</PropertyGroup>
```

### PackageValidationBaselineFrameworkToIgnore

The `PackageValidationBaselineFrameworkToIgnore` item specifies a target framework to ignore from the baseline package. The framework string must exactly match the folder name in the baseline package.

```xml
<ItemGroup>
  <PackageValidationBaselineFrameworkToIgnore Include="netcoreapp2.1" />
</ItemGroup>
```

### PackageValidationBaselineName

The `PackageValidationBaselineName` property specifies the name of the baseline package to validate the current package against. If unspecified, the `PackageId` value is used.

### PackageValidationBaselineVersion

The `PackageValidationBaselineVersion` property specifies the version of the baseline package to validate the current package against.

### PackageValidationReferencePath

The `PackageValidationReferencePath` item specifies the directory path where the reference assembly can be found per TFM.

```xml
<ItemGroup>
  <PackageValidationReferencePath Include="path/to/reference-assembly" TargetFramework="net9.0" />
</ItemGroup>
```

### RoslynAssembliesPath

The `RoslynAssembliesPath` property specifies the path to the directory that contains the Microsoft.CodeAnalysis assemblies you want to use. You only need to set this property if you want to test with a newer compiler than what's in the SDK.
