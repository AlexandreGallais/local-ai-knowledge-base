---
title: "Breaking change: Authentication: AzureAD.UI and AzureADB2C.UI APIs and packages marked obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/5/authentication-aad-packages-obsolete.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Authentication: AzureAD.UI and AzureADB2C.UI APIs and packages marked obsolete

In ASP.NET Core 2.1, integration with Azure Active Directory (Azure AD) and Azure Active Directory B2C (Azure AD B2C) authentication is provided by the Microsoft.AspNetCore.Authentication.AzureAD.UI and Microsoft.AspNetCore.Authentication.AzureADB2C.UI packages. The functionality provided by these packages is based on the Azure AD v1.0 endpoint.

In ASP.NET Core 5.0 and later, integration with Azure AD and Azure AD B2C authentication is provided by the Microsoft.Identity.Web package. This package is based on the Microsoft Identity Platform, which is formerly known as the Azure AD v2.0 endpoint. Consequently, the old APIs in the `Microsoft.AspNetCore.Authentication.AzureAD.UI` and `Microsoft.AspNetCore.Authentication.AzureADB2C.UI` packages were deprecated.

For discussion, see GitHub issue dotnet/aspnetcore#25807.

## Version introduced

5.0 Preview 8

## Old behavior

The APIs weren't marked as obsolete.

## New behavior

The APIs are marked as obsolete.

## Reason for change

The Azure AD and Azure AD B2C authentication functionality was migrated to Microsoft Authentication Library (MSAL) APIs that are provided by `Microsoft.Identity.Web`.

## Recommended action

Follow the `Microsoft.Identity.Web` API guidance for web apps and web APIs.

## Affected APIs

* Microsoft.AspNetCore.Authentication.AzureADAuthenticationBuilderExtensions
* Microsoft.AspNetCore.Authentication.AzureAD.UI.AzureADDefaults
* Microsoft.AspNetCore.Authentication.AzureAD.UI.AzureADOptions
* Microsoft.AspNetCore.Authentication.AzureADB2CAuthenticationBuilderExtensions
* Microsoft.AspNetCore.Authentication.AzureADB2C.UI.AzureADB2CDefaults
* Microsoft.AspNetCore.Authentication.AzureADB2C.UI.AzureADB2COptions
