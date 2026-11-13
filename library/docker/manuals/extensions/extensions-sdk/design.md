---
title: "UI styling overview for Docker extensions"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/extensions/extensions-sdk/design/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# UI styling overview for Docker extensions

Our Design System is a constantly evolving set of specifications that aim to ensure visual consistency across Docker products, and meet level AA accessibility standards. We've opened parts of it to extension authors, documenting basic styles (color, typography) and components. See: Docker Extensions Styleguide.

We require extensions to match the wider Docker Desktop UI to a certain degree, and reserve the right to make this stricter in the future.

To get started on your UI, follow the steps below.

## Step one: Choose your framework

### Recommended: React+MUI, using our theme

Docker Desktop's UI is written in React and MUI (using Material UI specifically). This is the only officially supported framework for building extensions, and the one that the `init` command automatically configures for you. Using it brings significant benefits to authors:

- You can use our Material UI theme to automatically replicate Docker Desktop's look and feel.
- In future, we'll release utilities and components specifically targeting this combination (e.g. custom MUI components, or React hooks for interacting with Docker).

Read our MUI best practices guide to learn future-proof ways to use MUI with Docker Desktop.

### Not recommended: Some other framework

You may prefer to use another framework, perhaps because you or your team are more familiar with it or because you have existing assets you want to reuse. This is possible, but highly discouraged. It means that:

- You'll need to manually replicate the look and feel of Docker Desktop. This takes a lot of effort, and if you don't match our theme closely enough, users will find your extension jarring and we may ask you to make changes during a review process.
- You'll have a higher maintenance burden. Whenever Docker Desktop's theme changes (which could happen in any release), you'll need to manually change your extension to match it.
- If your extension is open-source, deliberately avoiding common conventions will make it harder for the community to contribute to it.

## Step two: Follow the below recommendations

### Follow our MUI best practices (if applicable)

See our MUI best practices article.

### Only use colors from our palette

With minor exceptions, displaying your logo for example, you should only use colors from our palette. These can be found in our style guide document, and will also soon be available in our MUI theme and via CSS variables.

### Use counterpart colors in light/dark mode

Our colors have been chosen so that the counterpart colors in each variant of the palette should have the same essential characteristics. Anywhere you use `red-300` in light mode, you should use `red-300` in dark mode too.

## What's next?

- Take a look at our MUI best practices.
- Learn how to publish your extension.
