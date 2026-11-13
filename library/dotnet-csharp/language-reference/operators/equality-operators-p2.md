---
title: "Equality operators - test if two objects are equal or not equal (part 2 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/equality-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Equality operators - test if two objects are equal or not equal (part 2 of 4)

## Equality operator ==

The equality operator `==` returns `true` if its operands are equal, `false` otherwise.

### Value types equality

Operands of the built-in value types are equal if their values are equal:

```csharp
﻿namespace operators;

public static class EqualityOperators
{
    public static void Examples()
    {
        Console.WriteLine("Value types:");
        ValueTypesEquality();

        Console.WriteLine("Strings:");
        StringEquality();

        Console.WriteLine("Reference types:");
        ReferenceTypesEquality.Main();

        Console.WriteLine("Record types:");
        RecordTypesEquality.Main();

        Console.WriteLine("Delegate types:");
        DelegateEquality();
        IdenticalLambdasNotEqual();

        Console.WriteLine("Non equality:");
        NonEquality();
    }

    private static void ValueTypesEquality()
    {
        int a = 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a == b);  // output: True

        char c1 = 'a';
        char c2 = 'A';
        Console.WriteLine(c1 == c2);  // output: False
        Console.WriteLine(c1 == char.ToLower(c2));  // output: True
    }

    private static void StringEquality()
    {
        string s1 = "hello!";
        string s2 = "HeLLo!";
        Console.WriteLine(s1 == s2.ToLower());  // output: True

        string s3 = "Hello!";
        Console.WriteLine(s1 == s3);  // output: False
    }

    // Rationale for the structure of the next snippet.
    // A method cannot contain a class definition. Thus, a standard way to include snippet doesn't work.
    // We want snippets to be interactive. Thus, the whole snippet has a structure of the console program.
    // (Running the code without the ReferenceTypesEquality class doesn't produce any output in the interactive Output control.)

    public class ReferenceTypesEquality
    {
        public class MyClass
        {
            private int id;

            public MyClass(int id) => this.id = id;
        }

        public static void Main()
        {
            var a = new MyClass(1);
            var b = new MyClass(1);
            var c = a;
            Console.WriteLine(a == b);  // output: False
            Console.WriteLine(a == c);  // output: True
        }
    }

    private static void NonEquality()
    {
        int a = 1 + 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a != b);  // output: True

        string s1 = "Hello";
        string s2 = "Hello";
        Console.WriteLine(s1 != s2);  // output: False

        object o1 = 1;
        object o2 = 1;
        Console.WriteLine(o1 != o2);  // output: True
    }

    private static void DelegateEquality()
    {
        Action a = () => Console.WriteLine("a");

        Action b = a + a;
        Action c = a + a;
        Console.WriteLine(object.ReferenceEquals(b, c));  // output: False
        Console.WriteLine(b == c);  // output: True

        var o1 = new object();
        var o2 = new object();
        var d1 = o1.ToString;
        var d2 = o2.ToString;
        Console.WriteLine(object.ReferenceEquals(d1, d2));  // output: False
        Console.WriteLine(d1 == d2);  // output: False (different receivers)
    }

    private static void IdenticalLambdasNotEqual()
    {
        Action a = () => Console.WriteLine("a");
        Action b = () => Console.WriteLine("a");

        Console.WriteLine(a == b);  // output: False
        Console.WriteLine(a + b == a + b);  // output: True
        Console.WriteLine(b + a == a + b);  // output: False
    }

    public class RecordTypesEquality
    {
        public record Point(int X, int Y, string Name);
        public record TaggedNumber(int Number, List<string> Tags);

        public static void Main()
        {
            var p1 = new Point(2, 3, "A");
            var p2 = new Point(1, 3, "B");
            var p3 = new Point(2, 3, "A");

            Console.WriteLine(p1 == p2);  // output: False
            Console.WriteLine(p1 == p3);  // output: True

            var n1 = new TaggedNumber(2, new List<string>() { "A" });
            var n2 = new TaggedNumber(2, new List<string>() { "A" });
            Console.WriteLine(n1 == n2);  // output: False
        }
    }
}
```
> **Note:**
> For the `==`, `<`, `>`, `<=`, and `>=` operators, if any of the operands isn't a number (`System.Double.NaN` or `System.Single.NaN`), the result of operation is `false`. That condition means that the `NaN` value isn't greater than, less than, or equal to any other `double` (or `float`) value, including `NaN`. For more information and examples, see the `System.Double.NaN` or `System.Single.NaN` reference article.

Two operands of the same enum type are equal if the corresponding values of the underlying integral type are equal.

User-defined struct types don't support the `==` operator by default. To support the `==` operator, a user-defined struct must overload it.

C# tuples have built-in support for the `==` and `!=` operators. For more information, see the Tuple equality section of the Tuple types article.

### Reference types equality

By default, reference-type operands, excluding records, are equal if they refer to the same object:

```csharp
﻿namespace operators;

public static class EqualityOperators
{
    public static void Examples()
    {
        Console.WriteLine("Value types:");
        ValueTypesEquality();

        Console.WriteLine("Strings:");
        StringEquality();

        Console.WriteLine("Reference types:");
        ReferenceTypesEquality.Main();

        Console.WriteLine("Record types:");
        RecordTypesEquality.Main();

        Console.WriteLine("Delegate types:");
        DelegateEquality();
        IdenticalLambdasNotEqual();

        Console.WriteLine("Non equality:");
        NonEquality();
    }

    private static void ValueTypesEquality()
    {
        int a = 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a == b);  // output: True

        char c1 = 'a';
        char c2 = 'A';
        Console.WriteLine(c1 == c2);  // output: False
        Console.WriteLine(c1 == char.ToLower(c2));  // output: True
    }

    private static void StringEquality()
    {
        string s1 = "hello!";
        string s2 = "HeLLo!";
        Console.WriteLine(s1 == s2.ToLower());  // output: True

        string s3 = "Hello!";
        Console.WriteLine(s1 == s3);  // output: False
    }

    // Rationale for the structure of the next snippet.
    // A method cannot contain a class definition. Thus, a standard way to include snippet doesn't work.
    // We want snippets to be interactive. Thus, the whole snippet has a structure of the console program.
    // (Running the code without the ReferenceTypesEquality class doesn't produce any output in the interactive Output control.)

    public class ReferenceTypesEquality
    {
        public class MyClass
        {
            private int id;

            public MyClass(int id) => this.id = id;
        }

        public static void Main()
        {
            var a = new MyClass(1);
            var b = new MyClass(1);
            var c = a;
            Console.WriteLine(a == b);  // output: False
            Console.WriteLine(a == c);  // output: True
        }
    }

    private static void NonEquality()
    {
        int a = 1 + 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a != b);  // output: True

        string s1 = "Hello";
        string s2 = "Hello";
        Console.WriteLine(s1 != s2);  // output: False

        object o1 = 1;
        object o2 = 1;
        Console.WriteLine(o1 != o2);  // output: True
    }

    private static void DelegateEquality()
    {
        Action a = () => Console.WriteLine("a");

        Action b = a + a;
        Action c = a + a;
        Console.WriteLine(object.ReferenceEquals(b, c));  // output: False
        Console.WriteLine(b == c);  // output: True

        var o1 = new object();
        var o2 = new object();
        var d1 = o1.ToString;
        var d2 = o2.ToString;
        Console.WriteLine(object.ReferenceEquals(d1, d2));  // output: False
        Console.WriteLine(d1 == d2);  // output: False (different receivers)
    }

    private static void IdenticalLambdasNotEqual()
    {
        Action a = () => Console.WriteLine("a");
        Action b = () => Console.WriteLine("a");

        Console.WriteLine(a == b);  // output: False
        Console.WriteLine(a + b == a + b);  // output: True
        Console.WriteLine(b + a == a + b);  // output: False
    }

    public class RecordTypesEquality
    {
        public record Point(int X, int Y, string Name);
        public record TaggedNumber(int Number, List<string> Tags);

        public static void Main()
        {
            var p1 = new Point(2, 3, "A");
            var p2 = new Point(1, 3, "B");
            var p3 = new Point(2, 3, "A");

            Console.WriteLine(p1 == p2);  // output: False
            Console.WriteLine(p1 == p3);  // output: True

            var n1 = new TaggedNumber(2, new List<string>() { "A" });
            var n2 = new TaggedNumber(2, new List<string>() { "A" });
            Console.WriteLine(n1 == n2);  // output: False
        }
    }
}
```
As the preceding example shows, user-defined reference types support the `==` operator by default. However, a reference type can overload the `==` operator. If a reference type overloads the `==` operator, use the `System.Object.ReferenceEquals*` method to check if two references of that type refer to the same object.

### Record types equality

Record types support the `==` and `!=` operators that by default provide value equality semantics. That is, two record operands are equal when both of them are `null` or corresponding values of all fields and automatically implemented properties are equal.

```csharp
public class RecordTypesEquality
{
    public record Point(int X, int Y, string Name);
    public record TaggedNumber(int Number, List<string> Tags);

    public static void Main()
    {
        var p1 = new Point(2, 3, "A");
        var p2 = new Point(1, 3, "B");
        var p3 = new Point(2, 3, "A");

        Console.WriteLine(p1 == p2);  // output: False
        Console.WriteLine(p1 == p3);  // output: True

        var n1 = new TaggedNumber(2, new List<string>() { "A" });
        var n2 = new TaggedNumber(2, new List<string>() { "A" });
        Console.WriteLine(n1 == n2);  // output: False
    }
}
```
As the preceding example shows, the equality of reference-type members is compared using their specific equality implementations.

### String equality

Two string operands are equal when both of them are `null` or both string instances are of the same length and have identical characters in each character position:

```csharp
﻿namespace operators;

public static class EqualityOperators
{
    public static void Examples()
    {
        Console.WriteLine("Value types:");
        ValueTypesEquality();

        Console.WriteLine("Strings:");
        StringEquality();

        Console.WriteLine("Reference types:");
        ReferenceTypesEquality.Main();

        Console.WriteLine("Record types:");
        RecordTypesEquality.Main();

        Console.WriteLine("Delegate types:");
        DelegateEquality();
        IdenticalLambdasNotEqual();

        Console.WriteLine("Non equality:");
        NonEquality();
    }

    private static void ValueTypesEquality()
    {
        int a = 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a == b);  // output: True

        char c1 = 'a';
        char c2 = 'A';
        Console.WriteLine(c1 == c2);  // output: False
        Console.WriteLine(c1 == char.ToLower(c2));  // output: True
    }

    private static void StringEquality()
    {
        string s1 = "hello!";
        string s2 = "HeLLo!";
        Console.WriteLine(s1 == s2.ToLower());  // output: True

        string s3 = "Hello!";
        Console.WriteLine(s1 == s3);  // output: False
    }

    // Rationale for the structure of the next snippet.
    // A method cannot contain a class definition. Thus, a standard way to include snippet doesn't work.
    // We want snippets to be interactive. Thus, the whole snippet has a structure of the console program.
    // (Running the code without the ReferenceTypesEquality class doesn't produce any output in the interactive Output control.)

    public class ReferenceTypesEquality
    {
        public class MyClass
        {
            private int id;

            public MyClass(int id) => this.id = id;
        }

        public static void Main()
        {
            var a = new MyClass(1);
            var b = new MyClass(1);
            var c = a;
            Console.WriteLine(a == b);  // output: False
            Console.WriteLine(a == c);  // output: True
        }
    }

    private static void NonEquality()
    {
        int a = 1 + 1 + 2 + 3;
        int b = 6;
        Console.WriteLine(a != b);  // output: True

        string s1 = "Hello";
        string s2 = "Hello";
        Console.WriteLine(s1 != s2);  // output: False

        object o1 = 1;
        object o2 = 1;
        Console.WriteLine(o1 != o2);  // output: True
    }

    private static void DelegateEquality()
    {
        Action a = () => Console.WriteLine("a");

        Action b = a + a;
        Action c = a + a;
        Console.WriteLine(object.ReferenceEquals(b, c));  // output: False
        Console.WriteLine(b == c);  // output: True

        var o1 = new object();
        var o2 = new object();
        var d1 = o1.ToString;
        var d2 = o2.ToString;
        Console.WriteLine(object.ReferenceEquals(d1, d2));  // output: False
        Console.WriteLine(d1 == d2);  // output: False (different receivers)
    }

    private static void IdenticalLambdasNotEqual()
    {
        Action a = () => Console.WriteLine("a");
        Action b = () => Console.WriteLine("a");

        Console.WriteLine(a == b);  // output: False
        Console.WriteLine(a + b == a + b);  // output: True
        Console.WriteLine(b + a == a + b);  // output: False
    }

    public class RecordTypesEquality
    {
        public record Point(int X, int Y, string Name);
        public record TaggedNumber(int Number, List<string> Tags);

        public static void Main()
        {
            var p1 = new Point(2, 3, "A");
            var p2 = new Point(1, 3, "B");
            var p3 = new Point(2, 3, "A");

            Console.WriteLine(p1 == p2);  // output: False
            Console.WriteLine(p1 == p3);  // output: True

            var n1 = new TaggedNumber(2, new List<string>() { "A" });
            var n2 = new TaggedNumber(2, new List<string>() { "A" });
            Console.WriteLine(n1 == n2);  // output: False
        }
    }
}
```
String equality comparisons are case-sensitive ordinal comparisons. For more information about string comparison, see How to compare strings in C#.
