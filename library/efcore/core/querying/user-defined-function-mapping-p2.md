---
title: "User-defined function mapping - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/querying/user-defined-function-mapping.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# User-defined function mapping - EF Core (part 2 of 2)

## Mapping a queryable function to a table-valued function

EF Core also supports mapping to a table-valued function using a user-defined CLR method returning an `IQueryable` of entity types, allowing EF Core to map TVFs with parameters. The process is similar to mapping a scalar user-defined function to a SQL function: we need a TVF in the database, a CLR function that is used in the LINQ queries, and a mapping between the two.

As an example, we'll use a table-valued function that returns all posts having at least one comment that meets a given "Like" threshold:

```sql
CREATE FUNCTION dbo.PostsWithPopularComments(@likeThreshold int)
RETURNS TABLE
AS
RETURN
(
    SELECT [p].[PostId], [p].[BlogId], [p].[Content], [p].[Rating], [p].[Title]
    FROM [Posts] AS [p]
    WHERE (
        SELECT COUNT(*)
        FROM [Comments] AS [c]
        WHERE ([p].[PostId] = [c].[PostId]) AND ([c].[Likes] >= @likeThreshold)) > 0
)
```

The CLR method signature is as follows:

```csharp
public IQueryable<Post> PostsWithPopularComments(int likeThreshold)
    => FromExpression(() => PostsWithPopularComments(likeThreshold));
```

> **Tip:**
> The `FromExpression` call in the CLR function body allows for the function to be used instead of a regular DbSet.

And below is the mapping:

```csharp
modelBuilder.Entity<Post>().ToTable("Posts");
modelBuilder.HasDbFunction(typeof(BloggingContext).GetMethod(nameof(PostsWithPopularComments), [typeof(int)]));
```

> **Note:**
> A queryable function must be mapped to a table-valued function. `HasTranslation` supports scalar functions only and can't be used for a table-valued function.

When the function is mapped, the following query:

```csharp
var likeThreshold = 3;
var query5 = from p in context.PostsWithPopularComments(likeThreshold)
             orderby p.Rating
             select p;
```

Produces:

```sql
SELECT [p].[PostId], [p].[BlogId], [p].[Content], [p].[Rating], [p].[Title]
FROM [dbo].[PostsWithPopularComments](@likeThreshold) AS [p]
ORDER BY [p].[Rating]
```
