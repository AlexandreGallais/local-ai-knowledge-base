---
title: "Testing an ASP.NET Core web app with Testcontainers (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/testcontainers-dotnet-aspnet-core.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Testing an ASP.NET Core web app with Testcontainers (part 2 of 2)

## Run tests and next steps

### Run the tests

Run the tests from the solution root:

```console
$ dotnet test ./RazorPagesProject.sln
```

The first run may take longer because Docker needs to pull the Microsoft SQL
Server image. On subsequent runs, the image is cached locally.

You should see xUnit discover and run the tests, including the
`MsSqlTests.IndexPageTests` class. Testcontainers starts a SQL Server
container, the tests execute against it, and the container is stopped and
removed automatically after the tests finish.

### Summary

By replacing SQLite with a Testcontainers-managed Microsoft SQL Server
instance, the integration tests run against the same type of database used in
production. This approach catches database-specific issues early, such as
differences in SQL dialect, transaction behavior, or data type handling between
SQLite and SQL Server.

The `MsSqlTests` class uses `IAsyncLifetime` to manage the container lifecycle,
and a nested `CustomWebApplicationFactory` wires the container's connection
string into the application's service configuration. You can apply this same
pattern to any database or service that Testcontainers supports.

To learn more about Testcontainers, visit the
Testcontainers overview.

### Further reading

- Testcontainers for .NET documentation
- Testcontainers for .NET modules
- Microsoft SQL Server module
- Integration tests in ASP.NET Core
