---
title: "Generics and attributes"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/advanced-topics/reflection-and-attributes/generics-and-attributes.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generics and Attributes

Attributes can be applied to generic types in the same way as nongeneric types. However, you can apply attributes only on *open generic types* and *closed constructed generic types*, not on *partially constructed generic types*. An *open generic type* is one where none of the type arguments are specified, such as `Dictionary<TKey, TValue>` A *closed constructed generic type* specifies all type arguments, such as `Dictionary<string, object>`. A *partially constructed generic type* specifies some, but not all, type arguments. An example is `Dictionary<string, TValue>`. An *unbound generic type* is one where type arguments are omitted, such as `Dictionary<,>`.

The following examples use this custom attribute:

```csharp
class CustomAttribute : Attribute
{
    public object? info;
}
```
An attribute can reference an unbound generic type:

```csharp
public class GenericClass1<T> { }

[CustomAttribute(info = typeof(GenericClass1<>))]
class ClassA { }
```
Specify multiple type parameters using the appropriate number of commas. In this example, `GenericClass2` has two type parameters:

```csharp
public class GenericClass2<T, U> { }

[CustomAttribute(info = typeof(GenericClass2<,>))]
class ClassB { }
```
An attribute can reference a closed constructed generic type:

```csharp
public class GenericClass3<T, U, V> { }

[CustomAttribute(info = typeof(GenericClass3<int, double, string>))]
class ClassC { }
```
An attribute that references a generic type parameter causes a compile-time error:

```csharp
[CustomAttribute(info = typeof(GenericClass3<int, T, string>))]  //Error CS0416
class ClassD<T> { }
```

A generic type can inherit from `System.Attribute`:

```csharp
public class CustomGenericAttribute<T> : Attribute { }
```
To obtain information about a generic type or type parameter at run time, you can use the methods of `System.Reflection`. For more information, see Generics and Reflection.

## See also

- Generics
- Attributes
