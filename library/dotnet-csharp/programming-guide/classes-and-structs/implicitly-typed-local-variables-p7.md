---
title: "Implicitly typed local variables (part 7 of 8)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/classes-and-structs/implicitly-typed-local-variables.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Implicitly typed local variables (part 7 of 8)

```csharp
                    // list is compiled as List<int>
                    var list = new List<int>();

                    Console.WriteLine(s + i.ToString());
                }
            }

            class ImplicitlyTypedLocals2
            {
                static void Main()
                {
                    string[] words = { "aPPLE", "BlUeBeRrY", "cHeRry" };

                    // If a query produces a sequence of anonymous types,
                    // then use var in the foreach statement to access the properties.
                    var upperLowerWords =
                         from w in words
                         select new { Upper = w.ToUpper(), Lower = w.ToLower() };

                    // Execute the query
                    foreach (var ul in upperLowerWords)
                    {
                        Console.WriteLine("Uppercase: {0}, Lowercase: {1}", ul.Upper, ul.Lower);
                    }
                }
            }
            /* Outputs:
                Uppercase: APPLE, Lowercase: apple
                Uppercase: BLUEBERRY, Lowercase: blueberry
                Uppercase: CHERRY, Lowercase: cherry
             */

            // no snippets from this class yet.

            class CustomJoins
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
                    new Category() { Name = "Beverages", Id = 001 },
                    new Category() { Name = "Condiments", Id = 002 },
                    new Category() { Name = "Vegetables", Id = 003 },
                };

                // Specify the second data source.
                List<Product> products = new List<Product>()
                {
                    new Product { Name="Tea",  CategoryId = 001 },
                    new Product { Name="Mustard", CategoryId = 002 },
                    new Product { Name="Pickles", CategoryId = 002 },
                    new Product { Name="Carrots", CategoryId = 003 },
                    new Product { Name="Bok Choy", CategoryId = 003 },
                    new Product { Name="Peaches", CategoryId = 005 },
                    new Product { Name="Melons", CategoryId = 005 },
                    new Product { Name="Ice Cream", CategoryId = 007 },
                    new Product { Name="Mackerel", CategoryId = 012 },
                };

                static void Main()
                {
                    CustomJoins app = new CustomJoins();
                    app.CrossJoin();
                    app.NonEquijoin();

                    Console.WriteLine("Press any key to exit.");
                    Console.ReadKey();
                }

                void CrossJoin()
                {
                    var crossJoinQuery =
                        from c in categories
                        from p in products
                        select new { c.Id, p.Name };

                    Console.WriteLine("Cross Join Query:");
                    foreach (var v in crossJoinQuery)
                    {
                        Console.WriteLine("{0,-5}{1}", v.Id, v.Name);
                    }
                }

                void NonEquijoin()
                {
                    var nonEquijoinQuery =
                        from p in products
                        let catIds = from c in categories
                                     select c.Id
                        where catIds.Contains(p.CategoryId) == true
                        select new { Product = p.Name, CategoryId = p.CategoryId };

                    Console.WriteLine("Non-equijoin query:");
                    foreach (var v in nonEquijoinQuery)
                    {
                        Console.WriteLine("{0,-5}{1}", v.CategoryId, v.Product);
                    }
                }
            }
            /* Output:
        Cross Join Query:
        1    Tea
        1    Mustard
        1    Pickles
        1    Carrots
        1    Bok Choy
        1    Peaches
        1    Melons
        1    Ice Cream
        1    Mackerel
        2    Tea
        2    Mustard
        2    Pickles
        2    Carrots
        2    Bok Choy
        2    Peaches
        2    Melons
        2    Ice Cream
        2    Mackerel
        3    Tea
        3    Mustard
        3    Pickles
        3    Carrots
        3    Bok Choy
        3    Peaches
        3    Melons
        3    Ice Cream
        3    Mackerel
        Non-equijoin query:
        1    Tea
        2    Mustard
        2    Pickles
        3    Carrots
        3    Bok Choy
        Press any key to exit.
             */

            //<snippet 66>
            class Test2
            {
                // Func<int, bool> f;

                bool M(Func<double, bool> func, int i)
                {

                    int local = i;
                    Console.WriteLine(func(local));
                    Thread.Sleep(5300);
                    return func(local);
                }
                static void Main()
                {
                    Test2 app = new Test2();
                    bool b = app.M(x => x % 2 == 0, DateTime.Now.Second);

                    //bool b2 = app.M(x => x +

                    Console.WriteLine(b.ToString());

                    Console.ReadKey();
                }
            }
            //</snippet 66>

            //reserving numbers 67-79 for anonymous methods

            class MQ
            {
                // QueryMethod1 returns a query as its value.
                IEnumerable<string> QueryMethod1(ref int[] ints)
                {
                    var intsToStrings = from i in ints
                                        where i > 4
                                        select i.ToString();
                    return intsToStrings;
                }

                // QueryMethod2 returns a query as the value of parameter returnQ.
                void QueryMethod2(ref int[] ints, out IEnumerable<string> returnQ)
                {
                    var intsToStrings = from i in ints
                                        where i < 4
                                        select i.ToString();
                    returnQ = intsToStrings;
                }

                static void Main()
                {
                    MQ app = new MQ();

                    int[] nums = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };

                    // QueryMethod1 returns a query as the value of the method.
                    var myQuery1 = app.QueryMethod1(ref nums);

                    // Query myQuery1 is executed in the following foreach loop.
                    Console.WriteLine("Results of executing myQuery1:");
                    // Rest the mouse pointer over myQuery1 to see its type.
                    foreach (string s in myQuery1)
                    {
                        Console.WriteLine(s);
                    }

                    // You also can execute the query returned from QueryMethod1
                    // directly, without using myQuery1.
                    Console.WriteLine("\nResults of executing myQuery1 directly:");
                    // Rest the mouse pointer over the call to QueryMethod1 to see its
                    // return type.
                    foreach (string s in app.QueryMethod1(ref nums))
                    {
                        Console.WriteLine(s);
                    }

                    IEnumerable<string> myQuery2;
                    // QueryMethod2 returns a query as the value of its out parameter.
                    app.QueryMethod2(ref nums, out myQuery2);

                    // Execute the returned query.
                    Console.WriteLine("\nResults of executing myQuery2:");
                    foreach (string s in myQuery2)
                    {
                        Console.WriteLine(s);
                    }

                    // You can modify a query by using query composition. A saved query
                    // is nested inside a new query definition that revises the results
                    // of the first query.
                    myQuery1 = from item in myQuery1
                               orderby item descending
                               select item;

                    // Execute the modified query.
                    Console.WriteLine("\nResults of executing modified myQuery1:");
                    foreach (string s in myQuery1)
                    {
                        Console.WriteLine(s);
                    }

                    // Keep console window open in debug mode.
                    Console.WriteLine("Press any key to exit.");
                    Console.ReadKey();
                }
            }

            class HowToOrderJoins
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
                    new Category() { Name = "Beverages", Id = 001 },
                    new Category() { Name="Condiments", Id = 002 },
                    new Category() { Name="Vegetables", Id = 003 },
                    new Category() { Name="Grains", Id = 004 },
                    new Category() { Name="Fruit", Id = 005 }
                };

                // Specify the second data source.
                List<Product> products = new List<Product>()
                {
                    new Product{ Name = "Cola", CategoryId = 001 },
                    new Product{ Name = "Tea", CategoryId = 001 },
                    new Product{ Name = "Mustard", CategoryId = 002 },
                    new Product{ Name = "Pickles", CategoryId = 002 },
                    new Product{ Name = "Carrots", CategoryId = 003 },
                    new Product{ Name = "Bok Choy", CategoryId = 003 },
                    new Product{ Name = "Peaches", CategoryId = 005 },
                    new Product{ Name = "Melons", CategoryId = 005 },
                };
                static void Main()
                {
                    HowToOrderJoins app = new HowToOrderJoins();
                    app.OrderJoin1();

                    // Keep console window open in debug mode.
                    Console.WriteLine("Press any key to exit.");
                    Console.ReadKey();
                }

                void OrderJoin1()
                {
                    var groupJoinQuery2 =
                        from category in categories
                        join prod in products on category.Id equals prod.CategoryId into prodGroup
                        orderby category.Name
                        select new
                        {
                            Category = category.Name,
                            Products = from prod2 in prodGroup
                                       orderby prod2.Name
                                       select prod2
                        };

                    foreach (var productGroup in groupJoinQuery2)
                    {
                        Console.WriteLine(productGroup.Category);
                        foreach (var prodItem in productGroup.Products)
                        {
                            Console.WriteLine("  {0,-10} {1}", prodItem.Name, prodItem.CategoryId);
                        }
                    }
                }
                /* Output:
                    Beverages
                      Cola       1
                      Tea        1
                    Condiments
                      Mustard    2
                      Pickles    2
                    Fruit
                      Melons     5
                      Peaches    5
                    Grains
                    Vegetables
                      Bok Choy   3
                      Carrots    3
                 */
            }

            class NullValuesInQueries
            {
                class Product
                {
                    public string Name { get; set; }
                    public int? CategoryId { get; set; }
                }

                class Category
                {
                    public string Name { get; set; }
                    public int? Id { get; set; }
                }

                // Specify the first data source.
                List<Category> categories = new List<Category>()
                {
                    new Category() { Name = "Beverages", Id = 001 },
                    new Category() { Name = "Condiments", Id = 002 },
                    new Category() { Name = "Vegetables", Id = 003 },
                    new Category() { Name = "Grains", Id = 004 },
                    new Category() { Name = "Fruit", Id = 005 }
                };

                // Specify the second data source.
                List<Product> products = new List<Product>()
                {
                    new Product{ Name = "Cola", CategoryId = 001 },
                    new Product{ Name = "Tea", CategoryId = 001 },
                    new Product{ Name = "Mustard", CategoryId = 002 },
                    new Product{ Name = "Pickles", CategoryId = 002 },
                    new Product{ Name = "Carrots", CategoryId = 003 },
                    new Product{ Name = "Bok Choy", CategoryId = 003 },
                    new Product{ Name = "Peaches", CategoryId = 005 },
                    new Product{ Name = "Melons", CategoryId = 005 },
                };

                static void Main()
                {
                    NullValuesInQueries app = new NullValuesInQueries();
                    Northwind db = new Northwind();
                    app.TestMethod(db);
                }

                void NullHandlingQuery()
                {
                    var query1 =
                        from c in categories
                        where c != null
                        join p in products on c.Id equals
                            (p == null ? null : p.CategoryId)
                        select new { Category = c.Name, Name = p.Name };
                }

                class Order
                {
                    public int? OrderId = 1;
                    public int? EmployeeId = 1;
                }
```
