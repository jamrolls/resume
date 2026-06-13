(() => {

	// Determine which JSON file to load. Default to resume.json or use an 
	// arbitrary alternate if specified in the query string, e.g. 
	// verbose.json for ?verbose.
	// As a security measure, accept only alphanumeric characters such that
	// any fetched file must be a .json file in the same directory.
	const name = window.location.search.replace(/[^a-zA-Z\-]/g, '');
	const src = name ? name + '.json': 'resume.json';

	fetch(src)
		.then(r => {
			if (!r.ok) throw new Error(`Failed to load ${src}: ${r.status}`);
			return r.json();
		})
		.then(render)
		.catch(err => console.error('Resume loader:', err));


	// ---------------------------------------------------------------------------
	// Render
	// ---------------------------------------------------------------------------

	function render(d) {
		document.title = d.name;
		document.querySelector('meta[name="description"]')
			?.setAttribute('content', d.title);

		renderHeader(d);
		renderSummary(d.summary);
		renderExperience(d.experience);
		renderEducation(d.education);
		renderAside(d);
		document.querySelector('main').style.visibility = 'visible';
		document.querySelector('aside').style.visibility = 'visible';
	}


	// ---------------------------------------------------------------------------
	// Header
	// ---------------------------------------------------------------------------

	function renderHeader(d) {
		document.querySelector('h1').textContent = d.name;

		// The first h2 is the subtitle; leave the "Work Experience" h2 alone.
		document.querySelector('main > h2').textContent = d.title;
		document.querySelector('.sub').textContent = d.location;
	}


	// ---------------------------------------------------------------------------
	// Summary
	// ---------------------------------------------------------------------------

	function renderSummary(paragraphs) {
		// Replace the existing summary div (whatever class it has) with a fresh one.
		const existing = document.querySelector('main > div');
		if (!existing) return;

		const div = document.createElement('div');
		for (const text of paragraphs) {
			const p = document.createElement('p');
			p.textContent = text;
			div.appendChild(p);
		}
		existing.replaceWith(div);

		// Remove any remaining summary divs (the regular/verbose pair in the
		// original HTML means there may be a second one).
		document.querySelectorAll('main > div').forEach(el => {
			if (el !== div) el.remove();
		});
	}


	// ---------------------------------------------------------------------------
	// Experience
	// ---------------------------------------------------------------------------

	function renderExperience(jobs) {
		const main = document.querySelector('main');

		// Remove all existing experience content between the "Work Experience" h2
		// and the "Education" h2, inclusive of job headings, paragraphs, and lists.
		const workH2 = [...document.querySelectorAll('main h2')]
			.find(el => el.textContent.trim() === 'Work Experience');
		const eduH2 = [...document.querySelectorAll('main h2')]
			.find(el => el.textContent.trim() === 'Education');

		// Collect nodes between the two h2s and remove them.
		let node = workH2.nextSibling;
		while (node && node !== eduH2) {
			const next = node.nextSibling;
			node.remove();
			node = next;
		}

		// Build and insert fresh experience nodes before the Education h2.
		const fragment = document.createDocumentFragment();
		for (const job of jobs) {
			fragment.appendChild(makeJobNodes(job));
		}
		main.insertBefore(fragment, eduH2);
	}

	function makeJobNodes(job) {
		const frag = document.createDocumentFragment();

		const h3 = document.createElement('h3');
		h3.textContent = job.company;
		if (job.pageBreak) h3.className = 'pbreak';
		frag.appendChild(h3);

		const h4 = document.createElement('h4');
		h4.textContent = job.title;
		frag.appendChild(h4);

		const h5 = document.createElement('h5');
		h5.textContent = formatDateRange(job.start, job.end, job.duration);
		frag.appendChild(h5);

		if (job.description) {
			const p = document.createElement('p');
			p.textContent = job.description;
			frag.appendChild(p);
		}

		// description2 exists on Inherent Method in verbose.json only.
		if (job.description2) {
			const p = document.createElement('p');
			p.textContent = job.description2;
			frag.appendChild(p);
		}

		if (job.bullets?.length) {
			const ul = document.createElement('ul');
			for (const text of job.bullets) {
				const li = document.createElement('li');
				li.textContent = text;
				ul.appendChild(li);
			}
			frag.appendChild(ul);
		}

		return frag;
	}

	function formatDateRange(start, end, duration) {
		const endStr = end ?? 'Present';
		return `${start} – ${endStr} (${duration})`;
	}


	// ---------------------------------------------------------------------------
	// Education
	// ---------------------------------------------------------------------------

	function renderEducation(entries) {
		const main = document.querySelector('main');
		const eduH2 = [...document.querySelectorAll('main h2')]
			.find(el => el.textContent.trim() === 'Education');

		// Remove existing education nodes after the h2.
		let node = eduH2.nextSibling;
		while (node) {
			const next = node.nextSibling;
			node.remove();
			node = next;
		}

		const frag = document.createDocumentFragment();
		for (const entry of entries) {
			if (entry.institution) {
				const h3 = document.createElement('h3');
				h3.textContent = entry.institution;
				frag.appendChild(h3);
			}

			const h4 = document.createElement('h4');
			h4.textContent = entry.credential
				+ (entry.date ? ` · (${entry.date})` : '');
			frag.appendChild(h4);
		}

		// National Merit Finalist has no institution so rendered as h5.
		// Re-do: anything without an institution gets h5 instead of h4.
		// Actually already handled above — but let's make it explicit:
		// entries without institution are rendered as h5.
		main.appendChild(frag);
	}


	// ---------------------------------------------------------------------------
	// Aside
	// ---------------------------------------------------------------------------

	function renderAside(d) {
		const aside = document.querySelector('aside#summary');
		if (!aside) return;
		aside.innerHTML = '';

		aside.appendChild(makeSection('Contact', null, makeContactNodes(d.contact)));
		aside.appendChild(makeSection('Top Skills', null, makeList(d.skills.top)));
		aside.appendChild(makeSection('Technical Skills', null, makeList(d.skills.technical)));
	}

	function makeContactNodes(contact) {
		const frag = document.createDocumentFragment();

		if (contact.resume) {
			appendContactLink(frag, contact.resume.url, contact.resume.display);
		}
		appendContactLink(frag, contact.linkedin.url, contact.linkedin.display);
		appendContactLink(frag, `mailto:${contact.email}`, contact.email);
		appendContactLink(frag, contact.phone.url, contact.phone.display);

		return frag;
	}

	function appendContactLink(parent, href, display) {
		const p = document.createElement('p');
		const a = document.createElement('a');
		a.href = href;
		a.textContent = display;
		p.appendChild(a);
		parent.appendChild(p);
	}

	function makeList(items) {
		const ul = document.createElement('ul');
		for (const item of items) {
			const li = document.createElement('li');
			li.textContent = item;
			ul.appendChild(li);
		}
		return ul;
	}

	function makeSection(heading, className, content) {
		const frag = document.createDocumentFragment();
		const h2 = document.createElement('h2');
		h2.textContent = heading;
		if (className) h2.className = className;
		frag.appendChild(h2);
		frag.appendChild(content);
		return frag;
	}

})();
