---
title: "virtual keyword (part 4 of 6)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/virtual.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# virtual keyword (part 4 of 6)

## Example

In this example, the `Shape` class contains the two coordinates `x` and `y`, and the `Area()` virtual method. Different shape classes such as `Circle`, `Cylinder`, and `Sphere` inherit the `Shape` class, and the surface area is calculated for each figure. Each derived class has its own override implementation of `Area()`.

The inherited classes `Circle`, `Cylinder`, and `Sphere` all use constructors that initialize the base class, as shown in the following declaration.

```csharp
public Cylinder(double r, double h): base(r, h) {}
```

The following program calculates and displays the appropriate area for each figure by invoking the appropriate implementation of the `Area()` method, according to the object that is associated with the method.
