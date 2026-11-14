---
title: "Continuous Integration (part 3 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/ci.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Continuous Integration (part 3 of 3)

### Azure Pipelines

For Windows or macOS agents, no additional configuration is required, just install Playwright and run your tests.

For Linux agents, you can use our Docker container with Azure
Pipelines support running containerized
jobs.
Alternatively, you can use Command line tools to install all necessary dependencies.

For running the Playwright tests use this pipeline task:

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UseNode@1
  inputs:
    version: '22'
  displayName: 'Install Node.js'
- script: npm ci
  displayName: 'npm ci'
- script: npx playwright install --with-deps
  displayName: 'Install Playwright browsers'
- script: npx playwright test
  displayName: 'Run Playwright tests'
  env:
    CI: 'true'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.13'
  displayName: 'Use Python'
- script: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
  displayName: 'Install dependencies'
- script: playwright install --with-deps
  displayName: 'Install Playwright browsers'
- script: pytest
  displayName: 'Run Playwright tests'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: JavaToolInstaller@1
  inputs:
    versionSpec: '25'
    jdkArchitectureOption: 'x64'
    jdkSourceOption: AzureStorage
- script: mvn -B install -D skipTests --no-transfer-progress
  displayName: 'Build and install'
- script: mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --with-deps"
  displayName: 'Install Playwright browsers'
- script: mvn test
  displayName: 'Run tests'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UseDotNet@2
  inputs:
    packageType: sdk
    version: '8.0.x'
  displayName: 'Use .NET SDK'
- script: dotnet build --configuration Release
  displayName: 'Build'
- script: pwsh bin/Release/net8.0/playwright.ps1 install --with-deps
  displayName: 'Install Playwright browsers'
- script: dotnet test --configuration Release
  displayName: 'Run tests'
```

#### Uploading playwright-report folder with Azure Pipelines
* langs: js

This will make the pipeline run fail if any of the playwright tests fails.
If you also want to integrate the test results with Azure DevOps, use the task `PublishTestResults` task like so:

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- task: UseNode@1
  inputs:
    version: '22'
  displayName: 'Install Node.js'

- script: npm ci
  displayName: 'npm ci'
- script: npx playwright install --with-deps
  displayName: 'Install Playwright browsers'
- script: npx playwright test
  displayName: 'Run Playwright tests'
  env:
    CI: 'true'
- task: PublishTestResults@2
  displayName: 'Publish test results'
  inputs:
    searchFolder: 'test-results'
    testResultsFormat: 'JUnit'
    testResultsFiles: 'e2e-junit-results.xml'
    mergeTestResults: true
    failTaskOnFailedTests: true
    testRunTitle: 'My End-To-End Tests'
  condition: succeededOrFailed()
- task: PublishPipelineArtifact@1
  inputs:
    targetPath: playwright-report
    artifact: playwright-report
    publishLocation: 'pipeline'
  condition: succeededOrFailed()

```
Note: The JUnit reporter needs to be configured accordingly via
```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['junit', { outputFile: 'test-results/e2e-junit-results.xml' }]],
});
```
in `playwright.config.ts`.

#### Azure Pipelines (sharded)
* langs: js

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

strategy:
  matrix:
    chromium-1:
      project: chromium
      shard: 1/3
    chromium-2:
      project: chromium
      shard: 2/3
    chromium-3:
      project: chromium
      shard: 3/3
    firefox-1:
      project: firefox
      shard: 1/3
    firefox-2:
      project: firefox
      shard: 2/3
    firefox-3:
      project: firefox
      shard: 3/3
    webkit-1:
      project: webkit
      shard: 1/3
    webkit-2:
      project: webkit
      shard: 2/3
    webkit-3:
      project: webkit
      shard: 3/3
steps:
- task: UseNode@1
  inputs:
    version: '22'
  displayName: 'Install Node.js'

- script: npm ci
  displayName: 'npm ci'
- script: npx playwright install --with-deps
  displayName: 'Install Playwright browsers'
- script: npx playwright test --project=$(project) --shard=$(shard)
  displayName: 'Run Playwright tests'
  env:
    CI: 'true'
```

#### Azure Pipelines (containerized)

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright:v%%VERSION%%-noble

steps:
- task: UseNode@1
  inputs:
    version: '22'
  displayName: 'Install Node.js'

- script: npm ci
  displayName: 'npm ci'
- script: npx playwright test
  displayName: 'Run Playwright tests'
  env:
    CI: 'true'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble

steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.13'
  displayName: 'Use Python'

- script: |
    python -m pip install --upgrade pip
    pip install -r requirements.txt
  displayName: 'Install dependencies'
- script: pytest
  displayName: 'Run tests'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble

steps:
- task: JavaToolInstaller@1
  inputs:
    versionSpec: '25'
    jdkArchitectureOption: 'x64'
    jdkSourceOption: AzureStorage

- script: mvn -B install -D skipTests --no-transfer-progress
  displayName: 'Build and install'
- script: mvn test
  displayName: 'Run tests'
```

```yml
trigger:
- main

pool:
  vmImage: ubuntu-latest
container: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble

steps:
- task: UseDotNet@2
  inputs:
    packageType: sdk
    version: '8.0.x'
  displayName: 'Use .NET SDK'

- script: dotnet build --configuration Release
  displayName: 'Build'
- script: dotnet test --configuration Release
  displayName: 'Run tests'
```

### CircleCI

Running Playwright on CircleCI is very similar to running on GitHub Actions. In order to specify the pre-built Playwright Docker image, simply modify the agent definition with `docker:` in your config like so:

```yml
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
```

```yml
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
```

```yml
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
```

```yml
executors:
  pw-noble-development:
    docker:
      - image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
```

Note: When using the docker agent definition, you are specifying the resource class of where playwright runs to the 'medium' tier here. The default behavior of Playwright is to set the number of workers to the detected core count (2 in the case of the medium tier). Overriding the number of workers to greater than this number will cause unnecessary timeouts and failures.

#### Sharding in CircleCI
* langs: js

Sharding in CircleCI is indexed with 0 which means that you will need to override the default parallelism ENV VARS. The following example demonstrates how to run Playwright with a CircleCI Parallelism of 4 by adding 1 to the `CIRCLE_NODE_INDEX` to pass into the `--shard` cli arg.

  ```yml
    playwright-job-name:
      executor: pw-noble-development
      parallelism: 4
      steps:
        - run: SHARD="$((${CIRCLE_NODE_INDEX}+1))"; npx playwright test --shard=${SHARD}/${CIRCLE_NODE_TOTAL}
  ```

### Jenkins

Jenkins supports Docker agents for pipelines. Use the Playwright Docker image
to run tests on Jenkins.

```groovy
pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v%%VERSION%%-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'npm ci'
            sh 'npx playwright test'
         }
      }
   }
}
```

```groovy
pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright/python:v%%VERSION%%-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'pip install -r requirements.txt'
            sh 'pytest'
         }
      }
   }
}
```

```groovy
pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright/java:v%%VERSION%%-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'mvn -B install -D skipTests --no-transfer-progress'
            sh 'mvn test'
         }
      }
   }
}
```

```groovy
pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            sh 'dotnet build'
            sh 'dotnet test'
         }
      }
   }
}
```

### Bitbucket Pipelines

Bitbucket Pipelines can use public Docker images as build environments. To run Playwright tests on Bitbucket, use our public Docker image (see Dockerfile).

```yml
image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
```

```yml
image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
```

```yml
image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
```

```yml
image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
```

### GitLab CI

To run Playwright tests on GitLab, use our public Docker image (see Dockerfile).

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  script:
  ...
```

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/python:v%%VERSION%%-noble
  script:
  ...
```

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/java:v%%VERSION%%-noble
  script:
  ...
```

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright/dotnet:v%%VERSION%%-noble
  script:
  ...
```

#### Sharding
* langs: js

GitLab CI supports sharding tests between multiple jobs using the parallel keyword. The test job will be split into multiple smaller jobs that run in parallel. Parallel jobs are named sequentially from `job_name 1/N` to `job_name N/N`.

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  parallel: 7
  script:
    - npm ci
    - npx playwright test --shard=$CI_NODE_INDEX/$CI_NODE_TOTAL
```

GitLab CI also supports sharding tests between multiple jobs using the parallel:matrix option. The test job will run multiple times in parallel in a single pipeline, but with different variable values for each instance of the job. In the example below, we have 2 `PROJECT` values and 10 `SHARD` values, resulting in a total of 20 jobs to be run.

```yml
stages:
  - test

tests:
  stage: test
  image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  parallel:
    matrix:
      - PROJECT: ['chromium', 'webkit']
        SHARD: ['1/10', '2/10', '3/10', '4/10', '5/10', '6/10', '7/10', '8/10', '9/10', '10/10']
  script:
    - npm ci
    - npx playwright test --project=$PROJECT --shard=$SHARD
```
### Google Cloud Build
* langs: js

To run Playwright tests on Google Cloud Build, use our public Docker image (see Dockerfile).

```yml
steps:
- name: mcr.microsoft.com/playwright:v%%VERSION%%-noble
  script:
  ...
  env:
  - 'CI=true'
```

### Drone
* langs: js

To run Playwright tests on Drone, use our public Docker image (see Dockerfile).

```yml
kind: pipeline
name: default
type: docker

steps:
  - name: test
    image: mcr.microsoft.com/playwright:v%%VERSION%%-noble
    commands:
      - npx playwright test
```

## Caching browsers

Caching browser binaries is not recommended, since the amount of time it takes to restore the cache is comparable to the time it takes to download the binaries. Especially under Linux, operating system dependencies need to be installed, which are not cacheable.

If you still want to cache the browser binaries between CI runs, cache these directories in your CI configuration, against a hash of the Playwright version.

## Debugging browser launches

Playwright supports the `DEBUG` environment variable to output debug logs during execution. Setting it to `pw:browser` is helpful while debugging `Error: Failed to launch browser` errors.

```bash
DEBUG=pw:browser npx playwright test
```
```bash
DEBUG=pw:browser pytest
```

```bash
DEBUG=pw:browser mvn test
```

```bash
DEBUG=pw:browser dotnet test
```

## Running headed

By default, Playwright launches browsers in headless mode. See in our Running tests guide how to run tests in headed mode.

On Linux agents, headed execution requires Xvfb to be installed. Our Docker image and GitHub Action have Xvfb pre-installed. To run browsers in headed mode with Xvfb, add `xvfb-run` before the actual command.

```bash
xvfb-run npx playwright test
```
```bash
xvfb-run pytest
```
```bash
xvfb-run mvn test
```
```bash
xvfb-run dotnet test
```
