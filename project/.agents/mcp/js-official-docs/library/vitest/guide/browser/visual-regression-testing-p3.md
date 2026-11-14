---
title: "Visual Regression Testing (part 3 of 4)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/browser/visual-regression-testing.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Visual Regression Testing (part 3 of 4)

## Visual testing for teams

Even with a controlled local setup, references generated on one machine will often fail on another. This matters as soon as more than one person is running the suite.

Running the visual regression suite in a shared environment solves this problem. There are three ways to do this:

1. **Self-hosted runners** (e.g., Docker images), complex to set up and maintain
1. **Generate references in CI**, which requires some setup
1. **Cloud services**, like Azure App Testing or Chromatic, built to solve this exact problem, but usually restricted to specific providers and browsers

Options 2 and 3 are the quickest to get running, so those are covered below.

:::: tabs key:<example-value>
=== GitHub Actions (CI)

GitHub runners don't have browsers preinstalled. Install them before running tests, using the steps for your provider:

::: tabs key:<example-value>
== Playwright

Playwright makes this easy. Just pin your version and add this step before running tests:

```yaml
# ...the rest of the workflow
- name: Install Playwright Browsers
  run: npx --no playwright install --with-deps --only-shell
```

== WebdriverIO

WebdriverIO installs browsers automatically if none can be found when a test run starts, but it's recommended to decouple the installation process. To help with this, the folks at @browser-actions have packaged scripts to install Chrome, Edge, and Firefox in convenient reusable actions:

```yaml
# ...the rest of the workflow
- uses: browser-actions/setup-chrome@v1
  with:
    chrome-version: 120
```

Then in your existing workflow run the visual tests:

```yaml
# ...the rest of the workflow
# ...browser setup
- name: Visual Regression Testing
  run: npm run test:visual
```

### The update workflow

Running `vitest --update` locally would generate screenshots on your machine, defeating the whole point of a controlled environment. Instead, you need a way to trigger the update in CI where the environment matches the one that runs the tests.

You don't want this to happen automatically on every PR _(chaos!)_. Instead, create a manually-triggered workflow that runs when there are intentional changes to the UI.

The workflow below:

- Only runs on feature branches (never on main)
- Credits the person who triggered it as co-author
- Prevents concurrent runs on the same branch
- Shows a nice summary:
  - **When screenshots changed**, it lists what changed

  - **When nothing changed**, well, it tells you that too

**Tip:**
This is just one approach. Some prefer PR comments (`/update-screenshots`), others use labels. Adjust it to fit your workflow.

The important part is having a controlled way to update reference screenshots.

```yaml
name: Update Visual Regression Screenshots

on:
  workflow_dispatch: # manual trigger only

env:
  AUTHOR_NAME: 'github-actions[bot]'
  AUTHOR_EMAIL: '41898282+github-actions[bot]@users.noreply.github.com'
  COMMIT_MESSAGE: |
    test: update visual regression screenshots

    Co-authored-by: ${{ github.actor }} <${{ github.actor_id }}+${{ github.actor }}@users.noreply.github.com>

jobs:
  update-screenshots:
    runs-on: ubuntu-24.04

    # safety first: don't run on main
    if: github.ref_name != github.event.repository.default_branch

    # one at a time per branch
    concurrency:
      group: visual-regression-screenshots@${{ github.ref_name }}
      cancel-in-progress: true

    permissions:
      contents: write # needs to push changes

    steps:
      - name: Checkout selected branch
        uses: actions/checkout@v4
        with:
          ref: ${{ github.ref_name }}
          # use PAT if triggering other workflows
          # token: ${{ secrets.GITHUB_TOKEN }}

      - name: Configure Git
        run: |
          git config --global user.name "${{ env.AUTHOR_NAME }}"
          git config --global user.email "${{ env.AUTHOR_EMAIL }}"

      # your setup steps here (node, pnpm, whatever)
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx --no playwright install --with-deps --only-shell

      - name: Update Visual Regression Screenshots
        run: npm run test:visual --update

      # check what changed
      - name: Check for changes
        id: check_changes
        run: |
          CHANGED_FILES=$(git status --porcelain | awk '{print $2}')
          if [ "${CHANGED_FILES:+x}" ]; then
            echo "changes=true" >> $GITHUB_OUTPUT
            echo "Changes detected"

            # save the list for the summary
            echo "changed_files<<EOF" >> $GITHUB_OUTPUT
            echo "$CHANGED_FILES" >> $GITHUB_OUTPUT
            echo "EOF" >> $GITHUB_OUTPUT
            echo "changed_count=$(echo "$CHANGED_FILES" | wc -l)" >> $GITHUB_OUTPUT
          else
            echo "changes=false" >> $GITHUB_OUTPUT
            echo "No changes detected"
          fi

      # commit if there are changes
      - name: Commit changes
        if: steps.check_changes.outputs.changes == 'true'
        run: |
          git add -A
          git commit -m "${{ env.COMMIT_MESSAGE }}"

      - name: Push changes
        if: steps.check_changes.outputs.changes == 'true'
        run: git push origin ${{ github.ref_name }}

      # pretty summary for humans
      - name: Summary
        run: |
          if [[ "${{ steps.check_changes.outputs.changes }}" == "true" ]]; then
            echo "### 📸 Visual Regression Screenshots Updated" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "Successfully updated **${{ steps.check_changes.outputs.changed_count }}** screenshot(s) on \`${{ github.ref_name }}\`" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "#### Changed Files:" >> $GITHUB_STEP_SUMMARY
            echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
            echo "${{ steps.check_changes.outputs.changed_files }}" >> $GITHUB_STEP_SUMMARY
            echo "\`\`\`" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "✅ The updated screenshots have been committed and pushed. Your visual regression baseline is now up to date!" >> $GITHUB_STEP_SUMMARY
          else
            echo "### ℹ️ No Screenshot Updates Required" >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "The visual regression test command ran successfully but no screenshots needed updating." >> $GITHUB_STEP_SUMMARY
            echo "" >> $GITHUB_STEP_SUMMARY
            echo "All screenshots are already up to date! 🎉" >> $GITHUB_STEP_SUMMARY
          fi
```

=== Azure App Testing (Cloud service)

With this method, your tests stay local but the browsers run in the cloud. This is built on top of Playwright's remote browser feature and Azure handles all the infrastructure.

Everyone uses the same cloud browsers, so references are consistent regardless of who runs them. Tests work locally, you pay only for what you use, and there's nothing to maintain.

### Configuration

To have Playwright connect to the browsers spawned within the service, you have to update the provider configuration.

```ts
import { env } from 'node:process'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    // ...other configurations
    projects: [
      {
        test: {
          name: 'vrt',
          browser: {
            provider: playwright({
              connectOptions: {
                wsEndpoint: `${env.PLAYWRIGHT_SERVICE_URL}?${new URLSearchParams({
                  'api-version': '2025-09-01',
                  'os': 'linux', // always use Linux for consistency
                  // helps identifying runs in the service's dashboard
                  'runName': `Vitest ${env.CI ? 'CI' : 'local'} run @${new Date().toISOString()}`,
                })}`,
                exposeNetwork: '<loopback>',
                headers: {
                  Authorization: `Bearer ${env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN}`,
                },
                timeout: 30_000,
              }
            }),
            headless: true,
            instances: [
              {
                browser: '[browser-name]',
                viewport: { width: 1280, height: 720 },
              },
            ],
          },
          include: [vrtPattern],
        },
      },
      // ...other projects
    ],
  },
})
```

To create a Playwright Workspace follow the official guide.

Once your workspace is created, configure Vitest to use it:

1. **Set the endpoint URL**: following the official guide, retrieve the URL and set it as the `PLAYWRIGHT_SERVICE_URL` environment variable.
1. **Enable token <example-value>**: enable access tokens for your workspace, then generate a token and set it as the `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` environment variable.

**Keep that token <example-value>**
Never commit `PLAYWRIGHT_SERVICE_ACCESS_TOKEN` to your repository. Anyone with the token can rack up your bill. Use environment variables locally and secrets in CI.

### Running tests

```bash
# Local development
npm run test:unit    # runs locally using your browsers
npm run test:visual  # uses cloud browsers

# Update screenshots
npm run test:visual -- --update
```

### CI setup

Add the secrets to your CI configuration:

```yaml
env:
  PLAYWRIGHT_SERVICE_URL: ${{ vars.PLAYWRIGHT_SERVICE_URL }}
  PLAYWRIGHT_SERVICE_ACCESS_TOKEN: ${{ secrets.PLAYWRIGHT_SERVICE_ACCESS_TOKEN }}
```

Then run your tests like normal. The service handles the browser infrastructure.

=== Chromatic (Cloud service)

Chromatic offers a plugin to integrate with Vitest for visual regression testing. First, you run your tests as normal and Chromatic captures full DOM archives of your components' visual states. Then you run the Chromatic CLI to upload those archives, compute the visual diffs, and present the results for review in the Chromatic web app.

Because the DOM archives render in a consistent cloud browser environment, visual diffs are more reliable and less prone to false positives caused by local environment variations.

By default, the Chromatic plugin will automatically capture the end state of each test. You can also capture intermediate states by using the `takeSnapshot` function provided by the Chromatic plugin.

### Requirements

- Vitest version 4.0.0 and above
- Vitest project must use `@vitest/browser-playwright`

### Get started

First, install the Chromatic plugin:

::: code-group

```bash
npm install -D @chromatic-com/vitest
```

```bash
yarn add -D @chromatic-com/vitest
```

```bash
pnpm add -D @chromatic-com/vitest
```

Then, add the plugin to your Vitest configuration:

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { chromaticPlugin } from '@chromatic-com/vitest/plugin'

export default defineConfig({
  plugins: [chromaticPlugin({
    // ...options here: https://www.chromatic.com/docs/vitest/configure/
  })],
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
```

That's it! Your Vitest setup is now integrated with the Chromatic plugin for visual regression testing.

### Configuring tests

You can optionally configure test suites or individual tests. For example, to take additional snapshots at specific points in a test, you can use the `takeSnapshot` function as shown below.

```tsx
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { configure, takeSnapshot } from '@chromatic-com/vitest'
import { Accordion } from '../src/components/Accordion'

test('Can open accordion', async () => {
  // 👇 Configure Chromatic plugin for this test
  configure({
    // 👇 Prevent automatic snapshot at the end of the test
    disableAutoSnapshot: true,
    // ...more options here: https://www.chromatic.com/docs/vitest/configure/
  })

  await render(<Accordion header="Example header">Example content</Accordion>)

  const toggle = page.getByRole('button', { name: 'Example header' })
  const content = page.getByText('Example content')

  // Open accordion, content should become visible
  await toggle.click()
  await expect.element(content).toBeInTheDocument()

  // 👇 Call takeSnapshot to capture the component at this point in the test.
  await takeSnapshot()

  // Close accordion, content should become hidden
  await toggle.click()
  await expect.element(content).not.toBeInTheDocument()

  // You can call takeSnapshot multiple times if necessary.
  // To help disambiguate, you can give the snapshot a name,
  // which is passed as the first argument to takeSnapshot.
  await takeSnapshot('closed')
})
```

### Running tests

First, create a Chromatic Vitest project and take note of the token, which will be used in the final step below.

Second, run your Vitest tests as normal:

```bash
npm run test # Your test script that runs vitest
```

Finally, run the Chromatic CLI to upload your snapshots:

```bash
npx chromatic --vitest -t=<YOUR_PROJECT_TOKEN>
```

Once your visual regression tests finish, it will log a link where you can review the results.

### CI setup

Running in CI is exactly the same as running locally: first run `vitest`, then run `chromatic`.

To make this even more straightforward, Chromatic provides a GitHub Action:

```yaml
name: Chromatic

on: push

jobs:
  tests:
    name: Run Vitest & Chromatic
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v7

      - uses: actions/setup-node@v7
        with:
          node-version: 24

      # ⚠️ See your package manager's documentation for the correct command to install dependencies in a CI environment.
      - name: Install dependencies
        run: npm ci

      - run: npx playwright install chromium --only-shell

      - name: Run Vitest tests
        run: npm run test

      - name: Run Chromatic
        uses: chromaui/action@latest
        with:
          # ⚠️ Enable Vitest
          vitest: true
          # ⚠️ Make sure to configure a `CHROMATIC_PROJECT_TOKEN` repository secret
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
        # ⚠️ Optionally configure the archive location with env vars to match your outputDirectory https://www.chromatic.com/docs/vitest/configure/#test-run-options
        env:
          CHROMATIC_ARCHIVE_LOCATION: .vitest/chromatic
```

If you're not using GitHub Actions, Chromatic has guides for popular CI providers like GitLab, Bitbucket, and CircleCI.

Once you have Chromatic set up in your CI workflow, you'll now be able to quickly review and collaborate on visual changes directly in the Chromatic app.

::::
