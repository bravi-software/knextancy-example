# knextancy-example

This is a simple example of how to build a multi tenant REST API. Using [knextancy](https://github.com/bravi-software/knextancy) with express and PostgreSQL database.

Basically it has examples for:

- [Execute migration and seed tasks by tenant](https://github.com/bravi-software/knextancy-example/tree/master/db)
- [Inject a knex instance with tenant context into every express request (`req.knex`)](https://github.com/bravi-software/knextancy-example/blob/master/src/index.js#L15)
- [Execute SQL queries with multi teant support](https://github.com/bravi-software/knextancy-example/blob/master/src/services/profile.js#L6)
- [Setup knextancy for tests](https://github.com/bravi-software/knextancy-example/blob/master/spec/spec-helper.js)

This is how your database is gonna look like:

![](https://raw.githubusercontent.com/bravi-software/knextancy-example/master/screeshot.png)


**The tenant is defined based in the request header `x-client-id`. So any request will need to include it to get it working properly.**

## Running the Service

### With docker compose

```bash
docker-compose run --service-ports --rm local bash
npm install # in case you have not installed yet
npm start
```

### Locally

* You will need to startup a PostgreSQL database
* Configure some environment variables

  * DB_PORT `tcp://host:port` (example  `tcp://localhost:5432`)
  * DB_USER
  * DB_PASSWORD
  * DB_DATABASE

```bash
npm install # in case you have not installed yet
npm start
```

## Running Tests

### With docker compose

```bash
docker-compose run --rm test bash
npm install # in case you have not installed yet
npm test
```

### Locally

The same configuration to running the service locally.

```bash
npm install # in case you have not installed yet
npm test
```
