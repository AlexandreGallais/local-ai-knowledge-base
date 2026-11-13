---
title: "Routing in ASP.NET Core (part 4 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 4 of 10)

## Route templates

Tokens within `{}` define route parameters that are bound if the route is matched. More than one route parameter can be defined in a route segment, but route parameters must be separated by a literal value. For example:

   `{controller=Home}{action=Index}`

isn't a valid route, because there's no literal value between `{controller}` and `{action}`. Route parameters must have a name and may have additional attributes specified.

Literal text other than route parameters (for example, `{id}`) and the path separator `/` must match the text in the URL. Text matching is case-insensitive and based on the decoded representation of the URL's path. To match a literal route parameter delimiter `{` or `}`, escape the delimiter by repeating the character. For example `{{` or `}}`.

Asterisk `*` or double asterisk `**`:

* Can be used as a prefix to a route parameter to bind to the rest of the URI.
* Are called a **catch-all** parameters. For example, `blog/{**slug}`:
  * Matches any URI that starts with `blog/` and has any value following it.
  * The value following `blog/` is assigned to the slug route value.

Catch-all parameters can also match the empty string.

The catch-all parameter escapes the appropriate characters when the route is used to generate a URL, including path separator `/` characters. For example, the route `foo/{*path}` with route values `{ path = "my/path" }` generates `foo/my%2Fpath`. Note the escaped forward slash. To round-trip path separator characters, use the `**` route parameter prefix. The route `foo/{**path}` with `{ path = "my/path" }` generates `foo/my/path`.

URL patterns that attempt to capture a file name with an optional file extension have additional considerations. For example, consider the template `files/{filename}.{ext?}`. When values for both `filename` and `ext` exist, both values are populated. If only a value for `filename` exists in the URL, the route matches because the trailing `.` is optional. The following URLs match this route:

* `/files/myFile.txt`
* `/files/myFile`

Route parameters may have **default values** designated by specifying the default value after the parameter name separated by an equals sign (`=`). For example, `{controller=Home}` defines `Home` as the default value for `controller`. The default value is used if no value is present in the URL for the parameter. Route parameters are made optional by appending a question mark (`?`) to the end of the parameter name. For example, `id?`. The difference between optional values and default route parameters is:

* A route parameter with a default value always produces a value.
* An optional parameter has a value only when a value is provided by the request URL.

Route parameters may have constraints that must match the route value bound from the URL. Adding `:` and constraint name after the route parameter name specifies an inline constraint on a route parameter. If the constraint requires arguments, they're enclosed in parentheses `(...)` after the constraint name. Multiple *inline constraints* can be specified by appending another `:` and constraint name.

The constraint name and arguments are passed to the `Microsoft.AspNetCore.Routing.IInlineConstraintResolver` service to create an instance of `Microsoft.AspNetCore.Routing.IRouteConstraint` to use in URL processing. For example, the route template `blog/{article:minlength(10)}` specifies a `minlength` constraint with the argument `10`. For more information on route constraints and a list of the constraints provided by the framework, see the Route constraints section.

Route parameters may also have parameter transformers. Parameter transformers transform a parameter's value when generating links and matching actions and pages to URLs. Like constraints, parameter transformers can be added inline to a route parameter by adding a `:` and transformer name after the route parameter name. For example, the route template `blog/{article:slugify}` specifies a `slugify` transformer. For more information on parameter transformers, see the Parameter transformers section.

The following table demonstrates example route templates and their behavior.

| Route Template                           | Example Matching URI    | The request URI…                                                      |
|------------------------------------------|-------------------------|------------------------------------------------------------------------------|
| `hello`                                  | `/hello`                | Only matches the single path `/hello`.                                       |
| `{Page=Home}`                            | `/`                     | Matches and sets `Page` to `Home`.                                           |
| `{Page=Home}`                            | `/Contact`              | Matches and sets `Page` to `Contact`.                                        |
| `{controller}/{action}/{id?}`            | `/Products/List`        | Maps to the `Products` controller and `List` action.                         |
| `{controller}/{action}/{id?}`            | `/Products/Details/123` | Maps to the `Products` controller and  `Details` action with`id` set to 123. |
| `{controller=Home}/{action=Index}/{id?}` | `/`                     | Maps to the `Home` controller and `Index` method. `id` is ignored.           |
| `{controller=Home}/{action=Index}/{id?}` | `/Products`             | Maps to the `Products` controller and `Index` method. `id` is ignored.       |

Using a template is generally the simplest approach to routing. Constraints and defaults can also be specified outside the route template.

### Complex segments

Complex segments are processed by matching up literal delimiters from right to left in a non-greedy way. For example, `[Route("/a{b}c{d}")]` is a complex segment.
Complex segments work in a particular way that must be understood to use them successfully. The example in this section demonstrates why complex segments only really work well when the delimiter text doesn't appear inside the parameter values. Using a regex and then manually extracting the values is needed for more complex cases.

> **Warning:**
> When using `System.Text.RegularExpressions` to process untrusted input, pass a timeout. A malicious user can provide input to `RegularExpressions` causing a Denial-of-Service attack. ASP.NET Core framework APIs that use `RegularExpressions` pass a timeout.

This is a summary of the steps that routing performs with the template `/a{b}c{d}` and the URL path `/abcd`. The `|` is used to help visualize how the algorithm works:

* The first literal, right to left, is `c`. So `/abcd` is searched from right and finds `/ab|c|d`.
* Everything to the right (`d`) is now matched to the route parameter `{d}`.
* The next literal, right to left, is `a`. So `/ab|c|d` is searched starting where we left off, then `a` is found `/|a|b|c|d`.
* The value to the right (`b`) is now matched to the route parameter `{b}`.
* There is no remaining text and no remaining route template, so this is a match.

Here's an example of a negative case using the same template `/a{b}c{d}` and the URL path `/aabcd`. The `|` is used to help visualize how the algorithm works. This case isn't a match, which is explained by the same algorithm:
* The first literal, right to left, is `c`. So `/aabcd` is searched from right and finds `/aab|c|d`.
* Everything to the right (`d`) is now matched to the route parameter `{d}`.
* The next literal, right to left, is `a`. So `/aab|c|d` is searched starting where we left off, then `a` is found `/a|a|b|c|d`.
* The value to the right (`b`) is now matched to the route parameter `{b}`.
* At this point there is remaining text `a`, but the algorithm has run out of route template to parse, so this is not a match.

Since the matching algorithm is non-greedy:

* It matches the smallest amount of text possible in each step.
* Any case where the delimiter value appears inside the parameter values results in not matching.

Regular expressions provide much more control over their matching behavior.

Greedy matching, also known as *maximal matching* attempts to find the longest possible match in the input text that satisfies the regex pattern. Non-greedy matching, also known as *lazy matching*, seeks the shortest possible match in the input text that satisfies the regex pattern.

## Routing with special characters

Routing with special characters can lead to unexpected results. For example, consider a controller with the following action method:

```csharp
[HttpGet("{id?}/name")]
public async Task<ActionResult<string>> GetName(string id)
{
    var todoItem = await _context.TodoItems.FindAsync(id);

    if (todoItem == null || todoItem.Name == null)
    {
        return NotFound();
    }

    return todoItem.Name;
}
```

When `string id` contains the following encoded values, unexpected results might occur:

| ASCII  | Encoded |
| ----| ---------- |
| `/` | `%2F`  |
| ` ` | `+`  |

Route parameters are not always URL decoded. This problem may be addressed in the future. For more information, see this GitHub issue;
