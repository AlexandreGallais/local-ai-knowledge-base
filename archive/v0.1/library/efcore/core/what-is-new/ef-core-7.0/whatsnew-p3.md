---
title: "What's New in EF Core 7.0 (part 3 of 16)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/whatsnew.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# What's New in EF Core 7.0 (part 3 of 16)

### Queries into JSON columns

Queries into JSON columns work just the same as querying into any other aggregate type in EF Core. That is, just use LINQ! Here are some examples.

A query for all authors that live in Chigley:

```csharp
var authorsInChigley = await context.Authors
    .Where(author => author.Contact.Address.City == "Chigley")
    .ToListAsync();
```

This query generates the following SQL when using SQL Server:

```sql
SELECT [a].[Id], [a].[Name], JSON_QUERY([a].[Contact],'$')
FROM [Authors] AS [a]
WHERE CAST(JSON_VALUE([a].[Contact],'$.Address.City') AS nvarchar(max)) = N'Chigley'
```

Notice the use of `JSON_VALUE` to get the `City` from the `Address` inside the JSON document.

`Select` can be used to extract and project elements from the JSON document:

```csharp
var postcodesInChigley = await context.Authors
    .Where(author => author.Contact.Address.City == "Chigley")
    .Select(author => author.Contact.Address.Postcode)
    .ToListAsync();
```

This query generates the following SQL:

```sql
SELECT CAST(JSON_VALUE([a].[Contact],'$.Address.Postcode') AS nvarchar(max))
FROM [Authors] AS [a]
WHERE CAST(JSON_VALUE([a].[Contact],'$.Address.City') AS nvarchar(max)) = N'Chigley'
```

Here's an example that does a bit more in the filter and projection, and also orders by the phone number in the JSON document:

```csharp
var orderedAddresses = await context.Authors
    .Where(
        author => (author.Contact.Address.City == "Chigley"
                   && author.Contact.Phone != null)
                  || author.Name.StartsWith("D"))
    .OrderBy(author => author.Contact.Phone)
    .Select(
        author => author.Name + " (" + author.Contact.Address.Street
                  + ", " + author.Contact.Address.City
                  + " " + author.Contact.Address.Postcode + ")")
    .ToListAsync();
```

This query generates the following SQL:

```sql
SELECT (((((([a].[Name] + N' (') + CAST(JSON_VALUE([a].[Contact],'$.Address.Street') AS nvarchar(max))) + N', ') + CAST(JSON_VALUE([a].[Contact],'$.Address.City') AS nvarchar(max))) + N' ') + CAST(JSON_VALUE([a].[Contact],'$.Address.Postcode') AS nvarchar(max))) + N')'
FROM [Authors] AS [a]
WHERE (CAST(JSON_VALUE([a].[Contact],'$.Address.City') AS nvarchar(max)) = N'Chigley' AND CAST(JSON_VALUE([a].[Contact],'$.Phone') AS nvarchar(max)) IS NOT NULL) OR ([a].[Name] LIKE N'D%')
ORDER BY CAST(JSON_VALUE([a].[Contact],'$.Phone') AS nvarchar(max))
```

And when the JSON document contains collections, then these can be projected out in the results:

```csharp
var postsWithViews = await context.Posts.Where(post => post.Metadata!.Views > 3000)
    .AsNoTracking()
    .Select(
        post => new
        {
            post.Author!.Name, post.Metadata!.Views, Searches = post.Metadata.TopSearches, Commits = post.Metadata.Updates
        })
    .ToListAsync();
```

This query generates the following SQL:

```sql
SELECT [a].[Name], CAST(JSON_VALUE([p].[Metadata],'$.Views') AS int), JSON_QUERY([p].[Metadata],'$.TopSearches'), [p].[Id], JSON_QUERY([p].[Metadata],'$.Updates')
FROM [Posts] AS [p]
LEFT JOIN [Authors] AS [a] ON [p].[AuthorId] = [a].[Id]
WHERE CAST(JSON_VALUE([p].[Metadata],'$.Views') AS int) > 3000
```

> **Note:**
> More complex queries involving JSON collections require `jsonpath` support. Vote for Support jsonpath querying if this is something you are interested in.

> **Tip:**
> Consider creating indexes to improve query performance in JSON documents. For example, see Index Json data when using SQL Server.

### Updating JSON columns

`SaveChanges` and `SaveChangesAsync` work in the normal way to make updates to a JSON column. For extensive changes, the entire document will be updated. For example, replacing most of the `Contact` document for an author:

```csharp
var jeremy = await context.Authors.SingleAsync(author => author.Name.StartsWith("Jeremy"));

jeremy.Contact = new() { Address = new("2 Riverside", "Trimbridge", "TB1 5ZS", "UK"), Phone = "01632 88346" };

await context.SaveChangesAsync();
```

In this case, the entire new document is passed as a parameter:

```text
info: 8/30/2022 20:21:24.392 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (2ms) [Parameters=[@p0='{"Phone":"01632 88346","Address":{"City":"Trimbridge","Country":"UK","Postcode":"TB1 5ZS","Street":"2 Riverside"}}' (Nullable = false) (Size = 114), @p1='2'], CommandType='Text', CommandTimeout='30']
```

Which is then used in the `UPDATE` SQL:

```sql
UPDATE [Authors] SET [Contact] = @p0
OUTPUT 1
WHERE [Id] = @p1;
```

However, if only a sub-document is changed, then EF Core will use a `JSON_MODIFY` command to update only the sub-document. For example, changing the `Address` inside a `Contact` document:

```csharp
var brice = await context.Authors.SingleAsync(author => author.Name.StartsWith("Brice"));

brice.Contact.Address = new("4 Riverside", "Trimbridge", "TB1 5ZS", "UK");

await context.SaveChangesAsync();
```

Generates the following parameters:

```text
info: 10/2/2022 15:51:15.895 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (2ms) [Parameters=[@p0='{"City":"Trimbridge","Country":"UK","Postcode":"TB1 5ZS","Street":"4 Riverside"}' (Nullable = false) (Size = 80), @p1='5'], CommandType='Text', CommandTimeout='30']
```

Which is used in the `UPDATE` via a `JSON_MODIFY` call:

```sql
UPDATE [Authors] SET [Contact] = JSON_MODIFY([Contact], 'strict $.Address', JSON_QUERY(@p0))
OUTPUT 1
WHERE [Id] = @p1;
```

Finally, if only a single property is changed, then EF Core will again use a "JSON_MODIFY" command, this time to patch only the changed property value. For example:

```csharp
var arthur = await context.Authors.SingleAsync(author => author.Name.StartsWith("Arthur"));

arthur.Contact.Address.Country = "United Kingdom";

await context.SaveChangesAsync();
```

Generates the following parameters:

```text
info: 10/2/2022 15:54:05.112 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command)
      Executed DbCommand (2ms) [Parameters=[@p0='["United Kingdom"]' (Nullable = false) (Size = 18), @p1='4'], CommandType='Text', CommandTimeout='30']
```

Which are again used with a `JSON_MODIFY`:

```sql
UPDATE [Authors] SET [Contact] = JSON_MODIFY([Contact], 'strict $.Address.Country', JSON_VALUE(@p0, '$[0]'))
OUTPUT 1
WHERE [Id] = @p1;
```
