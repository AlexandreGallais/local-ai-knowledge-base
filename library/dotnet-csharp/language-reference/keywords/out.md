---
title: "out keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/out.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# out (C# Reference)

Use the `out` keyword in two contexts:

- As a parameter modifier, which you use to pass an argument to a method by reference rather than by value.
- In generic type parameter declarations for interfaces and delegates, which you use to specify that a type parameter is covariant.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The `out` parameter modifier is especially useful when a method needs to return more than one value since you can use more than one `out` parameter. For example,

```csharp
    public void Main()
    {
        double radiusValue = 3.92781;
        //Calculate the circumference and area of a circle, returning the results to Main().
        CalculateCircumferenceAndArea(radiusValue, out double circumferenceResult, out var areaResult);
        System.Console.WriteLine($"Circumference of a circle with a radius of {radiusValue} is {circumferenceResult}.");
        System.Console.WriteLine($"Area of a circle with a radius of {radiusValue} is {areaResult}.");
        Console.ReadLine();
    }

    //The calculation worker method.
    public static void CalculateCircumferenceAndArea(double radius, out double circumference, out double area)
    {
        circumference = 2 * Math.PI * radius;
        area = Math.PI * (radius * radius);
    }
```

The following limitations apply to using the `out` keyword:

- You can't use `out` parameters in asynchronous methods.
- You can't use `out` parameters in iterator methods.
- You can't pass properties as `out` parameters.
