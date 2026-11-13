---
title: "How to verify that strings are in valid email format"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to verify that strings are in valid email format

The example in this article uses a regular expression to verify that a string is in valid email format.

This regular expression is comparatively simple to what can actually be used as an email. Using a regular expression to validate an email is useful to ensure that the structure of an email is correct. However, it isn't a substitution for verifying the email actually exists.

✔️ DO use a small regular expression to check for the valid structure of an email.

✔️ DO send a test email to the address provided by a user of your app.

❌ DON'T use a regular expression as the only way you validate an email.

If you try to create the _perfect_ regular expression to validate that the structure of an email is correct, the expression becomes so complex that it's incredibly difficult to debug or improve. Regular expressions can't validate an email exists, even if it's structured correctly. The best way to validate an email is to send a test email to the address.

> **Warning:**
> Unrestricted use of `System.Text.RegularExpressions` with untrusted input can subject applications to denial-of-service attacks. Consult Best practices for regular expressions in .NET for guidance on how to safely use .NET regular expressions with untrusted input.

## Example

The example defines an `IsValidEmail` method, which returns `true` if the string contains a valid email address and `false` if it doesn't but takes no other action.

To verify that the email address is valid, the `IsValidEmail` method calls the `System.Text.RegularExpressions.Regex.Replace(System.String,System.String,System.Text.RegularExpressions.MatchEvaluator)` method with the `(@)(.+)$` regular expression pattern to separate the domain name from the email address. The third parameter is a `System.Text.RegularExpressions.MatchEvaluator` delegate that represents the method that processes and replaces the matched text. The regular expression pattern is interpreted as follows:

| Pattern | Description                                                                         |
|---------|-------------------------------------------------------------------------------------|
| `(@)`   | Match the @ character. This part is the first capturing group.                           |
| `(.+)`  | Match one or more occurrences of any character. This part is the second capturing group. |
| `$`     | End the match at the end of the string.                                             |

The domain name, along with the @ character, is passed to the `DomainMapper` method. The method uses the `System.Globalization.IdnMapping` class to translate Unicode characters that are outside the US-ASCII character range to Punycode. The method also sets the `invalid` flag to `True` if the `System.Globalization.IdnMapping.GetAscii*` method detects any invalid characters in the domain name. The method returns the Punycode domain name preceded by the @ symbol to the `IsValidEmail` method.

> **Tip:**
> It's recommended that you use the simple `(@)(.+)$` regular expression pattern to normalize the domain and then return a value indicating that it passed or failed. However, the example in this article describes how to use a regular expression further to validate the email. Regardless of how you validate an email, you should always send a test email to the address to ensure it exists.

The `IsValidEmail` method then calls the `System.Text.RegularExpressions.Regex.IsMatch(System.String,System.String)` method to verify that the address conforms to a regular expression pattern.

The `IsValidEmail` method merely determines whether the email format is valid for an email address; it doesn't validate that the email exists. Also, the `IsValidEmail` method doesn't verify that the top-level domain name is a valid domain name listed in the IANA Root Zone Database, which would require a look-up operation.

```csharp
﻿using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace RegexExamples
{
    class RegexUtilities
    {
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(200));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException e)
            {
                return false;
            }
            catch (ArgumentException e)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
    }
}
```
```vb
﻿Imports System.Globalization
Imports System.Text.RegularExpressions

Public Class RegexUtilities
    Public Shared Function IsValidEmail(email As String) As Boolean

        If String.IsNullOrWhiteSpace(email) Then Return False

        ' Use IdnMapping class to convert Unicode domain names.
        Try
            'Examines the domain part of the email and normalizes it.
            Dim DomainMapper =
                Function(match As Match) As String

                    'Use IdnMapping class to convert Unicode domain names.
                    Dim idn = New IdnMapping

                    'Pull out and process domain name (throws ArgumentException on invalid)
                    Dim domainName As String = idn.GetAscii(match.Groups(2).Value)

                    Return match.Groups(1).Value & domainName

                End Function

            'Normalize the domain
            email = Regex.Replace(email, "(@)(.+)$", DomainMapper,
                                  RegexOptions.None, TimeSpan.FromMilliseconds(200))

        Catch e As RegexMatchTimeoutException
            Return False

        Catch e As ArgumentException
            Return False

        End Try

        Try
            Return Regex.IsMatch(email,
                                 "^[^@\s]+@[^@\s]+\.[^@\s]+$",
                                 RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250))

        Catch e As RegexMatchTimeoutException
            Return False

        End Try

    End Function
End Class
```
In this example, the regular expression pattern `^[^@\s]+@[^@\s]+\.[^@\s]+$` is interpreted as shown in the following table. The regular expression is compiled using the `System.Text.RegularExpressions.RegexOptions.IgnoreCase` flag.

| Pattern   | Description                                                                              |
|-----------|------------------------------------------------------------------------------------------|
| `^`       | Begin the match at the start of the string.                                              |
| `[^@\s]+` | Match one or more occurrences of any character other than the @ character or whitespace. |
| `@`       | Match the @ character.                                                                   |
| `[^@\s]+` | Match one or more occurrences of any character other than the @ character or whitespace. |
| `\.`      | Match a single period character.                                                         |
| `[^@\s]+` | Match one or more occurrences of any character other than the @ character or whitespace. |
| `$`       | End the match at the end of the string.                                                  |

> **Important:**
> This regular expression isn't intended to cover every aspect of a valid email address. It's provided as an example for you to extend as needed.

## See also

- .NET Regular Expressions
- How far should one take e-mail address validation?
