import { algoliasearch } from "algoliasearch";
import { Sequelize } from "sequelize";
import pg from "pg";
export const algolia = algoliasearch(
  process.env.ALGOLIA_ID_APP,
  process.env.ALGOLIA_TOKEN
);

export const sequelize = new Sequelize(process.env.URL_POSTGRESQL_NEON, {
  dialect: "postgres",
  dialectModule: pg,
});
