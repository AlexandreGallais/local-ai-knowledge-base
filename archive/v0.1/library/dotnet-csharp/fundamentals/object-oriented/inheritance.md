---
title: "Object-oriented programming - inheritance"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/object-oriented/inheritance.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Inheritance - derive types to create more specialized behavior

Inheritance, together with encapsulation and polymorphism, is one of the three primary characteristics of object-oriented programming. Inheritance enables you to create new classes that reuse, extend, and modify the behavior defined in other classes. The class whose members are inherited is called the *base class*, and the class that inherits those members is called the *derived class*. A derived class can have only one direct base class. However, inheritance is transitive. If `ClassC` is derived from `ClassB`, and `ClassB` is derived from `ClassA`, `ClassC` inherits the members declared in `ClassB` and `ClassA`.

> **Note:**
> Structs don't support inheritance, but they can implement interfaces.

Conceptually, a derived class is a specialization of the base class. For example, if you have a base class `Animal`, you might have one derived class that is named `Mammal` and another derived class that is named `Reptile`. A `Mammal` is an `Animal`, and a `Reptile` is an `Animal`, but each derived class represents different specializations of the base class.

Interface declarations can define a default implementation for its members. These implementations are inherited by derived interfaces, and by classes that implement those interfaces. For more information on default interface methods, see the article on interfaces.

When you define a class to derive from another class, the derived class implicitly gains all the members of the base class, except for its constructors and finalizers. The derived class reuses the code in the base class without having to reimplement it. You can add more members in the derived class. The derived class extends the functionality of the base class.

The following illustration shows a class `WorkItem` that represents an item of work in some business process. Like all classes, it derives from `System.Object` and inherits all its methods. `WorkItem` adds six members of its own. These members include a constructor, because constructors aren't inherited. Class `ChangeRequest` inherits from `WorkItem` and represents a particular type of work item. `ChangeRequest` adds two more members to the members that it inherits from `WorkItem` and from `System.Object`. It must add its own constructor, and it also adds `originalItemID`. Property `originalItemID` enables the `ChangeRequest` instance to be associated with the original `WorkItem` to which the change request applies.

The following example shows how the class relationships demonstrated in the previous illustration are expressed in C#. The example also shows how `WorkItem` overrides the virtual method `System.Object.ToString*`, and how the `ChangeRequest` class inherits the `WorkItem` implementation of the method. The first block defines the classes:

```csharp
﻿namespace inheritance
{
    // WorkItem implicitly inherits from the Object class.
    public class WorkItem
    {
        // Static field currentID stores the job ID of the last WorkItem that
        // has been created.
        private static int currentID;

        //Properties.
        protected int ID { get; set; }
        protected string Title { get; set; }
        protected string Description { get; set; }
        protected TimeSpan jobLength { get; set; }

        // Default constructor. If a derived class does not invoke a base-
        // class constructor explicitly, the default constructor is called
        // implicitly.
        public WorkItem()
        {
            ID = 0;
            Title = "Default title";
            Description = "Default description.";
            jobLength = new TimeSpan();
        }

        // Instance constructor that has three parameters.
        public WorkItem(string title, string desc, TimeSpan joblen)
        {
            ID = GetNextID();
            Title = title;
            Description = desc;
            jobLength = joblen;
        }

        // Static constructor to initialize the static member, currentID. This
        // constructor is called one time, automatically, before any instance
        // of WorkItem or ChangeRequest is created, or currentID is referenced.
        static WorkItem() => currentID = 0;

        // currentID is a static field. It is incremented each time a new
        // instance of WorkItem is created.
        protected int GetNextID() => ++currentID;

        // Method Update enables you to update the title and job length of an
        // existing WorkItem object.
        public void Update(string title, TimeSpan joblen)
        {
            this.Title = title;
            this.jobLength = joblen;
        }

        // Virtual method override of the ToString method that is inherited
        // from System.Object.
        public override string ToString() =>
            $"{this.ID} - {this.Title}";
    }

    // ChangeRequest derives from WorkItem and adds a property (originalItemID)
    // and two constructors.
    public class ChangeRequest : WorkItem
    {
        protected int originalItemID { get; set; }

        // Constructors. Because neither constructor calls a base-class
        // constructor explicitly, the default constructor in the base class
        // is called implicitly. The base class must contain a default
        // constructor.

        // Default constructor for the derived class.
        public ChangeRequest() { }

        // Instance constructor that has four parameters.
        public ChangeRequest(string title, string desc, TimeSpan jobLen,
                             int originalID)
        {
            // The following properties and the GetNexID method are inherited
            // from WorkItem.
            this.ID = GetNextID();
            this.Title = title;
            this.Description = desc;
            this.jobLength = jobLen;

            // Property originalItemID is a member of ChangeRequest, but not
            // of WorkItem.
            this.originalItemID = originalID;
        }
    }

    public class Shape
    {
        // A few example members
        public int X { get; init; }
        public int Y { get; init; }
        public int Height { get; init; }
        public int Width { get; init; }

        // Virtual method
        public virtual void Draw()
        {
            Console.WriteLine("Performing base class drawing tasks");
        }
    }

    public class Circle : Shape
    {
        public override void Draw()
        {
            // Code to draw a circle...
            Console.WriteLine("Drawing a circle");
            base.Draw();
        }
    }
    public class Rectangle : Shape
    {
        public override void Draw()
        {
            // Code to draw a rectangle...
            Console.WriteLine("Drawing a rectangle");
            base.Draw();
        }
    }
    public class Triangle : Shape
    {
        public override void Draw()
        {
            // Code to draw a triangle...
            Console.WriteLine("Drawing a triangle");
            base.Draw();
        }
    }

    public static class Polymorphism
    {
        public static void Example()
        {
            // Polymorphism at work #1: a Rectangle, Triangle and Circle
            // can all be used wherever a Shape is expected. No cast is
            // required because an implicit conversion exists from a derived
            // class to its base class.
            List<Shape> shapes =
            [
                new Rectangle(),
                new Triangle(),
                new Circle()
            ];

            // Polymorphism at work #2: the virtual method Draw is
            // invoked on each of the derived classes, not the base class.
            foreach (var shape in shapes)
            {
                shape.Draw();
            }
            /* Output:
                Drawing a rectangle
                Performing base class drawing tasks
                Drawing a triangle
                Performing base class drawing tasks
                Drawing a circle
                Performing base class drawing tasks
            */
        }

        public static void VirtualExamples()
        {
            DerivedClass B = new();
            B.DoWork();  // Calls the new method.

            BaseClass A = B;
            A.DoWork();  // Also calls the new method.
        }
    }

    public class BaseClass
    {
        public virtual void DoWork() { }
        public virtual int WorkProperty => 0;
    }
    public class DerivedClass : BaseClass
    {
        public override void DoWork() { }
        public override int WorkProperty
        {
            get { return 0; }
        }
    }

    namespace NewMethodHierarchy
    {
        public class BaseClass
        {
            public void DoWork() { WorkField++; }
            public int WorkField;
            public int WorkProperty
            {
                get { return 0; }
            }
        }

        public class DerivedClass : BaseClass
        {
            public new void DoWork() { WorkField++; }
            public new int WorkField;
            public new int WorkProperty
            {
                get { return 0; }
            }
        }

        public static class NewMethods
        {
            public static void Example()
            {
                DerivedClass B = new();
                B.DoWork();  // Calls the new method.

                BaseClass A = (BaseClass)B;
                A.DoWork();  // Calls the old method.
            }
        }
    }

}
```
This next block shows how to use the base and derived classes:

```csharp
﻿namespace inheritance;

class Program
{
    static void Main(string[] args)
    {
        // Create an instance of WorkItem by using the constructor in the
        // base class that takes three arguments.
        WorkItem item = new("Fix Bugs",
                    "Fix all bugs in my code branch",
                    new TimeSpan(3, 4, 0, 0));

        // Create an instance of ChangeRequest by using the constructor in
        // the derived class that takes four arguments.
        ChangeRequest change = new("Change Base Class Design",
                          "Add members to the class",
                          new TimeSpan(4, 0, 0),
                          1);

        // Use the ToString method defined in WorkItem.
        Console.WriteLine(item.ToString());

        // Use the inherited Update method to change the title of the
        // ChangeRequest object.
        change.Update("Change the Design of the Base Class",
            new TimeSpan(4, 0, 0));

        // ChangeRequest inherits WorkItem's override of ToString.
        Console.WriteLine(change.ToString());
        /* Output:
            1 - Fix Bugs
            2 - Change the Design of the Base Class
        */

        Polymorphism.Example();
        Polymorphism.VirtualExamples();
        NewMethodHierarchy.NewMethods.Example();

    }
}
```
## Abstract and virtual methods

When a base class declares a method as `virtual`, a derived class can `override` the method with its own implementation. If a base class declares a member as `abstract`, that method must be overridden in any non-abstract class that directly inherits from that class. If a derived class is itself abstract, it inherits abstract members without implementing them. Abstract and virtual members are the basis for polymorphism, which is the second primary characteristic of object-oriented programming. For more information, see Polymorphism.

## Abstract base classes

You can declare a class as abstract if you want to prevent direct instantiation by using the new operator. An abstract class can be used only if a new class is derived from it. An abstract class can contain one or more method signatures that themselves are declared as abstract. These signatures specify the parameters and return value but have no implementation (method body). An abstract class doesn't have to contain abstract members; however, if a class does contain an abstract member, the class itself must be declared as abstract. Derived classes that aren't abstract themselves must provide the implementation for any abstract methods from an abstract base class.

## Interfaces

An *interface* is a reference type that defines a set of members. All classes and structs that implement that interface must implement that set of members. An interface might define a default implementation for any or all of these members. A class can implement multiple interfaces even though it can derive from only a single direct base class.

Interfaces are used to define specific capabilities for classes that don't necessarily have an "is a" relationship. For example, the `System.IEquatable`1` interface can be implemented by any class or struct to determine whether two objects of the type are equivalent (however the type defines equivalence). `System.IEquatable`1` doesn't imply the same kind of "is a" relationship that exists between a base class and a derived class (for example, a `Mammal` is an `Animal`). For more information, see Interfaces.

## Preventing further derivation

A class can prevent other classes from inheriting from it, or from any of its members, by declaring itself or the member as `sealed`.

## Derived class hiding of base class members

A derived class can hide base class members by declaring members with the same name and signature. The `new` modifier can be used to explicitly indicate that the member isn't intended to be an override of the base member. The use of `new` isn't required, but a compiler warning is generated if `new` isn't used. For more information, see Versioning with the Override and New Keywords and Knowing When to Use Override and New Keywords.
