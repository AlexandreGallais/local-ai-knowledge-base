---
title: "ISupportInitializeNotification interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ISupportInitializeNotification.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ISupportInitializeNotification interface

Namespace: `System.ComponentModel`

```csharp
public interface ISupportInitializeNotification : System.ComponentModel.ISupportInitialize
```

Allows coordination of initialization for a component and its dependent properties.

#### Remarks
You should implement this interface when your component has initialization dependencies on other components that also implement the `ISupportInitializeNotification` interface. You can check to see if the dependent components have completed initialization by checking the `IsInitialized` property.

`ISupportInitializeNotification` is implemented by the `BindingSource` and `ListControl` types.

## ISupportInitializeNotification.IsInitialized property

```csharp
public bool IsInitialized { get; }
```

Gets a value indicating whether the component is initialized.

Returns: `true` to indicate the component has completed initialization; otherwise, `false`.

#### Remarks
The `IsInitialized` property is automatically set to `false` when the `ISupportInitialize.BeginInit` method is called, and `true` when the `ISupportInitialize.EndInit` method is called.

## ISupportInitializeNotification.Initialized event

```csharp
event EventHandler Initialized;
```

Occurs when initialization of the component is completed.

#### Remarks
This event typically occurs during the call to the `ISupportInitialize.EndInit` method for the component, but it may occur later if the component has dependent controls that implement the `ISupportInitializeNotification` interface and the dependent controls have not completed initialization.

For more information about how to handle events, see Handling and Raising Events.
