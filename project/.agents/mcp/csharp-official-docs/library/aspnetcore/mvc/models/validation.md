---
title: "Model validation in ASP.NET Core MVC (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/models/validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Model validation in ASP.NET Core MVC and Razor Pages

This article explains how to validate user input in an ASP.NET Core MVC or Razor Pages app.

View or download sample code (how to download).

## Model state

Model state represents errors that come from two subsystems: model binding and model validation. Errors that originate from model binding are generally data conversion errors. For example, an "x" is entered in an integer field. Model validation occurs after model binding and reports errors where data doesn't conform to business rules. For example, a 0 is entered in a field that expects a rating between 1 and 5.

Both model binding and model validation occur before the execution of a controller action or a Razor Pages handler method. For web apps, it's the app's responsibility to inspect `ModelState.IsValid` and react appropriately. Web apps typically redisplay the page with an error message, as shown in the following Razor Pages example:

```csharp
public async Task<IActionResult> OnPostAsync()
{
    if (!ModelState.IsValid)
    {
        return Page();
    }

    _context.Movies.Add(Movie);
    await _context.SaveChangesAsync();

    return RedirectToPage("./Index");
}
```
For ASP.NET Core MVC with controllers and views, the following example shows how to check `ModelState.IsValid` inside of a controller action:

```csharp
public async Task<IActionResult> Create(Movie movie)
{
    if (!ModelState.IsValid)
    {
        return View(movie);
    }

    _context.Movies.Add(movie);
    await _context.SaveChangesAsync();

    return RedirectToAction(nameof(Index));
}
```
Web API controllers don't have to check `ModelState.IsValid` if they have the [ApiController] attribute. In that case, an automatic HTTP 400 response containing error details is returned when model state is invalid. For more information, see Automatic HTTP 400 responses.

## Rerun validation

Validation is automatic, but you might want to repeat it manually. For example, you might compute a value for a property and want to rerun validation after setting the property to the computed value. To rerun validation, call `Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary.ClearValidationState*` to clear validation specific to the model being validated followed by `TryValidateModel`:

```csharp
public async Task<IActionResult> OnPostTryValidateAsync()
{
    var modifiedReleaseDate = DateTime.Now.Date;
    Movie.ReleaseDate = modifiedReleaseDate;

    ModelState.ClearValidationState(nameof(Movie));
    if (!TryValidateModel(Movie, nameof(Movie)))
    {
        return Page();
    }

    _context.Movies.Add(Movie);
    await _context.SaveChangesAsync();

    return RedirectToPage("./Index");
}
```
You can also use `Microsoft.AspNetCore.Mvc.ControllerBase.TryValidateModel*` to explicitly validate a child complex object. `TryValidateModel` validates the supplied object and attributes declared on its own properties; it does not evaluate validation attributes declared on the containing parent property (such as attributes on the parent `Movie.Genre` property itself). For example, consider a hypothetical complex `Genre` class (distinct from the sample app's `Genre` enum) with its own validation attributes. In a page model where the `Movie` property is bound under the `"Movie"` prefix, manually validate `Movie.Genre` using the full property prefix:

```csharp
ModelState.ClearValidationState("Movie.Genre");

if (!TryValidateModel(Movie.Genre, "Movie.Genre"))
{
    return Page();
}
```

## Validation attributes

Validation attributes let you specify validation rules for model properties. The following example from the sample app shows a model class that is annotated with validation attributes. The `[ClassicMovie]` attribute is a custom validation attribute and the others are built in. Not shown is `[ClassicMovieWithClientValidator]`, which shows an alternative way to implement a custom attribute.

```csharp
public class Movie
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Title { get; set; } = null!;

    [ClassicMovie(1960)]
    [DataType(DataType.Date)]
    [Display(Name = "Release Date")]
    public DateTime ReleaseDate { get; set; }

    [Required]
    [StringLength(1000)]
    public string Description { get; set; } = null!;

    [Range(0, 999.99)]
    public decimal Price { get; set; }

    public Genre Genre { get; set; }

    public bool Preorder { get; set; }
}
```
## Built-in attributes

For a complete list of validation attributes, see the `System.ComponentModel.DataAnnotations` namespace.

### Error messages

Validation attributes let you specify the error message to be displayed for invalid input. For example:

```csharp
[StringLength(8, ErrorMessage = "Name length can't be more than 8.")]
```

Internally, the attributes call `System.String.Format*` with a placeholder for the field name and sometimes additional placeholders. For example:

```csharp
[StringLength(8, ErrorMessage = "{0} length must be between {2} and {1}.", MinimumLength = 6)]
```

When applied to a `Name` property, the error message created by the preceding code would be "Name length must be between 6 and 8.".

To find out which parameters are passed to `String.Format` for a particular attribute's error message, see the DataAnnotations source code.

### Use JSON property names in validation errors

By default, when a validation error occurs, model validation produces a `Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary` with the property name as the error key. Some apps, such as single page apps, benefit from using JSON property names for validation errors generated from Web APIs. The following code configures validation to use the `SystemTextJsonValidationMetadataProvider` to use JSON property names:

```csharp
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new SystemTextJsonValidationMetadataProvider());
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
The following code configures validation to use the `NewtonsoftJsonValidationMetadataProvider` to use JSON property name when using Json.NET:

```csharp
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ModelMetadataDetailsProviders.Add(new NewtonsoftJsonValidationMetadataProvider());
}).AddNewtonsoftJson();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
```
For an example of the policy to use camel-casing, see `Program.cs` on GitHub.

## Non-nullable reference types and [Required] attribute

The validation system treats non-nullable parameters or bound properties as if they had a `[Required(AllowEmptyStrings = true)]` attribute. By enabling `Nullable` contexts, MVC implicitly starts validating non-nullable properties or parameters as if they had been attributed with the `[Required(AllowEmptyStrings = true)]` attribute. Consider the following code:

```csharp
public class Person
{
    public string Name { get; set; }
}
```

If the app was built with `<Nullable>enable</Nullable>`, a missing value for `Name` in a JSON or form post results in a validation error. This may seem contradictory since the `[Required(AllowEmptyStrings = true)]` attribute is implied, but this is expected behavior because empty strings are converted to null by default. Use a nullable reference type to allow null or missing values to be specified for the `Name` property:

```csharp
public class Person
{
    public string? Name { get; set; }
}
```

This behavior can be disabled by configuring `Microsoft.AspNetCore.Mvc.MvcOptions.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes` in `Program.cs`:

```csharp
builder.Services.AddControllers(
    options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);
```

### [Required] validation on the server

On the server, a required value is considered missing if the property is null. A non-nullable field is always valid, and the `[Required]` attribute's error message is never displayed.

However, model binding for a non-nullable property may fail, resulting in an error message such as `The value '' is invalid`. To specify a custom error message for server-side validation of non-nullable types, you have the following options:

* Make the field nullable (for example, `decimal?` instead of `decimal`). Nullable\<T> value types are treated like standard nullable types.
* Specify the default error message to be used by model binding, as shown in the following example:

```csharp
builder.Services.AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.MaxModelValidationErrors = 50;
        options.ModelBindingMessageProvider.SetValueMustNotBeNullAccessor(
            _ => "The field is required.");
    });

builder.Services.AddSingleton
    <IValidationAttributeAdapterProvider, CustomValidationAttributeAdapterProvider>();
```
  For more information about model binding errors that you can set default messages for, see `Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.DefaultModelBindingMessageProvider#methods`.

### [Required] validation on the client

Non-nullable types and strings are handled differently on the client compared to the server. On the client:

* A value is considered present only if input is entered for it. Therefore, client-side validation handles non-nullable types the same as nullable types.
* Whitespace in a string field is considered valid input by the jQuery Validation required method. Server-side validation considers a required string field invalid if only whitespace is entered.

As noted earlier, non-nullable types are treated as though they had a `[Required(AllowEmptyStrings = true)]` attribute. That means you get client-side validation even if you don't apply the `[Required(AllowEmptyStrings = true)]` attribute. But if you don't use the attribute, you get a default error message. To specify a custom error message, use the attribute.

## [Remote] attribute

The [Remote] attribute implements client-side validation that requires calling a method on the server to determine whether field input is valid. For example, the app may need to verify whether a user name is already in use.

To implement remote validation:

1. Create an action method for JavaScript to call.  The jQuery Validation remote method expects a JSON response:

   * `true` means the input data is valid.
   * `false`, `undefined`, or `null` means the input is invalid. Display the default error message.
   * Any other string means the input is invalid. Display the string as a custom error message.

   Here's an example of an action method that returns a custom error message:

```csharp
[AcceptVerbs("GET", "POST")]
public IActionResult VerifyEmail(string email)
{
    if (!_userService.VerifyEmail(email))
    {
        return Json($"Email {email} is already in use.");
    }

    return Json(true);
}
```
1. In the model class, annotate the property with a `[Remote]` attribute that points to the validation action method, as shown in the following example:

```csharp
[Remote(action: "VerifyEmail", controller: "Users")]
public string Email { get; set; } = null!;
```
Remote validation:

* Doesn't perform server-side validation after the form is submitted.
* Doesn't perform client-side checks if the client has disabled JavaScript. If the client-side validation check is required for form processing on the server, always implement separate server-side validation.

### Additional fields

The `Microsoft.AspNetCore.Mvc.RemoteAttribute.AdditionalFields` property of the `[Remote]` attribute lets you validate combinations of fields against data on the server. For example, if the `User` model had `FirstName` and `LastName` properties, you might want to verify that no existing users already have that pair of names. The following example shows how to use `AdditionalFields`:

```csharp
[Remote(action: "VerifyName", controller: "Users", AdditionalFields = nameof(LastName))]
[Display(Name = "First Name")]
public string FirstName { get; set; } = null!;

[Remote(action: "VerifyName", controller: "Users", AdditionalFields = nameof(FirstName))]
[Display(Name = "Last Name")]
public string LastName { get; set; } = null!;
```
`AdditionalFields` could be set explicitly to the strings "FirstName" and "LastName", but using the nameof operator simplifies later refactoring. The action method for this validation must accept both `firstName` and `lastName` arguments:

```csharp
[AcceptVerbs("GET", "POST")]
public IActionResult VerifyName(string firstName, string lastName)
{
    if (!_userService.VerifyName(firstName, lastName))
    {
        return Json($"A user named {firstName} {lastName} already exists.");
    }

    return Json(true);
}
```
When the user enters a first or last name, JavaScript makes a remote call to see if that pair of names has been taken.

To validate two or more additional fields, provide them as a comma-delimited list. For example, to add a `MiddleName` property to the model, set the `[Remote]` attribute as shown in the following example:

```csharp
[Remote(action: "VerifyName", controller: "Users",
    AdditionalFields = nameof(FirstName) + "," + nameof(LastName))]
public string MiddleName { get; set; }
```

`AdditionalFields`, like all attribute arguments, must be a constant expression. Therefore, don't use an interpolated string or call `System.String.Join*` to initialize `AdditionalFields`.

## Alternatives to built-in attributes

If you need validation not provided by built-in attributes, you can:

* Create custom attributes.
* Implement IValidatableObject.
