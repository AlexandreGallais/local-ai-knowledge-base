---
title: "Prepare .NET libraries for trimming (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/deploying/trimming/prepare-libraries-for-trimming.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Prepare .NET libraries for trimming (part 2 of 2)

## Resolve warnings for non-analyzable patterns

It's better to resolve warnings by expressing the intent of your code using `[RequiresUnreferencedCode]` and `DynamicallyAccessedMembers` when possible. However, in some cases, you might be interested in enabling trimming of a library that uses patterns that can't be expressed with those attributes, or without refactoring existing code. This section describes some advanced ways to resolve trim analysis warnings.

> **Warning:**
> These techniques might change the behavior or your code or result in runtime exceptions if used incorrectly.

### UnconditionalSuppressMessage

Consider code that:

* The intent can't be expressed with the annotations.
* Generates a warning but doesn't represent a real issue at runtime.

The warnings can be suppressed by `System.Diagnostics.CodeAnalysis.UnconditionalSuppressMessageAttribute`. This is similar to `SuppressMessageAttribute`, but it's persisted in IL and respected during trim analysis.

> **Warning:**
> When suppressing warnings, you are responsible for guaranteeing the trim compatibility of the code based on invariants that you know to be true by inspection and testing. Use caution with these annotations, because if they are incorrect, or if invariants of your code change, they might end up hiding incorrect code.

For example:

```csharp
class TypeCollection
{
    Type[] types;

    // Ensure that only types with preserved constructors are stored in the array
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)]
    public Type this[int i]
    {
        // warning IL2063: TypeCollection.Item.get: Value returned from method
        // 'TypeCollection.Item.get' can't be statically determined and may not meet
        // 'DynamicallyAccessedMembersAttribute' requirements.
        get => types[i];
        set => types[i] = value;
    }
}

class TypeCreator
{
    TypeCollection types;

    public void CreateType(int i)
    {
        types[i] = typeof(TypeWithConstructor);
        Activator.CreateInstance(types[i]); // No warning!
    }
}

class TypeWithConstructor
{
}
```
In the preceding code, the indexer property has been annotated so that the returned `Type` meets the requirements of `CreateInstance`. This ensures that the `TypeWithConstructor` constructor is kept, and that the call to `CreateInstance` doesn't warn. The indexer setter annotation ensures that any types stored in the `Type[]` have a constructor. However, the analysis isn't able to see this and produces a warning for the getter, because it doesn't know that the returned type has its constructor preserved.

If you're sure that the requirements are met, you can silence this warning by adding `[UnconditionalSuppressMessage]` to the getter:

```csharp
class TypeCollection
{
    Type[] types;

    // Ensure that only types with preserved constructors are stored in the array
    [DynamicallyAccessedMembers(DynamicallyAccessedMemberTypes.PublicParameterlessConstructor)]
    public Type this[int i]
    {
        [UnconditionalSuppressMessage("ReflectionAnalysis", "IL2063",
            Justification = "The list only contains types stored through the annotated setter.")]
        get => types[i];
        set => types[i] = value;
    }
}

class TypeCreator
{
    TypeCollection types;

    public void CreateType(int i)
    {
        types[i] = typeof(TypeWithConstructor);
        Activator.CreateInstance(types[i]); // No warning!
    }
}

class TypeWithConstructor
{
}
```
It's important to underline that it's only valid to suppress a warning if there are annotations or code that ensure the reflected-on members are visible targets of reflection. It isn't sufficient that the member was a target of a call, field, or property access. It might appear to be the case sometimes, but such code is bound to break eventually as more trimming optimizations are added. Properties, fields, and methods that aren't visible targets of reflection could be inlined, have their names removed, get moved to different types, or otherwise be optimized in ways that break reflecting on them. When suppressing a warning, it's only permissible to reflect on targets that were visible targets of reflection to the trimming analyzer elsewhere.

```csharp
// Invalid justification and suppression: property being non-reflectively
// used by the app doesn't guarantee that the property will be available
// for reflection. Properties that are not visible targets of reflection
// are already optimized away with Native AOT trimming and may be
// optimized away for non-native deployment in the future as well.
[UnconditionalSuppressMessage("ReflectionAnalysis", "IL2063",
    Justification = "*INVALID* Only need to serialize properties that are used by"
                    + "the app. *INVALID*")]
public string Serialize(object o)
{
    StringBuilder sb = new StringBuilder();
    foreach (var property in o.GetType().GetProperties())
    {
        AppendProperty(sb, property, o);
    }
    return sb.ToString();
}
```
### DynamicDependency

The `[DynamicDependency]` attribute can be used to indicate that a member has a dynamic dependency on other members. This results in the referenced members being kept whenever the member with the attribute is kept, but doesn't silence warnings on its own. Unlike the other attributes, which inform the trim analysis about the reflection behavior of the code, `[DynamicDependency]` only keeps other members. This can be used together with `[UnconditionalSuppressMessage]` to fix some analysis warnings.

> **Warning:**
> Use `[DynamicDependency]` attribute only as a last resort when the other approaches aren't viable. It is preferable to express the reflection behavior using `[RequiresUnreferencedCode]` or `[DynamicallyAccessedMembers]`.

```csharp
[DynamicDependency("Helper", "MyType", "MyAssembly")]
static void RunHelper()
{
    var helper = Assembly.Load("MyAssembly").GetType("MyType").GetMethod("Helper");
    helper.Invoke(null, null);
}
```
Without `DynamicDependency`, trimming might remove `Helper` from `MyAssembly` or remove `MyAssembly` completely if it's not referenced elsewhere, producing a warning that indicates a possible failure at runtime. The attribute ensures that `Helper` is kept.

The attribute specifies the members to keep via a `string` or via `DynamicallyAccessedMemberTypes`. The type and assembly are either implicit in the attribute context, or explicitly specified in the attribute (by `Type`, or by `string`s for the type and assembly name).

The type and member strings use a variation of the C# documentation comment ID string format, without the member prefix. The member string shouldn't include the name of the declaring type, and might omit parameters to keep all members of the specified name. Some examples of the format are shown in the following code:

```csharp
[DynamicDependency("MyMethod()")]
[DynamicDependency("MyMethod(System,Boolean,System.String)")]
[DynamicDependency("MethodOnDifferentType()", typeof(ContainingType))]
[DynamicDependency("MemberName")]
[DynamicDependency("MemberOnUnreferencedAssembly", "ContainingType"
                                                 , "UnreferencedAssembly")]
[DynamicDependency("MemberName", "Namespace.ContainingType.NestedType", "Assembly")]
// generics
[DynamicDependency("GenericMethodName``1")]
[DynamicDependency("GenericMethod``2(``0,``1)")]
[DynamicDependency(
    "MethodWithGenericParameterTypes(System.Collections.Generic.List{System.String})")]
[DynamicDependency("MethodOnGenericType(`0)", "GenericType`1", "UnreferencedAssembly")]
[DynamicDependency("MethodOnGenericType(`0)", typeof(GenericType<>))]
```
The `[DynamicDependency]` attribute is designed to be used in cases where a method contains reflection patterns that can't be analyzed even with the help of `DynamicallyAccessedMembersAttribute`.
