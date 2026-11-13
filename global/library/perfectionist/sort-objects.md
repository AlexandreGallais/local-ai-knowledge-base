---
title: "sort-objects (part 1 of 3)"
tool: "perfectionist"
version: "5.13"
source: "https://github.com/azat-io/eslint-plugin-perfectionist/blob/9ee9e5b6edbec9e3b9936e5677105404fe656a0b/docs/content/rules/sort-objects.mdx"
commit: "9ee9e5b6edbec9e3b9936e5677105404fe656a0b"
license: "MIT"
---

# sort-objects

Enforce sorted objects.

By adhering to this rule, developers can ensure that object keys are consistently sorted, leading to cleaner and more maintainable code. This rule promotes a standardized key <example-value> across objects, making it easier to navigate and understand the structure of objects within the codebase.

It's **safe**. The rule considers spread elements in objects and does not break component functionality.

<Important>
If you use the `sort-keys` rule, it is highly recommended to disable it to avoid conflicts.
</Important>

## Try it out

<CodeExample
  rule="sort-objects"
  alphabetical={dedent`
    const event = {
      date: new Date('2023-09-15'),
      description: 'Annual conference discussing the latest in technology.',
      location: {
        address: '123 Tech Street',
        city: 'San Francisco',
        country: 'USA',
        postalCode: '94103',
        state: 'CA',
        venue: 'Tech Center',
      },
      organizer: {
        email: 'user@example.com',
        name: 'Charlie Brown',
        phone: '555-1234',
      },
      schedule: [
        {
          activity: 'Registration',
          speaker: null,
          time: '09:00 AM',
        },
        {
          activity: 'Opening Keynote',
          speaker: 'Jane Doe',
          time: '10:00 AM',
        },
        {
          activity: 'Tech Trends 2023',
          speaker: 'Alice Johnson',
          time: '11:00 AM',
        }
      ],
      status: 'upcoming',
      title: 'Tech Conference 2023',
    }
  `}
  lineLength={dedent`
    const event = {
      schedule: [
        {
          activity: 'Registration',
          time: '09:00 AM',
          speaker: null,
        },
        {
          activity: 'Opening Keynote',
          speaker: 'Jane Doe',
          time: '10:00 AM',
        },
        {
          activity: 'Tech Trends 2023',
          speaker: 'Alice Johnson',
          time: '11:00 AM',
        }
      ],
      location: {
        address: '123 Tech Street',
        city: 'San Francisco',
        venue: 'Tech Center',
        postalCode: '94103',
        country: 'USA',
        state: 'CA',
      },
      organizer: {
        email: 'user@example.com',
        name: 'Charlie Brown',
        phone: '555-1234',
      },
      description: 'Annual conference discussing the latest in technology.',
      title: 'Tech Conference 2023',
      date: new Date('2023-09-15'),
      status: 'upcoming',
    }
  `}
  initial={dedent`
    const event = {
      description: 'Annual conference discussing the latest in technology.',
      organizer: {
        email: 'user@example.com',
        phone: '555-1234',
        name: 'Charlie Brown',
      },
      title: 'Tech Conference 2023',
      schedule: [
        {
          speaker: null,
          time: '09:00 AM',
          activity: 'Registration',
        },
        {
          speaker: 'Jane Doe',
          time: '10:00 AM',
          activity: 'Opening Keynote',
        },
        {
          activity: 'Tech Trends 2023',
          time: '11:00 AM',
          speaker: 'Alice Johnson',
        }
      ],
      location: {
        state: 'CA',
        address: '123 Tech Street',
        city: 'San Francisco',
        postalCode: '94103',
        country: 'USA',
        venue: 'Tech Center',
      },
      date: new Date('2023-09-15'),
      status: 'upcoming',
    }
  `}
  client:load
  lang="tsx"
/>
