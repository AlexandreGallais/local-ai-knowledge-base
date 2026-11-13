---
id: architecture-structure-dotnet-solution
title: Structure of a .NET solution
topic: architecture
summary: Layers or vertical slices, module rules, CQRS written by hand without a mediator library, and when each fits. .NET 10.
tool: dotnet
version: "10"
checked: 2026-11-13
sources: [S1, S2, S3, S4]
license: MIT (own words; facts summarized from the cited sources)
variant: files
---

# Structure of a .NET solution

Contents: 1. Styles · 2. CQRS without a library · 3. Architecture tests · Sources

## 1. Styles inside one application (clean architecture or vertical slices)

| Style | Idea | Fits when | Risk |
| --- | --- | --- | --- |
| Clean architecture | Domain, Application, Infrastructure, Presentation layers; dependencies point inward | Rich domain, rules shared by features, long project | Over-engineering simple features; one feature touches several projects [S1] |
| Vertical slices | Code grouped by request or feature, from interface to data | Features of uneven complexity, small team, mostly CRUD API | Duplication; less consistency; needs a team that refactors [S1] [S2] |
| Mixed | Vertical slices inside a layered solution | The most common case in practice | — [S1] |

Rule of slices: little coupling between slices, much inside a slice. [S2] Remove every layer that only passes a call through. [S2]

## 2. CQRS without a library

- CQRS separates the write model from the read model; its simple form keeps one database; it does not fit a simple domain or a CRUD interface. [S3]
- The pattern needs no mediator: one class per command or query, called directly by the API endpoint. [S3]

```csharp
public sealed class CloseValveHandler(AppDbContext db)
{
    public async Task<Results<NoContent, NotFound>> HandleAsync(string tagName, CancellationToken cancellationToken)
    {
        Valve? valve = await db.Valves.SingleOrDefaultAsync(v => v.TagName == tagName, cancellationToken);
        if (valve is null)
        {
            return TypedResults.NotFound();
        }
        valve.Close();
        await db.SaveChangesAsync(cancellationToken);
        return TypedResults.NoContent();
    }
}

app.MapPost("/valves/{tagName}/close", (string tagName, CloseValveHandler handler, CancellationToken cancellationToken)
    => handler.HandleAsync(tagName, cancellationToken));
```

MediatR 13 and later is no longer free for every company: see `docs/dotnet/paid-packages.md`.

## 3. Architecture tests (.NET)

- Check architecture rules at each build with a test: NetArchTest (MIT) states that "types of this namespace do not depend on that one". [S4]
- Write one test per module rule: no module reads the namespace of the data of another module.

## Sources

- [S1] Milan Jovanović, "Vertical Slice Architecture vs Clean Architecture", 2026-08-13, <https://milanjovanovic.tech/blog/vertical-slice-vs-clean-architecture.md>, read 2026-11-12, summarized.
- [S2] Jimmy Bogard, "Vertical Slice Architecture", 2018-04-19, <https://www.jimmybogard.com/vertical-slice-architecture/>, read 2026-11-12, summarized.
- [S3] Microsoft, "CQRS pattern", Azure Architecture Center, <https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs>, read 2026-11-12, summarized.
- [S4] Ben Morris, "NetArchTest", README, <https://github.com/BenMorris/NetArchTest>, read 2026-11-12, MIT, summarized.
