---
title: "Code First Migrations - EF6 (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/code-first/migrations/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Code First Migrations - EF6 (part 2 of 2)

## Automatically Upgrading on Application Startup (MigrateDatabaseToLatestVersion Initializer)

If you are deploying your application you may want it to automatically upgrade the database (by applying any pending migrations) when the application launches. You can do this by registering the **MigrateDatabaseToLatestVersion** database initializer. A database initializer simply contains some logic that is used to make sure the database is setup correctly. This logic is run the first time the context is used within the application process (**AppDomain**).

We can update the **Program.cs** file, as shown below, to set the **MigrateDatabaseToLatestVersion** initializer for BlogContext before we use the context (Line 14). Note that you also need to add a using statement for the **System.Data.Entity** namespace (Line 5).

*When we create an instance of this initializer we need to specify the context type (**BlogContext**) and the migrations configuration (**Configuration**) - the migrations configuration is the class that got added to our **Migrations** folder when we enabled Migrations.*

```csharp
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Data.Entity;
    using MigrationsDemo.Migrations;

    namespace MigrationsDemo
    {
        class Program
        {
            static void Main(string[] args)
            {
                Database.SetInitializer(new MigrateDatabaseToLatestVersion<BlogContext, Configuration>());

                using (var db = new BlogContext())
                {
                    db.Blogs.Add(new Blog { Name = "Another Blog " });
                    db.SaveChanges();

                    foreach (var blog in db.Blogs)
                    {
                        Console.WriteLine(blog.Name);
                    }
                }

                Console.WriteLine("Press any key to exit...");
                Console.ReadKey();
            }
        }
    }
```

Now whenever our application runs it will first check if the database it is targeting is up-to-date, and apply any pending migrations if it is not.
