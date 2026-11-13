---
title: "Routing in ASP.NET Core (part 5 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 5 of 10)

## Route constraints

Route constraints execute when a match has occurred to the incoming URL and the URL path is tokenized into route values. Route constraints generally inspect the route value associated via the route template and make a true or false decision about whether the value is acceptable. Some route constraints use data outside the route value to consider whether the request can be routed. For example, the `Microsoft.AspNetCore.Routing.Constraints.HttpMethodRouteConstraint` can accept or reject a request based on its HTTP verb. Constraints are used in routing requests and link generation.

> **Warning:**
> Don't use constraints for input validation. If constraints are used for input validation, invalid input results in a `404` Not Found response. Invalid input should produce a `400` Bad Request with an appropriate error message. Route constraints are used to disambiguate similar routes, not to validate the inputs for a particular route.

The following table demonstrates the default route constraints and their expected behavior:

| constraint          | Example                                     | Example Matches                        | Notes                                                                                                                           |
|---------------------|---------------------------------------------|----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `int`               | `{id:int}`                                  | `123456789`, `-123456789`              | Matches any integer                                                                                                             |
| `bool`              | `{active:bool}`                             | `true`, `FALSE`                        | Matches `true` or `false`. Case-insensitive                                                                                     |
| `datetime`          | `{dob:datetime}`                            | `2016-12-31`, `2016-12-31 7:32pm`      | Matches a valid `DateTime` value in the invariant culture. See preceding warning                                                |
| `decimal`           | `{price:decimal}`                           | `49.99`, `-1,000.01`                   | Matches a valid `decimal` value in the invariant culture. See preceding warning                                                 |
| `double`            | `{weight:double}`                           | `1.234`, `-1,001.01e8`                 | Matches a valid `double` value in the invariant culture. See preceding warning                                                  |
| `float`             | `{weight:float}`                            | `1.234`, `-1,001.01e8`                 | Matches a valid `float` value in the invariant culture. See preceding warning                                                   |
| `guid`              | `{id:guid}`                                 | `CD2C1638-1638-72D5-1638-DEADBEEF1638` | Matches a valid `Guid` value                                                                                                    |
| `long`              | `{ticks:long}`                              | `123456789`, `-123456789`              | Matches a valid `long` value                                                                                                    |
| `minlength(value)`  | `{username:minlength(4)}`                   | `Rick`                                 | String must be at least 4 characters                                                                                            |
| `maxlength(value)`  | `{filename:maxlength(8)}`                   | `MyFile`                               | String must be no more than 8 characters                                                                                        |
| `length(length)`    | `{filename:length(12)}`                     | `somefile.txt`                         | String must be exactly 12 characters long                                                                                       |
| `length(min,max)`   | `{filename:length(8,16)}`                   | `somefile.txt`                         | String must be at least 8 and no more than 16 characters long                                                                   |
| `min(value)`        | `{age:min(18)}`                             | `19`                                   | Integer value must be at least 18                                                                                               |
| `max(value)`        | `{age:max(120)}`                            | `91`                                   | Integer value must be no more than 120                                                                                          |
| `range(min,max)`    | `{age:range(18,120)}`                       | `91`                                   | Integer value must be at least 18 but no more than 120                                                                          |
| `alpha`             | `{name:alpha}`                              | `Rick`                                 | String must consist of one or more alphabetical characters, `a`-`z` and case-insensitive                                        |
| `regex(expression)` | `{ssn:regex(^\\d{{3}}-\\d{{2}}-\\d{{4}}$)}` | `123-45-6789`                          | String must match the regular expression. See tips about defining a regular expression                                          |
| `required`          | `{name:required}`                           | `Rick`                                 | Enforces that an explicit value (not an ambient value) is present during URL generation.                                        |
| `file`              | `{filename:file}`                           | `myfile.txt`                           | String can contain path segments, but its last segment must have a dot (`.`) and be followed by one or more non-dot characters  |
| `nonfile`           | `{page:nonfile}`                            | `PageName`                             | String must not have a dot in its last path segment that is followed by one or more non-dot (`.`) characters                    |

> **Warning:**
> When using `System.Text.RegularExpressions` to process untrusted input, pass a timeout. A malicious user can provide input to `RegularExpressions` causing a Denial-of-Service attack. ASP.NET Core framework APIs that use `RegularExpressions` pass a timeout.

Multiple, colon delimited constraints can be applied to a single parameter. For example, the following constraint restricts a parameter to an integer value of 1 or greater:

```csharp
[Route("users/{id:int:min(1)}")]
public User GetUserById(int id) { }
```

> **Warning:**
> Route constraints that verify the URL and are converted to a CLR type always use the invariant culture. For example, conversion to the CLR type `int` or `DateTime`. These constraints assume that the URL is not localizable. The framework-provided route constraints don't modify the values stored in route values. All route values parsed from the URL are stored as strings. For example, the `float` constraint attempts to convert the route value to a float, but the converted value is used only to verify it can be converted to a float.

### Regular expressions in constraints

> **Warning:**
> When using `System.Text.RegularExpressions` to process untrusted input, pass a timeout. A malicious user can provide input to `RegularExpressions` causing a Denial-of-Service attack. ASP.NET Core framework APIs that use `RegularExpressions` pass a timeout.

Regular expressions can be specified as inline constraints using the `regex(...)` route constraint. Methods in the `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` family also accept an object literal of constraints. If that form is used, string values are interpreted as regular expressions.

The following code uses an inline regex constraint:

```csharp
app.MapGet("{message:regex(^\\d{{3}}-\\d{{2}}-\\d{{4}}$)}",
    () => "Inline Regex Constraint Matched");
```
The following code uses an object literal to specify a regex constraint:

```csharp
app.MapControllerRoute(
    name: "people",
    pattern: "people/{ssn}",
    constraints: new { ssn = "^\\d{3}-\\d{2}-\\d{4}$", },
    defaults: new { controller = "People", action = "List" });
```
The ASP.NET Core framework adds `RegexOptions.IgnoreCase | RegexOptions.Compiled | RegexOptions.CultureInvariant` to the regular expression constructor. See `System.Text.RegularExpressions.RegexOptions` for a description of these members.

Regular expressions use delimiters and tokens similar to those used by routing and the C# language. Regular expression tokens must be escaped. To use the regular expression `^\d{3}-\d{2}-\d{4}$` in an inline constraint, use one of the following:

* Replace `\` characters provided in the string as `\\` characters in the C# source file in order to escape the `\` string escape character.
* Verbatim string literals.

To escape routing parameter delimiter characters `{`, `}`, `[`, `]`, double the characters in the expression, for example, `{{`, `}}`, `[[`, `]]`. The following table shows a regular expression and its escaped version:

| Regular expression    | Escaped regular expression     |
| --------------------- | ------------------------------ |
| `^\d{3}-\d{2}-\d{4}$` | `^\\d{{3}}-\\d{{2}}-\\d{{4}}$` |
| `^[a-z]{2}$`          | `^[[a-z]]{{2}}$`               |

Regular expressions used in routing often start with the `^` character and match the starting position of the string. The expressions often end with the `$` character and match the end of the string. The `^` and `$` characters ensure that the regular expression matches the entire route parameter value. Without the `^` and `$` characters, the regular expression matches any substring within the string, which is often undesirable. The following table provides examples and explains why they match or fail to match.

| Expression   | String    | Match | Comment               |
| ------------ | --------- | :---: |  -------------------- |
| `[a-z]{2}`   | hello     | Yes   | Substring matches     |
| `[a-z]{2}`   | 123abc456 | Yes   | Substring matches     |
| `[a-z]{2}`   | mz        | Yes   | Matches expression    |
| `[a-z]{2}`   | MZ        | Yes   | Not case sensitive    |
| `^[a-z]{2}$` | hello     | No    | See `^` and `$` above |
| `^[a-z]{2}$` | 123abc456 | No    | See `^` and `$` above |

For more information on regular expression syntax, see .NET Framework Regular Expressions.

To constrain a parameter to a known set of possible values, use a regular expression. For example, `{action:regex(^(list|get|create)$)}` only matches the `action` route value to `list`, `get`, or `create`. If passed into the constraints dictionary, the string `^(list|get|create)$` is equivalent. Constraints that are passed in the constraints dictionary that don't match one of the known constraints are also treated as regular expressions. Constraints that are passed within a template that don't match one of the known constraints are not treated as regular expressions.

### Custom route constraints

Custom route constraints can be created by implementing the `Microsoft.AspNetCore.Routing.IRouteConstraint` interface. The `IRouteConstraint` interface contains `Microsoft.AspNetCore.Routing.IRouteConstraint.Match*`, which returns `true` if the constraint is satisfied and `false` otherwise.

Custom route constraints are rarely needed. Before implementing a custom route constraint, consider alternatives, such as model binding.

The ASP.NET Core Constraints folder provides good examples of creating constraints. For example, GuidRouteConstraint.

To use a custom `IRouteConstraint`, the route constraint type must be registered with the app's `Microsoft.AspNetCore.Routing.RouteOptions.ConstraintMap` in the service container. A `ConstraintMap` is a dictionary that maps route constraint keys to `IRouteConstraint` implementations that validate those constraints. An app's `ConstraintMap` can be updated in `Program.cs` either as part of an `Microsoft.Extensions.DependencyInjection.RoutingServiceCollectionExtensions.AddRouting*` call or by configuring `Microsoft.AspNetCore.Routing.RouteOptions` directly with `builder.Services.Configure<RouteOptions>`. For example:

```csharp
builder.Services.AddRouting(options =>
    options.ConstraintMap.Add("noZeroes", typeof(NoZeroesRouteConstraint)));
```
The preceding constraint is applied in the following code:

```csharp
[ApiController]
[Route("api/[controller]")]
public class NoZeroesController : ControllerBase
{
    [HttpGet("{id:noZeroes}")]
    public IActionResult Get(string id) =>
        Content(id);
}
```
The implementation of `NoZeroesRouteConstraint` prevents `0` being used in a route parameter:

```csharp
public class NoZeroesRouteConstraint : IRouteConstraint
{
    private static readonly Regex _regex = new(
        @"^[1-9]*$",
        RegexOptions.CultureInvariant | RegexOptions.IgnoreCase,
        TimeSpan.FromMilliseconds(100));

    public bool Match(
        HttpContext? httpContext, IRouter? route, string routeKey,
        RouteValueDictionary values, RouteDirection routeDirection)
    {
        if (!values.TryGetValue(routeKey, out var routeValue))
        {
            return false;
        }

        var routeValueString = Convert.ToString(routeValue, CultureInfo.InvariantCulture);

        if (routeValueString is null)
        {
            return false;
        }

        return _regex.IsMatch(routeValueString);
    }
}
```
> **Warning:**
> When using `System.Text.RegularExpressions` to process untrusted input, pass a timeout. A malicious user can provide input to `RegularExpressions` causing a Denial-of-Service attack. ASP.NET Core framework APIs that use `RegularExpressions` pass a timeout.

The preceding code:

* Prevents `0` in the `{id}` segment of the route.
* Is shown to provide a basic <example-value> of implementing a custom constraint. It should not be used in a production app.

The following code is a better approach to preventing an `id` containing a `0` from being processed:

```csharp
[HttpGet("{id}")]
public IActionResult Get(string id)
{
    if (id.Contains('0'))
    {
        return StatusCode(StatusCodes.Status406NotAcceptable);
    }

    return Content(id);
}
```
The preceding code has the following advantages over the `NoZeroesRouteConstraint` approach:

* It doesn't require a custom constraint.
* It returns a more descriptive error when the route parameter includes `0`.
