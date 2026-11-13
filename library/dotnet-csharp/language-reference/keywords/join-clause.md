---
title: "join clause (part 1 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/join-clause.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# join clause (C# Reference)

Use the `join` clause to associate elements from different source sequences that have no direct relationship in the object model. The only requirement is that the elements in each source share some value that you can compare for equality. For example, a food distributor might have a list of suppliers of a certain product, and a list of buyers. You can use a `join` clause to create a list of the suppliers and buyers of that product who are all in the same specified region.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

A `join` clause takes two source sequences as input. The elements in each sequence must either be or contain a property that you can compare to a corresponding property in the other sequence. The `join` clause uses the special `equals` keyword to compare the specified keys for equality. All joins that the `join` clause performs are equijoins. The shape of the output of a `join` clause depends on the specific type of join you're performing. The following list shows the three most common join types:

- Inner join
- Group join
- Left outer join

## Inner join

The following example shows a simple inner equijoin. This query produces a flat sequence of "product name / category" pairs. The same category string appears in multiple elements. If an element from `categories` has no matching `products`, that category doesn't appear in the results.

```csharp
namespace Joins;

class JoinDemonstration
{

    class Product
    {
        public required string Name { get; init; }
        public required int CategoryID { get; init; }
    }

    class Category
    {
        public required string Name { get; init; }
        public required int ID { get; init; }
    }

    // Specify the first data source.
    List<Category> categories =
    [
        new Category {Name="Beverages", ID=001},
        new Category {Name="Condiments", ID=002},
        new Category {Name="Vegetables", ID=003},
        new Category {Name="Grains", ID=004},
        new Category {Name="Fruit", ID=005}
    ];

    // Specify the second data source.
    List<Product> products =
    [
      new Product {Name="Cola",  CategoryID=001},
      new Product {Name="Tea",  CategoryID=001},
      new Product {Name="Mustard", CategoryID=002},
      new Product {Name="Pickles", CategoryID=002},
      new Product {Name="Carrots", CategoryID=003},
      new Product {Name="Bok Choy", CategoryID=003},
      new Product {Name="Peaches", CategoryID=005},
      new Product {Name="Melons", CategoryID=005},
    ];

    static void Main(string[] args)
    {
        JoinDemonstration app = new JoinDemonstration();

        app.InnerJoin();
        app.GroupJoin();
        app.GroupInnerJoin();
        app.GroupJoin3();
        app.LeftOuterJoin();
        app.LeftOuterJoin2();
    }

    void InnerJoin()
    {
        // Create the query that selects
        // a property from each element.
        var innerJoinQuery =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID
           select new { Category = category.ID, Product = prod.Name };

        Console.WriteLine("InnerJoin:");
        // Execute the query. Access results
        // with a simple foreach statement.
        foreach (var item in innerJoinQuery)
        {
            Console.WriteLine("{0,-10}{1}", item.Product, item.Category);
        }
        Console.WriteLine($"InnerJoin: {innerJoinQuery.Count()} items in 1 group.");
        Console.WriteLine(System.Environment.NewLine);
    }

    void GroupJoin()
    {
        // This is a demonstration query to show the output
        // of a "raw" group join. A more typical group join
        // is shown in the GroupInnerJoin method.
        var groupJoinQuery =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID into prodGroup
           select prodGroup;

        // Store the count of total items (for demonstration only).
        int totalItems = 0;

        Console.WriteLine("Simple GroupJoin:");

        // A nested foreach statement is required to access group items.
        foreach (var prodGrouping in groupJoinQuery)
        {
            Console.WriteLine("Group:");
            foreach (var item in prodGrouping)
            {
                totalItems++;
                Console.WriteLine("   {0,-10}{1}", item.Name, item.CategoryID);
            }
        }
        Console.WriteLine($"Unshaped GroupJoin: {totalItems} items in {groupJoinQuery.Count()} unnamed groups");
        Console.WriteLine(System.Environment.NewLine);
    }

    void GroupInnerJoin()
    {
        var groupJoinQuery2 =
            from category in categories
            orderby category.ID
            join prod in products on category.ID equals prod.CategoryID into prodGroup
            select new
            {
                Category = category.Name,
                Products = from prod2 in prodGroup
                           orderby prod2.Name
                           select prod2
            };

        //Console.WriteLine("GroupInnerJoin:");
        int totalItems = 0;

        Console.WriteLine("GroupInnerJoin:");
        foreach (var productGroup in groupJoinQuery2)
        {
            Console.WriteLine(productGroup.Category);
            foreach (var prodItem in productGroup.Products)
            {
                totalItems++;
                Console.WriteLine("  {0,-10} {1}", prodItem.Name, prodItem.CategoryID);
            }
        }
        Console.WriteLine($"GroupInnerJoin: {totalItems} items in {groupJoinQuery2.Count()} named groups");
        Console.WriteLine(System.Environment.NewLine);
    }

    void GroupJoin3()
    {

        var groupJoinQuery3 =
            from category in categories
            join product in products on category.ID equals product.CategoryID into prodGroup
            from prod in prodGroup
            orderby prod.CategoryID
            select new { Category = prod.CategoryID, ProductName = prod.Name };

        //Console.WriteLine("GroupInnerJoin:");
        int totalItems = 0;

        Console.WriteLine("GroupJoin3:");
        foreach (var item in groupJoinQuery3)
        {
            totalItems++;
            Console.WriteLine($"   {item.ProductName}:{item.Category}");
        }

        Console.WriteLine($"GroupJoin3: {totalItems} items in 1 group");
        Console.WriteLine(System.Environment.NewLine);
    }

    void LeftOuterJoin()
    {
        // Create the query.
        var leftOuterQuery =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID into prodGroup
           select prodGroup.DefaultIfEmpty(new Product() { Name = "Nothing!", CategoryID = category.ID });

        // Store the count of total items (for demonstration only).
        int totalItems = 0;

        Console.WriteLine("Left Outer Join:");

        // A nested foreach statement  is required to access group items
        foreach (var prodGrouping in leftOuterQuery)
        {
            Console.WriteLine("Group:");
            foreach (var item in prodGrouping)
            {
                totalItems++;
                Console.WriteLine("  {0,-10}{1}", item.Name, item.CategoryID);
            }
        }
        Console.WriteLine($"LeftOuterJoin: {totalItems} items in {leftOuterQuery.Count()} groups");
        Console.WriteLine(System.Environment.NewLine);
    }

    void LeftOuterJoin2()
    {
        // Create the query.
        var leftOuterQuery2 =
           from category in categories
           join prod in products on category.ID equals prod.CategoryID into prodGroup
           from item in prodGroup.DefaultIfEmpty()
           select new { Name = item == null ? "Nothing!" : item.Name, CategoryID = category.ID };

        Console.WriteLine($"LeftOuterJoin2: {leftOuterQuery2.Count()} items in 1 group");
        // Store the count of total items
        int totalItems = 0;

        Console.WriteLine("Left Outer Join 2:");

        // Groups have been flattened.
        foreach (var item in leftOuterQuery2)
        {
            totalItems++;
            Console.WriteLine("{0,-10}{1}", item.Name, item.CategoryID);
        }
        Console.WriteLine($"LeftOuterJoin2: {totalItems} items in 1 group");
    }
}
/*Output:

InnerJoin:
Cola      1
Tea       1
Mustard   2
Pickles   2
Carrots   3
Bok Choy  3
Peaches   5
Melons    5
InnerJoin: 8 items in 1 group.

Unshaped GroupJoin:
Group:
    Cola      1
    Tea       1
Group:
    Mustard   2
    Pickles   2
Group:
    Carrots   3
    Bok Choy  3
Group:
Group:
    Peaches   5
    Melons    5
Unshaped GroupJoin: 8 items in 5 unnamed groups

GroupInnerJoin:
Beverages
    Cola       1
    Tea        1
Condiments
    Mustard    2
    Pickles    2
Vegetables
    Bok Choy   3
    Carrots    3
Grains
Fruit
    Melons     5
    Peaches    5
GroupInnerJoin: 8 items in 5 named groups

GroupJoin3:
    Cola:1
    Tea:1
    Mustard:2
    Pickles:2
    Carrots:3
    Bok Choy:3
    Peaches:5
    Melons:5
GroupJoin3: 8 items in 1 group

Left Outer Join:
Group:
    Cola      1
    Tea       1
Group:
    Mustard   2
    Pickles   2
Group:
    Carrots   3
    Bok Choy  3
Group:
    Nothing!  4
Group:
    Peaches   5
    Melons    5
LeftOuterJoin: 9 items in 5 groups

LeftOuterJoin2: 9 items in 1 group
Left Outer Join 2:
Cola      1
Tea       1
Mustard   2
Pickles   2
Carrots   3
Bok Choy  3
Nothing!  4
Peaches   5
Melons    5
LeftOuterJoin2: 9 items in 1 group
Press any key to exit.
*/

class JoinDemo2
{

    class Product
    {
        public required string Name { get; init; }
        public required int CategoryID { get; init; }
        public decimal UnitPrice { get; init; }
    }

    class Category
    {
        public required string Name { get; init; }
        public required int ID { get; init; }
    }

    // Specify the first data source.
    List<Category> categories =
    [
        new Category(){Name="Beverages", ID=001},
        new Category(){ Name="Condiments", ID=002},
        new Category(){ Name="Vegetables", ID=003},
        new Category() {  Name="Grains", ID=004},
        new Category() {  Name="Fruit", ID=005}
    ];

    // Specify the second data source.
    List<Product> products =
    [
      new Product{Name="Cola",  CategoryID=001},
      new Product{Name="Tea",  CategoryID=001},
      new Product{Name="Mustard", CategoryID=002},
      new Product{Name="Pickles", CategoryID=002},
      new Product{Name="Carrots", CategoryID=003},
      new Product{Name="Bok Choy", CategoryID=003},
      new Product{Name="Peaches", CategoryID=005},
      new Product{Name="Melons", CategoryID=005},
    ];

    void SnippetMethod()
    {
        var innerJoinQuery =
            from category in categories
            join prod in products on category.ID equals prod.CategoryID
            select new { ProductName = prod.Name, Category = category.Name }; //produces flat sequence

        var innerGroupJoinQuery =
            from category in categories
            join prod in products on category.ID equals prod.CategoryID into prodGroup
            select new { CategoryName = category.Name, Products = prodGroup };

        var innerGroupJoinQuery2 =
            from category in categories
            join prod in products on category.ID equals prod.CategoryID into prodGroup
            from prod2 in prodGroup
            where prod2.UnitPrice > 2.50M
            select prod2;

        var leftOuterJoinQuery =
            from category in categories
            join prod in products on category.ID equals prod.CategoryID into prodGroup
            from item in prodGroup.DefaultIfEmpty(new Product { Name = String.Empty, CategoryID = 0 })
            select new { CatName = category.Name, ProdName = item.Name };
    }
}
// end namespace
```
For more information, see Perform inner joins.
