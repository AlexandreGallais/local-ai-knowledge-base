---
title: "Custom formatters in ASP.NET Core Web API"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/web-api/advanced/custom-formatters.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Custom formatters in ASP.NET Core Web API

ASP.NET Core MVC supports data exchange in Web APIs using input and output formatters. Input formatters are used by Model Binding. Output formatters are used to format responses.

The framework provides built-in input and output formatters for JSON and XML. It provides a built-in output formatter for plain text, but doesn't provide an input formatter for plain text.

This article shows how to add support for additional formats by creating custom formatters. For an example of a custom plain text input formatter, see TextPlainInputFormatter on GitHub.

View or download sample code (how to download)

## When to use a custom formatter

Use a custom formatter to add support for a content type that isn't handled by the built-in formatters.

## Overview of how to create a custom formatter

To create a custom formatter:

* For serializing data sent to the client, create an output formatter class.
* For deserializing data received from the client, create an input formatter class.
* Add instances of formatter classes to the `Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters` and `Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters` collections in `Microsoft.AspNetCore.Mvc.MvcOptions`.

## Create a custom formatter

To create a formatter:

* Derive the class from the appropriate base class. The sample app derives from `Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter` and `Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter`.
* Specify supported media types and encodings in the constructor.
* Override the `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType*` and `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType*` methods.
* Override the `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync*` and `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync*` methods.

The following code shows the `VcardOutputFormatter` class from the sample:

```csharp
public class VcardOutputFormatter : TextOutputFormatter
{
    public VcardOutputFormatter()
    {
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/vcard"));

        SupportedEncodings.Add(Encoding.UTF8);
        SupportedEncodings.Add(Encoding.Unicode);
    }

    protected override bool CanWriteType(Type? type)
        => typeof(Contact).IsAssignableFrom(type)
            || typeof(IEnumerable<Contact>).IsAssignableFrom(type);

    public override async Task WriteResponseBodyAsync(
        OutputFormatterWriteContext context, Encoding selectedEncoding)
    {
        var httpContext = context.HttpContext;
        var serviceProvider = httpContext.RequestServices;

        var logger = serviceProvider.GetRequiredService<ILogger<VcardOutputFormatter>>();
        var buffer = new StringBuilder();

        if (context.Object is IEnumerable<Contact> contacts)
        {
            foreach (var contact in contacts)
            {
                FormatVcard(buffer, contact, logger);
            }
        }
        else
        {
            FormatVcard(buffer, (Contact)context.Object!, logger);
        }

        await httpContext.Response.WriteAsync(buffer.ToString(), selectedEncoding);
    }

    private static void FormatVcard(
        StringBuilder buffer, Contact contact, ILogger logger)
    {
        buffer.AppendLine("BEGIN:VCARD");
        buffer.AppendLine("VERSION:2.1");
        buffer.AppendLine($"N:{contact.LastName};{contact.FirstName}");
        buffer.AppendLine($"FN:{contact.FirstName} {contact.LastName}");
        buffer.AppendLine($"UID:{contact.Id}");
        buffer.AppendLine("END:VCARD");

        logger.LogInformation("Writing {FirstName} {LastName}",
            contact.FirstName, contact.LastName);
    }
}
```
### Derive from the appropriate base class

For text media types (for example, vCard), derive from the `Microsoft.AspNetCore.Mvc.Formatters.TextInputFormatter` or `Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter` base class:

```csharp
public class VcardOutputFormatter : TextOutputFormatter
```
For binary types, derive from the `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter` or `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter` base class.

### Specify supported media types and encodings

In the constructor, specify supported media types and encodings by adding to the `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.SupportedMediaTypes` and `Microsoft.AspNetCore.Mvc.Formatters.TextOutputFormatter.SupportedEncodings` collections:

```csharp
public VcardOutputFormatter()
{
    SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/vcard"));

    SupportedEncodings.Add(Encoding.UTF8);
    SupportedEncodings.Add(Encoding.Unicode);
}
```
A formatter class can **not** use constructor injection for its dependencies. For example, `ILogger<VcardOutputFormatter>` can't be added as a parameter to the constructor. To access services, use the context object that gets passed in to the methods. A code example in this article and the sample show how to do this.

### Override CanReadType and CanWriteType

Specify the type to deserialize into or serialize from by overriding the `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.CanReadType*` or `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType*` methods. For example, to create vCard text from a `Contact` type and vice versa:

```csharp
protected override bool CanWriteType(Type? type)
    => typeof(Contact).IsAssignableFrom(type)
        || typeof(IEnumerable<Contact>).IsAssignableFrom(type);
```
#### The CanWriteResult method

In some scenarios, `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteResult*` must be overridden rather than `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.CanWriteType*`. Use `CanWriteResult` if the following conditions are true:

* The action method returns a model class.
* There are derived classes that might be returned at runtime.
* The derived class returned by the action must be known at runtime.

For example, suppose the action method:

* Signature returns a `Person` type.
* Can return a `Student` or `Instructor` type that derives from `Person`.

For the formatter to handle only `Student` objects, check the type of `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatterCanWriteContext.Object` in the context object provided to the `CanWriteResult` method. When the action method returns `Microsoft.AspNetCore.Mvc.IActionResult`:

* It's not necessary to use `CanWriteResult`.
* The `CanWriteType` method receives the runtime type.

### Override ReadRequestBodyAsync and WriteResponseBodyAsync

Deserialization or serialization is performed in `Microsoft.AspNetCore.Mvc.Formatters.InputFormatter.ReadRequestBodyAsync*` or `Microsoft.AspNetCore.Mvc.Formatters.OutputFormatter.WriteResponseBodyAsync*`. The following example shows how to get services from the dependency injection container. Services can't be obtained from constructor parameters:

```csharp
public override async Task WriteResponseBodyAsync(
    OutputFormatterWriteContext context, Encoding selectedEncoding)
{
    var httpContext = context.HttpContext;
    var serviceProvider = httpContext.RequestServices;

    var logger = serviceProvider.GetRequiredService<ILogger<VcardOutputFormatter>>();
    var buffer = new StringBuilder();

    if (context.Object is IEnumerable<Contact> contacts)
    {
        foreach (var contact in contacts)
        {
            FormatVcard(buffer, contact, logger);
        }
    }
    else
    {
        FormatVcard(buffer, (Contact)context.Object!, logger);
    }

    await httpContext.Response.WriteAsync(buffer.ToString(), selectedEncoding);
}

private static void FormatVcard(
    StringBuilder buffer, Contact contact, ILogger logger)
{
    buffer.AppendLine("BEGIN:VCARD");
    buffer.AppendLine("VERSION:2.1");
    buffer.AppendLine($"N:{contact.LastName};{contact.FirstName}");
    buffer.AppendLine($"FN:{contact.FirstName} {contact.LastName}");
    buffer.AppendLine($"UID:{contact.Id}");
    buffer.AppendLine("END:VCARD");

    logger.LogInformation("Writing {FirstName} {LastName}",
        contact.FirstName, contact.LastName);
}
```
## Configure MVC to use a custom formatter

To use a custom formatter, add an instance of the formatter class to the `Microsoft.AspNetCore.Mvc.MvcOptions.InputFormatters` or `Microsoft.AspNetCore.Mvc.MvcOptions.OutputFormatters` collection:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.InputFormatters.Insert(0, new VcardInputFormatter());
    options.OutputFormatters.Insert(0, new VcardOutputFormatter());
});
```
Formatters are evaluated in the order they're inserted, where the first one takes precedence.

## The complete `VcardInputFormatter` class

The following code shows the `VcardInputFormatter` class from the sample:

```csharp
public class VcardInputFormatter : TextInputFormatter
{
    public VcardInputFormatter()
    {
        SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/vcard"));

        SupportedEncodings.Add(Encoding.UTF8);
        SupportedEncodings.Add(Encoding.Unicode);
    }

    protected override bool CanReadType(Type type)
        => type == typeof(Contact);

    public override async Task<InputFormatterResult> ReadRequestBodyAsync(
        InputFormatterContext context, Encoding effectiveEncoding)
    {
        var httpContext = context.HttpContext;
        var serviceProvider = httpContext.RequestServices;

        var logger = serviceProvider.GetRequiredService<ILogger<VcardInputFormatter>>();

        using var reader = new StreamReader(httpContext.Request.Body, effectiveEncoding);
        string? nameLine = null;

        try
        {
            await ReadLineAsync("BEGIN:VCARD", reader, context, logger);
            await ReadLineAsync("VERSION:", reader, context, logger);

            nameLine = await ReadLineAsync("N:", reader, context, logger);

            var split = nameLine.Split(";".ToCharArray());
            var contact = new Contact(FirstName: split[1], LastName: split[0].Substring(2));

            await ReadLineAsync("FN:", reader, context, logger);
            await ReadLineAsync("END:VCARD", reader, context, logger);

            logger.LogInformation("nameLine = {nameLine}", nameLine);

            return await InputFormatterResult.SuccessAsync(contact);
        }
        catch
        {
            logger.LogError("Read failed: nameLine = {nameLine}", nameLine);
            return await InputFormatterResult.FailureAsync();
        }
    }

    private static async Task<string> ReadLineAsync(
        string expectedText, StreamReader reader, InputFormatterContext context,
        ILogger logger)
    {
        var line = await reader.ReadLineAsync();

        if (line is null || !line.StartsWith(expectedText))
        {
            var errorMessage = $"Looked for '{expectedText}' and got '{line}'";

            context.ModelState.TryAddModelError(context.ModelName, errorMessage);
            logger.LogError(errorMessage);

            throw new Exception(errorMessage);
        }

        return line;
    }
}
```
## Test the app

Run the sample app for this article, which implements basic vCard input and output formatters. The app reads and writes vCards similar to the following format:

```
BEGIN:VCARD
VERSION:2.1
N:Davolio;Nancy
FN:Nancy Davolio
END:VCARD
```

To see vCard output, run the app and send a Get request with Accept header `text/vcard` to `https://localhost:<port>/api/contacts`.

To add a vCard to the in-memory collection of contacts:

* Send a `Post` request to `/api/contacts` with a tool like http-repl.
* Set the `Content-Type` header to `text/vcard`.
* Set `vCard` text in the body, formatted like the preceding example.

## Additional resources

* Format response data in ASP.NET Core Web API
* Manage Protobuf references with dotnet-grpc
