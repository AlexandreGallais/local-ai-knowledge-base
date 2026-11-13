---
title: "Part 8, add validation (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/validation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Part 8, add validation (part 2 of 2)

## Use DataType attributes

Examine the `Movie` class. The `System.ComponentModel.DataAnnotations` namespace provides formatting attributes in addition to the built-in set of validation attributes. The `[DataType]` attribute is applied to the `ReleaseDate` and `Price` properties.

```csharp
[Display(Name = "Release Date")]
[DataType(DataType.Date)]
[Required]
public DateTime ReleaseDate { get; set; }

[Range(1, 100)]
[DataType(DataType.Currency)]
[Column(TypeName = "decimal(18, 2)")]
public decimal Price { get; set; }
```

The `[DataType]` attributes provide:

* Hints for the view engine to format the data.
* Attributes such as `` for URLs and `` for email.

Use the `[RegularExpression]` attribute to validate the format of the data. Use the `[DataType]` attribute to specify a data type that's more specific than the database intrinsic type. `[DataType]` attributes aren't validation attributes. In the sample app, only the date is displayed, without time.

The `DataType` enumeration provides many data types, such as `Date`, `Time`, `PhoneNumber`, `Currency`, `EmailAddress`, and more.

The `[DataType]` attributes:

* Can enable the app to automatically provide type-specific features. For example, a `mailto:` link can be created for `DataType.EmailAddress`.
* Can provide a date selector `DataType.Date` in browsers that support HTML5.
* Emit HTML 5 `data-`, pronounced "data dash", attributes that HTML 5 browsers consume.
* Do **not** provide any validation.

`DataType.Date` doesn't specify the format of the date that's displayed. By default, the data field is displayed according to the default formats based on the server's `CultureInfo`.

The `[Column(TypeName = "decimal(18, 2)")]` data annotation is required so Entity Framework Core can correctly map `Price` to currency in the database. For more information, see Data Types.

The `[DisplayFormat]` attribute is used to explicitly specify the date format:

```csharp
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime ReleaseDate { get; set; }
```

The `ApplyFormatInEditMode` setting specifies that the formatting is applied when the value is displayed for editing. That behavior might not be wanted for some fields. For example, in currency values, the currency symbol is usually not wanted in the edit UI.

The `[DisplayFormat]` attribute can be used by itself, but it's generally a good idea to use the `[DataType]` attribute. The `[DataType]` attribute conveys the semantics of the data as opposed to how to render it on a screen. The `[DataType]` attribute provides the following benefits that aren't available with `[DisplayFormat]`:

* The browser can enable HTML5 features, for example to show a calendar control, the locale-appropriate currency symbol, email links, and more.
* By default, the browser renders data using the correct format based on its locale.
* The `[DataType]` attribute can enable the ASP.NET Core framework to choose the right field template to render the data. The `DisplayFormat`, if used by itself, uses the string template.

**Note:** jQuery validation doesn't work with the `[Range]` attribute and `DateTime`. For example, the following code always displays a client-side validation error, even when the date is in the specified range:

```csharp
[Range(typeof(DateTime), "1/1/1966", "1/1/2020")]
   ```

It's a best practice to avoid compiling hard dates in models, so using the `[Range]` attribute and `DateTime` is discouraged. Use Configuration for date ranges and other values that are subject to frequent change rather than specifying it in code.

The following code shows combining attributes on one line:

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RazorPagesMovie.Models;

public class Movie
{
    public int Id { get; set; }

    [StringLength(60, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Display(Name = "Release Date"), DataType(DataType.Date), Required]
    public DateTime ReleaseDate { get; set; }

    [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$"), Required, StringLength(30)]
    public string Genre { get; set; } = string.Empty;

    [Range(1, 100), DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$"), StringLength(5)]
    public string Rating { get; set; } = string.Empty;
}
```

Get started with Razor Pages and EF Core shows advanced EF Core operations with Razor Pages.

### Apply migrations

The DataAnnotations you apply to the class change the schema. For example, the DataAnnotations you apply to the `Title` field:

```csharp
[StringLength(60, MinimumLength = 3)]
[Required]
public string Title { get; set; } = string.Empty;
```

* Limit the characters to 60.
* Doesn't allow a `null` value.

The `Movie` table currently has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (MAX)  NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (MAX)  NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

The preceding schema changes don't cause EF to throw an exception. However, create a migration so the schema is consistent with the model.

# Visual Studio

From the **Tools** menu, select **NuGet Package Manager > Package Manager Console**.
In the PMC, enter the following commands:

```powershell
Add-Migration New_DataAnnotations
Update-Database
```

`Update-Database` runs the `Up` method of the `New_DataAnnotations` class.

# Visual Studio Code

Use the following commands to add a migration for the new DataAnnotations:

```dotnetcli
dotnet ef migrations add New_DataAnnotations
dotnet ef database update
```

`dotnet ef database update` runs the `Up` method of the `New_DataAnnotations` class.

---

Examine the `Up` method:

```csharp
public partial class New_DataAnnotations : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<string>(
            name: "Title",
            table: "Movie",
            type: "nvarchar(60)",
            maxLength: 60,
            nullable: false,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "Rating",
            table: "Movie",
            type: "nvarchar(5)",
            maxLength: 5,
            nullable: false,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");

        migrationBuilder.AlterColumn<string>(
            name: "Genre",
            table: "Movie",
            type: "nvarchar(30)",
            maxLength: 30,
            nullable: false,
            oldClrType: typeof(string),
            oldType: "nvarchar(max)");
    }
```

The updated `Movie` table has the following schema:

```sql
CREATE TABLE [dbo].[Movie] (
    [ID]          INT             IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (60)   NOT NULL,
    [ReleaseDate] DATETIME2 (7)   NOT NULL,
    [Genre]       NVARCHAR (30)   NOT NULL,
    [Price]       DECIMAL (18, 2) NOT NULL,
    [Rating]      NVARCHAR (5)    NOT NULL,
    CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED ([ID] ASC)
);
```

> **Note:**
> The preceding `Up` method and schema show SQL Server output. If you're using SQLite instead of SQL Server, the generated migration and schema differ. SQLite has a minimal type system that maps `string` properties to `TEXT` and doesn't apply the `[StringLength]` maximum length to the schema. Columns such as `Title`, `Genre`, and `Rating` are created as `TEXT` with no length. The maximum length is still enforced by ASP.NET Core model validation, not by the database schema. For more information, see SQLite EF Core Database Provider Limitations.

### Publish to Azure

For information on deploying to Azure, see Tutorial: Build an ASP.NET Core app in Azure with SQL Database.

Thanks for completing this introduction to Razor Pages. Get started with Razor Pages and EF Core is an excellent follow up to this tutorial.

## Related content

* Tag Helpers in forms in ASP.NET Core
* Globalization and localization in ASP.NET Core
* Tag Helpers in ASP.NET Core
* Author Tag Helpers in ASP.NET Core

## Next steps

> Previous: Add a new field
