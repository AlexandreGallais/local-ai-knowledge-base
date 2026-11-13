---
title: "Localizing Kubernetes documentation (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/localization.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page shows you how to
localize
the docs for a different language.

## Contribute to an existing localization

You can help add or improve the content of an existing localization. In
Kubernetes Slack, you can find a channel for each
localization. There is also a general
SIG Docs Localizations Slack channel
where you can say hello.

**Note:**
For extra details on how to contribute to a specific localization,
look for a localized version of this page.

### Find your two-letter language code

First, consult the
ISO 639-1 standard
to find your localization's two-letter language code. For example, the two-letter code for
Korean is `ko`.

Some languages use a lowercase version of the country code as defined by the
ISO-3166 along with their language codes. For example, the Brazilian Portuguese
language code is `pt-br`.

### Fork and clone the repo

First, create your own fork of the
kubernetes/website repository.

Then, clone your fork and `cd` into it:

```shell
git clone https://github.com/<username>/website
cd website
```

The website content directory includes subdirectories for each language. The
localization you want to help out with is inside `content/<two-letter-code>`.

### Suggest changes

Create or update your chosen localized page based on the English original. See
localize content for more details.

If you notice a technical inaccuracy or other problem with the upstream
(English) documentation, you should fix the upstream documentation first and
then repeat the equivalent fix by updating the localization you're working on.

Limit changes in a pull requests to a single localization. Reviewing pull
requests that change content in multiple localizations is problematic.

Follow Suggesting Content Improvements
to propose changes to that localization. The process is similar to proposing
changes to the upstream (English) content.

## Start a new localization

If you want the Kubernetes documentation localized into a new language, here's
what you need to do.

Because contributors can't approve their own pull requests, you need _at least
two contributors_ to begin a localization.

All localization teams must be self-sufficient. The Kubernetes website is happy
to host your work, but it's up to you to translate it and keep existing
localized content current.

You'll need to know the two-letter language code for your language. Consult the
ISO 639-1 standard
to find your localization's two-letter language code. For example, the
two-letter code for Korean is `ko`.

If the language you are starting a localization for is spoken in various places
with significant differences between the variants, it might make sense to
combine the lowercased ISO-3166 country code with the language two-letter code.
For example, Brazilian Portuguese is localized as `pt-br`.

When you start a new localization, you must localize all the
minimum required content before
the Kubernetes project can publish your changes to the live
website.

SIG Docs can help you work on a separate branch so that you
can incrementally work towards that goal.

### Find community

Let Kubernetes SIG Docs know you're interested in creating a localization! Join
the SIG Docs Slack channel and
the SIG Docs Localizations Slack channel.
Other localization teams are happy to help you get started and answer your
questions.

Please also consider participating in the
SIG Docs Localization Subgroup meeting.
The mission of the SIG Docs localization subgroup is to work across the SIG Docs
localization teams to collaborate on defining and documenting the processes for
creating localized contribution guides. In addition, the SIG Docs localization
subgroup looks for opportunities to create and share common tools across
localization teams and identify new requirements for the SIG Docs Leadership
team.  If you have questions about this meeting, please inquire on the
SIG Docs Localizations Slack channel.

You can also create a Slack channel for your localization in the
`kubernetes/community` repository. For an example of adding a Slack channel, see
the PR for adding a channel for Persian.

### Join the Kubernetes GitHub organization

When you've opened a localization PR, you can become members of the Kubernetes
GitHub organization. Each person on the team needs to create their own
Organization Membership Request
in the `kubernetes/org` repository.

### Add your localization team in GitHub

Next, add your Kubernetes localization team to
`sig-docs/teams.yaml`.
For an example of adding a localization team, see the PR to add the
Spanish localization team.

Members of `@kubernetes/sig-docs-**-owners` can approve PRs that change content
within (and only within) your localization directory: `/content/**/`. For each
localization, The `@kubernetes/sig-docs-**-reviews` team automates review
assignments for new PRs. Members of `@kubernetes/website-maintainers` can create
new localization branches to coordinate translation efforts. Members of
`@kubernetes/website-milestone-maintainers` can use the `/milestone`
Prow command to assign a milestone to issues or PRs.

### Configure the workflow

Next, add a GitHub label for your localization in the `kubernetes/test-infra`
repository. A label lets you filter issues and pull requests for your specific
language.

For an example of adding a label, see the PR for adding the
Italian language label.

### Modify the site configuration

The Kubernetes website uses Hugo as its web framework. The website's Hugo
configuration resides in the
`hugo.toml`
file. You'll need to modify `hugo.toml` to support a new localization.

Add a configuration block for the new language to `hugo.toml` under the
existing `[languages]` block. The German block, for example, looks like:

```toml
[languages.de]
title = "Kubernetes"
languageName = "Deutsch (German)"
weight = 5
contentDir = "content/de"
languagedirection = "ltr"

[languages.de.params]
time_format_blog = "02.01.2006"
language_alternatives = ["en"]
description = "Produktionsreife Container-Orchestrierung"
languageNameLatinScript = "Deutsch"
```

The language selection bar lists the value for `languageName`. Assign "language
name in native script and language (English language name in Latin script)" to
`languageName`. For example, `languageName = "한국어 (Korean)"` or `languageName =
"Deutsch (German)"`.

`languageNameLatinScript` can be used to access the language name in Latin
script and use it in the theme. Assign "language name in latin script" to
`languageNameLatinScript`. For example, `languageNameLatinScript ="Korean"` or
`languageNameLatinScript = "Deutsch"`.

The `weight` parameter determines the order of languages in the language selection bar.
A lower weight takes precedence, resulting in the language appearing first.
When assigning the `weight` parameter, it is important to examine the existing languages
block and adjust their weights to ensure they are in a sorted order relative to all languages,
including any newly added language.

For more information about Hugo's multilingual support, see
"Multilingual Mode".

### Add a new localization directory

Add a language-specific subdirectory to the
`content` folder in
the repository. For example, the two-letter code for German is `de`:

```shell
mkdir content/de
```

You also need to create a directory inside `i18n` for
localized strings; look at existing localizations
for an example.

For example, for German the strings live in `i18n/de/de.toml`.

### Localize the community code of conduct

Open a PR against the
`cncf/foundation`
repository to add the code of conduct in your language.

### Set up the OWNERS files

To set the roles of each user contributing to the localization, create an
`OWNERS` file inside the language-specific subdirectory with:

- **reviewers**: A list of kubernetes teams with reviewer roles, in this case,
- the `sig-docs-**-reviews` team created in Add your localization team in GitHub.
- **approvers**: A list of kubernetes teams with approvers roles, in this case,
- the `sig-docs-**-owners` team created in Add your localization team in GitHub.
- **labels**: A list of GitHub labels to automatically apply to a PR, in this
  case, the language label created in Configure the workflow.

More information about the `OWNERS` file can be found at
go.k8s.io/owners.

The Spanish OWNERS file, with
language code `es`, looks like this:

```yaml
# See the OWNERS docs at https://go.k8s.io/owners

# This is the localization project for Spanish.
# Teams and members are visible at https://github.com/orgs/kubernetes/teams.

reviewers:
- sig-docs-es-reviews

approvers:
- sig-docs-es-owners

labels:
- area/localization
- language/es
```

After adding the language-specific `OWNERS` file, update the root
`OWNERS_ALIASES` file with the new
Kubernetes teams for the localization, `sig-docs-**-owners` and
`sig-docs-**-reviews`.

For each team, add the list of GitHub users requested in
Add your localization team in GitHub,
in alphabetical order.

```diff
--- a/OWNERS_ALIASES
+++ b/OWNERS_ALIASES
@@ -48,6 +48,14 @@ aliases:
     - stewart-yu
     - xiangpengzhao
     - zhangxiaoyu-zidif
+  sig-docs-es-owners: # Admins for Spanish content
+    - alexbrand
+    - raelga
+  sig-docs-es-reviews: # PR reviews for Spanish content
+    - alexbrand
+    - electrocucaracha
+    - glo-pena
+    - raelga
   sig-docs-fr-owners: # Admins for French content
     - perriea
     - remyleone
```

### Open a pull request

Next, open a pull request
(PR) to add a localization to the `kubernetes/website` repository. The PR must
include all the minimum required content before it
can be approved.

For an example of adding a new localization, see the PR to enable
docs in French.

### Add a localized README file

To guide other localization contributors, add a new
`README-**.md` to the top
level of kubernetes/website, where
`**` is the two-letter language code. For example, a German README file would be
`README-de.md`.

Guide localization contributors in the localized `README-**.md` file.
Include the same information contained in `README.md` as well as:

- A point of contact for the localization project
- Any information specific to the localization

After you create the localized README, add a link to the file from the main
English `README.md`, and include contact information in English. You can provide
a GitHub ID, email address, Slack channel, or another
method of contact. You must also provide a link to your localized Community Code
of Conduct.

### Launch your new localization

When a localization meets the requirements for workflow and minimum output, SIG
Docs does the following:

- Enables language selection on the website.
- Publicizes the localization's availability through
  Cloud Native Computing Foundation(CNCF)
  channels, including the Kubernetes blog.
