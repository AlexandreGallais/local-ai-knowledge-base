---
title: "ASP.NET Framework to Core Authentication Migration (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/authentication.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Framework to Core Authentication Migration (part 3 of 3)

## Shared cookie authentication

If authentication in the ASP.NET app is done using `Microsoft.Owin` cookie authentication middleware, an alternative solution to remote authentication is to configure the ASP.NET and ASP.NET Core apps so that they are able to share an authentication cookie.

### How shared cookies work

Sharing an authentication cookie enables:

* Both apps to determine the user identity from the same cookie.
* Signing in or out of one app signs the user in or out of the other app.

Both applications are configured to:
* Use the same cookie name and domain settings
* Share data protection keys for cookie encryption/decryption
* Use compatible cookie authentication middleware

This allows users authenticated in one app to be automatically authenticated in the other app when they make requests.

### Shared cookie authentication pros and cons

| Pros | Cons |
|------|------|
| Best performance for shared auth | Only works with OWIN cookie auth |
| No additional HTTP requests | Requires matching data protection setup |
| Both apps can handle sign-in/sign-out | More complex initial configuration |
| Seamless user experience | Limited to cookie-based authentication |
| Lower network overhead | Requires coordination of deployments |

### Authentication limitations with shared cookies

Note that because signing in typically depends on a specific database, not all authentication functionality will work in both apps:

* Users should sign in through only one of the apps, either the ASP.NET or ASP.NET Core app, whichever the database is setup to work with.
* Both apps are able to see the users' identity and claims.
* Both apps are able to sign the user out.

Details on how to configure sharing auth cookies between ASP.NET and ASP.NET Core apps are available in cookie sharing documentation. For more information about cookie authentication in ASP.NET Core, see Use cookie authentication without ASP.NET Core Identity. For guidance on configuring `<machineKey>` and data protection when sharing protected values between Framework and Core apps, see ASP.NET machineKey to ASP.NET Core migration.

The following samples in the System.Web adapters GitHub repo demonstrates remote app authentication with shared cookie configuration enabling both apps to sign users in and out:

* ASP.NET app
* ASP.NET Core app

### When to choose shared cookie authentication

**Choose Shared Cookie Authentication when:**
* Your ASP.NET app already uses `Microsoft.Owin` cookie authentication
* You can configure matching data protection settings between both apps
* Performance is critical and you want to minimize HTTP requests
* You want both apps to handle user sign-in/sign-out operations
* You're comfortable managing shared encryption keys

Sharing authentication is a good option if both the following are true:

* The ASP.NET app is already using `Microsoft.Owin` cookie authentication.
* It's possible to update the ASP.NET app and ASP.NET Core apps to use matching data protection settings. Matching shared data protection settings includes a shared file path, Redis cache, or Azure Blob Storage for storing data protection keys. For more information, see ASP.NET Core Data Protection Overview.

For other scenarios, the remote authentication approach described previously in this doc is more flexible and is probably a better fit.

## See also

* Overview of ASP.NET Core Authentication
* Introduction to authorization in ASP.NET Core
* Share authentication cookies among ASP.NET apps
* Use cookie authentication without ASP.NET Core Identity
* ASP.NET Core middleware
* Migrate from ASP.NET Framework to ASP.NET Core
* Remote app setup
