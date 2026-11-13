---
title: "Create Windows Service using BackgroundService (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/windows-service.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Create Windows Service using BackgroundService (part 2 of 2)

## Create the Windows Service

If you're unfamiliar with using PowerShell and you'd rather create an installer for your service, see Create a Windows Service installer. Otherwise, to create the Windows Service, use the native Windows Service Control Manager's (*sc.exe*) create command. Run PowerShell as an Administrator.

```powershell
sc.exe create ".NET Joke Service" binpath= "C:\Path\To\App.WindowsService.exe"
```

> **Tip:**
> If you need to change the content root of the host configuration, you can pass it as a command-line argument when specifying the `binpath`:
>
> ```powershell
> sc.exe create "Svc Name" binpath= "C:\Path\To\App.exe --contentRoot C:\Other\Path"
> ```

You'll see an output message:

```powershell
[SC] CreateService SUCCESS
```

For more information, see sc.exe create.

### Configure the Windows Service

After the service is created, you can optionally configure it. If you're fine with the service defaults, skip to the Verify service functionality section.

Windows Services provide recovery configuration options. You can query the current configuration using the `sc.exe qfailure "<Service Name>"` (where `<Service Name>` is your services' name) command to read the current recovery configuration values:

```powershell
sc qfailure ".NET Joke Service"
[SC] QueryServiceConfig2 SUCCESS

SERVICE_NAME: .NET Joke Service
        RESET_PERIOD (in seconds)    : 0
        REBOOT_MESSAGE               :
        COMMAND_LINE                 :
```

The command will output the recovery configuration, which is the default values—since they've not yet been configured.

To configure recovery, use the `sc.exe failure "<Service Name>"` where `<Service Name>` is the name of your service:

```powershell
sc.exe failure ".NET Joke Service" reset= 0 actions= restart/60000/restart/60000/run/1000
[SC] ChangeServiceConfig2 SUCCESS
```

> **Tip:**
> To configure the recovery options, your terminal session needs to run as an Administrator.

After it's been successfully configured, you can query the values once again using the `sc.exe qfailure "<Service Name>"` command:

```powershell
sc qfailure ".NET Joke Service"
[SC] QueryServiceConfig2 SUCCESS

SERVICE_NAME: .NET Joke Service
        RESET_PERIOD (in seconds)    : 0
        REBOOT_MESSAGE               :
        COMMAND_LINE                 :
        FAILURE_ACTIONS              : RESTART -- Delay = 60000 milliseconds.
                                       RESTART -- Delay = 60000 milliseconds.
                                       RUN PROCESS -- Delay = 1000 milliseconds.
```

You will see the configured restart values.

#### Service recovery options and .NET `BackgroundService` instances

With .NET 6, new hosting exception-handling behaviors have been added to .NET. The `Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior` enum was added to the `Microsoft.Extensions.Hosting` namespace, and is used to specify the behavior of the service when an exception is thrown. The following table lists the available options:

| Option | Description |
|--|--|
| `Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior.Ignore` | Ignore exceptions thrown in `BackgroundService`. |
| `Microsoft.Extensions.Hosting.BackgroundServiceExceptionBehavior.StopHost` | The `IHost` is stopped when an unhandled exception is thrown. |

The default behavior before .NET 6 is `Ignore`, which resulted in *zombie processes* (a running process that didn't do anything). With .NET 6, the default behavior is `StopHost`, which results in the host being stopped when an exception is thrown. But it stops cleanly, meaning that the Windows Service management system won't restart the service. To correctly allow the service to be restarted, you can call `System.Environment.Exit*` with a non-zero exit code. Consider the following highlighted `catch` block:

```csharp
﻿namespace App.WindowsService;

public sealed class WindowsBackgroundService(
    JokeService jokeService,
    ILogger<WindowsBackgroundService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        try
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                string joke = jokeService.GetJoke();
                logger.LogWarning("{Joke}", joke);

                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            // When the stopping token is canceled, for example, a call made from services.msc,
            // we shouldn't exit with a non-zero exit code. In other words, this is expected...
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "{Message}", ex.Message);

            // Terminates this process and returns an exit code to the operating system.
            // This is required to avoid the 'BackgroundServiceExceptionBehavior', which
            // performs one of two scenarios:
            // 1. When set to "Ignore": will do nothing at all, errors cause zombie services.
            // 2. When set to "StopHost": will cleanly stop the host, and log errors.
            //
            // In order for the Windows Service Management system to leverage configured
            // recovery options, we need to terminate the process with a non-zero exit code.
            Environment.Exit(1);
        }
    }
}
```
## Verify service functionality

To see the app created as a Windows Service, open **Services**. Select the Windows key (or `Ctrl` + `Esc`), and search from "Services". From the **Services** app, you should be able to find your service by its name.

> **Important:**
> By default, regular (non-admin) users can't manage Windows services. To verify that this app functions as expected, you'll need to use an Admin account.

To verify that the service is functioning as expected, you need to:

- Start the service
- View the logs
- Stop the service

> **Important:**
> To debug the application, ensure that you're *not* attempting to debug the executable that is actively running within the Windows Services process.
>
> :::image type="content" source="media/unable-to-debug-service.png" alt-text="Unable to start program.":::

### Start the Windows Service

To start the Windows Service, use the `sc.exe start` command:

```powershell
sc.exe start ".NET Joke Service"
```

You'll see output similar to the following:

```powershell
SERVICE_NAME: .NET Joke Service
    TYPE               : 10  WIN32_OWN_PROCESS
    STATE              : 2  START_PENDING
                            (NOT_STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
    WIN32_EXIT_CODE    : 0  (0x0)
    SERVICE_EXIT_CODE  : 0  (0x0)
    CHECKPOINT         : 0x0
    WAIT_HINT          : 0x7d0
    PID                : 37636
    FLAGS
```

The service **Status** will transition out of `START_PENDING` to **Running**.

### View logs

To view logs, open the **Event Viewer**. Select the Windows key (or `Ctrl` + `Esc`), and search for `"Event Viewer"`. Select the **Event Viewer (Local)** > **Windows Logs** > **Application** node. You should see a **Warning** level entry with a **Source** matching the apps namespace. Double-click the entry, or right-click and select **Event Properties** to view the details.

After seeing logs in the **Event Log**, you should stop the service. It's designed to log a random joke once per minute. This is intentional behavior but is *not* practical for production services.

### Stop the Windows Service

To stop the Windows Service, use the `sc.exe stop` command:

```powershell
sc.exe stop ".NET Joke Service"
```

You'll see output similar to the following:

```powershell
SERVICE_NAME: .NET Joke Service
    TYPE               : 10  WIN32_OWN_PROCESS
    STATE              : 3  STOP_PENDING
                            (STOPPABLE, NOT_PAUSABLE, ACCEPTS_SHUTDOWN)
    WIN32_EXIT_CODE    : 0  (0x0)
    SERVICE_EXIT_CODE  : 0  (0x0)
    CHECKPOINT         : 0x0
    WAIT_HINT          : 0x0
```

The service **Status** will transition from `STOP_PENDING` to **Stopped**.

## Delete the Windows Service

To delete the Windows Service, use the native Windows Service Control Manager's (sc.exe) delete command. Run PowerShell as an Administrator.

> **Important:**
> If the service isn't in the **Stopped** state, it won't be immediately deleted. Ensure that the service is stopped before issuing the delete command.

```powershell
sc.exe delete ".NET Joke Service"
```

You'll see an output message:

```powershell
[SC] DeleteService SUCCESS
```

For more information, see sc.exe delete.

## See also

- Create a Windows Service installer
- Worker Services in .NET
- Create a Queue Service
- Use scoped services within a `BackgroundService`
- Implement the `IHostedService` interface

## Next

> Create a Windows Service installer
