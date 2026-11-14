---
title: "extern modifier (part 3 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/extern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# extern modifier (part 3 of 3)

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
This example illustrates a C# program that calls into a C library (a native DLL).

1. Create the following C file and name it `cmdll.c`:

    ```c
    // cmdll.c
    // Compile with: -LD
    int __declspec(dllexport) SampleMethod(int i)
    {
      return i*10;
    }
    ```

1. Open a Visual Studio x64 (or x86) Native Tools Command Prompt window from the Visual Studio installation directory and compile the `cmdll.c` file by typing **cl -LD cmdll.c** at the command prompt.

1. In the same directory, create the following C# file and name it `cm.cs`:

    ```csharp
    // cm.cs
    using System;
    using System.Runtime.InteropServices;
    public class MainClass
    {
        [DllImport("Cmdll.dll")]
          public static extern int SampleMethod(int x);

        static void Main()
        {
            Console.WriteLine("SampleMethod() returns {0}.", SampleMethod(5));
        }
    }
    ```

1. Open a Visual Studio x64 (or x86) Native Tools Command Prompt window from the Visual Studio installation directory and compile the `cm.cs` file by typing:

    > **csc cm.cs** (for the x64 command prompt)
    > —or—
    > **csc -platform:x86 cm.cs** (for the x86 command prompt)

    This command creates the executable file `cm.exe`.

1. Run `cm.exe`. The `SampleMethod` method passes the value 5 to the DLL file, which returns the value multiplied by 10. The program produces the following output:

    ```output
    SampleMethod() returns 50.
    ```

## C# language specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- `System.Runtime.InteropServices.DllImportAttribute`
- C# Keywords
- Modifiers
