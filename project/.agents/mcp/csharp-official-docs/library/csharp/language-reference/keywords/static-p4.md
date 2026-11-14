---
title: "static modifier (part 4 of 13)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/static.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# static modifier (part 4 of 13)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
//for #8
using System.Runtime.InteropServices;

namespace csrefKeywordsModifiers
{
    abstract class Shape
    {
        public abstract int GetArea();
    }

    class Square : Shape
    {
        private int _side;

        public Square(int n) => _side = n;

        // GetArea method is required to avoid a compile-time error.
        public override int GetArea() => _side * _side;

        static void Main()
        {
            var sq = new Square(12);
            Console.WriteLine($"Area of the square = {sq.GetArea()}");
        }
    }
    // Output: Area of the square = 144

    interface I
    {
        void M();
    }

    abstract class C : I
    {
        public abstract void M();
    }

    // Abstract class
    abstract class BaseClass
    {
        protected int _x = 100;
        protected int _y = 150;

        // Abstract method
        public abstract void AbstractMethod();

        // Abstract properties
        public abstract int X { get; }
        public abstract int Y { get; }
    }

    class DerivedClass : BaseClass
    {
        public override void AbstractMethod()
        {
            _x++;
            _y++;
        }

        public override int X   // overriding property
        {
            get
            {
                return _x + 10;
            }
        }

        public override int Y   // overriding property
        {
            get
            {
                return _y + 10;
            }
        }

        static void Main()
        {
            var o = new DerivedClass();
            o.AbstractMethod();
            Console.WriteLine($"x = {o.X}, y = {o.Y}");
        }
    }
    // Output: x = 111, y = 161
}

namespace AccessibilityDomainNamespace
{
    public class T1
    {
        public static int publicInt;
        internal static int internalInt;
        private static int privateInt = 0;

        static T1()
        {
            // T1 can access public or internal members
            // in a public or private (or internal) nested class.
            M1.publicInt = 1;
            M1.internalInt = 2;
            M2.publicInt = 3;
            M2.internalInt = 4;

            // Cannot access the private member privateInt
            // in either class:
            // M1.privateInt = 2; //CS0122
        }

        public class M1
        {
            public static int publicInt;
            internal static int internalInt;
            private static int privateInt = 0;
        }

        private class M2
        {
            public static int publicInt = 0;
            internal static int internalInt = 0;
            private static int privateInt = 0;
        }
    }

    class MainClass
    {
        static void Main()
        {
            // Access is unlimited.
            T1.publicInt = 1;

            // Accessible only in current assembly.
            T1.internalInt = 2;

            // Error CS0122: inaccessible outside T1.
            // T1.privateInt = 3;

            // Access is unlimited.
            T1.M1.publicInt = 1;

            // Accessible only in current assembly.
            T1.M1.internalInt = 2;

            // Error CS0122: inaccessible outside M1.
            //    T1.M1.privateInt = 3;

            // Error CS0122: inaccessible outside T1.
            //    T1.M2.publicInt = 1;

            // Error CS0122: inaccessible outside T1.
            //    T1.M2.internalInt = 2;

            // Error CS0122: inaccessible outside M2.
            //    T1.M2.privateInt = 3;

            // Keep the console open in debug mode.
            System.Console.WriteLine("Press any key to exit.");
            System.Console.ReadKey();
        }
    }
}

namespace csrefKeywordsModifiers
{
    public class ConstTest
    {
        class SampleClass
        {
            public int X;
            public int Y;
            public const int C1 = 5;
            public const int C2 = C1 + 5;

            public SampleClass(int p1, int p2)
            {
                X = p1;
                Y = p2;
            }
        }

        static void Main()
        {
            var mC = new SampleClass(11, 22);
            Console.WriteLine($"X = {mC.X}, Y = {mC.Y}");
            Console.WriteLine($"C1 = {SampleClass.C1}, C2 = {SampleClass.C2}");
        }
    }
    /* Output
        X = 11, Y = 22
        C1 = 5, C2 = 10
    */

    public class SealedTest
    {
        static void Main()
        {
            const int C = 707;
            Console.WriteLine($"My local constant = {C}");
        }
    }
    // Output: My local constant = 707

    //using System.Runtime.InteropServices;
    class ExternTest
    {
        [DllImport("User32.dll", CharSet=CharSet.Unicode)]
        public static extern int MessageBox(IntPtr h, string m, string c, int type);

        static int Main()
        {
            string myString;
            Console.Write("Enter your message: ");
            myString = Console.ReadLine();
            return MessageBox((IntPtr)0, myString, "My Message Box", 0);
        }
    }

    class TestOverride
    {
        public class Employee
        {
            public string Name { get; }

            // Basepay is defined as protected, so that it may be
            // accessed only by this class and derived classes.
            protected decimal _basepay;

            // Constructor to set the name and basepay values.
            public Employee(string name, decimal basepay)
            {
                Name = name;
                _basepay = basepay;
            }

            // Declared virtual so it can be overridden.
            public virtual decimal CalculatePay()
            {
                return _basepay;
            }
        }

        // Derive a new class from Employee.
        public class SalesEmployee : Employee
        {
            // New field that will affect the base pay.
            private decimal _salesbonus;

            // The constructor calls the base-class version, and
            // initializes the salesbonus field.
            public SalesEmployee(string name, decimal basepay, decimal salesbonus)
                : base(name, basepay)
            {
                _salesbonus = salesbonus;
            }

            // Override the CalculatePay method
            // to take bonus into account.
            public override decimal CalculatePay()
            {
                return _basepay + _salesbonus;
            }
        }

        static void Main()
        {
            // Create some new employees.
            var employee1 = new SalesEmployee("Alice", 1000, 500);
            var employee2 = new Employee("Bob", 1200);

            Console.WriteLine($"Employee1 {employee1.Name} earned: {employee1.CalculatePay()}");
            Console.WriteLine($"Employee2 {employee2.Name} earned: {employee2.CalculatePay()}");
        }
    }
    /*
        Output:
        Employee1 Alice earned: 1500
        Employee2 Bob earned: 1200
    */

    class Employee2
    {
        private readonly string _name = "FirstName, LastName";
        private readonly double _salary = 100.0;

        public string GetName()
        {
            return _name;
        }

        public double Salary
        {
            get { return _salary; }
        }
    }

    class PrivateTest
    {
        static void Main()
        {
            var e = new Employee2();

            // The data members are inaccessible (private), so
            // they can't be accessed like this:
            //    string n = e._name;
            //    double s = e._salary;

            // '_name' is indirectly accessed via method:
            string n = e.GetName();

            // '_salary' is indirectly accessed via property
            double s = e.Salary;
        }
    }

    class A
    {
        protected int x = 123;
    }

    class B : A
    {
        static void Main()
        {
            var a = new A();
            var b = new B();

            // Error CS1540, because x can only be accessed through
            // the derived class type, not through the base class type.
            // a.x = 10;

            // OK, because this class derives from A.
            b.x = 10;
        }
    }

    class Point
    {
        protected int x;
        protected int y;
    }

    class DerivedPoint: Point
    {
        static void Main()
        {
            var dpoint = new DerivedPoint();

            // Direct access to protected members.
            dpoint.x = 10;
            dpoint.y = 15;
            Console.WriteLine($"x = {dpoint.x}, y = {dpoint.y}");
        }
    }
    // Output: x = 10, y = 15

    class PointTest
    {
        public int x;
        public int y;
    }

    class Program
    {
        static void Main()
        {
            var p = new PointTest();
            // Direct access to public members.
            p.x = 10;
            p.y = 15;
            Console.WriteLine($"x = {p.x}, y = {p.y}");
        }
    }
    // Output: x = 10, y = 15

    class Age
    {
        private readonly int _year;
        Age(int year)
        {
            _year = year;
        }
        void ChangeYear()
        {
            //_year = 1967; // Compile error if uncommented.
        }
    }

    public class ReadOnlyTest
    {
       class SampleClass
       {
          public int x;
          // Initialize a readonly field.
          public readonly int y = 25;
          public readonly int z;

          public SampleClass()
          {
             // Initialize a readonly instance field.
             z = 24;
          }

          public SampleClass(int p1, int p2, int p3)
          {
             x = p1;
             y = p2;
             z = p3;
          }
       }

       static void Main()
       {
          var p1 = new SampleClass(11, 21, 32);   // OK
          Console.WriteLine($"p1: x={p1.x}, y={p1.y}, z={p1.z}");
          var p2 = new SampleClass();
          p2.x = 55;   // OK
          Console.WriteLine($"p2: x={p2.x}, y={p2.y}, z={p2.z}");
       }
    }
    /*
     Output:
        p1: x=11, y=21, z=32
        p2: x=55, y=25, z=24
    */

    class X
    {
        protected virtual void F() { Console.WriteLine("X.F"); }
        protected virtual void F2() { Console.WriteLine("X.F2"); }
    }

    class Y : X
    {
        sealed protected override void F() { Console.WriteLine("Y.F"); }
        protected override void F2() { Console.WriteLine("Y.F2"); }
    }

    class Z : Y
    {
        // Attempting to override F causes compiler error CS0239.
        // protected override void F() { Console.WriteLine("Z.F"); }

        // Overriding F2 is allowed.
        protected override void F2() { Console.WriteLine("Z.F2"); }
    }

    sealed class SealedClass
    {
        public int x;
        public int y;
    }

    class SealedTest2
    {
        static void Main()
        {
            var sc = new SealedClass();
            sc.x = 110;
            sc.y = 150;
            Console.WriteLine($"x = {sc.x}, y = {sc.y}");
        }
    }
    // Output: x = 110, y = 150

    static class CompanyEmployee
    {
        public static void DoSomething() { /*...*/ }
        public static void DoSomethingElse() { /*...*/  }
    }

    public class MyBaseC
    {
        public struct MyStruct
        {
            public static int x = 100;
        }
    }

    public class Employee4
    {
        public string id;
        public string name;

        public Employee4()
        {
        }

        public Employee4(string name, string id)
        {
            this.name = name;
            this.id = id;
        }

        public static int employeeCounter;

        public static int AddEmployee()
        {
            return ++employeeCounter;
        }
    }

    class MainClass : Employee4
    {
        static void Main()
        {
            Console.Write("Enter the employee's name: ");
            string name = Console.ReadLine();
            Console.Write("Enter the employee's ID: ");
            string id = Console.ReadLine();

            // Create and configure the employee object.
            Employee4 e = new Employee4(name, id);
            Console.Write("Enter the current number of employees: ");
            string n = Console.ReadLine();
            Employee4.employeeCounter = Int32.Parse(n);
            Employee4.AddEmployee();

            // Display the new information.
            Console.WriteLine($"Name: {e.name}");
            Console.WriteLine($"ID:   {e.id}");
            Console.WriteLine($"New Number of Employees: {Employee4.employeeCounter}");
        }
    }
    /*
    Input:
    Matthias Berndt
    AF643G
    15
     *
    Sample Output:
    Enter the employee's name: Matthias Berndt
    Enter the employee's ID: AF643G
    Enter the current number of employees: 15
    Name: Matthias Berndt
    ID:   AF643G
    New Number of Employees: 16
    */

    class Test
    {
        static int x = y;
        static int y = 5;

        static void Main()
        {
            Console.WriteLine(Test.x);
            Console.WriteLine(Test.y);

            Test.x = 99;
            Console.WriteLine(Test.x);
        }
    }
    /*
    Output:
        0
        5
        99
    */

    // compile with: -unsafe
    class UnsafeTest
    {
        // Unsafe method: takes pointer to int.
        unsafe static void SquarePtrParam(int* p)
        {
            *p *= *p;
        }

        unsafe static void Main()
        {
            int i = 5;
            // Unsafe method: uses address-of operator (&).
            SquarePtrParam(&i);
            Console.WriteLine(i);
        }
    }
    // Output: 25

    class TestClass
    {
        public class Shape
        {
            public const double PI = Math.PI;
            protected double _x, _y;

            public Shape()
            {
            }

            public Shape(double x, double y)
            {
                _x = x;
                _y = y;
            }

            public virtual double Area()
            {
                return _x * _y;
            }
        }

        public class Circle : Shape
        {
            public Circle(double r) : base(r, 0)
            {
            }

            public override double Area()
            {
                return PI * _x * _x;
            }
        }

        public class Sphere : Shape
        {
            public Sphere(double r) : base(r, 0)
            {
            }

            public override double Area()
            {
                return 4 * PI * _x * _x;
            }
        }

        public class Cylinder : Shape
        {
            public Cylinder(double r, double h) : base(r, h)
            {
            }

            public override double Area()
            {
                return 2 * PI * _x * _x + 2 * PI * _x * _y;
            }
        }

        static void Main()
        {
```
