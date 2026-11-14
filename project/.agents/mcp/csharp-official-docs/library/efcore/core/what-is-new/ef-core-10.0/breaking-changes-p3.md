---
title: "Breaking changes in EF Core 10 (EF10) - EF Core (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/what-is-new/ef-core-10.0/breaking-changes.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Breaking changes in EF Core 10 (EF10) - EF Core (part 3 of 3)

### IDiscriminatorPropertySetConvention signature changed

#### Old behavior

Previously, `IDiscriminatorPropertySetConvention.ProcessDiscriminatorPropertySet` took `IConventionEntityTypeBuilder` as a parameter.

#### New behavior

Starting with EF Core 10.0, the method signature changed to take `IConventionTypeBaseBuilder` instead of `IConventionEntityTypeBuilder`.

#### Why

This change allows the convention to work with both entity types and complex types.

#### Mitigations

Update your custom convention implementations to use the new signature:

```c#
public virtual void ProcessDiscriminatorPropertySet(
    IConventionTypeBaseBuilder typeBaseBuilder, // Changed from IConventionEntityTypeBuilder
    string name,
    Type type,
    MemberInfo memberInfo,
    IConventionContext<IConventionProperty> context)
```

### IRelationalCommandDiagnosticsLogger methods add logCommandText parameter

Tracking Issue #35757

#### Old behavior

Previously, methods on `IRelationalCommandDiagnosticsLogger` such as `CommandReaderExecuting`, `CommandReaderExecuted`, `CommandScalarExecuting`, and others accepted a `command` parameter representing the database command being executed.

#### New behavior

Starting with EF Core 10.0, these methods now require an additional `logCommandText` parameter. This parameter contains the SQL command text that will be logged, which may have sensitive data redacted when `Microsoft.EntityFrameworkCore.DbContextOptionsBuilder.EnableSensitiveDataLogging*` is not enabled.

#### Why

This change supports the new feature to redact inlined constants from logging by default. When EF inlines parameter values into SQL (e.g., when using `EF.Constant()`), those values are now redacted from logs unless sensitive data logging is explicitly enabled. The `logCommandText` parameter provides the redacted SQL for logging purposes, while the `command` parameter contains the actual SQL that gets executed.

#### Mitigations

If you have a custom implementation of `IRelationalCommandDiagnosticsLogger`, you'll need to update your method signatures to include the new `logCommandText` parameter. For example:

```c#
public InterceptionResult<DbDataReader> CommandReaderExecuting(
    IRelationalConnection connection,
    DbCommand command,
    DbContext context,
    Guid commandId,
    Guid connectionId,
    DateTimeOffset startTime,
    string logCommandText) // New parameter
{
    // Use logCommandText for logging purposes
    // Use command for execution-related logic
}
```

The `logCommandText` parameter contains the SQL to be logged (with inlined constants potentially redacted), while `command.CommandText` contains the actual SQL that will be executed against the database.

### SQL parameter names are now simplified

Tracking Issue #35196

#### Old behavior

Previously, EF generated SQL parameter names with a `__` prefix and a trailing counter. For example, a query referencing a `city` variable produced a parameter named `@__city_0`:

```sql
@__city_0='London'

SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[City] = @__city_0
```

#### New behavior

Starting with EF Core 10.0, parameter names are simplified to match the originating variable or member name, and a numeric suffix is only added when needed to make a name unique. The same query now produces a parameter named `@city`:

```sql
@city='London'

SELECT [b].[Id], [b].[Name]
FROM [Blogs] AS [b]
WHERE [b].[City] = @city
```

#### Why

The previous `__` prefix and unconditional counter made the generated SQL harder to read in logs, query plans, and diagnostic output. The simplified names more closely resemble SQL that a developer would write by hand and make it easier to correlate parameters with the variables in your code.

#### Mitigations

This change is transparent for most applications, since EF manages parameter names internally and the executed queries are functionally identical. However, code that depends on the exact parameter names in the generated SQL - such as snapshot tests comparing SQL text, or interceptors and loggers that parse `DbCommand.CommandText` or inspect `DbParameter.ParameterName` - needs to be updated to account for the new names.

Since parameter names are part of the generated SQL text, upgrading may also cause almost all cached query plans to be recompiled on the database server. Large systems should account for a temporary compilation spike immediately after deployment while those plans are rebuilt.

## Microsoft.Data.Sqlite breaking changes

### Summary

| **Breaking change**                                                                                       | **Impact** |
|:----------------------------------------------------------------------------------------------------------|------------|
| Using GetDateTimeOffset without an offset now assumes UTC                         | High       |
| Writing DateTimeOffset into REAL column now writes in UTC                        | High       |
| Using GetDateTime with an offset now returns value in UTC                               | High       |

### High-impact changes

#### Using GetDateTimeOffset without an offset now assumes UTC

Tracking Issue #36195

##### Old behavior

Previously, when using `GetDateTimeOffset` on a textual timestamp that did not have an offset (e.g., `2014-04-15 10:47:16`), Microsoft.Data.Sqlite would assume the value was in the local time zone. I.e. the value was parsed as `2014-04-15 10:47:16+02:00` (assuming local time zone was UTC+2).

##### New behavior

Starting with Microsoft.Data.Sqlite 10.0, when using `GetDateTimeOffset` on a textual timestamp that does not have an offset, Microsoft.Data.Sqlite will assume the value is in UTC.

##### Why

This is to align with SQLite's behavior where timestamps without an offset are treated as UTC.

##### Mitigations

Code should be adjusted accordingly.

As a last/temporary resort, you can revert to previous behavior by setting `Microsoft.Data.Sqlite.Pre10TimeZoneHandling` AppContext switch to `true`, see AppContext for library consumers for more details.

```c#
AppContext.SetSwitch("Microsoft.Data.Sqlite.Pre10TimeZoneHandling", isEnabled: true);
```

#### Writing DateTimeOffset into REAL column now writes in UTC

Tracking Issue #36195

##### Old behavior

Previously, when writing a `DateTimeOffset` value into a REAL column, Microsoft.Data.Sqlite would write the value without taking the offset into account.

##### New behavior

Starting with Microsoft.Data.Sqlite 10.0, when writing a `DateTimeOffset` value into a REAL column, Microsoft.Data.Sqlite will convert the value to UTC before doing the conversions and writing it.

##### Why

The value written was incorrect, not aligning with SQLite's behavior where REAL timestamps are asummed to be UTC.

##### Mitigations

Code should be adjusted accordingly.

As a last/temporary resort, you can revert to previous behavior by setting `Microsoft.Data.Sqlite.Pre10TimeZoneHandling` AppContext switch to `true`, see AppContext for library consumers for more details.

```c#
AppContext.SetSwitch("Microsoft.Data.Sqlite.Pre10TimeZoneHandling", isEnabled: true);
```

#### Using GetDateTime with an offset now returns value in UTC

Tracking Issue #36195

##### Old behavior

Previously, when using `GetDateTime` on a textual timestamp that had an offset (e.g., `2014-04-15 10:47:16+02:00`), Microsoft.Data.Sqlite would return the value with `DateTimeKind.Local` (even if the offset was not local). The time was parsed correctly taking the offset into account.

##### New behavior

Starting with Microsoft.Data.Sqlite 10.0, when using `GetDateTime` on a textual timestamp that has an offset, Microsoft.Data.Sqlite will convert the value to UTC and return it with `DateTimeKind.Utc`.

##### Why

Even though the time was parsed correctly it was dependent on the machine-configured local time zone, which could lead to unexpected results.

##### Mitigations

Code should be adjusted accordingly.

As a last/temporary resort, you can revert to previous behavior by setting `Microsoft.Data.Sqlite.Pre10TimeZoneHandling` AppContext switch to `true`, see AppContext for library consumers for more details.

```c#
AppContext.SetSwitch("Microsoft.Data.Sqlite.Pre10TimeZoneHandling", isEnabled: true);
```
