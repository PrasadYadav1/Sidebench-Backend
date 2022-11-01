# Moony Admin Backend

  

Welcome to Moony

  

## Table of Contents -

  

- [Project Structure](#project-structure)

- [Install](#install)

- [Environment Variables](#environment-variables)

- [ORM](#orm)

- [Creating Api](#creating-api)

- [Usage](#usage)

- [Start Development Server](#start-local-development-server)

- [Build](#build)

- [Run In Production Mode](#run-in-production-mode)

- [Run Lint](#run-lint)

- [Run Tests](#run-tests)

- [Git Workflows](#git-workflows)

- [Best Practices](#best-practices)


## Project Structure

  

### Top-level directory layout

  

.

├── dist # Compiled files (alternatively `build`)

├── src # Source files (alternatively `lib` or `app`)

├── src/docs # Documentation files like swagger

├── src/db # All db related code like migrations goes here

├── src/config # App related config files like express app goes here

├── src/routes # All public or private end points configured here

├── src/handlers # All controllers or handlers for the end points defined here

├── src/utils # All utility functions goes here

├── _test_ # Unit tests or integration tests (alternatively `spec` or `tests`)

├── .prettierrc # Prettier settings defined here

├── .eslintrc.json # Eslint settings and rules defined here

├── .gitignore

├── package.json

└── tsconfig.json # Typescript configuration

├── LICENSE

└── README.md

  
## Install

  

This project uses node and yarn. Go check them out if you don't have them locally installed.
Dont mix yarn and npm

```bash
npm install -g npx yarn typescript

```

Go to the project root folder and run following command

```bash
 yarn     
```

## Environment variables
App needs following environment variables
 - DATABASE_URL: # url for the database (refer [database connection format](https://www.prisma.io/docs/reference/database-reference/connection-urls) in case of doubts) 
 - SERVER_PORT: # port on server to run 
 - CORS_ORIGINS: # domain names separated with comma
 - TOKEN_SECRET: # secret to generate token
 - SHOW_API_DOCS: value should be yes, variable to show api docs(**optional, use this variable only in development mode**) 

## ORM
ORM is used to query database, [prisma](https://www.prisma.io/docs/concepts) is the orm used for this project. Code first approach is followed using migrations, please follow below steps.
 - When new model added or existing model is changed , use below commands to apply changes to the database in respective environments
     	
    ```bash
         npx prisma migrate dev
    ```
 -  To apply pending migrations to development, staging, or testing environments, run the migrate    deploy command as part of your CI/CD pipeline:
    	
      ```bash
           npx prisma migrate deploy
      ```
 - When new model is added or existing model changed, use below command to generate client used to   query db, which will reflect database models.
     ```bash
          npx prisma generate
     ``` 
 - Please refer [Prisma Guides](https://www.prisma.io/docs/guides) for further reading

 - Seeding data

   ```bash
        npx prisma db seed
   ```  
             

## Creating Api

  

### Create Hello World Controller

  

Create `helloWorld.ts` in `src/routes/controllers` and add following GET endpoint code

  

```typescript

import { Request, Response, NextFunction } from  'express';

  

const  helloWorldGet = (req: Request, res: Response, next: NextFunction) => {

var newDate: any = new  Date();

res.status(200).json({message:  'Hello World'});

}

export {helloWorldGet}

```

  

### Register url for the api

  

If it is private url register in `src/routes/private.ts` else register in `src/routes/public.ts` following will create a public route(`src/routes/public.ts`).

  

```typescript

  

import {Router} from  'express';

import {helloWorldGet} from  '../controllers';

const  router = Router();

  

router.get("/hello-world", helloWorldGet);

  

export default router;

  

```

  

### Verifying Api endpoint

  

Run server and navigate to `/hello-world` in browser and now you can see following output.

  

```json

{'message':'Hello  World'}

```

## Usage

  

This section describes all the available scripts that the contributors can use during the development.

  

### Start Local Development Server

  

```bash

yarn run dev

```

  

Use following command for live reload.

  

```bash

yarn run dev:watch

```

### Build

  

Use following command to build and generate build files.

  

```bash

yarn run build

```

  

### Run In Production Mode

  

After [build](#Build) run following command.

  

```bash

yarn run start

```

## Git Workflows : 

The merge flow is dev -> staging -> uat -> prod.
When we need to deploy to staging, a PR from dev -> staging will be created, reviewed, and merged.
Merging into staging will kick off a staging build similarly.

Similar for merging into uat and prod.

### Run Lint

  Use following command to check lint errors.

  

```bash

  yarn run lint

```

  

### Run Tests

  

Use following command to run tests with coverage details.

  

```bash

yarn run test-coverage

```
Use following command to run tests whenever a test is changed without restarting tests again.

  

## Best Practices

  

- Don't import directly from files , import using index.ts.

do:

  

```typescript

import {helloWorldGet} from  '../controllers'

```

  

don't do:

  

```typescript

import {helloWorldGet} from  '../controllers/helloWorldController'

```

  

- Before commit if there are any changes in code `run test` and `run lint`, so that can avoid unnecessary commit history.
