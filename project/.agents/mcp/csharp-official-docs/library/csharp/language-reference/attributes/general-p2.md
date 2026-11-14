---
title: "Attributes interpreted by the compiler: Miscellaneous (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/attributes/general.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Attributes interpreted by the compiler: Miscellaneous (part 2 of 3)

## `AttributeUsage` attribute

The `AttributeUsage` attribute determines how a custom attribute class can be used. `System.AttributeUsageAttribute` is an attribute you apply to custom attribute definitions. The `AttributeUsage` attribute enables you to control:

- Which program elements the attribute can be applied to. Unless you restrict its usage, an attribute can be applied to any of the following program elements:
  - Assembly
  - Module
  - Field
  - Event
  - Constructor
  - Method
  - Parameter
  - Property
  - Return
  - Type
- Whether an attribute can be applied to a single program element multiple times.
- Whether derived classes inherit attributes.

The default settings look like the following example when applied explicitly:

```csharp
﻿namespace AttributeExamples
{
    namespace VersionOne
    {
        [AttributeUsage(AttributeTargets.All,
                           AllowMultiple = false,
                           Inherited = true)]
        class NewAttribute : Attribute { }
    }
    namespace VersionTwo
    {
        [AttributeUsage(AttributeTargets.All)]
        class NewAttribute : Attribute { }
    }
}
```
In this example, the `NewAttribute` class can be applied to any supported program element. But it can be applied only once to each entity. Derived classes inherit the attribute applied to a base class.

The `System.AttributeUsageAttribute.AllowMultiple` and `System.AttributeUsageAttribute.Inherited` arguments are optional, so the following code has the same effect:

```csharp
﻿namespace AttributeExamples
{
    namespace VersionOne
    {
        [AttributeUsage(AttributeTargets.All,
                           AllowMultiple = false,
                           Inherited = true)]
        class NewAttribute : Attribute { }
    }
    namespace VersionTwo
    {
        [AttributeUsage(AttributeTargets.All)]
        class NewAttribute : Attribute { }
    }
}
```
The first `System.AttributeUsageAttribute` argument must be one or more elements of the `System.AttributeTargets` enumeration. Multiple target types can be linked together with the OR operator, like the following example shows:

```csharp
﻿using System;

namespace AttributeExamples;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
class NewPropertyOrFieldAttribute : Attribute { }

class MyClass
{
    // Attribute attached to property:
    [NewPropertyOrField]
    public string Name { get; set; } = string.Empty;

    // Attribute attached to backing field:
    [field: NewPropertyOrField]
    public string Description { get; set; } = string.Empty;
}
```
Attributes can be applied to either the property or the backing field for an automatically implemented property. The attribute applies to the property, unless you specify the `field` specifier on the attribute. Both are shown in the following example:

```csharp
﻿using System;

namespace AttributeExamples;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field)]
class NewPropertyOrFieldAttribute : Attribute { }

class MyClass
{
    // Attribute attached to property:
    [NewPropertyOrField]
    public string Name { get; set; } = string.Empty;

    // Attribute attached to backing field:
    [field: NewPropertyOrField]
    public string Description { get; set; } = string.Empty;
}
```
If the `System.AttributeUsageAttribute.AllowMultiple` argument is `true`, then the resulting attribute can be applied more than once to a single entity, as shown in the following example:

```csharp
﻿namespace AttributeExamples;

[AttributeUsage(AttributeTargets.Class, AllowMultiple = true)]
class MultiUse : Attribute { }

[MultiUse]
[MultiUse]
class Class1 { }

[MultiUse, MultiUse]
class Class2 { }
```
In this case, `MultiUseAttribute` can be applied repeatedly because `AllowMultiple` is set to `true`. Both formats shown for applying multiple attributes are valid.

If `System.AttributeUsageAttribute.Inherited` is `false`, then derived classes don't inherit the attribute from an attributed base class. For example:

```csharp
﻿namespace attributes;

[AttributeUsage(AttributeTargets.Class, Inherited = false)]
class NonInheritedAttribute : Attribute { }

[NonInherited]
class BClass { }

class DClass : BClass { }
```
In this case, `NonInheritedAttribute` isn't applied to `DClass` via inheritance.

You can also use these keywords to specify where an attribute should be applied. For example, you can use the `field:` specifier to add an attribute to the backing field of an automatically implemented property. Or you can use the `field:`, `property:` or `param:` specifier to apply an attribute to any of the elements generated from a positional record. For an example, see Positional syntax for property definition.

When you apply an attribute to a type with a primary constructor, the attribute is applied to the class. You can specify that it's applied to the constructor by choosing the `method` target, which matches the *Constructor* attribute target.

## `AsyncMethodBuilder` attribute

You add the `System.Runtime.CompilerServices.AsyncMethodBuilderAttribute` attribute to a type that can be an async return type. The attribute specifies the type that builds the async method implementation when the specified type is returned from an async method. The `AsyncMethodBuilder` attribute can be applied to a type that:

* Has an accessible `GetAwaiter` method.
* The object returned by the `GetAwaiter` method implements the `System.Runtime.CompilerServices.ICriticalNotifyCompletion` interface.

The constructor to the `AsyncMethodBuilder` attribute specifies the type of the associated builder. The builder must implement the following accessible members:

* A static `Create()` method that returns the type of the builder.
* A readable `Task` property that returns the async return type.
* A `void SetException(Exception)` method that sets the exception when a task faults.
* A `void SetResult()` or `void SetResult(T result)` method that marks the task as completed and optionally sets the task's result
* A `Start` method with the following API signature:

  ```csharp
  public void Start<TStateMachine>(ref TStateMachine stateMachine)
            where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine
  ```

* A `SetStateMachine` method with the following API signature:

  ```csharp
  public void SetStateMachine(System.Runtime.CompilerServices.IAsyncStateMachine stateMachine)
  ```

* An `AwaitOnCompleted` method with the following signature:

  ```csharp
  public void AwaitOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)
      where TAwaiter : System.Runtime.CompilerServices.INotifyCompletion
      where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine
  ```

* An `AwaitUnsafeOnCompleted` method with the following signature:

  ```csharp
        public void AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)
            where TAwaiter : System.Runtime.CompilerServices.ICriticalNotifyCompletion
            where TStateMachine : System.Runtime.CompilerServices.IAsyncStateMachine
  ```

You can learn about async method builders by reading about the following builders supplied by .NET:

- `System.Runtime.CompilerServices.AsyncTaskMethodBuilder`
- `System.Runtime.CompilerServices.AsyncTaskMethodBuilder`1`
- `System.Runtime.CompilerServices.AsyncValueTaskMethodBuilder`
- `System.Runtime.CompilerServices.AsyncValueTaskMethodBuilder`1`

The `AsyncMethodBuilder` attribute can be applied to an async method to override the builder for that type.

## `InterpolatedStringHandler` and `InterpolatedStringHandlerArguments` attributes

You use these attributes to specify that a type is an *interpolated string handler*. The .NET 6 library already includes `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler` for scenarios where you use an interpolated string as the argument for a `string` parameter. You might have other instances where you want to control how interpolated strings are processed. You apply the `System.Runtime.CompilerServices.InterpolatedStringHandlerAttribute` to the type that implements your handler. You apply the `System.Runtime.CompilerServices.InterpolatedStringHandlerArgumentAttribute` to parameters of that type's constructor.

You can learn more about building an interpolated string handler in the interpolated string expression handlers clause of the C# standard.

## `ModuleInitializer` attribute

The `ModuleInitializer` attribute marks a method that the runtime calls when the assembly loads. `ModuleInitializer` is an alias for `System.Runtime.CompilerServices.ModuleInitializerAttribute`.

The `ModuleInitializer` attribute can only be applied to a method that:

* Is static.
* Is parameterless.
* Returns `void`.
* Is accessible from the containing module, that is, `internal` or `public`.
* Isn't a generic method.
* Isn't contained in a generic class.
* Isn't a local function.

The `ModuleInitializer` attribute can be applied to multiple methods. In that case, the order in which the runtime calls them is deterministic but not specified.

The following example illustrates use of multiple module initializer methods. The `Init1` and `Init2` methods run before `Main`, and each adds a string to the `Text` property. So when `Main` runs, the `Text` property already has strings from both initializer methods.

```csharp
﻿using System;

internal class ModuleInitializerExampleMain
{
    public static void Main()
    {
        Console.WriteLine(ModuleInitializerExampleModule.Text);
        //output: Hello from Init1! Hello from Init2!
    }
}
```
```csharp
﻿using System.Runtime.CompilerServices;

internal class ModuleInitializerExampleModule
{
    public static string? Text { get; set; }

    [ModuleInitializer]
    public static void Init1()
    {
        Text += "Hello from Init1! ";
    }

    [ModuleInitializer]
    public static void Init2()
    {
        Text += "Hello from Init2! ";
    }
}
```
Source code generators sometimes need to generate initialization code. Module initializers provide a standard place for that code. In most other cases, you should write a static constructor instead of a module initializer.

## `SkipLocalsInit` attribute

The `SkipLocalsInit` attribute prevents the compiler from setting the `.locals init` flag when emitting to metadata. The `SkipLocalsInit` attribute is a single-use attribute and can be applied to a method, a property, a class, a struct, an interface, or a module, but not to an assembly. `SkipLocalsInit` is an alias for `System.Runtime.CompilerServices.SkipLocalsInitAttribute`.

The `.locals init` flag causes the CLR to initialize all of the local variables declared in a method to their default values. Since the compiler also makes sure that you never use a variable before assigning some value to it, `.locals init` is typically not necessary. However, the extra zero-initialization might have measurable performance impact in some scenarios, such as when you use stackalloc to allocate an array on the stack. In those cases, you can add the `SkipLocalsInit` attribute. If applied to a method directly, the attribute affects that method and all its nested functions, including lambdas and local functions. If applied to a type or module, it affects all methods nested inside. This attribute doesn't affect abstract methods, but it does affect code generated for the implementation.

This attribute requires the AllowUnsafeBlocks compiler option. This requirement signals that in some cases code could view unassigned memory (for example, reading from uninitialized stack-allocated memory).

The following example illustrates the effect of `SkipLocalsInit` attribute on a method that uses `stackalloc`. The method displays whatever was in memory when the array of integers was allocated.

```csharp
﻿using System.Runtime.CompilerServices;

internal class SkipLocalsInitExample
{
    public static void Main()
    {
        ReadUninitializedMemory();
    }

    [SkipLocalsInit]
    static void ReadUninitializedMemory()
    {
        Span<int> numbers = stackalloc int[120];
        for (int i = 0; i < 120; i++)
        {
            Console.WriteLine(numbers[i]);
        }
    }
    // output depends on initial contents of memory, for example:
    //0
    //0
    //0
    //168
    //0
    //-1271631451
    //32767
    //38
    //0
    //0
    //0
    //38
    // Remaining rows omitted for brevity.
}
```
To try this code yourself, set the `AllowUnsafeBlocks` compiler option in your *.csproj* file:

```xml
<PropertyGroup>
  ...
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

## `UnscopedRef` attribute

The `UnscopedRef` attribute marks a variable declaration as unscoped, meaning the reference is allowed to escape.

You add this attribute where the compiler treats a `ref` as implicitly `scoped`:

- The `this` parameter for `struct` instance methods.
- `ref` parameters that refer to `ref struct` types.
- `out` parameters.

Applying the `System.Diagnostics.CodeAnalysis.UnscopedRefAttribute` marks the element as unscoped.
