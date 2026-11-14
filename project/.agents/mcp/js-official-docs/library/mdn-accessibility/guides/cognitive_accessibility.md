---
title: "Cognitive accessibility (part 1 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/cognitive_accessibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cognitive accessibility

Cognitive accessibility covers accessibility considerations for people with cognition and learning disabilities. This document introduces cognitive accessibility and improving accessibility of the web for people with cognitive and learning differences.

Cognitive impairment refers to a broad range of disabilities, from people with intellectual disabilities who may have the most-limited capabilities, to age-related issues with thinking and remembering. The range includes people with mental illnesses, such as depression and schizophrenia. It also includes people with learning disabilities, such as dyslexia and attention deficit hyperactivity disorder (ADHD).

Though there is a lot of diversity within clinical definitions of cognitive impairments, people with them experience a common set of functional problems. These problems include difficulty with understanding content, remembering how to complete tasks, and confusion caused by inconsistent or non-traditional web page layouts. In this document, we focus on steps developers should take to improve the cognitive accessibility of their websites and applications.

## Overview

Cognitive and intellectual disabilities cover a large spectrum, and may be momentary, temporary, or permanent conditions. For example, dementia and Alzheimer's are permanent cognitive impairments that get progressively worse. Other permanent cognitive impairments include aphasia, speech and language, autism, ADD/ADHD, dyslexia, and dyscalculia.

An example of a temporary cognitive impairment could be people affected by substances such as alcohol or drugs. Another form it can take is depression, such as when mourning the loss of a loved one, or being momentarily saddened by a tweet or video they just saw online. A third example could be sleep deprivation.

It may seem like an overwhelming challenge to address the wide range of cognitive differences, especially when solutions for two different people may be conflicting. One way to handle this is to focus on cognitive skills. Cognitive skills include:

- attention
- memory
- processing speed
- time management
- letters and language
- numbers symbols and math
- understanding and making choices

A solid approach to providing accessible solutions for people with cognitive impairments includes:

- delivering content in more than one way, such as by text-to-speech or by video;
- providing easily-understood content, such as text written using plain-language standards;
- focusing attention on important content;
- minimizing distractions, such as unnecessary content or advertisements;
- providing consistent web page layout and navigation;
- incorporating familiar elements, such as underlined links that are blue when not visited and purple when visited;
- dividing processes into logical, essential steps with progress indicators;
- making website authentication as easy as possible without compromising security; and
- making forms easy to complete, such as with clear error messages and error recovery.

## WCAG Guidelines

WCAG, Web Content Accessibility Guidelines, includes several guidelines to improve cognitive accessibility. These guidelines are published by the Web Accessibility Initiative (WAI) of the World Wide Web Consortium (W3C), the main international standards organization for the Internet. This group is also responsible for the Accessible Rich Internet Application (ARIA) guidelines.

WCAG are guided by four principles: websites must be Perceivable, Operable, Understandable, and Robust. To this end, they define 17 specific guidelines, of which six are especially relevant for cognitive accessibility.

All of the following guidelines help more than just people with cognitive disabilities. For example, being able to extend the expiration time on an application requiring an authentication code sent to a mobile device via text message helps with the following scenarios:

- People with attention or anxiety disorders.
- People who have a poor short-term memory, or who are multitasking.
- People who are less technologically literate.
- People who have poor wireless reception.
- People who have motor control issues.

## Adaptability

Guideline 1.3 states "content should be **adaptable**". Create content that can be presented in different ways without losing information or structure. For example, provide responsive layouts, with a single column mobile design.

All information, including structure and relationships conveyed through the presentation, should be available in a form that can be perceived by all users to achieve this goal. For example, the information could be spoken aloud via a narration tool. Making your content capable of being understood by the software is a good way to help ensure it can be used by alternate presentational modes.

## Time

It is important to allow users the time they require to complete tasks. Guideline 2.2 states "provide users enough **time** to read and use content".

A **time limit** is any process that happens without user initiation after a set time or on a periodic basis, such as being logged out after 30 minutes or having 15 minutes to make a purchase. People with cognitive disabilities may require more time to read content, or to perform functions such as filling out forms. Solutions include providing users enough additional time to complete tasks or eliminate time constraints altogether.

### Timers

Options for adjusting time requirements include:

- Allowing the user to turn off or adjust the time to at least 10 times the original limit before encountering it.
- Alerting the user and providing a buffer of at least 20 seconds to extend the timeout duration by a factor of 10 with an action, such as hitting the space bar.

Provide a toggle on content that allows users to enable a longer session time limit, or no session time limit at all. Examples of timed content include forms, timed reading exercises, and training materials. If the time limit is longer than 20 hours, accommodations are not required.

### Moving, blinking, scrolling

It is important not to distract users, especially ones with cognitive disabilities.

If moving, blinking, scrolling, or auto-updating information starts automatically, lasts more than five seconds, and is presented in parallel with other content, the user must able to pause, stop, hide or control it, unless it's an essential functionality. "Essential" means that removing the moving, blinking, scrolling, or auto-updating information would fundamentally change the meaning of the content and/or functionality, **and** information and functionality cannot be achieved in another way that would conform. This includes animated GIFs, if the gif animates for more than 5 seconds.

Additional timing criteria to consider are:

- People who have cognitive or language limitations may need more time to read and to understand. For improved usability remove any time limit. Timed content should also be avoided, with exceptions for non-interactive synchronized media and real-time events.
- People with attention deficit disorders should be able to focus on content without distractions. The user should be able to postpone or suppress interruptions, except situations involving alerting a person to an emergency. This provides access to people with cognitive disabilities by enabling them to focus on the main purpose of the content. Enable the user to postpone content updates by providing a way to request content updates rather than updating automatically. Also, enable a way to make nonessential alerts optional.
- Ensure that people can continue an activity without loss of data after re-authenticating an expired session, for example, saving the state of a questionnaire. Make sure to save data in such a way that it can be modified after a user re-authenticates. Before re-authenticating, encode the data as hidden or encrypted.
- Providing warnings about inactivity that could result in data loss. When a timeout is used, tell people exactly how much time will cause the session to time out and result in lost data. The exception to this is preserving data for more than 20 hours when no actions are taken.

## Navigation

Guideline 2.4 states "provide ways to help users navigate, find content, and determine where they are," and provides 10 guidelines to ensure the site is navigable and content is findable:

### Include a `<title>`

Make sure to include a `<title>` for the document, as titles provide a quick and easy to reference description of the screen's main point. People with cognitive disabilities, limited short-term memory, and reading disabilities all benefit from being able to identify the purpose of content this way.

### Heading and labels

Include clear and descriptive headings so users can easily find information and understand relationships between different content sections. Descriptive labels help users identify specific components within the content. People who read slowly and people with limited short-term memory benefit when section titles make it possible to predict what each section contains.

### Section headings

Headings help define overall organization of page content. They help facilitate navigation through page content sections, and provide a mechanism to aid comprehension. Examples of headings include chapters, sections and subsections of content, and so on.

Headings are more obvious navigational aids compared to other methods to identify page content sections (borders, whitespace, horizontal rules, etc.).

### Multiple ways to find content

Different users prefer different methods of finding information, so it is important to provide multiple ways for users to locate content on your site.

Providing more than one way to navigate your site can help people find information faster. Some users may prefer a table of contents, site map, or search functionality rather than reading and traversing through several pages to find what they need. Others may prefer to explore the site in a sequential manner, moving from page to page in order to best understand the site's layout, content, and concepts.

### Ability to bypass <example-value> of content

Providing a mechanism, such as a skip link, to bypass <example-value> of content that are repeated on multiple web pages.

### Focus order makes sense

The order of focus for interactive elements should make sense. To achieve this, the DOM order should match the visual order, which in turn should match the tabbing order. If the tab order jumps around, especially in a way that does not match the visual order when navigating with a keyboard, users can become disoriented.

### Focused elements should be visibly focused

When a user navigates using a keyboard, the UI should make it obvious which element currently has focus. Don't alter or remove the browser's default `:focus` styling, unless you're making focus even more obvious.

### Link text conveys meaning

The link's text should clearly and concisely communicate what the user should expect to be navigated to next if they choose to activate it. Poorly phrased link text may confuse users as to its purpose or destination.

Some forms of assistive technology allow users to navigate by lists of all the links present on the page. Links will be removed from the context of their surrounding non-link content, making the need for understandable link text even more important. An example of a poor experience is a page full of links whose text reads, "Click here". Without indicating where "here" will take you, the link's purpose is unclear.

For screen readers, it is vital that linked text describes the purpose of each link. If you have added content to links for screen readers, and that content is verbose and potentially confusing to sighted readers, consider clipping the added text to visually hide it from those not using assistive technologies.

### Current location is available

Users should be able to orient themselves within a site or application. This is especially important and helpful for people with short attention spans who may become confused when following a long series of navigation steps.

All users benefit from information about where they are in a site's hierarchy, especially for sites or applications with large amounts of content or many subsections. Breadcrumbs, site maps, and identifying the current page in the navigation as "current" are all techniques that help communicate the current location.
