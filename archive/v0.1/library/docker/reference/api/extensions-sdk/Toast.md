---
title: "Interface: Toast"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/extensions-sdk/Toast.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Interface: Toast

Toasts provide a brief notification to the user.
They appear temporarily and shouldn't interrupt the user experience.
They also don't require user input to disappear.

**`Since`**

0.2.0

## Methods

### success

▸ **success**(`msg`): `void`

Display a toast message of type success.

```typescript
ddClient.desktopUI.toast.success("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

___

### warning

▸ **warning**(`msg`): `void`

Display a toast message of type warning.

```typescript
ddClient.desktopUI.toast.warning("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the warning. |

#### Returns

`void`

___

### error

▸ **error**(`msg`): `void`

Display a toast message of type error.

```typescript
ddClient.desktopUI.toast.error("message");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`
