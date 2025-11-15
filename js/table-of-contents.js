/*

SOLVES A CURRENT PROBLEM, MAY NOT BE PERFECT! 

Table of Contents Web Component

Usage:
  <table-of-contents></table-of-contents>
  <table-of-contents selector="h1,h2,h3"></table-of-contents>

Attributes:
  selector - CSS selector for headings (default: "h2,h3,h4,h5,h6")

Features:
  - Generates hierarchical numbered TOC (1, 1.1, 1.2, 2, 2.1, etc.)
  - Only includes headings within <main> element
  - Exclude headings with data-toc-exclude attribute
  - Self-contained styling via adoptedStyleSheets
  - Semantic <nav> wrapper with ARIA labels

Example exclusion:
  <h2 data-toc-exclude>Skip this heading</h2>
*/

class TableOfContents extends HTMLElement {

	static register() {
		if ("customElements" in window) {
			customElements.define("table-of-contents", TableOfContents);
		}
	}

	get selector() {
		return this.getAttribute("selector") || "h2, h3, h4, h5, h6";
	}

	constructor() {
		super();
		/* share one stylesheet */
		// if (!document.adoptedStyleSheets.find(sheet => sheet._tocStyles)) {
		// 	let sheet = new CSSStyleSheet();
		// 	sheet.replaceSync(`
		// 	.toc details { border: 1px solid #ccc; border-radius: 4px; padding: 0.5em; margin: 1em 0; }
		// 	.toc summary { font-weight: bold; cursor: pointer; padding: 0.25em 0; list-style: none; }
		// 	.toc summary::-webkit-details-marker { display: none; }
		//     .toc { list-style: none; padding-left: 0; }
		//     .toc ol { list-style: none; padding-left: 1.5em; }
		//     .toc li { display: block; margin-bottom: 0.5em; }
		//     .toc li::before { content: attr(data-number) ". "; font-weight: bold; }`);
		// 	sheet._tocStyles = true;
		// 	console.log('Sheet rules:', sheet.cssRules.length)
		// 	document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
		// 	console.log('Adopted stylesheets:', document.adoptedStyleSheets.length)
		// 	console.log('Sheet rules:', sheet.cssRules.length)

		// }
		if (!document.querySelector('style[data-toc-styles]')) {
			const style = document.createElement('style')
			style.setAttribute('data-toc-styles', 'true')
			style.textContent = `
            .toc { list-style: none; padding-left: 0; }
            .toc ol { list-style: none; padding-left: 1.5em; }
            .toc li { display: block; margin-bottom: 0.5em; }
            .toc li::before { content: attr(data-number) ". "; font-weight: bold; }
            nav details { border: 1px solid #ccc; border-radius: 4px; padding: 0.5em; margin: 1em 0; }
            nav summary { font-weight: bold; cursor: pointer; padding: 0.25em 0; list-style: none; }
        `;
			document.head.appendChild(style);
		}

		// 		style.textContent = `
		//     .toc { list-style: none; padding-left: 0; }
		//     .toc ol { list-style: none; padding-left: 1.5em; }
		//     .toc li { display: block; margin-bottom: 0.5em; }
		//     .toc li::before { content: attr(data-number) ". "; font-weight: bold; }
		//     nav details { border: 1px solid light-dark(#ccc, #555); border-radius: 4px; padding: 0.5em; margin: 1em 0; background: light-dark(#fafafa, #1a1a1a); }
		//     nav summary { font-weight: bold; cursor: pointer; padding: 0.25em 0; list-style: none; color: light-dark(#333, #ddd); }
		//     nav summary::-webkit-details-marker { display: none; }
		//     nav a { color: light-dark(#0066cc, #66b3ff); text-decoration: none; }
		//     nav a:hover { text-decoration: underline; }
		// `;

	}

	connectedCallback() {
		// instead of document.querySelectorAll('main h2, main h3, main h4, main h5, main h6')
		const headings = document.querySelectorAll(`main ${this.selector}`);
		if (!headings.length) return

		const nav = document.createElement('nav');
		const root = document.createElement('ol');
		nav.setAttribute('aria-label', 'Table of contents');
		root.className = 'toc';
		let currentLevel = 2;
		let currentParent = root;
		const levelStack = [root]; // nested ols
		const counterStack = [0]; // counters for nesting

		headings.forEach(h => {
			// mixing html with markdown, not perfect but will do for now!
			// i.e. <h2 data-toc-exclude>this heading will be excluded</h2>
			if (h.hasAttribute('data-toc-exclude')) return
			const level = parseInt(h.tagName[1]); // get heading value e.g. '2' from a h2
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = `#${h.id}`;
			// a.textContent = h.firstChild.textContent;

			const clone = h.cloneNode(true)
			const span = clone.querySelector('.ha-placeholder')
			if (span) span.remove()
			a.textContent = clone.textContent
			li.appendChild(a);

			// h3, h4... ?
			if (level > currentLevel) {
				const ol = document.createElement('ol');
				currentParent.lastElementChild.appendChild(ol); // add to previous li
				levelStack.push(ol);
				counterStack.push(0);
				currentParent = ol;
			} else if (level < currentLevel) {
				// upwards... h4, h3...?
				while (levelStack.length > level - 1) {
					levelStack.pop();
					counterStack.pop();
				}
				currentParent = levelStack[levelStack.length - 1];
			} else if (level === 2) {
				// headings on the same level.
				while (levelStack.length > 1) {
					levelStack.pop();
					counterStack.pop();
				}
				currentParent = root;
			}

			// Increment counter at current level and build dot notation (1.2.3)
			counterStack[counterStack.length - 1]++;
			li.setAttribute('data-number', counterStack.join('.'));

			currentParent.appendChild(li);
			currentLevel = level;
		})

		// nav.appendChild(root);
		const details = document.createElement('details');
		const summary = document.createElement('summary');
		const summaryText = this.getAttribute('summary') || 'Table of Contents'
		summary.textContent = summaryText
		details.appendChild(summary);
		details.appendChild(root);
		nav.appendChild(details);
		this.appendChild(nav);
	}
}
// customElements.define('table-of-contents', TableOfContents);
if (!customElements.get('table-of-contents')) {
	TableOfContents.register();
}
