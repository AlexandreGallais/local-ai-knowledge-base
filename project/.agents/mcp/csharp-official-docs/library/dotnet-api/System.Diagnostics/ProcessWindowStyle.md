---
title: "ProcessWindowStyle enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessWindowStyle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessWindowStyle enum

Namespace: `System.Diagnostics`

```csharp
public enum ProcessWindowStyle
```

Specified how a new window should appear when the system starts a process.

To be added.

## ProcessWindowStyle.Hidden field

```csharp
Hidden
```

The hidden window style. A window can be either visible or hidden. The system displays a hidden window by not drawing it. If a window is hidden, it is effectively disabled. A hidden window can process messages from the system or from other windows, but it cannot process input from the user or display output. Frequently, an application may keep a new window hidden while it customizes the window's appearance, and then make the window style `ProcessWindowStyle.Normal`. To use `ProcessWindowStyle.Hidden`, the `ProcessStartInfo.UseShellExecute` property must be `true`.

## ProcessWindowStyle.Maximized field

```csharp
Maximized
```

The maximized window style. By default, the system enlarges a maximized window so that it fills the screen or, in the case of a child window, the parent window's client area. If the window has a title bar, the system automatically moves it to the top of the screen or to the top of the parent window's client area. Also, the system disables the window's sizing border and the window-positioning capability of the title bar so that the user cannot move the window by dragging the title bar.

## ProcessWindowStyle.Minimized field

```csharp
Minimized
```

The minimized window style. By default, the system reduces a minimized window to the size of its taskbar button and moves the minimized window to the taskbar.

## ProcessWindowStyle.Normal field

```csharp
Normal
```

The normal, visible window style. The system displays a window with `ProcessWindowStyle.Normal` style on the screen, in a default location. If a window is visible, the user can supply input to the window and view the window's output. Frequently, an application may initialize a new window to the `ProcessWindowStyle.Hidden` style while it customizes the window's appearance, and then make the window style `ProcessWindowStyle.Normal`.
