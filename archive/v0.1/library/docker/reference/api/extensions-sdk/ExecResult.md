---
title: "Interface: ExecResult"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/api/extensions-sdk/ExecResult.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Interface: ExecResult

**`Since`**

0.2.0

## Hierarchy

- `RawExecResult`

  ↳ **`ExecResult`**

## Methods

### lines

▸ **lines**(): `string`[]

Split output lines.

#### Returns

`string`[]

The list of lines.

___

### parseJsonLines

▸ **parseJsonLines**(): `any`[]

Parse each output line as a JSON object.

#### Returns

`any`[]

The list of lines where each line is a JSON object.

___

### parseJsonObject

▸ **parseJsonObject**(): `any`

Parse a well-formed JSON output.

#### Returns

`any`

The JSON object.

## Properties

### cmd

• `Optional` `Readonly` **cmd**: `string`

#### Inherited from

RawExecResult.cmd

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

RawExecResult.killed

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

RawExecResult.signal

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

RawExecResult.code

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

RawExecResult.stdout

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

RawExecResult.stderr
