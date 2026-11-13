---
title: "Angular workspace configuration (part 4 of 4)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/configs/workspace-config.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular workspace configuration (part 4 of 4)

### Output path configuration

The `outputPath` option can be either a String which will be used as the `base` value or an Object for more fine-tune configuration.

Several options can be used to fine-tune the output structure of an application.

| Options   | Details                                                                                                                                                           | Value type | Default value |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :------------ |
| `base`    | Specify the output path relative to workspace root.                                                                                                               | `string`   |               |
| `browser` | The output directory name for your browser build is within the base output path. This can be safely served to users.                                              | `string`   | `browser`     |
| `server`  | The output directory name of your server build within the output path base.                                                                                       | `string`   | `server`      |
| `media`   | The output directory name for your media files located within the output browser directory. These media files are commonly referred to as resources in CSS files. | `string`   | `media`       |
