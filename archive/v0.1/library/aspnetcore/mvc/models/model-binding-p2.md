---
title: "Model Binding in ASP.NET Core (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/models/model-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Model Binding in ASP.NET Core (part 2 of 4)

## Bind with `IParsable<T>.TryParse`

The `IParsable<TSelf>.TryParse` API supports binding controller action parameter values:

```csharp
public static bool TryParse (string? s, IFormatProvider? provider, out TSelf result);
```

The following `DateRange` class implements `IParsable<TSelf>` to support binding a date range:

```csharp
public class DateRange : IParsable<DateRange>
{
    public DateOnly? From { get; init; }
    public DateOnly? To { get; init; }

    public static DateRange Parse(string value, IFormatProvider? provider)
    {
        if (!TryParse(value, provider, out var result))
        {
           throw new ArgumentException("Could not parse supplied value.", nameof(value));
        }

        return result;
    }

    public static bool TryParse(string? value,
                                IFormatProvider? provider, out DateRange dateRange)
    {
        var segments = value?.Split(',', StringSplitOptions.RemoveEmptyEntries 
                                       | StringSplitOptions.TrimEntries);

        if (segments?.Length == 2
            && DateOnly.TryParse(segments[0], provider, out var fromDate)
            && DateOnly.TryParse(segments[1], provider, out var toDate))
        {
            dateRange = new DateRange { From = fromDate, To = toDate };
            return true;
        }

        dateRange = new DateRange { From = default, To = default };
        return false;
    }
}
```
The preceding code:

* Converts a string representing two dates to a `DateRange` object
* The model binder uses the `IParsable<TSelf>.TryParse` method to bind the `DateRange`.

The following controller action uses the `DateRange` class to bind a date range:

```csharp
// GET /WeatherForecast/ByRange?range=7/24/2022,07/26/2022
public IActionResult ByRange([FromQuery] DateRange range)
{
    if (!ModelState.IsValid)
        return View("Error", ModelState.Values.SelectMany(v => v.Errors));

    var weatherForecasts = Enumerable
        .Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .Where(wf => DateOnly.FromDateTime(wf.Date) >= range.From
                     && DateOnly.FromDateTime(wf.Date) <= range.To)
        .Select(wf => new WeatherForecastViewModel
        {
            Date = wf.Date.ToString("d"),
            TemperatureC = wf.TemperatureC,
            TemperatureF = 32 + (int)(wf.TemperatureC / 0.5556),
            Summary = wf.Summary
        });

    return View("Index", weatherForecasts);
}
```
The following `Locale` class implements `IParsable<TSelf>` to support binding to `CultureInfo`:

```csharp
public class Locale : CultureInfo, IParsable<Locale>
{
    public Locale(string culture) : base(culture)
    {
    }

    public static Locale Parse(string value, IFormatProvider? provider)
    {
        if (!TryParse(value, provider, out var result))
        {
           throw new ArgumentException("Could not parse supplied value.", nameof(value));
        }

        return result;
    }

    public static bool TryParse([NotNullWhen(true)] string? value,
                                IFormatProvider? provider, out Locale locale)
    {
        if (value is null)
        {
            locale = new Locale(CurrentCulture.Name);
            return false;
        }
        
        try
        {
            locale = new Locale(value);
            return true;
        }
        catch (CultureNotFoundException)
        {
            locale = new Locale(CurrentCulture.Name);
            return false;
        }
    }
}
```
The following controller action uses the `Locale` class to bind a `CultureInfo` string:

```csharp
// GET /en-GB/WeatherForecast
public IActionResult Index([FromRoute] Locale locale)
{
    var weatherForecasts = Enumerable
        .Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .Select(wf => new WeatherForecastViewModel
        {
            Date = wf.Date.ToString("d", locale),
            TemperatureC = wf.TemperatureC,
            TemperatureF = 32 + (int)(wf.TemperatureC / 0.5556),
            Summary = wf.Summary
        });

    return View(weatherForecasts);
}
```
The following controller action uses the `DateRange` and `Locale` classes to bind a date range with `CultureInfo`:

```csharp
// GET /af-ZA/WeatherForecast/RangeByLocale?range=2022-07-24,2022-07-29
public IActionResult RangeByLocale([FromRoute] Locale locale, [FromQuery] string range)
{
    if (!ModelState.IsValid)
        return View("Error", ModelState.Values.SelectMany(v => v.Errors));

    if (!DateRange.TryParse(range, locale, out DateRange rangeResult))
    {
        ModelState.TryAddModelError(nameof(range),
            $"Invalid date range: {range} for locale {locale.DisplayName}");

        return View("Error", ModelState.Values.SelectMany(v => v.Errors));
    }

    var weatherForecasts = Enumerable
        .Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .Where(wf => DateOnly.FromDateTime(wf.Date) >= rangeResult.From
                     && DateOnly.FromDateTime(wf.Date) <= rangeResult.To)
        .Select(wf => new WeatherForecastViewModel
        {
            Date = wf.Date.ToString("d", locale),
            TemperatureC = wf.TemperatureC,
            TemperatureF = 32 + (int) (wf.TemperatureC / 0.5556),
            Summary = wf.Summary
        });

    return View("Index", weatherForecasts);
}
```
The API sample app on GitHub shows the preceding sample for an API controller.

### Bind with `TryParse`

The `TryParse` API supports binding controller action parameter values:

```csharp
public static bool TryParse(string value, T out result);
public static bool TryParse(string value, IFormatProvider provider, T out result);
```

`IParsable<T>.TryParse` is the recommended approach for parameter binding because unlike `TryParse`, it doesn't depend on reflection.

The following `DateRangeTP` class implements `TryParse`:

```csharp
public class DateRangeTP
{
    public DateOnly? From { get; }
    public DateOnly? To { get; }

    public DateRangeTP(string from, string to)
    {
        if (string.IsNullOrEmpty(from))
            throw new ArgumentNullException(nameof(from));
        if (string.IsNullOrEmpty(to))
            throw new ArgumentNullException(nameof(to));

        From = DateOnly.Parse(from);
        To = DateOnly.Parse(to);
    }

    public static bool TryParse(string? value, out DateRangeTP? result)
    {
        var range = value?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (range?.Length != 2)
        {
            result = default;
            return false;
        }

        result = new DateRangeTP(range[0], range[1]);
        return true;
    }
}
```
The following controller action uses the `DateRangeTP` class to bind a date range:

```csharp
// GET /WeatherForecast/ByRangeTP?range=7/24/2022,07/26/2022
public IActionResult ByRangeTP([FromQuery] DateRangeTP range)
{
    if (!ModelState.IsValid)
        return View("Error", ModelState.Values.SelectMany(v => v.Errors));

    var weatherForecasts = Enumerable
        .Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .Where(wf => DateOnly.FromDateTime(wf.Date) >= range.From
                     && DateOnly.FromDateTime(wf.Date) <= range.To)
        .Select(wf => new WeatherForecastViewModel
        {
            Date = wf.Date.ToString("d"),
            TemperatureC = wf.TemperatureC,
            TemperatureF = 32 + (int)(wf.TemperatureC / 0.5556),
            Summary = wf.Summary
        });

    return View("Index", weatherForecasts);
}
```
## Complex types

A complex type must have a public default constructor and public writable properties to bind. When model binding occurs, the class is instantiated using the public default constructor.

Structs and other value types, including `record struct` types, aren't supported as complex type binding targets. Reflection doesn't report an implicit parameterless constructor for a struct, so model binding can't create the model instance. Value types also have copy-by-value semantics, which prevents the binder from setting properties on an instance after it's created. Binding a struct as a complex type throws an `System.InvalidOperationException`. Use a class or a `record` class instead. A struct can still be bound as a simple type if it has a type converter or implements `IParsable<TSelf>`, which is how types such as `System.Guid` and `System.DateTime` are bound.

For each property of the complex type, model binding looks through the sources for the name pattern *prefix.property_name*. If nothing is found, it looks for just *property_name* without the prefix. The decision to use the prefix isn't made per property. For example, with a query containing `?Instructor.Id=100&Name=foo`, bound to method `OnGet(Instructor instructor)`, the resulting object of type `Instructor` contains:

* `Id` set to `100`.
* `Name` set to `null`. Model binding expects `Instructor.Name` because `Instructor.Id` was used in the preceding query parameter.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

For binding to a parameter, the prefix is the parameter name. For binding to a `PageModel` `public` property, the prefix is the property name. Some attributes have a `Prefix` property that lets you override the default usage of parameter or property name.

For example, suppose the complex type is the following `Instructor` class:

```csharp
public class Instructor
{
    public int ID { get; set; }
    public string LastName { get; set; }
    public string FirstName { get; set; }
}
```

### Prefix = parameter name

If the model to be bound is a parameter named `instructorToUpdate`:

```csharp
public IActionResult OnPost(int? id, Instructor instructorToUpdate)
```

Model binding starts by looking through the sources for the key `instructorToUpdate.ID`. If that isn't found, it looks for `ID` without a prefix.

### Prefix = property name

If the model to be bound is a property named `Instructor` of the controller or `PageModel` class:

```csharp
[BindProperty]
public Instructor Instructor { get; set; }
```

Model binding starts by looking through the sources for the key `Instructor.ID`. If that isn't found, it looks for `ID` without a prefix.

### Custom prefix

If the model to be bound is a parameter named `instructorToUpdate` and a `Bind` attribute specifies `Instructor` as the prefix:

```csharp
public IActionResult OnPost(
    int? id, [Bind(Prefix = "Instructor")] Instructor instructorToUpdate)
```

Model binding starts by looking through the sources for the key `Instructor.ID`. If that isn't found, it looks for `ID` without a prefix.

### Attributes for complex type targets

Several built-in attributes are available for controlling model binding of complex types:

* `[Bind]`
* `[BindRequired]`
* `[BindNever]`

> **Warning:**
> These attributes affect model binding when posted form data is the source of values. They do ***not*** affect input formatters, which process posted JSON and XML request bodies. Input formatters are explained later in this article.

### [Bind] attribute

Can be applied to a class or a method parameter. Specifies which properties of a model should be included in model binding. `[Bind]` does ***not*** affect input formatters.

In the following example, only the specified properties of the `Instructor` model are bound when any handler or action method is called:

```csharp
[Bind("LastName,FirstMidName,HireDate")]
public class Instructor
```

In the following example, only the specified properties of the `Instructor` model are bound when the `OnPost` method is called:

```csharp
[HttpPost]
public IActionResult OnPost(
    [Bind("LastName,FirstMidName,HireDate")] Instructor instructor)
```

The `[Bind]` attribute can be used to protect against overposting in *create* scenarios. It doesn't work well in edit scenarios because excluded properties are set to null or a default value instead of being left unchanged. For protection against overposting, view models are recommended rather than the `[Bind]` attribute. For more information, see Protect against overposting.

### [ModelBinder] attribute

`Microsoft.AspNetCore.Mvc.ModelBinderAttribute` can be applied to types, properties, or parameters. It allows specifying the type of model binder used to bind the specific instance or type. For example:

```csharp
[HttpPost]
public IActionResult OnPost(
    [ModelBinder<MyInstructorModelBinder>] Instructor instructor)
```

The `[ModelBinder]` attribute can also be used to change the name of a property or parameter when it's being model bound:

```csharp
public class Instructor
{
    [ModelBinder(Name = "instructor_id")]
    public string Id { get; set; }

    // ...
}
```

### [BindRequired] attribute

Causes model binding to add a model state error if binding cannot occur for a model's property. Here's an example:

```csharp
public class InstructorBindRequired
{
    // ...

    [BindRequired]
    public DateTime HireDate { get; set; }
}
```
See also the discussion of the `[Required]` attribute in Model validation.

### [BindNever] attribute

Can be applied to a property or a type. Prevents model binding from setting a model's property. When applied to a type, the model binding system excludes all properties the type defines. Here's an example:

```csharp
public class InstructorBindNever
{
    [BindNever]
    public int Id { get; set; }

    // ...
}
```
