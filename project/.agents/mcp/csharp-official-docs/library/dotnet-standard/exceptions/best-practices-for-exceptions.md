---
title: "Best practices for exceptions (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/exceptions/best-practices-for-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Best practices for exceptions

Proper exception handling is essential for application reliability. You can intentionally handle expected exceptions to prevent your app from crashing. However, a crashed app is more reliable and diagnosable than an app with undefined behavior.

This article describes best practices for handling and creating exceptions.
