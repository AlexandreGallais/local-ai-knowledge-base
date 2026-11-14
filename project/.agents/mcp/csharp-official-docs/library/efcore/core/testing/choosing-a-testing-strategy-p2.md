---
title: "Choosing a testing strategy - EF Core (part 2 of 2)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/core/testing/choosing-a-testing-strategy.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Choosing a testing strategy - EF Core (part 2 of 2)

## Summary

* We recommend that developers have good test coverage of their application running against their actual production database system. This provides confidence that the application actually works in production, and with proper design, tests can execute reliably and quickly. Since these tests are required in any case, it's a good idea to start there, and if needed, add tests using test doubles later, as required.
* If you've decided to use a test double, we recommend implementing the repository pattern, which allows you to stub or mock out your data access layer above EF Core, rather than using a fake EF Core provider (Sqlite/in-memory) or by mocking `DbSet`.
* If the repository pattern isn't a viable option for some reason, consider using SQLite in-memory databases.
* Avoid the in-memory provider for testing purposes - this is discouraged and only supported for legacy applications.
* Avoid mocking `DbSet` for querying purposes.
