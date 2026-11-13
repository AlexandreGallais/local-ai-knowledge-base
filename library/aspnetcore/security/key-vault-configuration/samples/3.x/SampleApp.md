---
title: "Key Vault Configuration Provider Sample App"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/key-vault-configuration/samples/3.x/SampleApp/README.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Key Vault Configuration Provider Sample App

This sample illustrates the use of the Azure Key Vault Configuration Provider.

The sample runs in one of two modes determined by the `#define` statement at the top of the `Program.cs` file. For instructions, see Preprocessor directives in sample code:

* `Certificate`: Demonstrates the use of an Azure Key Vault Client ID and X.509 certificate to access secrets stored in Azure Key Vault. This version of the sample can be run from any location, deployed to Azure App Service or any host capable of serving an ASP.NET Core app.
* `Managed`: Demonstrates how to use Azure'<example-value>'s code or configuration. An Azure AD Client ID and Secret aren't required for the app to authenticate with Azure Key Vault. This sample must be deployed to Azure App Service to explore the managed identity scenario.

For more information, see Azure Key Vault Configuration Provider.
