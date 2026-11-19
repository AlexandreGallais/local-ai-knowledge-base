---
name: serialization-and-ipc
description: "Defines data contracts between processes and versions - Protobuf, JSON Schema, MessagePack, sockets, D-Bus - with compatible evolution. Use when two programs exchange data, when changing a message or file format, adding a field to a protocol, or when one side fails to decode the other's messages."
metadata:
  id: DEV-19
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Serialization and IPC

**Core rule:** the contract is written in a schema file, versioned, and changed only in backward-compatible ways unless both sides upgrade together.

## Procedure

1. Find or write the schema (`.proto`, JSON Schema, IDL) and where each side reads it.
   - Check: both sides use the same schema version.
2. Change it compatibly with the table.
   - Check: an old message decodes with the new code, and a new message with the old code (test both).
3. Validate at the boundary: decode errors are reported with the field and the version.
   - Check: a malformed message gives a clear error, not a crash.
4. Version breaking changes: new message type, new field number, or a version field.
   - Check: both versions are handled during the transition.

| Change | Compatible? |
| --- | --- |
| Add an optional field with a default | yes |
| Remove a field | only after no reader uses it; reserve its number or name |
| Rename a field (Protobuf) | wire-compatible by number; JSON is not |
| Change a field's type | no; add a new field |
| Make an optional field required | no |

## Stop and ask the human if

- A breaking change is needed and the other side is owned by another team.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Reuse a deleted Protobuf field number." | Old data is then misread. Reserve it. |
| "JSON is schema-less, no contract needed." | The contract exists in both programs; write it down. |

## Definition of done

- [ ] Schema versioned; change compatible both ways by test, or versioned as breaking.
