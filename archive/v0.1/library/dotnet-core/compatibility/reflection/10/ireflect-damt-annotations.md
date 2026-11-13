---
title: "Breaking change: More restricted annotations on InvokeMember/FindMembers/DeclaredMembers"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/reflection/10/ireflect-damt-annotations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# More restricted annotations on InvokeMember/FindMembers/DeclaredMembers

Starting in .NET 10, the `System.Reflection` APIs `System.Reflection.IReflect.InvokeMember*`, `System.Type.FindMembers*`, and `System.Reflection.TypeInfo.DeclaredMembers` use more restricted annotations instead of `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All`.

This change affects scenarios where developers implement the `System.Reflection.IReflect` interface or derive from `System.Reflection.TypeInfo`. The previous use of `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All` was overly permissive and could lead to unintended behavior, such as capturing interface methods implemented by a class or generating warnings due to unsafe reflection calls.

## Version introduced

.NET 10

## Previous behavior

Previously, the affected APIs used the `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All` annotation, which was overly permissive. This could result in capturing additional members, such as interface methods implemented by a class, and potentially cause runtime warnings or unsafe reflection calls.

## New behavior

The affected APIs now use more restricted annotations, which provide better control over the members captured during reflection.

## Type of breaking change

This change is a behavioral change and can affect source compatibility.

## Reason for change

The change was introduced to improve the accuracy of annotations in `System.Reflection` APIs and to address issues caused by the overly permissive `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All` annotation. This ensures better compatibility with trimming and reflection scenarios, reduces runtime warnings, and prevents unsafe reflection calls.

## Recommended action

If you implement `System.Reflection.IReflect` or derive from `System.Reflection.TypeInfo`, review your code and update annotations to align with the new behavior. Specifically:

1. Replace `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.All` annotations with more restricted annotations, such as `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.PublicMethods`, `System.Diagnostics.CodeAnalysis.DynamicallyAccessedMemberTypes.NonPublicMethods`, or other appropriate types.

   The following code snippet shows an example.

   ```csharp
   class MyType : IReflect
   {
       [DynamicallyAccessedMembers(
           DynamicallyAccessedMemberTypes.PublicFields | DynamicallyAccessedMemberTypes.NonPublicFields |
           DynamicallyAccessedMemberTypes.PublicMethods | DynamicallyAccessedMemberTypes.NonPublicMethods |
           DynamicallyAccessedMemberTypes.PublicProperties | DynamicallyAccessedMemberTypes.NonPublicProperties |
           DynamicallyAccessedMemberTypes.PublicConstructors | DynamicallyAccessedMemberTypes.NonPublicConstructors)]
        public object InvokeMember(string name, BindingFlags invokeAttr, Binder? binder, object? target,
            object?[]? args, ParameterModifier[]? modifiers, CultureInfo? culture, string[]? namedParameters)
        { }
   }
   ```

1. Test reflection scenarios to ensure that the updated annotations capture the intended members and don't introduce runtime errors or warnings.

For more information on `DynamicallyAccessedMembers` annotations and their usage, see Prepare .NET libraries for trimming.

## Affected APIs

- `System.Reflection.IReflect.InvokeMember(System.String,System.Reflection.BindingFlags,System.Reflection.Binder,System.Object,System.Object[],System.Reflection.ParameterModifier[],System.Globalization.CultureInfo,System.String[])`
- `System.Type.FindMembers(System.Reflection.MemberTypes,System.Reflection.BindingFlags,System.Reflection.MemberFilter,System.Object)`
- `System.Reflection.TypeInfo.DeclaredMembers`
