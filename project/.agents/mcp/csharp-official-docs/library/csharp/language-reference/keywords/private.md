---
title: "private keyword (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/private.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# private (C# Reference)

The `private` keyword is a member access modifier.

> This article covers `private` access. The `private` keyword is also part of the `private protected` access modifier.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Private access is the least permissive access level. You can access private members only within the body of the class or the struct where you declare them, as shown in the following example:

```csharp
class Employee
{
    private int _i;
    double _d;   // private access by default
}
```

Nested types in the same body can also access those private members.

If you reference a private member outside the class or the struct where you declare it, the compiler returns an error.

For a comparison of `private` with the other access modifiers, see Accessibility Levels and Access Modifiers.

In this example, the `Employee` class contains two private data members, `_name` and `_salary`. As private members, member methods are the only way to access them. The example adds public methods named `GetName` and `Salary` to allow controlled access to the private members. The `_name` member is accessed by way of a public method, and the `_salary` member is accessed by way of a public read-only property. For more information, see Properties.
