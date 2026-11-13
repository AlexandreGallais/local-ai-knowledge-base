---
title: "responseDescProducesResponseType"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-10/includes/responseDescProducesResponseType.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# responseDescProducesResponseType

### Response description on `ProducesResponseType` for API controllers

The `Microsoft.AspNetCore.Mvc.ProducesAttribute`, `Microsoft.AspNetCore.Mvc.ProducesResponseTypeAttribute`, and `Microsoft.AspNetCore.Mvc.ProducesDefaultResponseTypeAttribute` now accept an optional string parameter, `Description`, that sets the description of the response:

```csharp
[HttpGet(Name = "GetWeatherForecast")]
[ProducesResponseType<IEnumerable<WeatherForecast>>(StatusCodes.Status200OK,
    Description = "The weather forecast for the next 5 days.")]
public IEnumerable<WeatherForecast> Get()
{
```

Generated OpenAPI data:

```json
"responses": {
  "200": {
    "description": "The weather forecast for the next 5 days.",
    "content": {
```

This functionality is supported in both API controllers and Minimal APIs. For Minimal APIs, the `Description` property is correctly set even when the attribute's type and the inferred return type aren't an exact match.

Community contribution (`dotnet/aspnetcore` #58193) by Sander ten Brinke.
