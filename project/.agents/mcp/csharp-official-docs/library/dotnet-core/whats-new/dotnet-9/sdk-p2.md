---
title: "What's new in the SDK and tooling for .NET 9 (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-9/sdk.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in the SDK and tooling for .NET 9 (part 2 of 2)

## Code analysis

.NET 9 includes several new code analyzers and fixers to help verify that you're using .NET library APIs correctly and efficiently. The following table summarizes the new analyzers.

| Rule ID | Category | Description |
|---------|----------|-------------|
| CA1514: Avoid redundant length argument | Maintainability | An explicitly calculated length argument can be error-prone and is unnecessary when you're slicing to the end of a string or buffer. |
| CA1515: Consider making public types internal | Maintainability | Types inside an executable assembly should be declared as `internal`. |
| CA1871: Do not pass a nullable struct to 'ArgumentNullException.ThrowIfNull' | Performance | For improved performance, it's better to check the `HasValue` property and manually throw an exception than to pass a nullable struct to `ArgumentNullException.ThrowIfNull`. |
| CA1872: Prefer 'Convert.ToHexString' and 'Convert.ToHexStringLower' over call chains based on 'BitConverter.ToString' | Performance | Use `System.Convert.ToHexString*` or `System.Convert.ToHexStringLower*` when encoding bytes to a hexadecimal string representation. |
| CA2022: Avoid inexact read with Stream.Read | Reliability | A call to `Stream.Read` might return fewer bytes than requested, resulting in unreliable code if the return value isn't checked. |
| CA2262: Set 'MaxResponseHeadersLength' properly | Usage | The `System.Net.Http.HttpClientHandler.MaxResponseHeadersLength` property is measured in kilobytes, not bytes. |
| CA2263: Prefer generic overload when type is known | Usage | Generic overloads are preferable to overloads that accept an argument of type `System.Type` when the type is known at compile time. |
| CA2264: Do not pass a non-nullable value to 'ArgumentNullException.ThrowIfNull' | Usage | Certain constructs like non-nullable structs (except for `System.Nullable`1`), 'nameof()' expressions, and 'new' expressions are known to never be null, so `ArgumentNullException.ThrowIfNull` will never throw. |
| CA2265: Do not compare `Span<T>` to null or default | Usage | Comparing a span to `null` or `default` might not do what you intended. `default` and the `null` literal are implicitly converted to `System.Span`1.Empty`. Remove the redundant comparison or make the code more explicit by using `IsEmpty`. |
