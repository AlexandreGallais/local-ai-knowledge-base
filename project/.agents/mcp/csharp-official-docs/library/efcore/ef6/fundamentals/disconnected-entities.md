---
title: "Working with disconnected entities - EF6"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/disconnected-entities/index.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Working with disconnected entities

In an Entity Framework-based application, a context class is responsible for detecting changes applied to tracked entities. Calling the SaveChanges method persists the changes tracked by the context to the database. When working with n-tier applications, entity objects are usually modified while disconnected from the context, and you must decide how to track changes and report those changes back to the context. This topic discusses different options that are available when using Entity Framework with disconnected entities.

## Web service frameworks

Web services technologies typically support patterns that can be used to persist changes on individual disconnected objects. For example, ASP.NET Web API allows you to code controller actions that can include calls to EF to persist changes made to an object on a database. In fact, the Web API tooling in Visual Studio makes it easy to scaffold a Web API controller from your Entity Framework 6 model. For more information, see using Web API with Entity Framework 6.

Historically, there have been several other Web services technologies that offered integration with Entity Framework, like WCF Data Services and RIA Services.

## Low-level EF APIs

If you don't want to use an existing n-tier solution, or if you want to customize what happens inside a controller action in a Web API services, Entity Framework provides APIs that allow you to apply changes made on a disconnected tier. For more information, see Add, Attach, and entity state.

## Self-Tracking Entities

Tracking changes on arbitrary graphs of entities while disconnected from the EF context is a hard problem. One of the attempts to solve it was the Self-Tracking Entities code generation template. This template generates entity classes that contain logic to track changes made on a disconnected tier as state in the entities themselves. A set of extension methods is also generated to apply those changes to a context.

This template can be used with models created using the EF Designer, but can not be used with Code First models. For more information, see Self-Tracking Entities.

> **Important:**
> We no longer recommend using the self-tracking-entities template. It will only continue to be available to support existing applications. If your application requires working with disconnected graphs of entities, consider other alternatives such as Trackable Entities, which is a technology similar to Self-Tracking-Entities that is more actively developed by the community, or writing custom code using the low-level change tracking APIs.
