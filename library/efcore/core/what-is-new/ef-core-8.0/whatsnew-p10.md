---
title: "What's New in EF Core 8 (part 10 of 11)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-8.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 8 (part 10 of 11)

## Enhancements to SQLite scaffolding

SQLite only supports four primitive data types--INTEGER, REAL, TEXT, and BLOB. Previously, this meant that when you reverse engineered a SQLite database to scaffold an EF Core model, the resulting entity types would only included properties of type `long`, `double`, `string`, and `byte[]`. Additional .NET types are supported by the EF Core SQLite provider by converting between them and one of the four primitive SQLite types.

In EF Core 8, we now use the data format and column type name in addition to the SQLite type in order to determine a more appropriate .NET type to use in the model. The following tables show some of the cases where the additional information leads to better property types in the model.

| Column type name | .NET type                  |
| ---------------- | -------------------------- |
| BOOLEAN          | ~~byte[]~~ **bool**   |
| SMALLINT         | ~~long~~ **short**    |
| INT              | ~~long~~ **int**      |
| BIGINT           | long                       |
| STRING           | ~~byte[]~~ **string** |

| Data format                            | .NET type                    |
| -------------------------------------- | ---------------------------- |
| '0.0'                                  | ~~string~~ **decimal**  |
| '1970-01-01'                           | ~~string~~ **DateOnly** |
| '1970-01-01 00:00:00'                  | ~~string~~ **DateTime** |
| '00:00:00'                             | ~~string~~ **TimeSpan** |
| '00000000-0000-0000-0000-000000000000' | ~~string~~ **Guid**     |

## Sentinel values and database defaults

Databases allow columns to be configured to generate a default value if no value is provided when inserting a row. This can be represented in EF using `HasDefaultValue` for constants:

```csharp
b.Property(e => e.Status).HasDefaultValue("Hidden");
```

Or `HasDefaultValueSql` for arbitrary SQL clauses:

```csharp
b.Property(e => e.LeaseDate).HasDefaultValueSql("getutcdate()");
```

> **Tip:**
> The code shown below comes from DefaultConstraintSample.cs.

In order for EF to make use of this, it must determine when and when not to send a value for the column. By default, EF uses the CLR default as a sentinel for this. That is, when the value of `Status` or `LeaseDate` in the examples above are the CLR defaults for these types, then EF _interprets that to mean that the property has not been set_, and so does not send a value to the database. This works well for reference types--for example, if the `string` property `Status` is `null`, then EF doesn't send `null` to the database, but rather does not include any value so that the database default (`"Hidden"`) is used. Likewise, for the `DateTime` property `LeaseDate`, EF will not insert the CLR default value of `1/1/0001 12:00:00 AM`, but will instead omit this value so that database default is used.

However, in some cases the CLR default value is a valid value to insert. EF8 handles this by allowing the sentinel value for a column to change. For example, consider an integer column configured with a database default:

```csharp
b.Property(e => e.Credits).HasDefaultValueSql(10);
```

In this case, we want the new entity to be inserted with the given number of credits, unless this is not specified, in which case 10 credits are assigned. However, this means that inserting a record with zero credits is not possible, since zero is the CLR default, and hence will cause EF to send no value. In EF8, this can be fixed by changing the sentinel for the property from zero to `-1`:

```csharp
b.Property(e => e.Credits).HasDefaultValueSql(10).HasSentinel(-1);
```

EF will now only use the database default if `Credits` is set to `-1`; a value of zero will be inserted like any other amount.

It can often be useful to reflect this in the entity type as well as in the EF configuration. For example:

```csharp
public class Person
{
    public int Id { get; set; }
    public int Credits { get; set; } = -1;
}
```

This means that the sentinel value of -1 gets set automatically when the instance is created, meaning that the property starts in its "not-set" state.

> **Tip:**
> If you want to configure the database default constraint for use when `Migrations` creates the column, but you want EF to always insert a value, then configure the property as not-generated. For example, `b.Property(e => e.Credits).HasDefaultValueSql(10).ValueGeneratedNever();`.

### Database defaults for booleans

Boolean properties present an extreme form of this problem, since the CLR default (`false`) is one of only two valid values. This means that a `bool` property with a database default constraint will only have a value inserted if that value is `true`. When the database default value is `false`, then this means when the property value is `false`, then the database default will be used, which is `false`. Otherwise, if the property value is `true`, then `true` will be inserted. So when the database default is `false`, then the database column ends up with the correct value.

On the other hand, if the database default value is `true`, this means when the property value is `false`, then the database default will be used, which is `true`! And when the property value is `true`, then `true` will be inserted. So, the value in the column will always end `true` in the database, regardless of what the property value is.

EF8 fixes this problem by setting the sentinel for bool properties to the same value as the database default value. Both cases above then result in the correct value being inserted, regardless of whether the database default is `true` or `false`.

> **Tip:**
> When scaffolding from an existing database, EF8 parses and then includes simple default values into `HasDefaultValue` calls. (Previously, all default values were scaffolded as opaque `HasDefaultValueSql` calls.) This means that non-nullable bool columns with a `true` or `false` constant database default are no longer scaffolded as nullable.

### Database defaults for enums

Enum properties can have similar problems to `bool` properties because enums typically have a very small set of valid values, and the CLR default may be one of these values. For example, consider this entity type and enum:

```csharp
public class Course
{
    public int Id { get; set; }
    public Level Level { get; set; }
}

public enum Level
{
    Beginner,
    Intermediate,
    Advanced,
    Unspecified
}
```

The `Level` property is then configured with a database default:

```csharp
modelBuilder.Entity<Course>()
    .Property(e => e.Level)
    .HasDefaultValue(Level.Intermediate);
```

With this configuration, EF will exclude sending the value to the database when it is set to `Level.Beginner`, and instead `Level.Intermediate` is assigned by the database. This isn't what was intended!

The problem would not have occurred if the enum been defined with the "unknown" or "unspecified" value being the database default:

```csharp
public enum Level
{
    Unspecified,
    Beginner,
    Intermediate,
    Advanced
}
```

However, it is not always possible to change an existing enum, so in EF8, the sentinel can again be specified. For example, going back to the original enum:

```csharp
modelBuilder.Entity<Course>()
    .Property(e => e.Level)
    .HasDefaultValue(Level.Intermediate)
    .HasSentinel(Level.Unspecified);
```

Now `Level.Beginner` will be inserted as normal, and the database default will only be used when the property value is `Level.Unspecified`. It can again be useful to reflect this in the entity type itself. For example:

```csharp
public class Course
{
    public int Id { get; set; }
    public Level Level { get; set; } = Level.Unspecified;
}
```

### Using a nullable backing field

A more general way to handle the problem described above is to create a nullable backing field for the non-nullable property. For example, consider the following entity type with a `bool` property:

```csharp
public class Account
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
}
```

The property can be given a nullable backing field:

```csharp
public class Account
{
    public int Id { get; set; }

    private bool? _isActive;

    public bool IsActive
    {
        get => _isActive ?? false;
        set => _isActive = value;
    }
}
```

The backing field here will remain `null` _unless the property setter is actually called_. That is, the value of the backing field is a better indication of whether the property has been set or not than the CLR default of the property. This works out-of-the box with EF, since EF will use the backing field to read and write the property by default.

## Better ExecuteUpdate and ExecuteDelete

SQL commands that perform updates and deletes, such as those generated by `ExecuteUpdate` and `ExecuteDelete` methods, must target a single database table. However, in EF7, `ExecuteUpdate` and `ExecuteDelete` did not support updates accessing multiple entity types _even when the query ultimately affected a single table_. EF8 removes this limitation. For example, consider a `Customer` entity type with `CustomerInfo` owned type:

```csharp
public class Customer
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required CustomerInfo CustomerInfo { get; set; }
}

[Owned]
public class CustomerInfo
{
    public string? Tag { get; set; }
}
```

Both of these entity types map to the `Customers` table. However, the following bulk update fails on EF7 because it uses both entity types:

```csharp
await context.Customers
    .Where(e => e.Name == name)
    .ExecuteUpdateAsync(
        s => s.SetProperty(b => b.CustomerInfo.Tag, "Tagged")
            .SetProperty(b => b.Name, b => b.Name + "_Tagged"));
```

In EF8, this now translates to the following SQL when using Azure SQL:

```sql
UPDATE [c]
SET [c].[Name] = [c].[Name] + N'_Tagged',
    [c].[CustomerInfo_Tag] = N'Tagged'
FROM [Customers] AS [c]
WHERE [c].[Name] = @__name_0
```

Similarly, instances returned from a `Union` query can be updated as long as the updates all target the same table. For example, we can update any `Customer` with a region of `France`, and at the same time, any `Customer` who has visited a store with the region `France`:

```csharp
await context.CustomersWithStores
    .Where(e => e.Region == "France")
    .Union(context.Stores.Where(e => e.Region == "France").SelectMany(e => e.Customers))
    .ExecuteUpdateAsync(s => s.SetProperty(b => b.Tag, "The French Connection"));
```

In EF8, this query generates the following when using Azure SQL:

```sql
UPDATE [c]
SET [c].[Tag] = N'The French Connection'
FROM [CustomersWithStores] AS [c]
INNER JOIN (
    SELECT [c0].[Id], [c0].[Name], [c0].[Region], [c0].[StoreId], [c0].[Tag]
    FROM [CustomersWithStores] AS [c0]
    WHERE [c0].[Region] = N'France'
    UNION
    SELECT [c1].[Id], [c1].[Name], [c1].[Region], [c1].[StoreId], [c1].[Tag]
    FROM [Stores] AS [s]
    INNER JOIN [CustomersWithStores] AS [c1] ON [s].[Id] = [c1].[StoreId]
    WHERE [s].[Region] = N'France'
) AS [t] ON [c].[Id] = [t].[Id]
```

As a final example, in EF8, `ExecuteUpdate` can be used to update entities in a TPT hierarchy as long as all updated properties are mapped to the same table. For example, consider these entity types mapped using TPT:

```csharp
[Table("TptSpecialCustomers")]
public class SpecialCustomerTpt : CustomerTpt
{
    public string? Note { get; set; }
}

[Table("TptCustomers")]
public class CustomerTpt
{
    public int Id { get; set; }
    public required string Name { get; set; }
}
```

With EF8, the `Note` property can be updated:

```csharp
await context.TptSpecialCustomers
    .Where(e => e.Name == name)
    .ExecuteUpdateAsync(s => s.SetProperty(b => b.Note, "Noted"));
```

Or the `Name` property can be updated:

```csharp
await context.TptSpecialCustomers
    .Where(e => e.Name == name)
    .ExecuteUpdateAsync(s => s.SetProperty(b => b.Name, b => b.Name + " (Noted)"));
```

However, EF8 fails attempting to update both the `Name` and the `Note` properties because they are mapped to different tables. For example:

```csharp
await context.TptSpecialCustomers
    .Where(e => e.Name == name)
    .ExecuteUpdateAsync(s => s.SetProperty(b => b.Note, "Noted")
        .SetProperty(b => b.Name, b => b.Name + " (Noted)"));
```

Throws the following exception:

```text
The LINQ expression 'DbSet<SpecialCustomerTpt>()
    .Where(s => s.Name == __name_0)
    .ExecuteUpdate(s => s.SetProperty<string>(
        propertyExpression: b => b.Note,
        valueExpression: "Noted").SetProperty<string>(
        propertyExpression: b => b.Name,
        valueExpression: b => b.Name + " (Noted)"))' could not be translated. Additional information: Multiple 'SetProperty' invocations refer to different tables ('b => b.Note' and 'b => b.Name'). A single 'ExecuteUpdate' call can only update the columns of a single table. See https://go.microsoft.com/fwlink/?linkid=2101038 for more information.
```

## Better use of `IN` queries

When the `Contains` LINQ operator is used with a subquery, EF Core now generates better queries using SQL `IN` instead of `EXISTS`; aside from producing more readable SQL, in some cases this can result in dramatically faster queries. For example, consider the following LINQ query:

```csharp
var blogsWithPosts = await context.Blogs
    .Where(b => context.Posts.Select(p => p.BlogId).Contains(b.Id))
    .ToListAsync();
```

EF7 generates the following for PostgreSQL:

```sql
SELECT b."Id", b."Name"
      FROM "Blogs" AS b
      WHERE EXISTS (
          SELECT 1
          FROM "Posts" AS p
          WHERE p."BlogId" = b."Id")
```

Since the subquery references the external `Blogs` table (via `b."Id"`), this is a _correlated subquery_, meaning that the `Posts` subquery must be executed for each row in the `Blogs` table. In EF8, the following SQL is generated instead:

```sql
SELECT b."Id", b."Name"
      FROM "Blogs" AS b
      WHERE b."Id" IN (
          SELECT p."BlogId"
          FROM "Posts" AS p
      )
```

Since the subquery no longer references `Blogs`, it can be evaluated once, yielding massive performance improvements on most database systems. However, some database systems, most notably SQL Server, the database is able to optimize the first query to the second query so that the performance is the same.

## Numeric rowversions for SQL Azure/SQL Server

SQL Server automatic optimistic concurrency is handled using `rowversion` columns. A `rowversion` is an 8-byte opaque value passed between database, client, and server. By default, SqlClient exposes `rowversion` types as `byte[]`, despite mutable reference types being a bad match for `rowversion` semantics. In EF8, it is easy to instead map `rowversion` columns to `long` or `ulong` properties. For example:

```csharp
modelBuilder.Entity<Blog>()
    .Property(e => e.RowVersion)
    .IsRowVersion();
```
