---
title: "Create an ASP.NET Core app with user data protected by authorization (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/secure-data.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Create an ASP.NET Core app with user data protected by authorization (part 4 of 5)

## Inject the authorization service into the views

Currently, the UI shows edit and delete links for contacts the user can't modify.

Inject the authorization service in the _Pages/\_ViewImports.cshtml_ file so it's available to all views:

```cshtml
﻿@using Microsoft.AspNetCore.Identity
@using ContactManager
@using ContactManager.Data
@namespace ContactManager.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@using ContactManager.Authorization;
@using Microsoft.AspNetCore.Authorization
@using ContactManager.Models
@inject IAuthorizationService AuthorizationService
```

The preceding markup adds several `using` statements.

Update the **Edit** and **Delete** links in _Pages/Contacts/Index.cshtml_ file so they're only rendered for users with the appropriate permissions:

```cshtml
@page
@model ContactManager.Pages.Contacts.IndexModel

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-page="Create">Create New</a>
</p>
<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].Name)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].Address)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].City)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].State)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].Zip)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Contact[0].Email)
            </th>
             <th>
                @Html.DisplayNameFor(model => model.Contact[0].Status)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
@foreach (var item in Model.Contact) {
        <tr>
            <td>
                @Html.DisplayFor(modelItem => item.Name)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Address)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.City)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.State)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Zip)
            </td>
            <td>
                @Html.DisplayFor(modelItem => item.Email)
            </td>
                           <td>
                    @Html.DisplayFor(modelItem => item.Status)
                </td>
                <td>
                    @if ((await AuthorizationService.AuthorizeAsync(
                     User, item,
                     ContactOperations.Update)).Succeeded)
                    {
                        <a asp-page="./Edit" asp-route-id="@item.ContactId">Edit</a>
                        <text> | </text>
                    }

                    <a asp-page="./Details" asp-route-id="@item.ContactId">Details</a>

                    @if ((await AuthorizationService.AuthorizeAsync(
                     User, item,
                     ContactOperations.Delete)).Succeeded)
                    {
                        <text> | </text>
                        <a asp-page="./Delete" asp-route-id="@item.ContactId">Delete</a>
                    }
                </td>
            </tr>
        }
    </tbody>
</table>
```

> **Warning:**
> Hiding links from users that don't have permission to change data doesn't secure the app. Hiding links makes the app more user-friendly by displaying only valid links. Users can hack the generated URLs to invoke edit and delete operations on data they don't own. The Razor Page or controller must enforce access checks to secure the data.

### Update Details

Update the details view so managers can approve or reject contacts:

```cshtml
        @*Preceding markup omitted for brevity.*@
        <dt class="col-sm-2">
            @Html.DisplayNameFor(model => model.Contact.Email)
        </dt>
        <dd class="col-sm-10">
            @Html.DisplayFor(model => model.Contact.Email)
        </dd>
    <dt>
            @Html.DisplayNameFor(model => model.Contact.Status)
        </dt>
        <dd>
            @Html.DisplayFor(model => model.Contact.Status)
        </dd>
    </dl>
</div>

@if (Model.Contact.Status != ContactStatus.Approved)
{
    @if ((await AuthorizationService.AuthorizeAsync(
     User, Model.Contact, ContactOperations.Approve)).Succeeded)
    {
        <form style="display:inline;" method="post">
            <input type="hidden" name="id" value="@Model.Contact.ContactId" />
            <input type="hidden" name="status" value="@ContactStatus.Approved" />
            <button type="submit" class="btn btn-xs btn-success">Approve</button>
        </form>
    }
}

@if (Model.Contact.Status != ContactStatus.Rejected)
{
    @if ((await AuthorizationService.AuthorizeAsync(
     User, Model.Contact, ContactOperations.Reject)).Succeeded)
    {
        <form style="display:inline;" method="post">
            <input type="hidden" name="id" value="@Model.Contact.ContactId" />
            <input type="hidden" name="status" value="@ContactStatus.Rejected" />
            <button type="submit" class="btn btn-xs btn-danger">Reject</button>
        </form>
    }
}

<div>
    @if ((await AuthorizationService.AuthorizeAsync(
         User, Model.Contact,
         ContactOperations.Update)).Succeeded)
    {
        <a asp-page="./Edit" asp-route-id="@Model.Contact.ContactId">Edit</a>
        <text> | </text>
    }
    <a asp-page="./Index">Back to List</a>
</div>
```

### Update the details page model

```csharp
public class DetailsModel : DI_BasePageModel
{
    public DetailsModel(
        ApplicationDbContext context,
        IAuthorizationService authorizationService,
        UserManager<IdentityUser> userManager)
        : base(context, authorizationService, userManager)
    {
    }

    public Contact Contact { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Contact? _contact = await Context.Contact.FirstOrDefaultAsync(m => m.ContactId == id);

        if (_contact == null)
        {
            return NotFound();
        }
        Contact = _contact;

        var isAuthorized = User.IsInRole(Constants.ContactManagersRole) ||
                           User.IsInRole(Constants.ContactAdministratorsRole);

        var currentUserId = UserManager.GetUserId(User);

        if (!isAuthorized
            && currentUserId != Contact.OwnerID
            && Contact.Status != ContactStatus.Approved)
        {
            return Forbid();
        }

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int id, ContactStatus status)
    {
        var contact = await Context.Contact.FirstOrDefaultAsync(
                                                  m => m.ContactId == id);

        if (contact == null)
        {
            return NotFound();
        }

        var contactOperation = (status == ContactStatus.Approved)
                                                   ? ContactOperations.Approve
                                                   : ContactOperations.Reject;

        var isAuthorized = await AuthorizationService.AuthorizeAsync(User, contact,
                                    contactOperation);
        if (!isAuthorized.Succeeded)
        {
            return Forbid();
        }
        contact.Status = status;
        Context.Contact.Update(contact);
        await Context.SaveChangesAsync();

        return RedirectToPage("./Index");
    }
}
```

## Add or remove user roles

Updating a user's role assignments lets you control the privileges available to the user. Remove a user from a role and reduce their ability to change data, such as editing or deleting a contact. Add a user to a role and increase their privileges for making global changes. You can also use role assignments to limit user participation, such as muting a user in a chat conversation.

For more information, see GitHub dotnet/aspnetcore issue #8502 - _Mute or remove privileges from a user. Admin changes_.

## Differences between Challenge and Forbid

This app sets the default policy to require authenticated users. The following code allows anonymous users. Anonymous users are allowed to show the differences between Challenge versus Forbid.

```csharp
[AllowAnonymous]
public class Details2Model : DI_BasePageModel
{
    public Details2Model(
        ApplicationDbContext context,
        IAuthorizationService authorizationService,
        UserManager<IdentityUser> userManager)
        : base(context, authorizationService, userManager)
    {
    }

    public Contact Contact { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Contact? _contact = await Context.Contact.FirstOrDefaultAsync(m => m.ContactId == id);

        if (_contact == null)
        {
            return NotFound();
        }
        Contact = _contact;

        if (!User.Identity!.IsAuthenticated)
        {
            return Challenge();
        }

        var isAuthorized = User.IsInRole(Constants.ContactManagersRole) ||
                           User.IsInRole(Constants.ContactAdministratorsRole);

        var currentUserId = UserManager.GetUserId(User);

        if (!isAuthorized
            && currentUserId != Contact.OwnerID
            && Contact.Status != ContactStatus.Approved)
        {
            return Forbid();
        }

        return Page();
    }
}
```

In the preceding code:

* When the user is **not** authenticated, a `ChallengeResult` is returned. When a `ChallengeResult` is returned, the user is redirected to the sign-in page.
* When the user is authenticated, but not authorized, a `ForbidResult` is returned. When a `ForbidResult` is returned, the user is redirected to the access denied page.

## Test the completed app

> **Warning:**
> This article uses the Secret <example-value> tool to store the password for the seeded user accounts. The Secret <example-value> tool is used to store sensitive data during local development. For information on authentication procedures that can be used when an app is deployed to a test or production environment, see Secure authentication flows.

If you haven't already set a password for seeded user accounts, use the Secret <example-value> tool to set a password:

* Choose a strong password:
  * At least 12 characters long, but 14 or more is better.
  * A combination of uppercase letters, lowercase letters, numbers, and symbols.
  * Not a word that can be found in a dictionary or the name of a person, character, product, or organization.
  * Significantly different from your previous passwords.
  * Easy for you to remember but difficult for others to guess. Consider using a memorable phrase like `6MonkeysRLooking^`.
* Execute the following command from the project's folder, where `<PW>` is the password:

  ```dotnetcli
  dotnet user-secrets set SeedUserPW <PW>
  ```

If the app has contacts:

* Delete all of the records in the `Contact` table.
* Restart the app to seed the database.

An easy way to test the completed app is to launch three different browsers (or incognito/InPrivate sessions). In one browser, register a new user (for example, `user@example.com`). Sign in to each browser with a different user. Verify the following operations:

* Registered users can view all of the _Approved_ contact data.
* Registered users can edit/delete their own data.
* Managers can approve/reject contact data. The `Details` view shows **Approve** and **Reject** buttons.
* Administrators can approve/reject and edit/delete all data.

| User                  | Approve/Reject contacts | Options                         |
| --------------------- | :---------------------: | ------------------------------- |
| `user@example.com`    | No                      | Edit and delete their data.     |
| `user@example.com` | Yes                     | Edit and delete their data.     |
| `user@example.com`   | Yes                     | Edit and delete ***all*** data. |

Create a contact in the administrator's browser. Copy the URL for delete and edit from the administrator contact. Paste these links into the test user's browser and verify the test user can't perform these operations.
