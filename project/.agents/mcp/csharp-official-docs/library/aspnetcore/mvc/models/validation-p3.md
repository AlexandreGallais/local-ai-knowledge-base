---
title: "Model validation in ASP.NET Core MVC (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/mvc/models/validation.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Model validation in ASP.NET Core MVC (part 3 of 3)

## Custom client-side validation

Custom client-side validation is done by generating `data-` HTML attributes that work with a custom jQuery Validation adapter. The following sample adapter code was written for the `[ClassicMovie]` and `[ClassicMovieWithClientValidator]` attributes that were introduced earlier in this article:

```javascript
$.validator.addMethod('classicmovie', function (value, element, params) {
    var genre = $(params[0]).val(), year = params[1], date = new Date(value);

    // The Classic genre has a value of '0'.
    if (genre && genre.length > 0 && genre[0] === '0') {
        // The release date for a Classic is valid if it's no greater than the given year.
        return date.getUTCFullYear() <= year;
    }

    return true;
});

$.validator.unobtrusive.adapters.add('classicmovie', ['year'], function (options) {
    var element = $(options.form).find('select#Movie_Genre')[0];

    options.rules['classicmovie'] = [element, parseInt(options.params['year'])];
    options.messages['classicmovie'] = options.message;
});
```
For information about how to write adapters, see the jQuery Validation documentation.

The use of an adapter for a given field is triggered by `data-` attributes that:

* Flag the field as being subject to validation (`data-val="true"`).
* Identify a validation rule name and error message text (for example, `data-val-rulename="Error message."`).
* Provide any additional parameters the validator needs (for example, `data-val-rulename-param1="value"`).

The following example shows the `data-` attributes for the sample app's `ClassicMovie` attribute:

```html
<input class="form-control" type="date"
    data-val="true"
    data-val-classicmovie="Classic movies must have a release year no later than 1960."
    data-val-classicmovie-year="1960"
    data-val-required="The Release Date field is required."
    id="Movie_ReleaseDate" name="Movie.ReleaseDate" value="">
```

As noted earlier, Tag Helpers and HTML helpers use information from validation attributes to render `data-` attributes. There are two options for writing code that results in the creation of custom `data-` HTML attributes:

* Create a class that derives from `Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase`1` and a class that implements `Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider`, and register your attribute and its adapter in DI. This method follows the single responsibility principle in that server-related and client-related validation code is in separate classes. The adapter also has the advantage that since it's registered in DI, other services in DI are available to it if needed.
* Implement `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator` in your `System.ComponentModel.DataAnnotations.ValidationAttribute` class. This method might be appropriate if the attribute doesn't do any server-side validation and doesn't need any services from DI.

### AttributeAdapter for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovie` attribute in the sample app. To add client validation by using this method:

1. Create an attribute adapter class for the custom validation attribute. Derive the class from `Microsoft.AspNetCore.Mvc.DataAnnotations.AttributeAdapterBase`1`. Create an `AddValidation` method that adds `data-` attributes to the rendered output, as shown in this example:

```csharp
public class ClassicMovieAttributeAdapter : AttributeAdapterBase<ClassicMovieAttribute>
{
    public ClassicMovieAttributeAdapter(
        ClassicMovieAttribute attribute, IStringLocalizer? stringLocalizer)
        : base(attribute, stringLocalizer)
    {

    }

    public override void AddValidation(ClientModelValidationContext context)
    {
        MergeAttribute(context.Attributes, "data-val", "true");
        MergeAttribute(context.Attributes, "data-val-classicmovie", GetErrorMessage(context));

        var year = Attribute.Year.ToString(CultureInfo.InvariantCulture);
        MergeAttribute(context.Attributes, "data-val-classicmovie-year", year);
    }

    public override string GetErrorMessage(ModelValidationContextBase validationContext)
        => Attribute.GetErrorMessage();
}
```
1. Create an adapter provider class that implements `Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider`. In the `Microsoft.AspNetCore.Mvc.DataAnnotations.IValidationAttributeAdapterProvider.GetAttributeAdapter*` method pass in the custom attribute to the adapter's constructor, as shown in this example:

```csharp
public class CustomValidationAttributeAdapterProvider : IValidationAttributeAdapterProvider
{
    private readonly IValidationAttributeAdapterProvider baseProvider =
        new ValidationAttributeAdapterProvider();

    public IAttributeAdapter? GetAttributeAdapter(
        ValidationAttribute attribute, IStringLocalizer? stringLocalizer)
    {
        if (attribute is ClassicMovieAttribute classicMovieAttribute)
        {
            return new ClassicMovieAttributeAdapter(classicMovieAttribute, stringLocalizer);
        }

        return baseProvider.GetAttributeAdapter(attribute, stringLocalizer);
    }
}
```
1. Register the adapter provider for DI in `Program.cs`:

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
### IClientModelValidator for client-side validation

This method of rendering `data-` attributes in HTML is used by the `ClassicMovieWithClientValidator` attribute in the sample app. To add client validation by using this method:

* In the custom validation attribute, implement the `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator` interface and create an `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.IClientModelValidator.AddValidation*` method. In the `AddValidation` method, add `data-` attributes for validation, as shown in the following example:

```csharp
public class ClassicMovieWithClientValidatorAttribute :
    ValidationAttribute, IClientModelValidator
{
    public ClassicMovieWithClientValidatorAttribute(int year)
        => Year = year;

    public int Year { get; }

    public void AddValidation(ClientModelValidationContext context)
    {
        MergeAttribute(context.Attributes, "data-val", "true");
        MergeAttribute(context.Attributes, "data-val-classicmovie", GetErrorMessage());

        var year = Year.ToString(CultureInfo.InvariantCulture);
        MergeAttribute(context.Attributes, "data-val-classicmovie-year", year);
    }

    public string GetErrorMessage() =>
        $"Classic movies must have a release year no later than {Year}.";

    protected override ValidationResult? IsValid(
        object? value, ValidationContext validationContext)
    {
        var movie = (Movie)validationContext.ObjectInstance;
        var releaseYear = ((DateTime)value!).Year;

        if (movie.Genre == Genre.Classic && releaseYear > Year)
        {
            return new ValidationResult(GetErrorMessage());
        }

        return ValidationResult.Success;
    }

    private static bool MergeAttribute(IDictionary<string, string> attributes, string key, string value)
    {
        if (attributes.ContainsKey(key))
        {
            return false;
        }

        attributes.Add(key, value);
        return true;
    }
}
```
## Disable client-side validation

The following code disables client validation in Razor Pages:

```csharp
builder.Services.AddRazorPages()
    .AddViewOptions(options =>
    {
        options.HtmlHelperOptions.ClientValidationEnabled = false;
    });
```
Other options to disable client-side validation:

* Comment out the reference to `_ValidationScriptsPartial` in all the `.cshtml` files.
* Remove the contents of the *Pages\Shared\_ValidationScriptsPartial.cshtml* file.

The preceding approach won't prevent client-side validation of ASP.NET Core Identity Razor class library. For more information, see Scaffold Identity in ASP.NET Core projects.

## Problem details

Problem Details are not the only response format to describe an HTTP API error, however, they are commonly used to report errors for HTTP APIs.

The problem details service implements the `Microsoft.AspNetCore.Http.IProblemDetailsService` interface, which supports creating problem details in ASP.NET Core. The `Microsoft.Extensions.DependencyInjection.ProblemDetailsServiceCollectionExtensions.AddProblemDetails(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method on `Microsoft.Extensions.DependencyInjection.IServiceCollection` registers the default `IProblemDetailsService` implementation.

In ASP.NET Core apps, the following middleware generates problem details HTTP responses when `AddProblemDetails` is called, except when the `Accept` request HTTP header doesn't include one of the content types supported by the registered `Microsoft.AspNetCore.Http.IProblemDetailsWriter` (default: `application/json`):

* `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware`: Generates a problem details response when a custom handler is not defined.
* `Microsoft.AspNetCore.Diagnostics.StatusCodePagesMiddleware`: Generates a problem details response by default.
* `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware`: Generates a problem details response in development when the `Accept` request HTTP header doesn't include `text/html`.

## Related content

* `System.ComponentModel.DataAnnotations`
* Model Binding
* ASP.NET Core Blazor forms overview
