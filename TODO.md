# TODO

- Assuming the list of names are fetched from an actual api, how would you implement authentication, rate limiting handling, error handling, api unavailability? - What kind of retry strategies you’d imagine implementing?

  - Usually, a request logic (with authentication, error handling, etc.) should be encapsulated in a dedicated class/composable that will be responsible for request making. It means that the low-level request making utility/library (such as Axios or native fetch()) will be combined with a business logic. It'll allow you to use request from everywhere in the application without worrying about the correct headers initialization or to log the request/response errors. Also, in the majority of cases a library shouldn't care about failed requests by itself because an application can have its own error handling logic;
  - The modern application should have flexible ability to get the latest information from API side. It's difficult to control everything manually from code because most algorithms will be focused not only on business needs but to keep everything updated. The best option here is to use HTTP RFC 5861 standard implementations like https://github.com/Kong/swrv or similar. They will control everything internally and will reactively provide updated and actual information to the user.

- How can we protect the app from being abused?

  - In the majority of cases FE applications shouldn't care about it because all the restrictions must be implemented on API side or in a cloud gateway to filter potential abusers. All API should have request amount limits, cooldown times (if possible), permissions for people who can work with them. Also, it's possible to use such tools like Cloudflare DDoS Protection or similar;
  - FE side can also implement permissions/roles subsystem that will reflect the appropriate permissions and roles from API side to prevent unexpected data access;
  - FE application should also care about the places where the potential hacker can break the website: XSS attacks, avoid storing any keys (especially unencrypted). All sensitive data should exists only during the session in RAM (not to store in LocalDB, LocalStorage, etc.);
  - The website should use HTTPS protocol to avoid unencrypted data transfer;
  - The website should have most headers like Access-Control-Allow-Origin (or \*-Methods, etc.).

- How can we deploy the app into a cloud environment?

  - The best option is not to deploy manually but to use CI/CD processes and tools to deliver everything automatically after the full cycle of checks only (code quality check, tests check, artifacts generation, etc.). Such pipelines will have access to the cloud environments, will make the final preparation (if necessary). It will decrease the chance of mistake that human can do;
  - All the applications should be versioned. Usually it makes sense to use tags in code control systems to generate such artifacts. If an application is complex and requires some dependencies to be used to make a final bundle, it makes to think about Docker containerization. Such containers will also be useful for auto-tests because will be generated only once, can be easily reverted in case of bugs, etc.

- How can we be sure the app is running with the latest version of code?

  - Partially the question was answered in the previous topic. But to be more accurate and to cover the cases when the application was loaded and left in a browser tab for a long time, it makes sense to attach to each app version a label and to use some kind of watcher (usually it works in background) and do periodical requests to the app static files endpoint to ensure that the latest version is the same like a browser's one. This check can be performed by a file that contains all the public variables.

- What techniques you can employ to ensure users are not disrupted when you make significant changes to code?

  - Usually the application should be updated at once, not partially. The majority of the modern build tools adds a suffix with a unique has that will be different for every new build of an application. For browser it means all these new files should be loaded again.
  - If the question is about API changes, then API can use versioning system. All the systems should have either backward compatibility or a dedicated version. If a new version of API is released, then it will use a new path of it (e.g. /v1 -> /v2). If a user actively using old version of application then it won't be broken. But that's great to gently notify a user that a newer version of the app is available and they can reload a page;
  - From the implementation point of view, it definitely makes sense to use different levels of tests that covers as much as possible potential cases. The best option is to have unit (low-level), integration (intermediate-level) or E2E (high-level) tests that will cover the most critical flows in an application.

- What kind of accessibility best practices should we keep in mind?

  - Quite a big topic to explain, but the main idea is to follow POUR principles: Perceivable, Operable, Understandable, Robust. All of them includes different techniques but the main idea is to provide ability to people to understand the data in a different ways they prefer and, possibly, can use to interact with a website. Usually it means developers should think about additional attributes that are available for screen readers, for those who use applications to make the page contrast better for them, etc.

- How would you structure the css so that we have the most reusability but also the least leakage between components?

  - Usually the best option is to split data (model), business logic and styles. It can be achieved by strict code separation between them: only UI base can use styles-related stuff, business logic can use both - UI base without additional styles (the styles are encapsulated there) and data models. Data is application-agnostic. UI base is usually Design System implementation (like UI Kit). It can use another library but will modify it to fit the company's style. To do that, such tools like Storybook, independent package control (Nx, Lerna, Yarn Workspaces, etc.) can be used. All new company's sub-application will use it to provide users the same components and styles.
  - To structure low-level CSS, it definitely makes sense to reuse everything from the base library. If it doesn't use anything behind, all the styles should be located in the same place and must be structured in the appropriate forms: pallettes, enumerations, collections, etc. (Tailwind is good choice here). All the static values like colors, paddings, fonts and other should be kept in token format to share across platforms (https://amzn.github.io/style-dictionary/#/README as an example of implementation).

- Any other improvements that you feel like could be added.

  - The application uses Vuex. It's not longer recommended. It's better to migrate to Pinia. It has better TS support, faster, smaller and actively uses modern Vue features;
  - The application uses Vue CLI internally that uses Webpack behind. Makes sense to think about migration to Vite because it's faster and made to work together with Vue;
  - All the corner cases should be covered with tests. Due to time limitation, I wasn't able to cover everything but it makes sense to use E2E tests to check if everything works in an expected way;
  - This requirements-oriented application should not contain any styles. I left them here because an author added them but I'm strongly sure the best option is to avoid adding them here;
  - All the components should use the latest version of Vue 3.2 syntax.
