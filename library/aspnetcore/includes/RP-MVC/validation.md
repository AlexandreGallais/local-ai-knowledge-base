---
title: "validation"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/includes/RP-MVC/validation.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# validation

## Add validation rules to the movie model

The DataAnnotations namespace provides a set of built-in validation attributes that are applied declaratively to a class or property. DataAnnotations also contains formatting attributes like `DataType` that help with formatting and don't provide any validation.

Update the `Movie` class to take advantage of the built-in `Required`, `StringLength`, `RegularExpression`, and `Range` validation attributes.

```csharp
public class Movie
{
    public int Id { get; set; }

    [StringLength(60, MinimumLength = 3)]
    [Required]
    public string Title { get; set; }

    [Display(Name = "Release Date")]
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }

    [Range(1, 100)]
    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal Price { get; set; }
```

The validation attributes specify behavior that you want to enforce on the model properties they're applied to:

* The `Required` and `MinimumLength` attributes indicate that a property must have a value; but nothing prevents a user from entering white space to satisfy this validation.
* The `RegularExpression` attribute is used to limit what characters can be input. In the preceding code, "Genre":

  * Must only use letters.
  * The first letter must be uppercase. White spaces are allowed, while numbers and special characters aren't allowed.

* The `RegularExpression` "Rating":

  * Requires that the first character be an uppercase letter.
  * Allows special characters and numbers in subsequent spaces. "PG-13" is valid for a rating, but fails for a "Genre".

* The `Range` attribute constrains a value to within a specified range.
* The `StringLength` attribute lets you set the maximum length of a string property, and optionally its minimum length.
* Value types (such as `decimal`, `int`, `float`, `DateTime`) are inherently required and don't need the `[Required]` attribute.

Having validation rules automatically enforced by ASP.NET Core helps make your app more robust. It also ensures that you can't forget to validate something and inadvertently let bad data into the database.
