---
title: ".NET on Web Workers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/client-side/dotnet-on-webworkers.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# .NET on Web Workers

-->
-->

-->

Modern web apps often require intensive computational tasks that can block the main UI thread, leading to poor user experience. Web Workers provide a solution to this problem by enabling JavaScript (JS) to run on separate threads. With .NET WebAssembly (Wasm), you can run C# code in Web Workers, combining the performance benefits of compiled code with the non-blocking execution model of background threads.

This approach is particularly valuable when you need to perform complex calculations, data processing, or business logic without requiring direct DOM manipulation. Instead of rewriting algorithms in JS, you can maintain your existing .NET codebase and execute it efficiently in the background while your React.js frontend remains responsive.

> **Tip:**
> In .NET 11 or later, `dotnet new blazorwebworker` generates the worker scripts and starter `[JSExport]` code used by the Blazor integration. For the Blazor-specific walkthrough, see ASP.NET Core Blazor with .NET on Web Workers.

This article demonstrates the React approach using a standalone .NET WebAssembly project.

## Sample app

Explore a complete working implementation in the Blazor samples GitHub repository. The sample is available for .NET 10 or later and named `DotNetOnWebWorkersReact`.

## Prerequisites and setup

Before diving into the implementation, ensure the necessary tools are installed.

The .NET 11 SDK or later is required for the `blazorwebworker` template approach.

For the React.js frontend, Node.js and npm must be installed.

Create a new React app with Vite:

```bash
npm create vite@latest react-app
cd react-app
npm install
```

When prompted, select `React` and `JavaScript`.

## Create the .NET WebAssembly project

In .NET 11 or later, you can start from the Blazor Web Worker template and adapt it for a React host:

```bash
dotnet new blazorwebworker -o WebWorkersOnReact
cd WebWorkersOnReact
dotnet add package QRCoder
```

Update `WebWorkersOnReact.csproj` to use the WebAssembly SDK and build as a library. The template uses the Razor SDK by default because, in the Blazor scenario, the host app already provides the .NET WebAssembly runtime assets. In a React app, there isn't a Blazor host to provide that runtime bundle, so the worker project must produce its own `_framework` output.

Setting `<OutputType>Library</OutputType>` enables WebAssembly library mode. In this mode, the project produces the runtime files needed by the worker scripts but doesn't require a standalone app entry point:

```xml
<Project Sdk="Microsoft.NET.Sdk.WebAssembly">
  <PropertyGroup>
    <TargetFramework>net11.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
    <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
    <OutputType>Library</OutputType>
  </PropertyGroup>
</Project>
```

Delete `WebWorkerClient.cs` because it's specific to the Blazor integration.

Update `WorkerMethods.cs` with the methods that the React app should call:

```csharp
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using QRCoder;

namespace WebWorkersOnReact;

[SupportedOSPlatform("browser")]
public static partial class WorkerMethods
{
    private static readonly int MaxQrSize = 20;

    [JSExport]
    public static byte[] Generate(string text, int qrSize)
    {
        if (qrSize >= MaxQrSize)
        {
            throw new ArgumentOutOfRangeException(
                nameof(qrSize),
                $"QR code size must be less than {MaxQrSize}.");
        }

        using var qrGenerator = new QRCodeGenerator();
        using var qrCodeData = qrGenerator.CreateQrCode(text, QRCodeGenerator.ECCLevel.Q);
        var qrCode = new BitmapByteQRCode(qrCodeData);
        return qrCode.GetGraphic(qrSize);
    }
}
```

Build the worker project:

```bash
dotnet build
```

## Set up the React app

For a quick test, copy the worker output into the React app's static files manually. For a real app, automate these copies with an npm script or another build step.

Use the generated JavaScript client to host the .NET WebAssembly runtime in a Web Worker. For example:

* Copy `WebWorkersOnReact/bin/Debug/net11.0/wwwroot/_framework` to `react-app/public/_framework`.
* Copy `WebWorkersOnReact/wwwroot/dotnet-web-worker.js` to `react-app/public/_content/WebWorkersOnReact/dotnet-web-worker.js`.
* Copy `WebWorkersOnReact/wwwroot/dotnet-web-worker-client.js` to `react-app/public/_content/WebWorkersOnReact/dotnet-web-worker-client.js`.

Then create a client helper, such as `src/client.js`, to load the generated client and call the worker:

```javascript
let worker;

async function getWorker() {
  if (!worker) {
    const { create } = await import(
      /* @vite-ignore */ '/_content/WebWorkersOnReact/dotnet-web-worker-client.js');
    worker = await create(60000, { assemblyName: 'WebWorkersOnReact' });
  }

  return worker;
}

export async function generateQR(text, size) {
  const worker = await getWorker();
  const response = await worker.invoke(
    'WebWorkersOnReact.WorkerMethods.Generate',
    [text, size],
    60000);
  const blob = new Blob([response], { type: 'image/png' });
  return URL.createObjectURL(blob);
}
```

Replace the starter content in `src/App.jsx` with a button that calls `generateQR`:

```javascript
import { useState } from 'react';
import './App.css';
import { generateQR } from './client';

function App() {
  const [qrUrl, setQrUrl] = useState('');
  const [status, setStatus] = useState('Ready');

  async function handleGenerate() {
    try {
      setStatus('Generating QR code...');
      const url = await generateQR('Hello from docs', 10);
      setQrUrl(url);
      setStatus('Done');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <main>
      <h1>.NET on Web Workers</h1>
      <p>{status}</p>
      <button onClick={handleGenerate}>Generate QR</button>
      {qrUrl ? <img src={qrUrl} alt="Generated QR code" /> : null}
    </main>
  );
}

export default App;
```

Run the app:

```bash
npm run dev
```

Open the local URL shown by the development server and select **Generate QR**. If everything is set up correctly, the page displays the generated image.

## Performance considerations and optimization

When working with .NET on Web Workers, consider these key optimization strategies:

* **Minimize data transfer**: Serialize only essential data between the main thread and worker to reduce communication overhead.
* **Batch operations**: Group multiple calculations together rather than sending individual requests.
* **Memory management**: Be mindful of memory usage in the WebAssembly environment, especially for long-running workers.
* **Startup cost**: WebAssembly initialization has overhead, so prefer persistent workers over frequent creation/destruction.

See the sample app for a demonstration of the preceding concepts.

## Related content

ASP.NET Core Blazor with .NET on Web Workers
