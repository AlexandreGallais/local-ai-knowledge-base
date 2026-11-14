---
title: "Breaking change: IMsoComponent support is opt-in"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/9.0/imsocomponent-support.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# IMsoComponent support is opt-in

A change was made to avoid Windows Forms threads always registering with existing IMsoComponentManager instances. However, you can opt in to register existing `IMsoComponentManager` instances to your Windows Forms threads.

## Version introduced

.NET 9 Preview 2

## Previous behavior

Previously, Windows Forms threads always registered with existing `IMsoComponentManager` instances.

## New behavior

Starting in .NET 9, Windows Forms threads don't automatically integrate with process-registered `IMsoComponentManagers`. To get the previous behavior back, set the switch `Switch.System.Windows.Forms.EnableMsoComponentManager`.

## Change category

This change is a *behavioral change*.

## Reason for change

This change was made for performance and efficiency. The previous behavior presented a lot of overhead as it used COM, and not all developers need this behavior.

## Recommended action

If you wish to revert to the previous behavior, you can opt in to `IMsoComponent` support using a switch in the *runtimeconfig.json* file or as a `RuntimeHostConfigurationOption` item in the project file.

*runtimeconfig.json* file:

```json
{
  "configProperties": {
    "Switch.System.Windows.Forms.EnableMsoComponentManager": true
 }
}
```

Project file:

```xml
<ItemGroup>
  <RuntimeHostConfigurationOption Include="Switch.System.Windows.Forms.EnableMsoComponentManager" Value="true" />
</ItemGroup>
```

## Affected APIs

- IMsoComponent interface
- IMsoComponentManager interface
