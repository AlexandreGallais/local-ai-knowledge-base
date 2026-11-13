---
title: "EF Core releases and planning"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/core/what-is-new/index.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# EF Core releases and planning

## Stable releases

| Release                                                                                | Target framework  | Supported until           | Links                                                                                                                                                                                  |
|----------------------------------------------------------------------------------------|-------------------|---------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| EF Core 10.0           | .NET 10           | November 10, 2028         | What's new / Breaking changes                                                      |
| EF Core 9.0            | .NET 8            | November 10, 2026         | What's new / Breaking changes                                                      |
| EF Core 8.0            | .NET 8            | November 10, 2026         | What's new / Breaking changes                                                      |
| ~~EF Core 7.0~~  | .NET 6            | Expired May 14, 2024      | What's new / Breaking changes                                                      |
| ~~EF Core 6.0~~  | .NET 6            | Expired November 12, 2024 | What's new / Breaking changes                                                      |
| ~~EF Core 5.0~~ | .NET Standard 2.1 | Expired May 10, 2022      | Announcement / Breaking changes                  |
| ~~EF Core 3.1~~ | .NET Standard 2.0 | Expired December 13, 2022 | Announcement                                                                   |
| ~~EF Core 3.0~~  | .NET Standard 2.1 | Expired March 3, 2020     | Announcement / Breaking changes |
| ~~EF Core 2.2~~  | .NET Standard 2.0 | Expired December 23, 2019 | Announcement                                                                                            |
| ~~EF Core 2.1~~ | .NET Standard 2.0 | Expired August 21, 2021*  | Announcement                                                                                            |
| ~~EF Core 2.0~~  | .NET Standard 2.0 | Expired October 1, 2018   | Announcement                                                                                            |
| ~~EF Core 1.1~~  | .NET Standard 1.3 | Expired June 27 2019      | Announcement                                                                                            |
| ~~EF Core 1.0~~  | .NET Standard 1.3 | Expired June 27 2019      | Announcement                                                                                           |

See supported platforms for information about the specific platforms supported by each EF Core release.

Entity Framework Core releases and support are aligned with .NET releases and support. See the .NET support policy for information on support expiration and long-term support (LTS) releases.

\* EF Core 2.1 will continue to be supported when used with ASP.NET Core 2.1 on .NET Framework only. See ASP.NET Support Policy for details.

## Guidance on updating to new releases

* Supported releases are patched for security and other critical bugs. Always use the latest patch of a given release. For example, for EF Core 10.0, use 10.0.x for the highest 'x' available.
* Major version updates (for example, from EF Core 9 to EF Core 10) often have breaking changes. Thorough testing is advised when updating across major versions. Use the breaking changes links above for guidance on dealing with breaking changes.
* Minor version updates do not typically contain breaking changes. However, thorough testing is still advised since new features can introduce regressions.

## Release planning and schedules

EF Core releases align with the .NET shipping schedule.

Patch releases usually ship monthly, but have a long lead time.

See the release planning process for more information on how we decide what to ship in each release. We typically don't do detailed planning for further out than the next major or minor release.

## EF Core 11.0

The next planned stable release is **EF Core 11.0**, or just **EF11**, scheduled for **November 2026**.
