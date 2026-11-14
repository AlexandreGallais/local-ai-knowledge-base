---
title: "User-defined explicit and implicit conversion operators - provide conversions to different types"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/user-defined-conversion-operators.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# User-defined explicit and implicit conversion operators

A user-defined type can define a custom implicit or explicit conversion from or to another type, provided a standard conversion doesn't exist between the same two types. Implicit conversions don't require special syntax to be invoked and can occur in various situations, for example, in assignments and methods invocations. Predefined C# implicit conversions always succeed and never throw an exception. User-defined implicit conversions should behave in that way as well. If a custom conversion can throw an exception or lose information, define it as an explicit conversion.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The is and as operators don't consider user-defined conversions. Use a cast expression to invoke a user-defined explicit conversion.

Use the `operator` and `implicit` or `explicit` keywords to define an implicit or explicit conversion, respectively. The type that defines a conversion must be either a source type or a target type of that conversion. You can define a conversion between two user-defined types in either of the two types.

The following example demonstrates how to define an implicit and explicit conversion:

```csharp
﻿using System;

public readonly struct Digit
{
    private readonly byte digit;

    public Digit(byte digit)
    {
        if (digit > 9)
        {
            throw new ArgumentOutOfRangeException(nameof(digit), "Digit cannot be greater than nine.");
        }
        this.digit = digit;
    }

    public static implicit operator byte(Digit d) => d.digit;
    public static explicit operator Digit(byte b) => new Digit(b);

    public override string ToString() => $"{digit}";
}

public static class UserDefinedConversions
{
    public static void Main()
    {
        var d = new Digit(7);

        byte number = d;
        Console.WriteLine(number);  // output: 7

        Digit digit = (Digit)number;
        Console.WriteLine(digit);  // output: 7
    }
}
```
You can define *checked* explicit conversion operators. For more information, see the User-defined checked operators section of the Arithmetic operators article.

You also use the `operator` keyword to overload a predefined C# operator. For more information, see Operator overloading.

## C# language specification

For more information, see the following sections of the C# language specification:

- Conversion operators
- User-defined conversions
- Implicit conversions
- Explicit conversions

## See also

- C# operators and expressions
- Operator overloading
- Type-testing and cast operators
- Casting and type conversion
- Design guidelines - Conversion operators
- Chained user-defined explicit conversions in C#
