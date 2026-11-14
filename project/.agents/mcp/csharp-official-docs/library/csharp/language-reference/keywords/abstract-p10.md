---
title: "abstract keyword (part 10 of 10)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/abstract.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# abstract keyword (part 10 of 10)

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
The `Shape` class is declared `abstract`, which means you can't instantiate it directly. Instead, it serves as a blueprint for other classes.

- Even though you can't create objects of an abstract class, it can still have a constructor. This constructor is typically `protected`, meaning only derived classes can access it.
  In this case, the `Shape` constructor takes a `color` parameter and initializes the `Color` property. It also prints a message to the console.
  The `public Square(string color, double side) : base(color)` part calls the base class's constructor (`Shape`) and passes the `color` argument to it.
- In the `Shape` class, the defined constructor takes a color as a parameter `protected Shape(string color)`. This means C# no longer provides a default parameterless constructor automatically. Derived classes must use the `: base(color)` expression to invoke the base constructor. Setting the default value to color `protected Shape(string color="green")` allows omitting the `: base(color)` expression in derived classes. The constructor `protected Shape(string color="green")` sets the color to green.

## C# Language Specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- virtual
- override
- closed
- C# Keywords
