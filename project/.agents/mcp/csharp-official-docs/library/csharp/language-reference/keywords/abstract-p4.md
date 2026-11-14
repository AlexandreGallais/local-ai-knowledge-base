---
title: "abstract keyword (part 4 of 10)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/abstract.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# abstract keyword (part 4 of 10)

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
Abstract classes have the following features:

- You can't create an instance of an abstract class.
- An abstract class can contain abstract methods and accessors.
- An abstract class can also contain implemented methods, properties, fields, and other members that provide functionality to derived classes.
- You can't use the `sealed` modifier on an abstract class because the two modifiers have opposite meanings. The `sealed` modifier prevents a class from being inherited and the `abstract` modifier requires a class to be inherited.
- A non-abstract class derived from an abstract class must include actual implementations of all inherited abstract methods and accessors.

Use the `abstract` modifier in a method or property declaration to indicate that the method or property doesn't contain implementation.

Abstract methods have the following features:

- An abstract method is implicitly a virtual method.
- Abstract method declarations are only permitted in abstract classes.
- Because an abstract method declaration provides no actual implementation, there's no method body. The method declaration simply ends with a semicolon. For example:

  ```csharp
  public abstract void MyMethod();
  ```

  The implementation is provided by a method `override`, which is a member of a non-abstract class.

- It's an error to use the `static` or `virtual` modifiers in an abstract method declaration in a `class` type. You can declare `static abstract` and `static virtual` methods in interfaces.

  Abstract properties behave like abstract methods, except for the differences in declaration and invocation syntax.

- It's an error to use the `abstract` modifier on a static property in a `class` type. You can declare `static abstract` or `static virtual` properties in interface declarations.
- An abstract inherited property can be overridden in a derived class by including a property declaration that uses the `override` modifier.

For more information about abstract classes, see Abstract and Sealed Classes and Class Members.

An abstract class must provide implementation for all interface members. An abstract class that implements an interface might map the interface methods onto abstract methods. For example:
