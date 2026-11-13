---
title: "Server Options (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/config/server-options.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Server Options (part 2 of 2)

## server.fs.allow

- **Type:** `string[]`

Restrict files that could be served via `/@fs/`. When `server.fs.strict` is set to `true`, accessing files outside this directory list that aren't imported from an allowed file will result in a 403.

Both directories and files can be provided.

Vite will search for the root of the potential workspace and use it as default. A valid workspace met the following conditions, otherwise will fall back to the project root.

- contains `workspaces` field in `package.json`
- contains one of the following file
  - `lerna.json`
  - `pnpm-workspace.yaml`

Accepts a path to specify the custom workspace root. Could be a absolute path or a path relative to project root. For example:

```js
export default defineConfig({
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
})
```

When `server.fs.allow` is specified, the auto workspace root detection will be disabled. To extend the original behavior, a utility `searchForWorkspaceRoot` is exposed:

```js
import { defineConfig, searchForWorkspaceRoot } from 'vite'

export default defineConfig({
  server: {
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        '/path/to/custom/allow_directory',
        '/path/to/custom/allow_file.demo',
      ],
    },
  },
})
```

## server.fs.deny

- **Type:** `string[]`
- **Default:** `['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**']`

Blocklist for sensitive files being restricted to be served by Vite dev server. This will have higher priority than `server.fs.allow`. picomatch patterns are supported.

Setting this option replaces the default list entirely. Include any default patterns you want to keep in your custom list.

**NOTE**

This blocklist does not apply to the public directory. All files in the public directory are served without any filtering, since they are copied directly to the output directory during build.

**NOTE**

The deny filter is applied against the module id and the id with query parameters stripped. Since a plugin can read files from any files in its load hook (including resolving symlinks to denied paths), Vite cannot guarantee that a denied file is inaccessible through an alternative path. If you have an alternative path, include it in the deny list as well.

## server.origin

- **Type:** `string`

Defines the origin of the generated asset URLs during development.

```js
export default defineConfig({
  server: {
    origin: 'http://127.0.0.1:8080',
  },
})
```

## server.sourcemapIgnoreList

- **Type:** `false | (sourcePath: string, sourcemapPath: string) => boolean`
- **Default:** `(sourcePath) => /(?:^|[\\/])node_modules(?:[\\/]|$)/.test(sourcePath)`

Whether or not to ignore source files in the server sourcemap, used to populate the `x_google_ignoreList` source map extension.

`server.sourcemapIgnoreList` is the equivalent of `build.rolldownOptions.output.sourcemapIgnoreList` for the dev server. A difference between the two config options is that the Rolldown function is called with a relative path for `sourcePath` while `server.sourcemapIgnoreList` is called with an absolute path. During dev, most modules have the map and the source in the same folder, so the relative path for `sourcePath` is the file name itself. In these cases, absolute paths make it convenient to be used instead.

By default, it excludes all paths that contain `node_modules` as a path segment. You can pass `false` to disable this behavior, or, for full control, a function that takes the source path and sourcemap path and returns whether to ignore the source path.

```js
export default defineConfig({
  server: {
    // This is the default value, and will add all files that have
    // node_modules as a path segment to the ignore list.
    sourcemapIgnoreList(sourcePath, sourcemapPath) {
      return /(?:^|[\\/])node_modules(?:[\\/]|$)/.test(sourcePath)
    },
  },
})
```

**Note**
`server.sourcemapIgnoreList` and `build.rolldownOptions.output.sourcemapIgnoreList` need to be set independently. `server.sourcemapIgnoreList` is a server only config and doesn't get its default value from the defined Rolldown options.
