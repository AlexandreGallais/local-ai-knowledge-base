---
title: "Versioning with the Override and New Keywords (part 6 of 20)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/versioning-with-the-override-and-new-keywords.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Versioning with the Override and New Keywords (part 6 of 20)

```csharp
﻿using System;
using System.Drawing;
using System.Windows.Forms;

namespace Inheritance_ProgGuide
{
    class TestPaint : Form
    {
        protected override void OnPaint(PaintEventArgs e)
        {
            // Perform custom drawing
            System.Drawing.Graphics gfx = e.Graphics;
            gfx.DrawString("Hello, World!",
              new System.Drawing.Font("Arial", 16),
              new System.Drawing.SolidBrush(System.Drawing.Color.Blue),
              new System.Drawing.Point(10, 10));
        }

        private void InitializeComponent()
        {
            SuspendLayout();
            //
            // TestPaint
            //
            ClientSize = new Size(284, 264);
            Name = "TestPaint";
            Load += new EventHandler(TestPaint_Load);
            ResumeLayout(false);
        }

        private void TestPaint_Load(object sender, EventArgs e)
        {
        }
    }

    // compile with: csc -target:library abstractshape.cs
    public abstract class Shape
    {
        public Shape(string s)
        {
            // calling the set accessor of the Id property.
            Id = s;
        }

        public string Id { get; set; }

        // Area is a read-only property - only a get accessor is needed:
        public abstract double Area
        {
            get;
        }

        public override string ToString()
        {
            return $"{Id} Area = {Area:F2}";
        }
    }

    // compile with: csc -target:library -reference:abstractshape.dll shapes.cs
    public class Square : Shape
    {
        private int _side;

        public Square(int side, string id)
            : base(id)
        {
            _side = side;
        }

        public override double Area
        {
            get
            {
                // Given the side, return the area of a square:
                return _side * _side;
            }
        }
    }

    public class Circle : Shape
    {
        private int _radius;

        public Circle(int radius, string id)
            : base(id)
        {
            _radius = radius;
        }

        public override double Area
        {
            get
            {
                // Given the radius, return the area of a circle:
                return _radius * _radius * Math.PI;
            }
        }
    }

    public class Rectangle : Shape
    {
        private int _width;
        private int _height;

        public Rectangle(int width, int height, string id)
            : base(id)
        {
            _width = width;
            _height = height;
        }

        public override double Area
        {
            get
            {
                // Given the width and height, return the area of a rectangle:
                return _width * _height;
            }
        }
    }

    // compile with: csc -reference:abstractshape.dll;shapes.dll shapetest.cs
    class TestClass
    {
        static void Main()
        {
            Shape[] shapes =
            [
                new Square(5, "Square #1"),
                new Circle(3, "Circle #1"),
                new Rectangle( 4, 5, "Rectangle #1")
            ];

            Console.WriteLine("Shapes Collection");
            foreach (Shape s in shapes)
            {
                Console.WriteLine(s);
            }
        }
    }
    /* Output:
        Shapes Collection
        Square #1 Area = 25.00
        Circle #1 Area = 28.27
        Rectangle #1 Area = 20.00
    */

    class CarStuff
    {
        // Define the base class
        class Car
        {
            public virtual void DescribeCar()
            {
                Console.WriteLine("Four wheels and an engine.");
            }
        }

        // Define the derived classes
        class ConvertibleCar : Car
        {
            public new virtual void DescribeCar()
            {
                base.DescribeCar();
                Console.WriteLine("A roof that opens up.");
            }
        }

        class Minivan : Car
        {
            public override void DescribeCar()
            {
                base.DescribeCar();
                Console.WriteLine("Carries seven people.");
            }
        }

        public static void TestCars1()
        {
            Car car1 = new();
            car1.DescribeCar();
            Console.WriteLine("----------");

            ConvertibleCar car2 = new();
            car2.DescribeCar();
            Console.WriteLine("----------");

            Minivan car3 = new();
            car3.DescribeCar();
            Console.WriteLine("----------");
        }

        public static void TestCars2()
        {
            Car[] cars = [new Car(), new ConvertibleCar(), new Minivan()];
        }

        public static void TestCars3()
        {
            Car[] cars = new Car[3];

            foreach (Car vehicle in cars)
            {
                Console.WriteLine("Car object: " + vehicle.GetType());
                vehicle.DescribeCar();
                Console.WriteLine("----------");
            }
        }
    }

    interface IDimensions
    {
        float GetLength();
        float GetWidth();
    }

    class Box : IDimensions
    {
        float _lengthInches;
        float _widthInches;

        Box(float length, float width)
        {
            _lengthInches = length;
            _widthInches = width;
        }
        // Explicit interface member implementation:
        float IDimensions.GetLength()
        {
            return _lengthInches;
        }
        // Explicit interface member implementation:
        float IDimensions.GetWidth()
        {
            return _widthInches;
        }

        static void Main()
        {
            // Declare a class instance box1:
            Box box1 = new(30.0f, 20.0f);

            // Declare an interface instance dimensions:
            IDimensions dimensions = box1;

            // The following commented lines would produce compilation
            // errors because they try to access an explicitly implemented
            // interface member from a class instance:
            //Console.WriteLine($"Length: {box1.GetLength()}");
            //Console.WriteLine($"Width: {box1.GetWidth()}");

            // Print out the dimensions of the box by calling the methods
            // from an instance of the interface:
            Console.WriteLine($"Length: {dimensions.GetLength()}");
            Console.WriteLine($"Width: {dimensions.GetWidth()}");
        }
    }
    /* Output:
        Length: 30
        Width: 20
    */

    namespace WrapBox
    {
        // Declare the English units interface:
        interface IEnglishDimensions
        {
            float Length();
            float Width();
        }

        // Declare the metric units interface:
        interface IMetricDimensions
        {
            float Length();
            float Width();
        }

        // Declare the Box class that implements the two interfaces:
        // IEnglishDimensions and IMetricDimensions:
        class Box : IEnglishDimensions, IMetricDimensions
        {
            float _lengthInches;
            float _widthInches;

            public Box(float lengthInches, float widthInches)
            {
                _lengthInches = lengthInches;
                _widthInches = widthInches;
            }

            // Explicitly implement the members of IEnglishDimensions:
            float IEnglishDimensions.Length() => _lengthInches;

            float IEnglishDimensions.Width() => _widthInches;

            // Explicitly implement the members of IMetricDimensions:
            float IMetricDimensions.Length() => _lengthInches * 2.54f;

            float IMetricDimensions.Width() => _widthInches * 2.54f;

            static void Main()
            {
                // Declare a class instance box1:
                Box box1 = new(30.0f, 20.0f);

                // Declare an instance of the English units interface:
                IEnglishDimensions eDimensions = box1;

                // Declare an instance of the metric units interface:
                IMetricDimensions mDimensions = box1;

                // Print dimensions in English units:
                Console.WriteLine($"Length(in): {eDimensions.Length()}");
                Console.WriteLine($"Width (in): {eDimensions.Width()}");

                // Print dimensions in metric units:
                Console.WriteLine($"Length(cm): {mDimensions.Length()}");
                Console.WriteLine($"Width (cm): {mDimensions.Width()}");
            }
        }
        /* Output:
            Length(in): 30
            Width (in): 20
            Length(cm): 76.2
            Width (cm): 50.8
        */
    }

    class Test
    {
        interface IMetricDimensions
        {
            float Length();
            float Width();
        }

        class Box : IMetricDimensions
        {
            float _lengthInches;
            float _widthInches;

            public Box(float length, float width)
            {
                _lengthInches = length;
                _widthInches = width;
            }

            // Normal implementation:
            public float Length() => _lengthInches;
            public float Width() => _widthInches;

            // Explicit implementation:
            float IMetricDimensions.Length() => _lengthInches * 2.54f;
            float IMetricDimensions.Width() => _widthInches * 2.54f;

            public static void Test()
            {
                Box box1 = new(30.0f, 20.0f);
                IMetricDimensions mDimensions = box1;

                Console.WriteLine($"Length(in): {box1.Length()}");
                Console.WriteLine($"Width (in): {box1.Width()}");
                Console.WriteLine($"Length(cm): {mDimensions.Length()}");
                Console.WriteLine($"Width (cm): {mDimensions.Width()}");
            }
        }
    }
}

namespace WrapExample
{
    // Inheritance (C# Programming Guide)
    public class A { }
    public class B : A { }

    class Program
    {
        static void Main()
        {
            A a = new();
            B b = new();
            b = (B)a;
        }
    }
}

namespace WrapA
{
    public abstract class A
    {
        // Class members here.
    }
}

public abstract class A
{
    public abstract void DoWork(int i);
}

namespace WrapD
{
    // compile with: -target:library
    public class D
    {
        public virtual void DoWork(int i)
        {
            // Original implementation.
        }
    }

    public abstract class E : D
    {
        public abstract override void DoWork(int i);
    }

    public class F : E
    {
        public override void DoWork(int i)
        {
            // New implementation.
        }
    }
}

namespace WrapD2
{
    public sealed class D
    {
        // Class members here.
    }
}

public abstract class C
{
    public virtual void DoWork() { }
}

public class D : C
{
    public sealed override void DoWork() { }
}

namespace WrapClasses
{
    public class A
    {
        public virtual void DoWork() { }
    }
    public class B : A
    {
        public override void DoWork() { }
    }

    public class C : B
    {
        public override void DoWork() { }
    }
}

class TestGraphics
{
    class GraphicsClass
    {
        public virtual void DrawLine() { }
        public virtual void DrawPoint() { }
    }

    class YourDerivedGraphicsClass : GraphicsClass
    {
        public void DrawRectangle() { }
    }
}

class TestGraphics2
{
    class GraphicsClass
    {
        public virtual void DrawLine() { }
        public virtual void DrawPoint() { }
        public virtual void DrawRectangle() { }
    }

    class YourDerivedGraphicsClass : GraphicsClass
    {
        public override void DrawRectangle() { }
    }
}

class TestGraphics3
{
    class GraphicsClass
    {
        public virtual void DrawLine() { }
        public virtual void DrawPoint() { }
        public virtual void DrawRectangle() { }
    }

    class YourDerivedGraphicsClass : GraphicsClass
    {
        public new void DrawRectangle() { }
    }

    class X : YourDerivedGraphicsClass
    {
        public new void DrawRectangle()
        {
            base.DrawRectangle();
        }
    }
}

class TestSelection
{
    public class Base
    {
        public virtual void DoWork(int param) { }
    }

    public class Derived : Base
    {
        public override void DoWork(int param) { }
        public void DoWork(double param) { }
    }

    void Test()
    {
        int val = 5;
        Derived d = new();
        d.DoWork(val);  // Calls DoWork(double).

        ((Base)d).DoWork(val);  // Calls DoWork(int) on Derived.
    }
}

class OverrideToString
{
    class Person
    {
        public string Name { get; set; }
        public int Age { get; set; }

        public override string ToString()
        {
            return "Person: " + Name + " " + Age;
        }
    }

    void test()
    {
        int x = 42;
        string strx = x.ToString();
        Console.WriteLine(strx);
        // Output:
        // 42

        Person person = new() { Name = "John", Age = 12 };
        Console.WriteLine(person);
        // Output:
        // Person: John 12
    }
}

namespace ExplicitConversion
{
    class Test
    {
        public static void M()
        { Console.WriteLine("I'm just a Test"); }
    }
    class Program2
    {
        static void Main()
        {
            System.Collections.ArrayList list = [new Test(), new Test(), new Test()];

            foreach (object o in list)
            {
                if (o is Test t)
                {
                    Test.M();
                }
            }
        }
    }

    /* Output:
      I'm just a Test
      I'm just a Test
      I'm just a Test
     */
}

namespace RainyDay
{
    class JustInCase
    {
        static void Main()
        {
            Console.WriteLine("Saving for a rainy day.");

            Console.WriteLine("Saving for a rainy day.");
            Console.WriteLine("Saving for a rainy day.");
            Console.WriteLine("Saving for a rainy day.");
            Console.WriteLine("Saving for a rainy day.");
        }
    }
}

namespace OverrideAndNew
{
    using System;
    class Program
    {
        static void Main(string[] args)
        {
            BaseClass bc = new();
            DerivedClass dc = new();
            BaseClass bcdc = new DerivedClass();

            // The following two calls do what you would expect. They call
            // the methods that are defined in BaseClass.
            bc.Method1();
            bc.Method2();
            // Output:
            // Base - Method1
            // Base - Method2

            // The following two calls do what you would expect. They call
            // the methods that are defined in DerivedClass.
            dc.Method1();
            dc.Method2();
            // Output:
            // Derived - Method1
```
