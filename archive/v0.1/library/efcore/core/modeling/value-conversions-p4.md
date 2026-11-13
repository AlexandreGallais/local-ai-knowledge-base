---
title: "Value Conversions - EF Core (part 4 of 4)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/modeling/value-conversions.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Value Conversions - EF Core (part 4 of 4)

### Encrypt property values

Value converters can be used to encrypt property values before sending them to the database, and then decrypt them on the way out. For example, using string reversal as a substitute for a real encryption algorithm:

```csharp
modelBuilder.Entity<User>().Property(e => e.Password).HasConversion(
    v => new string(v.Reverse().ToArray()),
    v => new string(v.Reverse().ToArray()));
```

> **Note:**
> There is currently no way to get a reference to the current DbContext, or other session state, from within a value converter. This limits the kinds of encryption that can be used. Vote for GitHub issue #11597 to have this limitation removed.

> **Warning:**
> Make sure to understand all the implications if you roll your own encryption to protect sensitive data. Consider instead using pre-built encryption mechanisms, such as Always Encrypted on SQL Server.

## Limitations

There are a few known current limitations of the value conversion system:

* As noted above, `null` cannot be converted. Please vote (👍) for GitHub issue #13850 if this is something you need.
* It isn't possible to query into value-converted properties, e.g. reference members on the value-converted .NET type in your LINQ queries. Please vote (👍) for GitHub issue #10434 if this is something you need - but considering using a JSON column instead.
* There is currently no way to spread a conversion of one property to multiple columns or vice-versa. Please vote (👍) for GitHub issue #13947 if this is something you need.
* Value generation is not supported for most keys mapped through value converters. Please vote (👍) for GitHub issue #11597 if this is something you need.
* Value conversions cannot reference the current DbContext instance. Please vote (👍) for GitHub issue #12205 if this is something you need.
* Parameters using value-converted types cannot currently be used in raw SQL APIs. Please vote (👍) for GitHub issue #27534 if this is something you need.

Removal of these limitations is being considered for future releases.
