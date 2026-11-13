---
title: "Breaking change - MailAddress enforces validation for consecutive dots"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/10.0/mailaddress-consecutive-dots.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MailAddress enforces validation for consecutive dots

Starting in .NET 10, the `System.Net.Mail.MailAddress` class enforces stricter validation of email addresses. Email addresses with consecutive dots in the local part (for example, `user@example.com`) or domain part (for example, `address@test..example.com`) are now considered invalid. This change aligns the behavior of `MailAddress` with the email address format specified in RFC 5322 and RFC 2822.

## Version introduced

.NET 10 Preview 1

## Previous behavior

Previously, the `System.Net.Mail.MailAddress` class allowed email addresses with consecutive dots in the local or domain parts, even though such addresses are invalid according to the email address specification.

For example, the following code executed without throwing an exception:

```csharp
using System.Net.Mail;

var email = new MailAddress("user@example.com");
Console.WriteLine(email.Address); // Output: user@example.com
```

## New behavior

Starting in .NET 10, the `System.Net.Mail.MailAddress` class enforces stricter validation and throws a `System.FormatException` when it parses an email address with consecutive dots in the local or domain parts.

For example, the following code now throws a `System.FormatException`:

```csharp
using System.Net.Mail;

var email = new MailAddress("user@example.com"); // Throws FormatException
```

The exception message indicates that the email address is invalid.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change ensures compliance with the email address format specified in RFC 5322 and RFC 2822. According to these standards, email addresses with consecutive dots in the local or domain parts are invalid. The previous behavior of allowing such addresses was incorrect and could lead to unexpected issues in applications relying on `System.Net.Mail.MailAddress` for email validation.

## Recommended action

If your application relies on the `System.Net.Mail.MailAddress` class to parse email addresses, review your code to ensure that it doesn't pass email addresses with consecutive dots in the local or domain parts. If such addresses are encountered, update your application to handle the `System.FormatException` that's now thrown.

For example, you can use a `try-catch` block to handle invalid email addresses:

```csharp
using System;
using System.Net.Mail;

try
{
    var email = new MailAddress("user@example.com");
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid email address: {ex.Message}");
}
```

Alternatively, you can validate email addresses using a regular expression before passing them to the `System.Net.Mail.MailAddress` constructor.

## Affected APIs

- `System.Net.Mail.MailAddress.#ctor(System.String)` constructor
- `System.Net.Mail.MailAddress.#ctor(System.String,System.String)` constructor
- `System.Net.Mail.MailAddress.#ctor(System.String,System.String,System.Text.Encoding)` constructor

## See also

- Original pull request
- Related issue
