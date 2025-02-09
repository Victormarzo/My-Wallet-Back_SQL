# My Wallet - backend
Back-end for My Wallet, an individual expenses control solution

## About
My wallet is a web browser application, best suited for mobile query, that you can use to control your expenses and check your monthly balance
### How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `REACT_APP_API_BASE_URL` should point to your API server 
4. Create the postgress db.
```bash
docker-compose up database
```
5. Create and populate the database
```bash
npm run dev:migration:generate
```
```bash
npm run dev:seed
```
6. Run the back-end in a development environment:

```bash
npm run dev
```
