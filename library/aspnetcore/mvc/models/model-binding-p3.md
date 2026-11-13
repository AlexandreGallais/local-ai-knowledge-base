---
title: "Model Binding in ASP.NET Core (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/models/model-binding.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Model Binding in ASP.NET Core (part 3 of 4)

## Collections

For targets that are collections of simple types, model binding looks for matches to *parameter_name* or *property_name*. If no match is found, it looks for one of the supported formats without the prefix. For example:

* Suppose the parameter to be bound is an array named `selectedCourses`:

  ```csharp
  public IActionResult OnPost(int? id, int[] selectedCourses)
  ```

* Form or query string data can be in one of the following formats:

  ```
  selectedCourses=1050&selectedCourses=2000
  ```

  ```
  selectedCourses[0]=1050&selectedCourses[1]=2000
  ```

  ```
  [0]=1050&[1]=2000
  ```

  ```
  selectedCourses[a]=1050&selectedCourses[b]=2000&selectedCourses.index=a&selectedCourses.index=b
  ```

  ```
  [a]=1050&[b]=2000&index=a&index=b
  ```

  Avoid binding a parameter or a property named `index` or `Index` if it is adjacent to a collection value. Model binding attempts to use `index` as the index for the collection which might result in incorrect binding. For example, consider the following action:

  ```csharp
  public IActionResult Post(string index, List<Product> products)
  ```
  In the preceding code, the `index` query string parameter binds to the `index` method parameter and also is used to bind the product collection. Renaming the `index` parameter or using a model binding attribute to configure binding avoids this issue:
  ```csharp
  public IActionResult Post(string productIndex, List<Product> products)
  ```

* The following format is supported only in form data:

  ```
  selectedCourses[]=1050&selectedCourses[]=2000
  ```

* For all of the preceding example formats, model binding passes an array of two items to the `selectedCourses` parameter:

  * selectedCourses[0]=1050
  * selectedCourses[1]=2000

  Data formats that use subscript numbers (... [0] ... [1] ...) must ensure that they are numbered sequentially starting at zero. If there are any gaps in subscript numbering, all items after the gap are ignored. For example, if the subscripts are 0 and 2 instead of 0 and 1, the second item is ignored.

## Dictionaries

For `Dictionary` targets, model binding looks for matches to *parameter_name* or *property_name*. If no match is found, it looks for one of the supported formats without the prefix. For example:

* Suppose the target parameter is a `Dictionary<int, string>` named `selectedCourses`:

  ```csharp
  public IActionResult OnPost(int? id, Dictionary<int, string> selectedCourses)
  ```

* The posted form or query string data can look like one of the following examples:

  ```
  selectedCourses[1050]=Chemistry&selectedCourses[2000]=Economics
  ```

  ```
  [1050]=Chemistry&selectedCourses[2000]=Economics
  ```

  ```
  selectedCourses[0].Key=1050&selectedCourses[0].Value=Chemistry&
  selectedCourses[1].Key=2000&selectedCourses[1].Value=Economics
  ```

  ```
  [0].Key=1050&[0].Value=Chemistry&[1].Key=2000&[1].Value=Economics
  ```

* For all of the preceding example formats, model binding passes a dictionary of two items to the `selectedCourses` parameter:

  * selectedCourses["1050"]="Chemistry"
  * selectedCourses["2000"]="Economics"

## Constructor binding and record types

Model binding requires that complex types have a parameterless constructor. Both `System.Text.Json` and `Newtonsoft.Json` based input formatters support deserialization of classes that don't have a parameterless constructor.

Record types are a great way to succinctly represent data over the network. ASP.NET Core supports model binding and validating record types with a single constructor:

```csharp
public record Person(
    [Required] string Name, [Range(0, 150)] int Age, [BindNever] int Id);

public class PersonController
{
    public IActionResult Index() => View();

    [HttpPost]
    public IActionResult Index(Person person)
    {
        // ...
    }
}
```

`Person/Index.cshtml`:

```cshtml
@model Person

<label>Name: <input asp-for="Name" /></label>
<br />
<label>Age: <input asp-for="Age" /></label>
```

When validating record types, the runtime searches for binding and validation metadata specifically on parameters rather than on properties.

The framework allows binding to and validating record types:

```csharp
public record Person([Required] string Name, [Range(0, 100)] int Age);
```

For the preceding to work, the type must:

* Be a record type.
* Have exactly one public constructor.
* Contain parameters that have a property with the same name and type. The names must not differ by case.

### POCOs without parameterless constructors

POCOs that do not have parameterless constructors can't be bound.

The following code results in an exception saying that the type must have a parameterless constructor:

```csharp
public class Person {
    public Person(string Name) { }
}
public record Person([Required] string Name, [Range(0, 100)] int Age)
{
    public Person(string Name) : this (Name, 0)
    {
    }
}
```

### Record types with manually authored constructors

Record types with manually authored constructors that look like primary constructors work

```csharp
public record Person
{
    public Person([Required] string Name, [Range(0, 100)] int Age)
        => (this.Name, this.Age) = (Name, Age);

    public string Name { get; set; }
    public int Age { get; set; }
}
```

### Record types, validation and binding metadata

For record types, validation and binding metadata on parameters is used. Any metadata on properties is ignored

```csharp
public record Person (string Name, int Age)
{
   [BindProperty(Name = "SomeName")] // This does not get used
   [Required] // This does not get used
   public string Name { get; init; }
}
```

### Validation and metadata

Validation uses metadata on the parameter but uses the property to read the value. In the ordinary case with primary constructors, the two would be identical. However, there are ways to defeat it:

```csharp
public record Person([Required] string Name)
{
    private readonly string _name;

    // The following property is never null.
    // However this object could have been constructed as "new Person(null)".
    public string Name { get; init => _name = value ?? string.Empty; }
}
```

### TryUpdateModel does not update parameters on a record type

```csharp
public record Person(string Name)
{
    public int Age { get; set; }
}

var person = new Person("initial-name");
TryUpdateModel(person, ...);
```

In this case, MVC will not attempt to bind `Name` again. However, `Age` is allowed to be updated

## Globalization behavior of model binding route data and query strings

The ASP.NET Core route value provider and query string value provider:

* Treat values as invariant culture.
* Expect that URLs are culture-invariant.

In contrast, values coming from form data undergo a culture-sensitive conversion. This is by design so that URLs are shareable across locales.

To make the ASP.NET Core route value provider and query string value provider undergo a culture-sensitive conversion:

* Inherit from `Microsoft.AspNetCore.Mvc.ModelBinding.IValueProviderFactory`
* Copy the code from QueryStringValueProviderFactory or RouteValueValueProviderFactory
* Replace the culture value passed to the value provider constructor with CultureInfo.CurrentCulture
* Replace the default value provider factory in MVC options with your new one:

```csharp
public class CultureQueryStringValueProviderFactory : IValueProviderFactory
{
    public Task CreateValueProviderAsync(ValueProviderFactoryContext context)
    {
        _ = context ?? throw new ArgumentNullException(nameof(context));

        var query = context.ActionContext.HttpContext.Request.Query;
        if (query?.Count > 0)
        {
            context.ValueProviders.Add(
                new QueryStringValueProvider(
                    BindingSource.Query,
                    query,
                    CultureInfo.CurrentCulture));
        }

        return Task.CompletedTask;
    }
}
```
```csharp
builder.Services.AddControllers(options =>
{
    var index = options.ValueProviderFactories.IndexOf(
        options.ValueProviderFactories.OfType<QueryStringValueProviderFactory>()
            .Single());

    options.ValueProviderFactories[index] =
        new CultureQueryStringValueProviderFactory();
});
```
## Special data types

There are some special data types that model binding can handle.

### IFormFile and IFormFileCollection

An uploaded file included in the HTTP request.  Also supported is `IEnumerable<IFormFile>` for multiple files.

### CancellationToken

Actions can optionally bind a `CancellationToken` as a parameter. This binds `Microsoft.AspNetCore.Http.HttpContext.RequestAborted` that signals when the connection underlying the HTTP request is aborted. Actions can use this parameter to cancel long running async operations that are executed as part of the controller actions.

### FormCollection

Used to retrieve all the values from posted form data.

## Input formatters

Data in the request body can be in JSON, XML, or some other format. To parse this data, model binding uses an *input formatter* that is configured to handle a particular content type. By default, ASP.NET Core includes JSON based input formatters for handling JSON data using `System.Text.Json`. You can add other formatters for other content types.

The default JSON input formatter can be configured using the `AddJsonOptions` method:

```csharp
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Configure property naming policy (camelCase)
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

    // Add enum converter to serialize enums as strings
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

    // Configure other JSON options
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});
```
Common configuration options include:

* **Property naming policy** - Configure camelCase or other naming conventions
* **Enum converters** - Handle enum serialization as strings
* **Custom converters** - Add type-specific serialization logic

ASP.NET Core selects input formatters based on the Consumes attribute. If no attribute is present, it uses the Content-Type header.

To use the built-in XML input formatters:

* In `Program.cs`, call `Microsoft.Extensions.DependencyInjection.MvcXmlMvcCoreBuilderExtensions.AddXmlSerializerFormatters*` or `Microsoft.Extensions.DependencyInjection.MvcXmlMvcCoreBuilderExtensions.AddXmlDataContractSerializerFormatters*`.

```csharp
builder.Services.AddControllers()
    .AddXmlSerializerFormatters();
```
* Apply the `Consumes` attribute to controller classes or action methods that should expect XML in the request body.

  ```csharp
  [HttpPost]
  [Consumes("application/xml")]
  public ActionResult<Pet> Create(Pet pet)
  ```

  For more information, see Introducing XML Serialization.

### Customize model binding with input formatters

An input formatter takes full responsibility for reading data from the request body. To customize this process, configure the APIs used by the input formatter. This section describes how to customize the `System.Text.Json`-based input formatter to understand a custom type named `ObjectId`.

Consider the following model, which contains a custom `ObjectId` property:

```csharp
public class InstructorObjectId
{
    [Required]
    public ObjectId ObjectId { get; set; } = null!;
}
```
To customize the model binding process when using `System.Text.Json`, create a class derived from `System.Text.Json.Serialization.JsonConverter`1`:

```csharp
internal class ObjectIdConverter : JsonConverter<ObjectId>
{
    public override ObjectId Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        => new(JsonSerializer.Deserialize<int>(ref reader, options));

    public override void Write(
        Utf8JsonWriter writer, ObjectId value, JsonSerializerOptions options)
        => writer.WriteNumberValue(value.Id);
}
```
To use a custom converter, apply the `System.Text.Json.Serialization.JsonConverterAttribute` attribute to the type. In the following example, the `ObjectId` type is configured with `ObjectIdConverter` as its custom converter:

```csharp
[JsonConverter(typeof(ObjectIdConverter))]
public record ObjectId(int Id);
```
For more information, see How to write custom converters.

## Exclude specified types from model binding

The model binding and validation systems' behavior is driven by `Microsoft.AspNetCore.Mvc.ModelBinding.ModelMetadata`. You can customize `ModelMetadata` by adding a details provider to MvcOptions.ModelMetadataDetailsProviders. Built-in details providers are available for disabling model binding or validation for specified types.

To disable model binding on all models of a specified type, add an `Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.ExcludeBindingMetadataProvider` in `Program.cs`. For example, to disable model binding on all models of type `System.Version`:

```csharp
builder.Services.AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.ModelMetadataDetailsProviders.Add(
            new ExcludeBindingMetadataProvider(typeof(Version)));
        options.ModelMetadataDetailsProviders.Add(
            new SuppressChildValidationMetadataProvider(typeof(Guid)));
    });
```
To disable validation on properties of a specified type, add a `Microsoft.AspNetCore.Mvc.ModelBinding.SuppressChildValidationMetadataProvider` in `Program.cs`. For example, to disable validation on properties of type `System.Guid`:

```csharp
builder.Services.AddRazorPages()
    .AddMvcOptions(options =>
    {
        options.ModelMetadataDetailsProviders.Add(
            new ExcludeBindingMetadataProvider(typeof(Version)));
        options.ModelMetadataDetailsProviders.Add(
            new SuppressChildValidationMetadataProvider(typeof(Guid)));
    });
```
## Custom model binders

You can extend model binding by writing a custom model binder and using the `[ModelBinder]` attribute to select it for a given target. Learn more about custom model binding.
