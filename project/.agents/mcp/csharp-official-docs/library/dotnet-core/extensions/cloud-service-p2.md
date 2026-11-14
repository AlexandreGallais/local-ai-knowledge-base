---
title: "Deploy a Worker Service to Azure (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/cloud-service.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Deploy a Worker Service to Azure (part 2 of 2)

## Deploy as container instance

**docs:**

From Visual Studio Code, select **Docker** from the **Activity Bar**. Expand the **REGISTRIES** node, and select **Connect Registry**. Select **Azure** when prompted, and sign in if necessary.

> **Important:**
> Deploying as a container instance from Visual Studio Code no longer works on Mac. For more information, see GitHub: About Docker Extension for Visual Studio Code.

Expand the **REGISTRIES** node, select **Azure**, your subscription > the container registry > the image, and then right-click the tag. Select **Deploy Image to Azure Container Instances**.

**docs:**

To create a container instance, first create a container group using the `az container create` command.

```azurecli
az container create -g <resource group> \
  --name <instance name> \
  --image <registry name>.azurecr.io/<image name>:latest \
  --registry-password <password>
```

Provide the appropriate values:

- `<resource group>`: the resource group name that you've been using in this tutorial.
- `<instance name>`: the name of the container instance.
- `<registry name>`: the name of the container registry.
- `<image name>`: the name of the image.
- `<password>`: the password to the container registry—you can get this from the Azure portal, Container Registry resource > **Access Keys**.

**docs:**

To create a container instance, you also need to create a new resource in the Azure portal.

1. Select the same **Subscription**, and corresponding **Resource group** from the previous section.
1. Enter a **Container name**—`appcloudservice-container`.
1. Select a **Region** that corresponds to the previous **Location** selection.
1. For **Image source**, select **Azure Container Registry**.
1. Select the **Registry** by the name provided in the previous step.
1. Select the **Image** and **Image tag**.
1. Select **Review + create**.
1. Assuming **Validation passed**, select **Create**.

It may take a moment for the resources to be created, once created select the **Go to resource** button.

For more information, see Quickstart: Create an Azure container instance.

## Verify service functionality

Immediately after the container instance is created, it starts running.

**docs:**

To verify your worker service is functioning correctly, navigate to the Azure portal in the container instance resource, select the **Containers** option.

You'll see the containers and their current **State**. In this case, it is **Running**. Select **Logs** to see the .NET worker service output.

**docs:**

To verify your worker service is functioning correctly, you can view the logs from your running application. Use the `az container logs` command:

```azurecli
az container logs -g <resource group> --name <instance name>
```

Provide the appropriate values:

- `<resource group>`: the resource group name that you've been using in this tutorial.
- `<instance name>`: the name of the container instance.

You'll see the .NET worker service output logs, which means you've successfully deployed your containerized app to ACI.

## See also

- Worker Services in .NET
- Use scoped services within a `BackgroundService`
- Create a Windows Service using `BackgroundService`
- Implement the `IHostedService` interface
- Tutorial: Containerize a .NET Core app
