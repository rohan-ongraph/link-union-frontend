# Link Union

Link Union is a web application designed for managing links from various sources. It allows users to save links along with a name, description, and tags. The application supports CRUD operations, user authentication (login and logout), user profiles, and contact forms. Additionally, it includes an about section, a list view for managing links, and the ability to print link lists as PDF files.

## Table of Contents

1. [Link Union](#link-union)
    - [Features](#features)
    - [Installation](#installation)
    - [Usage](#usage)
2. [Local Database](#local-database)
    - [MongoDB Atlas](#mongodb-atlas)
    - [Service Setup](#service-setup)
    - [Data Structure](#data-structure)
    - [CRUD Operations](#crud-operations)
    - [Integration with Components](#integration-with-components)
3. [Testing](#testing)
4. [Screenshots](#screenshots)
5. [Contributing](#contributing)
6. [Further Help](#further-help)

## Features

- Save links with name, description, and tags
- CRUD operations for managing links
- User authentication (login and logout)
- User profiles
- Contact form
- About section
- List view for managing links
- PDF export for link lists

## Installation

To install Link Union locally, follow these steps:

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

```git
git clone <repository-url>
cd link-union
npm install
```

## Usage

### Running Locally

To run Link Union locally, use the following command: `ng serve`

Navigate to `http://localhost:4200/` in your web browser to access the application.

### Deploying to Netlify

1. **Build Your Angular Application**: Before deploying to Netlify, you need to build your Angular application. Run the following command in your project directory:

```bash
ng build --prod
```

2. **Create a Netlify Account**: If you haven't already, sign up for a free account on Netlify.

3. **Install the Netlify CLI (Command Line Interface)**:

```bash
npm install -g netlify-cli
```

4. **Login to Netlify**: Run the following command and follow the prompts to log in to your Netlify account:

```bash
netlify login
```

5. **Deploy Your Application**: Navigate to your project's dist folder (where your compiled application code resides) and run the following command:

```bash
cd dist/link-union  # Adjust the directory if necessary
netlify deploy
```
(Follow the prompts to deploy your application. Netlify will provide you with a unique URL for your deployed application.)

6. **Configure Custom Domain (Optional)**: If you have a custom domain, you can configure it in your Netlify settings.

## Database

Link Union uses MongoDB Atlas as the database solution. Follow these steps to set up and use the database:

1. **MongoDB Atlas**: Set up a MongoDB Atlas cluster and configure the connection URL in your application.

2. **Service Setup**: The `userService` provided in the application handles CRUD operations for managing link data in the MongoDB Atlas database. The service uses the Angular `HttpClient` module to interact with the database.

3. **Data Structure**: The link data stored in the MongoDB Atlas database follows a specific structure. Each link object should have properties for `name`, `description`, `tags`, etc. Ensure that the data structure matches the model used by the application.

4. **CRUD Operations**: The `userService` provides methods for performing CRUD operations on the link data in MongoDB Atlas. These methods include fetching all links, adding a new link, updating an existing link, and deleting a link.

5. **Integration with Components**: Components within the application use the `userService` to interact with the MongoDB Atlas database. For example, the list view component fetches links from the service and displays them in the UI.

By following these steps, you can effectively manage link data using MongoDB Atlas within the Link Union application.

## Testing

To run unit tests, execute: `ng test`

To run end-to-end tests, use: `ng e2e`

## Screenshots

Home page
![App Screenshot](/Screenshots/Home-Page.png)

Sign In page
![App Screenshot](/Screenshots/Sign-In.png)

Sign Up page
![App Screenshot](/Screenshots/Sign-Up.png)

List View
![App Screenshot](/Screenshots/List-View.png)

Creat Bookmark option
![App Screenshot](/Screenshots/Create-Bookmark.png)

Edit Bookmark option
![App Screenshot](/Screenshots/Edit-Bookmark.png)

View Bookmark option
![App Screenshot](/Screenshots/View-Bookmark.png)

Delete all data option
![App Screenshot](/Screenshots/Delete-all.png)

Profile page
![App Screenshot](/Screenshots/Profile.png)

Contact Us page
![App Screenshot](/Screenshots/Contact-Form.png)

About Section page
![App Screenshot](/Screenshots/About-section.png)

## Contributing

Contributions to Link Union are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a new pull request.

## Further Help

For more information on using Angular CLI, refer to the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
