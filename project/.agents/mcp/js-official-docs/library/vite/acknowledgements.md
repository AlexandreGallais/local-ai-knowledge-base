---
title: "Acknowledgements"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/acknowledgements.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Acknowledgements

Vite is built upon the shoulders of giants. We would like to express our gratitude to all the projects, contributors, and sponsors that make Vite possible.

## Contributors

Vite is developed by an international team of contributors. See the Team page to meet the core team members.

We also thank all the contributors on GitHub who have helped improve Vite through code contributions, bug reports, documentation, and documentation translation.

## Sponsors

Vite's development is supported by generous sponsors. You can support Vite through GitHub Sponsors or Open Collective.

  <VPSponsors :data="sponsors ?? []" />

## Dependencies

Vite depends on these amazing open source projects:

### Notable Dependencies

      `{{ dep.name }}`

        Repo
        Sponsor

      by {{ dep.author }}<template v-else>{{ dep.author }}</template>

    {{ dep.description }}

### Bundled Dependency Authors

       | Author
       | Packages

       |
        {{ author.name }}
        <template v-else>{{ author.name }}</template>
        Sponsor

       |
        <template v-for="(pkg, index) in author.packages" :key="pkg.name">
          `{{ pkg.name }}`Sponsor<template v-if="index < author.packages.length - 1">, </template>
        </template>

**For package authors**
This section is automatically generated from the `author` and `funding` fields in each package's `package.json`. If you'd like to update how your package appears here, you can update these fields in your package.

## Development Tools

Vite's development workflow is powered by these tools:

      `{{ dep.name }}`

        Repo
        Sponsor

      by {{ dep.author }}<template v-else>{{ dep.author }}</template>

    {{ dep.description }}

## Past Notable Dependencies

We also thank the maintainers of these projects that Vite used in previous versions:

       | Package
       | Description
       | Links

       | `{{ dep.name }}`
       | {{ dep.description }}
       | Repo
