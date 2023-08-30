## Node version
v18

## Create .env file
In the root of the directory, create a .env file.

Contents of .env file will be:

```
URL='https://demo.banked.com/new'
REGION='AU'
```

## How to run via Docker
Build the image: docker build -t banked .

Run the container: docker run banked

## Run in local machine
Install dependencies: npm install

Install playwright browser dependencies: npx playwright install

**Run the tests:**

(headless): npx playwright test

(headed): npx playwright test --headed