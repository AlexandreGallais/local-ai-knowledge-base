---
id: maintenance-update-a-tool
title: Update the documents of a tool to a new version
topic: maintenance
summary: Step-by-step procedure to update the documents of a tool to a new major version, Angular and .NET each November.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base
variant: files
---

# Update the documents of a tool to a new version

Contents: 1. When · 2. Angular sources · 3. .NET sources · 4. Steps · 5. Played on Angular 21 to 22 · Sources

## 1. When to run this procedure (version check)

- A new major version of a tool comes out: Angular in May or June, .NET in November.
- Or `node scripts/check-versions.ts <project>` lists documents that are behind a project.

Update one tool at a time. A person with web access gathers the sources; the AI writes from the texts they give. [S1]

## 2. Sources to read, in this order (Angular)

1. The release notes `<N>.0.0` of the `angular/angular` repository: "Breaking Changes", "Deprecations", the list of features.
2. The release notes `<N>.0.0` of the `angular/angular-cli` repository: Node.js, builders, tests, migrations.
3. The announcement "Announcing Angular vN", N being the new version: what became stable, new syntax.
4. The "Version compatibility" page: Node.js, TypeScript, RxJS ranges.
5. The "Versioning and releases" page: dates of support.
6. The rules for models of the new version: `@angular/core/resources/best-practices.md` in the installed package.
7. The "Migrations" page, and the release notes of the minor versions since `.0`.

The announcement alone is not enough: it lists neither the breaking changes nor the migrations. [S1]

## 3. Sources to read each November (.NET)

1. The .NET support policy: release date, LTS or STS, end of support.
2. "C# language versioning": the new line "target framework → C# version".
3. "What's new in C# N" and the compiler breaking changes: rows "old → new", keyword pitfalls.
4. "Breaking changes in .NET N", then "What's new in .NET N" (libraries, SDK).
5. "What's new" and "Breaking changes" of ASP.NET Core N and of EF Core N.
6. `docs/dotnet/paid-packages.md`: check each license again; licenses change outside November too.

Update `docs/dotnet/` and `docs/csharp-analysis/`, then pass again three months later: the breaking change pages of .NET are often incomplete at release. [S1]

## 4. Steps (any tool)

1. Sort each point of the sources into one of five boxes: breaks; changes a default; deprecated; new stable API that replaces an old one; automatic migration. Drop the rest.
2. Write the document `v<N>-changes.md` of the topic with the `write-base-document` skill: one section per box, a wrong and a right example for the riskiest points.
3. Update the cumulative table (`old-to-new.md` for Angular): add the new rows; change the state of old patterns ("Still works", then "Deprecated in N", then "Removed in N").
4. Search the whole base for each API that was removed or deprecated: `grep -rn "<name>" docs templates .agents`. Rewrite only the sections found. Move the old form to "Old patterns".
5. In every document changed: set `version` to the new major version and `checked` to the date of the review. Update the index line and the French summary of the topic.
6. Run `node scripts/check-base.ts`, then `node scripts/check-versions.ts <project at version N>`: it must list no document of this tool.
7. Compile and lint the examples in a project at version N. Commit one tool per commit.

## 5. Played on Angular 21 to 22 (Angular 22 update)

- Trigger: Angular 22 came out on 2026-06-03.
- Sorting gave about fifteen "breaks", three "defaults", four "deprecated", five "new stable APIs" and eight "migrations".
- Written: `docs/angular/v22-changes.md`. In `docs/angular/old-to-new.md`: rows for OnPush by default, `@Service()`, `resource`, Signal Forms and `withFetch`; `ComponentFactoryResolver` and `provideRoutes()` moved to "Removed in 22"; `version` from 21 to 22.
- Searched in the base: `ChangeDetectionStrategy.OnPush`, `ChangeDetectionStrategy.Default`, `providedIn: 'root'`, `withFetch`, `ComponentFactoryResolver`, `provideRoutes`, `[field]`. Found in `docs/typescript-lint/angular-components-v22.md`: the service example now uses `@Service()`.
- Checked: the new APIs exist in the types of `@angular/core` 22.2.6; the version check lists no Angular document for a project in Angular 22. [S2]

## Sources

- [S1] Research reports "What changed in Angular and TypeScript" and "What changed in C# and .NET" of this project, sections on the update procedure, 2026-11-12.
- [S2] Types of `@angular/core` 22.2.6 and the tests of this base (`scripts/check-versions.test.ts`), 2026-11-13.
