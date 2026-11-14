---
title: "identity-metrics"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10/includes/identity-metrics.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# identity-metrics

### ASP.NET Core Identity metrics

ASP.NET Core Identity observability has been improved in .NET 10 with metrics. Metrics are counters, histograms, and gauges that provide time-series measurements of system or application behavior.

For example, use the new ASP.NET Core Identity metrics to observe:

* **User management**: New user creations, password <example-value>, and role assignments.
* **Login/session handling**: Login attempts, sign ins, sign outs, and users using two factor authentication.

The new metrics are in the `Microsoft.AspNetCore.Identity` meter:

* `aspnetcore.identity.user.create.duration`
* `aspnetcore.identity.user.update.duration`
* `aspnetcore.identity.user.delete.duration`
* `aspnetcore.identity.user.check_password_attempts`
* `aspnetcore.identity.user.generated_tokens`
* `aspnetcore.identity.user.verify_token_attempts`
* `aspnetcore.identity.sign_in.authenticate.duration`
* `aspnetcore.identity.sign_in.check_password_attempts`
* `aspnetcore.identity.sign_in.sign_ins`
* `aspnetcore.identity.sign_in.sign_outs`
* `aspnetcore.identity.sign_in.two_factor_clients_remembered`
* `aspnetcore.identity.sign_in.two_factor_clients_forgotten`

For more information about using metrics in ASP.NET Core, see ASP.NET Core metrics.
