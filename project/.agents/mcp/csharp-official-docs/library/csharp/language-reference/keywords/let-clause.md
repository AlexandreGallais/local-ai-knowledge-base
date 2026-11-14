---
title: "let clause"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/let-clause.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `let` clause (C# Reference)

In a query expression, it can be useful to store the result of a subexpression so you can use it in later clauses. Use the `let` keyword to create a new range variable and initialize it with the result of an expression. After you initialize the range variable with a value, you can't assign it another value. However, if the range variable holds a queryable type, you can query it.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In the following example, `let` is used in two ways:

1. It creates an enumerable type that you can query.
1. It enables the query to call `ToLower` only one time on the range variable `word`. Without using `let`, you'd have to call `ToLower` in each predicate in the `where` clause.

```csharp
namespace LetClause;

class LetSample1
{
    static void Main()
    {
        string[] strings =
        [
            "A penny saved is a penny earned.",
            "The early bird catches the worm.",
            "The pen is mightier than the sword."
        ];

        // Split the sentence into an array of words
        // and select those whose first letter is a vowel.
        var earlyBirdQuery =
            from sentence in strings
            let words = sentence.Split(' ')
            from word in words
            let w = word.ToLower()
            where w[0] == 'a' || w[0] == 'e'
                || w[0] == 'i' || w[0] == 'o'
                || w[0] == 'u'
            select word;

        // Execute the query.
        foreach (var v in earlyBirdQuery)
        {
            Console.WriteLine($"\"{v}\" starts with a vowel");
        }
    }
}
/* Output:
    "A" starts with a vowel
    "is" starts with a vowel
    "a" starts with a vowel
    "earned." starts with a vowel
    "early" starts with a vowel
    "is" starts with a vowel
*/
```
## See also

- Query Keywords (LINQ)
- LINQ in C#
- Language Integrated Query (LINQ)
- Handle exceptions in query expressions
