# SEED: stack-csharp-dotnet  (STK-02, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: stack-csharp-dotnet
description: "Builds, tests and debugs .NET projects with the dotnet CLI - SDK versions, xUnit or NUnit, internal NuGet feed, analyzers. Use when working in a project with .csproj, .sln or global.json, running dotnet build, test or restore, or fixing C# compiler or analyzer errors."
metadata:
  id: STK-02
  stars: "4"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/stack-playbook.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed SDKs and the version pinned by global.json.
- [ ] Restore, build, test commands; running one test with --filter.
- [ ] Internal NuGet feed configuration.
- [ ] Analyzers and warnings as errors as configured (Directory.Build.props).
- [ ] Debugging (netcoredbg or the editor) and reading test output.

## Known pitfalls to confirm or drop

- global.json pins an SDK that is not installed.
- Nullable warnings ignored then promoted to errors in CI.
- dotnet test without --no-build rebuilds every time.

## MCP servers and example queries

- csharp-official-docs: dotnet test --filter, global.json rollForward, nullable warnings
