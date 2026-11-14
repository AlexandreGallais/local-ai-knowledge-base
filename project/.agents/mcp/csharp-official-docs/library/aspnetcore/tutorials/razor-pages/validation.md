---
title: "Part 8, add validation (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/tutorials/razor-pages/validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Part 8 of tutorial series on Razor Pages

By Rick Anderson

In this section, you add validation logic to the `Movie` model. The app enforces the validation rules any time a user creates or edits a movie.

## Validation

A key tenet of software development is called DRY ("**D**on't **R**epeat **Y**ourself"). Razor Pages encourages development where you specify functionality once, and it's reflected throughout the app. DRY can help:

* Reduce the amount of code in an app.
* Make the code less error prone, and easier to test and maintain.

The validation support that Razor Pages and Entity Framework provide is a good example of the DRY principle:

* You declaratively specify validation rules in one place, in the model class.
* The app enforces rules everywhere.

## Validation in .NET 10

In .NET 10, the unified validation APIs are in the `Microsoft.Extensions.Validation` NuGet package. By using this package, you can use the validation APIs outside of ASP.NET Core HTTP scenarios.

To use the `Microsoft.Extensions.Validation` APIs:

* Add the following package reference:

  ```xml
  <PackageReference Include="Microsoft.Extensions.Validation" Version="10.0.1" />
  ```

  The functionality is the same but now requires an explicit package reference.

* Register validation services by using dependency injection:

    ```csharp
    builder.Services.AddValidation();
    ```

## Add validation rules to the movie model

The `System.ComponentModel.DataAnnotations` namespace provides:

* A set of built-in validation attributes that you apply declaratively to a class or property.
* Formatting attributes like `[DataType]` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `[Required]`, `[StringLength]`, `[RegularExpression]`, and `[Range]` validation attributes.

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RazorPagesMovie.Models;

public class Movie
{
    public int Id { get; set; }

    [StringLength(60, MinimumLength = 3)]
    [Required]
    public string Title { get; set; } = string.Empty;

    [Display(Name = "Release Date")]
    [DataType(DataType.Date)]
    [Required]
    public DateTime ReleaseDate { get; set; }

    [Range(1, 100)]
    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }

    [RegularExpression(@"^[A-Z]+[a-zA-Z\s]*$")]
    [Required]
    [StringLength(30)]
    public string Genre { get; set; } = string.Empty;

    [RegularExpression(@"^[A-Z]+[a-zA-Z0-9""'\s-]*$")]
    [StringLength(5)]
    [Required]
    public string Rating { get; set; } = string.Empty;
}
```

The validation attributes specify behavior to enforce on the model properties they're applied to:

* The `[Required]` and `[MinimumLength]` attributes indicate that a property must have a value. Nothing prevents a user from entering white space to satisfy this validation.
* The `[RegularExpression]` attribute limits what characters can be input. In the preceding code, `Genre`:

  * Must only use letters.
  * The first letter must be uppercase. White spaces are allowed, while numbers and special characters aren't allowed.

* The `RegularExpression` `Rating`:

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a `Genre`.

* The `[Range]` attribute constrains a value to within a specified range.
* The `[StringLength]` attribute can set a maximum length of a string property, and optionally its minimum length.
* Value types, such as `decimal`, `int`, `float`, `DateTime`, are inherently required and don't need the `[Required]` attribute.

The preceding validation rules are for demonstration. They aren't optimal for a production system. For example, the preceding rules prevent entering a movie with only two characters and don't allow special characters in `Genre`.

By having ASP.NET Core automatically enforce validation rules, you can:

* Make the app more robust.
* Reduce chances of saving invalid data to the database.

### Validation error UI in Razor Pages

Run the app and go to **Pages/MoviePages**.

Select the **Create New** link. Complete the form with some invalid values. When jQuery client-side validation detects the error, it displays an error message.

> **Note:**
> You may not be able to enter decimal commas in decimal fields. To support jQuery validation for non-English locales that use a comma (",") for a decimal point, and non US-English date formats, you must take steps to globalize your app. See this GitHub comment 4076 for instructions on adding decimal comma.

Notice how the form automatically renders a validation error message in each field containing an invalid value. The errors are enforced both client-side, by using JavaScript and jQuery, and server-side, when a user has JavaScript disabled.

A significant benefit is that **no** code changes are necessary in the Create or Edit pages. Once you apply data annotations to the model, the validation UI is enabled. The Razor Pages you created in this tutorial automatically pick up the validation rules, by using validation attributes on the properties of the `Movie` model class. To test validation by using the Edit page, the same validation is applied.

The form data isn't posted to the server until there are no client-side validation errors. Verify form data isn't posted by one or more of the following approaches:

* Put a break point in the `OnPostAsync` method. Submit the form by selecting **Create** or **Save**. The break point is never hit.
* Use the Fiddler tool.
* Use the browser developer tools to monitor network traffic.

### Server-side validation

When JavaScript is disabled in the browser, submitting the form with errors posts the form to the server.

To test server-side validation:

1. Disable JavaScript in the browser. Use the browser's developer tools to disable JavaScript. If you can't disable JavaScript in the browser, try another browser.
1. Set a break point in the `OnPostAsync` method of the Create or Edit page.
1. Submit a form with invalid data.
1. Verify the model state is invalid.

   ```csharp
    if (!ModelState.IsValid)
    {
       return Page();
    }
   ```

Alternatively, disable client-side validation on the server.

The following code shows a portion of the `Create.cshtml` page scaffolded earlier in the tutorial. The Create and Edit pages use this code to:

* Display the initial form.
* Redisplay the form in the event of an error.

```cshtml
<form method="post">
    <div asp-validation-summary="ModelOnly" class="text-danger"></div>
    <div class="form-group">
        <label asp-for="Movie.Title" class="control-label"></label>
        <input asp-for="Movie.Title" class="form-control" />
        <span asp-validation-for="Movie.Title" class="text-danger"></span>
    </div>
```

The Input Tag Helper uses the DataAnnotations attributes and produces HTML attributes needed for jQuery Validation on the client. The Validation Tag Helper displays validation errors. For more information, see Validation.

The Create and Edit pages don't contain validation rules. The validation rules and the error strings are specified only in the `Movie` class. These validation rules automatically apply to Razor Pages that edit the `Movie` model.

When you need to change validation logic, change it only in the model. By defining validation logic in one place, you ensure consistent validation throughout the app. Validation in one place helps keep the code clean and makes it easier to maintain and update.
