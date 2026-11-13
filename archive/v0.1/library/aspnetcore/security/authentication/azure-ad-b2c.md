---
title: "Cloud authentication with Azure Active Directory B2C in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/azure-ad-b2c.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Cloud authentication with Azure Active Directory B2C in ASP.NET Core

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

## Recommended path for new projects

Microsoft Entra External ID for customers is the recommended customer identity and access management (CIAM) solution for new ASP.NET Core applications, replacing Azure AD B2C with the latest identity platform features.

To get started with a new project, see Sign in users in a sample ASP.NET Core web app.

## Migrate from Azure AD B2C to Entra External ID

To migrate an existing Azure AD B2C application to the newer platform, see Plan and execute a migration to Microsoft Entra External ID.

For detailed guidance on moving user accounts, including password <example-value> strategies, see Migrating users to Microsoft Entra External ID.

## Guidance for existing Azure AD B2C projects

Azure AD B2C remains supported for existing applications. Authoritative setup and configuration guidance is maintained in the Azure AD B2C documentation. The following articles cover the topics that ASP.NET Core developers typically need:

| Topic | Article |
|---|---|
| Create a tenant | Tutorial: Create an Azure AD B2C tenant |
| Register a web application | Tutorial: Register a web application in Azure AD B2C |
| Configure authentication in an ASP.NET Core app | Configure authentication in a sample ASP.NET Core web app |
| Enable multi-factor authentication | Enable MFA in Azure AD B2C |

## ASP.NET Core integration checklist

After completing identity provider setup using the Entra or Azure AD B2C documentation, complete the following ASP.NET Core-specific steps:

1. **Install NuGet packages:** Add the `Microsoft.Identity.Web` and `Microsoft.Identity.Web.UI` packages:

   ```dotnetcli
   dotnet add package Microsoft.Identity.Web
   dotnet add package Microsoft.Identity.Web.UI
   ```

1. **Configure services in `Program.cs`:** Call `AddMicrosoftIdentityWebApp` to configure OpenID Connect authentication for the Microsoft identity platform, and call `AddMicrosoftIdentityUI` to add the required sign-in/sign-out UI components. For the full API reference, see the Microsoft Identity Web documentation.

1. **Add configuration:** Add the `AzureADB2C` section in `appsettings.json` with values that match your tenant and app registration. See Configure authentication in a sample ASP.NET Core web app for the complete schema and sample.

## Related content

* Microsoft Entra External ID for customers overview
* Azure AD B2C documentation
* Customize the Azure AD B2C user interface
* Configure password <example-value> in Azure AD B2C
* Microsoft Graph API with Azure AD B2C
* Overview of ASP.NET Core Authentication
