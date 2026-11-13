---
title: "validation-with-problem"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/validation-with-problem.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# validation-with-problem

### Minimal API Validation integration with IProblemDetailsService

Error responses from the validation logic for Minimal APIs can now be customized by an `IProblemDetailsService` implementation provided in the application services collection (Dependency Injection container). This enables more consistent and user-specific error responses.
