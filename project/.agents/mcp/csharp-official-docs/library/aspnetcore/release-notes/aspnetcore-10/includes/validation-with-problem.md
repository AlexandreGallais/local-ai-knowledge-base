---
title: "validation-with-problem"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10/includes/validation-with-problem.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# validation-with-problem

### Minimal API Validation integration with IProblemDetailsService

Error responses from the validation logic for Minimal APIs can now be customized by an `IProblemDetailsService` implementation provided in the application services collection (Dependency Injection container). This enables more consistent and user-specific error responses.
