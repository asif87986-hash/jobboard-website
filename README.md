# JobBoard — Version 2

A responsive beginner-friendly job board demo built with plain HTML, CSS and JavaScript.

## Features
- Search by keyword and filter by location/category
- Job details dialog
- Demo Apply Now button (shows a notice; does not submit an application)
- Admin panel to add, edit and delete listings
- Restore fictional sample data
- Responsive layout
- Browser-local persistence using localStorage

## Important limitations
This is a front-end learning demo, not a production job portal.
- Admin changes are stored only in the browser that made them. They do not sync to GitHub Pages or other visitors.
- There is no login, server, database, application processing, email delivery or security layer.
- The Apply button does not submit an application.
- Initial companies and listings are fictional sample data, not real vacancies.

A real multi-user portal needs a backend API, database, secure authentication/authorisation, validation, privacy controls and a genuine application workflow. Never put secret credentials in front-end JavaScript.

## Run locally
Open `index.html` in a modern browser. No installation is required.

## Update GitHub Pages
Replace the existing repository files with these files, commit them to `main`, and keep Pages set to `main` and `/(root)`. Wait for deployment, then reload the site.

## Test checklist
1. Search for `Sales Executive` and filter Jaipur.
2. Open and close a job's details.
3. Add a fictional test job in Admin dashboard.
4. Edit and delete the test job.
5. Reload; browser-local changes should remain.
6. Restore sample data.

## AI assistance disclosure
This version was prepared with AI assistance. Review, understand, test and customise the code. Uploading generated code alone does not establish maintainer status or qualify anyone for a grant or program.

## License
MIT. See LICENSE.
