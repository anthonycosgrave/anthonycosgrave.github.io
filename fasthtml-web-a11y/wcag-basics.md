---
title: "Web Content Accessibility Guideline Basics"
layout: layouts/post.njk
tags: [web-accessibility, wcag]
series: "fasthtml-web-a11y"
order: 3
permalink: "/fasthtml-web-a11y/wcag-basics/"
date: 2025-11-15
description: "An introduction to WCAG principles and success criteria for building accessible web content."
ogImage: /fasthtml-web-a11y/social/3-wcag-basics.png
---

Web accessibility (or "web a11y") is guided by the **[Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/WCAG22/)**, created by the World Wide Web Consortium (W3C). [WCAG 2.2](https://www.w3.org/TR/WCAG22/) is the latest recommended version with [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) currently "working draft" status. New versions build on previous versions refining and expanding the guidelines to address changing technologies and user needs.

<table-of-contents selector="h2, h3, h4, h5" summary="Overview"></table-of-contents>

## POUR - the four principles

At its core, WCAG follows the **POUR** principles - [**Perceivable**](https://www.w3.org/TR/WCAG22/#perceivable), [**Operable**](https://www.w3.org/TR/WCAG22/#operable), [**Understandable**](https://www.w3.org/TR/WCAG22/#understandable), and [**Robust**](https://www.w3.org/TR/WCAG22/#robust) - ensuring content can be accessed in multiple ways, navigated effectively, understood easily, and is compatible with assistive technologies (AT) (e.g. screen readers, braille displays, screen magnifiers, high contrast modes).

Here is a simplified breakdown of the principles:

1. **Perceivable** - Web content should be accessible via at least one of our senses - sight, hearing, or touch - and that may be through AT.
2. **Operable** - People must be able to navigate and interact with a site regardless of the input method they use. For example, all interactive elements should be **keyboard-accessible** for those who cannot use a mouse.
3. **Understandable** - Content and interactions should be easy to understand and predictable. For instance, form fields should have clear labels and helpful error messages to guide users.
4. **Robust** - Content must be compatible with various technologies - browsers, computer systems, and AT. The site should work or fail gracefully without negatively impacting accessibility.

## Guidelines and success criteria

WCAG breaks down into 13 guidelines grouped under the relevant POUR principle. Each guideline contains one or more testable success criteria, with a total of 86 success criteria as of WCAG 2.2.

Success criteria are technical, measurable statements that define what must be true for content to be considered accessible. Each success criterion addresses a specific issue, such as keyboard access or text contrast, and is assigned a conformance level: A, AA, or AAA.

Below is a brief overview of the guidelines and related success criteria:

#### Perceivable (Making content available to the senses)
1. **Text Alternatives** – Provide text alternatives for non-text content.
   - **[Success Criterion 1.1.1 (A)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)**: Images need alt text; videos need captions or transcripts.
2. **Time-based Media** – Offer alternatives for audio and video content (e.g., captions, transcripts, sign language interpretation).
3. **Adaptable** – Ensure content is adaptable for different presentations without losing meaning (e.g., semantic HTML structure).
4. **Distinguishable** – Make content easier to see and hear.
   - **[Success Criterion 1.4.1 (A)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)**: Colour should not be the sole method of conveying meaning. Example: A form field with an error should have both **colour and an error message or icon**.
   - **[Success Criterion 1.4.3 (AA)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)**: Text contrast must be at least **4.5:1** against its background to ensure readability.

#### Operable (Ensuring users can interact with the content)
5. **Keyboard Accessible** – Ensure all functionality is available via keyboard.
   - **[Success Criterion 2.1.1 (A)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html)**: All functionality must work using a keyboard alone. Example: Users can navigate your entire website using just the Tab key.
6. **Enough Time** – Provide users with enough time to read and use content (e.g., adjustable time limits).
7. **Seizures and Physical Reactions** – Avoid flashing content that can trigger seizures (e.g., flashing less than three times per second).
8. **Navigable** – Help users navigate and find content efficiently (e.g., clear headings, consistent navigation).
9. **Input Modalities** – Make interactions easier for users with disabilities (e.g., support for voice input and touch).

#### Understandable (Making content clear and predictable)
10. **Readable** – Make text content easy to read and understand (e.g., using plain language, expandable abbreviations).
11. **Predictable** – Ensure web pages operate predictably (e.g., consistent navigation and UI behaviour).
12. **Input Assistance** – Help users avoid and correct mistakes.
    - **[Success Criterion 3.3.1 (A)](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html)**: Forms should clearly identify errors when users input incorrect data. Example: Highlighting a missing required field and providing clear instructions on how to fix it.

#### Robust (Ensuring content is compatible with AT)
13. **Compatible** – Maximize compatibility with AT and future tools.
    - **[Success Criterion 4.1.2 (A)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)**: Form fields and interactive elements need a name, role, and value so AT (like screen readers) can accurately tell users what each element is, what it does, and its current state.

## Achieving a level of WCAG conformance

To claim [conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance) at Level A, AA, or AAA, all requirements of the relevant success criteria at that level and below must be met. It's all-or-nothing. Partial conformance is not a thing.

A checklist like the [WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) can help identify which criteria apply as you are not required to meet the criteria for content you don't have.

### Level A

The lowest level of conformance defines the fundamental accessibility requirements. Such as:

- [Success Criterion 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) - All functionality must be operable via a keyboard.

### Level AA

This is the level most commonly required by law or policy and the level most organisation aim for. It aims to strike a balance between meeting broad accessibility requirements while also being implementable. It is more nuanced than Level A with requirements like:

- [Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) – All text must have a contrast ratio of at least **4.5:1** against its background, with a reduced requirement of 3:1 for "large text" - 18pt (~24px) or larger, or 14pt bold (~19px bold) or larger.

### Level AAA

Level AAA has the *strictest* requirements. However, the [W3C](https://www.w3.org/WAI/WCAG22/Understanding/conformance#conformance-requirements) advises **against** full Level AAA conformance for an entire site "because it is not possible to satisfy all Level AAA success criteria for some content." For example: 

- [Success Criterion 2.2.3: No Timing ](https://www.w3.org/WAI/WCAG21/Understanding/no-timing) - No time limits on any interactions.  

This should not be taken to mean that Level AAA should be avoided for every success criterion.

In some cases, the difference between Level AA and AAA is relatively small, and meeting the higher standard can meaningfully improve accessibility for some users. For example:

**Link Purpose**

- **AA**: [Success Criterion 2.4.4: Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context) – The purpose of a link must be clear from the link *or* its surrounding context.
- **AAA**: [Success Criterion 2.4.9: Link Purpose (Link Only)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-link-only) – The purpose must be clear from the link text *alone*.

This often just requires more descriptive link text. For example, instead of "Click here" in a sentence like "Our annual report is now available. Click here to download it," use "Download the 2025 annual report" as the link text itself.

**Headings and Labels**

- **AA**: [Success Criterion 2.4.6: Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels) – Headings and labels must describe topic or purpose.
- **AAA**: [Success Criterion 2.4.10: Section Headings](https://www.w3.org/WAI/WCAG22/Understanding/section-headings) – Use section headings to organise content.

Many pages already have visual structure. Marking it up with semantic headings (like `<h2>` or `<h3>`) can satisfy this AAA criterion with minimal extra effort.

**Colour Contrast**

- **AA**: [1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) – All text must have a contrast ratio of at least **4.5:1** against its background, with a reduced requirement of 3:1 for "large text" - 18pt (~24px) or larger, or 14pt bold (~19px bold) or larger.     
- **AAA**: [1.4.6: Contrast (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced) – Text must have a contrast ratio of at least **7:1** (4.5:1 for large text).  

Meeting AAA conformance in this instance can be as simple as a slight text colour adjustment.

Where feasible, meeting selected AAA criteria like these does not require major changes and can improve clarity, legibility, and navigation.

## WCAG versus real-world usability

WCAG focuses on *technical accessibility*, not overall user experience and so some gaps do exist.

It doesn't fully address neurodiversity, situational impairments (e.g. noisy environments, low lighting), or real-world usability testing. A site can meet every success criterion on the checklist and still be frustrating to use. WCAG also can't account for browser quirks, AT bugs, or unclear design patterns.

True accessibility goes beyond checklists. It requires **inclusive design from the start** and **usability testing with people who rely on AT** to ensure a site or app is usable in practice and not just in theory.

Think of WCAG as a **minimum standard**, not a guarantee of a good experience. By building accessibility into your workflow from day one, it becomes part of how things are done. It should not be viewed as a chore or a bolt-on. The more it's practiced, the more natural and efficient it becomes.

## Legal requirements

Unfortunately, many organisations only prioritise accessibility when legally required. Laws and regulations often provide the push needed to help ensure minimum standards are met. While WCAG is not law; it is often used as a technical reference at WCAG 2.1 Level AA conformance in legislation. Enforcement and scope differ by country. 

**Always consult local laws or legal advisors for compliance requirements!**