---
id: dotnet-paid-packages
title: .NET packages that became paid
topic: dotnet
summary: AutoMapper, MediatR, MassTransit, FluentAssertions and Polly changed license; their free replacements. Checked 2026-11.
tool: dotnet
version: "11"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: MIT, written for this base; this is not legal advice
variant: files
---

# .NET packages that became paid

Contents: 1. The rule · 2. The packages · 3. Example · Sources

## 1. The rule (.NET package licenses)

- Never add AutoMapper, MediatR, MassTransit, FluentAssertions or Polly to a project without the user's agreement. Say their license first.
- In a project that already has one of them, never raise it to the version of the table below or later.
- Read the versions in `Directory.Packages.props` or in the `PackageReference` of the project.
- Licenses change often: when in doubt, say that the user must check the license of the version. This is not legal advice.

## 2. The packages (licenses checked 2026-11)

| Package | What changed | Last free version | Free replacements |
| --- | --- | --- | --- |
| AutoMapper | Version 15.0 (2025-07-02): RPL 1.5 or commercial license; free community edition under 5 million dollars of yearly revenue, with a license key | 14.x | Mapperly, Mapster, mapping written by hand |
| MediatR | Version 13.0 (2025-07-02): same terms as AutoMapper | 12.x | Mediator, Brighter, a handler interface written by hand |
| MassTransit | Version 9: commercial product, license required | 8.x | Rebus, Brighter, Wolverine |
| FluentAssertions | Version 8 (2025-01): proprietary license, paid for commercial use | 7.x (Apache 2.0) | AwesomeAssertions, Shouldly, plain `Assert` |
| Polly | Open Source Maintenance Fee for companies that earn from a product using it, from 2026-11-16; code still BSD-3-Clause | versions before that date | `Microsoft.Extensions.Http.Resilience`, which uses Polly underneath |
| Swashbuckle | No license change: removed from the project templates of .NET 9 | — | `Microsoft.AspNetCore.OpenApi` |

[S1] [S2] [S3] [S4] [S5]

## 3. Example (mapping without a paid package)

Wrong, in a new project:

```csharp
builder.Services.AddAutoMapper(typeof(Program));
var dto = mapper.Map<ValveDto>(valve);
```

Right:

```csharp
public static class ValveMapping
{
    public static ValveDto ToDto(this Valve valve) => new(valve.Tag, valve.IsOpen);
}
```

## Sources

- [S1] J. Bogard, "AutoMapper and MediatR Commercial Editions Launch Today", 2025-07-02, <https://www.jimmybogard.com/automapper-and-mediatr-commercial-editions-launch-today/>, read 2026-11-12, summarized.
- [S2] NuGet Gallery, "MassTransit 9.1.1", <https://www.nuget.org/packages/MassTransit/9.1.1>, read 2026-11-12, summarized.
- [S3] InfoQ, article on the license of Fluent Assertions 8, 2025-01-30, <https://www.infoq.com/news/2025/01/fluent-assertions-v8-license>, read 2026-11-12, summarized.
- [S4] App-vNext, "Polly", README of the repository, <https://github.com/App-vNext/Polly>, read 2026-11-12, BSD-3-Clause, summarized.
- [S5] ASP.NET Core team, "Announcement: Swashbuckle.AspNetCore is being removed in .NET 9", issue 54599, <https://github.com/dotnet/aspnetcore/issues/54599>, read 2026-11-12, summarized.
