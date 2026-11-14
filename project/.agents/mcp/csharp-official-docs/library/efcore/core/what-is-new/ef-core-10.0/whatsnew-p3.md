---
title: "What's New in EF Core 10 (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-10.0/whatsnew.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# What's New in EF Core 10 (part 3 of 3)

## Security-related improvements

### Redact inlined constants from logging by default

When logging executed SQL, EF does not log parameter values by default, since these may contain sensitive or personally-identifiable information (PII); `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` can be used to enable logging parameter values in diagnostic or debugging scenarios (see documentation).

However, EF sometimes inlines parameters into the SQL statement rather than sending them separately; in those scenarios, the potentially sensitive values were logged. EF10 no longer does this, redacting such inlined parameters by default and replacing them with a question mark character (`?`). For example, let's say we have a function that accepts a list of roles, and returns the list of users which have one of those roles:

```c#
Task<List<User>> GetUsersByRoles(BlogContext context, string[] roles)
    => context.Users.Where(b => roles.Contains(b.Role)).ToListAsync();
```

Although the roles here are parameterized (may differ across invocations), we know that the actual sets of roles queried will be quite limited. We can therefore tell EF to *inline* the roles, so that the database's planner can plan execution separately for this query with its specific set of roles:

```c#
Task<List<User>> GetUsersByRoles(BlogContext context, string[] roles)
    => context.Users.Where(b => EF.Constant(roles).Contains(b.Role)).ToListAsync();
```

On previous versions of EF, this produced the following SQL:

```sql
SELECT [u].[Id], [u].[Role]
FROM [Users] AS [u]
WHERE [u].[Role] IN (N'Administrator', N'Manager')
```

EF10 sends the same SQL to the database, but logs the following SQL, where the roles have been redacted:

```sql
SELECT [b].[Id], [b].[Role]
FROM [Blogs] AS [b]
WHERE [b].[Role] IN (?, ?)
```

If the roles represent sensitive information, this prevents that information from leaking into the application logs. As with regular parameters, full logging can be reenabled via `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*`.

### Warn for string concatenation with raw SQL APIs

SQL injection is one of the most serious security vulnerabilities in database applications; if unsanitized external input is inserted into SQL queries, a malicious user may be able to perform SQL injection, executing arbitrary SQL on your database. For more information about EF's SQL querying APIs and SQL injection, see the documentation.

While EF users rarely deal with SQL directly, EF does provide SQL-based APIs for the cases where they're needed. Most of these APIs are safe in the face of SQL injection; for example `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSql*` accepts a .NET `FormattableString`, and any parameter will automatically be send as a separate SQL parameter, preventing SQL injection. However, in some scenarios it's necessary to build up a dynamic SQL query by piecing together multiple fragments; `Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw*` is designed specifically for this, and requires the user to ensure that all fragments are trusted or properly sanitized.

Starting with EF10, EF has an analyzer which warns if concatenation is performed within a "raw" SQL method invocation:

```c#
var users = context.Users.FromSqlRaw("SELECT * FROM Users WHERE [" + fieldName + "] IS NULL");
```

If `fieldName` is trusted or has been properly sanitized, the warning can be safely suppressed.

## Other improvements

- AUTOINCREMENT can now be disabled for SQLite and is also supported for properties with value converters. For more information, see SQLite Value Generation.
- Stop spanning all migrations with a single transaction (#35096). This reverts a change done in EF9 which caused issues in various migration scenarios.
- Make SQL Server scaffolding compatible with Azure Data Explorer (#34832, contributed by @barnuri).
- Associate the DatabaseRoot with the scoped options instance and not the singleton options (#34477, contributed by @koenigst).
- Improve LoadExtension to work correctly with dotnet run and lib* named libs (#35617, contributed by @krwq).
- Changes to AsyncLocal usage for better lazy loading performance (#35835, contributed by @henriquewr).

The full list of issues for the release can be found here.
