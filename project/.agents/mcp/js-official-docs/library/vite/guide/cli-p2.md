---
title: "Command Line Interface (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/cli.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Command Line Interface (part 2 of 2)

## Others

### `vite optimize`

Pre-bundle dependencies.

**Deprecated**: the pre-bundle process runs automatically and does not need to be called.

#### Usage

```bash
vite optimize [root]
```

#### Options

| Options                   |                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--force`                 | Force the optimizer to ignore the cache and re-bundle (`boolean`)                                                                                                                     |
| `-c, --config <file>`     | Use specified config file (`string`)                                                                                                                                                  |
| `--base `           | Public base path (default: `/`) (`string`)                                                                                                                                            |
| `-l, --logLevel <level>`  | info \| warn \| error \| silent (`string`)                                                                                                                                            |
| `--clearScreen`           | Allow/disable clear screen when logging (`boolean`)                                                                                                                                   |
| `--configLoader <loader>` | Use `bundle` to bundle the config with Rolldown, or `runner` (experimental) to process it on the fly, or `native` (experimental) to load using the native runtime (default: `bundle`) |
| `-d, --debug [feat]`      | Show debug logs (`string \| boolean`)                                                                                                                                                 |
| `-f, --filter <filter>`   | Filter debug logs (`string`)                                                                                                                                                          |
| `-m, --mode <mode>`       | Set env mode (`string`)                                                                                                                                                               |
| `-h, --help`              | Display available CLI options                                                                                                                                                         |

### `vite preview`

Locally preview the production build. Do not use this as a production server as it's not designed for it.

This command starts a server in the build directory (by default `dist`). Run `vite build` beforehand to ensure that the build directory is up-to-date. Depending on the project's configured `appType`, it makes use of certain middleware.

#### Usage

```bash
vite preview [root]
```

#### Options

| Options                   |                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--host [host]`           | Specify hostname (`string`)                                                                                                                                                           |
| `--port <port>`           | Specify port (`number`)                                                                                                                                                               |
| `--strictPort`            | Exit if specified port is already in use (`boolean`)                                                                                                                                  |
| `--open [path]`           | Open browser on startup (`boolean \| string`)                                                                                                                                         |
| `--outDir <dir>`          | Output directory (default: `dist`) (`string`)                                                                                                                                         |
| `-c, --config <file>`     | Use specified config file (`string`)                                                                                                                                                  |
| `--base `           | Public base path (default: `/`) (`string`)                                                                                                                                            |
| `-l, --logLevel <level>`  | info \| warn \| error \| silent (`string`)                                                                                                                                            |
| `--clearScreen`           | Allow/disable clear screen when logging (`boolean`)                                                                                                                                   |
| `--configLoader <loader>` | Use `bundle` to bundle the config with Rolldown, or `runner` (experimental) to process it on the fly, or `native` (experimental) to load using the native runtime (default: `bundle`) |
| `-d, --debug [feat]`      | Show debug logs (`string \| boolean`)                                                                                                                                                 |
| `-f, --filter <filter>`   | Filter debug logs (`string`)                                                                                                                                                          |
| `-m, --mode <mode>`       | Set env mode (`string`)                                                                                                                                                               |
| `-h, --help`              | Display available CLI options                                                                                                                                                         |
