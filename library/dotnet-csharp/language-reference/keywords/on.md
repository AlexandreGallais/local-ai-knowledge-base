---
title: "on keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/on.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# on (C# Reference)

Use the `on` contextual keyword in the join clause of a query expression to specify the join condition.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to use `on` in a `join` clause.

```csharp
﻿using System;
using System.Collections.Generic;
using System.Collections;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace csrefKeywordsContextual
{
    class Test
    {
        class Student
        {
            public string LastName;
            public Student(string name)
            {
                LastName = name;
            }
        }

        class Category
        {
            public int ID;
            public string Name;

            public Category(int i, string n)
            {
                ID = i;
                Name = n;
            }
        }

        class Product
        {
            public string Name;
            public int ProdID;
            public int CategoryID;
            public Product(string n, int pid, int cid)
            {
                Name = n;
                ProdID = pid;
                CategoryID = cid;
            }
        }

        static string[] vegetables = { "carrot", "celery" };
        static void Main()
        {
            List<Student> students = new List<Student>();
            var query = from student in students
                        group student by student.LastName[0];

            IEnumerable<string> sortDescendingQuery =
                from vegetable in vegetables
                orderby vegetable descending
                select vegetable;

            IEnumerable<string> sortAscendingQuery =
                from vegetable in vegetables
                orderby vegetable ascending
                select vegetable;

            List<Category> categories = new List<Category>();
            List<Product> products = new List<Product>();

            var innerJoinQuery =
                from category in categories
                join prod in products on category.ID equals prod.CategoryID
                select new { ProductName = prod.Name, Category = category.Name };
        }

    }
}
```
## See also

- Language Integrated Query (LINQ)
