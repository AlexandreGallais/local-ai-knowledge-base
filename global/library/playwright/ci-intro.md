---
title: "Setting up CI"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/ci-intro.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Setting up CI

## Introduction
* langs: js

Playwright tests can be run on any CI provider. This guide covers one way of running tests on GitHub using GitHub Actions. If you would like to learn more, or how to configure other CI providers, check out our detailed doc on Continuous Integration.

#### You will learn
* langs: js

- How to set up GitHub Actions
- How to view test logs
- How to view the HTML report
- How to view the trace
- How to publish report on the web

## Introduction
* langs: python, java, csharp

Playwright tests can be run on any CI provider. In this section we cover running tests on GitHub using GitHub Actions. If you would like to see how to configure other CI providers, check out our detailed doc on Continuous Integration.

#### You will learn
* langs: python, java, csharp

- How to set up GitHub Actions
- How to view test logs
- How to view the trace

## Setting up GitHub Actions
* langs: js

When installing Playwright using the VS Code extension or with `npm init playwright@latest`, you are given the option to add a GitHub Actions workflow. This creates a `playwright.yml` file inside a `.github/workflows` folder containing everything you need so that your tests run on each push and pull request into the main/master branch. Here's how that file looks:

```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-node@v6
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v5
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

The workflow performs these steps:

1. Clone your repository
1. Install Node.js
1. Install NPM Dependencies
1. Install Playwright Browsers
1. Run Playwright tests
1. Upload HTML report to the GitHub UI

Note that the workflow does not set a job-level `timeout-minutes`. Instead, set `globalTimeout` in your config:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Fail the run after an hour, so that the reporters still produce a report.
  globalTimeout: 60 * 60 * 1000,
});
```

To learn more about this, see "Understanding GitHub Actions".

## Setting up GitHub Actions
* langs: python, java, csharp

To add a GitHub Actions file, first create `.github/workflows` folder and inside it add a `playwright.yml` file containing the example code below so that your tests run on each push and pull request for the main/master branch.

```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - name: Set up Python
      uses: actions/setup-python@v6
      with:
        python-version: '3.13'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    - name: Ensure browsers are installed
      run: python -m playwright install --with-deps
    - name: Run your tests
      run: pytest --tracing=retain-on-failure
    - uses: actions/upload-artifact@v5
      if: ${{ !cancelled() }}
      with:
        name: playwright-traces
        path: test-results/
```

```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - uses: actions/setup-java@v5
      with:
        distribution: 'temurin'
        java-version: '25'
    - name: Build & Install
      run: mvn -B install -D skipTests --no-transfer-progress
    - name: Ensure browsers are installed
      run: mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --with-deps"
    - name: Run tests
      run: mvn test
```

```yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v6
    - name: Setup dotnet
      uses: actions/setup-dotnet@v5
      with:
        dotnet-version: 8.0.x
    - name: Build & Install
      run: dotnet build
    - name: Ensure browsers are installed
      run: pwsh bin/Debug/net8.0/playwright.ps1 install --with-deps
    - name: Run your tests
      run: dotnet test
```

To learn more about this, see "Understanding GitHub Actions".

Looking at the list of steps in `jobs.test.steps`, you can see that the workflow performs these steps:

1. Clone your repository
1. Install language dependencies
1. Install project dependencies and build
1. Install Playwright Browsers
1. Run tests

## Create a Repo and Push to GitHub

Once you have your GitHub Actions workflow setup, then all you need to do is Create a repo on GitHub or push your code to an existing repository. Follow the instructions on GitHub and don't forget to initialize a git repository using the `git init` command so you can add, commit, and push your code.

######
* langs: js, java, python

######
* langs: csharp

## Opening the Workflows

Click on the **Actions** tab to see the workflows. Here you see if your tests have passed or failed.

######
* langs: js, python, java

######
* langs: csharp

On Pull Requests you can also click on the **Details** link in the PR status check.

## Viewing Test Logs

Clicking on the workflow run shows you all the actions that GitHub performed and clicking on **Run Playwright tests** shows the error messages, what was expected and what was received as well as the call log.

######
* langs: js, python, java

######
* langs: csharp

## HTML Report
* langs: js

The HTML Report shows you a full report of your tests. You can filter the report by browsers, passed tests, failed tests, skipped tests, and flaky tests.

### Downloading the HTML Report
* langs: js

In the Artifacts section, click on the **playwright-report** to download your report in the format of a zip file.

### Viewing the HTML Report
* langs: js

Locally opening the report does not work as expected as you need a web server for everything to work correctly. First, extract the zip, preferably in a folder that already has Playwright installed. Using the command line, change into the directory where the report is and use `npx playwright show-report` followed by the name of the extracted folder. This serves up the report and enables you to view it in your browser.

```bash
npx playwright show-report name-of-my-extracted-playwright-report
```

To learn more about reports, check out our detailed guide on HTML Reporter

## Viewing the Trace
* langs: js

Once you have served the report using `npx playwright show-report`, click on the trace icon next to the test's file name as seen in the image above. You can then view the trace of your tests and inspect each action to try to find out why the tests are failing.

## Viewing the Trace
* langs: python, java

trace.playwright.dev is a statically hosted variant of the Trace Viewer. You can upload trace files using drag and drop.

## Viewing the Trace
* langs: csharp

You can upload Traces which get created on your CI like GitHub Actions as artifacts. This requires starting and stopping the trace. We recommend only recording traces for failing tests. Once your traces have been uploaded to CI, they can then be downloaded and opened using trace.playwright.dev, which is a statically hosted variant of the Trace Viewer. You can upload trace files using drag and drop.

######
* langs: csharp

## Publishing report on the web
* langs: js

Downloading the HTML report as a zip file is not very convenient. However, we can utilize Azure Storage's static websites hosting capabilities to easily and efficiently serve HTML reports on the Internet, requiring minimal configuration.

1. Create an Azure Storage account.
1. Enable Static website hosting for the storage account.
1. Create a Service Principal in Azure and grant it access to Azure Blob storage. Upon successful execution, the command will display the credentials which will be used in the next step.

    ```bash
    az ad sp create-for-rbac --name "github-actions" --role "Storage Blob Data Contributor" --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP_NAME>/providers/Microsoft.Storage/storageAccounts/<STORAGE_ACCOUNT_NAME>
    ```
1. Use the credentials from the previous step to set up encrypted secrets in your GitHub repository. Go to your repository's settings, under GitHub Actions secrets, and add the following secrets:

    - `AZCOPY_SPA_APPLICATION_ID`
    - `AZCOPY_SPA_CLIENT_SECRET`
    - `AZCOPY_TENANT_ID`

   For a detailed guide on how to authorize a service principal using a client secret, refer to this Microsoft documentation.
1. Add a step that uploads the HTML report to Azure Storage.

    ```yaml
    ...
        - name: Upload HTML report to Azure
          shell: bash
          run: |
            REPORT_DIR='run-${{ github.run_id }}-${{ github.run_attempt }}'
            azcopy cp --recursive "./playwright-report/*" "https://<STORAGE_ACCOUNT_NAME>.blob.core.windows.net/\$web/$REPORT_DIR"
            echo "::notice title=HTML report url::https://<STORAGE_ACCOUNT_NAME>.z1.web.core.windows.net/$REPORT_DIR/index.html"
          env:
            AZCOPY_AUTO_LOGIN_TYPE: SPN
            AZCOPY_SPA_APPLICATION_ID: '<example-value>'
            AZCOPY_SPA_CLIENT_SECRET: '<example-value>'
            AZCOPY_TENANT_ID: '<example-value>'
    ```

The contents of the `$web` storage container can be accessed from a browser by using the public URL of the website.

:::note
This step will not work for pull requests created from a forked repository because such workflow doesn't have access to the secrets.
:::

## Properly handling Secrets
* langs: js

Artifacts like trace files, HTML reports or even the console logs contain information about your test execution.
They can contain sensitive data like user credentials for a test user, access tokens to a staging backend, testing source code, or sometimes even your application source code. Treat these files just as carefully as you treat that sensitive data.
If you upload reports and traces as part of your CI workflow, make sure that you only upload them to trusted artifact stores, or that you encrypt the files before upload. The same is true for sharing artifacts with team members: Use a trusted file share or encrypt the files before sharing.

## Properly handling Secrets
* langs: python, java, csharp

Artifacts like trace files or console logs contain information about your test execution.
They can contain sensitive data like user credentials for a test user, access tokens to a staging backend, testing source code, or sometimes even your application source code. Treat these files just as carefully as you treat that sensitive data.
If you upload reports and traces as part of your CI workflow, make sure that you only upload them to trusted artifact stores, or that you encrypt the files before upload. The same is true for sharing artifacts with team members: Use a trusted file share or encrypt the files before sharing.

## What's Next

- Learn how to use Locators
- Learn how to perform Actions
- Learn how to write Assertions
- Learn more about the Trace Viewer
- Learn more ways of running tests on GitHub Actions
- Learn more about running tests on other CI providers
