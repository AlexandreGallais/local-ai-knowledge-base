---
title: "FileConfigurationProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/FileConfigurationProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileConfigurationProvider class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public abstract class FileConfigurationProvider : Microsoft.Extensions.Configuration.ConfigurationProvider, IDisposable
```

Provides the base class for file-based `ConfigurationProvider` providers.

#### Remarks

For more information and examples, see File configuration provider.

## FileConfigurationProvider.FileConfigurationProvider(FileConfigurationSource) constructor

```csharp
public FileConfigurationProvider (Microsoft.Extensions.Configuration.FileConfigurationSource source);
```

Initializes a new instance with the specified source.

Parameters:

- `source`: The source settings.

To be added.

## FileConfigurationProvider.Source property

```csharp
public Microsoft.Extensions.Configuration.FileConfigurationSource Source { get; }
```

Gets the source settings for this provider.

Returns: To be added.

To be added.

## FileConfigurationProvider.Dispose() method

```csharp
public void Dispose ();
```

Performs application-defined tasks associated with freeing, releasing, or resetting unmanaged resources.

To be added.

## FileConfigurationProvider.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Disposes the provider.

Parameters:

- `disposing`: `true` if invoked from `IDisposable.Dispose`.

To be added.

## FileConfigurationProvider.Load() method

```csharp
public override void Load ();
```

Loads the contents of the file at `Path`.

Exceptions:

- `DirectoryNotFoundException`: Optional is `false` on the source and a
directory cannot be found at the specified Path.
- `FileNotFoundException`: Optional is `false` on the source and a
file does not exist at specified Path.
- `InvalidDataException`: An exception was thrown by the concrete implementation of the
`FileConfigurationProvider.Load` method. Use the source `FileConfigurationSource.OnLoadException` callback
if you need more control over the exception.
- `IOException`: An I/O error occurred when opening the file. Other exceptions from the
underlying file provider may also be thrown. Use the source `FileConfigurationSource.OnLoadException`
callback if you need more control over the exception.

To be added.

## FileConfigurationProvider.Load(Stream) method

```csharp
public abstract void Load (System.IO.Stream stream);
```

Loads this provider's data from a stream.

Parameters:

- `stream`: The stream to read.

To be added.

## FileConfigurationProvider.ToString() method

```csharp
public override string ToString ();
```

Generates a string representing this provider name and relevant details.

Returns: The configuration name.

To be added.
