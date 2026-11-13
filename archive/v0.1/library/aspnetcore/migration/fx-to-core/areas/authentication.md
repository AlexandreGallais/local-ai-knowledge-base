---
title: "ASP.NET Framework to Core Authentication Migration (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/migration/fx-to-core/areas/authentication.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Migrate ASP.NET Framework Authentication to ASP.NET Core

Authentication is a critical component of web applications, handling user identity verification across HTTP requests. When migrating from ASP.NET Framework to ASP.NET Core, authentication presents unique challenges because the two frameworks handle authentication very differently.

For general information about authentication in ASP.NET Core, see Overview of ASP.NET Core Authentication. For information about authorization, see Introduction to authorization in ASP.NET Core.

## Why authentication migration is complex

ASP.NET Framework and ASP.NET Core have fundamentally different approaches to authentication:

* **ASP.NET Framework** provides built-in authentication modules with automatic configuration and tight integration with System.Web
* **ASP.NET Core** uses a middleware-based approach with explicit configuration and dependency injection

These differences mean you can't simply move your authentication code from Framework to Core without changes.

## Authentication types and migration challenges

Different authentication types present varying levels of migration complexity:

### Cookie-based authentication

* **ASP.NET Framework**: Uses `Microsoft.Owin` cookie authentication middleware
* **ASP.NET Core**: Uses `CookieAuthentication` middleware with different configuration
* **Migration challenge**: Cookie format, encryption keys, and configuration differences

### JWT bearer <example-value>

* **ASP.NET Framework**: Often handled through custom modules or OWIN middleware
* **ASP.NET Core**: Native support through `Microsoft.AspNetCore.Authentication.JwtBearer`
* **Migration challenge**: Token <example-value> parameter differences and middleware registration

### Windows authentication

* **ASP.NET Framework**: Built-in IIS integration
* **ASP.NET Core**: Requires explicit configuration and may need hosting model changes
* **Migration challenge**: Server configuration and authentication flow differences

### Forms authentication

* **ASP.NET Framework**: Built-in `System.Web.Security.FormsAuthentication`
* **ASP.NET Core**: No direct equivalent, requires migration to cookie authentication
* **Migration challenge**: Complete authentication system rewrite needed

### Custom authentication

* **ASP.NET Framework**: Custom modules implementing `IHttpModule`
* **ASP.NET Core**: Custom middleware or authentication handlers
* **Migration challenge**: Complete architecture change from modules to middleware

## Migration strategies overview

You have three main approaches for handling authentication during migration:

1. **Complete rewrite** - Rewrite all authentication code to use ASP.NET Core's native authentication
2. **Remote authentication** - Use System.Web adapters to delegate authentication to the ASP.NET Framework app
3. **Shared cookie authentication** - Share authentication cookies between Framework and Core applications (for OWIN-based scenarios)

For most applications, migrating to native ASP.NET Core authentication provides the best performance and maintainability. However, larger applications or those with complex authentication requirements may benefit from an incremental approach using the System.Web adapters.

## Choose your migration approach

You have three main options for migrating authentication from ASP.NET Framework to ASP.NET Core. Your choice depends on your authentication type, migration timeline, whether you need to run both applications simultaneously, and how much code you're willing to rewrite.

### Quick decision guide

**Answer these questions to choose your approach:**

1. **Are you doing a complete rewrite or incremental migration?**
   * Complete rewrite → Complete rewrite to ASP.NET Core authentication
   * Incremental migration → Continue to question 2

2. **What type of authentication does your ASP.NET Framework app use?**
   * OWIN cookie authentication → Continue to question 3
   * Forms authentication, JWT bearer <example-value>, Windows auth, or Custom authentication → Remote authentication

3. **Do both your ASP.NET Framework and ASP.NET Core apps need to access the same authentication state?**
   * Yes, shared authentication needed → Continue to question 4
   * No, separate authentication is fine → Complete rewrite to ASP.NET Core authentication

4. **Can you configure matching data protection settings between both apps?**
   * Yes → Shared cookie authentication (see Alternatives section, best performance)
   * No or unsure → Remote authentication

### Migration approaches comparison

| Approach | Code Changes | Performance | Auth Sharing | When to Use |
|----------|-------------|-------------|--------------|-------------|
| **Complete rewrite** | High - Rewrite all auth code | Best | None | Complete rewrites, performance-critical apps, non-OWIN auth |
| **Remote authentication** | Low - Keep existing patterns | Fair | Full | Incremental migrations, complex auth, Windows auth |
| **Shared cookies** | Medium - Update configuration | Good | Full | OWIN cookie auth, performance-critical shared auth (see Alternatives) |

## Complete rewrite to ASP.NET Core authentication

Choose this approach when you're performing a complete migration, have non-OWIN authentication, or want the best performance and maintainability.

ASP.NET Core provides comprehensive authentication support with high performance and extensive customization options. This approach requires rewriting authentication code but offers the most benefits in the long term.

### Complete rewrite pros and cons

| Pros | Cons |
|------|------|
| Best performance and security | Requires rewriting all authentication code |
| Native ASP.NET Core implementation | No automatic migration path |
| Full control over authentication flow | Learning curve for new authentication patterns |
| No additional dependencies | Breaking change from Framework patterns |
| Access to latest ASP.NET Core auth features | Potential downtime during migration |

### Migration considerations

When migrating to native ASP.NET Core authentication:

**Choose based on your Framework authentication type:**
* **Forms authentication** → Migrate to Cookie authentication
* **JWT bearer <example-value>** → Migrate to JWT bearer <example-value>
* **Windows authentication** → Use Windows authentication
* **OWIN OAuth providers** → Use corresponding ASP.NET Core OAuth providers
* **Custom authentication** → Implement custom authentication handlers

**Code changes required:**
* Replace `HttpContext.User` access patterns (mostly compatible)
* Update authentication middleware registration in `Program.cs`
* Migrate custom authentication logic to ASP.NET Core patterns
* Update authorization attributes and policies

**When to choose this approach:**
* You can afford to rewrite authentication-related code
* Performance is a top priority
* You're not sharing authentication state with legacy applications
* You want to eliminate System.Web dependencies completely
* Your Framework app uses Forms authentication, custom modules, or JWT tokens
