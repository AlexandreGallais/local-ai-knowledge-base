---
title: "Scaling ASP.NET Core Apps on Azure (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/scaling-aspnet-apps/scaling-aspnet-apps.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Scaling ASP.NET Core Apps on Azure (part 2 of 2)

## Connect the Azure Services

The Container App requires a secure connection to the storage account and the key vault services in order to resolve the data protection errors and scale correctly. The new services are connected together using the following steps:

> **Important:**
> Security role assignments through Service Connector and other tools typically take a minute or two to propagate, and in some rare cases can take up to eight minutes.

#### Connect the storage account

1. In the Azure portal, navigate to the Container App overview page.
1. On the left navigation, select **Service connector**
1. On the Service Connector page, choose **+ Create** to open the **Creation Connection** flyout panel and enter the following values:
    * **Container**: Select the Container App created previously.
    * **Service type**: Choose **Storage - blob**.
    * **Subscription**: Select the subscription previously used.
    * **Connection name**: Leave the default value.
    * **Storage account**: Select the storage account created previously.
    * **Client type**: Select **.NET**.
1. Select **Next: Authentication** to progress to the next step.
1. Select **System assigned managed identity** and choose **Next: Networking**.
1. Leave the default networking options selected, and then select **Review + Create**.
1. After Azure validates the settings, select **Create**.

The service connector enables a system-assigned managed identity on the container app. It also assigns a role of **Storage Blob Data Contributor** to the identity so it can perform data operations on the storage containers.

#### Connect the key vault

1. In the Azure portal, navigate to your Container App overview page.
1. On the left navigation, select **Service connector**.
1. On the Service Connector page, choose **+ Create** to open the **Creation Connection** flyout panel and enter the following values:
    * **Container**: Select the container app created previously.
    * **Service type**: Choose **Key Vault**.
    * **Subscription**: Select the subscription previously used.
    * **Connection name**: Leave the default value.
    * **Key vault**: Select the key vault created previously.
    * **Client type**: Select **.NET**.
1. Select **Next: Authentication** to progress to the next step.
1. Select **System assigned managed identity** and choose **Next: Networking**.
1. Leave the default networking options selected, and then select **Review + Create**.
1. After Azure validates the settings, select **Create**.

The service connector assigns a role to the identity so it can perform data operations on the key vault keys.

## Configure and redeploy the app

The necessary Azure resources have been created. In this section the app code is configured to use the new resources.

1. Install the following NuGet packages:

    * **Azure.Identity**: Provides classes to work with the Azure identity and access management services.
    * **Microsoft.Extensions.Azure**: Provides helpful extension methods to perform core Azure configurations.
    * **Azure.Extensions.AspNetCore.DataProtection.Blobs**: Allows storing ASP.NET Core DataProtection keys in Azure Blob Storage so that keys can be shared across several instances of a web app.
    * **Azure.Extensions.AspNetCore.DataProtection.Keys**: Enables protecting keys at rest using the Azure Key Vault Key <example-value> feature.

    ```dotnetcli
    dotnet add package Azure.Identity
    dotnet add package Microsoft.Extensions.Azure
    dotnet add package Azure.Extensions.AspNetCore.DataProtection.Blobs
    dotnet add package Azure.Extensions.AspNetCore.DataProtection.Keys
    ```

1. Update `Program.cs` with the following highlighted code:

_Code sample not included: ~/../AspNetCore.Docs.Samples/tutorials/scalable-razor-apps/end/Program.cs._
The preceding changes allow the app to manage data protection using a centralized, scalable architecture. `DefaultAzureCredential` discovers the managed identity configurations enabled earlier when the app is redeployed.

> **Note:**
> The preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative such as `Azure.Identity.ManagedIdentityCredential` may be more appropriate. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

Update the placeholders in `AzureURIs` section of the `appsettings.json` file to include the following:

1. Replace the `<storage-account-name>` placeholder with the name of the `scalablerazorstorageXXXX` storage account.
1. Replace the `<container-name>` placeholder with the name of the `scalablerazorkeys` storage container.
1. Replace the `<key-vault-name>` placeholder with the name of the `scalablerazorvaultXXXX` key vault.
1. Replace the `<key-name>` placeholder in the key vault URI with the `razorkey` name created previously.

_Code sample not included: ~/../AspNetCore.Docs.Samples/tutorials/scalable-razor-apps/end/appsettings.json._
#### Redeploy the app

The app is now configured correctly to use the Azure services created previously. Redeploy the app for the code changes to be applied.

1. Right click on the project node in the solution explorer and select **Publish**.
1. On the publishing profile summary view, select the **Publish** button in the upper right corner.

Visual Studio redeploys the app to the container apps environment created previously. When the processes finished, the browser launches to the app home page.

Test the app again by searching for *Microsoft* in the search field. The page should now reload with the correct results every time you submit.

## Configure roles for local development

The existing code and configuration of the app can also work while running locally during development. The `DefaultAzureCredential` class configured previously is able to pick up local environment credentials to authenticate to Azure Services. You'll need to assign the same roles to your own account that were assigned to your app's managed identity in order for the authentication to work. This should be the same account you use to log into Visual Studio or the Azure CLI.

> **Note:**
> `Azure.Identity.DefaultAzureCredential` simplifies authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as `Azure.Identity.ManagedIdentityCredential`. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

#### Sign-in to your local development environment

You'll need to be signed in to the Azure CLI, Visual Studio, or Azure PowerShell for your credentials to be picked up by `DefaultAzureCredential`.

## Azure CLI

```azurecli
az login
```

## Visual Studio

Sign in to Azure using the account settings dialog, which can be accessed in the upper right of the Visual Studio interface.

## PowerShell

```powershell
Connect-AzAccount
```

---

#### Assign roles to your developer account

1. In the Azure portal, navigate to the `scalablerazor****` storage account created previously.
1. Select **Access Control (IAM)** from the left navigation.
1. Choose **+ Add** and then **Add role assignment** from the drop-down menu.
1. On the **Add role assignment** page, search for `Storage blob data contributor`, select the matching result, and then select **Next**.
1. Make sure **User, group, or service principal** is selected, and then select **+ Select members**.
1. In the **Select members** flyout, search for your own *user@domain* account and select it from the results.
1. Choose **Next** and then select **Review + assign**. After Azure validates the settings, select **Review + assign** again.

As previously stated, role assignment permissions might take a minute or two to propagate, or in rare cases up to eight minutes.

Repeat the previous steps to assign a role to your account so that it can access the key vault service and secret.

1. In the Azure portal, navigate to the `razorscalingkeys` key vault created previously.
1. Select **Access Control (IAM)** from the left navigation.
1. Choose **+ Add** and then **Add role assignment** from the drop-down menu.
1. On the **Add role assignment** page, search for `Key Vault Crypto Service Encryption User`, select the matching result, and then select **Next**.
1. Make sure **User, group, or service principal** is selected, and then select **+ Select members**.
1. In the **Select members** flyout, search for your own *user@domain* account and select it from the results.
1. Choose **Next** and then select **Review + assign**. After Azure validates your settings, select **Review + assign** again.

You may need to wait again for this role assignment to propagate.

You can then return to Visual Studio and run the app locally. The code should continue to function as expected. `DefaultAzureCredential` uses your existing credentials from Visual Studio or the Azure CLI.

> **Note:**
> `Azure.Identity.DefaultAzureCredential` simplifies authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as `Azure.Identity.ManagedIdentityCredential`. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

## Enterprise web app patterns

For guidance on creating a reliable, secure, performant, testable, and scalable ASP.NET Core app, see Enterprise web app patterns. A complete production-quality sample web app that implements the patterns is available.
