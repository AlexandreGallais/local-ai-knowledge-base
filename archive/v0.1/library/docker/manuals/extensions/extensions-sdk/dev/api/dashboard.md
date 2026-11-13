---
title: "Dashboard"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/dev/api/dashboard.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Dashboard

## User notifications

Toasts provide a brief notification to the user. They appear temporarily and
shouldn't interrupt the user experience. They also don't require user input to disappear.

### success

▸ **success**(`msg`): `void`

Use to display a toast message of type success.

```typescript
ddClient.desktopUI.toast.success("message");
```

### warning

▸ **warning**(`msg`): `void`

Use to display a toast message of type warning.

```typescript
ddClient.desktopUI.toast.warning("message");
```

### error

▸ **error**(`msg`): `void`

Use to display a toast message of type error.

```typescript
ddClient.desktopUI.toast.error("message");
```

For more details about method parameters and the return types available, see Toast API reference.

> Deprecated user notifications
>
> These methods are deprecated and will be removed in a future version. Use the methods specified above.

```typescript
window.ddClient.toastSuccess("message");
window.ddClient.toastWarning("message");
window.ddClient.toastError("message");
```

## Open a file selection dialog

This function opens a file selector dialog that asks the user to select a file or folder.

▸ **showOpenDialog**(`dialogProperties`): `Promise`<`OpenDialogResult`\>:

The `dialogProperties` parameter is a list of flags passed to Electron to customize the dialog's behaviour. For example, you can pass `multiSelections` to allow a user to select multiple files. See Electron's documentation for a full list.

```typescript
const result = await ddClient.desktopUI.dialog.showOpenDialog({
  properties: ["openDirectory"],
});
if (!result.canceled) {
  console.log(result.paths);
}
```

## Open a URL

This function opens an external URL with the system default browser.

▸ **openExternal**(`url`): `void`

```typescript
ddClient.host.openExternal("https://docker.com");
```

> The URL must have the protocol `http` or `https`.

For more details about method parameters and the return types available, see Desktop host API reference.

> Deprecated external URL opening
>
> This method is deprecated and will be removed in a future version. Use the methods specified above.

```typescript
window.ddClient.openExternal("https://docker.com");
```

## Navigation to Dashboard routes

From your extension, you can also navigate to other parts of the Docker Desktop Dashboard.
