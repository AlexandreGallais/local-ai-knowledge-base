---
title: "Write LINQ queries (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/linq/get-started/write-linq-queries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Write C# LINQ queries to query data

Most queries in the introductory Language Integrated Query (LINQ) documentation use the LINQ declarative query syntax. The C# compiler translates query syntax into method calls. These method calls implement the standard query operators. They have names such as `Where`, `Select`, `GroupBy`, `Join`, `Max`, and `Average`. You call them directly by using method syntax instead of query syntax.

Query syntax and method syntax are semantically identical, but query syntax is often simpler and easier to read. You must express some queries as method calls. For example, you must use a method call to express a query that retrieves the number of elements that match a specified condition. You also must use a method call for a query that retrieves the element that has the maximum value in a source sequence. The reference documentation for the standard query operators in the `System.Linq` namespace generally uses method syntax. Become familiar with how to use method syntax in queries and in query expressions themselves.

## Standard query operator extension methods

The following example shows a simple *query expression* and the semantically equivalent query written as a *method-based query*.

```csharp
int[] numbers = [ 5, 10, 8, 3, 6, 12 ];

//Query syntax:
IEnumerable<int> numQuery1 =
    from num in numbers
    where num % 2 == 0
    orderby num
    select num;

//Method syntax:
IEnumerable<int> numQuery2 = numbers
    .Where(num => num % 2 == 0)
    .OrderBy(n => n);

foreach (int i in numQuery1)
{
    Console.Write(i + " ");
}
Console.WriteLine(System.Environment.NewLine);
foreach (int i in numQuery2)
{
    Console.Write(i + " ");
}
```
The output from the two examples is identical. The type of the query variable is the same in both forms: `System.Collections.Generic.IEnumerable`1`.

On the right side of the expression, notice that the `where` clause is now expressed as an instance method on the `numbers` object, which has a type of `IEnumerable<int>`. If you're familiar with the generic `System.Collections.Generic.IEnumerable`1` interface, you know that it doesn't have a `Where` method. However, if you invoke the IntelliSense completion list in the Visual Studio IDE, you see not only a `Where` method, but many other methods such as `Select`, `SelectMany`, `Join`, and `Orderby`. These methods implement the standard query operators.

Although it looks as if `System.Collections.Generic.IEnumerable`1` includes more methods, it doesn't. The standard query operators are implemented as *extension methods*. Extension members "extend" an existing type; they can be called as if they were members on the type. The standard query operators extend `System.Collections.Generic.IEnumerable`1`, and that's why you can write `numbers.Where(...)`. You bring extensions into scope with `using` directives before calling them.

For more information about extension members, see Extension members. For more information about standard query operators, see Standard Query Operators Overview (C#). Some LINQ providers, such as Entity Framework and LINQ to XML, implement their own standard query operators and extension members for other types besides `System.Collections.Generic.IEnumerable`1`.

## Lambda expressions

In the preceding example, the conditional expression (`num % 2 == 0`) is passed as an in-line argument to the `System.Linq.Enumerable.Where*` method: `Where(num => num % 2 == 0).` This inline expression is a lambda expression. It's a convenient way to write code that would otherwise have to be written in more cumbersome form. The `num` on the left of the operator is the input variable, which corresponds to `num` in the query expression. The compiler can infer the type of `num` because it knows that `numbers` is a generic `System.Collections.Generic.IEnumerable`1` type. The body of the lambda is the same as the expression in query syntax or in any other C# expression or statement. It can include method calls and other complex logic. The return value is the expression result. You can only express certain queries in method syntax, and some of those queries require lambda expressions. Lambda expressions are a powerful and flexible tool in your LINQ toolbox.

## Composability of queries

In the preceding code example, the `System.Linq.Enumerable.OrderBy*` method is invoked by using the dot operator on the call to `Where`. `Where` produces a filtered sequence, and then `Orderby` sorts the sequence produced by `Where`. Because queries return an `IEnumerable`, you compose them in method syntax by chaining the method calls together. The compiler does this composition when you write queries using query syntax. Because a query variable doesn't store the results of the query, you can modify it or use it as the basis for a new query at any time, even after you execute it.

The following examples demonstrate some basic LINQ queries by using each approach listed previously.

> **Note:**
> These queries operate on in-memory collections; however, the syntax is identical to the syntax used in LINQ to Entities and LINQ to XML.

## Example - query syntax

Write most queries with *query syntax* to create *query expressions*. The following example shows three query expressions. The first query expression demonstrates how to filter or restrict results by applying conditions with a `where` clause. It returns all elements in the source sequence whose values are greater than 7 or less than 3. The second expression demonstrates how to order the returned results. The third expression demonstrates how to group results according to a key. This query returns two groups based on the first letter of the word.

```csharp
List<int> numbers = [ 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 ];

// The query variables can also be implicitly typed by using var

// Query #1.
IEnumerable<int> filteringQuery =
    from num in numbers
    where num is < 3 or > 7
    select num;

// Query #2.
IEnumerable<int> orderingQuery =
    from num in numbers
    where num is < 3 or > 7
    orderby num ascending
    select num;

// Query #3.
string[] groupingQuery = ["carrots", "cabbage", "broccoli", "beans", "barley"];
IEnumerable<IGrouping<char, string>> queryFoodGroups =
    from item in groupingQuery
    group item by item[0];
```
The type of the queries is `System.Collections.Generic.IEnumerable`1`. All of these queries can be written using `var` as shown in the following example:

`var query = from num in numbers...`

In each previous example, the queries don't actually execute until you iterate over the query variable in a `foreach` statement or other statement.

## Example - method syntax

You must express some query operations as a method call. The most common such methods are those methods that return singleton numeric values, such as `System.Linq.Enumerable.Sum*`, `System.Linq.Enumerable.Max*`, `System.Linq.Enumerable.Min*`, `System.Linq.Enumerable.Average*`, and so on. Call these methods last in any query because they return a single value and can't serve as the source for more query operations. The following example shows a method call in a query expression:

```csharp
List<int> numbers1 = [ 5, 4, 1, 3, 9, 8, 6, 7, 2, 0 ];
List<int> numbers2 = [ 15, 14, 11, 13, 19, 18, 16, 17, 12, 10 ];

// Query #4.
double average = numbers1.Average();

// Query #5.
IEnumerable<int> concatenationQuery = numbers1.Concat(numbers2);
```
If the method has `System.Action` or `System.Func`1` parameters, provide these arguments in the form of a lambda expression, as shown in the following example:

```csharp
// Query #6.
IEnumerable<int> largeNumbersQuery = numbers2.Where(c => c > 15);
```
In the previous queries, only Query #4 executes immediately because it returns a single value, and not a generic `System.Collections.Generic.IEnumerable`1` collection. The method itself uses `foreach` or similar code in order to compute its value.

You can write each of the previous queries by using implicit typing with `var`, as shown in the following example:

```csharp
// var is used for convenience in these queries
double average = numbers1.Average();
var concatenationQuery = numbers1.Concat(numbers2);
var largeNumbersQuery = numbers2.Where(c => c > 15);
```
## Example - mixed query and method syntax

This example shows how to use method syntax on the results of a query clause. Enclose the query expression in parentheses, and then apply the dot operator and call the method. In the following example, query #7 returns a count of the numbers whose value is between 3 and 7.

```csharp
// Query #7.

// Using a query expression with method syntax
var numCount1 = (
    from num in numbers1
    where num is > 3 and < 7
    select num
).Count();

// Better: Create a new variable to store
// the method call result
IEnumerable<int> numbersQuery =
    from num in numbers1
    where num is > 3 and < 7
    select num;

var numCount2 = numbersQuery.Count();
```
Because Query #7 returns a single value and not a collection, the query executes immediately.

You can write the previous query by using implicit typing with `var`, as follows:

```csharp
var numCount = (from num in numbers...
```

You can write it in method syntax as follows:

```csharp
var numCount = numbers.Count(n => n is > 3 and < 7);
```
You can write it by using explicit typing, as follows:

```csharp
int numCount = numbers.Count(n => n is > 3 and < 7);
```
## Dynamically specify predicate filters at run time

In some cases, you don't know until run time how many predicates you have to apply to source elements in the `where` clause. One way to dynamically specify multiple predicate filters is to use the `System.Linq.Enumerable.Contains*` method, as shown in the following example. The query returns different results based on the value of `id` when the query is executed.

```csharp
int[] ids = [ 111, 114, 112 ];

var queryNames = from student in students
                 where ids.Contains(student.ID)
                 select new
                 {
                     student.LastName,
                     student.ID
                 };

foreach (var name in queryNames)
{
    Console.WriteLine($"{name.LastName}: {name.ID}");
}

/* Output:
    Garcia: 114
    O'Donnell: 112
    Omelchenko: 111
 */

// Change the ids.
ids = [ 122, 117, 120, 115 ];

// The query will now return different results
foreach (var name in queryNames)
{
    Console.WriteLine($"{name.LastName}: {name.ID}");
}

/* Output:
    Adams: 120
    Feng: 117
    Garcia: 115
    Tucker: 122
 */
```
> **Note:**
> This example uses the following data source and data:

```csharp
record City(string Name, long Population);
record Country(string Name, double Area, long Population, List<City> Cities);
record Product(string Name, string Category);
```
```csharp
static readonly City[] cities = [
    new City("Tokyo", 37_833_000),
    new City("Delhi", 30_290_000),
    new City("Shanghai", 27_110_000),
    new City("São Paulo", 22_043_000),
    new City("Mumbai", 20_412_000),
    new City("Beijing", 20_384_000),
    new City("Cairo", 18_772_000),
    new City("Dhaka", 17_598_000),
    new City("Osaka", 19_281_000),
    new City("New York-Newark", 18_604_000),
    new City("Karachi", 16_094_000),
    new City("Chongqing", 15_872_000),
    new City("Istanbul", 15_029_000),
    new City("Buenos Aires", 15_024_000),
    new City("Kolkata", 14_850_000),
    new City("Lagos", 14_368_000),
    new City("Kinshasa", 14_342_000),
    new City("Manila", 13_923_000),
    new City("Rio de Janeiro", 13_374_000),
    new City("Tianjin", 13_215_000)
];

static readonly Country[] countries = [
    new Country ("Vatican City", 0.44, 526, [new City("Vatican City", 826)]),
    new Country ("Monaco", 2.02, 38_000, [new City("Monte Carlo", 38_000)]),
    new Country ("Nauru", 21, 10_900, [new City("Yaren", 1_100)]),
    new Country ("Tuvalu", 26, 11_600, [new City("Funafuti", 6_200)]),
    new Country ("San Marino", 61, 33_900, [new City("San Marino", 4_500)]),
    new Country ("Liechtenstein", 160, 38_000, [new City("Vaduz", 5_200)]),
    new Country ("Marshall Islands", 181, 58_000, [new City("Majuro", 28_000)]),
    new Country ("Saint Kitts & Nevis", 261, 53_000, [new City("Basseterre", 13_000)])
];
```
You can use control flow statements, such as `if... else` or `switch`, to select among predetermined alternative queries. In the following example, `studentQuery` uses a different `where` clause if the run-time value of `oddYear` is `true` or `false`.

```csharp
void FilterByYearType(bool oddYear)
{
    IEnumerable<Student> studentQuery = oddYear
        ? (from student in students
           where student.Year is GradeLevel.FirstYear or GradeLevel.ThirdYear
           select student)
        : (from student in students
           where student.Year is GradeLevel.SecondYear or GradeLevel.FourthYear
           select student);
    var descr = oddYear ? "odd" : "even";
    Console.WriteLine($"The following students are at an {descr} year level:");
    foreach (Student name in studentQuery)
    {
        Console.WriteLine($"{name.LastName}: {name.ID}");
    }
}

FilterByYearType(true);

/* Output:
    The following students are at an odd year level:
    Fakhouri: 116
    Feng: 117
    Garcia: 115
    Mortensen: 113
    Tucker: 119
    Tucker: 122
 */

FilterByYearType(false);

/* Output:
    The following students are at an even year level:
    Adams: 120
    Garcia: 114
    Garcia: 118
    O'Donnell: 112
    Omelchenko: 111
    Zabokritski: 121
 */
```
