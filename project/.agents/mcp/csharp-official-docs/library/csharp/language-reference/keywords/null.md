---
title: "null keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/null.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# null (C# Reference)

The `null` keyword is a literal that represents a null reference, one that doesn't refer to any object. `null` is the default value of reference-type variables. Ordinary value types can't be null, except for nullable value types.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example demonstrates some behaviors of the `null` keyword:

```csharp
﻿using System;

namespace NullExamples
{
    class Program
    {
        class MyClass
        {
            public static void MyMethod() { }
        }

        static void Main()
        {
            // Set a breakpoint here to see that mc = null.
            // However, the compiler considers it "unassigned."
            // and generates a compiler error if you try to
            // use the variable.
            MyClass mc;

            // Now the variable can be used, but...
            mc = null;

            // ... a method call on a null object raises
            // a run-time NullReferenceException.
            // Uncomment the following line to see for yourself.
            // mc.MyMethod();

            // Now mc has a value.
            mc = new MyClass();

            // You can call its method.
            MyClass.MyMethod();

            // Set mc to null again. The object it referenced
            // is no longer accessible and can now be garbage-collected.
            mc = null;

            // A null string is not the same as an empty string.
            string s = null;
            string t = string.Empty; // Logically the same as ""

            // Equals applied to any null object returns false.
            Console.WriteLine($"t.Equals(s) is {t.Equals(s)}");

            // Equality operator also returns false when one
            // operand is null.
            Console.WriteLine($"Empty string {(s == t ? "equals" : "does not equal")} null string");

            // Returns true.
            Console.WriteLine($"null == null is {null == null}");

            // A value type cannot be null
            // int i = null; // Compiler error!

            // Use a nullable value type instead:
            int? i = null;

            // Keep the console window open in debug mode.
        }
    }
}
```
## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# keywords
- Default values of C# types
- Nothing (Visual Basic)
