---
title: "Set the Page Title"
layout: layouts/post.njk
tags: [fasthtml, title, screen-reader]
series: "fasthtml-web-a11y"
order: 5
permalink: "/fasthtml-web-a11y/set-the-page-title/"
date: 2025-11-15
description: "Best practices for creating descriptive page titles that enhance accessibility and SEO."
ogImage: /fasthtml-web-a11y/social/5-set-page-title.png
---

A well-crafted page title is one of the easiest ways to improve both accessibility and overall user experience (UX). It confirms to the user that they are on the page they intended to visit.

<table-of-contents selector="h2, h3, h4, h5" summary="Overview"></table-of-contents>

## Why titles are important

The `<title>` element in the `<head>` of an HTML document:  

* **Is the first thing screen readers announce** when a new page or tab loads.  
* **Appears in browser tabs**, helping users switch between them.  
* **Labels bookmarks and history entries** so the right page can be found later.  
* **Appears in search results**, improving discoverability and SEO.  

If a page has no title, screen readers may announce the **full URL** instead, which is poor UX or assistive technology (AT) users.

## What makes an accessible page title?

Accessibility checkers will identify that a title is *missing* but cannot tell you if the title is *descriptive*. When a page title is missing, most browsers fall back on the **full URL of the current page**. There may be SEO concerns that will conflict with providing accessible page titles but that is outside the scope of this post. 

Good accessible page titles should:

* **State the page's primary purpose** – avoid vague wording or keyword stuffing.  
* **Make sense out of context** – it should be clear in search results or site maps, and unique across the site.  
* **Avoid decorative text or emojis** – AT may present them to users as a confusing Unicode sequence.  
* **Be concise** – shorter titles are easier for everyone to understand. 

### Common mistakes

* Generic titles like "Page", "Untitled", or "Document".
* Titles that are identical across multiple pages of the same site.
* Titles that don't match the actual content of the page.
* Overly long or verbose titles that get cut off in browser tabs.

## Should you include the site's name?

Including the site name helps people recognise which site a tab belongs to and see how pages relate to each other. Put the unique page title first, then the site name.  

Many sites use '|' (vertical bars) to separate a title from the site name. Some screen readers can confusingly announce these as 'vertical line', instead consider:

* Hyphens: e.g. `About Us - The Dunning-Kruger Dispatch`.
* Colons: e.g. `About Us: The Dunning-Kruger Dispatch`.
* Em dashes: e.g. `About Us — The Dunning-Kruger Dispatch`.

## `<title>` And `<h1>` should match

In most cases, a page's `<title>` and `<h1>` should be identical or very similar. The unique part of the `<title>` identifies the page within the site and sets the visitor's expectations, while the `<h1>` states the main content of the page.

If they do not match, people may be unsure they are on the right page. Screen reader users who navigate by headings expect the main heading to reflect what was announced when the page loaded.

### Home page exceptions

A common exception is the home page, where the title might be `Home - 'Company's Name'` but the `<h1>` could be `Welcome to 'Company's Name'` for example.

## Setting titles in FastHTML  

Here are some ways to set page titles in FastHTML:

```python
# set a default title at app initialization
app = FastHTML(hdrs=(picolink), htmlkw=html_options, title='The Dunning-Kruger Dispatch')

# set a title *after* app creation
app.title = 'The Dunning-Kruger Dispatch'

# set the title for a page / route
@app.get("/")
def home():
    # returns a page with a matching <title> and <h1>
    return Titled('The Dunning-Kruger Dispatch')
```

## WCAG Success Criteria

This WCAG success criterion relates to the accessibility topics covered in this post.

**[2.4.2 Page Titled (Level A)](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html)** – Every page's title should clearly describe the page's purpose or the topic of its content.
