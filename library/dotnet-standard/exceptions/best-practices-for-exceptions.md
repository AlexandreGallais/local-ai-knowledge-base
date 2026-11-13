---
title: "Best practices for exceptions (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/exceptions/best-practices-for-exceptions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for exceptions

Proper exception handling is essential for application reliability. You can intentionally handle expected exceptions to prevent your app from crashing. However, a crashed app is more reliable and diagnosable than an app with undefined behavior.

This article describes best practices for handling and creating exceptions.
