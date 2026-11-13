---
title: "Browsers (part 1 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/browsers.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

Each version of Playwright needs specific versions of browser binaries to operate. You will need to use the Playwright CLI to install these browsers.

With every release, Playwright updates the versions of the browsers it supports, so that the latest Playwright would support the latest browsers at any moment. It means that every time you update Playwright, you might need to re-run the `install` CLI command.

## Install browsers

Playwright can install supported browsers. Running the command without arguments will install the default browsers.

```bash
npx playwright install
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install"
```

```bash
playwright install
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install
```

You can also install specific browsers by providing an argument:

```bash
npx playwright install webkit
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install webkit"
```

```bash
playwright install webkit
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install webkit
```

See all supported browsers:

```bash
npx playwright install --help
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --help"
```

```bash
playwright install --help
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install --help
```

### Install browsers via API
* langs: csharp

It's possible to run Command line tools commands via the .NET API:

```csharp
var exitCode = Microsoft.Playwright.Program.Main(new[] {"install"});
if (exitCode != 0)
{
    throw new Exception($"Playwright exited with code {exitCode}");
}
```

## Install system dependencies

System dependencies can get installed automatically. This is useful for CI environments.

```bash
npx playwright install-deps
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install-deps"
```

```bash
playwright install-deps
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install-deps
```

You can also install the dependencies for a single browser by passing it as an argument:

```bash
npx playwright install-deps chromium
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install-deps chromium"
```

```bash
playwright install-deps chromium
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install-deps chromium
```

It's also possible to combine `install-deps` with `install` so that the browsers and OS dependencies are installed with a single command.

```bash
npx playwright install --with-deps chromium
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --with-deps chromium"
```

```bash
playwright install --with-deps chromium
```

```bash
pwsh bin/Debug/netX/playwright.ps1 install --with-deps chromium
```

See system requirements for officially supported operating systems.

## Update Playwright regularly
* langs: js

By keeping your Playwright version up to date you will be able to use new features and test your app on the latest browser versions and catch failures before the latest browser version is released to the public.

```bash
# Update playwright
npm install -D @playwright/test@latest

# Install new browsers
npx playwright install
```
Check the release notes to see what the latest version is and what changes have been released.

```bash
# See what version of Playwright you have by running the following command
npx playwright --version
```
