---
title: "ref struct types"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/ref-struct.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `ref` structure types (C# reference)

Use the `ref` modifier when declaring a structure type. You allocate instances of a `ref struct` type on the stack, and they can't escape to the managed heap. To ensure this property, the compiler limits the usage of `ref struct` types as follows:

- You can't use a `ref struct` as the element type of an array.
- You can't declare a `ref struct` as the type of a field in a class or a non-`ref struct`.
- You can't box a `ref struct` to `System.ValueType` or `System.Object`.
- You can't capture a `ref struct` variable in a lambda expression or a local function.
- Before C# 13, you can't use `ref struct` variables in an `async` method. Beginning with C# 13, a `ref struct` variable can't be used in the same block as the `await` expression in an `async` method. However, you can use `ref struct` variables in synchronous methods, for example, in methods that return `System.Threading.Tasks.Task` or `System.Threading.Tasks.Task`1`.
- Before C# 13, you can't use a `ref struct` variable in iterators. Beginning with C# 13, `ref struct` types and `ref` locals can be used in iterators, provided they aren't in code segments with the `yield return` statement.
- Before C# 13, a `ref struct` can't implement interfaces. Beginning with C# 13, a `ref` struct can implement interfaces, but must adhere to the ref safety rules. For example, a `ref struct` type can't be converted to the interface type because that requires a boxing conversion.
- Before C# 13, a `ref struct` can't be a type argument. Beginning with C# 13, a `ref struct` can be the type argument when the type parameter specifies the `allows ref struct` in its `where` clause.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Typically, you define a `ref struct` type when you need a type that also includes data members of `ref struct` types:

```csharp
public ref struct CustomRef
{
    public bool IsValid;
    public Span<int> Inputs;
    public Span<int> Outputs;
}
```
To declare a `ref struct` as `readonly`, combine the `readonly` and `ref` modifiers in the type declaration (the `readonly` modifier must come before the `ref` modifier):

```csharp
public readonly ref struct ConversionRequest
{
    public ConversionRequest(double rate, ReadOnlySpan<double> values)
    {
        Rate = rate;
        Values = values;
    }

    public double Rate { get; }
    public ReadOnlySpan<double> Values { get; }
}
```
In .NET, examples of a `ref struct` are `System.Span`1` and `System.ReadOnlySpan`1`.

## `ref` fields

You can declare a `ref` field in a `ref struct`, as the following example shows:

```csharp
public ref struct RefFieldExample
{
    private ref int number;

    public int GetNumber()
    {
        if (System.Runtime.CompilerServices.Unsafe.IsNullRef(ref number))
        {
            throw new InvalidOperationException("The number ref field is not initialized.");
        }

        return number;
    }
}
```
A `ref` field can have the `null` value. Use the `System.Runtime.CompilerServices.Unsafe.IsNullRef``1(``0@)` method to determine if a `ref` field is `null`.

You can apply the `readonly` modifier to a `ref` field in the following ways:

- `readonly ref`: You can ref reassign this field by using the `= ref` operator only inside a constructor or an `init` accessor. You can assign a value with the `=` operator at any point allowed by the field access modifier.
- `ref readonly`: At any point, you can't assign a value with the `=` operator to this field. However, you can ref reassign the field by using the `= ref` operator.
- `readonly ref readonly`: You can only ref reassign this field in a constructor or an `init` accessor. At any point, you can't assign a value to the field.

The compiler ensures that a reference stored in a `ref` field doesn't outlive its referent.

The `ref` fields feature enables a safe implementation of types like `System.Span`1`:

```csharp
public readonly ref struct Span<T>
{
    internal readonly ref T _reference;
    private readonly int _length;

    // Omitted for brevity...
}
```

The `Span<T>` type stores a reference through which it accesses the contiguous elements in memory. By using a reference, a `Span<T>` instance avoids copying the storage it refers to.

## The disposable pattern

You can define a disposable `ref struct`. To do that, ensure that a `ref struct` fits the disposable pattern. That is, it has an instance `Dispose` method that's accessible, parameterless, and has a `void` return type. You can use the using statement or declaration with an instance of a disposable `ref struct`.

Beginning with C# 13, you can also implement the `System.IDisposable` on `ref struct` types. However, overload resolution prefers the disposable pattern to the interface method. The compiler resolves to an `IDisposable.Dispose` method only when a suitable `Dispose` method isn't found.

## Restrictions for `ref struct` types that implement an interface

These restrictions ensure that a `ref struct` type that implements an interface follows the necessary ref safety rules.

- You can't convert a `ref struct` to an instance of an interface it implements. This restriction includes the implicit conversion when you use a `ref struct` type as an argument and the parameter is an interface type. The conversion results in a boxing conversion, which violates ref safety. A `ref struct` can declare methods as explicit interface declarations. However, you can access those methods only from generic methods where the type parameter `allows ref struct` types.
- A `ref struct` that implements an interface *must* implement all instance interface members. The `ref struct` must implement instance members even when the interface includes a default implementation.

The compiler enforces these restrictions. If you write `ref struct` types that implement interfaces, each new update might include new default interface members. Until you provide an implementation for any new instance methods, your application doesn't compile. You can't provide a specific implementation for a `static` interface method with a default implementation.

> **Important:**
> Implementing an interface with a `ref struct` type introduces the potential for later source-breaking and binary-breaking changes. The break occurs if a `ref struct` implements an interface defined in another assembly, and that assembly provides an update that adds default members to that interface.
>
> The source break happens when you recompile the `ref struct`: It must implement the new member, even though there's a default implementation.
>
> The binary break happens if you upgrade the external assembly without recompiling the `ref struct` type *and* the updated code calls the default implementation of the new method. The runtime throws an exception when the default member is accessed.

## C# language specification

For more information, see the following sections of the C# language specification:

- Structs: Ref modifier
- Safe context constraint for ref struct types

For more information about `ref` fields, see Ref fields in the C# language specification.

## See also

- The C# type system
