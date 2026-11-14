---
title: "into keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/into.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# into (C# Reference)

Use the `into` contextual keyword to create a temporary identifier that stores the results of a `group`, `join`, or `select` clause. This identifier can act as a generator for additional query commands. When you use the new identifier in a `group` or `select` clause, it's sometimes called a *continuation*.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to use the `into` keyword to create a temporary identifier named `fruitGroup`, which has an inferred type of `IGrouping`. By using this identifier, you can call the `System.Linq.Enumerable.Count*` method on each group and select only those groups that contain two or more words.

```csharp
namespace IntoClause;

class IntoSample1
{
    static void Main()
    {

        // Create a data source.
        string[] words = ["apples", "blueberries", "oranges", "bananas", "apricots"];

        // Create the query.
        var wordGroups1 =
            from w in words
            group w by w[0] into fruitGroup
            where fruitGroup.Count() >= 2
            select new { FirstLetter = fruitGroup.Key, Words = fruitGroup.Count() };

        // Execute the query. Note that we only iterate over the groups,
        // not the items in each group
        foreach (var item in wordGroups1)
        {
            Console.WriteLine($" {item.FirstLetter} has {item.Words} elements.");
        }
    }
}
/* Output:
   a has 2 elements.
   b has 2 elements.
*/

class IntoSample2
{
    static void Main()
    {
        //Create a data source
        string[] words2 = ["apples", "blueberries", "oranges", "bananas"];

        //Create a query
        var wordGroups2 =
            from w in words2
            group w by w[0];

        // Nested foreach loop to iterate over groups
        // and the items in each group.
        foreach (var item in wordGroups2)
        {
            Console.WriteLine($"Words that start with the letter '{item.Key}':");
            foreach (var w in item)
            {
                Console.WriteLine(w);
            }
        }
    }
}
/* Output:
    Words that start with the letter 'a':
    apples
    Words that start with the letter 'b':
    blueberries
    bananas
    Words that start with the letter 'o':
    oranges
 */
```
You only need to use `into` in a `group` clause when you want to perform additional query operations on each group. For more information, see group clause.

For an example of using `into` in a `join` clause, see join clause.

## See also

- Query Keywords (LINQ)
- LINQ in C#
- group clause
