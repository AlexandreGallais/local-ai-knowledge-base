# Packages of the base

The npm packages a project of the base installs, once, with the user's agreement (decision 0016 of
the project: known, maintained, needed; version pinned; license noted). The AI never installs a
package of its own accord.

## Chosen

| Package | Version | License | Why |
| --- | --- | --- | --- |
| eslint-plugin-import-lite | 0.6.0 | MIT | Import rules that need no resolver: `no-default-export`, `no-mutable-exports`, `no-duplicates`, `first`, `consistent-type-specifier-style`. |

## Set aside

| Package | Why |
| --- | --- |
| eslint-plugin-import-x | Depends on `unrs-resolver`, a native binary built per platform: heavy, and one more binary to bring into a closed environment. Its two rules that need a resolver (`no-extraneous-dependencies`, `no-cycle`) are replaced by local rules of the base. |
| eslint-plugin-n | Rules for Node.js programs, not for front-end code. |

The rest of the list comes with the formatting and lint profiles.
