FROM node:18
COPY . .
RUN npm install
RUN npx playwright install
RUN npx playwright install-deps
CMD ["npx", "playwright", "test"]