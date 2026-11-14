---
title: "Getting Started - EF Core"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/get-started/overview/first-app.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Getting Started with EF Core

In this tutorial, you create a .NET console app that performs data access against a SQLite database using Entity Framework Core.

You can follow the tutorial by using Visual Studio on Windows, or by using the .NET CLI on Windows, macOS, or Linux.

View this article's sample on GitHub.

## Prerequisites

Install the following software:

### .NET CLI

* .NET SDK.

### Visual Studio

* Visual Studio 2022 version 17.4 or later with this workload:
  * **.NET desktop development** (under **Desktop && Mobile**)

---

## Create a new project

### .NET CLI

```dotnetcli
dotnet new console -o EFGetStarted
cd EFGetStarted
```

### Visual Studio

* Open Visual Studio
* Click **New project**
* Select **Console App** with the **C#** tag and click **Next**
* Enter **EFGetStarted** for the name and click **Create**

---

## Install Entity Framework Core

To install EF Core, you install the package for the EF Core database provider(s) you want to target. This tutorial uses SQLite because it runs on all platforms that .NET supports. For a list of available providers, see Database Providers.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
```

### Visual Studio

* **Tools > NuGet Package Manager > Package Manager Console**
* Run the following commands:

  ```powershell
  Install-Package Microsoft.EntityFrameworkCore.Sqlite
  ```

Tip: You can also install packages by right-clicking on the project and selecting **Manage NuGet Packages**

---

## Create the model

Define a context class and entity classes that make up the model.

### .NET CLI

* In the project directory, create **Model.cs** with the following code

### Visual Studio

* Right-click on the project and select **Add > Class**
* Enter **Model.cs** as the name and click **Add**
* Replace the contents of the file with the following code

---

```csharp
﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

public class BloggingContext : DbContext
{
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Post> Posts { get; set; }

    public string DbPath { get; }

    public BloggingContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "blogging.db");
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}

public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }

    public List<Post> Posts { get; } = new();
}

public class Post
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }

    public int BlogId { get; set; }
    public Blog Blog { get; set; }
}
```

EF Core can also reverse engineer a model from an existing database.

Tip: This application intentionally keeps things simple for clarity. Connection strings should not be stored in the code for production applications. You may also want to split each C# class into its own file.

## Create the database

The following steps use migrations to create a database.

### .NET CLI

* Run the following commands:

  ```dotnetcli
  dotnet tool install --global dotnet-ef
  dotnet add package Microsoft.EntityFrameworkCore.Design
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

  This installs dotnet ef and the design package which is required to run the command on a project. The `migrations` command scaffolds a migration to create the initial set of tables for the model. The `database update` command creates the database and applies the new migration to it.

### Visual Studio

* Run the following commands in **Package Manager Console (PMC)**

  ```powershell
  Install-Package Microsoft.EntityFrameworkCore.Tools
  Add-Migration InitialCreate
  Update-Database
  ```

  This installs the PMC tools for EF Core. The `Add-Migration` command scaffolds a migration to create the initial set of tables for the model. The `Update-Database` command creates the database and applies the new migration to it.

---

## Create, read, update & delete

* Open *Program.cs* and replace the contents with the following code:

  ```csharp
﻿using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using var db = new BloggingContext();

// Note: This sample requires the database to be created before running.
Console.WriteLine($"Database path: {db.DbPath}.");

// Create
Console.WriteLine("Inserting a new blog");
db.Add(new Blog { Url = "http://blogs.msdn.com/adonet" });
await db.SaveChangesAsync();

// Read
Console.WriteLine("Querying for a blog");
var blog = await db.Blogs
    .OrderBy(b => b.BlogId)
    .FirstAsync();

// Update
Console.WriteLine("Updating the blog and adding a post");
blog.Url = "https://devblogs.microsoft.com/dotnet";
blog.Posts.Add(
    new Post { Title = "Hello World", Content = "I wrote an app using EF Core!" });
await db.SaveChangesAsync();

// Delete
Console.WriteLine("Delete the blog");
db.Remove(blog);
await db.SaveChangesAsync();
```

## Run the app

### .NET CLI

```dotnetcli
dotnet run
```

### Visual Studio

**Debug > Start Without Debugging**

---

## Next steps

* Follow the ASP.NET Core Tutorial to use EF Core in a web app
* Learn more about LINQ query expressions
* Configure your model to specify things like required and maximum length
* Use Migrations to update the database schema after changing your model
