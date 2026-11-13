---
title: "Interface: Host"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/extensions-sdk/Host.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Interface: Host

**`Since`**

0.2.0

## Methods

### openExternal

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

**`Since`**

0.2.0

```typescript
ddClient.host.openExternal("https://docker.com");
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL the browser will open (must have the protocol `http` or `https`). |

#### Returns

`void`

## Properties

### platform

• **platform**: `string`

Returns a string identifying the operating system platform. See https://nodejs.org/api/os.html#osplatform

**`Since`**

0.2.2

___

### arch

• **arch**: `string`

Returns the operating system CPU architecture. See https://nodejs.org/api/os.html#osarch

**`Since`**

0.2.2

___

### hostname

• **hostname**: `string`

Returns the host name of the operating system. See https://nodejs.org/api/os.html#oshostname

**`Since`**

0.2.2
