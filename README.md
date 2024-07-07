# khoihaicode

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## 2.Programming Knowledge and know-hows

In past projects such as Borderless, Branding Site, my side project for learning,... I have learned and practiced my coding skills with libraries such as:

- How to build and divide the directory structure and architecture for a reactjs project from basic (app based page) to complex (app based feature). Use tools like **husky**, **lint-staged**, **stylelint**, **eslint**, **commitizen**, **prettier** to setup and configure
- **Reactjs**: better understand it, design patterns such as Compound Pattern, HOC Pattern, Hooks Pattern, Container/Presentational Pattern, Render Props Pattern and apply in practice.
- **React Hook Form**: use advanced features, and best practices for optimization
- **Yup**: learn about it (previously mainly used **Zod**) and apply some advanced validation methods to meet project requirements.
- **Tanstack query** (React query): learn uses, how data is stored and shared, manage server state. Apply best practices to optimize code.
- **Pragmatic drag and drop**: Learn and learn how to drag and drop purely in javascript, making it more browser-friendly and optimized for performance. Research into drag and drop nested feature.
- Apply **recursive** to flatten nested array, render tree with nodes.
- **Community APIs**: First time getting acquainted and learning how to work with it.
- **Vitest**: Learn about testing, Javascript/Typescript unit testing, Core Unit Testing Techniques, Breaking Dependencies with Mocks.
- **React Testing Library**: With Vitest, used to Testing React Components, Mocking APIs. I keep learning about it.
- **Playwright**: I started learning a little from it, mainly using it to test e2e for basic front-end pages (html attribute, css). I think it looks better and better than another e2e testing library like **Cypress**.
- **ChakraUI**: I start following this UI library and learned quite a bit of knowledge from it. I cloned that repository and read in details source code, learn how to organize folder structure for a large project and make it public to the community, how to comment and name, interesting and optimal approaches, clean code and easy maintenance.
- **Velite**: I used it to build type-safe data layer, turn Markdown / MDX, YAML, JSON, or other files into app's data layer with **Zod** schema. I move all contents (write with Markdown/MDX) into `content` folder, define collections schema, run velite, then use the output data in my application. That gradually helps me save costs and resources for storing markdown files and does not need an admin page to write content, just save markdown files in the source code or on a repository like github or gitlab. I keep learning about it.
- **VitePress**: I basically used it to make documentation for each project. It was designed for building fast, content-centric websites and takes your the content written in Markdown applies a theme to it, and generates static HTML pages.
- **PostCSS**: Besides **SCSS**, I learn and use PostCSS. One of the main benefits of PostCSS is that it is modular and customizable. I can select the plugins that suit I needs and preferences, and avoid the ones that I don't use. PostCSS can also improve the performance and compatibility, by optimizing code, adding vendor prefixes, or polyfilling new features.
- Some others are **Material UI**, **Bun**, **Zustand**, **Framer Motion**, **Storybook**, **next-intl**.

## 3.Contribution in project

### Borderless

- Init and setup folder structure source code.
- Research and analyze structure Community APIs, how to use it.
- Write common components to reuse such as pagination, scroll to top button, select, breadcrumb,...
- Code News page with features like filtering by category, search with keywords, search type, tags, paginating.
  render article card list.
- Fix bugs in Main page, footer, sub-navigation header, News details.
- Responsibility for summary and report to leader project progress.

### Foundation

- Contribute, share code some components such as pagination, hamburger button.
- Fix some bugs, add meta tags html.

### Branding Site User Front

- Init and setup i18n.
- Init and config Vitest for Unit testing and Component testing.
- Init and config e2e testing with Playwright.
- Write first e2e test for i18n.

### Branding Site Back Office

- Analyze in details project documents and research ideas, libraries.
- Responsibility for summary and report to leader project progress, make source code following the common rules, clean code.
- Init and setup layout (header, nested sidebar), routing, container app.
- Write common reused components such as forms (FormTextField, FormSelect, FormUpload, FormCheckbox, FormRadioGroup, FormEditor), breadcrumbs, alert snackbar, loading page,...
- Be responsible for making 2 features: News and Service Category.
- In News feature:
  - Create a form with multiple languages, dynamic form field, advanced validations.
  - Write some hooks and helper function to make the code more cleaner and readable, maintainable.
  - Announcement and Service Introduction feature were followed and used the same logic validating and my templates.
- In Service Category feature:
  - Create a form service category with multiple titles.
  - Build a tree [Category => Service Category => Service Introduction] that can be drag and drop, change order.
  - Optimize the data flow, data transform to store, handle in client, request to server.
- Fix bugs in News features, some components.
- Discussion with backend team to propose the most optimal solution.

## 4.Communication ability

- Easily communicate and work with team members.
- Always ready to help everyone and the team leader in solving tasks.
- Exchange and invite other members to participate in each other's projects (invite Mr Son Tran to join Branding Site Back Office, Mr Son Nguyen join Borderless)

## 5.Problem-solving ability

At work, you always have to solve problems through tasks. Sometimes bugs are not only created by ourselves, but also due to not fully understanding project requirements and non-functional requirements that have not been fully covered. Here are some typical situations:

- When the requirement of Borderless on the News page requires simultaneous filtering of criteria such as searchType, searchKeyword, headlineId and filtering by Tag, but the APIs do not support filtering by tag. So I just use the APIs to filter based on available criteria, and handle filtering tags on the client side. Actually, the apis should be fixed.
- When filtering under the client, the pagination function will be affected. First, Mr.Sang said to set the page size to 1000 but it is not feasible because the apis limit is 100. From there I have to handle it if the number of returned items is still less than the total then call request again.
- In the search function with criteria, there is a criterion of title + content and the criteria of all, which is a bit unreasonable, so I asked again and removed the criteria of title + content and changed it to all.
- Another problem of the project is that in NK, when typing text into the search input box, characters sometimes duplicate characters. Unfortunately, our side (NDVN) cannot reproduce that error, everything is still smooth as usual. Tried Google and Mr.Kim also provided documentation about the possible bug but still no success. It was close to time, so I decided to return to the version of the last Korean version that didn't have that error. Just like that, you have to deploy the dev and then merge it into staging, ask them to test it a few times, localize the code and then find the line of code causing the bug.
- In the Branding Site Back Office, when processing the News article pin function, you must check whether the current number of articles has reached the maximum limit to return an error. It seems simple, but I have to cover a few cases such as only calling the request api when the user clicks on the checkbox to optimize, then telling the backend to update and adding the sent params as id to cover the case of unpined an article, saving it. and immediately pin it again, otherwise an error will occur. In fact, there are only 4 posts left that are pinned but still show the error (maximum is 5). Besides, the requirement is to display an alert modal to notify the status of the maximum number of pinned posts when the popup-modal flashes once for the first time. Looking carefully, it's because React Query's key management is not reasonable, leading to redundant apis calls, calling the api to check article pin also calls the get detail article api, thereby fixing bugs and optimizing the number of apis calls.
- When doing the function of selecting options where data is taken from the server, instead of letting the user click to show loading and then render the ui, we can optimize and reduce fewer bugs than disabling component select until the api finished calling.
- Discuss with the backend team about the data returned to the sidebar of the Developers Front project, come up with options such as the return api is nested array with children array then use recursive rendering, leading to moderate recursion both frontend and backend. Or the backend returns a flat array with parentId, then the front end also recursively and renders the ui but must first filter the children of any parent, leading to not being optimal so the data is large and nested at many levels.
- When designing a News form to do the create/update function in multi-language cases, instead of choosing to split into independent forms, it will be easier to code but will not be optimal for more than 2 languages ​​because of repetition. code occurs, from there I use dynamic array technology to store data of fields in multiple languages. Besides, we must be able to handle validation cases for multilingual fields such as the user can only create if one of the two languages ​​is full of valid fields, or can create both if the fields are valid, or when Update must not delete any language from the previously created languages, or when updating with a valid language the fields and remaining fields are not complete, the user will still be able to submit (increasing user experience, non-functional requirement).

## 6.Improve ability

- I have improved my ability to read and analyze documents, gaining a better understanding of functional requirements and non-functional requirements.
- Estimate and complete the task within given time improved more than before.
- Make more progress in coding, making code cleaner, easier to read and easier to maintain.
- Learn how to comment code better, review code more mindfully.
