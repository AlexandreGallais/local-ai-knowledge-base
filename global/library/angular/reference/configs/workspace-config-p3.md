---
title: "Angular workspace configuration (part 3 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/configs/workspace-config.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular workspace configuration (part 3 of 4)

## Complex configuration values

The `assets`, `index`, `outputPath`, `styles`, and `scripts` options can have either simple path string values, or object values with specific fields.
The `sourceMap` and `optimization` options can be set to a simple boolean value. They can also be given a complex value using the configuration file.

The following sections provide more details of how these complex values are used in each case.

### Assets configuration

Each `build` target configuration can include an `assets` array that lists files or folders you want to copy as-is when building your project.
By default, the contents of the `public/` directory are copied over.

To exclude an asset, you can remove it from the assets configuration.

You can further configure assets to be copied by specifying assets as objects, rather than as simple paths relative to the workspace root.
An asset specification object can have the following fields.

| Fields           | Details                                                                                                                                   |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `glob`           | A node-glob using `input` as base directory.                                   |
| `input`          | A path relative to the workspace root.                                                                                                    |
| `output`         | A path relative to `outDir`. Because of the security implications, the Angular CLI never writes files outside of the project output path. |
| `ignore`         | A list of globs to exclude.                                                                                                               |
| `followSymlinks` | Allow glob patterns to follow symlink directories. This allows subdirectories of the symlink to be searched. Defaults to `false`.         |

For example, the following asset objects copy the contents of `src/assets/` to `/assets/` and `src/favicon.ico` to the output root.

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets/",
                "output": "/assets/"
              },
              {
                "glob": "favicon.ico",
                "input": "src/",
                "output": "/"
              }
            ]
          }
        }
      }
    }
  }
}
```

The following example uses the `ignore` field to exclude certain files in the assets directory from being copied into the build:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "assets": [
              {
                "glob": "**/*",
                "input": "src/assets/",
                "ignore": ["**/*.svg"],
                "output": "/assets/"
              }
            ]
          }
        }
      }
    }
  }
}
```

### Styles and scripts configuration

An array entry for the `styles` and `scripts` options can be a simple path string, or an object that points to an extra entry-point file.
The associated builder loads that file and its dependencies as a separate bundle during the build.
With a configuration object, you have the option of naming the bundle for the entry point, using a `bundleName` field.

The bundle is injected by default, but you can set `inject` to `false` to exclude the bundle from injection.
For example, the following object values create and name a bundle that contains styles and scripts, and excludes it from injection:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "styles": [
              {
                "input": "src/external-module/styles.scss",
                "inject": false,
                "bundleName": "external-module"
              }
            ],
            "scripts": [
              {
                "input": "src/external-module/main.js",
                "inject": false,
                "bundleName": "external-module"
              }
            ]
          }
        }
      }
    }
  }
}
```

#### Style preprocessor options

In Sass, you can make use of the `includePaths` feature for both component and global styles. This allows you to add extra base paths that are checked for imports.

To add paths, use the `stylePreprocessorOptions` option:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "stylePreprocessorOptions": {
              "includePaths": ["src/style-paths"]
            }
          }
        }
      }
    }
  }
}
```

Files in that directory, such as `src/style-paths/_variables.scss`, can be imported from anywhere in your project without the need for a relative path:

```scss
// A relative path works
@import '../style-paths/variables';

// But now this works as well
@import 'variables';
```

HELPFUL: The default `@angular/build:unit-test` builder has no `styles` or `scripts` options. It inherits `styles` and `stylePreprocessorOptions` from the build target set in its `buildTarget` option, but not `scripts`.
To run a script before your unit tests, add it to the `setupFiles` option of the `test` target.
If your project uses the `@angular/build:karma` builder, add any styles or scripts that your unit tests need to the `test` target.
See also Using runtime-global libraries inside your application.

### Optimization configuration

The `optimization` option can be either a boolean or an object for more fine-tune configuration.
This option enables various optimizations of the build output, including:

- Minification of scripts and styles
- Tree-shaking
- Dead-code elimination
- Inlining of critical CSS
- Fonts inlining

Several options can be used to fine-tune the optimization of an application.

| Options   | Details                                                        | Value type                                                               | Default value |
| :-------- | :------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------ |
| `scripts` | Enables optimization of the scripts output.                    | `boolean`                                                                | `true`        |
| `styles`  | Enables optimization of the styles output.                     | `boolean` \| Styles optimization options | `true`        |
| `fonts`   | Enables optimization for fonts. This requires internet access. | `boolean` \| Fonts optimization options   | `true`        |

#### Styles optimization options

| Options                 | Details                                                                                                                  | Value type | Default value |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `minify`                | Minify CSS definitions by removing extraneous whitespace and comments, merging identifiers, and minimizing values.       | `boolean`  | `true`        |
| `inlineCritical`        | Extract and inline critical CSS definitions to improve First Contentful Paint. | `boolean`  | `true`        |
| `removeSpecialComments` | Remove comments in global CSS that contains `@license` or `@preserve` or that starts with `//!` or `/*!`.                | `boolean`  | `true`        |

#### Fonts optimization options

| Options  | Details                                                                                                                                                                                                             | Value type | Default value |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- | :------------ |
| `inline` | Reduce render blocking requests by inlining external Google Fonts and Adobe Fonts CSS definitions in the application's HTML index file. This requires internet access. | `boolean`  | `true`        |

You can supply a value such as the following to apply optimization to one or the other:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "optimization": {
              "scripts": true,
              "styles": {
                "minify": true,
                "inlineCritical": true
              },
              "fonts": true
            }
          }
        }
      }
    }
  }
}
```

### Source map configuration

The `sourceMap` builder option can be either a boolean or an object for more fine-tune configuration to control the source maps of an application.

| Options          | Details                                                      | Value type | Default value |
| :--------------- | :----------------------------------------------------------- | :--------- | :------------ |
| `scripts`        | Output source maps for all scripts.                          | `boolean`  | `true`        |
| `styles`         | Output source maps for all styles.                           | `boolean`  | `true`        |
| `vendor`         | Resolve vendor packages source maps.                         | `boolean`  | `false`       |
| `hidden`         | Omit link to sourcemaps from the output JavaScript.          | `boolean`  | `false`       |
| `sourcesContent` | Output original source content for files within source maps. | `boolean`  | `true`        |

The example below shows how to toggle one or more values to configure the source map outputs:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "sourceMap": {
              "scripts": true,
              "styles": false,
              "hidden": true,
              "vendor": true
            }
          }
        }
      }
    }
  }
}
```

HELPFUL: When using hidden source maps, source maps are not referenced in the bundle.
These are useful if you only want source maps to map stack traces in error reporting tools without showing up in browser developer tools.
Note that even though `hidden` prevents the source map from being linked in the output bundle, your deployment process must take care not to serve the generated sourcemaps in production, or else the information is still leaked.

#### Source maps without sources content

You can generate source maps without the `sourcesContent` field, which contains the original source code.
This allows you to deploy source maps to production for better error reporting with original source names while protecting your source code from exposure.

To exclude sources content from source maps, set the `sourcesContent` option to `false`:

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "sourceMap": {
              "scripts": true,
              "styles": true,
              "sourcesContent": false
            }
          }
        }
      }
    }
  }
}
```

### Index configuration

Configures generation of the application's HTML index.

The `index` option can be either a string or an object for more fine-tune configuration.
Set it to `false` to not generate an HTML index file.

When supplying the value as a string the filename of the specified path will be used for the generated file and will be created in the root of the application's configured output path.

#### Index options

| Options          | Details                                                                                                                                                                          | Value type | Default value                                              |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :--------------------------------------------------------- |
| `input`          | The path of a file to use for the application's generated HTML index.                                                                                                            | `string`   | None (required)                                            |
| `output`         | The output path of the application's generated HTML index file. The full provided path will be used and will be considered relative to the application's configured output path. | `string`   | `index.html`                                               |
| `preloadInitial` | Generates `preload`, `modulepreload`, and `preconnect` link elements for the application's initial files and resources.                                                          | `boolean`  | `false` when a service worker is enabled, otherwise `true` |

### Security configuration

The `security` option is an object that enables individual security features.

| Options        | Details                                                                                                                                                                                                                   |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `autoCsp`      | Generates a hash-based Content Security Policy when set to `true`, or to `{"unsafeEval": true}` to also allow `eval`. See Hash inline scripts with `autoCsp`. |
| `allowedHosts` | The hostnames allowed to access the server-side application. See Preventing Server-Side Request Forgery (SSRF).                                    |
