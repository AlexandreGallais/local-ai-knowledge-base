---
title: "Kitchen sink"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/kitchen-sink.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Kitchen sink
This is a visual list of all custom components and styles for Angular.dev.

As a design system, this page contains visual and Markdown authoring guidance for:

- Custom Angular docs elements: `docs-card`, `docs-callout`, `docs-pill`, and `docs-steps`
- Custom text elements: alerts
- Code examples: `docs-code`
- Built-in Markdown styled elements: links, lists, headers, horizontal lines
- and more!

Get ready to:

1. Write...
2. great...
3. docs!

## Headers (h2)

### Smaller headers (h3)

#### Even smaller (h4)

##### Even more smaller (h5)

###### The smallest! (h6)

## Cards

  **What is Angular?**
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare ligula nisi

  **Second Card**
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare ligula nisi

    **No Link Card**
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare ligula nisi

### `` Attributes

| Attributes              | Details                                           |
| :---------------------- | :------------------------------------------------ |
| `` | All cards must be nested inside a container       |
| `title`                 | Card title                                        |
| card body contents      | Anything between `` and `` |
| `link`                  | (Optional) Call to Action link text               |
| `href`                  | (Optional) Call to Action link href               |

## Callouts

**Title of a callout that is helpful**
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus metus blandit semper faucibus. Sed blandit diam quis tellus maximus, ac scelerisque ex egestas. Ut euismod lobortis mauris pretium iaculis. Quisque ullamcorper, elit ut lacinia blandit, magna sem finibus urna, vel suscipit tortor dolor id risus.

**Title of a callout that is critical**
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus metus blandit semper faucibus. Sed blandit diam quis tellus maximus, ac scelerisque ex egestas. Ut euismod lobortis mauris pretium iaculis. Quisque ullamcorper, elit ut lacinia blandit, magna sem finibus urna, vel suscipit tortor dolor id risus.

**Title of a callout that is important**
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus metus blandit semper faucibus. Sed blandit diam quis tellus maximus, ac scelerisque ex egestas. Ut euismod lobortis mauris pretium iaculis. Quisque ullamcorper, elit ut lacinia blandit, magna sem finibus urna, vel suscipit tortor dolor id risus.

### `` Attributes

| Attributes                                       | Details                                                   |
| :----------------------------------------------- | :-------------------------------------------------------- |
| `title`                                          | Callout title                                             |
| card body contents                               | Anything between `` and ``   |
| `helpful` (default) \| `critical` \| `important` | (Optional) Adds styling and icons based on severity level |

## Pills

Pill rows are helpful as a sort of navigation with links to helpful resources.

  - Link
  - Link
  - Link
  - Link
  - Link
  - Link

### `- ` Attributes

| Attributes       | Details                                    |
| :--------------- | :----------------------------------------- |
| `<docs-pill-row` | All pills must be nested inside a pill row |
| `title`          | Pill text                                  |
| `href`           | Pill href                                  |

Pills may also be used inline by themselves, but we haven't built that out yet.

## Alerts

Alerts are just special paragraphs. They are helpful to call out (not to be confused with call-out) something that's a bit more urgent. They gain font size from context and are available in many levels. Try not to use alerts to render too much content, but rather to enhance and call attention to surrounding content.

Style alerts starting on a new line in Markdown using the format `SEVERITY_LEVEL` + `:` + `ALERT_TEXT`.

NOTE: Use Note for ancillary/additional information that's not _essential_ to the main text.

TIP: Use Tip to call out a specific task/action users can perform, or a fact that plays directly into a task/action.

TODO: Use TODO for incomplete documentation that you plan to expand soon. You can also assign the TODO, e.g. TODO(emmatwersky): Text.

QUESTION: Use Question to pose a question to the reader, kind of like a mini-quiz that they should be able to answer.

SUMMARY: Use Summary to provide a two- or three-sentence synopsis of the page or section content, so readers can figure out whether this is the right place for them.

TLDR: Use TL;DR (or TLDR) if you can provide the essential information about a page or section in a sentence or two. For example, TLDR: Rhubarb is a cat.

CRITICAL: Use Critical to call out potential bad stuff or alert the reader they ought to be careful before doing something. For example, Warning: Running `rm` with the `-f` option will delete write-protected files or directories without prompting you.

IMPORTANT: Use Important for information that's crucial to comprehending the text or to completing some task.

HELPFUL: Use Best practice to call out practices that are known to be successful or better than alternatives.

NOTE: Heads up `developers`! Alerts _can_ have a link and other nested styles (but try to **use this sparingly**)!.

## Code

You can display `code` using the built in triple backtick:

```ts
example code
```

Or using the ````
` element.

import { Component } from '@angular/core';

@Component({
selector: 'example-code',
template: '<h1>Hello World!</h1>',
})
export class ComponentOverviewComponent {}
```

### Styling the example

Here's a code example fully styled:

File: `A styled code example`

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
})
export class HelloWorldComponent {
  message = 'Hello World!';
}
```

We also have styling for the terminal, just set the language as `shell`:

```shell
npm install @angular/material --save
```

You can style standard Markdown triple backticks with attributes for enhanced presentation:

```ts
console.log('Hello, World!');
console.log('Awesome Angular Docs!');
```

#### `` Attributes

| Attributes     | Type                 | Details                                                         |
| :------------- | :------------------- | :-------------------------------------------------------------- |
| code           | `string`             | Anything between tags is treated as code                        |
| `path`         | `string`             | Path to code example (root: `content/examples/`)                |
| `header`       | `string`             | Title of the example (default: `file-name`)                     |
| `language`     | `string`             | code language                                                   |
| `linenums`     | `boolean`            | (False) displays line numbers                                   |
| `highlight`    | `string of number[]` | lines highlighted                                               |
| `visibleLines` | `string of number[]` | range of lines for collapse mode                                |
| `region`       | `string`             | only show the provided region.                                  |
| `preview`      | `boolean`            | (False) display preview                                         |
| `hideCode`     | `boolean`            | (False) Whether to collapse code example by default.            |
| `hideDollar`   | `boolean`            | (False) Whether to hide the dollar sign in shell code examples. |

### Multifile examples

You can create multifile examples by wrapping the examples inside a ``.

```html
<h1>{{ message }}</h1>
```
```css
h1 {
 background-image: linear-gradient(to right, oklch(53.18% 0.28 296.97), oklch(69.02% 0.277 332.77)); 
 background-clip: text;
 color: transparent;
}
```

#### `` Attributes

| Attributes    | Type      | Details                                              |
| :------------ | :-------- | :--------------------------------------------------- |
| body contents | `string`  | nested tabs of `docs-code` examples                  |
| `path`        | `string`  | Path to code example for preview and external link   |
| `preview`     | `boolean` | (False) display preview                              |
| `hideCode`    | `boolean` | (False) Whether to collapse code example by default. |

### Adding `preview` to your code example

Adding the `preview` flag builds a running example of the code below the code snippet. This also automatically adds a button to open the running example in StackBlitz.

NOTE: `preview` only works with standalone.

### Styling example previews with Tailwind CSS

Tailwind utility classes can be used within code examples.

```html
<h1 class="text-pink-500 dark:text-violet-500 underline">{{ message }}</h1>
```
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: 'tailwind-app.component.html',
})
export class HelloWorldComponent {
  message = 'Hello Angular World!';
}
```

## Tabs

  **Code Example**

    ```html
<h1 class="text-pink-500 dark:text-violet-500 underline">{{ message }}</h1>
```
    ```ts
import {Component} from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: 'tailwind-app.component.html',
})
export class HelloWorldComponent {
  message = 'Hello Angular World!';
}
```

  **Some Text**
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus metus blandit semper faucibus. Sed blandit diam quis tellus maximus, ac scelerisque ex egestas. Ut euismod lobortis mauris pretium iaculis. Quisque ullamcorper, elit ut lacinia blandit, magna sem finibus urna, vel suscipit tortor dolor id risus.

## Workflow

Style numbered steps using `### `. Numbering is created using CSS (handy!).

### `` and `### ` Attributes

| Attributes         | Details                                           |
| :----------------- | :------------------------------------------------ |
| ``  | All steps must be nested inside a workflow        |
| `title`            | Step title                                        |
| step body contents | Anything between `### ` and `` |

Steps must start on a new line, and can contain `docs-code`s and other nested elements and styles.

### Install the Angular CLI
  You use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

To install the Angular CLI, open a terminal window and run the following command:

```shell
npm install -g @angular/cli
```

### Create a workspace and initial application
  You develop apps in the context of an Angular workspace.

To create a new workspace and initial starter app:

- Run the CLI command `ng new` and provide the name `my-app`, as shown here:

  ```shell
  ng new my-app
  ```

- The ng new command prompts you for information about features to include in the initial app. Accept the defaults by pressing the Enter or Return key.

  The Angular CLI installs the necessary Angular npm packages and other dependencies. This can take a few minutes.

  The CLI creates a new workspace and a simple Welcome app, ready to run.

### Run the application
  The Angular CLI includes a server, for you to build and serve your app locally.

1. Navigate to the workspace folder, such as `my-app`.
2. Run the following command:

   ```shell
   cd my-app
   ng serve --open
   ```

The `ng serve` command launches the server, watches your files, and rebuilds the app as you make changes to those files.

The `--open` (or just `-o`) option automatically opens your browser to <http://localhost:4200/>.
If your installation and setup was successful, you should see a page similar to the following.

### Final step
  That's all the docs components! Now:

    - Go
    - write
    - great
    - docs!

## Images and video

You can add images using the semantic Markdown image:

## Add attributes using curly braces syntax

Embedded videos are created with `docs-video` and just need a `src` and `title`:

## Charts & Graphs

Write diagrams and charts using Mermaid by setting the code language to `mermaid`, all theming is built-in.

```mermaid
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

```mermaid
  sequenceDiagram
      Alice->>+John: Hello John, how are you?
      Alice->>+John: John, can you hear me?
      John-->>-Alice: Hi Alice, I can hear you!
      John-->>-Alice: I feel great!
```

```mermaid
  pie title Pets adopted by volunteers
      "Dogs" : 386
      "Cats" : 85
      "Rats" : 15
```

## Horizontal Line Divider

This can be used to separate page sections, like we're about to do below. These styles will be added by default, nothing custom needed.

The end!

## Prefer / Avoid

```ts
const foo = 'bar';
```

```ts
const bar = 'foo';
```

```ts
const baz = 42;
```

File: `A styled code example`

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'hello-world',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css',
})
export class HelloWorldComponent {
  message = 'Hello World!';
}
```
