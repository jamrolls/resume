# jamrolls / resume

An adaptable, online personal resume that can be tailored to individual applications and rendered to PDF as needed.

version 0.2.0

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Install

1. Clone the repository to a web server
2. Rename example-resume.json to resume.json
3. Edit as desired to match your actual name/experience/title/etc.

## Usage

Access your resume via the URL associated with the installed path, e.g. https://example.com/resume if you cloned into the root folder of a file-based web server.

By default, the resume will render using `resume.json` for your personal data. Optionally, you can include a query string indicating a desired alternate .json file (this is the adaptable part), e.g. https://example.com/resume?manager for `manager.json` rather than `resume.json`.

To render the displayed resume to a PDF document, simply print using your desired print to PDF driver. Note that at this time, Chrome seems to do the best job of rendering to PDF.

Caution: while printing to paper is also feasible, the minimum page margins required by most personal printers may not handle the intended edge-to-edge design well.

## Contributing

This project is not currently open to outside contributions. For questions or bug reports, please open an issue on GitHub.

## License

Copyright &copy; 2026 June McCormick. All rights reserved.

Unauthorized copying, distribution, modification, or use of this software, in whole or in part, is strictly prohibited without the express written permission of the copyright holder.
