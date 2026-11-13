---
title: "Equality operators - test if two objects are equal or not equal (part 3 of 4)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/equality-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Equality operators - test if two objects are equal or not equal (part 3 of 4)

### Delegate equality

Two delegate operands of the same run-time type are equal when both of them are `null` or their invocation lists are the same length and have equal entries in each position:

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
> **Important:**
> Equal entries in an invocation list include all fixed parameters in the invocation, including the receiver. The receiver is the instance of an object represented by `this` when the entry is invoked.

```csharp
var o1 = new object();
var o2 = new object();
var d1 = o1.ToString;
var d2 = o2.ToString;
Console.WriteLine(object.ReferenceEquals(d1, d2));  // output: False
Console.WriteLine(d1 == d2);  // output: False (different receivers)
```
For more information, see the Delegate equality operators section of the C# language specification.

Delegates that come from evaluating semantically identical lambda expressions aren't equal, as the following example shows:

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
## Inequality operator `!=`

The inequality operator `!=` returns `true` if its operands aren't equal, and `false` otherwise. For the operands of the built-in types, the expression `x != y` produces the same result as the expression `!(x == y)`. For more information about type equality, see the Equality operator section.

The following example demonstrates how to use the `!=` operator:

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
