---
title: "descending contextual keyword"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/descending.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# descending (C# Reference)

Use the `descending` contextual keyword in the orderby clause of query expressions to specify that the sort order is from largest to smallest.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following example shows how to use `descending` in an orderby clause.

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

- LINQ in C#
- ascending
