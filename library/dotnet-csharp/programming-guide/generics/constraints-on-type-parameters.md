---
title: "Constraints on type parameters (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/generics/constraints-on-type-parameters.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Constraints on type parameters (C# Programming Guide)

Constraints inform the compiler about the capabilities a type argument must have. Without any constraints, the type argument could be any type. The compiler can only assume the members of `System.Object`, which is the ultimate base class for any .NET type. For more information, see Why use constraints. If client code uses a type that doesn't satisfy a constraint, the compiler issues an error. Constraints are specified by using the `where` contextual keyword. The following table lists the various types of constraints:

|Constraint|Description|
|----------------|-----------------|
|`where T : struct`|The type argument must be a non-nullable value type, which includes `record struct` types. For information about nullable value types, see Nullable value types. Because all value types have an accessible parameterless constructor, either declared or implicit, the `struct` constraint implies the `new()` constraint and can't be combined with the `new()` constraint. You can't combine the `struct` constraint with the `unmanaged` constraint.|
|`where T : class`|The type argument must be a reference type. This constraint applies also to any class, interface, delegate, or array type. In a nullable context, `T` must be a non-nullable reference type. |
|`where T : class?`|The type argument must be a reference type, either nullable or non-nullable. This constraint applies also to any class, interface, delegate, or array type, including records.|
|`where T : notnull`|The type argument must be a non-nullable type. The argument can be a non-nullable reference type or a non-nullable value type. |
|`where T : unmanaged`|The type argument must be a non-nullable unmanaged type. The `unmanaged` constraint implies the `struct` constraint and can't be combined with either the `struct` or `new()` constraints.|
|`where T : new()`|The type argument must have a public parameterless constructor. When used together with other constraints, the `new()` constraint must be specified last. The `new()` constraint can't be combined with the `struct` and `unmanaged` constraints.|
|`where T :` *\<base class name>*|The type argument must be or derive from the specified base class. In a nullable context, `T` must be a non-nullable reference type derived from the specified base class. |
|`where T :` *\<base class name>?*|The type argument must be or derive from the specified base class. In a nullable context, `T` can be either a nullable or non-nullable type derived from the specified base class. |
|`where T :` *\<interface name>*|The type argument must be or implement the specified interface. Multiple interface constraints can be specified. The constraining interface can also be generic. In a nullable context, `T` must be a non-nullable type that implements the specified interface.|
|`where T :` *\<interface name>?*|The type argument must be or implement the specified interface. Multiple interface constraints can be specified. The constraining interface can also be generic. In a nullable context, `T` can be a nullable reference type, a non-nullable reference type, or a value type. `T` can't be a nullable value type.|
|`where T : U`|The type argument supplied for `T` must be or derive from the argument supplied for `U`. In a nullable context, if `U` is a non-nullable reference type, `T` must be a non-nullable reference type. If `U` is a nullable reference type, `T` can be either nullable or non-nullable. |
|`where T : default`|This constraint resolves the ambiguity when you need to specify an unconstrained type parameter when you override a method or provide an explicit interface implementation. The `default` constraint implies the base method without either the `class` or `struct` constraint. For more information, see the `default` constraint section of the C# language specification.|
|`where T : allows ref struct`|This anti-constraint declares that the type argument for `T` can be a `ref struct` type. The generic type or method must obey ref safety rules for any instance of `T` because it might be a `ref struct`.|

Some constraints are mutually exclusive, and some constraints must be in a specified order:

- You can apply at most one of the `struct`, `class`, `class?`, `notnull`, and `unmanaged` constraints. If you supply any of these constraints, it must be the first constraint specified for that type parameter.
- The base class constraint (`where T : Base` or `where T : Base?`) can't be combined with any of the constraints `struct`, `class`, `class?`, `notnull`, or `unmanaged`.
- You can apply at most one base class constraint, in either form. If you want to support the nullable base type, use `Base?`.
- You can't name both the non-nullable and nullable form of an interface as a constraint.
- The `new()` constraint can't be combined with the `struct` or `unmanaged` constraint. If you specify the `new()` constraint, it must be the last constraint for that type parameter. Anti-constraints, if applicable, can follow the `new()` constraint.
- The `default` constraint can be applied only on override or explicit interface implementations. It can't be combined with either the `struct` or `class` constraints.
- The `allows ref struct` anti-constraint can't be combined with the `class` or `class?` constraint.
- The `allows ref struct` anti-constraint must follow all constraints for that type parameter.

## Why use constraints

Constraints specify the capabilities and expectations of a type parameter. Declaring those constraints means you can use the operations and method calls of the constraining type. You apply constraints to the type parameter when your generic class or method uses any operation on the generic members beyond simple assignment, which includes calling any methods not supported by `System.Object`. For example, the base class constraint tells the compiler that only objects of this type or derived from this type can replace that type argument. Once the compiler has this guarantee, it can allow methods of that type to be called in the generic class. The following code example demonstrates the functionality you can add to the `GenericList<T>` class (in Introduction to Generics) by applying a base class constraint.

```csharp
public class Employee
{
    public Employee(string name, int id) => (Name, ID) = (name, id);
    public string Name { get; set; }
    public int ID { get; set; }
}

public class GenericList<T> where T : Employee
{
    private class Node
    {
        public Node(T t) => (Next, Data) = (null, t);

        public Node? Next { get; set; }
        public T Data { get; set; }
    }

    private Node? head;

    public void AddHead(T t)
    {
        Node n = new(t) { Next = head };
        head = n;
    }

    public IEnumerator<T> GetEnumerator()
    {
        Node? current = head;

        while (current is not null)
        {
            yield return current.Data;
            current = current.Next;
        }
    }

    public T? FindFirstOccurrence(string s)
    {
        Node? current = head;

        while (current is not null)
        {
            //The constraint enables access to the Name property.
            if (current.Data.Name == s)
            {
                return current.Data;
            }
            else
            {
                current = current.Next;
            }
        }
        return null;
    }
}
```
The constraint enables the generic class to use the `Employee.Name` property. The constraint specifies that all items of type `T` are guaranteed to be either an `Employee` object or an object that inherits from `Employee`.

Multiple constraints can be applied to the same type parameter, and the constraints themselves can be generic types, as follows:

```csharp
class EmployeeList<T> where T : notnull, Employee, IComparable<T>, new()
{
    public void AddDefault()
    {
        T t = new();
    }
}
```
When applying the `where T : class` constraint, avoid the `==` and `!=` operators on the type parameter because these operators test for reference identity only, not for value equality. This behavior occurs even if these operators are overloaded in a type that is used as an argument. The following code illustrates this point; the output is false even though the `System.String` class overloads the `==` operator.

```csharp
public static void OpEqualsTest<T>(T s, T t) where T : class
{
    Console.WriteLine(s == t);
}

private static void TestStringEquality()
{
    string s1 = "target";
    System.Text.StringBuilder sb = new("target");
    string s2 = sb.ToString();
    OpEqualsTest(s1, s2);
}
```
The compiler only knows that `T` is a reference type at compile time and must use the default operators that are valid for all reference types. If you must test for value equality, apply the `where T : IEquatable<T>` or `where T : IComparable<T>` constraint and implement the interface in any class used to construct the generic class.

## Constraining multiple parameters

You can apply constraints to multiple parameters, and multiple constraints to a single parameter, as shown in the following example:

```csharp
class Base { }
class Test<T, U>
    where U : struct
    where T : Base, new()
{ }
```
## Unbounded type parameters

 Type parameters that have no constraints, such as T in public class `SampleClass<T>{}`, are called unbounded type parameters. Unbounded type parameters have the following rules:

- The `!=` and `==` operators can't be used because there's no guarantee that the concrete type argument supports these operators.
- They can be converted to and from `System.Object` or explicitly converted to any interface type.
- You can compare them to null. If an unbounded parameter is compared to `null`, the comparison always returns false if the type argument is a value type.

## Type parameters as constraints

The use of a generic type parameter as a constraint is useful when a member function with its own type parameter has to constrain that parameter to the type parameter of the containing type, as shown in the following example:

```csharp
public class List<T>
{
    public void Add<U>(List<U> items) where U : T {/*...*/}
}
```
In the previous example, `T` is a type constraint in the context of the `Add` method, and an unbounded type parameter in the context of the `List` class.

Type parameters can also be used as constraints in generic class definitions. The type parameter must be declared within the angle brackets together with any other type parameters:

```csharp
//Type parameter V is used as a type constraint.
public class SampleClass<T, U, V> where T : V { }
```
The usefulness of type parameters as constraints with generic classes is limited because the compiler can assume nothing about the type parameter except that it derives from `System.Object`. Use type parameters as constraints on generic classes in scenarios in which you want to enforce an inheritance relationship between two type parameters.

## `notnull` constraint

You can use the `notnull` constraint to specify that the type argument must be a non-nullable value type or non-nullable reference type. Unlike most other constraints, if a type argument violates the `notnull` constraint, the compiler generates a warning instead of an error.

The `notnull` constraint has an effect only when used in a nullable context. If you add the `notnull` constraint in a nullable oblivious context, the compiler doesn't generate any warnings or errors for violations of the constraint.

## `class` constraint

The `class` constraint in a nullable context specifies that the type argument must be a non-nullable reference type. In a nullable context, when a type argument is a nullable reference type, the compiler generates a warning.

## `default` constraint

The addition of nullable reference types complicates the use of `T?` in a generic type or method. `T?` can be used with either the `struct` or `class` constraint, but one of them must be present. When the `class` constraint was used, `T?` referred to the nullable reference type for `T`. `T?` can be used when neither constraint is applied. In that case, `T?` is interpreted as `T?` for value types and reference types. However, if `T` is an instance of `System.Nullable`1`, `T?` is the same as `T`. In other words, it doesn't become `T??`.

Because `T?` can now be used without either the `class` or `struct` constraint, ambiguities can arise in overrides or explicit interface implementations. In both those cases, the override doesn't include the constraints, but inherits them from the base class. When the base class doesn't apply either the `class` or `struct` constraint, derived classes need to somehow specify an override applies to the base method without either constraint. The derived method applies the `default` constraint. The `default` constraint clarifies *neither* the `class` nor `struct` constraint.

## Unmanaged constraint

You can use the `unmanaged` constraint to specify that the type parameter must be a non-nullable unmanaged type. The `unmanaged` constraint enables you to write reusable routines to work with types that can be manipulated as blocks of memory, as shown in the following example:

```csharp
unsafe public static byte[] ToByteArray<T>(this T argument) where T : unmanaged
{
    var size = sizeof(T);
    var result = new byte[size];
    byte* p = (byte*)&argument;
    for (var i = 0; i < size; i++)
        result[i] = *p++;
    return result;
}
```
The preceding method must be compiled in an `unsafe` context because it uses the `sizeof` operator on a type not known to be a built-in type. Without the `unmanaged` constraint, the `sizeof` operator is unavailable.

The `unmanaged` constraint implies the `struct` constraint and can't be combined with it. Because the `struct` constraint implies the `new()` constraint, the `unmanaged` constraint can't be combined with the `new()` constraint as well.
