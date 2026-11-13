---
title: "IDBTransaction: durability property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/idbtransaction/durability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IDBTransaction: durability property

The **`durability`** read-only property of the `IDBTransaction` interface returns the durability hint the transaction was created with.
This is a hint to the user agent of whether to prioritize performance or durability when committing the transaction.

The value of this property is defined in the `options.durability` parameter when creating a transaction using `IDBDatabase.transaction()`.

## Value

Any of the following literal `strings`:

- `"strict"`
    The user agent may consider that the transaction has successfully committed only after verifying that all outstanding changes have been successfully written to a persistent storage medium.
- `"relaxed"`
    The user agent may consider that the transaction has successfully committed as soon as all outstanding changes have been written to the operating system, without subsequent verification.
- `"default"`
    The user agent should use its default durability behavior for the storage bucket.
    This is the default for transactions if not otherwise specified.

## Examples

For a full working example, see our To-do Notifications app (view example live).
