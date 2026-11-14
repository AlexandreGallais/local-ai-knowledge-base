---
title: "Service Worker configuration file (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/service-workers/config.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Service Worker configuration file

This topic describes the properties of the service worker configuration file.

## Modifying the configuration

The `ngsw-config.json` JSON configuration file specifies which files and data URLs the Angular service worker should cache and how it should update the cached files and data.
The Angular CLI processes this configuration file during `ng build`.

All file paths must begin with `/`, which corresponds to the deployment directory — usually `dist/<project-name>` in CLI projects.

Unless otherwise commented, patterns use a **limited\*** glob format that internally will be converted into regex:

| Glob formats | Details                                                                                                |
| :----------- | :----------------------------------------------------------------------------------------------------- |
| `**`         | Matches 0 or more path segments                                                                        |
| `*`          | Matches 0 or more characters excluding `/`                                                             |
| `?`          | Matches exactly one character excluding `/`                                                            |
| `!` prefix   | Marks the pattern as being negative, meaning that only files that don't match the pattern are included |

**Special characters need to be escaped**
Pay attention that some characters with a special meaning in a regular expression are not escaped and also the pattern is not wrapped in `^`/`$` in the internal glob to regex conversion.

`$` is a special character in regex that matches the end of the string and will not be automatically escaped when converting the glob pattern to a regular expression.

If you want to literally match the `$` character, you have to escape it yourself (with `\\$`). For example, the glob pattern `/foo/bar/$value` results in an unmatchable expression, because it is impossible to have a string that has any characters after it has ended.

The pattern will not be automatically wrapped in `^` and `$` when converting it to a regular expression. Therefore, the patterns will partially match the request URLs.

If you want your patterns to match the beginning and/or end of URLs, you can add `^`/`$` yourself. For example, the glob pattern `/foo/bar/*.js` will match both `.js` and `.json` files. If you want to only match `.js` files, use `/foo/bar/*.js$`.

Example patterns:

| Patterns     | Details                               |
| :----------- | :------------------------------------ |
| `/**/*.html` | Specifies all HTML files              |
| `/*.html`    | Specifies only HTML files in the root |
| `!/**/*.map` | Exclude all sourcemaps                |
