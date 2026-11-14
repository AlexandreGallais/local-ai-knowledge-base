---
title: "Breaking change: Obsoleted and removed APIs"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/obsolete-removed-apis.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Obsoleted and removed APIs

Several APIs have been either removed or marked as obsolete.

## Version introduced

ASP.NET Core 6.0

## Old behavior

In ASP.NET Core 5.0 and previous versions, the APIs weren't removed or obsolete.

## New behavior

The APIs are removed or obsoleted.

## Reason for change

The APIs are either no longer used or don't function anymore.

## Recommended action

Use the recommended replacement APIs.

## Affected APIs

* Removed Microsoft.AspNetCore.Http.Connections.NegotiateProtocol.ParseResponse. Use `Microsoft.AspNetCore.Http.Connections.NegotiateProtocol.ParseResponse(System.ReadOnlySpan{System.Byte})` instead.
* Removed Microsoft.AspNetCore.SignalR.HubInvocationContext. Use `Microsoft.AspNetCore.SignalR.HubInvocationContext.#ctor(Microsoft.AspNetCore.SignalR.HubCallerContext,System.IServiceProvider,Microsoft.AspNetCore.SignalR.Hub,System.Reflection.MethodInfo,System.Collections.Generic.IReadOnlyList{System.Object})` instead.
* Removed Microsoft.AspNetCore.Http.Features.IHttpBufferingFeature. Use `Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature` instead.
* Removed Microsoft.AspNetCore.Http.Features.IHttpSendFileFeature. Use `Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature` instead.
* Removed argument-less constructor of Microsoft.AspNetCore.StaticFiles.StaticFileResponseContext. Use `Microsoft.AspNetCore.StaticFiles.StaticFileResponseContext.#ctor(Microsoft.AspNetCore.Http.HttpContext,Microsoft.Extensions.FileProviders.IFileInfo)` instead.
* Removed the constructor Microsoft.AspNetCore.Mvc.Infrastructure.ObjectResultExecutor. Use `Microsoft.AspNetCore.Mvc.Infrastructure.ObjectResultExecutor.#ctor(Microsoft.AspNetCore.Mvc.Infrastructure.OutputFormatterSelector,Microsoft.AspNetCore.Mvc.Infrastructure.IHttpResponseStreamWriterFactory,Microsoft.Extensions.Logging.ILoggerFactory,Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Mvc.MvcOptions})` instead.
* Removed Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor.AllowShortCircuitingValidationWhenNoValidatorsArePresent.
* Removed Microsoft.AspNetCore.Mvc.ViewFeatures.ViewComponentResultExecutor. Use `Microsoft.AspNetCore.Mvc.ViewFeatures.ViewComponentResultExecutor.#ctor(Microsoft.Extensions.Options.IOptions{Microsoft.AspNetCore.Mvc.MvcViewOptions},Microsoft.Extensions.Logging.ILoggerFactory,System.Text.Encodings.Web.HtmlEncoder,Microsoft.AspNetCore.Mvc.ModelBinding.IModelMetadataProvider,Microsoft.AspNetCore.Mvc.ViewFeatures.ITempDataDictionaryFactory,Microsoft.AspNetCore.Mvc.Infrastructure.IHttpResponseStreamWriterFactory)` instead.
* Obsoleted CompatibilityVersion.
