---
title: "Chain standard query operators together (C#) - LINQ to XML"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/linq/chain-standard-query-operators-together.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Chain standard query operators together (C#) (LINQ to XML)

The standard query operators can be chained together. For example, you can interject the `System.Linq.Enumerable.Where*` operator (invoked by the `where` clause), and it operates in a lazy fashion; that is, no intermediate results are materialized by it.

## Example: Interject a where clause

In this example, the `System.Linq.Enumerable.Where*` method is called before calling `ConvertCollectionToUpperCase`. The `System.Linq.Enumerable.Where*` method operates in almost exactly the same way as the lazy methods used in previous examples in this tutorial, `ConvertCollectionToUpperCase` and `AppendString`.

One difference is that in this case, the `System.Linq.Enumerable.Where*` method iterates through its source collection, determines that the first item doesn't pass the predicate, and then gets the next item, which does pass. It then yields the second item.

However, the basic idea is the same: intermediate collections aren't materialized unless they have to be.

When query expressions are used, they're converted to calls to the standard query operators, and the same principles apply.

All of the examples in this section that are querying Office Open XML documents use the same principle. Deferred execution and lazy evaluation are some of the fundamental concepts that you must understand to use LINQ, and LINQ to XML, effectively.

```csharp
public static class LocalExtensions
{
    public static IEnumerable<string>
      ConvertCollectionToUpperCase(this IEnumerable<string> source)
    {
        foreach (string str in source)
        {
            Console.WriteLine("ToUpper: source >{0}<", str);
            yield return str.ToUpper();
        }
    }

    public static IEnumerable<string>
      AppendString(this IEnumerable<string> source, string stringToAppend)
    {
        foreach (string str in source)
        {
            Console.WriteLine("AppendString: source >{0}<", str);
            yield return str + stringToAppend;
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        string[] stringArray = { "abc", "def", "ghi" };

        IEnumerable<string> q1 =
            from s in stringArray.ConvertCollectionToUpperCase()
            where s.CompareTo("D") >= 0
            select s;

        IEnumerable<string> q2 =
            from s in q1.AppendString("!!!")
            select s;

        foreach (string str in q2)
        {
            Console.WriteLine("Main: str >{0}<", str);
            Console.WriteLine();
        }
    }
}
```

This example produces the following output:

```output
ToUpper: source >abc<
ToUpper: source >def<
AppendString: source >DEF<
Main: str >DEF!!!<

ToUpper: source >ghi<
AppendString: source >GHI<
Main: str >GHI!!!<
```

This is the final article in the Tutorial: Chaining Queries Together (C#) tutorial.
