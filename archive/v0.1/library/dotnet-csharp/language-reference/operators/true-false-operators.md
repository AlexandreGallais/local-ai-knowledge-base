---
title: "true and false operators - treat objects as Boolean values"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/true-false-operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# True and false operators

The `true` operator returns the bool value `true` to indicate that its operand is definitely true, while the `false` operator returns the `bool` value `true` to indicate that its operand is definitely false.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

A type that implements both `true` and `false` operators must follow these semantics:

* "Is this object true?" resolves to operator `true`. Operator `true` returns `true` if the object is `true`. The answer is "Yes, this object is true".
* "Is this object false?" resolves to operator `false`. Operator `false` returns `true` if the object is `false`. The answer is "Yes, this object is false".

The `true` and `false` operators aren't guaranteed to complement each other. That is, both the `true` and `false` operator might return the `bool` value `false` for the same operand. If a type defines one of these two operators, it must also define the other operator.

> **Tip:**
> Use the `bool?` type if you need to support three-valued logic (for example, when you work with databases that support a three-valued Boolean type). C# provides the `&` and `|` operators that support three-valued logic with the `bool?` operands. For more information, see the Nullable Boolean logical operators section of the Boolean logical operators article.

## Boolean expressions

A type with the defined `true` operator can be the type of a result of a controlling conditional expression in the if, do, while, and for statements and in the conditional operator `?:`. For more information, see the Boolean expressions section of the C# language specification.

## User-defined conditional logical operators

If a type with the defined `true` and `false` operators overloads the logical OR operator `|` or the logical AND operator `&` in a certain way, the conditional logical OR operator `||` or conditional logical AND operator `&&`, respectively, can be evaluated for the operands of that type. For more information, see the User-defined conditional logical operators section of the C# language specification.

## Example

The following example presents the type that defines both `true` and `false` operators. The type also overloads the logical AND operator `&` in such a way that the `&&` operator can also be evaluated for the operands of that type.

```csharp
﻿public struct LaunchStatus
{
    public static readonly LaunchStatus Green = new LaunchStatus(0);
    public static readonly LaunchStatus Yellow = new LaunchStatus(1);
    public static readonly LaunchStatus Red = new LaunchStatus(2);

    private int status;

    private LaunchStatus(int status)
    {
        this.status = status;
    }

    public static bool operator true(LaunchStatus x) => x == Green || x == Yellow;
    public static bool operator false(LaunchStatus x) => x == Red;

    public static LaunchStatus operator &(LaunchStatus x, LaunchStatus y)
    {
        if (x == Red || y == Red || (x == Yellow && y == Yellow))
        {
            return Red;
        }

        if (x == Yellow || y == Yellow)
        {
            return Yellow;
        }

        return Green;
    }

    public static bool operator ==(LaunchStatus x, LaunchStatus y) => x.status == y.status;
    public static bool operator !=(LaunchStatus x, LaunchStatus y) => !(x == y);

    public override bool Equals(object obj) => obj is LaunchStatus other && this == other;
    public override int GetHashCode() => status;
}

public class LaunchStatusTest
{
    public static void Main()
    {
        LaunchStatus okToLaunch = GetFuelLaunchStatus() && GetNavigationLaunchStatus();
        Console.WriteLine(okToLaunch ? "Ready to go!" : "Wait!");
    }

    static LaunchStatus GetFuelLaunchStatus()
    {
        Console.WriteLine("Getting fuel launch status...");
        return LaunchStatus.Red;
    }

    static LaunchStatus GetNavigationLaunchStatus()
    {
        Console.WriteLine("Getting navigation launch status...");
        return LaunchStatus.Yellow;
    }
}
```
Notice the short-circuiting behavior of the `&&` operator. When the `GetFuelLaunchStatus` method returns `LaunchStatus.Red`, the right-hand operand of the `&&` operator isn't evaluated. That condition is definitely false. The result of the logical AND doesn't depend on the value of the right-hand operand. The output of the example is as follows:

```console
Getting fuel launch status...
Wait!
```

## See also

- C# operators and expressions
