---
title: "Method parameters and modifiers (part 1 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/method-parameters.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Method parameters and modifiers

By default, C# passes arguments to functions *by value*. This approach passes a copy of the variable to the method. For value (`struct`) types, the method gets a copy of the *value*. For reference (`class`) types, the method gets a copy of the *reference*. You can use parameter modifiers to pass arguments *by reference*.

Because a struct is a value type, passing a struct by value to a method sends a copy of the argument to the method. The method works with this copy. The method can't access the original struct in the calling method and can't change it. The method can change only the copy.

A class instance is a reference type, not a value type. When you pass a reference type by value to a method, the method gets a copy of the reference to the instance. Both variables refer to the same object. The parameter is a copy of the reference. The called method can't reassign the instance in the calling method. However, the called method can use the copy of the reference to access the instance members. If the called method changes an instance member, the calling method also sees those changes since it references the same instance.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## Pass by value and pass by reference

All the examples in this section use the following two `record` types to illustrate the differences between `class` types and `struct` types:

```csharp
public record struct Point(int X, int Y);
// This doesn't use a primary constructor because the properties implemented for `record` types are 
// readonly in record class types. That would prevent the mutations necessary for this example.
public record class Point3D
{
    public int X { get; set; }
    public int Y { get; set; }
    public int Z { get; set; }
}
```
The output of the following example illustrates the difference between passing a struct type by value and passing a class type by value. Both `Mutate` methods change property values of their argument. When the parameter is a `struct` type, those changes affect a copy of the argument's data. When the parameter is a `class` type, those changes affect the instance referred to by the argument:

```csharp
public class PassTypesByValue
{
    public static void Mutate(Point pt)
    {
        Console.WriteLine($"\tEnter {nameof(Mutate)}:\t\t{pt}");
        pt.X = 19;
        pt.Y = 23;

        Console.WriteLine($"\tExit {nameof(Mutate)}:\t\t{pt}");
    }
    public static void Mutate(Point3D pt)
    {
        Console.WriteLine($"\tEnter {nameof(Mutate)}:\t\t{pt}");
        pt.X = 19;
        pt.Y = 23;
        pt.Z = 42;

        Console.WriteLine($"\tExit {nameof(Mutate)}:\t\t{pt}");
    }

    public static void TestPassTypesByValue()
    {
        Console.WriteLine("===== Value Types =====");

        var ptStruct = new Point { X = 1, Y = 2 };
        Console.WriteLine($"After initialization:\t\t{ptStruct}");

        Mutate(ptStruct);

        Console.WriteLine($"After called {nameof(Mutate)}:\t\t{ptStruct}");

        Console.WriteLine("===== Reference Types =====");

        var ptClass = new Point3D { X = 1, Y = 2, Z = 3 };

        Console.WriteLine($"After initialization:\t\t{ptClass}");

        Mutate(ptClass);
        Console.WriteLine($"After called {nameof(Mutate)}:\t\t{ptClass}");

        // Output:
        // ===== Value Types =====
        // After initialization:           Point { X = 1, Y = 2 }
        //         Enter Mutate:           Point { X = 1, Y = 2 }
        //         Exit Mutate:            Point { X = 19, Y = 23 }
        // After called Mutate:            Point { X = 1, Y = 2 }
        // ===== Reference Types =====
        // After initialization:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Enter Mutate:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Exit Mutate:            Point3D { X = 19, Y = 23, Z = 42 }
        // After called Mutate:            Point3D { X = 19, Y = 23, Z = 42 }
    }
}
```
The `ref` modifier is one way to pass arguments *by reference* to methods. The following code replicates the preceding example, but passes parameters by reference. The modifications made to the `struct` type are visible in the calling method when the struct is passed by reference. There's no semantic change when a reference type is passed by reference:

```csharp
public class PassTypesByReference
{
    public static void Mutate(ref Point pt)
    {
        Console.WriteLine($"\tEnter {nameof(Mutate)}:\t\t{pt}");
        pt.X = 19;
        pt.Y = 23;

        Console.WriteLine($"\tExit {nameof(Mutate)}:\t\t{pt}");
    }
    public static void Mutate(ref Point3D pt)
    {
        Console.WriteLine($"\tEnter {nameof(Mutate)}:\t\t{pt}");
        pt.X = 19;
        pt.Y = 23;
        pt.Z = 42;

        Console.WriteLine($"\tExit {nameof(Mutate)}:\t\t{pt}");
    }

    public static void TestPassTypesByReference()
    {
        Console.WriteLine("===== Value Types =====");

        var pStruct = new Point { X = 1, Y = 2 };
        Console.WriteLine($"After initialization:\t\t{pStruct}");

        Mutate(ref pStruct);

        Console.WriteLine($"After called {nameof(Mutate)}:\t\t{pStruct}");

        Console.WriteLine("===== Reference Types =====");

        var pClass = new Point3D { X = 1, Y = 2, Z = 3 };

        Console.WriteLine($"After initialization:\t\t{pClass}");

        Mutate(ref pClass);
        Console.WriteLine($"After called {nameof(Mutate)}:\t\t{pClass}");

        // Output:
        // ===== Value Types =====
        // After initialization:           Point { X = 1, Y = 2 }
        //         Enter Mutate:           Point { X = 1, Y = 2 }
        //         Exit Mutate:            Point { X = 19, Y = 23 }
        // After called Mutate:            Point { X = 19, Y = 23 }
        // ===== Reference Types =====
        // After initialization:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Enter Mutate:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Exit Mutate:            Point3D { X = 19, Y = 23, Z = 42 }
        // After called Mutate:            Point3D { X = 19, Y = 23, Z = 42 }
    }
}
```
The preceding examples modified properties of a parameter. A method can also reassign a parameter to a new value. Reassignment behaves differently for struct and class types when passed by value or by reference. The following example shows how struct types and class types behave when parameters that are passed by value are reassigned:

```csharp
public class PassByValueReassignment
{
    public static void Reassign(Point pt)
    {
        Console.WriteLine($"\tEnter {nameof(Reassign)}:\t\t{pt}");
        pt = new Point { X = 13, Y = 29 };

        Console.WriteLine($"\tExit {nameof(Reassign)}:\t\t{pt}");
    }

    public static void Reassign(Point3D pt)
    {
        Console.WriteLine($"\tEnter {nameof(Reassign)}:\t\t{pt}");
        pt = new Point3D { X = 13, Y = 29, Z = -42 };

        Console.WriteLine($"\tExit {nameof(Reassign)}:\t\t{pt}");
    }

    public static void TestPassByValueReassignment()
    {
        Console.WriteLine("===== Value Types =====");

        var ptStruct = new Point { X = 1, Y = 2 };
        Console.WriteLine($"After initialization:\t\t{ptStruct}");

        Reassign(ptStruct);

        Console.WriteLine($"After called {nameof(Reassign)}:\t\t{ptStruct}");

        Console.WriteLine("===== Reference Types =====");

        var ptClass = new Point3D { X = 1, Y = 2, Z = 3 };

        Console.WriteLine($"After initialization:\t\t{ptClass}");

        Reassign(ptClass);
        Console.WriteLine($"After called {nameof(Reassign)}:\t\t{ptClass}");

        // Output:
        // ===== Value Types =====
        // After initialization:           Point { X = 1, Y = 2 }
        //         Enter Reassign:         Point { X = 1, Y = 2 }
        //         Exit Reassign:          Point { X = 13, Y = 29 }
        // After called Reassign:          Point { X = 1, Y = 2 }
        // ===== Reference Types =====
        // After initialization:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Enter Reassign:         Point3D { X = 1, Y = 2, Z = 3 }
        //         Exit Reassign:          Point3D { X = 13, Y = 29, Z = -42 }
        // After called Reassign:          Point3D { X = 1, Y = 2, Z = 3 }
    }
}
```
The preceding sample shows that when you reassign a parameter to a new value, that change isn't visible from the calling method, regardless of whether the type is a value type or a reference type. The following example shows the behavior when you reassign a parameter that the method received by reference:

```csharp
public class PassByReferenceReassignment
{
    public static void Reassign(ref Point pt)
    {
        Console.WriteLine($"\tEnter {nameof(Reassign)}:\t\t{pt}");
        pt = new Point { X = 13, Y = 29 };

        Console.WriteLine($"\tExit {nameof(Reassign)}:\t\t{pt}");
    }

    public static void Reassign(ref Point3D pt)
    {
        Console.WriteLine($"\tEnter {nameof(Reassign)}:\t\t{pt}");
        pt = new Point3D { X = 13, Y = 29, Z = -42 };

        Console.WriteLine($"\tExit {nameof(Reassign)}:\t\t{pt}");
    }

    public static void TestPassByReferenceReassignment()
    {
        Console.WriteLine("===== Value Types =====");

        var ptStruct = new Point { X = 1, Y = 2 };
        Console.WriteLine($"After initialization:\t\t{ptStruct}");

        Reassign(ref ptStruct);

        Console.WriteLine($"After called {nameof(Reassign)}:\t\t{ptStruct}");

        Console.WriteLine("===== Reference Types =====");

        var ptClass = new Point3D { X = 1, Y = 2, Z = 3 };

        Console.WriteLine($"After initialization:\t\t{ptClass}");

        Reassign(ref ptClass);
        Console.WriteLine($"After called {nameof(Reassign)}:\t\t{ptClass}");

        // Output:
        // ===== Value Types =====
        // After initialization:           Point { X = 1, Y = 2 }
        //         Enter Reassign:         Point { X = 1, Y = 2 }
        //         Exit Reassign:          Point { X = 13, Y = 29 }
        // After called Reassign:          Point { X = 13, Y = 29 }
        // ===== Reference Types =====
        // After initialization:           Point3D { X = 1, Y = 2, Z = 3 }
        //         Enter Reassign:         Point3D { X = 1, Y = 2, Z = 3 }
        //         Exit Reassign:          Point3D { X = 13, Y = 29, Z = -42 }
        // After called Reassign:          Point3D { X = 13, Y = 29, Z = -42 }
    }
}
```
The preceding example shows how reassigning the value of a parameter that is passed by reference is visible in the calling context.

## Safe context of references and values

Methods can store the values of parameters in fields. When you pass parameters by value, it's usually safe. The method copies values, and reference types are reachable when the method stores them in a field. Passing parameters by reference safely requires the compiler to define when it's safe to assign a reference to a new variable. For every expression, the compiler defines a *safe context* that bounds access to an expression or variable. The compiler uses two scopes: *safe-context* and *ref-safe-context*.

- The *safe-context* defines the scope where any expression can be safely accessed.
- The *ref-safe-context* defines the scope where a *reference* to any expression can be safely accessed or modified.

Informally, you can think of these scopes as the mechanism to ensure your code never accesses or modifies a reference that's no longer valid. A reference is valid as long as it refers to a valid object or struct. The *safe-context* defines when a variable can be assigned or reassigned. The *ref-safe-context* defines when a variable can be *ref assigned* or *ref reassigned*. Assignment assigns a variable to a new value; *ref assignment* assigns the variable to *refer to* a different storage location.
