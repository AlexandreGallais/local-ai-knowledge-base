---
title: "How to return subsets of element properties in a query (part 5 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/how-to-return-subsets-of-element-properties-in-a-query.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to return subsets of element properties in a query (part 5 of 5)

```csharp
                class Employee
                {
                    public int EmployeeId = 1;
                    public string FirstName = string.Empty;
                }
                class Northwind
                {
                    public Order[] Orders = null;
                    public Employee[] Employees = null;
                }

                void TestMethod(Northwind db)
                {
                    var query =
                        from o in db.Orders
                        join e in db.Employees
                            on o.EmployeeId equals (int?)e.EmployeeId
                        select new { o.OrderId, e.FirstName };
                }
            }

            //<snippet 84 >
            class DynamicPreds2
            {

                class Product
                {
                    public string Name { get; set; }
                    public int CategoryId { get; set; }
                }

                class Category
                {
                    public string Name { get; set; }
                    public int Id { get; set; }
                }

                // Specify the first data source.
                List<Category> categories = new List<Category>()
                {
                    new Category(){ Name = "Beverages", Id = 001 },
                    new Category(){ Name = "Condiments", Id = 002 },
                    new Category(){ Name = "Vegetables", Id = 003 },
                };

                // Specify the second data source.
                List<Product> products = new List<Product>()
                {
                    new Product{ Name = "Tea", CategoryId = 001 },
                    new Product{ Name = "Mustard", CategoryId = 002 },
                    new Product{ Name = "Pickles", CategoryId = 002 },
                    new Product{ Name = "Carrots", CategoryId = 003 },
                    new Product{ Name = "Bok Choy", CategoryId = 003 },
                    new Product{ Name = "Peaches", CategoryId = 005 },
                    new Product{ Name = "Melons", CategoryId = 005 },
                    new Product{ Name = "Ice Cream", CategoryId = 007 },
                    new Product{ Name = "Mackerel", CategoryId = 012 },
                };

                static void Main()
                {
                    DynamicPreds2 app = new DynamicPreds2();
                    var q = from p in app.products
                            select p;

                    // Identity select
                    Console.WriteLine("First iteration");
                    //foreach(var v in query)
                    //    Console.WriteLine(v.Name);

                    // Mod 1
                    var q2 = from item in q
                             where item.Name[0] == 'M'
                             select item;

                    Console.WriteLine("2nd iteration");
                    foreach (var v in q2)
                        Console.WriteLine(v.Name);

                    //var q3 = from item in

                    // Keep console window open in debug mode.
                    Console.WriteLine("Press any key to exit.");
                    Console.ReadKey();
                }
            }
            //</snippet 84>
}
```  

 Note that the anonymous type uses the source element's names for its properties if no names are specified. To give new names to the properties in the anonymous type, write the `select` statement as follows:

```csharp
select new { First = student.FirstName, Last = student.LastName };  
```  

 If you try this in the previous example, then the `Console.WriteLine` statement must also change:

```csharp
Console.WriteLine(student.First + " " + student.Last);  
```  

## Compiling the Code

To run this code, copy and paste the class into a C# console application  with a `using` directive for System.Linq.

## See also

- Anonymous Types
- LINQ in C#
