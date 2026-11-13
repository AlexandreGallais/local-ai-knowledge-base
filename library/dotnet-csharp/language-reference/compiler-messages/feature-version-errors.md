---
title: "Resolve errors related to language version and features (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/feature-version-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Resolve errors and warnings for language features and versions

This article covers the following compiler errors and warnings:

- **CS0171**: *Field 'name' must be fully assigned before control is returned to the caller. Consider updating to language version 'version' to auto-default the field.*
- **CS0188**: *The 'this' object cannot be used before all of its fields have been assigned. Consider updating to language version 'version' to auto-default the unassigned fields.*
- **CS0843**: *Auto-implemented property 'name' must be fully assigned before control is returned to the caller. Consider updating to language version 'version' to auto-default the property.*
- **CS1617**: *Invalid option 'option' for /langversion. Use '/langversion:?' to list supported values.*
- **CS1638**: *'identifier' is a reserved identifier and cannot be used when ISO language version mode is used*
- **CS1738**: *Named argument specifications must appear after all fixed arguments have been specified. Please use language version 7.2 or greater to allow non-trailing named arguments.*
- **CS8021**: *No value for RuntimeMetadataVersion found. No assembly containing System.Object was found nor was a value for RuntimeMetadataVersion specified through options.*
- **CS8022**: *Feature is not available in C# 1. Please use language version 2 or greater.*
- **CS8023**: *Feature is not available in C# 2. Please use language version 3 or greater.*
- **CS8024**: *Feature is not available in C# 3. Please use language version 4 or greater.*
- **CS8025**: *Feature is not available in C# 4. Please use language version 5 or greater.*
- **CS8026**: *Feature is not available in C# 5. Please use language version 6 or greater.*
- **CS8058**: *Feature 'feature' is experimental and unsupported; use '/features:feature' to enable.*
- **CS8059**: *Feature is not available in C# 6. Please use language version 7 or greater.*
- **CS8107**: *Feature is not available in C# 7.0. Please use language version 7.1 or greater.*
- **CS8192**: *Provided language version is unsupported or invalid: 'value'.*
- **CS8302**: *Feature is not available in C# 7.1. Please use language version 7.2 or greater.*
- **CS8303**: *Specified language version 'value' cannot have leading zeroes*
- **CS8304**: *Compiler version: 'version'. Language version: version.*
- **CS8305**: *'type' is for evaluation purposes only and is subject to change or removal in future updates.*
- **CS8306**: *Tuple element name 'name' is inferred. Please use language version 7.1 or greater to access an element by its inferred name.*
- **CS8314**: *An expression of type 'type' cannot be handled by a pattern of type 'type' in C# version. Please use language version 'version' or greater.*
- **CS8320**: *Feature is not available in C# 7.2. Please use language version 7.3 or greater.*
- **CS8370**: *Feature is not available in C# 7.3. Please use language version 8 or greater.*
- **CS8371**: *Field-targeted attributes on auto-properties are not supported in language version 7.3. Please use language version 8.0 or greater.*
- **CS8400**: *Feature is not available in C# 8. Please use language version 9 or greater.*
- **CS8401**: *To use '@$' instead of '$@' for an interpolated verbatim string, please use language version 8.0 or greater.*
- **CS8511**: *An expression of type 'type' cannot be handled by a pattern of type 'type'. Please use language version 'version' or greater to match an open type with a constant pattern.*
- **CS8627**: *A nullable type parameter must be known to be a value type or non-nullable reference type unless language version 'version' or greater is used. Consider changing the language version or adding a 'class', 'struct', or type constraint.*
- **CS8630**: *Invalid 'option' value: 'value' for C# version. Please use language version 'version' or greater.*
- **CS8652**: *The feature 'feature' is currently in Preview and \*unsupported\*. To use Preview features, use the `preview` language version.*
- **CS8701**: *Target runtime doesn't support default interface implementation.*
- **CS8702**: *'member' cannot implement interface member 'member' in type 'type' because the target runtime doesn't support default interface implementation.*
- **CS8703**: *The modifier 'modifier' is not valid for this item in C# version. Please use language version 8.0 or greater.*
- **CS8704**: *'type' does not implement interface member 'member'. 'type' cannot implicitly implement a non-public member in C# version. Please use language version 'version' or greater.*
- **CS8706**: *Type cannot implement interface member in type because feature is not available in C# 7.3.*
- **CS8707**: *Target runtime doesn't support 'protected', 'protected internal', or 'private protected' accessibility for a member of an interface.*
- **CS8773**: *Feature is not available in C# 9. Please use language version 10 or greater.*
- **CS8830**: *Target runtime doesn't support covariant return types in overrides. Return type must be 'type' to match overridden member 'member'.*
- **CS8831**: *Target runtime doesn't support covariant types in overrides. Type must be 'type' to match overridden member 'member'.*
- **CS8888**: *'managed' calling convention cannot be combined with unmanaged calling convention specifiers.*
- **CS8889**: *The target runtime doesn't support extensible or runtime-environment default calling conventions.*
- **CS8890**: *Type 'type' is not defined.*
- **CS8891**: *Type 'type' must be public to be used as a calling convention.*
- **CS8904**: *Invalid variance: The type parameter must be invariantly valid on 'member' unless language version 9.0 or greater is used.*
- **CS8912**: *Inheriting from a record with a sealed 'Object.ToString' is not supported in C# 9.0. Please use language version 10.0 or greater.*
- **CS8919**: *Target runtime doesn't support static abstract members in interfaces.*
- **CS8929**: *'method' cannot implement interface member 'member' in type 'type' because the target runtime doesn't support static abstract members in interfaces.*
- **CS8936**: *Feature is not available in C# 10. Please use language version 11 or greater.*
- **CS8957**: *Conditional expression is not valid in language version 8.0 because a common type was not found between 'type' and 'type'. To use a target-typed conversion, upgrade to language version 9.0 or greater.*
- **CS8967**: *Newlines inside a non-verbatim interpolated string are not supported in C# 10.0. Please use language version 11.0 or greater.*
- **CS9014**: *Use of possibly unassigned auto-implemented property 'name'. Consider updating to language version 'version' to auto-default the property.*
- **CS9015**: *Use of possibly unassigned field 'name'. Consider updating to language version 'version' to auto-default the field.*
- **CS9016**: *Use of possibly unassigned auto-implemented property 'name'. Consider updating to language version 'version' to auto-default the property.*
- **CS9017**: *Use of possibly unassigned field 'name'. Consider updating to language version 'version' to auto-default the field.*
- **CS9041**: *'type' requires compiler feature 'feature', which is not supported by this version of the C# compiler.*
- **CS9058**: *Feature is not available in C# 11. Please use language version 12 or greater.*
- **CS9064**: *Target runtime doesn't support ref fields.*
- **CS9103**: *'type' is defined in a module with an unrecognized RefSafetyRulesAttribute version, expecting '11'.*
- **CS9171**: *Target runtime doesn't support inline array types.*
- **CS9194**: *Argument may not be passed with the 'ref' keyword. To pass 'ref' arguments to 'in' parameters, upgrade to language version 12 or greater.*
- **CS9202**: *Feature is not available in C# 12.0. Please use language version 13 or greater.*
- **CS9204**: *'type' is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.*
- **CS9211**: *The diagnosticId argument to the 'Experimental' attribute must be a valid identifier.*
- **CS9240**: *Target runtime doesn't support by-ref-like generics.*
- **CS9260**: *Feature is not available in C# 13.0. Please use language version 14 or greater.*
- **CS9268**: *'type' is for evaluation purposes only and is subject to change or removal in future updates: 'message'. Suppress this diagnostic to proceed.*
- **CS9269**: *UnscopedRefAttribute is only valid in C# 11 or later or when targeting net7.0 or later.*
- **CS9271**: *The type 'Microsoft.CodeAnalysis.EmbeddedAttribute' must be non-generic, internal, non-file, sealed, non-static, have a parameterless constructor, inherit from System.Attribute, and be able to be applied to any type.*
- **CS9327**: *Feature 'feature' is not available in C# 14.0. Please use language version `version` or greater.*
- **CS9328**: *Method 'method' uses a feature that is not supported by runtime async currently. Opt the method out of runtime async by attributing it with 'System.Runtime.CompilerServices.RuntimeAsyncMethodGenerationAttribute(false)'.*
- **CS9346**: *Update requires emitting explicit interface implementation, which is not supported by the runtime without restarting the application.*
- **CS9352**: *The target runtime does not support extended layout types.*
- **CS9399**: *Feature 'feature' is not available in C# 15.0. Please use language version 'version' or greater.*

The cause behind all these errors and warnings is that either the compiler or the runtime doesn't support a feature you're using. The resolution depends on whether the issue is a language version configuration problem, a language version mismatch, a runtime limitation, or an experimental feature.
