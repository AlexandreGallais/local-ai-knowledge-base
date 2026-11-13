---
title: "Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/data/ef-rp/concurrency.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 8, Razor Pages with EF Core in ASP.NET Core - Concurrency (part 2 of 5)

## Add a migration

Adding the `ConcurrencyToken` property changes the data model, which requires a migration.

Build the project.

# Visual Studio

Run the following commands in the PMC:

  ```powershell
  Add-Migration RowVersion
  Update-Database
    
  ```

The preceding commands:

* Creates the `Migrations/{time stamp}_RowVersion.cs` migration file.
* Updates the `Migrations/SchoolContextModelSnapshot.cs` file. The update adds the following code to the `BuildModel` method:

```csharp
 b.Property<byte[]>("ConcurrencyToken")
     .IsConcurrencyToken()
     .ValueGeneratedOnAddOrUpdate()
     .HasColumnType("rowversion");
```

# Visual Studio Code

Run the following commands in a terminal:

  ```dotnetcli
  dotnet ef migrations add RowVersion
  dotnet ef database update
  ```

The preceding commands:

* Creates the `Migrations/{time stamp}_RowVersion.cs` migration file.
* Updates the `Migrations/SchoolContextModelSnapshot.cs` file. The update adds the following highlighted code to the `BuildModel` method:

```csharp
b.Property<Guid>("ConcurrencyToken")
    .IsConcurrencyToken()
    .HasColumnType("TEXT");
```

---

# Visual Studio

Follow the instructions in Scaffold Student pages with the following exceptions:
  * Create a *Pages/Departments* folder.
  * Use `Department` for the model class.
  * Use the existing context class instead of creating a new one.

# Visual Studio Code

* Create a *Pages/Departments* folder.

* Run the following command to scaffold the Department pages.

  **On Windows:**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Department -dc SchoolContext -udl -outDir Pages\Departments --referenceScriptLibraries
  ```

  **On Linux or macOS:**

  ```dotnetcli
  dotnet aspnet-codegenerator razorpage -m Department -dc SchoolContext -udl -outDir Pages/Departments --referenceScriptLibraries
  ```

---

### Add a utility class

In the project folder, create the `Utility`  class with the following code:

# Visual Studio

```csharp
namespace ContosoUniversity
{
    public static class Utility
    {
        public static string GetLastChars(byte[] token)
        {
            return token[7].ToString();
        }
    }
}
```

# Visual Studio Code

```csharp
using System;

namespace ContosoUniversity
{
    public static class Utility
    {
        public static string GetLastChars(Guid token)
        {
            return token.ToString().Substring(
                                    token.ToString().Length - 3);
        }
    }
}
```

---

The `Utility` class provides the `GetLastChars` method used to display the last few characters of the concurrency token. The following code shows the code that works with both SQLite ad SQL Server:

```csharp
#if SQLiteVersion
using System;

namespace ContosoUniversity
{
    public static class Utility
    {
        public static string GetLastChars(Guid token)
        {
            return token.ToString().Substring(
                                    token.ToString().Length - 3);
        }
    }
}
```

The `#if SQLiteVersion` preprocessor directive isolates the differences in the SQLite and SQL Server versions and helps:

* The author maintain one code base for both versions.
* SQLite developers deploy the app to Azure and use SQL Azure.

Build the project.

## Update the Index page

The scaffolding tool created a `ConcurrencyToken` column for the Index page, but that field wouldn't be displayed in a production app. In this tutorial, the last portion of the `ConcurrencyToken` is displayed to help show how concurrency handling works. The last portion isn't guaranteed to be unique by itself.

Update *Pages\Departments\Index.cshtml* page:

* Replace Index with Departments.
* Change the code containing `ConcurrencyToken` to show just the last few characters.
* Replace `FirstMidName` with `FullName`.

The following code shows the updated page:

```cshtml
@page
@model ContosoUniversity.Pages.Departments.IndexModel

@{
    ViewData["Title"] = "Departments";
}

<h2>Departments</h2>

<p>
    <a asp-page="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Department[0].Name)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Department[0].Budget)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Department[0].StartDate)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Department[0].Administrator)
            </th>
            <th>
                Token
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Department)
        {
            <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.Name)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Budget)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.StartDate)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Administrator.FullName)
                </td>
                <td>
                    @Utility.GetLastChars(item.ConcurrencyToken)
                </td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@item.DepartmentID">Edit</a> |
                    <a asp-page="./Details" asp-route-id="@item.DepartmentID">Details</a> |
                    <a asp-page="./Delete" asp-route-id="@item.DepartmentID">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>
```
