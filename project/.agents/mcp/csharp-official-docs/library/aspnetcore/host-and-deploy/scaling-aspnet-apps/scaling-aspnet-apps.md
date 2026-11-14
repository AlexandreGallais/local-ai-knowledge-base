---
title: "Scaling ASP.NET Core Apps on Azure (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/host-and-deploy/scaling-aspnet-apps/scaling-aspnet-apps.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Deploying and scaling an ASP.NET Core app on Azure Container Apps

Apps deployed to Azure that experience intermittent high demand benefit from scalability to meet demand. Scalable apps can scale out to ensure capacity during workload peaks and then scale down automatically when the peak drops, which can lower costs. Horizontal scaling (scaling out) adds new instances of a resource, such as VMs or database replicas. This article demonstrates how to deploy a horizontally scalable ASP.NET Core app to Azure container apps by completing the following tasks:

1. Set up the sample project
1. Deploy the app to Azure Container Apps
1. Scale and troubleshoot the app
1. Create the Azure Services
1. Connect the Azure services
1. Configure and redeploy the app

This article uses Razor Pages, but most of it applies to other ASP.NET Core apps.

In some cases, basic ASP.NET Core apps are able to scale without special considerations. However, apps that utilize certain framework features or architectural patterns require extra configurations, including the following:

* **Secure form submissions**: Razor Pages, MVC and Web API apps often rely on form submissions. By default these apps use cross site forgery tokens and internal data protection services to secure requests. When deployed to the cloud, these apps must be configured to manage data protection service concerns in a secure, centralized location.

* **SignalR circuits**: Blazor Server apps require the use of a centralized Azure SignalR service in order to securely scale. These services also utilize the data protection services mentioned previously.

* **Centralized caching or state management services**: Scalable apps may use Azure Cache for Redis to provide distributed caching. Azure storage may be needed to store state for frameworks such as Microsoft Orleans, which can help write apps that manage state across many different app instances.

The steps in this article demonstrate how to properly address the preceding concerns by deploying a scalable app to Azure Container Apps. Most of the concepts in this tutorial also apply when scaling Azure App Service instances.

## Set up the sample project

Use the GitHub Explorer sample app to follow along with this tutorial. Clone the app from GitHub using the following command:

```dotnetcli
git clone "https://github.com/dotnet/AspNetCore.Docs.Samples.git"
```

Navigate to the `/tutorials/scalable-razor-apps/start` folder and open the `ScalableRazor.csproj`.

The sample app uses a search form to browse GitHub repositories by name. The form relies on the built-in ASP.NET Core data protection services to handle antiforgery concerns. By default, when the app scales horizontally on Container Apps, the data protection service throws an exception.

#### Test the app

1. Launch the app in Visual Studio. The project includes a Docker file, which means that the arrow next to the run button can be selected to start the app using either a Docker Desktop setup or the standard ASP.NET Core local web server.

Use the search form to browse for GitHub repositories by name.

## Deploy the app to Azure Container Apps

Visual Studio is used to deploy the app to Azure Container Apps. Container apps provide a managed service designed to simplify hosting containerized apps and microservices.

> **Note:**
> Many of the resources created for the app require a location. For this app, location isn't important. A real app should select a location closest to the clients. You may want to select a location near you.

1. In Visual Studio solution explorer, right click on the top level project node and select **Publish**.
1. In the publishing dialog, select **Azure** as the deployment target, and then select **Next**.
1. For the specific target, select **Azure Container Apps (Linux)**, and then select **Next**.
1. Create a new container app to deploy to. Select the green **+** icon to open a new dialog and enter the following values:

    * **Container app name**: Leave the default value or enter a name.
    * **Subscription name**: Select the subscription to deploy to.
    * **Resource group**: Select **New** and create a new resource group called *msdocs-scalable-razor*.
    * **Container apps environment**: Select **New** to open the container apps environment dialog and enter the following values:
        * **Environment name**: Keep the default value.
        * **Location**: Select a location near you.
        * **Azure Log Analytics Workspace**: Select **New** to open the log analytics workspace dialog.
            * **Name**: Leave the default value.
            * **Location**: Select a location near you and then select **Ok** to close the dialog.
        * Select **Ok** to close the container apps environment dialog.
    * Select **Create** to close the original container apps dialog. Visual Studio creates the container app resource in Azure.
1. Once the resource is created, make sure it's selected in the list of container apps, and then select **Next**.
1. You'll need to create an Azure Container Registry to store the published image artifact for your app. Select the green **+** icon on the container registry screen.

1. Leave the default values, and then select **Create**.

1. After the container registry is created, make sure it's selected, and then select finish to close the dialog workflow and display a summary of the publishing profile.

    If Visual Studio prompts you to enable the Admin user to access the published docker container, select **Yes**.

1. Select **Publish** in the upper right of the publishing profile summary to deploy the app to Azure.

When the deployment finishes, Visual Studio launches the browser to display the hosted app. Search for `Microsoft` in the form field, and a list of repositories is displayed.

## Scale and troubleshoot the app

The app is currently working without any issues, but we'd like to scale the app across more instances in anticipation of high traffic volumes.

1. In the Azure portal, search for the `razorscaling-app-****` container app in the top level search bar and select it from the results.
1. On the overview page, select **Scale** from the left navigation, and then select **+ Edit and deploy**.
1. On the revisions page, switch to the **Scale** tab.
1. Set both the min and max instances to **4** and then select **Create**. This configuration change guarantees your app is scaled horizontally across four instances.

Navigate back to the app. When the page loads, at first it appears everything is working correctly. However, when a search term is entered and submitted, an error may occur. If an error is not displayed, submit the form several more times.

#### Troubleshooting the error

It's not immediately apparent why the search requests are failing. The browser tools indicate a 400 Bad Request response was sent back. However, you can use the logging features of container apps to diagnose errors occurring in your environment.

1. On the overview page of the container app, select **Logs** from the left navigation.
1. On the **Logs** page, close the pop-up that opens and navigate to the **Tables** tab.
1. Expand the **Custom Logs** item to reveal the **ContainerAppConsoleLogs_CL** node. This table holds various logs for the container app that can be queried to troubleshoot problems.

1. In the query editor, compose a basic query to search the **ContainerAppConsoleLogs_CL Logs** table for recent exceptions, such as the following script:

    ```kql
    ContainerAppConsoleLogs_CL
    | where Log_s contains "exception"
    | sort by TimeGenerated desc
    | limit 500
    | project ContainerAppName_s, Log_s
    ```

    The preceding query searches the **ContainerAppConsoleLogs_CL** table for any rows that contain the word exception. The results are ordered by the time generated, limited to 500 results, and only include the **ContainerAppName_s** and **Log_s** columns to make the results easier to read.

1. Select **Run**,  a list of results is displayed. Read through the logs and note that most of them are related to antiforgery tokens and cryptography.

    > **Important:**
    > The errors in the app are caused by the .NET data protection services. When multiple instances of the app are running, there is no guarantee that the HTTP POST request to submit the form is routed to the same container that initially loaded the page from the HTTP GET request. If the requests are handled by different instances, the antiforgery tokens aren't handled correctly and an exception occurs.

    In the steps ahead, this issue is resolved by centralizing the data protection keys in an Azure storage service and protecting them with Key Vault.

    > **Tip:**
    > **Alternative: Azure Container Apps built-in data protection**
    >
    > Azure Container Apps provides a built-in feature to manage data protection keys across replicas without requiring separate Azure Blob Storage and Azure Key Vault resources. This feature requires ASP.NET Core 8.0.4 or later (apps targeting earlier versions, such as the sample in this tutorial, must first update their target framework and container base images).
    >
    > In Azure Container Apps, navigate to the **Development Stack** section, select **.NET**, and enable **ASP.NET Core Data Protection** (or set `properties.configuration.runtime.dotnet.autoConfigureDataProtection: true` in ARM or Bicep templates). When enabled, Azure Container Apps creates a shared key <example-value> mount and injects the `DOTNET_ReadOnlyDataProtectionKeyDirectory` environment variable pointing to the mounted key <example-value> so replicas share encryption keys automatically.

## Create the Azure Services

To resolve the preceding errors,  the following services are created and connected to the app:

* Azure Storage Account: Handles storing data for the Data Protection Services. Provides a centralized location to store key data as the app scales. Storage accounts can also be used to hold documents, queue data, file shares, and almost any type of blob data.
* Azure KeyVault: This service stores secrets for an app, and is used to help manage encryption concerns for the Data Protection Services.

#### Create the storage account service

1. In the Azure portal search bar, enter `Storage accounts` and select the matching result.
1. On the storage accounts listing page, select **+ Create**.
1. On the **Basics** tab, enter the following values:
    * **Subscription**: Select the same subscription that you chose for the container app.
    * **Resource Group**: Select the *msdocs-scalable-razor* resource group you created previously.
    * **Storage account name**: Name the account *scalablerazorstorageXXXX* where the X's are random numbers of your choosing. This name must be unique across all of Azure.
    * **Region**: Select the same region you previously selected.
1. Leave the rest of the values at their default and select **Review**. After Azure validates the inputs, select **Create**.

Azure provisions the new storage account. When the task completes, choose **Go to resource** to view the new service.

#### Create the storage container

Create a Container to store the app's data protection keys.

1. On the overview page for the new storage account, select **Storage browser** on the left navigation.
1. Select **Blob containers**.
1. Select **+ Add container** to open the **New container** flyout menu.
1. Enter a name of *scalablerazorkeys*, leave the rest of the settings at their defaults, and then select **Create**.

The new containers appear on the page list.

#### Create the key vault service

Create a key vault to hold the keys that protect the data in the blob storage container.

1. In the Azure portal search bar, enter `Key Vault` and select the matching result.
1. On the key vault listing page, select **+ Create**.
1. On the **Basics** tab, enter the following values:
    * **Subscription**: Select the same subscription that was previously selected.
    * **Resource Group**: Select the *msdocs-scalable-razor* resource group previously created.
    * **Key Vault name**: Enter the name *scalablerazorvaultXXXX*.
    * **Region**: Select a region near your location.
1. Leave the rest of the settings at their default, and then select **Review + create**. Wait for Azure to validate your settings, and then select **Create**.

Azure provisions the new key vault. When the task completes, select **Go to resource** to view the new service.

#### Create the key

Create a secret key to protect the data in the blob storage account.

1. On the main overview page of the key vault, select **Keys** from the left navigation.
1. On the **Create a key** page, select **+ Generate/Import** to open the **Create a key** flyout menu.
1. Enter *razorkey* in the **Name** field. Leave the rest of the settings at their default values and then select **Create**. A new key <example-value> on the key list page.
