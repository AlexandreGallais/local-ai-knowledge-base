---
title: "Tutorial: Introduction to Inheritance (part 5 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/tutorials/inheritance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Introduction to Inheritance (part 5 of 5)

## Designing abstract base classes and their derived classes

In the previous example, you defined a base class that provided an implementation for a number of methods to allow derived classes to share code. In many cases, however, the base class is not expected to provide an implementation. Instead, the base class is an *abstract class* that declares *abstract methods*; it serves as a template that defines the members that each derived class must implement. Typically in an abstract base class, the implementation of each derived type is unique to that type. You marked the class with the abstract keyword because it made no sense to instantiate a `Publication` object, although the class did provide implementations of functionality common to publications.

For example, each closed two-dimensional geometric shape includes two properties: area, the inner extent of the shape; and perimeter, or the distance along the edges of the shape. The way in which these properties are calculated, however, depends completely on the specific shape. The formula for calculating the perimeter (or circumference) of a circle, for example, is different from that of a square. The `Shape` class is an `abstract` class with `abstract` methods. That indicates derived classes share the same functionality, but those derived classes implement that functionality differently.

The following example defines an abstract base class named `Shape` that defines two properties: `Area` and `Perimeter`. In addition to marking the class with the abstract keyword, each instance member is also marked with the abstract keyword. In this case, `Shape` also overrides the `System.Object.ToString*` method to return the name of the type, rather than its fully qualified name. And it defines two static members, `GetArea` and `GetPerimeter`, that allow callers to easily retrieve the area and perimeter of an instance of any derived class. When you pass an instance of a derived class to either of these methods, the runtime calls the method override of the derived class.

```csharp
public abstract class Shape
{
    public abstract double Area { get; }

    public abstract double Perimeter { get; }

    public override string ToString() => GetType().Name;

    public static double GetArea(Shape shape) => shape.Area;

    public static double GetPerimeter(Shape shape) => shape.Perimeter;
}

namespace DerivedClasses
{
    using System;

    public class Square : Shape
    {
        public Square(double length)
        {
            Side = length;
        }

        public double Side { get; }

        public override double Area => Math.Pow(Side, 2);

        public override double Perimeter => Side * 4;

        public double Diagonal => Math.Round(Math.Sqrt(2) * Side, 2);
    }

    public class Rectangle : Shape
    {
        public Rectangle(double length, double width)
        {
            Length = length;
            Width = width;
        }

        public double Length { get; }

        public double Width { get; }

        public override double Area => Length * Width;

        public override double Perimeter => 2 * Length + 2 * Width;

        public bool IsSquare() => Length == Width;

        public double Diagonal => Math.Round(Math.Sqrt(Math.Pow(Length, 2) + Math.Pow(Width, 2)), 2);
    }

    public class Circle : Shape
    {
        public Circle(double radius)
        {
            Radius = radius;
        }

        public override double Area => Math.Round(Math.PI * Math.Pow(Radius, 2), 2);

        public override double Perimeter => Math.Round(Math.PI * 2 * Radius, 2);

        // Define a circumference, since it's the more familiar term.
        public double Circumference => Perimeter;

        public double Radius { get; }

        public double Diameter => Radius * 2;
    }
} // Namespace definition

namespace Example
{

    using DerivedClasses;
    using System;

    public class Example
    {
        public static void Main()
        {
            Shape[] shapes = { new Rectangle(10, 12), new Square(5),
                        new Circle(3) };
            foreach (Shape shape in shapes)
            {
                Console.WriteLine($"{shape}: area, {Shape.GetArea(shape)}; " +
                                  $"perimeter, {Shape.GetPerimeter(shape)}");
                if (shape is Rectangle rect)
                {
                    Console.WriteLine($"   Is Square: {rect.IsSquare()}, Diagonal: {rect.Diagonal}");
                    continue;
                }
                if (shape is Square sq)
                {
                    Console.WriteLine($"   Diagonal: {sq.Diagonal}");
                    continue;
                }
            }
        }
    }
    // The example displays the following output:
    //         Rectangle: area, 120; perimeter, 44
    //            Is Square: False, Diagonal: 15.62
    //         Square: area, 25; perimeter, 20
    //            Diagonal: 7.07
    //         Circle: area, 28.27; perimeter, 18.85
} // Namespace definition.
```

You can then derive some classes from `Shape` that represent specific shapes. The following example defines three classes, `Square`, `Rectangle`, and `Circle`. Each uses a formula unique for that particular shape to compute the area and perimeter. Some of the derived classes also define properties, such as `Rectangle.Diagonal` and `Circle.Diameter`, that are unique to the shape that they represent.

```csharp
public abstract class Shape
{
    public abstract double Area { get; }

    public abstract double Perimeter { get; }

    public override string ToString() => GetType().Name;

    public static double GetArea(Shape shape) => shape.Area;

    public static double GetPerimeter(Shape shape) => shape.Perimeter;
}

namespace DerivedClasses
{
    using System;

    public class Square : Shape
    {
        public Square(double length)
        {
            Side = length;
        }

        public double Side { get; }

        public override double Area => Math.Pow(Side, 2);

        public override double Perimeter => Side * 4;

        public double Diagonal => Math.Round(Math.Sqrt(2) * Side, 2);
    }

    public class Rectangle : Shape
    {
        public Rectangle(double length, double width)
        {
            Length = length;
            Width = width;
        }

        public double Length { get; }

        public double Width { get; }

        public override double Area => Length * Width;

        public override double Perimeter => 2 * Length + 2 * Width;

        public bool IsSquare() => Length == Width;

        public double Diagonal => Math.Round(Math.Sqrt(Math.Pow(Length, 2) + Math.Pow(Width, 2)), 2);
    }

    public class Circle : Shape
    {
        public Circle(double radius)
        {
            Radius = radius;
        }

        public override double Area => Math.Round(Math.PI * Math.Pow(Radius, 2), 2);

        public override double Perimeter => Math.Round(Math.PI * 2 * Radius, 2);

        // Define a circumference, since it's the more familiar term.
        public double Circumference => Perimeter;

        public double Radius { get; }

        public double Diameter => Radius * 2;
    }
} // Namespace definition

namespace Example
{

    using DerivedClasses;
    using System;

    public class Example
    {
        public static void Main()
        {
            Shape[] shapes = { new Rectangle(10, 12), new Square(5),
                        new Circle(3) };
            foreach (Shape shape in shapes)
            {
                Console.WriteLine($"{shape}: area, {Shape.GetArea(shape)}; " +
                                  $"perimeter, {Shape.GetPerimeter(shape)}");
                if (shape is Rectangle rect)
                {
                    Console.WriteLine($"   Is Square: {rect.IsSquare()}, Diagonal: {rect.Diagonal}");
                    continue;
                }
                if (shape is Square sq)
                {
                    Console.WriteLine($"   Diagonal: {sq.Diagonal}");
                    continue;
                }
            }
        }
    }
    // The example displays the following output:
    //         Rectangle: area, 120; perimeter, 44
    //            Is Square: False, Diagonal: 15.62
    //         Square: area, 25; perimeter, 20
    //            Diagonal: 7.07
    //         Circle: area, 28.27; perimeter, 18.85
} // Namespace definition.
```

The following example uses objects derived from `Shape`. It instantiates an array of objects derived from `Shape` and calls the static methods of the `Shape` class, which wraps return `Shape` property values. The runtime retrieves values from the overridden properties of the derived types. The example also casts each `Shape` object in the array to its derived type and, if the cast succeeds, retrieves properties of that particular subclass of `Shape`.

```csharp
public abstract class Shape
{
    public abstract double Area { get; }

    public abstract double Perimeter { get; }

    public override string ToString() => GetType().Name;

    public static double GetArea(Shape shape) => shape.Area;

    public static double GetPerimeter(Shape shape) => shape.Perimeter;
}

namespace DerivedClasses
{
    using System;

    public class Square : Shape
    {
        public Square(double length)
        {
            Side = length;
        }

        public double Side { get; }

        public override double Area => Math.Pow(Side, 2);

        public override double Perimeter => Side * 4;

        public double Diagonal => Math.Round(Math.Sqrt(2) * Side, 2);
    }

    public class Rectangle : Shape
    {
        public Rectangle(double length, double width)
        {
            Length = length;
            Width = width;
        }

        public double Length { get; }

        public double Width { get; }

        public override double Area => Length * Width;

        public override double Perimeter => 2 * Length + 2 * Width;

        public bool IsSquare() => Length == Width;

        public double Diagonal => Math.Round(Math.Sqrt(Math.Pow(Length, 2) + Math.Pow(Width, 2)), 2);
    }

    public class Circle : Shape
    {
        public Circle(double radius)
        {
            Radius = radius;
        }

        public override double Area => Math.Round(Math.PI * Math.Pow(Radius, 2), 2);

        public override double Perimeter => Math.Round(Math.PI * 2 * Radius, 2);

        // Define a circumference, since it's the more familiar term.
        public double Circumference => Perimeter;

        public double Radius { get; }

        public double Diameter => Radius * 2;
    }
} // Namespace definition

namespace Example
{

    using DerivedClasses;
    using System;

    public class Example
    {
        public static void Main()
        {
            Shape[] shapes = { new Rectangle(10, 12), new Square(5),
                        new Circle(3) };
            foreach (Shape shape in shapes)
            {
                Console.WriteLine($"{shape}: area, {Shape.GetArea(shape)}; " +
                                  $"perimeter, {Shape.GetPerimeter(shape)}");
                if (shape is Rectangle rect)
                {
                    Console.WriteLine($"   Is Square: {rect.IsSquare()}, Diagonal: {rect.Diagonal}");
                    continue;
                }
                if (shape is Square sq)
                {
                    Console.WriteLine($"   Diagonal: {sq.Diagonal}");
                    continue;
                }
            }
        }
    }
    // The example displays the following output:
    //         Rectangle: area, 120; perimeter, 44
    //            Is Square: False, Diagonal: 15.62
    //         Square: area, 25; perimeter, 20
    //            Diagonal: 7.07
    //         Circle: area, 28.27; perimeter, 18.85
} // Namespace definition.
```
