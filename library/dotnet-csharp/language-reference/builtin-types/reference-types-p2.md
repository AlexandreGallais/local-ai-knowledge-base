---
title: "Built-in reference types (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/reference-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Built-in reference types (part 2 of 2)

## The dynamic type

The `dynamic` type indicates that the variable and references to its members bypass compile-time type checking. Instead, these operations are resolved at run time. The `dynamic` type simplifies access to COM APIs such as the Office Automation APIs, to dynamic APIs such as IronPython libraries, and to the HTML Document Object Model (DOM).

Type `dynamic` behaves like type `object` in most circumstances. In particular, any non-null expression can be converted to the `dynamic` type. The `dynamic` type differs from `object` in that the compiler doesn't resolve or type check operations that contain expressions of type `dynamic`. The compiler packages together information about the operation, and that information is later used to evaluate the operation at run time. As part of the process, variables of type `dynamic` are compiled into variables of type `object`. Therefore, type `dynamic` exists only at compile time, not at run time.

The following example contrasts a variable of type `dynamic` with a variable of type `object`. To verify the type of each variable at compile time, place the mouse pointer over `dyn` or `obj` in the `WriteLine` statements. Copy the following code into an editor where IntelliSense is available. IntelliSense shows **dynamic** for `dyn` and **object** for `obj`.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DynamicSnippets
{
    class Program
    {
        static void Main(string[] args)
        {
            dynamic dyn = 1;
            object obj = 1;

            // Rest the mouse pointer over dyn and obj to see their
            // types at compile time.
            System.Console.WriteLine(dyn.GetType());
            System.Console.WriteLine(obj.GetType());
        }
    }

    class ExampleClass
    {
        // A dynamic field.
        static dynamic field;

        // A dynamic property.
        dynamic prop { get; set; }

        // A dynamic return type and a dynamic parameter type.
        public dynamic exampleMethod(dynamic d)
        {
            // A dynamic local variable.
            dynamic local = "Local variable";
            int two = 2;

            if (d is int)
            {
                return local;
            }
            else
            {
                return two;
            }
        }
    }

    class Examples
    {
        static void convertToDynamic()
        {
            dynamic d;
            int i = 20;
            d = (dynamic)i;
            Console.WriteLine(d);

            string s = "Example string.";
            d = (dynamic)s;
            Console.WriteLine(d);

            DateTime dt = DateTime.Today;
            d = (dynamic)dt;
            Console.WriteLine(d);
        }
        // Results:
        // 20
        // Example string.
        // 7/25/2018 12:00:00 AM

        static void ExamplesMethod()
        {
            var someVar = new ExampleClass();
            int i = 8;
            dynamic d;
            // With the is operator.
            // The dynamic type behaves like object. The following
            // expression returns true unless someVar has the value null.
            if (someVar is dynamic) { }

            // With the as operator.
            d = i as dynamic;

            // With typeof, as part of a constructed type.
            Console.WriteLine(typeof(List<dynamic>));

            // The following statement causes a compiler error.
            //Console.WriteLine(typeof(dynamic));
        }
    }
}
```

The `System.Console.WriteLine*` statements display the run-time types of `dyn` and `obj`. At that point, both have the same type, integer. The following output is produced:

```console
System.Int32
System.Int32
```

To see the difference between `dyn` and `obj` at compile time, add the following two lines between the declarations and the `WriteLine` statements in the previous example.

```csharp
dyn = dyn + 3;
obj = obj + 3;
```

 A compiler error is reported for the attempted addition of an integer and an object in expression `obj + 3`. However, no error is reported for `dyn + 3`. The expression that contains `dyn` isn't checked at compile time because the type of `dyn` is `dynamic`.

The following example uses `dynamic` in several declarations. The `Main` method also contrasts compile-time type checking with run-time type checking.

```csharp
using System;

namespace DynamicExamples
{
    class Program
    {
        static void Main(string[] args)
        {
            ExampleClass ec = new ExampleClass();
            Console.WriteLine(ec.ExampleMethod(10));
            Console.WriteLine(ec.ExampleMethod("value"));

            // The following line causes a compiler error because ExampleMethod
            // takes only one argument.
            //Console.WriteLine(ec.ExampleMethod(10, 4));

            dynamic dynamic_ec = new ExampleClass();
            Console.WriteLine(dynamic_ec.ExampleMethod(10));

            // Because dynamic_ec is dynamic, the following call to ExampleMethod
            // with two arguments does not produce an error at compile time.
            // However, it does cause a run-time error.
            //Console.WriteLine(dynamic_ec.ExampleMethod(10, 4));
        }
    }

    class ExampleClass
    {
        static dynamic _field;
        dynamic Prop { get; set; }

        public dynamic ExampleMethod(dynamic d)
        {
            dynamic local = "Local variable";
            int two = 2;

            if (d is int)
            {
                return local;
            }
            else
            {
                return two;
            }
        }
    }
}
// Results:
// Local variable
// 2
// Local variable
```

### C# language specification

For more information, see the following sections of the C# language specification:

- §8.2.3 The object type
- §8.2.4 The dynamic type
- §8.2.5 The string type
- §8.2.8 Delegate types
- §6.4.5.6 String literals

### See also

- C# Keywords
- Events
- Using Type dynamic
- Best Practices for Using Strings
- Creating New Strings
- Type-testing and cast operators
- How to safely cast using pattern matching and the as and is operators
- Walkthrough: creating and using dynamic objects
- `System.Object`
- `System.String`
- `System.Dynamic.DynamicObject`
