---
title: "Generating tests"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/codegen-intro.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Generating tests

## Introduction

Playwright can generate tests automatically, providing a quick way to get started with testing. Codegen opens a browser window for interaction and the Playwright Inspector for recording, copying, and managing your generated tests.

**You will learn**

- How to record a test
- How to generate locators

## Running Codegen

Use the `codegen` command to run the test generator followed by the URL of the website you want to generate tests for. The URL is optional and can be added directly in the browser window if omitted.

```bash
npx playwright codegen demo.playwright.dev/todomvc
```

```bash
mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="codegen demo.playwright.dev/todomvc"
```

```bash
playwright codegen demo.playwright.dev/todomvc
```

```bash
pwsh bin/Debug/net8.0/playwright.ps1 codegen demo.playwright.dev/todomvc
```

### Recording a test

Run `codegen` and perform actions in the browser. Playwright generates code for your interactions automatically. Codegen analyzes the rendered page and recommends the best locator, prioritizing role, text, and test id locators. When multiple elements match a locator, the generator improves it to uniquely identify the target element, reducing test failures and flakiness.

With the test generator you can record:
* Actions like click or fill by interacting with the page
* Assertions by clicking a toolbar icon, then clicking a page element to assert against. You can choose:
  * `'assert visibility'` to assert that an element is visible
  * `'assert text'` to assert that an element contains specific text
  * `'assert value'` to assert that an element has a specific value

######
* langs: js

######
* langs: java

######
* langs: python

######
* langs: csharp

######
* langs: js, java, python, csharp

When you finish interacting with the page, press the `'record'` button to stop recording and use the `'copy'` button to copy the generated code to your editor.

Use the `'clear'` button to clear the code and start recording again. Once finished, close the Playwright Inspector window or stop the terminal command.

To learn more about generating tests, check out our detailed guide on Codegen.

### Generating locators

You can generate locators with the test generator.

* Press the `'Record'` button to stop recording and the `'Pick Locator'` button will appear
* Click the `'Pick Locator'` button and hover over elements in the browser window to see the locator highlighted underneath each element
* Click the element you want to locate and the code for that locator will appear in the locator playground next to the Pick Locator button
* Edit the locator in the locator playground to fine-tune it and see the matching element highlighted in the browser window
* Use the copy button to copy the locator and paste it into your code

######
* langs: js

######
* langs: java

######
* langs: python

######
* langs: csharp

### Emulation

You can generate tests using emulation for specific viewports, devices, color schemes, geolocation, language, or timezone. The test generator can also preserve authenticated state. Check out the Test Generator guide to learn more.

## What's Next

- See a trace of your tests
