---
title: "No-Tracking Queries - EF6"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/querying/no-tracking.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# No-Tracking Queries
Sometimes you may want to get entities back from a query but not have those entities be tracked by the context. This may result in better performance when querying for large numbers of entities in read-only scenarios. The techniques shown in this topic apply equally to models created with Code First and the EF Designer.

A new extension method AsNoTracking allows any query to be run in this way. For example:

```csharp
using (var context = new BloggingContext())
{
    // Query for all blogs without tracking them
    var blogs1 = context.Blogs.AsNoTracking();

    // Query for some blogs without tracking them
    var blogs2 = context.Blogs
                        .Where(b => b.Name.Contains(".NET"))
                        .AsNoTracking()
                        .ToList();
}
```
