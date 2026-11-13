---
title: "Polymorphism (part 5 of 7)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/object-oriented/polymorphism.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Polymorphism (part 5 of 7)

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
Virtual methods and properties enable derived classes to extend a base class without needing to use the base class implementation of a method. For more information, see Versioning with the Override and New Keywords. An interface provides another way to define a method or set of methods whose implementation is left to derived classes.
