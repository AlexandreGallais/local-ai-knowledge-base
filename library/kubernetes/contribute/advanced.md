---
title: "Advanced contributing"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/contribute/advanced.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Advanced contributing

This page assumes that you understand how to
contribute to new content and
review others' work, and are ready
to learn about more ways to contribute. You need to use the Git command line
client and other tools for some of these tasks.

## Propose improvements

SIG Docs members
can propose improvements.

After you've been contributing to the Kubernetes documentation for a while, you
may have ideas for improving the Style Guide
, the Content Guide, the toolchain used to build
the documentation, the website style, the processes for reviewing and merging
pull requests, or other aspects of the documentation. For maximum transparency,
these types of proposals need to be discussed in a SIG Docs meeting or on the
kubernetes-sig-docs mailing list.
In addition, it can help to have some context about the way things
currently work and why past decisions have been made before proposing sweeping
changes. The quickest way to get answers to questions about how the documentation
currently works is to ask in the `#sig-docs` Slack channel on
kubernetes.slack.com

After the discussion has taken place and the SIG is in agreement about the desired
outcome, you can work on the proposed changes in the way that is the most
appropriate. For instance, an update to the style guide or the website's
functionality might involve opening a pull request, while a change related to
documentation testing might involve working with sig-testing.

## Coordinate docs for a Kubernetes release

SIG Docs approvers
can coordinate docs for a Kubernetes release.

Each Kubernetes release is coordinated by a team of people participating in the
sig-release Special Interest Group (SIG). Others on the release team for a given
release include an overall release lead, as well as representatives from
sig-testing and others. To find out more about Kubernetes release processes,
refer to
https://github.com/kubernetes/sig-release.

The SIG Docs representative for a given release coordinates the following tasks:

- Monitor the feature-tracking spreadsheet for new or changed features with an
  impact on documentation. If the documentation for a given feature won't be ready
  for the release, the feature may not be allowed to go into the release.
- Attend sig-release meetings regularly and give updates on the status of the
  docs for the release.
- Review and copyedit feature documentation drafted by the SIG responsible for
  implementing the feature.
- Merge release-related pull requests and maintain the Git feature branch for
  the release.
- Mentor other SIG Docs contributors who want to learn how to do this role in
  the future. This is known as "shadowing".
- Publish the documentation changes related to the release when the release
  artifacts are published.

Coordinating a release is typically a 3-4 month commitment, and the duty is
rotated among SIG Docs approvers.

## Serve as a New Contributor Ambassador

SIG Docs approvers
can serve as New Contributor Ambassadors.

New Contributor Ambassadors welcome new contributors to SIG-Docs,
suggest PRs to new contributors, and mentor new contributors through their first
few PR submissions.

Responsibilities for New Contributor Ambassadors include:

- Monitoring the #sig-docs Slack channel for questions from new contributors.
- Working with PR wranglers to identify good first issues for new contributors.
- Mentoring new contributors through their first few PRs to the docs repo.
- Helping new contributors create the more complex PRs they need to become Kubernetes members.
- Sponsoring contributors on their path to becoming Kubernetes members.
- Hosting a monthly meeting to help and mentor new contributors.

Current New Contributor Ambassadors are announced at each SIG-Docs meeting and in the Kubernetes #sig-docs channel.

## Sponsor a new contributor

SIG Docs reviewers
can sponsor new contributors.

After a new contributor has successfully submitted 5 substantive pull requests
to one or more Kubernetes repositories, they are eligible to apply for
membership
in the Kubernetes organization. The contributor's membership needs to be
backed by two sponsors who are already reviewers.

New docs contributors can request sponsors by asking in the #sig-docs channel
on the Kubernetes Slack instance or on the
SIG Docs mailing list.
If you feel confident about the applicant's work, you volunteer to sponsor them.
When they submit their membership application, reply to the application with a
"+1" and include details about why you think the applicant is a good fit for
membership in the Kubernetes organization.

## Serve as a SIG Co-chair

SIG Docs members
can serve a term as a co-chair of SIG Docs.

### Prerequisites

A Kubernetes member must meet the following requirements to be a co-chair:

- Understand SIG Docs workflows and tooling: git, Hugo, localization, blog subproject
- Understand how other Kubernetes SIGs and repositories affect the SIG Docs
  workflow, including:
  teams in k/org, the
  process in k/community,
  plugins in k/test-infra, and the role of
  SIG Architecture.
  In addition, understand how the Kubernetes docs release process works.
- Approved by the SIG Docs community either directly or via lazy consensus.
- Commit at least 5 hours per week (and often more) to the role for a minimum of 6 months

### Responsibilities

The role of co-chair is one of service: co-chairs build contributor capacity, handle process and policy, schedule and run meetings, schedule PR wranglers, advocate for docs in the Kubernetes community, make sure that docs succeed in Kubernetes release cycles, and keep SIG Docs focused on effective priorities.

Responsibilities include:

- Keep SIG Docs focused on maximizing developer happiness through excellent documentation
- Exemplify the community code of conduct and hold SIG members accountable to it
- Learn and set best practices for the SIG by updating contribution guidelines
- Schedule and run SIG meetings: weekly status updates, quarterly retro/planning sessions, and others as needed
- Schedule and run doc sprints at KubeCon events and other conferences
- Recruit for and advocate on behalf of SIG Docs with the CNCF and its platinum partners, including Google, Oracle, Azure, IBM, and Huawei
- Keep the SIG running smoothly

### Running effective meetings

To schedule and run effective meetings, these guidelines show what to do, how to do it, and why.

**Uphold the community code of conduct**:

- Hold respectful, inclusive discussions with respectful, inclusive language.

**Set a clear agenda**:

- Set a clear agenda of topics
- Publish the agenda in advance

For weekly meetings, copypaste the previous week's notes into the "Past meetings" section of the notes

**Collaborate on accurate notes**:

- Record the meeting's discussion
- Consider delegating the role of note-taker

**Assign action items clearly and accurately**:

- Record the action item, who is assigned to it, and the expected completion date

**Moderate as needed**:

- If discussion strays from the agenda, refocus participants on the current topic
- Make room for different discussion styles while keeping the discussion focused and honoring folks' time

**Honor folks' time**:

Begin and end meetings on time.

**Use Zoom effectively**:

- Familiarize yourself with Zoom guidelines for Kubernetes
- Claim the host role when you log in by entering the host key

### Recording meetings on Zoom

When you're ready to start the recording, click Record to Cloud.

When you're ready to stop recording, click Stop.

The video uploads automatically to YouTube.

### Offboarding a SIG Co-chair (Emeritus)

See: k/community/sig-docs/offboarding.md
