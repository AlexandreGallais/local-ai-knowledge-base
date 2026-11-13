---
title: "Attributes interpreted by the compiler: Pseudo-attributes"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/attributes/pseudo-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom attributes that generate flags or options in the Intermediate Language (IL) output

Add these attributes to your code for the compiler to emit a specified Intermediate Language (IL) modifier. These attributes instruct the compiler to include the corresponding IL modifier in the output.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

| Attribute                                                                            | Modifier        | Comments  |
|--------------------------------------------------------------------------------------|-----------------|-----------|
| `System.Runtime.InteropServices.ComImportAttribute`    | `import`        |           |
| `System.Runtime.InteropServices.DllImportAttribute`    | `pinvokeimpl`   | You can add options listed in the constructor. |
| `System.Runtime.InteropServices.FieldOffsetAttribute`  | `.field`        | This sets the field offset for memory layout.  |
| `System.Runtime.InteropServices.MarshalAsAttribute`                             | `marshal`       | You can set options listed in the constructor. |
| `System.Runtime.CompilerServices.MethodImplAttribute`  | `flag`          | Constructor arguments specify specific named flags such as `aggressiveinlining` or `forwardref`. These flags also specify the `native`, `managed`, or `optil` modifiers for the `System.Runtime.CompilerServices.MethodCodeType` field. |
| `System.NonSerializedAttribute`                        | `notserialized` |           |
| `System.Runtime.InteropServices.OptionalAttribute`     | `[opt]`         |           |
| `System.Runtime.InteropServices.PreserveSigAttribute`  | `preservesig`   |           |
| `System.SerializableAttribute`                         | `serializable`  |           |
| `System.Runtime.InteropServices.StructLayoutAttribute` | `auto`, `sequential`, or `explicit` | Layout options can be set using the parameters. |
| `System.Runtime.CompilerServices.IndexerNameAttribute` |                 | Add this attribute to an indexer to set a different method name. By default, indexers are compiled to a property named `Item`. You can specify a different name using this attribute. |

> **Important:**
> The [`StructLayoutAttribute`] can't be combined with the `ExtendedLayout` attribute.

Some of these custom attributes are applied by using other C# syntax rather than adding the attribute to your source code.

| Attribute                                                                                        | Comments |
|--------------------------------------------------------------------------------------------------|----------|
| `System.Runtime.InteropServices.DefaultParameterValueAttribute`    | Specifies the default value for the parameter. Use the default parameter syntax. |
| `System.Runtime.InteropServices.InAttribute`                       | Specifies the IL `[in]` modifier. Use the `in` or `ref readonly` modifiers. |
| `System.Runtime.InteropServices.OutAttribute`                       | Specifies the IL `[out]` modifier. Use the `out` modifier. |
| `System.Runtime.CompilerServices.SpecialNameAttribute`             | Specifies the IL `specialname` modifier. The compiler automatically adds this modifier for methods that require it. |
| `System.Runtime.InteropServices.UnmanagedCallersOnlyAttribute` | This attribute is required for the `delegate*` feature. The compiler adds it to any `delegate*` that requires its use. However, you must add this attribute to any method declaration when that method is assigned to a function pointer. |

The following attributes are generally disallowed in C# source. They're listed here to aid library authors who use reflection, and to ensure you don't create custom attributes with the same fully qualified name.

| Attribute                                                                                        | Comments  |
|--------------------------------------------------------------------------------------------------|---------|
| `System.Runtime.CompilerServices.CompilerFeatureRequiredAttribute` | Prevents downlevel compilers from using metadata they can't safely understand. |
| `System.Runtime.CompilerServices.DecimalConstantAttribute`         | Encodes `const decimal` fields. The runtime doesn't support `decimal` values as constant values. |
| `System.Reflection.DefaultMemberAttribute`                         | Encodes indexers with `System.Runtime.CompilerServices.IndexerNameAttribute`. This attribute notes the default indexer when its name is different than `Item`. This attribute is allowed in source. |
| `System.Runtime.CompilerServices.DynamicAttribute`                 | Encodes whether a type in a signature is `dynamic` (versus `object`). |
| `System.Runtime.CompilerServices.ExtensionAttribute`               | This attribute notes extension methods. The compiler also places this attribute on the containing classes. |
| `System.Runtime.CompilerServices.FixedBufferAttribute`             | This attribute specifies `fixed` struct fields. |
| `System.Runtime.CompilerServices.IsByRefLikeAttribute`             | This attribute specifies a `ref` struct. |
| `System.Runtime.CompilerServices.IsReadOnlyAttribute`              | This attribute indicates that a parameter has the `in` modifier. It distinguishes `in` parameters from `readonly ref` or `[In] ref`. |
| `System.Runtime.CompilerServices.RequiresLocationAttribute`        | This attribute indicates that a parameter has the `readonly ref` modifier. It distinguishes `readonly ref` from `in` or `[In] ref`. |
| `System.Runtime.CompilerServices.IsUnmanagedAttribute`             | This attribute specifies the `unmanaged` constraint on a type parameter. |
| `System.Runtime.CompilerServices.NullableAttribute`, `System.Runtime.CompilerServices.NullableContextAttribute`, `System.Runtime.CompilerServices.NullablePublicOnlyAttribute` | These attributes encode nullable annotations in your source code. |
| `System.ParamArrayAttribute`                                       | This attribute encodes the `params` modifier on array parameters. |
| `System.Runtime.CompilerServices.ParamCollectionAttribute`         | This attribute encodes the `params` modifier on non-array parameters. |
| `System.Runtime.CompilerServices.RefSafetyRulesAttribute`          | This attribute specifies the C# version that is required in order to understand ref safety annotations in the assembly. Ref safety rules evolve as C# gets new features. |
| `System.Runtime.CompilerServices.RequiredMemberAttribute`          | This attribute indicates that the `required` modifier was placed on a member declaration. It's the encoding of the required members language feature. |
| `System.Runtime.CompilerServices.TupleElementNamesAttribute`       | This attribute encodes tuple element names used in signatures. |

In addition, the compiler can generate a declaration for other attributes used internally. The compiler generates these attributes in the `System.Runtime.CompilerServices` namespace for its own use. Some aren't in the .NET Runtime libraries. Instead, the compiler synthesizes a definition for an `internal` type declaration in any assembly where the attribute is needed.
