---
title: "How to explicitly implement members of two interfaces (part 7 of 9)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/interfaces/how-to-explicitly-implement-members-of-two-interfaces.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to explicitly implement members of two interfaces (part 7 of 9)

```csharp
            // Derived - Method2

            // The following two calls produce different results for the
            // method defined by using override (Method1) and the
            // method defined by using new (Method2).
            bcdc.Method1();
            bcdc.Method2();
            // Output:
            // Derived - Method1
            // Base - Method2
        }
    }

    class BaseClass
    {
        public virtual void Method1()
        {
            Console.WriteLine("Base - Method1");
        }

        public virtual void Method2()
        {
            Console.WriteLine("Base - Method2");
        }
    }

    class DerivedClass : BaseClass
    {
        public override void Method1()
        {
            Console.WriteLine("Derived - Method1");
        }

        public new void Method2()
        {
            Console.WriteLine("Derived - Method2");
        }
    }
}

// Output:
// Base - Method1
// Base - Method2
// Derived - Method1
// Derived - Method2
// Derived - Method1
// Base - Method2

namespace pieces
{
    using System;

    class BaseClass
    {
        public void Method1()
        {
            Console.WriteLine("Base - Method1");
        }
    }

    class DerivedClass : BaseClass
    {
        public void Method2()
        {
            Console.WriteLine("Derived - Method2");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            BaseClass bc = new();
            DerivedClass dc = new();
            BaseClass bcdc = new DerivedClass();

            bc.Method1();
            dc.Method1();
            dc.Method2();
            bcdc.Method1();
        }
        // Output:
        // Base - Method1
        // Base - Method1
        // Derived - Method2
        // Base - Method1
    }

    class morePieces
    {
        public void callers()
        {
            BaseClass bc = new();
            DerivedClass dc = new();
            BaseClass bcdc = new DerivedClass();
            bc.Method1();
            bc.Method2();
            dc.Method1();
            dc.Method2();
            bcdc.Method1();
            bcdc.Method2();

            // Output:
            // Base - Method1
            // Base - Method2
            // Base - Method1
            // Derived - Method2
            // Base - Method1
            // Base - Method2
        }

        public class BaseClass
        {
            public void Method1()
            {
                Console.WriteLine("Base - Method1");
            }

            public void Method2()
            {
                Console.WriteLine("Base - Method2");
            }
        }

        class DerivedClass : BaseClass
        {
            public new void Method2()
            {
                Console.WriteLine("Derived - Method2");
            }
        }
    }
}

namespace OverrideAndNew2
{
    using System;
    using System.Collections.Generic;

    class Program
    {
        static void Main(string[] args)
        {
            // Declare objects of the derived classes and test which version
            // of ShowDetails is run, base or derived.
            TestCars1();

            // Declare objects of the base class, instantiated with the
            // derived classes, and repeat the tests.
            TestCars2();

            // Declare objects of the derived classes and call ShowDetails
            // directly.
            TestCars3();

            // Declare objects of the base class, instantiated with the
            // derived classes, and repeat the tests.
            TestCars4();
        }

        public static void TestCars1()
        {
            Console.WriteLine("\nTestCars1");
            Console.WriteLine("----------");

            Car car1 = new();
            car1.DescribeCar();
            Console.WriteLine("----------");

            // Note the output from this test case. The ShowDetails method is
            // declared with the new modifier.
            ConvertibleCar car2 = new();
            car2.DescribeCar();
            Console.WriteLine("----------");

            Minivan car3 = new();
            car3.DescribeCar();
            Console.WriteLine("----------");
        }

        // Output:

        // TestCars1
        // ----------
        // Four wheels and an engine.
        // Standard transportation.
        // ----------
        // Four wheels and an engine.
        // Standard transportation.
        // ----------
        // Four wheels and an engine.
        // Carries seven people.
        // ----------

        public static void TestCars2()
        {
            Console.WriteLine("\nTestCars2");
            Console.WriteLine("----------");

            var cars = new List<Car> { new(), new ConvertibleCar(),
                new Minivan() };

            foreach (Car car in cars)
            {
                car.DescribeCar();
                Console.WriteLine("----------");
            }
        }

        // Output:

        // TestCars2
        // ----------
        // Four wheels and an engine.
        // Standard transportation.
        // ----------
        // Four wheels and an engine.
        // Standard transportation.
        // ----------
        // Four wheels and an engine.
        // Carries seven people.
        // ----------

        public static void TestCars3()
        {
            Console.WriteLine("\nTestCars3");
            Console.WriteLine("----------");
            ConvertibleCar car2 = new();
            Minivan car3 = new();
            car2.ShowDetails();
            car3.ShowDetails();
        }

        public static void TestCars4()
        {
            Console.WriteLine("\nTestCars4");
            Console.WriteLine("----------");
            Car car2 = new ConvertibleCar();
            Car car3 = new Minivan();
            car2.ShowDetails();
            car3.ShowDetails();
        }

        // Output:

        // TestCars3
        // ----------
        // A roof that opens up.
        // Carries seven people.

        // TestCars4
        // ----------
        // Standard transportation.
        // Carries seven people.
    }

    // Define the base class, Car. The class defines two methods, DescribeCar
    // and ShowDetails. DescribeCar calls ShowDetails, and each derived class
    // also defines a ShowDetails method. The example tests which version of
    // ShowDetails is selected, the base class method or the derived class method.
    class Car
    {
        public void DescribeCar()
        {
            Console.WriteLine("Four wheels and an engine.");
            ShowDetails();
        }

        public virtual void ShowDetails()
        {
            Console.WriteLine("Standard transportation.");
        }
    }

    // Define the derived classes.

    // Class ConvertibleCar uses the new modifier to acknowledge that ShowDetails
    // hides the base class method.
    class ConvertibleCar : Car
    {
        public new void ShowDetails()
        {
            Console.WriteLine("A roof that opens up.");
        }
    }

    // Class Minivan uses the override modifier to specify that ShowDetails
    // extends the base class method.
    class Minivan : Car
    {
        public override void ShowDetails()
        {
            Console.WriteLine("Carries seven people.");
        }
    }
}
```  

 In this case, you can access the English units from the class instance and access the metric units from the interface instance:
