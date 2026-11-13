---
title: "Build a Blazor movie database app (Part 8 - Add interactivity) (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/tutorials/movie-database-app/part-8.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a Blazor movie database app (Part 8 - Add interactivity) (part 2 of 2)

## Clean up

**vs:**

When you're finished with the tutorial and delete the sample app from your local system, you can also delete the `BlazorWebAppMovies` database in Visual Studio's SQL Server Object Explorer (SSOX):

1. Access SSOX by selecting **View** > **SQL Server Object Explorer** from the menu bar.
1. Display the database list by selecting the triangles next to `SQL Server` > `(localdb)\MSSQLLocalDB` > `Databases`.
1. Right-click the `BlazorWebAppMovies` database in the list and select **Delete**.
1. Select the checkbox to close existing connections before selecting **OK**.

When deleting the database in SSOX, the database's physical files are removed from your Windows user folder.

**vsc:**

When you're finished with the tutorial and delete the sample app from your local system, you can also manually delete the `BlazorWebAppMovies` database. The database's location varies depending on the platform and operating system, but you can search for it by the file name indicated in the database connection string of app settings file (`appsettings.json`).

**cli:**

When you're finished with the tutorial and delete the sample app from your local system, you can also manually delete the `BlazorWebAppMovies` database. The database's location varies depending on the platform and operating system, but you can search for it by the file name indicated in the database connection string of the app settings file (`appsettings.json`).

## Congratulations!

Congratulations on completing the tutorial series! We hope you enjoyed this tutorial on Blazor. Blazor offers many more features than we were able to cover in this series, and we invite you to explore the Blazor documentation, examples, and sample apps to learn more. *Happy coding with Blazor!*

## Next steps

If you're new to Blazor, we recommend reading the following Blazor articles that cover important general information for Blazor development:

* ASP.NET Core Blazor
* ASP.NET Core Blazor supported platforms
* Tooling for ASP.NET Core Blazor
* ASP.NET Core Blazor hosting models
* ASP.NET Core Blazor project structure
* ASP.NET Core Blazor fundamentals and the other *Fundamentals* node articles.
* ASP.NET Core Razor components and the other *Components* node articles.
* ASP.NET Core Blazor forms overview
* ASP.NET Core Blazor JavaScript interoperability (JS interop) and the other *JavaScript interop* articles.
* ASP.NET Core Blazor authentication and authorization
* Host and deploy ASP.NET Core Blazor
* ASP.NET Core Blazor with Entity Framework Core (EF Core) covers concurrency with EF Core in Blazor apps.

For guidance on adding a thumbnail file upload feature to this tutorial's sample app, see ASP.NET Core Blazor file uploads.

In the documentation website's sidebar navigation, articles are organized by subject matter and laid out in roughly in a general-to-specific or basic-to-complex order. The best approach when starting to learn about Blazor is to read down the table of contents from top to bottom.

## Troubleshoot with the completed sample

If you run into a problem while following the tutorial that you can't resolve from the text, compare your code to the completed project in the Blazor samples repository:

Blazor samples GitHub repository (`dotnet/blazor-samples`)

Select the latest version folder. The sample folder for this tutorial's project is named `BlazorWebAppMovies`.

> Previous: Add a new field
