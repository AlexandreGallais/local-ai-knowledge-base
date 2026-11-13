---
title: "Articles based on ASP.NET Core projects created with individual accounts"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/individual.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Articles based on ASP.NET Core projects created with individual accounts

ASP.NET Core Identity is included in project templates in Visual Studio with the "Individual Accounts" option.

The authentication templates are available in .NET CLI with `-au Individual`:

```dotnetcli
dotnet new mvc -au Individual
dotnet new webapp -au Individual
```

For more information about web API authentication, see this GitHub issue.

## No Authentication

Specify authentication in the .NET CLI with the `-au` option. In Visual Studio, new web applications include the **Change Authentication** dialog. The default for new web apps in Visual Studio is **No Authentication**.

Projects created with no authentication:

* Don't contain web pages and UI to sign in and sign out.
* Don't contain authentication code.

## Windows Authentication

Specify Windows Authentication for new web apps in the .NET CLI with the `-au Windows` option. In Visual Studio, the **Change Authentication** dialog provides the **Windows Authentication** options.

If you select Windows Authentication, the app uses the Windows Authentication IIS module. Windows Authentication is intended for Intranet web sites.

## dotnet new webapp authentication options

The following table shows the authentication options available for new web apps.

| Option | Type of authentication | Link for more information |
 | ----------------- | ------------ | ---------- |
| None            |  No authentication. | |
| Individual      |  Individual authentication. | Introduction to Identity on ASP.NET Core
| IndividualB2C   |  Cloud-hosted individual authentication with Azure AD B2C. | Azure AD B2C |
| SingleOrg       |  Organizational authentication for a single tenant. Entra External ID tenants also use SingleOrg.| Entra ID |
| MultiOrg        |  Organizational authentication for multiple tenants. | Entra ID |
| Windows         |  Windows authentication. | Windows Authentication

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

## Visual Studio new webapp authentication options

The following table shows the authentication options available when creating a new web app with Visual Studio.

| Option | Type of authentication | Link for more information |
 | ----------------- | ------------ | ---------- |
| None            |  No authentication | |
| Individual Accounts / Store user accounts in-app |  Individual authentication | Introduction to Identity on ASP.NET Core |
| Individual Accounts / Connect to an existing user store in the cloud |  Cloud-hosted individual authentication with Azure AD B2C | Azure AD B2C |
| Work or School Cloud / Single Org  |  Organizational authentication for a single tenant | Microsoft Entra ID |
| Work or School Cloud / Multiple Org |  Organizational authentication for multiple tenants | Microsoft Entra ID |
| Windows         |  Windows authentication | Windows Authentication

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

## Related content

The following articles show how to use the code generated in ASP.NET Core templates that use individual accounts:

* Account confirmation and password recovery in ASP.NET Core
* Create an ASP.NET Core app with user data protected by authorization
