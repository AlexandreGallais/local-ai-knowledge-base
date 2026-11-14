---
title: "authorize-client-app"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/includes/authorize-client-app.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# authorize-client-app

> **Important:**
> If you don't have the authority to grant admin consent to the tenant in the last step of **API permissions** configuration because consent to use the app is delegated to users, then you must take the following additional steps:
>
> * The app must use a trusted publisher domain.
> * In the **`Server`** app's configuration in the Azure portal, select **Expose an API**. Under **Authorized client applications**, select the button to **Add a client application**. Add the **`Client`** app's Application (client) ID (for example, `11112222-bbbb-3333-cccc-4444dddd5555`).
