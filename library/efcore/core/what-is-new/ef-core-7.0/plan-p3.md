---
title: "Plan for Entity Framework Core 7.0 (part 3 of 3)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/ef-core-7.0/plan.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Plan for Entity Framework Core 7.0 (part 3 of 3)

## Miscellaneous features

Tracked by issues labeled with `type-enhancement` in the 7.0 milestone

Value proposition: Continuous improvement to EF Core to meet existing and evolving application requirements.

Miscellaneous features planned for EF 7.0 include, but are not limited to:

- Issue #14545: Design: Modernize generated C#
- Issue #15762: Provide easy way to get script from latest applied on database to latest in the codebase
- Issue #16406: Fully embrace provider-specific migrations
- Issue #18844: SQLite: Translate TimeSpan members
- Issue #18950: Enable nullability in migrations and model snapshots
- Issue #18990: Use the new batching API from ADO.NET
- Issue #21615: dotnet-ef database update -1 (down latest migration)
- Issue #21995: Generate the script for all migrations that have not yet been applied to a given database
- Issue #22138: Upgrade to SpatiaLite 5
- Issue #23085: Don't check for a connection string until after ConnectionOpening has been called
- Issue #24685: Allow value converters to change nullability of columns
- Issue #25103: SQLite: Translate more DateOnly and TimeOnly members
- Issue #25872: Provide more info about a migration bundle
- Issue #26155: Sugar for getting a migration script for just the last migration
- Issue #26417: Revisit the reporting of exceptions and stack traces in logging
- Issue #26528: Register a scoped DbContext automatically when using AddPooledDbContextFactory

## Suggestions

Your feedback on planning is important. Please comment on GitHub Issue #26994 with any feedback or general suggestions about the plan. The best way to indicate the importance of an issue is to vote (👍) for that issue on GitHub. This data will then feed into the planning process for the next release.
