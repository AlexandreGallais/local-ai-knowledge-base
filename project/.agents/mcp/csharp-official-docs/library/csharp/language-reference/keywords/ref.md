---
title: "The multiple uses of the `ref` keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/ref.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# The `ref` keyword

You use the `ref` keyword in the following contexts:

- In a method signature and in a method call, to pass an argument to a method by reference.
```csharp
public void M(ref int refParameter)
{
    refParameter += 42;
}
```
- In a method signature, to return a value to the caller by reference. For more information, see `ref return`.
```csharp
public ref int RefMax(ref int left, ref int right)
{
    if (left > right)
    {
        return ref left;
    }
    else
    {
        return ref right;
    }
}
```
- In a declaration of a local variable, to declare a reference variable.
```csharp
public void M2(int variable)
{
    ref int aliasOfvariable = ref variable;
}
```
- As the part of a conditional ref expression or a ref assignment operator.
```csharp
public ref int RefMaxConditions(ref int left, ref int right)
{
    ref int returnValue = ref left > right ? ref left : ref right;
    return ref returnValue;
}
```
- In a `struct` declaration, to declare a `ref struct`. For more information, see the `ref` structure types article.
```csharp
public ref struct CustomRef
{
    public ReadOnlySpan<int> Inputs;
    public ReadOnlySpan<int> Outputs;
}
```
- In a `ref struct` definition, to declare a `ref` field. For more information, see the `ref` fields section of the `ref` structure types article.
```csharp
public ref struct RefFieldExample
{
    private ref int number;
}
```
- In a generic type declaration to specify that a type parameter `allows ref struct` types.
```csharp
class RefStructGeneric<T, S>
    where T : allows ref struct
    where S : T
{
    // etc
}
```
