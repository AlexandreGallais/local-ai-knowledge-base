---
title: "MSBuild properties for Microsoft.NET.Sdk (part 6 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/project-sdk/msbuild-props.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 6 of 9)

## Code analysis properties

The following MSBuild properties are documented in this section:

- AnalysisLevel
- AnalysisLevel\<Category>
- AnalysisMode
- AnalysisMode\<Category>
- CodeAnalysisTreatWarningsAsErrors
- EnableNETAnalyzers
- EnforceCodeStyleInBuild
- _SkipUpgradeNetAnalyzersNuGetWarning

### AnalysisLevel

The `AnalysisLevel` property lets you specify a set of code analyzers to run according to a .NET release. Each .NET release has a set of code analysis rules. Of that set, the rules that are enabled by default for that release analyze your code. For example, if you upgrade from .NET 8 to .NET 9 but don't want the default set of code analysis rules to change, set `AnalysisLevel` to `8`.

```xml
<PropertyGroup>
  <AnalysisLevel>8</AnalysisLevel>
</PropertyGroup>
```

Optionally, you can specify a compound value for this property that also specifies how aggressively to enable rules. Compound values take the form `<version>-<mode>`, where the `<mode>` value is one of the AnalysisMode values. The following example uses the `preview` version of code analyzers, and enables the `recommended` set of rules.

```xml
<PropertyGroup>
  <AnalysisLevel>preview-recommended</AnalysisLevel>
</PropertyGroup>
```

Default value:

- If your project targets .NET 5 or later, or if you've added the AnalysisMode property, the default value is `latest`.
- Otherwise, this property is omitted unless you explicitly add it to the project file.

The following table shows the values you can specify.

| Value    | Meaning                                                                          |
|----------|----------------------------------------------------------------------------------|
| `latest` | The latest code analyzers that have been released are used. This is the default. |
| `latest-<mode>` | The latest code analyzers that have been released are used. The `<mode>` value determines which rules are enabled. |
| `preview` | The latest code analyzers are used, even if they are in preview. |
| `preview-<mode>` | The latest code analyzers are used, even if they are in preview. The `<mode>` value determines which rules are enabled. |
| `11.0` | The set of rules that was available for the .NET 11 release is used, even if newer rules are available. |
| `11.0-<mode>` | The set of rules that was available for the .NET 11 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `11` | The set of rules that was available for the .NET 11 release is used, even if newer rules are available. |
| `11-<mode>` | The set of rules that was available for the .NET 11 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `10.0` | The set of rules that was available for the .NET 10 release is used, even if newer rules are available. |
| `10.0-<mode>` | The set of rules that was available for the .NET 10 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `10` | The set of rules that was available for the .NET 10 release is used, even if newer rules are available. |
| `10-<mode>` | The set of rules that was available for the .NET 10 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `9.0` | The set of rules that was available for the .NET 9 release is used, even if newer rules are available. |
| `9.0-<mode>` | The set of rules that was available for the .NET 9 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `9` | The set of rules that was available for the .NET 9 release is used, even if newer rules are available. |
| `9-<mode>` | The set of rules that was available for the .NET 9 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `8.0` | The set of rules that was available for the .NET 8 release is used, even if newer rules are available. |
| `8.0-<mode>` | The set of rules that was available for the .NET 8 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |
| `8` | The set of rules that was available for the .NET 8 release is used, even if newer rules are available. |
| `8-<mode>` | The set of rules that was available for the .NET 8 release is used, even if newer rules are available. The `<mode>` value determines which rules are enabled. |

> **Note:**
>
> - If you set EnforceCodeStyleInBuild to `true`, this property affects code-style (IDEXXXX) rules (in addition to code-quality rules).
> - If you set a compound value for `AnalysisLevel`, you don't need to specify an AnalysisMode. However, if you do, `AnalysisLevel` takes precedence over `AnalysisMode`.
> - This property has no effect on code analysis in projects that don't reference a project SDK, for example, legacy .NET Framework projects that reference the Microsoft.CodeAnalysis.NetAnalyzers NuGet package. For more information, see Enable code analysis in legacy projects.

### AnalysisLevel\<Category>

This property is the same as AnalysisLevel, except that it only applies to a specific category of code-analysis rules. This property allows you to use a different version of code analyzers for a specific category, or to enable or disable rules at a different level to the other rule categories. If you omit this property for a particular category of rules, it defaults to the AnalysisLevel value. The available values are the same as those for AnalysisLevel.

```xml
<PropertyGroup>
  <AnalysisLevelSecurity>preview</AnalysisLevelSecurity>
</PropertyGroup>
```

```xml
<PropertyGroup>
  <AnalysisLevelSecurity>preview-recommended</AnalysisLevelSecurity>
</PropertyGroup>
```

The following table lists the property name for each rule category.

| Property name           | Rule category                                                                     |
|-------------------------|-----------------------------------------------------------------------------------|
| `<AnalysisLevelDesign>` | Design rules |
| `<AnalysisLevelDocumentation>` | Documentation rules |
| `<AnalysisLevelGlobalization>` | Globalization rules |
| `<AnalysisLevelInteroperability>` | Portability and interoperability rules |
| `<AnalysisLevelMaintainability>` | Maintainability rules |
| `<AnalysisLevelNaming>` | Naming rules |
| `<AnalysisLevelPerformance>` | Performance rules |
| `<AnalysisLevelSingleFile>` | Single-file application rules |
| `<AnalysisLevelReliability>` | Reliability rules |
| `<AnalysisLevelSecurity>` | Security rules |
| `<AnalysisLevelStyle>` | Code-style (IDEXXXX) rules |
| `<AnalysisLevelUsage>` | Usage rules |

### AnalysisMode

The .NET SDK ships with all of the "CA" code quality rules. By default, only some rules are enabled as build warnings in each .NET release. The `AnalysisMode` property lets you customize the set of rules that's enabled by default. You can either switch to a more aggressive analysis mode where you can opt out of rules individually, or a more conservative analysis mode where you can opt in to specific rules. For example, if you want to enable all rules as build warnings, set the value to `All`.

```xml
<PropertyGroup>
  <AnalysisMode>All</AnalysisMode>
</PropertyGroup>
```

The following table shows the available option values. They're listed in increasing order of the number of rules they enable.

> **Note:**
>
> - If you set EnforceCodeStyleInBuild to `true`, this property affects code-style (IDEXXXX) rules (in addition to code-quality rules).
> - If you use a compound value for AnalysisLevel, for example, `<AnalysisLevel>9-recommended</AnalysisLevel>`, you can omit this property entirely. However, if you specify both properties, `AnalysisLevel` takes precedence over `AnalysisMode`.

### AnalysisMode\<Category>

This property is the same as AnalysisMode, except that it only applies to a specific category of code-analysis rules. This property allows you to enable or disable rules at a different level to the other rule categories. If you omit this property for a particular category of rules, it defaults to the AnalysisMode value. The available values are the same as those for AnalysisMode.

```xml
<PropertyGroup>
  <AnalysisModeSecurity>All</AnalysisModeSecurity>
</PropertyGroup>
```

The following table lists the property name for each rule category.

| Property name          | Rule category                                                                     |
|------------------------|-----------------------------------------------------------------------------------|
| `<AnalysisModeDesign>` | Design rules |
| `<AnalysisModeDocumentation>` | Documentation rules |
| `<AnalysisModeGlobalization>` | Globalization rules |
| `<AnalysisModeInteroperability>` | Portability and interoperability rules |
| `<AnalysisModeMaintainability>` | Maintainability rules |
| `<AnalysisModeNaming>` | Naming rules |
| `<AnalysisModePerformance>` | Performance rules |
| `<AnalysisModeSingleFile>` | Single-file application rules |
| `<AnalysisModeReliability>` | Reliability rules |
| `<AnalysisModeSecurity>` | Security rules |
| `<AnalysisModeStyle>` | Code-style (IDEXXXX) rules |
| `<AnalysisModeUsage>` | Usage rules |

### CodeAnalysisTreatWarningsAsErrors

The `CodeAnalysisTreatWarningsAsErrors` property lets you configure whether code quality analysis warnings (CAxxxx) should be treated as warnings and break the build. If you use the `-warnaserror` flag when you build your projects, .NET code quality analysis warnings are also treated as errors. If you do not want code quality analysis warnings to be treated as errors, you can set the `CodeAnalysisTreatWarningsAsErrors` MSBuild property to `false` in your project file.

```xml
<PropertyGroup>
  <CodeAnalysisTreatWarningsAsErrors>false</CodeAnalysisTreatWarningsAsErrors>
</PropertyGroup>
```

### EnableNETAnalyzers

.NET code quality analysis is enabled, by default, for projects that target .NET 5 or a later version. If you're developing using the .NET 5+ SDK, you can enable .NET code analysis for SDK-style projects that target earlier versions of .NET by setting the `EnableNETAnalyzers` property to `true`. To disable code analysis in any project, set this property to `false`.

```xml
<PropertyGroup>
  <EnableNETAnalyzers>true</EnableNETAnalyzers>
</PropertyGroup>
```

> **Note:**
> This property applies specifically to the built-in analyzers in the .NET 5+ SDK. It should not be used when you install a NuGet code analysis package.

### EnforceCodeStyleInBuild

.NET code style analysis is disabled, by default, on build for all .NET projects. You can enable code style analysis for .NET projects by setting the `EnforceCodeStyleInBuild` property to `true`.
(But for performance reasons, a handful of code-style rules that apply only in the Visual Studio IDE won't be run.)

```xml
<PropertyGroup>
  <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
</PropertyGroup>
```

All code style rules that are configured to be warnings or errors will execute on build and report violations.

### _SkipUpgradeNetAnalyzersNuGetWarning

The `_SkipUpgradeNetAnalyzersNuGetWarning` property lets you configure whether you receive a warning if you're using code analyzers from a NuGet package that's out-of-date when compared with the code analyzers in the latest .NET SDK. The warning looks similar to:

**The .NET SDK has newer analyzers with version '6.0.0' than what version '5.0.3' of 'Microsoft.CodeAnalysis.NetAnalyzers' package provides. Update or remove this package reference.**

To remove this warning and continue to use the version of code analyzers in the NuGet package, set `_SkipUpgradeNetAnalyzersNuGetWarning` to `true` in your project file.

```xml
<PropertyGroup>
  <_SkipUpgradeNetAnalyzersNuGetWarning>true</_SkipUpgradeNetAnalyzersNuGetWarning>
</PropertyGroup>
```
