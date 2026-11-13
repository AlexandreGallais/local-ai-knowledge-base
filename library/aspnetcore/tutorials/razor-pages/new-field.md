---
title: "Part 7, add a new field"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/new-field.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 7, add a new field to a Razor Page in ASP.NET Core

-->
-->

By Rick Anderson

In this section, Entity Framework Core (EF Core) is used to define the database schema based on the app's model class:

* Add a new field to the model.
* Migrate the new field schema change to the database.

The EF Core approach allows for a more agile development process. You work on the app's data model directly while EF Core creates and synchronizes the database schema. You don't need to switch contexts to and from a database management tool. For an overview of Entity Framework Core and its benefits, see Entity Framework Core.

Using EF Core to automatically create and track a database:

* Adds an `__EFMigrationsHistory` table to the database to track whether the schema of the database is in sync with the model classes it was generated from.
* Throws an exception if the model classes aren't in sync with the database.

Automatic verification that the schema and model are in sync makes it easier to find inconsistent database code issues.

## Add a Rating property to the Movie model

1. Open the `Models/Movie.cs` file and add a `Rating` property:
   ```csharp
public class Movie
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;

    [Display(Name = "Release Date")]
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
    public string Rating { get; set; } = string.Empty;
}
```
1. Edit `Pages/MoviePages/Index.cshtml`, and add a `Rating` field:
   ```cshtml
@page
@model RazorPagesMovie.Pages.MoviePages.IndexModel

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-page="Create">Create New</a>
</p>

<form>
    <p>
        <select asp-for="MovieGenre" asp-items="Model.Genres">
            <option value="">All</option>
        </select>
        <label>Title: <input type="text" asp-for="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>

<table class="table">

    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Title)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].ReleaseDate)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Genre)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Price)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movie[0].Rating)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Movie)
        {
            <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.Title)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.ReleaseDate)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Genre)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Price)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Rating)
                </td>
                <td>
                    <a asp-page="./Edit" asp-route-id="@item.Id">Edit</a> |
                    <a asp-page="./Details" asp-route-id="@item.Id">Details</a> |
                    <a asp-page="./Delete" asp-route-id="@item.Id">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>
```

1. Update the following pages with a `Rating` field:
   * *Pages/MoviePages/Create.cshtml*.
   * *Pages/MoviePages/Delete.cshtml*.
   * *Pages/MoviePages/Details.cshtml*.
   * *Pages/MoviePages/Edit.cshtml*.

The app doesn't work until you update the database to include the new field. Running the app without an update to the database throws a `SqlException`:

`SqlException: Invalid column name 'Rating'.`

The `SqlException` exception occurs because the updated Movie model class doesn't match the schema of the Movie table in the database. The database table doesn't have a `Rating` column.

You can resolve the error by using one of the following approaches:

1. Have Entity Framework automatically drop and re-create the database using the new model class schema. This approach is convenient early in the development cycle because it allows developers to quickly evolve the model and database schema together. The downside is that existing data in the database is lost. Don't use this approach on a production database! Dropping the database on schema changes and using an initializer to automatically seed the database with test data is often a productive way to develop an app.
1. Explicitly modify the schema of the existing database so that it matches the model classes. The advantage of this approach is to keep the data. Make this change either manually or by creating a database change script.
1. Use EF Core Migrations to update the database schema.

For this tutorial, use EF Core Migrations.

Update the `SeedData` class so that it provides a value for the new column. A sample change is shown in the following code, but make this change for each `new Movie` block.

```csharp
context.Movie.AddRange(
    new Movie
    {
        Title = "When Harry Met Sally",
        ReleaseDate = DateTime.Parse("1989-2-12"),
        Genre = "Romantic Comedy",
        Price = 7.99M,
        Rating = "R"
    },
```

See the completed SeedData.cs file.

Build the app

### Visual Studio

Press `Ctrl`+`Shift`+`B`.

### Visual Studio Code

From the *View* menu, select *Terminal* and enter the following command:

```dotnetcli
dotnet build
```

---

# Visual Studio

## Add a migration for the rating field

1. From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
1. In the Package Manager Console (PMC), enter the following command:

   ```powershell
   Add-Migration Rating
   ```

The `Add-Migration` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name "Rating" is arbitrary and is used to name the migration file. It's helpful to use a meaningful name for the migration file.

1. In the PMC, enter the following command:

   ```powershell
   Update-Database
   ```

The `Update-Database` command tells the framework to apply the schema changes to the database and to preserve existing data.

To delete all the records in the database, the initializer seeds the database and includes the `Rating` field. You can delete records by using the delete links in the browser or from Sql Server Object Explorer (SSOX).

Another option is to delete the database and use migrations to re-create the database. To delete the database in SSOX:

1. Select the database in SSOX.
1. Right-click on the database, and select **Delete**.
1. Check **Close existing connections**.
1. Select **OK**.
1. In the PMC, update the database:

   ```powershell
   Update-Database
   ```

# Visual Studio Code

## Add a migration for rating

Use the following commands to add a migration for the rating field:

```dotnetcli
dotnet ef migrations add rating
dotnet ef database update
```

The `dotnet ef migrations add rating` command tells the framework to:

* Compare the `Movie` model with the `Movie` database schema.
* Create code to migrate the database schema to the new model.

The name `rating` is arbitrary and is used to name the migration file. Use a meaningful name for the migration file.

The `dotnet ef database update` command applies the schema changes to the database and preserves existing data.

If you delete all the records in the database, the initializer seeds the database and includes the `Rating` field.

### Optional: Drop and re-create the database for other providers

Skip this section if you successfully migrated the database.

In this tutorial, use Entity Framework Core *migrations* features when possible. Migrations update the database schema to match changes in the data model. However, migrations can only make changes that the EF Core provider supports, and some providers have limited capabilities. For example, adding a column might be supported, but removing or changing a column might not be. If you create a migration to remove or change a column, the `ef migrations add` command succeeds but the `ef database update` command fails. Due to these limitations, you can drop and re-create the database.

To work around these limitations, manually write migrations code to perform a table rebuild when something in the table changes. A table rebuild involves:

* Creating a new table.
* Copying data from the old table to the new table.
* Dropping the old table.
* Renaming the new table.

For more information, see the following resources:

* SQLite EF Core Database Provider Limitations
* Customize migration code
* Data seeding
* SQLite ALTER TABLE statement

1. Delete the migration folder.

1. Use the following commands to recreate the database.

   ```dotnetcli
   dotnet ef database drop
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

---

Run the app and verify you can create, edit, and display movies with a `Rating` field. If the database isn't seeded, set a break point in the `SeedData.Initialize` method.

## Next steps

> Previous: Add Search
> Next: Add Validation
