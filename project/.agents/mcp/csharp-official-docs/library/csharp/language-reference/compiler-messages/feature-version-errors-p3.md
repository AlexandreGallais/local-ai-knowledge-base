---
title: "Resolve errors related to language version and features (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/compiler-messages/feature-version-errors.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Resolve errors related to language version and features (part 3 of 3)

## Target runtime doesn't support feature

- **CS8021**: *No value for RuntimeMetadataVersion found.*
- **CS8701**: *Target runtime doesn't support default interface implementation.*
- **CS8702**: *'member' cannot implement interface member in type because the target runtime doesn't support default interface implementation.*
- **CS8707**: *Target runtime doesn't support 'protected', 'protected internal', or 'private protected' accessibility for a member of an interface.*
- **CS8830**: *Target runtime doesn't support covariant return types in overrides.*
- **CS8831**: *Target runtime doesn't support covariant types in overrides.*
- **CS8889**: *The target runtime doesn't support extensible or runtime-environment default calling conventions.*
- **CS8919**: *Target runtime doesn't support static abstract members in interfaces.*
- **CS8929**: *'method' cannot implement interface member 'member' in type 'type' because the target runtime doesn't support static abstract members in interfaces.*
- **CS9041**: *'type' requires compiler feature 'feature', which is not supported by this version of the C# compiler.*
- **CS9064**: *Target runtime doesn't support ref fields.*
- **CS9103**: *'type' is defined in a module with an unrecognized RefSafetyRulesAttribute version, expecting '11'.*
- **CS9171**: *Target runtime doesn't support inline array types.*
- **CS9240**: *Target runtime doesn't support by-ref-like generics.*
- **CS9328**: *Method 'method' uses a feature that is not supported by runtime async currently. Opt the method out of runtime async by attributing it with 'System.Runtime.CompilerServices.RuntimeAsyncMethodGenerationAttribute(false)'.*
- **CS9346**: *Update requires emitting explicit interface implementation, which is not supported by the runtime without restarting the application.*
- **CS9352**: *The target runtime does not support extended layout types.*

These errors generally require support from the target runtime (specified by `<TargetFramework>`), not just a newer `<LangVersion>`. One exception is non-virtual static interface members: starting with C# 15, declaring and using them no longer requires default-interface-implementation runtime support. If CS8701 occurs for such a member, an SDK that supports C# 15 and `<LangVersion>15.0</LangVersion>` can resolve it without changing the target framework. Instance default implementations, static abstract or virtual members, and protected interface-member accessibility retain their runtime requirements. For more information, see Static interface members and runtime support.

Upgrade the `<TargetFramework>` in your project file to a version that supports the required feature. The following list shows which features require which minimum runtime:

- Default interface implementation, including protected access (**CS8701**, **CS8702**, **CS8707**): Requires .NET Core 3.0 / .NET 5+.
- Static abstract members in interfaces (**CS8919**, **CS8929**): Requires .NET 7+.
- Covariant return types (**CS8830**, **CS8831**): Requires .NET 5+.
- Ref fields (**CS9064**): Requires .NET 7+.
- Inline array types (**CS9171**): Requires .NET 8+.
- By-ref-like generics (**CS9240**): Requires .NET 9+.
- Extended layout types (**CS9352**): Requires .NET 10+.
- Extensible calling conventions (**CS8889**): Requires .NET 5+.
- Runtime async features (**CS9328**): Requires .NET 10+.

Update the .NET SDK if the compiler itself doesn't support a required compiler feature (**CS9041**). This error indicates that a referenced library uses metadata features that require a newer compiler version.

Ensure a valid reference to the core runtime library exists (**CS8021**). This warning typically appears when building without a standard runtime reference. Specify a `RuntimeMetadataVersion` option or add a reference to an assembly containing `System.Object`.

Resolve `RefSafetyRulesAttribute` version mismatches by recompiling dependent modules with a compatible compiler version (**CS9103**).

Restart the application if you encounter this error during hot reload (**CS9346**). Some edit-and-continue changes require restarting because the runtime can't emit the required explicit interface implementations dynamically.

## Function pointer and calling convention errors

- **CS8888**: *'managed' calling convention cannot be combined with unmanaged calling convention specifiers.*
- **CS8889**: *The target runtime doesn't support extensible or runtime-environment default calling conventions.*
- **CS8890**: *Type 'type' is not defined.*
- **CS8891**: *Type 'type' must be public to be used as a calling convention.*

These errors relate to function pointer declarations and their calling convention specifiers, introduced in C# 9.

Remove `managed` from calling convention specifier lists that also include unmanaged specifiers (**CS8888**). The `managed` calling convention is the default and can't be combined with `unmanaged` specifiers such as `Cdecl`, `Stdcall`, `Thiscall`, or `Fastcall`.

Upgrade the target framework to .NET 5 or later to use extensible or runtime-default calling conventions (**CS8889**). The `UnmanagedCallersOnly` attribute and extensible calling convention types require runtime support that isn't available in .NET Core 3.1 or earlier.

Ensure the calling convention type exists in the referenced assemblies (**CS8890**). Calling convention types such as `CallConvCdecl`, `CallConvStdcall`, `CallConvThiscall`, and `CallConvFastcall` are defined in `System.Runtime.CompilerServices`. If the type isn't found, add a reference to the correct runtime library.

Make custom calling convention types `public` (**CS8891**). If you define a custom calling convention type, declare it as `public` to use it in a function pointer type declaration.

## Experimental and preview features

- **CS8058**: *Feature 'feature' is experimental and unsupported; use '/features:feature' to enable.*
- **CS8305**: *'type' is for evaluation purposes only and is subject to change or removal in future updates.*
- **CS8652**: *The feature 'feature' is currently in Preview and \*unsupported\*. To use Preview features, use the `preview` language version.*
- **CS9204**: *'type' is for evaluation purposes only and is subject to change or removal in future updates. Suppress this diagnostic to proceed.*
- **CS9211**: *The diagnosticId argument to the 'Experimental' attribute must be a valid identifier.*
- **CS9268**: *'type' is for evaluation purposes only and is subject to change or removal in future updates: 'message'. Suppress this diagnostic to proceed.*

These diagnostics indicate that you're using an experimental compiler feature, a preview language feature, or a symbol marked as experimental.

> **Warning:**
> Experimental features are subject to change. The APIs might change, or they might be removed in future updates. Including experimental features is a way for library authors to get feedback on ideas and concepts for future development. Use extreme caution when using any feature marked as experimental.

Set `<LangVersion>preview</LangVersion>` in your project file to use preview language features (**CS8652**). Preview features aren't yet finalized and might change in future releases.

Enable the named experimental compiler feature with `/features:<feature>`, as directed in the **CS8058** message.

**CS8305** indicates that the symbol is marked with `Windows.Foundation.Metadata.ExperimentalAttribute`. Suppress **CS8305** only when you accept that the marked symbol can change or be removed.

If you're consuming an API marked with `System.Diagnostics.CodeAnalysis.ExperimentalAttribute`, suppress a valid reported diagnostic ID only when you accept that the API can change or be removed. Use `#pragma warning disable` or add the ID to `<NoWarn>` in your project file. Diagnostic IDs read from metadata aren't revalidated. An invalid ID, such as one that contains a space, can be reported but might not be suppressible with `#pragma`. In that case, contact the API author or update the dependency.

If you're authoring an experimental API, the compiler reports the `diagnosticId` from `System.Diagnostics.CodeAnalysis.ExperimentalAttribute` when it isn't null, empty, or composed only of whitespace. Otherwise, the compiler reports **CS9204** if `Message` is null or empty and **CS9268** otherwise.

For an attribute declared in source, an invalid `diagnosticId` also produces **CS9211** at the attribute declaration. Ensure the ID is a valid C# identifier: It must start with an underscore or a Unicode letter. Each later character must be a Unicode letter, decimal digit, connecting character such as an underscore, combining character, or formatting character. Because metadata IDs aren't revalidated, API authors should always choose a valid ID. You can declare your own experimental APIs by using the `System.Diagnostics.CodeAnalysis.ExperimentalAttribute`.

## Breaking changes on struct initialization

- **CS0171**, **CS8881**: *Field 'name' must be fully assigned before control is returned to the caller. Consider updating to language version 'version' to auto-default the field.*
- **CS0188**, **CS8885**: *The 'this' object cannot be used before all of its fields have been assigned. Consider updating to language version 'version' to auto-default the unassigned fields.*
- **CS0843**, **CS8880**: *Auto-implemented property 'name' must be fully assigned before control is returned to the caller. Consider updating to language version 'version' to auto-default the property.*
- **CS9014**: *Use of possibly unassigned auto-implemented property 'name'. Consider updating to language version 'version' to auto-default the property.*
- **CS9015**: *Use of possibly unassigned field 'name'. Consider updating to language version 'version' to auto-default the field.*
- **CS9016**: *Use of possibly unassigned auto-implemented property 'name'. Consider updating to language version 'version' to auto-default the property.*
- **CS9017**: *Use of possibly unassigned field 'name'. Consider updating to language version 'version' to auto-default the field.*

These errors and warnings help ensure that `struct` types are properly initialized before their fields are accessed. In earlier versions of C#, you must explicitly assign all fields in a struct in any constructor. The parameterless constructor initializes all fields to their default value. In later versions, all constructors initialize all fields. Either the field is explicitly set, set in a field initializer, or set to its default value.

Upgrade to C# 11 or later so that all `struct` constructors auto-default all fields (**CS0171**, **CS0188**, **CS0843**, and their newer counterparts **CS8880**, **CS8881**, **CS8885**). Starting in C# 11, the compiler automatically initializes any fields not explicitly set in a constructor to their default values.

Explicitly call the default constructor by using `: this()` in your struct constructor if you can't upgrade to C# 11 (**CS0171**, **CS0188**, **CS0843**). This approach ensures all fields receive their default values before your constructor body runs:

```csharp
struct S
{
    public int AIProp { get; set; }
    public S(int i) : this() // Ensures all fields are initialized
    {
        AIProp = i;
    }
}
```

Assign all fields and auto-properties before using `this` or before the constructor returns (**CS9014**, **CS9015**, **CS9016**, **CS9017**). These diagnostics appear when a newer compiler detects that you might be reading a property or field before it has been assigned. Either explicitly assign a value or upgrade to a version where auto-defaulting eliminates the warning.

## Implementation-specific attributes

- **CS9269**: *UnscopedRefAttribute is only valid in C# 11 or later or when targeting net7.0 or later.*
- **CS9271**: *The type 'Microsoft.CodeAnalysis.EmbeddedAttribute' must be non-generic, internal, non-file, sealed, non-static, have a parameterless constructor, inherit from System.Attribute, and be able to be applied to any type.*

These errors relate to attributes that are either compiler-generated or tied to specific runtime versions.

Upgrade to C# 11 and .NET 7 or later to use `UnscopedRefAttribute` (**CS9269**). This attribute indicates that a `ref` return or `ref struct` parameter doesn't have a scoped lifetime. It requires both the language version and the target framework to meet the minimum requirements.

Don't manually declare `Microsoft.CodeAnalysis.EmbeddedAttribute` (**CS9271**). The compiler generates the source for this attribute automatically when needed. If you have a manually declared type with this name, remove it or rename it to avoid conflicting with the compiler-generated version.
