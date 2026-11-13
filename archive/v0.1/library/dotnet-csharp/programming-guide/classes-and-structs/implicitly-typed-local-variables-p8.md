---
title: "Implicitly typed local variables (part 8 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/implicitly-typed-local-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implicitly typed local variables (part 8 of 8)

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

## Remarks

The following restrictions apply to implicitly-typed variable declarations:

- `var` can only be used when a local variable is declared and initialized in the same statement; the variable cannot be initialized to null, or to a method group or an anonymous function.

- `var` cannot be used on fields at class scope.

- Variables declared by using `var` cannot be used in the initialization expression. In other words, this expression is legal: `int i = (i = 20);` but this expression produces a compile-time error: `var i = (i = 20);`

- Multiple implicitly-typed variables cannot be initialized in the same statement.

- If a type named `var` is in scope, then the `var` keyword will resolve to that type name and will not be treated as part of an implicitly typed local variable declaration.

Implicit typing with the `var` keyword can only be applied to variables at local method scope. Implicit typing is not available for class fields as the C# compiler would encounter a logical paradox as it processed the code: the compiler needs to know the type of the field, but it cannot determine the type until the assignment expression is analyzed, and the expression cannot be evaluated without knowing the type. Consider the following code:

```csharp
private var bookTitles;
```

`bookTitles` is a class field given the type `var`. As the field has no expression to evaluate, it is impossible for the compiler to infer what type `bookTitles` is supposed to be. In addition, adding an expression to the field (like you would for a local variable) is also insufficient:

```csharp
private var bookTitles = new List<string>();
```

When the compiler encounters fields during code compilation, it records each field's type before processing any expressions associated with it. The compiler encounters the same paradox trying to parse `bookTitles`: it needs to know the type of the field, but the compiler would normally determine `var`'s type by analyzing the expression, which isn't possible without knowing the type beforehand.

You may find that `var` can also be useful with query expressions in which the exact constructed type of the query variable is difficult to determine. This can occur with grouping and ordering operations.

The `var` keyword can also be useful when the specific type of the variable is tedious to type on the keyboard, or is obvious, or does not add to the readability of the code. One example where `var` is helpful in this manner is with nested generic types such as those used with group operations. In the following query, the type of the query variable is `IEnumerable<IGrouping<string, Student>>`. As long as you and others who must maintain your code understand this, there is no problem with using implicit typing for convenience and brevity.

```csharp
var studentQuery =
    from student in students
    group student by student.Last;
```

The use of `var` helps simplify your code, but its use should be restricted to cases where it is required, or when it makes your code easier to read. For more information about when to use `var` properly, see the Implicitly typed local variables section on the C# Coding Guidelines article.

## See also

- C# Reference
- Implicitly Typed Arrays
- How to use implicitly typed local variables and arrays in a query expression
- Anonymous Types
- Object and Collection Initializers
- var
- LINQ in C#
- LINQ (Language-Integrated Query)
- Iteration statements
- `using` statement
