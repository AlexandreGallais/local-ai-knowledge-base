---
title: "Explore extension members in C# 14 and C# 15 to enhance existing types (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/whats-new/tutorials/extension-members.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Explore extension members in C# 14 and C# 15

C# 14 introduced extension members, an enhancement to the existing extension methods. Extension members enable you to add properties and operators. You can also extend types as well as instances of types. C# 15 adds extension indexers, so an existing type can support indexed access from an extension block.

In this tutorial, you explore extension members by enhancing the `System.Drawing.Point` type with mathematical operations, coordinate transformations, and utility properties. Then you add indexed access to a `Path` type that stores point-to-point offsets. You learn how to migrate existing extension methods to the new extension member syntax and when each approach fits.

In this tutorial, you:

>
> * Create C# 14 extension members with static properties and operators.
> * Implement coordinate transformations using extension members.
> * Migrate traditional extension methods to extension member syntax.
> * Add a C# 15 extension indexer that reads and updates absolute points in a path.
> * Compare extension members with traditional extension methods.

## Prerequisites

- The .NET 11 SDK.
- An editor such as Visual Studio 2026 or Visual Studio Code with the C# Dev Kit.

This sample targets `net11.0`, which selects C# 15 by default. Extension indexers don't require `<LangVersion>preview</LangVersion>`.

## Create the sample application

Start by creating a console application that demonstrates both traditional extension methods and the new extension members syntax. You create extensions for the `System.Drawing.Point` type. This type comes from the `System.Drawing` namespace and is typically used in Windows Forms applications.

1. Create a new console application.

   ```dotnetcli
   dotnet new console -f net11.0 -n PointExtensions
   cd PointExtensions
   ```

1. Verify that the project file targets .NET 11:

```xml
﻿<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net11.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```
1. Copy the following code into a new file named `ExtensionMethods.cs`:

```csharp
﻿using System.Drawing;
using System.Numerics;

namespace ExtensionMethods;

public static class PointExtensions
{
    public static Vector2 ToVector(this Point point) =>
        new Vector2(point.X, point.Y);

    public static void Translate(this ref Point point, int xDist, int yDist)
    {
        point.X += xDist;
        point.Y += yDist;
    }

    public static void Scale(this ref Point point, int xScale, int yScale)
    {
        point.X *= xScale;
        point.Y *= yScale;
    }

    public static void Rotate(this ref Point point, int angleInDegrees)
    {
        double theta = ((double)angleInDegrees * Math.PI) / 180.0;
        double sinTheta = Math.Sin(theta);
        double cosTheta = Math.Cos(theta);
        double newX = (double)point.X * cosTheta - (double)point.Y * sinTheta;
        double newY = (double)point.X * sinTheta + (double)point.Y * cosTheta;
        point.X = (int)newX;
        point.Y = (int)newY;
    }
}
```
1. Copy the following code that demonstrates these extension methods and other uses of the `System.Drawing.Point`:

```csharp
using System.Drawing;
using System.Numerics;
using ExtensionMethods;

public static class ExtensionMethodsDemonstrations
{
    public static void TraditionalExtensionMethods()
    {
        OriginAsADataElement();
        ArithmeticWithPoints();
        DiscreteArithmeticWithPoints();
        ExtensionMethodsThis();
        MoreExamples();
    }

    static void OriginAsADataElement()
    {
        // Inline implementation since Point.Origin doesn't exist in ExtensionMethods
        Point origin = Point.Empty; // Equivalent to Point.Origin
        Console.WriteLine($"Point.Origin (inline): {origin}");
        Console.WriteLine($"Same as Point.Empty: {origin == Point.Empty}");
        Console.WriteLine();
    }

    static void ArithmeticWithPoints()
    {
        Point p1 = new Point(5, 3);
        Point p2 = new Point(2, 7);

        Console.WriteLine($"Point 1: {p1}");
        Console.WriteLine($"Point 2: {p2}");
        
        // Inline implementation since + and - operators don't exist in ExtensionMethods
        Point addition = new Point(p1.X + p2.X, p1.Y + p2.Y);
        Point subtraction1 = new Point(p1.X - p2.X, p1.Y - p2.Y);
        Point subtraction2 = new Point(p2.X - p1.X, p2.Y - p1.Y);
        
        Console.WriteLine($"Addition (p1 + p2): {addition}");
        Console.WriteLine($"Subtraction (p1 - p2): {subtraction1}");
        Console.WriteLine($"Subtraction (p2 - p1): {subtraction2}");
        Console.WriteLine();
    }

    static void DiscreteArithmeticWithPoints()
    {
        Point point = new Point(10, 8);
        int offsetX = 3;
        int offsetY = -2;
        int scaleX = 2;
        int scaleY = 3;
        int divisorX = 2;
        int divisorY = 4;

        Console.WriteLine($"Original point: {point}");
        Console.WriteLine($"Offset: ({offsetX}, {offsetY})");
        Console.WriteLine($"Scale: ({scaleX}, {scaleY})");
        Console.WriteLine($"Divisor: ({divisorX}, {divisorY})");
        Console.WriteLine();

        // Inline implementations since tuple operators don't exist in ExtensionMethods
        Point addedOffset = new Point(point.X + offsetX, point.Y + offsetY);
        Point subtractedOffset = new Point(point.X - offsetX, point.Y - offsetY);
        Point scaledPoint = new Point(point.X * scaleX, point.Y * scaleY);
        Point dividedPoint = new Point(point.X / divisorX, point.Y / divisorY);

        Console.WriteLine($"point + offset: {addedOffset}");
        Console.WriteLine($"point - offset: {subtractedOffset}");
        Console.WriteLine($"point * scale: {scaledPoint}");
        Console.WriteLine($"point / divisor: {dividedPoint}");
        Console.WriteLine();
    }

    static void ExtensionMethodsThis()
    {
        // ToVector demonstration - using extension method
        Point vectorPoint = new Point(12, 16);
        Vector2 vector = vectorPoint.ToVector();
        Console.WriteLine($"Point {vectorPoint} as Vector2: {vector}");
        Console.WriteLine();

        // Translate demonstration - using extension method
        Point translatePoint = new Point(5, 5);
        Console.WriteLine($"Before Translate: {translatePoint}");
        translatePoint.Translate(3, -2);
        Console.WriteLine($"After Translate(3, -2): {translatePoint}");
        Console.WriteLine();

        // Scale demonstration - using extension method
        Point scalePoint = new Point(4, 6);
        Console.WriteLine($"Before Scale: {scalePoint}");
        scalePoint.Scale(2, 3);
        Console.WriteLine($"After Scale(2, 3): {scalePoint}");
        Console.WriteLine();

        // Rotate demonstration - using extension method
        Point rotatePoint1 = new Point(10, 0);
        Console.WriteLine($"Before Rotate: {rotatePoint1}");
        rotatePoint1.Rotate(90);
        Console.WriteLine($"After Rotate(90°): {rotatePoint1}");

        Point rotatePoint2 = new Point(5, 5);
        Console.WriteLine($"Before Rotate: {rotatePoint2}");
        rotatePoint2.Rotate(45);
        Console.WriteLine($"After Rotate(45°): {rotatePoint2}");

        Point rotatePoint3 = new Point(3, 4);
        Console.WriteLine($"Before Rotate: {rotatePoint3}");
        rotatePoint3.Rotate(180);
        Console.WriteLine($"After Rotate(180°): {rotatePoint3}");
        Console.WriteLine();
    }

    static void MoreExamples()
    {
        // Combining operators and methods
        Console.WriteLine("Scenario 1: Building a rectangle using inline operators");
        Point topLeft = Point.Empty; // Inline equivalent of Point.Origin
        Point bottomRight = new Point(topLeft.X + 10, topLeft.Y + 8); // Inline addition
        Point topRight = new Point(bottomRight.X, topLeft.Y);
        Point bottomLeft = new Point(topLeft.X, bottomRight.Y);

        Console.WriteLine($"Rectangle corners:");
        Console.WriteLine($"  Top-Left: {topLeft}");
        Console.WriteLine($"  Top-Right: {topRight}");
        Console.WriteLine($"  Bottom-Left: {bottomLeft}");
        Console.WriteLine($"  Bottom-Right: {bottomRight}");
        Console.WriteLine();

        // Transformation chain
        Console.WriteLine("Scenario 2: Transformation chain (mixed methods)");
        Point transformPoint = new Point(2, 3);
        Console.WriteLine($"Starting point: {transformPoint}");

        // Scale up - using extension method
        transformPoint.Scale(3, 2);
        Console.WriteLine($"After scaling by (3, 2): {transformPoint}");

        // Translate - using inline addition
        transformPoint = new Point(transformPoint.X + 5, transformPoint.Y + (-3));
        Console.WriteLine($"After translating by (5, -3): {transformPoint}");

        // Rotate - using extension method
        transformPoint.Rotate(45);
        Console.WriteLine($"After rotating 45�: {transformPoint}");

        // Convert to vector - using extension method
        Vector2 finalVector = transformPoint.ToVector();
        Console.WriteLine($"Final result as Vector2: {finalVector}");
        Console.WriteLine();

        // Distance calculation using inline operators and extension methods
        Console.WriteLine("Scenario 3: Distance calculation (mixed methods)");
        Point point1 = new Point(1, 1);
        Point point2 = new Point(4, 5);
        Point difference = new Point(point2.X - point1.X, point2.Y - point1.Y); // Inline subtraction
        Vector2 diffVector = difference.ToVector(); // Extension method
        float distance = diffVector.Length();

        Console.WriteLine($"Point 1: {point1}");
        Console.WriteLine($"Point 2: {point2}");
        Console.WriteLine($"Difference: {difference}");
        Console.WriteLine($"Distance: {distance:F2}");
        Console.WriteLine();

        Console.WriteLine("Traditional extension methods demonstration complete!");
    }
}
```
1. Replace the content of `Program.cs` with the demonstration code:

```csharp
ExtensionMethodsDemonstrations.TraditionalExtensionMethods();
```
1. Run the sample application and examine the output.

Traditional extension methods can only add instance methods to existing types. Extension members enable you to add static properties, which provides a more natural way to extend types with constants or computed values.

## Add static properties with extension members

First, examine this code in the sample:

```csharp
// Inline implementation since Point.Origin doesn't exist in ExtensionMethods
Point origin = Point.Empty; // Equivalent to Point.Origin
Console.WriteLine($"Point.Origin (inline): {origin}");
Console.WriteLine($"Same as Point.Empty: {origin == Point.Empty}");
Console.WriteLine();
```
Many apps that use 2D geometry use the concept of an `Origin`, which is the same value as `System.Drawing.Point.Empty`. This code uses that fact, but some developers might create a `new Point(0,0)`, which incurs some extra work. In a given domain, you want to express these common values through static properties.

Create `NewExtensionsMembers.cs` to create extension members that solve this problem:

```csharp
using System.Drawing;
using System.Numerics;

namespace ExtensionMembers;

public static class PointExtensions
{
    extension (Point)
    {
        public static Point Origin => Point.Empty;
    }
}
```

The preceding code adds a static *extension property* to the `Point` struct. The `extension` keyword introduces an *extension block*. This extension block extends the `Point` struct.

You can use this static property as though it were a member of the `Point` struct.

```csharp
Console.WriteLine("1. Static Properties");
Console.WriteLine("-------------------");

Point origin = Point.Origin;
Console.WriteLine($"Point.Origin: {origin}");
Console.WriteLine($"Same as Point.Empty: {origin == Point.Empty}");
Console.WriteLine();
```
The `Point.Origin` property now appears as if it were part of the original `Point` type, providing a more intuitive API.

## Implement arithmetic operators

Next, examine the following code that performs arithmetic with points:

```csharp
Point p1 = new Point(5, 3);
Point p2 = new Point(2, 7);

Console.WriteLine($"Point 1: {p1}");
Console.WriteLine($"Point 2: {p2}");

// Inline implementation since + and - operators don't exist in ExtensionMethods
Point addition = new Point(p1.X + p2.X, p1.Y + p2.Y);
Point subtraction1 = new Point(p1.X - p2.X, p1.Y - p2.Y);
Point subtraction2 = new Point(p2.X - p1.X, p2.Y - p1.Y);

Console.WriteLine($"Addition (p1 + p2): {addition}");
Console.WriteLine($"Subtraction (p1 - p2): {subtraction1}");
Console.WriteLine($"Subtraction (p2 - p1): {subtraction2}");
Console.WriteLine();
```
Traditional extension methods can't add operators to existing types. You must implement arithmetic operations manually, which makes the code verbose and harder to read. The algorithm gets duplicated whenever you need the operation, which creates more opportunities for small mistakes to enter the code base. It's better to place that code in one location. Add the following operators to your extension block in `NewExtensionsMembers.cs`:

```csharp
public static Point operator +(Point left, Point right) =>
    new Point(left.X + right.X, left.Y + right.Y);

public static Point operator -(Point left, Point right) =>
    new Point(left.X - right.X, left.Y - right.Y);
```
By using extension members, you can add operators directly to existing types. Now you can perform arithmetic operations by using natural syntax:

```csharp
Console.WriteLine("2. Arithmetic Operators (Point + Point, Point - Point)");
Console.WriteLine("-----------------------------------------------------");

Point p1 = new Point(5, 3);
Point p2 = new Point(2, 7);

Console.WriteLine($"Point 1: {p1}");
Console.WriteLine($"Point 2: {p2}");
Console.WriteLine($"Addition (p1 + p2): {p1 + p2}");
Console.WriteLine($"Subtraction (p1 - p2): {p1 - p2}");
Console.WriteLine($"Subtraction (p2 - p1): {p2 - p1}");
Console.WriteLine();
```
The extension operators make point arithmetic as natural as working with built-in numeric types.
