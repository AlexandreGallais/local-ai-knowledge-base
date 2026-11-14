---
title: "Session in ASP.NET Core (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/app-state.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Session and state management in ASP.NET Core

By Rick Anderson, Kirk Larkin, and Diana LaRose

HTTP is a stateless protocol. By default, HTTP requests are independent messages that don't retain user values. This article describes several approaches to preserve user data between requests.

For Blazor state management guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor state management overview.

## State management

State can be stored using several approaches. Each approach is described later in this article.

| Storage approach | Storage mechanism |
| ---------------- | ----------------- |
| Cookies | HTTP cookies. May include data stored using server-side app code. |
| Session state | HTTP cookies and server-side app code |
| TempData | HTTP cookies or session state |
| Query strings | HTTP query strings |
| Hidden fields | HTTP form fields |
| HttpContext.Items | Server-side app code |
| Cache | Server-side app code |

## SignalR/Blazor Server and HTTP context-based state management

SignalR apps shouldn't use session state and other state management approaches that rely upon a stable HTTP context to store information. SignalR apps can store per-connection state in `Context.Items` in the hub. For more information and alternative state management approaches for Blazor Server apps, see ASP.NET Core Blazor state management overview and ASP.NET Core Blazor server-side state management.

## Cookies

Cookies store data across requests. Because cookies are sent with every request, their size should be kept to a minimum. Ideally, only an identifier should be stored in a cookie with the data stored by the app. Most browsers restrict cookie size to 4096 bytes. Only a limited number of cookies are available for each domain.

Because cookies are subject to tampering, they must be validated by the app. Cookies can be deleted by users and expire on clients. However, cookies are generally the most durable form of data persistence on the client.

Cookies are often used for personalization, where content is customized for a known user. The user is only identified and not authenticated in most cases. The cookie can store the user's name, account name, or unique user ID such as a GUID. The cookie can be used to access the user's personalized settings, such as their preferred website background color.

See the European Union General Data Protection Regulations (GDPR) when issuing cookies and dealing with privacy concerns. For more information, see General Data Protection Regulation (GDPR) support in ASP.NET Core.
