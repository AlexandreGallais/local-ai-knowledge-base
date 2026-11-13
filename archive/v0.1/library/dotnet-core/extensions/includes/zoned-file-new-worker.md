---
title: "zoned-file-new-worker"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/includes/zoned-file-new-worker.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# zoned-file-new-worker

## Create a new project

**docs:**

To create a new Worker Service project with Visual Studio, select **File** > **New** > **Project...**. From the **Create a new project** dialog search for "Worker Service", and select Worker Service template. Enter the desired project name, select an appropriate location, and select **Next**. On the **Additional information** page, for the **Target Framework** select `.NET 5.0`, and check the **Enable Docker** option to enable docker support. Select the desired **Docker OS**.

**docs:**

To create a new Worker Service project with Visual Studio Code, you can run .NET CLI commands from the integrated terminal. For more information, see Visual Studio Code: Integrated Terminal.

Open the integrated terminal, and run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see dotnet new worker.

**docs:**

To create a new Worker Service project with the .NET CLI, open your favorite terminal in a working directory. Run the `dotnet new` command, and replace the `<Project.Name>` with your desired project name.

```dotnetcli
dotnet new worker --name <Project.Name>
```

For more information on the .NET CLI new worker service project command, see dotnet new worker.
