---
title: "Scaffold Identity in ASP.NET Core projects (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/scaffold-identity.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Scaffold Identity in ASP.NET Core projects

By Rick Anderson

This article shows how to migrate a database and complete an Identity scaffolding update.

## Blazor Identity scaffolding

ASP.NET Core Identity scaffolding adds ASP.NET Core Identity to Blazor Web Apps and Blazor Server apps. After the scaffolder adds the Identity Razor components to the app, you can customize the components to suit your application requirements.

Although the scaffolder generates the necessary C# code to scaffold Identity into the app, you must update the project database with an Entity Framework Core database migration to complete the process. This article describes the steps for migrating a database.

After running the Identity scaffolder, inspect the changes. Use GitHub or another source control system that shows file changes with a revert changes feature.

Services are required when using two-factor authentication (2FA), account confirmation and password <example-value>, and other security features with Identity. Services or service stubs aren't generated when scaffolding Identity. Services to enable these features must be added manually.

## Razor Pages and MVC Identity scaffolding

ASP.NET Core provides ASP.NET Core Identity as a Razor class library (RCL). Applications that include Identity can apply the scaffolder to selectively add the source code contained in the Identity RCL. You might want to generate source code so you can modify the code and change the behavior. For example, you could instruct the scaffolder to generate the code used in registration. Customized Identity code overrides the default implementation provided by the Identity RCL. To gain full control of the UI and not use the default RCL, see the Create full Identity UI source section.

Applications that do **not** include authentication can apply the scaffolder to add the RCL Identity package. You have the option of selecting Identity code to generate.

Although the scaffolder generates most of the necessary code, you need to update your project to complete the process. This article shows the steps needed to complete an Identity scaffolding update. After running the Identity scaffolder, inspect the changes. Use a source control system that shows file differences and allows you to back out of changes.

Services are required when using 2FA, account confirmation and password <example-value>, and other security features with Identity. Services or service stubs aren't generated when scaffolding Identity. Services to enable these features must be added manually. For example, see Configure an email provider so the app can require email confirmation.

Typically, apps created with individual accounts should ***not*** create a new data context.

## Scaffold Identity into a Blazor project

The scaffolding procedures described in this section apply to Blazor Web Apps and Blazor Server apps.

Run the Identity scaffolder:

# Visual Studio

1. In **Solution Explorer**, right-click the project, and select **Add** > **New Scaffolded Item**.

1. In the left pane of the **Add New Scaffolded Item** dialog, select **Identity**.

1. In the center pane, select **Blazor Identity**, and then select **Add**.

1. In the **Add Blazor Identity** dialog:

   1. Select the plus icon (**+**) and add the database context class, **DbContext class**.

   1. Select the database provider (**Database provider**), which defaults to SQL Server.

   1. Select the plus icon (**+**) and add the user class, **User class**.

   1. Select **Add**.

# .NET CLI

To add the required NuGet packages and tools, run the following .NET CLI commands in a command shell opened to the project's root folder.

- Paste the following commands at the prompt (`>`) of the command shell.
- If you paste multiple commands, a warning indicates execution of multiple commands. Select the **Paste anyway** option.
- When you paste multiple commands, all of the commands run, except the last one. To run the last command, select `Enter`.

The following commands assume you're using a SQL Server database and the SQL Server Entity Framework Core database provider package (Microsoft.EntityFrameworkCore.SqlServer). If you're using a different database, swap the Entity Framework Core database provider package. The scaffolding tool supports the following providers &dagger;:

* SQLServer: Microsoft.EntityFrameworkCore.SqlServer
* SQLite: Microsoft.EntityFrameworkCore.Sqlite
* Cosmos: Microsoft.EntityFrameworkCore.Cosmos
* Postgres: Npgsql.EntityFrameworkCore.PostgreSQL

&dagger; Microsoft owns, maintains, and supports the SQL Server, SQLite, and Azure Cosmos DB database provider packages. The Npgsql Development Team owns, maintains, and supports the PostgreSQL database provider package (npgsql/efcore.pg GitHub repository).

1. Run the following commands:

   ```dotnetcli
   dotnet tool install --global dotnet-aspnet-codegenerator
   dotnet tool install --global dotnet-ef
   dotnet add package Microsoft.EntityFrameworkCore.Design
   dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Tools
   ```

   > **Important:**
   > After the first five commands execute, be sure to run the last command by selecting `Enter`.

   These commands add:

   * Command-line interface (CLI) tools for Entity Framework Core
   * The aspnet-codegenerator scaffolding tool
   * Design time tools for Entity Framework Core
   * The SQLite and SQL Server providers with the Entity Framework Core package as a dependency
   * Microsoft.VisualStudio.Web.CodeGeneration.Design for scaffolding

1. Run the following command to list the Identity scaffolder options:

   ```dotnetcli
   dotnet aspnet-codegenerator identity -h
   ```

1. In the project folder, run the Identity scaffolder with the options you want. To scaffold Identity with the default Identity UI and the minimum number of files, run the following command:

   ```dotnetcli
   dotnet aspnet-codegenerator identity --useDefaultUI
   ```

---

The generated Identity database code requires Entity Framework Core Migrations. The following steps explain how to create and apply a migration to the database.

# Visual Studio

Visual Studio Connected Services are used to add an Entity Framework Core migration and update the database.

1. In **Solution Explorer**, double-click **Connected Services**.

1. In the **SQL Server Express LocalDB** area of **Service Dependencies**, select **More action** (**...**) > **Add migration**.

1. Give the migration a **Migration name**, such as `CreateIdentitySchema`, which is a name that describes the migration.

   Wait for the database context to load in the **DbContext class names** field. The action can take a few seconds.

1. Select **Finish** to complete the update. After the operation finishes, select **Close**.

1. Select **More actions** (**...**) > **Update database**.

   The **Update database with the latest migration** dialog opens.

   Wait for the **DbContext class names** field to update and for prior migrations to load. The action can take a few seconds.

1. Select **Finish** to complete the update. After the operation finishes, select **Close**.

# .NET CLI

From the project's root folder, run the following .NET CLI command to add a migration. The `{MIGRATION NAME}` placeholder is used to name the migration, such as `CreateIdentitySchema`. Any name can be used, but the convention is to use a name that describes the migration.

1. In a command shell, run the following command to add the migration:

   ```dotnetcli
   dotnet ef migrations add {MIGRATION NAME}
   ```

   Example:

   ```dotnetcli
   dotnet ef migrations add CreateIdentitySchema
   ```

1. After the migration command completes, run the following command to update the database:

   ```dotnetcli
   dotnet ef database update
   ```

---

The update database command runs the `Up` method migrations that aren't applied in a migration code file created by the scaffolder. In this case, the command runs the `Up` method in the _Migrations/{TIME STAMP}\_{MIGRATION NAME}.cs_ file, which creates the Identity tables, constraints, and indexes. The `{TIME STAMP}` placeholder is a time stamp, and the `{MIGRATION NAME}` placeholder is the migration name.

## Client-side Blazor apps (Standalone Blazor WebAssembly)

Client-side Blazor apps (Standalone Blazor WebAssembly) use their own Identity UI approaches and can't use ASP.NET Core Identity scaffolding.

For more information, see the Blazor Security and Identity articles.
