# OpportunityBridge 🎓

OpportunityBridge is a lightweight, frontend-only web application designed to help students discover, filter, and track internships, government schemes, and hackathons. 

## Features
* **Instant Search & Filtering:** Real-time search by keyword and category drop-downs (Internships, Hackathons, Government Schemes).
* **Application Tracking:** Users can mark opportunities as "Applied." State is preserved locally across sessions using the browser's `localStorage`.
* **Zero-Backend Architecture:** Content is driven entirely by a local JSON file, requiring no database or server configuration.
* **Responsive Design:** Fully mobile-optimized UI built with Bootstrap 5.

## Tech Stack
* **Frontend:** HTML5, Vanilla JavaScript, Bootstrap 5 (CDN)
* **Data Layer:** JSON (`data.json`)
* **State Management:** Web Storage API (`localStorage`)
* **Hosting:** GitHub Pages

## Local Setup
1. Clone the repository: `git clone https://github.com/mansi04-codes/opportunity-bridge.git`
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension.
4. Right-click `index.html` and select **Open with Live Server**.

## Adding New Opportunities
To add a new listing without touching the application logic, open `data.json` and append a new object to the array following this format:

```json
{
  "id": 4,
  "title": "New Internship or Scheme Name",
  "category": "Internship",
  "description": "Brief description of the role or program.",
  "eligibility": "Target audience or required degree.",
  "deadline": "2026-12-01",
  "apply_link": "[https://official-link.gov.in](https://official-link.gov.in)"
}