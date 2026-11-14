# Official documentation library

The official documentation of the tools, converted to plain Markdown, at a pinned version, cut into
files of 16 KB at most, with one index per tool. The AI searches it with the docs tools of the base,
then reads one section.

## Usage

From the root of the repository, with git and network access:

```sh
node scripts/fetch-library.ts                 # every tool
node scripts/fetch-library.ts --tool angular  # one tool, or a comma list
node scripts/check-library.ts                 # headers, index, 16 KB at most, notices
```

## Tools

| Tool | Documentation | Version | License | Size |
| --- | --- | --- | --- | --- |
| [csharp](csharp/index.md) | C# language: guides, language reference and what is new | 15 | CC-BY-4.0 | 1389 files, 8.3 MB |
| [dotnet-core](dotnet-core/index.md) | .NET fundamentals and runtime guides | 11 | CC-BY-4.0 | 2584 files, 9.6 MB |
| [dotnet-standard](dotnet-standard/index.md) | .NET standard library guides | 11 | CC-BY-4.0 | 1642 files, 12.7 MB |
| [aspnetcore](aspnetcore/index.md) | ASP.NET Core documentation | 11 | CC-BY-4.0 | 1903 files, 12.2 MB |
| [efcore](efcore/index.md) | Entity Framework Core documentation | 11 | CC-BY-4.0 | 503 files, 4.4 MB |
| [dotnet-api](dotnet-api/index.md) | .NET API reference: the base class library and Microsoft.Extensions, for server and console applications | 11 | CC-BY-4.0 | 4718 files, 33.9 MB |
