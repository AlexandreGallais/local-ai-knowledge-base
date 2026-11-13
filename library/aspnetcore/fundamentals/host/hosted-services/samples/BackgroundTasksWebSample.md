---
title: "ASP.NET Core background tasks web sample"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/host/hosted-services/samples/BackgroundTasksWebSample/README.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core background tasks web sample

This sample illustrates the use of `IHostedService` in a web app that uses the `Microsoft.NET.Sdk.Web` SDK. This sample demonstrates the features described in the Background tasks with hosted services in ASP.NET Core article.

Run the sample from a command shell:

```dotnetcli
dotnet run
```

Send a POST request to the `/queue` endpoint to add a work item to the background queue:

```console
curl -X POST http://localhost:5000/queue
```
