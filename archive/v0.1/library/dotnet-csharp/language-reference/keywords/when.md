---
title: "when contextual keyword"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/when.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# when (C# reference)

Use the `when` contextual keyword to specify a filter condition in the following contexts:

- In a catch clause of a `try-catch` or `try-catch-finally` statement.
- As a case guard in the `switch` statement.
- As a case guard in the `switch` expression.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## `when` in a catch clause

Use the `when` keyword in a catch clause to specify a condition that must be true for the handler for a specific exception to execute. Its syntax is:

```csharp
catch (ExceptionType [e]) when (expr)
```

where *expr* is an expression that evaluates to a Boolean value. If it returns `true`, the exception handler executes; if `false`, it doesn't.

Exception filters with the `when` keyword provide several advantages over traditional exception handling approaches, including better debugging support and performance benefits. For a detailed explanation of how exception filters preserve the call stack and improve debugging, see Exception filters vs. traditional exception handling.

The following example uses the `when` keyword to conditionally execute handlers for an `System.Net.Http.HttpRequestException` depending on the text of the exception message.

```csharp
﻿using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        Console.WriteLine(MakeRequest().Result);
    }

    public static async Task<string> MakeRequest()
    {
        var client = new HttpClient();
        var streamTask = client.GetStringAsync("https://localHost:10000");
        try
        {
            var responseText = await streamTask;
            return responseText;
        }
        catch (HttpRequestException e) when (e.Message.Contains("301"))
        {
            return "Site Moved";
        }
        catch (HttpRequestException e) when (e.Message.Contains("404"))
        {
            return "Page Not Found";
        }
        catch (HttpRequestException e)
        {
            return e.Message;
        }
    }
}
```
## See also

- C# keywords
