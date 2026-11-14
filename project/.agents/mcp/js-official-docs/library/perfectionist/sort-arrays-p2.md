---
title: "sort-arrays (part 2 of 2)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-arrays.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-arrays (part 2 of 2)

## Usage

<CodeTabs
  code={[
    {
      source: dedent`
        // eslint.config.js
        import perfectionist from 'eslint-plugin-perfectionist'

        export default [
          {
            plugins: {
              perfectionist,
            },
            rules: {
              'perfectionist/sort-arrays': [
                'error',
                {
                  type: 'alphabetical',
                  order: 'asc',
                  fallbackSort: { type: 'unsorted' },
                  ignoreCase: true,
                  specialCharacters: 'keep',
                  partitionByNewLine: false,
                  newlinesBetween: 'ignore',
                  newlinesInside: 'ignore',
                  useConfigurationIf: {
                    matchesAstSelector: 'TSAsExpression > ArrayExpression',
                  },
                  groups: ["literal"],
                  customGroups: [],
                },
              ],
            },
          },
        ]
      `,
      name: 'Flat Config',
      value: 'flat',
    },
    {
      source: dedent`
        // .eslintrc.js
        module.exports = {
          plugins: [
            'perfectionist',
          ],
          rules: {
            'perfectionist/sort-arrays': [
              'error',
              {
                type: 'alphabetical',
                order: 'asc',
                fallbackSort: { type: 'unsorted' },
                ignoreCase: true,
                specialCharacters: 'keep',
                partitionByNewLine: false,
                newlinesBetween: 'ignore',
                newlinesInside: 'ignore',
                useConfigurationIf: {
                  matchesAstSelector: 'TSAsExpression > ArrayExpression',
                },
                groups: ["literal"],
                customGroups: [],
              },
            ],
          },
        }
      `,
      name: 'Legacy Config',
      value: 'legacy',
    },
  ]}
  type="config-type"
  client:load
  lang="tsx"
/>

## Version

This rule was introduced in v5.8.0.

## Resources

- Rule source
- Test source
