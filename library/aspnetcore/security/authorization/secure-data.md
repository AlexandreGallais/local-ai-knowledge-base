---
title: "Create an ASP.NET Core app with user data protected by authorization (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/secure-data.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Create an ASP.NET Core web app with user data protected by authorization

By Rick Anderson and Joe Audette

This tutorial shows how to create an ASP.NET Core web app with user data protected by authorization. It displays a list of contacts created by the authenticated (registered) users. The app supports three security groups:

* **Registered users** can view all _Approved_ data and can edit/delete their own data.
* **Managers** can approve or reject contact data. Only contacts marked as _Approved_ are visible to users.
* **Administrators** can approve/reject and edit/delete any data.

> **Note:**
> The images in this article don't exactly match the latest templates.

In the following image, the user `rick@contoso.com` is signed in to the web app. This user can view only _Approved_ contacts along with the **Edit**/**Delete**/**Create New** links for the contacts. In this view, only the last record (created by this user) displays the **Edit** and **Delete** links. Other users don't see the last record until a manager or administrator approves the record.

In the next image, the `manager@contoso.com` user is signed in and has access to the management features:

A manager can select a contact to see details about the user, as shown in the following image:

The **Approve** and **Reject** options display for managers and administrators only.

In the following image, the `admin@contoso.com` user is signed in and has access to the administration features:

An administrator has all privileges. They can read, edit, or delete any contact and change the status of contacts.

The app was created by scaffolding the following `Contact` model:

```csharp
public class Contact
{
    public int ContactId { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }
}
```

The sample contains the following authorization handlers:

* `ContactIsOwnerAuthorizationHandler`: Ensures that a user can only edit their data.
* `ContactManagerAuthorizationHandler`: Allows managers to approve or reject contacts.
* `ContactAdministratorsAuthorizationHandler`: Allows administrators to approve or reject contacts and to edit/delete contacts.

## Prerequisites

This tutorial is advanced. You should be familiar with:

* ASP.NET Core
* Authentication and ASP.NET Core Identity
* Account confirmation and password recovery
* Authorization
* Entity Framework Core

## The starter and completed app

Download the completed app. Test the completed app so you become familiar with its security features.

> **Tip:**
> You can use the git sparse-checkout command to download only the sample subfolder.

For example:

```terminal
git clone --depth 1 --filter=blob:none https://github.com/dotnet/AspNetCore.Docs.git --sparse
cd AspNetCore.Docs
git sparse-checkout init --cone
git sparse-checkout set aspnetcore/security/authorization/secure-data/samples
```

### The starter app

Download the starter app.

Run the app, tap the **ContactManager** link, and verify you can create, edit, and delete a contact. To create the starter app, see Create the starter app.

## Secure user data

The following sections demonstrate all the major steps to create the secure user data app. You might find it helpful to refer to the completed project.

### Tie the contact data to the user

Use the ASP.NET Identity user ID to ensure users can edit their data, but not other users data. Add the `OwnerID` and `ContactStatus` fields to the `Contact` model:

```csharp
public class Contact
{
    public int ContactId { get; set; }

    // user ID from AspNetUser table.
    public string? OwnerID { get; set; }

    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Zip { get; set; }
    [DataType(DataType.EmailAddress)]
    public string? Email { get; set; }

    public ContactStatus Status { get; set; }
}

public enum ContactStatus
{
    Submitted,
    Approved,
    Rejected
}
```

`OwnerID` is the user's ID from the `AspNetUser` table in the Identity database. The `Status` field determines if a contact is viewable by general users.

Create a new migration and update the database:

```dotnetcli
dotnet ef migrations add userID_Status
dotnet ef database update
```

### Add Role services to Identity

Enable the app to use Role services by appending the `Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles*` method:

```csharp
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(
    options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

### Require authenticated users

Set the fallback authorization policy to require users to be authenticated:

```csharp
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(
    options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

The preceding highlighted code sets the fallback authorization policy to require an authenticated user. The fallback policy is selected when the authorization middleware can't build a policy from authorization metadata. An endpoint with `[Authorize]` uses the default policy, and an endpoint with `[Authorize(Policy = "{POLICY NAME}")]` uses the named policy. Apply `[AllowAnonymous]` to an endpoint that is intentionally public.

The `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireAuthenticatedUser*` method adds the `Microsoft.AspNetCore.Authorization.Infrastructure.DenyAnonymousAuthorizationRequirement` class to the current instance, which enforces that the current user is authenticated.

The fallback authorization policy applies to requests processed by the authorization middleware when no authorization policy is produced from endpoint metadata. It can also apply when a request doesn't match an endpoint. Middleware order determines whether the authorization middleware processes requests for resources such as static files.

Setting the fallback authorization policy to require users to be authenticated protects newly added Razor Pages and controllers. Having authorization required by default is more secure than relying on new controllers and Razor Pages to include the `[Authorize]` attribute.

For a comparison of named, default, and fallback policies, see Policy-based authorization in ASP.NET Core.

As an alternate approach, MVC controllers and Razor Pages can add an authorization filter to require all users be authenticated:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ContactManager.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(
    options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddRazorPages();

builder.Services.AddControllers(config =>
{
    var policy = new AuthorizationPolicyBuilder()
                     .RequireAuthenticatedUser()
                     .Build();
    config.Filters.Add(new AuthorizeFilter(policy));
});

var app = builder.Build();
```

The preceding code uses an authorization filter. Setting a fallback policy is the preferred way to require all users to be authenticated.

Add the AllowAnonymous attribute to the `Index` and `Privacy` pages so anonymous users can get information about the site before they register:

```csharp
﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ContactManager.Pages;

[AllowAnonymous]
public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;

    public IndexModel(ILogger<IndexModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }
}
```

### Configure the test account

The `SeedData` class creates two accounts: administrator and manager. Use the Secret Manager tool to set a password for these accounts. Set the password from the project directory (the directory containing the _Program.cs_ file):

```dotnetcli
dotnet user-secrets set SeedUserPW <PW>
```

If a weak password is specified, an exception is thrown when the `SeedData.Initialize` method is called.

Update the app to use the test password:

```csharp
var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(
    options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

### Create the test accounts and update the contacts

Create the test accounts by updating the `Initialize` method in the `SeedData` class:

```csharp
public static async Task Initialize(IServiceProvider serviceProvider, string testUserPw)
{
    using (var context = new ApplicationDbContext(
        serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>()))
    {
        // For sample purposes seed both with the same password.
        // Password is set with the following:
        // dotnet user-secrets set SeedUserPW <pw>
        // The admin user can do anything

        var adminID = await EnsureUser(serviceProvider, testUserPw, "admin@contoso.com");
        await EnsureRole(serviceProvider, adminID, Constants.ContactAdministratorsRole);

        // allowed user can create and edit contacts that they create
        var managerID = await EnsureUser(serviceProvider, testUserPw, "manager@contoso.com");
        await EnsureRole(serviceProvider, managerID, Constants.ContactManagersRole);

        SeedDB(context, adminID);
    }
}

private static async Task<string> EnsureUser(IServiceProvider serviceProvider,
                                            string testUserPw, string UserName)
{
    var userManager = serviceProvider.GetService<UserManager<IdentityUser>>();

    var user = await userManager.FindByNameAsync(UserName);
    if (user == null)
    {
        user = new IdentityUser
        {
            UserName = UserName,
            EmailConfirmed = true
        };
        await userManager.CreateAsync(user, testUserPw);
    }

    if (user == null)
    {
        throw new Exception("The password is probably not strong enough!");
    }

    return user.Id;
}

private static async Task<IdentityResult> EnsureRole(IServiceProvider serviceProvider,
                                                              string uid, string role)
{
    var roleManager = serviceProvider.GetService<RoleManager<IdentityRole>>();

    if (roleManager == null)
    {
        throw new Exception("roleManager null");
    }

    IdentityResult IR;
    if (!await roleManager.RoleExistsAsync(role))
    {
        IR = await roleManager.CreateAsync(new IdentityRole(role));
    }

    var userManager = serviceProvider.GetService<UserManager<IdentityUser>>();

    //if (userManager == null)
    //{
    //    throw new Exception("userManager is null");
    //}

    var user = await userManager.FindByIdAsync(uid);

    if (user == null)
    {
        throw new Exception("The testUserPw password was probably not strong enough!");
    }

    IR = await userManager.AddToRoleAsync(user, role);

    return IR;
}
```

Add the administrator user ID and the `ContactStatus` field to the contacts. Mark one of the contacts as _Submitted_ and one as _Rejected_. Add the user ID and status to all the contacts. Only one contact is shown:

```csharp
public static void SeedDB(ApplicationDbContext context, string adminID)
{
    if (context.Contact.Any())
    {
        return;   // DB has been seeded
    }

    context.Contact.AddRange(
        new Contact
        {
            Name = "Debra Garcia",
            Address = "1234 Main St",
            City = "Redmond",
            State = "WA",
            Zip = "10999",
            Email = "debra@example.com",
            Status = ContactStatus.Approved,
            OwnerID = adminID
        },
```
