---
title: "ExceptionRecorder delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ExceptionRecorder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExceptionRecorder delegate

Namespace: `System.Diagnostics`

```csharp
public delegate void ExceptionRecorder(Activity activity, Exception exception, ref TagList tags);
```

Defines the callback to be used in `ActivityListener` to receive notifications when exceptions are added to the `Activity`.

Parameters:

- `activity`: To be added.
- `exception`: To be added.
- `tags`: To be added.

To be added.
