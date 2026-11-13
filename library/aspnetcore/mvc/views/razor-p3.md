---
title: "Razor syntax reference for ASP.NET Core (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/mvc/views/razor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Razor syntax reference for ASP.NET Core (part 3 of 3)

## Templated Razor delegates

*This scenario only applies to MVC views and Razor Pages (`.cshtml`).*

Razor templates allow you to define a UI snippet with the following format:

```razor
@<tag>...</tag>
```

The following example illustrates how to specify a templated Razor delegate as a `System.Func`2`. The dynamic type is specified for the parameter of the method that the delegate encapsulates. An object type is specified as the return value of the delegate. The template is used with a `System.Collections.Generic.List`1` of `Pet` that has a `Name` property.

```csharp
public class Pet
{
    public string Name { get; set; }
}
```

```razor
@{
    Func<dynamic, object> petTemplate = @<p>You have a pet named <strong>@item.Name</strong>.</p>;

    var pets = new List<Pet>
    {
        new Pet { Name = "Rin Tin Tin" },
        new Pet { Name = "Mr. Bigglesworth" },
        new Pet { Name = "K-9" }
    };
}
```

The template is rendered with `pets` supplied by a `foreach` statement:

```razor
@foreach (var pet in pets)
{
    @petTemplate(pet)
}
```

Rendered output:

```html
<p>You have a pet named <strong>Rin Tin Tin</strong>.</p>
<p>You have a pet named <strong>Mr. Bigglesworth</strong>.</p>
<p>You have a pet named <strong>K-9</strong>.</p>
```

You can also supply an inline Razor template as an argument to a method. In the following example, the `Repeat` method receives a Razor template. The method uses the template to produce HTML content with repeats of items supplied from a list:

```razor
@using Microsoft.AspNetCore.Html

@functions {
    public static IHtmlContent Repeat(IEnumerable<dynamic> items, int times,
        Func<dynamic, IHtmlContent> template)
    {
        var html = new HtmlContentBuilder();

        foreach (var item in items)
        {
            for (var i = 0; i < times; i++)
            {
                html.AppendHtml(template(item));
            }
        }

        return html;
    }
}
```

Using the list of pets from the prior example, the `Repeat` method is called with:

* `System.Collections.Generic.List`1` of `Pet`.
* Number of times to repeat each pet.
* Inline template to use for the list items of an unordered list.

```razor
<ul>
    @Repeat(pets, 3, @<li>@item.Name</li>)
</ul>
```

Rendered output:

```html
<ul>
    <li>Rin Tin Tin</li>
    <li>Rin Tin Tin</li>
    <li>Rin Tin Tin</li>
    <li>Mr. Bigglesworth</li>
    <li>Mr. Bigglesworth</li>
    <li>Mr. Bigglesworth</li>
    <li>K-9</li>
    <li>K-9</li>
    <li>K-9</li>
</ul>
```

## Tag Helpers

*This scenario only applies to MVC views and Razor Pages (`.cshtml`).*

There are three directives that pertain to Tag Helpers.

| Directive | Function |
| --------- | -------- |
| `@addTagHelper` | Makes Tag Helpers available to a view. |
| `@removeTagHelper` | Removes Tag Helpers previously added from a view. |
| `@tagHelperPrefix` | Specifies a tag prefix to enable Tag Helper support and to make Tag Helper usage explicit. |

## Razor reserved keywords

### Razor keywords

* `page`
* `namespace`
* `functions`
* `inherits`
* `model`
* `section`
* `helper` (Not currently supported by ASP.NET Core)

Razor keywords are escaped with `@(Razor Keyword)` (for example, `@(functions)`).

### C# Razor keywords

* `case`
* `do`
* `default`
* `for`
* `foreach`
* `if`
* `else`
* `lock`
* `switch`
* `try`
* `catch`
* `finally`
* `using`
* `while`

C# Razor keywords must be double-escaped with `@(@C# Razor Keyword)` (for example, `@(@case)`). The first `@` escapes the Razor parser. The second `@` escapes the C# parser.

### Reserved keywords not used by Razor

* `class`

## Inspect the Razor C# class generated for a view

The Razor SDK handles compilation of Razor files. By default, the generated code files aren't emitted. To enable emitting the code files, set the `EmitCompilerGeneratedFiles` directive in the project file (`.csproj`) to `true`:

```xml
<PropertyGroup>
  <EmitCompilerGeneratedFiles>true</EmitCompilerGeneratedFiles>
</PropertyGroup>
```

When building a 6.0 project (`net6.0`) in the `Debug` build configuration, the Razor SDK generates an `obj/Debug/net6.0/generated/` directory in the project root. Its subdirectory contains the emitted Razor page code files.

## View lookups and case sensitivity

The Razor view engine performs case-sensitive lookups for views. However, the underlying file system determines the actual lookup:

* File based source:
  * On operating systems with case insensitive file systems (for example, Windows), physical file provider lookups are case insensitive. For example, `return View("Test")` results in matches for `/Views/Home/Test.cshtml`, `/Views/home/test.cshtml`, and any other casing variant.
  * On case-sensitive file systems (for example, Linux, OSX, and with `EmbeddedFileProvider`), lookups are case-sensitive. For example, `return View("Test")` specifically matches `/Views/Home/Test.cshtml`.
* Precompiled views: With ASP.NET Core 2.0 or later, looking up precompiled views is case insensitive on all operating systems. The behavior is identical to physical file provider's behavior on Windows. If two precompiled views differ only in case, the result of lookup is non-deterministic.

Developers are encouraged to match the casing of file and directory names to the casing of:

* Area, controller, and action names.
* Razor Pages.

Matching case ensures the deployments find their views regardless of the underlying file system.

## Imports used by Razor

The following imports are generated by the ASP.NET Core web templates to support Razor Files:

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
```

## Related content

Introduction to ASP.NET Web Programming Using the Razor Syntax provides many samples of programming with Razor syntax.
