---
title: "Testing against your Production Database System - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/testing/testing-with-the-database.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testing against your Production Database System - EF Core (part 2 of 2)

## Efficient database cleanup

We saw above that when changes are actually committed to the database, we must clean up the database between every test to avoid interference. In the transactional test sample above, we did this by using EF Core APIs to delete the table's contents:

```csharp
using var context = CreateContext();

context.Blogs.RemoveRange(context.Blogs);

context.AddRange(
    new Blog { Name = "Blog1", Url = "http://blog1.com" },
    new Blog { Name = "Blog2", Url = "http://blog2.com" });
context.SaveChanges();
```

This typically isn't the most efficient way to clear out a table. If test speed is a concern, you may want to use raw SQL to delete the table instead:

```sql
DELETE FROM [Blogs];
```

You may also want to consider using the respawn package, which efficiently clears out a database. In addition, it does not require you to specify the tables to be cleared, and so your cleanup code does not need to be updated as tables are added to your model.

## Summary

* When testing against a real database, it's worth distinguishing between the following test categories:
  * Read-only tests are relatively simple, and can always execute in parallel against the same database without having to worry about isolation.
  * Write tests are more problematic, but transactions can be used to make sure they're properly isolated.
  * Transactional tests are the most problematic, requiring logic to reset the database back to its original state, as well as disabling parallelization.
* Separating these test categories out into separate classes may avoid confusion and accidental interference between tests.
* Give some thought up-front to your seeded test data, and try to write your tests in a way that won't break too often if that seed data changes.
* Use multiple databases to parallelize tests which modify the database, and possibly also to allow different seed data configurations.
* If test speed is a concern, you may want to look at more efficient techniques for creating your test database, and for cleaning its data between runs.
* Always keep test parallelization and isolation in mind.
