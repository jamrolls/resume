# jamrolls / resume

An adaptable framework for tailored personal resume production.

This tool reduces the work of the common practice of tailoring resumes 
to each opportunity by treating resume contents as data, independent of 
the rendering framework for that data, while providing a rendering 
framework which is well suited to both PDF exports and online review.

Separately, a personal experiment testing the practical capabilities and 
limits of AI tools when applied throughout the entire application 
development lifecycle, from project inception through to long-term 
maintenance.

version 0.2.0

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [AI Policy](#ai-policy)
- [License](#license)

## Install

1. Clone the repository to a web server
2. Rename example-resume.json to resume.json
3. Edit as desired to match your actual name/experience/title/etc.
4. Optionally, add additional .json files for tailored alternate resumes

## Usage

Access your resume via the URL associated with the installed path, e.g.  
https://example.com/resume if you cloned into the root folder of a 
file-based web server.

By default, the resume will render using `resume.json` for your personal 
data. Optionally, you can include a query string indicating a desired 
alternate .json file (this is the adaptable part), e.g.  
https://example.com/resume?manager for `manager.json` rather than 
`resume.json`.

To render the displayed resume to a PDF document, simply print using 
your desired print to PDF driver. Note that at this time, Chrome seems 
to do the best job of rendering to PDF.

Caution: while printing to paper is also feasible, the minimum page 
margins required by most personal printers may not handle the intended 
edge-to-edge design well.

## Contributing

This project is not currently open to outside contributions. For 
questions or bug reports, please open an issue on GitHub.

## AI Policy

Written materials are human-first, but AI review and suggestions may be 
incorporated. Code may be AI-first but is reviewed before commit. Commits 
including AI-generated code include a footer indicating AI use.

## License

Copyright &copy; 2026 June McCormick. All rights reserved.

Unauthorized copying, distribution, modification, or use of this 
software, in whole or in part, is strictly prohibited without the 
express written permission of the copyright holder.
