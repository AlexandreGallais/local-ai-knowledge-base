---
title: "Add, download, and delete user data to Identity in an ASP.NET Core project (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/add-user-data.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Add, download, and delete custom user data to Identity in an ASP.NET Core project

This article shows how to:

* Add custom user data to an ASP.NET Core web app.
* Mark the custom user data model with the `Microsoft.AspNetCore.Identity.PersonalDataAttribute` attribute so it's automatically available for download and deletion. Making the data able to be downloaded and deleted helps meet GDPR requirements.

The project sample is created from a Razor Pages web app, but the instructions are similar for an ASP.NET Core MVC web app.

View or download sample code (how to download)

## Prerequisites

.NET 10.0 SDK

## Quickstart: Add two custom properties

For the common case of adding two custom properties such as `FirstName` and `LastName`:

1. Create a new ASP.NET Core project with Individual Accounts authentication
1. Scaffold Identity to override the Register and Manage/Index pages
1. Add custom properties such as `FirstName` and `LastName` to the user class, with the `[PersonalData]` attribute.
1. Update the Register and Manage/Index pages to include input fields for your properties.
1. Create and apply a migration.
1. Test registration and profile management.

The sections below provide detailed step-by-step instructions for this process.

## Create a web app

You can create either a Razor Pages or MVC web app. Both use the same Identity Razor Pages UI.

# Visual Studio

* From the Visual Studio **File** menu, select **New** > **Project/Solution...**.
* Select **ASP.NET Core Web App (Razor Pages)** > **Next**
* Name the project **WebApp1** if you want it to match the namespace of the download sample code. Select **Next**.
* Select **Authentication type** > **Individual Accounts** > **Create**
* Build and run the project.

# .NET CLI

```dotnetcli
dotnet new webapp -au Individual -o WebApp1
```

---

# Visual Studio

* From the Visual Studio **File** menu, select **New** > **Project/Solution...**.
* Select **ASP.NET Core Web App (Model-View-Controller)** > **Next**
* Name the project **WebApp1** if you want it to match the namespace of the download sample code. Select **Next**.
* Select **Authentication type** > **Individual Accounts** > **Create**
* Build and run the project.

# .NET CLI

```dotnetcli
dotnet new mvc -au Individual -o WebApp1
```

---

> **Note:**
> Identity UI is implemented as a Razor Class Library. When you create an MVC project with authentication, the Identity pages are served from the Razor Class Library, which means your MVC project uses Razor Pages for Identity even though the rest of the project uses MVC controllers and views.

# Visual Studio

* From **Solution Explorer**, right-click on the project > **Add** > **New Scaffolded Item**.
* From the left pane of the **Add Scaffold** dialog, select **Identity** > **Add**.
* In the **Add Identity** dialog, the following options:
  * Select the existing layout file `~/Pages/Shared/_Layout.cshtml` for Razor Pages or `~/Views/Shared/_Layout.cshtml` for MVC
  * Select the following files to override:
    * **Account/Register**
    * **Account/Manage/Index**
  * Select the **+** button to create a new **Data context class**. Accept the type (**WebApp1.Models.WebApp1Context** if the project is named **WebApp1**).
  * Select the **+** button to create a new **User class**. Accept the type (**WebApp1User** if the project is named **WebApp1**) > **Add**.
* Select **Add**.

# .NET CLI

If you have not previously installed the ASP.NET Core scaffolder, install it now:

```dotnetcli
dotnet tool install -g dotnet-aspnet-codegenerator
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

Add a package reference to Microsoft.VisualStudio.Web.CodeGeneration.Design to the project (.csproj) file. Run the following command in the project directory:

```dotnetcli
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet restore
```

Run the following command to list the Identity scaffolder options:

```dotnetcli
dotnet aspnet-codegenerator identity -h
```

In the project folder, run the Identity scaffolder:

```dotnetcli
dotnet aspnet-codegenerator identity -u WebApp1User -fi Account.Register;Account.Manage.Index
```

PowerShell uses semicolon as a command separator. When using PowerShell, escape the semi-colons in the file list or put the file list in double quotes.

---

Follow the instructions in Migrations, UseAuthentication, and layout to perform the following steps:

* Create a migration and update the database.
* Add `UseAuthentication` to `Program.cs`
* Add `<partial name="_LoginPartial" />` to the layout file.
* Test the app:
  * Register a user
  * Select the new user name (next to the **Logout** link). You might need to expand the window or select the navigation bar icon to show the user name and other links.
  * Select the **Personal Data** tab.
  * Select the **Download** button and examine the `PersonalData.json` file.
  * Test the **Delete** button, which deletes the logged on user.
