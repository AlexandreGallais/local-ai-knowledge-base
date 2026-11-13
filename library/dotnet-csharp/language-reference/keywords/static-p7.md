---
title: "static modifier (part 7 of 13)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/static.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# static modifier (part 7 of 13)

```csharp
            double r = 3.0, h = 5.0;
            Shape c = new Circle(r);
            Shape s = new Sphere(r);
            Shape l = new Cylinder(r, h);
            // Display results.
            Console.WriteLine($"Area of Circle   = {c.Area():F2}");
            Console.WriteLine($"Area of Sphere   = {s.Area():F2}");
            Console.WriteLine($"Area of Cylinder = {l.Area():F2}");
        }
    }
    /*
    Output:
    Area of Circle   = 28.27
    Area of Sphere   = 113.10
    Area of Cylinder = 150.80
    */

    class VolatileTest
    {
        public volatile int sharedStorage;

        public void Test(int i)
        {
            sharedStorage = i;
        }
    }

    class UsingTest
    {
        static void Main()
        {
            using (var sr = new System.IO.StreamReader(@"C:\Users\Public\Documents\test.txt"))
            {
                string s = null;
                while((s = sr.ReadLine()) != null)
                {
                    Console.WriteLine(s);
                }
            }

            Console.ReadKey();
        }
    }

    class MyBaseClass
    {
        // virtual automatically implemented property. Overrides can only
        // provide specialized behavior if they implement get and set accessors.
        public virtual string Name { get; set; }

        // ordinary virtual property with backing field
        private int _num;
        public virtual int Number
        {
            get { return _num; }
            set { _num = value; }
        }
    }

    class MyDerivedClass : MyBaseClass
    {
        private string _name;

        // Override automatically implemented property with ordinary property
        // to provide specialized accessor behavior.
        public override string Name
        {
            get
            {
                return _name;
            }
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    _name = value;
                }
                else
                {
                    _name = "Unknown";
                }
            }
        }
    }

    public class AbstractExercise3
    {
        public abstract class Shape
        {
            public string Color { get; set; }

            // Constructor of the abstract class
            protected Shape(string color)
            {
                Color = color;
                Console.WriteLine($"Created a shape with color {color}.");
            }

            // Abstract method that must be implemented by derived classes
            public abstract double CalculateArea();
        }

        public class Square : Shape
        {
            public double Side { get; set; }

            // Constructor of the derived class calling the base class constructor
            public Square(string color, double side) : base(color)
            {
                Side = side;
            }

            public override double CalculateArea()
            {
                return Side * Side;
            }
        }

        public class Program
        {
            public static void Main(string[] args)
             {
                    Square square = new Square("red", 5);
                    Console.WriteLine($"Area of the square: {square.CalculateArea()}");            
             }
        }
    } 

  class Calc1
  {
      public void CalculateSum()
      {
          int a = 3;
          int b = 7;

          // Static local function - cannot access 'a' or 'b' directly
          static int Add(int x, int y)
          {
              return x + y;
          }

          int result = Add(a, b); 
          Console.WriteLine($"Sum: {result}");
      }
  }
    /*
   Output:
   Sum: 10
   */

  class Calc2
  {
      static void Main()
      {
          Func<int, int, int> add = static (a, b) => a + b;

          int result = add(5, 10);
          Console.WriteLine($"Sum: {result}");
      }
  }
  /*
  Output:
  Sum: 15
  */
}
```
A constant or type declaration is implicitly a `static` member. You can't reference a `static` member through an instance. Instead, reference it through the type name. For example, consider the following class:
