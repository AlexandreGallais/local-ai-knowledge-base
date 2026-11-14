---
title: "Resolve errors related to language version and features (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/feature-version-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors related to language version and features (part 2 of 3)

## Language version configuration errors

- **CS1617**: *Invalid option 'option' for /langversion. Use '/langversion:?' to list supported values.*
- **CS1638**: *'identifier' is a reserved identifier and cannot be used when ISO language version mode is used*
- **CS8192**: *Provided language version is unsupported or invalid: 'value'.*
- **CS8303**: *Specified language version 'value' cannot have leading zeroes*
- **CS8304**: *Compiler version: 'version'. Language version: version.*

These errors indicate that the `<LangVersion>` setting in your project file or the `-langversion` compiler option is invalid or incompatible with the installed compiler.

Correct the `<LangVersion>` value in your project file to a valid language version string (**CS1617**, **CS8192**, **CS8303**). The valid values include `default`, `latest`, `preview`, `latestMajor`, or a specific version number such as `7.3`, `8.0`, `9.0`, `10`, `11`, `12`, `13`, or `14`. Don't include leading zeroes in the version number. See C# language versioning for the full list of supported values.

> **Tip:**
> To see a list of supported language versions, reference the table in this article, compile with `-langversion:?`, or temporarily set `<LangVersion>?</LangVersion>` in your project file before building.

Update the .NET SDK to a version whose compiler supports the language version you specified (**CS8304**). Each version of the C# compiler supports language versions up to a specific maximum. If you specify a language version newer than the compiler supports, upgrade the SDK.

Remove double-underscore identifiers or change the language version from `ISO-1` or `ISO-2` to a newer version (**CS1638**). The ISO language modes reserve identifiers containing `__` (double underscores) because they're not compliant with the ISO C# specification.

> **Note:**
> The current C# compiler no longer produces **CS1638**. Older compilers emitted this error when using the `ISO-1` or `ISO-2` language versions.

The compiler determines its default language version from the target framework:

| Target           | Version | C# language version default |
|------------------|---------|-----------------------------|
| .NET             | 11.x    | C# 15                       |
| .NET             | 10.x    | C# 14                       |
| .NET             | 9.x     | C# 13                       |
| .NET             | 8.x     | C# 12                       |
| .NET             | 7.x     | C# 11                       |
| .NET             | 6.x     | C# 10                       |
| .NET             | 5.x     | C#  9.0                     |
| .NET Core        | 3.x     | C#  8.0                     |
| .NET Core        | 2.x     | C#  7.3                     |
| .NET Standard    | 2.1     | C#  8.0                     |
| .NET Standard    | 2.0     | C#  7.3                     |
| .NET Standard    | 1.x     | C#  7.3                     |
| .NET Framework   | all     | C#  7.3                     |

If you remove the `LangVersion` element from your project file, the compiler uses the default for your target framework. You can also specify a specific version to enable newer features:

| Value                         | Meaning                                                                                                 |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `preview`                     | The compiler accepts all valid language syntax from the latest preview version.                         |
| `latest`                      | The compiler accepts syntax from the latest released version of the compiler (including minor version). |
| `latestMajor`or `default` | The compiler accepts syntax from the latest released major version of the compiler.                     |
| `15.0`                        | The compiler accepts only syntax that is included in C# 15 or lower.                                    |
| `14.0`                        | The compiler accepts only syntax that is included in C# 14 or lower.                                    |
| `13.0`                        | The compiler accepts only syntax that is included in C# 13 or lower.                                    |
| `12.0`                        | The compiler accepts only syntax that is included in C# 12 or lower.                                    |
| `11.0`                        | The compiler accepts only syntax that is included in C# 11 or lower.                                    |
| `10.0`                        | The compiler accepts only syntax that is included in C# 10 or lower.                                    |
| `9.0`                         | The compiler accepts only syntax that is included in C# 9 or lower.                                     |
| `8.0`                         | The compiler accepts only syntax that is included in C# 8.0 or lower.                                   |
| `7.3`                         | The compiler accepts only syntax that is included in C# 7.3 or lower.                                   |
| `7.2`                         | The compiler accepts only syntax that is included in C# 7.2 or lower.                                   |
| `7.1`                         | The compiler accepts only syntax that is included in C# 7.1 or lower.                                   |
| `7`                           | The compiler accepts only syntax that is included in C# 7.0 or lower.                                   |
| `6`                           | The compiler accepts only syntax that is included in C# 6.0 or lower.                                   |
| `5`                           | The compiler accepts only syntax that is included in C# 5.0 or lower.                                   |
| `4`                           | The compiler accepts only syntax that is included in C# 4.0 or lower.                                   |
| `3`                           | The compiler accepts only syntax that is included in C# 3.0 or lower.                                   |
| `ISO-2`or `2`             | The compiler accepts only syntax that is included in ISO/IEC 23270:2006 C# (2.0).                       |
| `ISO-1`or `1`             | The compiler accepts only syntax that is included in ISO/IEC 23270:2003 C# (1.0/1.2).                   |

To learn more about the language versions supported for each framework version, see Configure language version in the language reference section.

## Feature not available in language version

- **CS1738**: *Named argument specifications must appear after all fixed arguments have been specified.*
- **CS8022, CS8023, CS8024, CS8025, CS8026, CS8059, CS8107, CS8302, CS8320, CS8370, CS8400, CS8773, CS8936, CS9058, CS9202, CS9260**: *Feature is not available in C# X. Please use language version Y or greater.*
- **CS8306**: *Tuple element name is inferred. Please use language version 7.1 or greater to access an element by its inferred name.*
- **CS8314**: *An expression of type 'type' cannot be handled by a pattern of type 'type' in C# version. Please use language version 'version' or greater.*
- **CS8371**: *Field-targeted attributes on auto-properties are not supported in language version 7.3.*
- **CS8401**: *To use '@$' instead of '$@' for an interpolated verbatim string, please use language version 8.0 or greater.*
- **CS8511**: *An expression of type 'type' cannot be handled by a pattern of type 'type'. Please use language version 'version' or greater to match an open type with a constant pattern.*
- **CS8627**: *A nullable type parameter must be known to be a value type or non-nullable reference type unless language version 'version' or greater is used. Consider changing the language version or adding a 'class', 'struct', or type constraint.*
- **CS8630**: *Invalid 'option' value: 'value' for C# version. Please use language version 'version' or greater.*
- **CS8703**: *The modifier 'modifier' is not valid for this item in C# version.*
- **CS8704**: *'type' does not implement interface member 'member'. 'type' cannot implicitly implement a non-public member.*
- **CS8706**: *Type cannot implement interface member because feature is not available in this version.*
- **CS8904**: *Invalid variance: The type parameter must be invariantly valid on 'member' unless language version 9.0 or greater is used.*
- **CS8912**: *Inheriting from a record with a sealed 'Object.ToString' is not supported in C# 9.0.*
- **CS8957**: *Conditional expression is not valid in language version 8.0 because a common type was not found between types.*
- **CS8967**: *Newlines inside a non-verbatim interpolated string are not supported in C# 10.0.*
- **CS9194**: *Argument may not be passed with the 'ref' keyword. To pass 'ref' arguments to 'in' parameters, upgrade to language version 12 or greater.*
- **CS9327**: *Feature 'feature' is not available in C# 14.0. Please use language version 'version' or greater.*
- **CS9399**: *Feature 'feature' is not available in C# 15.0. Please use language version 'version' or greater.*

These errors all indicate that you're using a language feature that requires a newer C# version than your project currently targets. To resolve these errors, use one of the following options:

- Upgrade the target framework so the compiler automatically selects the required language version. Each target framework maps to a default C# version. For example, .NET 8 defaults to C# 12, .NET 9 defaults to C# 13, and .NET 10 defaults to C# 14. See the table in Language version configuration errors for the full mapping.
- Set the `<LangVersion>` element in your project file to the required version or higher. For example, to enable C# 12 features, add `<LangVersion>12</LangVersion>` to a `<PropertyGroup>` in your project file.

If you can't upgrade, avoid the feature that triggered the error. The error message names the feature and the required version. The following list provides additional context for specific errors:

- Use explicitly named arguments for all arguments, or upgrade to C# 7.2 or later to use non-trailing named arguments (**CS1738**).
- Access tuple elements by their declared name rather than the inferred name, or upgrade to C# 7.1 or later (**CS8306**).
- Use `$@"..."` instead of `@$"..."` for interpolated verbatim strings in C# versions before 8.0 (**CS8401**).
- Add explicit type constraints to nullable type parameters, or upgrade to C# 9 or later which relaxes this requirement (**CS8627**).
- Match the option to the language version named in the message (**CS8630**). For example, nullable options require C# 8.0 or later. In the experimental Roslyn `MemorySafetyRulesVersion` API, selecting `Version2` requires the `preview` language version; selecting C# 15.0 isn't sufficient.
- Add explicit casts in conditional expressions where the two branches have no common type, or upgrade to C# 9 or later for target-typed conditional expressions (**CS8957**).
- Move newlines outside of interpolated string expressions, or upgrade to C# 11 or later (**CS8967**).
- Use the `in` keyword instead of `ref` when passing arguments to `in` parameters, or upgrade to C# 12 or later (**CS9194**).
- Implement non-public interface members explicitly rather than implicitly, or upgrade to C# 9 or later (**CS8704**).

Numbered-version gates and preview gates describe different problems:

- **CS9327** means the project uses C# 14.0, but the named feature requires a later language version. For example, collection expression arguments require C# 15.
- **CS9399** is the corresponding general numbered-version gate for a project using C# 15.0. Follow the feature and required version in the actual diagnostic. It isn't the error for activating the updated memory safety rules.
- **CS8652** means the feature remains in preview. For example, using the `safe` modifier with `LangVersion` set to `15.0` requires changing it to `preview`, not just selecting the newest numbered version.
- **CS8630** can instead report that a compilation option requires another language version. For example, the experimental `MemorySafetyRulesVersion` value `2` requires `preview` even when the compilation contains no source code, because the compiler validates the option independently of the source code.

For the separate syntax and enforcement opt-ins for the preview memory safety model, see Enable the updated memory safety rules.
