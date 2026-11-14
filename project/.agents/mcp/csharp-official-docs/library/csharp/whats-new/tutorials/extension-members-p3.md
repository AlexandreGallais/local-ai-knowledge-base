---
title: "Explore extension members in C# 14 and C# 15 to enhance existing types (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/whats-new/tutorials/extension-members.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Explore extension members in C# 14 and C# 15 to enhance existing types (part 3 of 3)

## Completed sample

The final example shows the advantages when you combine static properties, operators, instance methods, and an indexer to create comprehensive type extensions.

Compare the extension member version:

```csharp
Console.WriteLine("6. Complex Scenarios");
Console.WriteLine("-------------------");

// Combining operators and methods
Console.WriteLine("Scenario 1: Building a rectangle using operators");
Point topLeft = Point.Origin;
Point bottomRight = topLeft + (10, 8);
Point topRight = new Point(bottomRight.X, topLeft.Y);
Point bottomLeft = new Point(topLeft.X, bottomRight.Y);

Console.WriteLine($"Rectangle corners:");
Console.WriteLine($"  Top-Left: {topLeft}");
Console.WriteLine($"  Top-Right: {topRight}");
Console.WriteLine($"  Bottom-Left: {bottomLeft}");
Console.WriteLine($"  Bottom-Right: {bottomRight}");
Console.WriteLine();

// Transformation chain
Console.WriteLine("Scenario 2: Transformation chain");
Point transformPoint = new Point(2, 3);
Console.WriteLine($"Starting point: {transformPoint}");

// Scale up
transformPoint.Scale(3, 2);
Console.WriteLine($"After scaling by (3, 2): {transformPoint}");

// Translate
transformPoint = transformPoint + (5, -3);
Console.WriteLine($"After translating by (5, -3): {transformPoint}");

// Rotate
transformPoint.Rotate(45);
Console.WriteLine($"After rotating 45°: {transformPoint}");

// Convert to vector
Vector2 finalVector = transformPoint.ToVector();
Console.WriteLine($"Final result as Vector2: {finalVector}");
Console.WriteLine();

// Distance calculation using operators
Console.WriteLine("Scenario 3: Distance calculation");
Point point1 = new Point(1, 1);
Point point2 = new Point(4, 5);
Point difference = point2 - point1;
Vector2 diffVector = difference.ToVector();
float distance = diffVector.Length();

Console.WriteLine($"Point 1: {point1}");
Console.WriteLine($"Point 2: {point2}");
Console.WriteLine($"Difference: {difference}");
Console.WriteLine($"Distance: {distance:F2}");
Console.WriteLine();

Console.WriteLine("Demonstration complete!");
```
With the previous version:

```csharp
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
```
This example demonstrates how extension members create a cohesive API that feels like part of the original type. You can:

- Use `Point.Origin` for a meaningful starting point
- Apply mathematical operators naturally (`point + offset`, `point * scale`)
- Chain transformations using both operators and methods
- Convert between related types (`ToVector()`)
- Read and update absolute points along a path with `path[index]`

### Migration benefits

When you migrate from traditional extension methods to extension members, you get:

1. **Static properties**: Add constants and computed values to types.
1. **Operators**: Enable natural mathematical and logical operations.
1. **Indexers**: Add C# 15 indexed access that can compute values from an existing type and update its stored state.
1. **Unified syntax**: All extension logic uses the same `extension` declaration.
1. **Type-level extensions**: Extend the type itself, not only instances.

Run the complete application to see both approaches side by side and observe how extension members provide a more integrated development experience.

## Related content

- Extension methods (C# Programming Guide)
- What's new in C# 14
- What's new in C# 15
- `extension` keyword (C# reference)
- Extension indexers feature specification
- Operator overloading (C# reference)
