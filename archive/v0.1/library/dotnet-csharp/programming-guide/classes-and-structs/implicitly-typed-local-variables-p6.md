---
title: "Implicitly typed local variables (part 6 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/implicitly-typed-local-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implicitly typed local variables (part 6 of 8)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace Immutable
{

        //how to implement an immutable class

        // This class is immutable. After an object is created,
        // it cannot be modified from outside the class. It uses a
        // constructor to initialize its properties.
        class Contact
        {
            // Read-only properties.
            public string Name { get; private set; }
            public string Address { get; private set; }

            // Public constructor.
            public Contact(string contactName, string contactAddress)
            {
                Name = contactName;
                Address = contactAddress;
            }
        }

        // This class is immutable. After an object is created,
        // it cannot be modified from outside the class. It uses a
        // static method and private constructor to initialize its properties.
        public class Contact2
        {
            // Read-only properties.
            public string Name { get; private set; }
            public string Address { get; private set; }

            // Private constructor.
            private Contact2(string contactName, string contactAddress)
            {
                Name = contactName;
                Address = contactAddress;
            }

            // Public factory method.
            public static Contact2 CreateContact(string name, string address)
            {
                return new Contact2(name, address);
            }
        }

        public class Program
        {
            static void Main()
            {
                // Some simple data sources.
                string[] names = {"Terry Adams","Fadi Fakhouri", "Hanying Feng",
                                  "Cesar Garcia", "Debra Garcia"};
                string[] addresses = {"123 Main St.", "345 Cypress Ave.", "678 1st Ave",
                                      "12 108th St.", "89 E. 42nd St."};

                // Simple query to demonstrate object creation in select clause.
                // Create Contact objects by using a constructor.
                var query1 = from i in Enumerable.Range(0, 5)
                            select new Contact(names[i], addresses[i]);

                // List elements cannot be modified by client code.
                var list = query1.ToList();
                foreach (var contact in list)
                {
                    Console.WriteLine("{0}, {1}", contact.Name, contact.Address);
                }

                // Create Contact2 objects by using a static factory method.
                var query2 = from i in Enumerable.Range(0, 5)
                             select Contact2.CreateContact(names[i], addresses[i]);

                // Console output is identical to query1.
                var list2 = query2.ToList();

                // List elements cannot be modified by client code.
                // CS0272:
                // list2[0].Name = "Eugene Zabokritski";

                // Keep the console open in debug mode.
                Console.WriteLine("Press any key to exit.");
                Console.ReadKey();
            }
        }

    /* Output:
        Terry Adams, 123 Main St.
        Fadi Fakhouri, 345 Cypress Ave.
        Hanying Feng, 678 1st Ave
        Cesar Garcia, 12 108th St.
        Debra Garcia, 89 E. 42nd St.
    */
}

namespace csrefLINQExamples
{
            //Return Subsets of Element Properties

            class AnonymousTypes : StudentClass
            {
                static void Main(string[] args)
                {
                    QueryByScore();
                }
                private static void QueryByScore()
                {
                    // Create the query. var is required because
                    // the query produces a sequence of anonymous types.
                    var queryHighScores =
                        from student in students
                        where student.ExamScores[0] > 95
                        select new { student.FirstName, student.LastName };

                    // Execute the query.
                    foreach (var obj in queryHighScores)
                    {
                        // The anonymous type's properties were not named. Therefore
                        // they have the same names as the Student properties.
                        Console.WriteLine(obj.FirstName + ", " + obj.LastName);
                    }
                }
                /* Output:
                Adams, Terry
                Fakhouri, Fadi
                Garcia, Cesar
                Omelchenko, Svetlana
                Zabokritski, Eugene
                */
            }

            // How to use implicitly typed locals
            class ImplicitTyping : StudentClass
            {
                static void Main(string[] args)
                {
                    QueryNames('S');
                }

                private static void QueryNames(char firstLetter)
                {
                    // Create the query. Use of var is required because
                    // the query produces a sequence of anonymous types:
                    // System.Collections.Generic.IEnumerable<????>.
                    var studentQuery =
                        from student in students
                        where student.FirstName[0] == firstLetter
                        select new { student.FirstName, student.LastName };

                    // Execute the query and display the results.
                    foreach (var anonType in studentQuery)
                    {
                        Console.WriteLine("First = {0}, Last = {1}", anonType.FirstName, anonType.LastName);
                    }
                }

                static void QueryMethod(List<Student> students)
                {
                    //how to use implicitly typed locals #2
                    // Variable queryId could be declared by using
                    // System.Collections.Generic.IEnumerable<string>
                    // instead of var.
                    var queryId =
                        from student in students
                        where student.Id > 111
                        select student.LastName;

                    // Variable str could be declared by using var instead of string.
                    foreach (string str in queryId)
                    {
                        Console.WriteLine($"Last name: {str}");
                    }
                }
            }

            //how to init a dictionary with coll initializer
            class StudentName
            {
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public int Id { get; set; }
            }

            class CollInit
            {
                Dictionary<int, StudentName> students = new Dictionary<int, StudentName>()
                {
                    { 111, new StudentName { FirstName = "Sachin", LastName="Karnik", Id = 211 } },
                    { 112, new StudentName { FirstName = "Dina", LastName="Salimzianova", Id = 317 } },
                    { 113, new StudentName { FirstName = "Andy", LastName="Ruth", Id = 198 } }
                };
            }

            class ObjInit
            {
                //How to: Initialize Objects without Calling a Constructor (C# Programming Guide)
                public class Program
                {
                    public static void Main()
                    {

                        // Declare a StudentName by using the constructor that has two parameters.
                        StudentName student1 = new StudentName("Craig", "Playstead");

                        // Make the same declaration by using an object initializer and sending
                        // arguments for the first and last names. The default constructor is
                        // invoked in processing this declaration, not the constructor that has
                        // two parameters.
                        StudentName student2 = new StudentName
                        {
                            FirstName = "Craig",
                            LastName = "Playstead",
                        };

                        // Declare a StudentName by using an object initializer and sending
                        // an argument for only the Id property. No corresponding constructor is
                        // necessary. Only the default constructor is used to process object
                        // initializers.
                        StudentName student3 = new StudentName
                        {
                            Id = 183
                        };

                        // Declare a StudentName by using an object initializer and sending
                        // arguments for all three properties. No corresponding constructor is
                        // defined in the class.
                        StudentName student4 = new StudentName
                        {
                            FirstName = "Craig",
                            LastName = "Playstead",
                            Id = 116
                        };

                        System.Console.WriteLine(student1.ToString());
                        System.Console.WriteLine(student2.ToString());
                        System.Console.WriteLine(student3.ToString());
                        System.Console.WriteLine(student4.ToString());
                    }

                    // Output:
                    // Craig  0
                    // Craig  0
                    //   183
                    // Craig  116
                }

                public class StudentName
                {
                    // The default constructor has no parameters. The default constructor
                    // is invoked in the processing of object initializers.
                    // You can test this by changing the access modifier from public to
                    // private. The declarations in Main that use object initializers will
                    // fail.
                    public StudentName() { }

                    // The following constructor has parameters for two of the three
                    // properties.
                    public StudentName(string first, string last)
                    {
                        FirstName = first;
                        LastName = last;
                    }

                    // Properties.
                    public string FirstName { get; set; }
                    public string LastName { get; set; }
                    public int Id { get; set; }

                    public override string ToString()
                    {
                        return FirstName + "  " + Id;
                    }
                }

                //How to: Initialize Objects without Calling a Constructor #2 (C# Programming Guide)
                List<StudentName> students = new List<StudentName>()
                {
                  new StudentName { FirstName = "Craig", LastName = "Playstead", Id = 116 },
                  new StudentName { FirstName = "Shu", LastName="Ito", Id = 112 },
                  new StudentName { FirstName = "Gretchen", LastName="Rivas", Id = 113 },
                  new StudentName { FirstName = "Rajesh", LastName="Rotti", Id = 114 }
                };
            }

            //Object and collection initializers

            // The following code consolidates examples from the topic.
            class ObjInitializers
            {
                class Cat
                {
                    // Automatically implemented properties.
                    public int Age { get; set; }
                    public string Name { get; set; }
                }

                static void Main()
                {
                    Cat cat = new Cat { Age = 10, Name = "Fluffy" };

                    List<Cat> cats = new List<Cat>
                    {
                        new Cat(){ Name = "Sylvester", Age=8 },
                        new Cat(){ Name = "Whiskers", Age=2 },
                        new Cat(){ Name = "Sasha", Age=14 }
                    };

                    List<Cat> moreCats = new List<Cat>
                    {
                        new Cat(){ Name = "Furrytail", Age=5 },
                        new Cat(){ Name = "Peaches", Age=4 },
                        null
                    };

                    // Display results.
                    System.Console.WriteLine(cat.Name);

                    foreach (Cat c in cats)
                        System.Console.WriteLine(c.Name);

                    foreach (Cat c in moreCats)
                        if (c != null)
                            System.Console.WriteLine(c.Name);
                        else
                            System.Console.WriteLine("List element has null value.");
                }
                // Output:
                //Fluffy
                //Sylvester
                //Whiskers
                //Sasha
                //Furrytail
                //Peaches
                //List element has null value.
            }

            class ObjCollInitializers
            {
                class Product
                {
                    public string ProductName { get; set; }
                    public decimal UnitPrice { get; set; }
                }

                void MethodB()
                {
                    List<Product> products = new List<Product>();

                    var productInfos =
                        from p in products
                        select new { p.ProductName, p.UnitPrice };
                }
            }

            //Implicitly Typed Local Variables Conceptual Topic
            class ImplicitlyTypedLocals
            {
                // compilation hack
                class Customer
                {
                    public string City { get; set; }
                }
                static List<Customer> customers = new List<Customer>();

                static void Main()
                {
                    // i is compiled as an int
                    var i = 5;

                    // s is compiled as a string
                    var s = "Hello";

                    // a is compiled as int[]
                    var a = new[] { 0, 1, 2 };

                    // expr is compiled as IEnumerable<Customer>
                    // or perhaps IQueryable<Customer>
                    var expr =
                        from c in customers
                        where c.City == "London"
                        select c;

                    // anon is compiled as an anonymous type
                    var anon = new { Name = "Terry", Age = 34 };

```
