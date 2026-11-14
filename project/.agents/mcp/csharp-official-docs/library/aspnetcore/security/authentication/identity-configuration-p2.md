---
title: "Configure ASP.NET Core Identity (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/identity-configuration.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Identity (part 2 of 2)

## ISecurityStampValidator and SignOut everywhere

Apps need to react to events involving security sensitive actions by regenerating the users `System.Security.Claims.ClaimsPrincipal`. For example, the `ClaimsPrincipal` should be regenerated when joining a role, changing the password, or other security sensitive events. Identity uses the `Microsoft.AspNetCore.Identity.ISecurityStampValidator` interface to regenerate the `ClaimsPrincipal`.  The default implementation of Identity registers a SecurityStampValidator with the main application cookie and the two-factor cookie. The validator hooks into the `Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationEvents.OnValidatePrincipal` event of each cookie to call into Identity to verify that the user'<example-value>'s stored in the cookie. The validator calls in at regular intervals. The call interval is a tradeoff between hitting the datastore too frequently and not often enough. Checking with a long interval results in stale claims. Call `userManager.UpdateSecurityStampAsync(user)`to force existing cookies to be invalided the next time they are checked. Most of the Identity UI account and manage pages call `userManager.UpdateSecurityStampAsync(user)` after changing the password or adding a login. Apps can call `userManager.UpdateSecurityStampAsync(user)` to implement a sign out everywhere action.

Changing the validation interval is shown in the following highlighted code:

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebClaimsPrincipal.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? throw new InvalidOperationException("'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddDefaultIdentity<IdentityUser>(options => 
options.SignIn.RequireConfirmedAccount = true)
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Force Identity's security stamp to be validated every minute.
builder.Services.Configure<SecurityStampValidatorOptions>(o => 
                   o.ValidationInterval = TimeSpan.FromMinutes(1));

builder.Services.AddRazorPages();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```
