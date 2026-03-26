## Project Structure
```
.
├── backend
.
├── STRUCTURE.md
├── backend
│   └── realtime-whiteboard
│       ├── mvnw
│       ├── mvnw.cmd
│       ├── pom.xml
│       ├── realtime-whiteboard.iml
│       └── src
│           ├── main
│           │   ├── java
│           │   │   └── com
│           │   │       └── mthree
│           │   │           └── realtime_whiteboard
│           │   └── resources
│           │       └── application.properties
│           └── test
│               └── java
│                   └── com
│                       └── mthree
│                           └── whiteboard
├── doc
│   ├── entity-relationship-diagram
│   │   └── erd.png
│   ├── er-diagram
│   ├── sequence-diagram
│   │   └── sequence-diagram.md
│   ├── system-architecture
│   │   └── system-architecture.png
│   └── wireframe
│       ├── wireframe-account.png
│       ├── wireframe-home.png
│       ├── wireframe-landing.png
│       └── wireframe-whiteboard.png
├── frontend
│   ├── README.md
│   ├── angular.json
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── favicon.ico
│   ├── src
│   │   ├── app
│   │   │   ├── app.config.ts
│   │   │   ├── app.css
│   │   │   ├── app.html
│   │   │   ├── app.routes.ts
│   │   │   ├── app.spec.ts
│   │   │   ├── app.ts
│   │   │   ├── content
│   │   │   │   ├── content.css
│   │   │   │   ├── content.html
│   │   │   │   ├── content.spec.ts
│   │   │   │   └── content.ts
│   │   │   ├── core
│   │   │   │   ├── guards
│   │   │   │   │   └── auth.guard.ts
│   │   │   │   ├── helpers
│   │   │   │   │   ├── coordinate-helper.ts
│   │   │   │   │   └── user.model.ts
│   │   │   │   ├── interceptors
│   │   │   │   │   └── auth.interceptor.ts
│   │   │   │   ├── models
│   │   │   │   │   ├── drawing-item.model.ts
│   │   │   │   │   └── user.model.ts
│   │   │   │   └── services
│   │   │   │       ├── artist
│   │   │   │       │   ├── artist-service.spec.ts
│   │   │   │       │   └── artist-service.ts
│   │   │   │       └── auth
│   │   │   │           ├── auth.service.spec.ts
│   │   │   │           └── auth.service.ts
│   │   │   ├── pages
│   │   │   │   ├── auth
│   │   │   │   │   ├── login
│   │   │   │   │   │   ├── login.css
│   │   │   │   │   │   ├── login.html
│   │   │   │   │   │   ├── login.spec.ts
│   │   │   │   │   │   └── login.ts
│   │   │   │   │   └── register
│   │   │   │   │       ├── register.css
│   │   │   │   │       ├── register.html
│   │   │   │   │       ├── register.spec.ts
│   │   │   │   │       └── register.ts
│   │   │   │   ├── contact
│   │   │   │   │   ├── contact.css
│   │   │   │   │   ├── contact.html
│   │   │   │   │   ├── contact.spec.ts
│   │   │   │   │   └── contact.ts
│   │   │   │   ├── favorites
│   │   │   │   │   ├── favorites.css
│   │   │   │   │   ├── favorites.html
│   │   │   │   │   ├── favorites.spec.ts
│   │   │   │   │   └── favorites.ts
│   │   │   │   ├── home
│   │   │   │   │   ├── home-content
│   │   │   │   │   │   ├── home-content.css
│   │   │   │   │   │   ├── home-content.html
│   │   │   │   │   │   ├── home-content.spec.ts
│   │   │   │   │   │   └── home-content.ts
│   │   │   │   │   ├── home.css
│   │   │   │   │   ├── home.html
│   │   │   │   │   ├── home.spec.ts
│   │   │   │   │   ├── home.ts
│   │   │   │   │   └── settings
│   │   │   │   │       ├── settings.css
│   │   │   │   │       ├── settings.html
│   │   │   │   │       ├── settings.spec.ts
│   │   │   │   │       └── settings.ts
│   │   │   │   ├── landing
│   │   │   │   │   ├── landing.css
│   │   │   │   │   ├── landing.html
│   │   │   │   │   ├── landing.spec.ts
│   │   │   │   │   └── landing.ts
│   │   │   │   ├── privacy
│   │   │   │   │   ├── privacy.css
│   │   │   │   │   ├── privacy.html
│   │   │   │   │   ├── privacy.spec.ts
│   │   │   │   │   └── privacy.ts
│   │   │   │   ├── terms
│   │   │   │   │   ├── terms.css
│   │   │   │   │   ├── terms.html
│   │   │   │   │   ├── terms.spec.ts
│   │   │   │   │   └── terms.ts
│   │   │   │   └── whiteboard
│   │   │   │       ├── services
│   │   │   │       │   ├── whiteboard-service.spec.ts
│   │   │   │       │   └── whiteboard-service.ts
│   │   │   │       ├── whiteboard.css
│   │   │   │       ├── whiteboard.html
│   │   │   │       ├── whiteboard.spec.ts
│   │   │   │       └── whiteboard.ts
│   │   │   └── shared
│   │   │       └── reusableComponent
│   │   │           ├── collaborator-list
│   │   │           │   ├── collaborator-list.css
│   │   │           │   ├── collaborator-list.html
│   │   │           │   ├── collaborator-list.spec.ts
│   │   │           │   └── collaborator-list.ts
│   │   │           ├── color-picker
│   │   │           │   ├── color-picker.css
│   │   │           │   ├── color-picker.html
│   │   │           │   ├── color-picker.spec.ts
│   │   │           │   └── color-picker.ts
│   │   │           ├── footer
│   │   │           │   ├── footer.css
│   │   │           │   ├── footer.html
│   │   │           │   ├── footer.spec.ts
│   │   │           │   └── footer.ts
│   │   │           ├── header
│   │   │           │   ├── header-home
│   │   │           │   │   ├── header-home.css
│   │   │           │   │   ├── header-home.html
│   │   │           │   │   ├── header-home.spec.ts
│   │   │           │   │   └── header-home.ts
│   │   │           │   └── header-whiteboard
│   │   │           │       ├── header-whiteboard.css
│   │   │           │       ├── header-whiteboard.html
│   │   │           │       ├── header-whiteboard.spec.ts
│   │   │           │       └── header-whiteboard.ts
│   │   │           ├── toolbar
│   │   │           │   ├── toolbar.css
│   │   │           │   ├── toolbar.html
│   │   │           │   ├── toolbar.spec.ts
│   │   │           │   └── toolbar.ts
│   │   │           └── user-cursor
│   │   │               ├── user-cursor.css
│   │   │               ├── user-cursor.html
│   │   │               ├── user-cursor.spec.ts
│   │   │               └── user-cursor.ts
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.css
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
└── start.sh
```
