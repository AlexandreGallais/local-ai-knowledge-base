---
title: "Explore extension members in C# 14 and C# 15 to enhance existing types (part 2 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/whats-new/tutorials/extension-members.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Explore extension members in C# 14 and C# 15 to enhance existing types (part 2 of 3)

## Add more operators

You can also add extension operators for the discrete operations shown in the following code example:

```csharp
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
```
The `+` and `-` operators are *binary operators* and require two operands, not three. Instead of two discrete integers, use a *tuple* to specify both the `X` and `Y` deltas:

```csharp
public static Point operator *(Point left, (int dx, int dy) scale) =>
    new Point(left.X * scale.dx, left.Y * scale.dy);
public static Point operator /(Point left, (int dx, int dy) scale) =>
    new Point(left.X / scale.dx, left.Y / scale.dy);
public static Point operator +(Point left, (int dx, int dy) scale) =>
    new Point(left.X + scale.dx, left.Y + scale.dy);
public static Point operator -(Point left, (int dx, int dy) scale) =>
    new Point(left.X - scale.dx, left.Y - scale.dy);
```
The preceding operator enables elegant tuple-based operations:

```csharp
Console.WriteLine("3. Discrete Operators using tuples (Point with (int, int))");
Console.WriteLine("------------------------------------------");

Point point = new Point(10, 8);
var offset = (3, -2);
var scale = (2, 3);
var divisor = (2, 4);

Console.WriteLine($"Original point: {point}");
Console.WriteLine($"Offset tuple: {offset}");
Console.WriteLine($"Scale tuple: {scale}");
Console.WriteLine($"Divisor tuple: {divisor}");
Console.WriteLine();

Console.WriteLine($"point + offset: {point + offset}");
Console.WriteLine($"point - offset: {point - offset}");
Console.WriteLine($"point * scale: {point * scale}");
Console.WriteLine($"point / divisor: {point / divisor}");
Console.WriteLine();
```
Your extensions can include multiple overloaded operators, as long as the operands are distinct.

## Migrate instance methods to extension members

Extension members also support instance methods. You don't have to change existing extension methods. The old and new forms are binary and source compatible. If you want to keep all your extensions in one container, you can. Migrating traditional extension methods to the new syntax maintains the same functionality.

### Traditional extension methods

The traditional approach uses the `this` parameter syntax:

```csharp
public static Vector2 ToVector(this Point point) =>
    new Vector2(point.X, point.Y);

public static void Translate(this Point point, int xDist, int yDist)
{
    point.X += xDist;
    point.Y += yDist;
}

public static void Scale(this Point point, int xScale, int yScale)
{
    point.X *= xScale;
    point.Y *= yScale;
}

public static void Rotate(this Point point, int angleInDegress)
{
    double theta = ((double)angleInDegress * Math.PI) / 180.0;
    double sinTheta = Math.Sin(theta);
    double cosTheta = Math.Cos(theta);
    double newX = (double)point.X * cosTheta - (double)point.Y * sinTheta;
    double newY = (double)point.X * sinTheta + (double)point.Y * cosTheta;
    point.X = (int)newX;
    point.Y = (int)newY;
}
```
Extension members use a different syntax but provide the same functionality. Add the following code to your new extension members class:

```csharp
public Vector2 ToVector() =>
    new Vector2(point.X, point.Y);

public void Translate(int xDist, int yDist)
{
    point.X += xDist;
    point.Y += yDist;
}

public void Scale(int xScale, int yScale)
{
    point.X *= xScale;
    point.Y *= yScale;
}

public void Rotate(int angleInDegrees)
{
    double theta = ((double)angleInDegrees * Math.PI) / 180.0;
    double sinTheta = Math.Sin(theta);
    double cosTheta = Math.Cos(theta);
    double newX = (double)point.X * cosTheta - (double)point.Y * sinTheta;
    double newY = (double)point.X * sinTheta + (double)point.Y * cosTheta;
    point.X = (int)newX;
    point.Y = (int)newY;
}
```
These methods extend an instance of the `Point` struct, not the `Point` type. The extension block names the receiver parameter so the method body can read that point. The sample uses `extension(ref Point point)` because `Translate`, `Scale`, and `Rotate` change the caller's `Point`. Without `ref`, those methods would update a copy of the struct, and the caller wouldn't see the change.

You can call these new instance methods exactly as you accessed traditional extension methods:

```csharp
Console.WriteLine("4. Instance Methods");
Console.WriteLine("------------------");

// ToVector demonstration
Point vectorPoint = new Point(12, 16);
Vector2 vector = vectorPoint.ToVector();
Console.WriteLine($"Point {vectorPoint} as Vector2: {vector}");
Console.WriteLine();

// Translate demonstration
Point translatePoint = new Point(5, 5);
Console.WriteLine($"Before Translate: {translatePoint}");
translatePoint.Translate(3, -2);
Console.WriteLine($"After Translate(3, -2): {translatePoint}");
Console.WriteLine();

// Scale demonstration
Point scalePoint = new Point(4, 6);
Console.WriteLine($"Before Scale: {scalePoint}");
scalePoint.Scale(2, 3);
Console.WriteLine($"After Scale(2, 3): {scalePoint}");
Console.WriteLine();

// Rotate demonstration
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
```
The key <example-value> is syntax: extension members use `extension (Type variableName)` instead of `this Type variableName`.

## Add extension indexers

C# 15 adds indexers to `extension` blocks. An indexer has no name. Code accesses it with `this[...]` in the declaration and with indexed syntax at the call site.

Imagine a path type that stores each step as a relative offset. When you ask for `path[i]`, you want the absolute point at that step. When you assign `path[i] = target`, you want the type to update the one offset that gets you there. Indexed access reads like "the point at this step" and keeps the offset-to-point math in one place.

Imagine that `Path` came from a library. If you don't own the type, you can't add an indexer to its source. Before C# 15, you could add methods, but you couldn't add `this[...]` indexed access to a type you don't control. This tutorial defines `Path` so the sample is runnable; think of it as standing in for that library type.

For this section, add a `Path` type. The type stores a sequence of `(dX, dY)` offsets. Each offset says how far to move from the previous point. The first offset starts at `Point.Origin`, the static extension property you added earlier.

Create a new file named `Path.cs` in the same project as the other sample files. Add the `Path` type to the `ExtensionMembers` namespace in that file. Keeping `Path` in this namespace makes it your sample type, not `System.IO.Path`. The demo file uses a `using Path = ExtensionMembers.Path;` alias, so every `Path` in the demo means the sample path type.

```csharp
public sealed class Path
{
    private readonly List<(int dX, int dY)> offsets = [];

    public Path(IEnumerable<(int dX, int dY)> offsets)
    {
        this.offsets.AddRange(offsets);
    }

    public int Count => offsets.Count;

    internal (int dX, int dY) GetOffset(int index) => offsets[index];

    internal void SetOffset(int index, (int dX, int dY) offset) =>
        offsets[index] = offset;
}
```
Now add an indexer for `Path`. Put this code in the existing `PointExtensions` static class in `NewExtensionsMembers.cs`. Add it as a new `extension(Path path)` block, separate from the `extension(Point)` block for static members and operators and separate from the `extension(ref Point point)` block for instance methods:

```csharp
extension(Path path)
{
    public Point this[int index]
    {
        get
        {
            ValidatePathIndex(path, index);

            Point absolutePoint = Point.Origin;
            for (int current = 0; current <= index; current++)
            {
                var offset = path.GetOffset(current);
                absolutePoint += offset;
            }

            return absolutePoint;
        }
        set
        {
            ValidatePathIndex(path, index);

            Point previousPoint = Point.Origin;
            for (int current = 0; current < index; current++)
            {
                var offset = path.GetOffset(current);
                previousPoint += offset;
            }

            path.SetOffset(index, (value.X - previousPoint.X, value.Y - previousPoint.Y));
        }
    }
}

private static void ValidatePathIndex(Path path, int index)
{
    if (index < 0 || index >= path.Count)
    {
        throw new ArgumentOutOfRangeException(nameof(index), index,
            "Index must refer to an offset in the path.");
    }
}
```
Indexers are always instance members, so this new extension block must name the receiver: `extension(Path path)`. A block written as `extension(Path)` wouldn't provide a `path` variable for the indexer body.

`Path` is a class that owns a list of offsets. The indexer doesn't need a `ref` receiver because the setter changes the contents of that existing `Path` object.

The getter starts at `Point.Origin`, then adds the offsets from index `0` through the requested index. With offsets `(2, 3)`, `(1, 1)`, and `(-1, 4)`, the absolute points are `(2, 3)`, `(3, 4)`, and `(2, 8)`.

The setter receives a target absolute point. It leaves earlier offsets alone and changes only the offset at the requested index. The new offset is the target point minus the absolute point at the previous index. Later points shift because they remain relative to the changed offset.

Now, use the indexer to read and write points along the path:

```csharp
Console.WriteLine("5. Path Indexer");
Console.WriteLine("---------------");

Path path = new([(dX: 2, dY: 3), (dX: 1, dY: 1), (dX: -1, dY: 4)]);
Console.WriteLine($"First point: {path[0]}");
Console.WriteLine($"Second point: {path[1]}");
Console.WriteLine($"Third point: {path[2]}");

path[1] = new Point(10, 10);
Console.WriteLine("After setting the second point to {X=10,Y=10}:");
Console.WriteLine($"Second point: {path[1]}");
Console.WriteLine($"Third point: {path[2]}");
Console.WriteLine();
```
Both accessors share a small private `ValidatePathIndex` helper in the same `PointExtensions` class that bounds-checks the index and throws `System.ArgumentOutOfRangeException` when it doesn't refer to an offset in the path.
