---
title: "Cognitive accessibility (part 2 of 2)"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/guides/cognitive_accessibility/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cognitive accessibility (part 2 of 2)

## Readability

Guideline 3.1 states "make text content readable and understandable". For some users, it is difficult to infer the meaning of a word or phrase from context, especially when the word or phrase is used in an unusual way, or has been given a specialized meaning.

For these users, the ability to read and understand may depend on the availability of specific definitions or the expanded forms of acronyms or abbreviations. Some users may experience great difficulty in recognizing written words yet they understand extremely complex and sophisticated documents when the text is read aloud, or when key <example-value> and ideas are illustrated visually.

### Declare the language of the page and any content not in that main language

The language of every page must be declared by using the `lang` attribute on the `<html>` element. Include the `lang` attribute again on text that is in a language other than the main language of the document.

Proper use of `lang` allows some screen readers to announce the text properly when converting it into synthetic speech. It also helps people who use text-to-speech software.

### Define unusual words and word usage

Some disabilities make it difficult to understand nonliteral word usage, such as idioms, colloquialisms, and specialized jargon. Non-native language speakers may also struggle with these terms. If a word or phrase has a unique meaning, in the document provide a definition inline or linked, within a glossary, or to an online dictionary. If a word or phrase is used to mean more than one thing, define each use.

### Define abbreviations

Abbreviations can be confusing for people who:

- Have difficulty decoding words.
- Have limited memory.
- Have difficulty using context to aid understanding.
- Rely on screen magnifiers (which often reduce contextual cues).

Provide an expanded form of the abbreviation the first time it is used, followed by the abbreviation placed within an `` element. If an abbreviation has no expanded form, or is an abbreviation for a word that is not in the document's main language (such as Latin), explain its meaning. Also, consider using ruby text for initialism (pronunciation of acronyms).

### Reading level

Content should be written as clearly as possible. A good rule to go by is to make content simple enough that it can be understood the first time. Methods to achieve this include:

- Using short, simple words.
- Writing short sentences.
- Using active voice in the present tense.
- Using correct grammar and spelling.

It helps users with cognitive disabilities to provide a text summary (sometimes referred to as a TL;DR, or "too long; didn't read") at a low reading level. Another technique you can use is providing accompanying visuals to help explain ideas, events, and processes.

There are tools that can rate the level of your content. For example, this document has an average grade level of about 11. This means it should be easily understood by a native English speaker aged 16 to 17. Some tools can even provide suggestions to help simplify it.

### Pronunciation

There are multiple techniques that can help teach people how to pronounce words:

- Provide the pronunciation immediately following the word.
- Link to a list of pronunciations.
- Provide a glossary with pronunciation.
- Use the `<ruby>` element to illustrate how a word is pronounced.

Providing guidance on how to pronounce words helps many different kinds of people, including those who prefer to read aloud, non-native language speakers, and people who are unfamiliar with the meaning of a term in context.

Another solution is to use glyphs or diacritical marks to illustrate pronunciation. However, if this technique is used, there must be a mechanism to turn it off. Further, it is helpful to link to a guide to the marks being used, as their meaning may not be obvious.

## Predictability

WCAG Guideline 3.2 states "make web pages appear and operate in predictable ways". This is a tenet of good user experience design. Consistency is especially important for people with cognitive difficulties. This includes consistency in page layout and predictable interactive components.

### Use activation, not focus to change context

Creating a change in context should be intentional. Because of this, when a UI feature receives focus, it should not trigger further user-facing actions. Rather, users should need to "activate" a feature to trigger the change.

### Change setting based on an active request

Form control operation and data entry should result in predictable behavior. Changes in context can confuse users with cognitive disabilities, and should therefore only occur when it is clear that such a change will happen in response to the user's action.

Changing state should require intentional user action. Examples of this are checking a checkbox, entering data or changing a select option. Also be sure to provide a submit button to initiate the change of context, and describe what will happen before the change is made.

### Keep navigation consistent throughout the site

Keep the navigation order consistent between pages. For example, if you have a navigation bar on multiple pages, make that navigation uniform across the site with the same links in the same location. This doesn't just apply to navigation: present all repeated components in the same relative order each time they appear.

### Provide consistent labeling

Identical functions should have similar labels every time they are utilized. Consistent button labels, alternative text for icons, and iconography for similar interactions and so on, even on different sections of your site, help all your users.

### Be consistent and predictable, and use norms

While unlabeled iconography is not the most effective method of conveying information, keeping the use of the icons (and if labeled, their label text) consistent helps people to understand what the icon represents. Similarly, don't change defaults like the browser's back button. If you need to redirect a user, let the user know about it beforehand.

## Input Assistance

Guideline 3.3 helps to ensure accurate data entry, stating "help users avoid and correct mistakes". While we all make mistakes, some people are more likely to make mistakes, less likely to notice a mistake, or have a harder time correcting a mistake once they make one.

Input Assistance guidelines aim to reduce the likelihood that users, especially those with disabilities, make a mistake, and, if they do make a mistake, increase the likelihood that they see and comprehend the error message and can successfully fix any errors.

### Convey automated error detection

Users need to be alerted to the error and informed of what is wrong. If there is client-side error detection, observe the following guidelines to make the error as effective as possible when conveyed to the user:

- The error must be described in the text.
- Ensure that the error message is as specific as possible.
- Provide text to identify incomplete required fields and text descriptions if a value entered is invalid.
- If the error prevented a form submission, focus on the error. If multiple errors are present, provide a summary, with each error linking to the related input.
- Include text along with use of icons, images, color and so on. Some people have difficulty understanding the meaning of icons and other visual cues.
- Other people may have difficulty understanding the text version of your error message. For these people, also provide things like icons and colors.
- Also, provide feedback on when there is a successful form submission.

### Provide instructions for user input

Start the form with text instructions on how to operate it. Include labels or instructions when users need to input information, using the ``, `<fieldset>`, and `<legend>` elements to do so.

Labels should be descriptive and positioned close to the input they relate to. When requiring a specific format for input, provide an example formatted in the proper way. Additionally, consider performing server-side validation to help format input data, to aid in the ease of user input.

If a form control is required, indicate it both visually and via code. If a form control changes context, describe what will happen in a way that the user will understand it before they cause the context change to happen.

### Error Suggestion

Provide suggested input to the user if an input error is automatically detected and suggestions for correction are known (unless doing so would jeopardize the security or purpose of the content).

### Prevent catastrophes

For submissions that cause, or can lead to, legal, financial, or other significant consequences, ensure that the submissions can be reviewed, confirmed, and/or are reversible.

Data entered by the user should be checked for errors before submission, and the user should be given the opportunity to correct them. The user should be able to review, confirm, and correct information before final submission. Also, be sure to include a confirmation checkbox in addition to a submit button.

If a submission causes a legal or financial transaction to occur, provide a stated time within which the request can be amended or canceled by the user.

### Provide help

Context-sensitive help should be made available. If a form requires text input, provide form instructions describing the purpose and the necessary input. Include spell checking and suggestions for long-form text input, as well as links to help and support material. If a specific data format is expected for input, provide an example.

## Notes

The above are good design practices. They will benefit everyone.

- Many people with cognitive impairments also have physical disabilities. Websites must conform with the W3C's Web Content Accessibility Guidelines.
- The W3C's Cognitive and Learning Disabilities Accessibility Task Force produces web accessibility guidelines for people with cognitive impairments.
- WebAIM has a Cognitive page of relevant information and resources.
- The United States Centers for Disease Control estimate that, as of 2018, 1 in 4 U.S. citizens have a disability and, of them, cognitive impairment is the most common for young people.
- In the U.S., "intellectual disabilities" used to be called "mental retardation". In the U.K., "intellectual disabilities" is commonly called "learning disabilities" or "learning difficulties".

## See also

- Accessibility Guidelines
- What is accessibility
- Accessibility for seizure disorders
- Understanding WCAG Guidelines
- Accessibility overview
- Web Content Accessibility Guidelines, including cognitive accessibility guidelines
- The W3C's Cognitive and Learning Disabilities Accessibility Task Force
- WebAIM Cognitive information
- CDC information on disabilities
