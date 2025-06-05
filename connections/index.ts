import { algoliasearch } from "algoliasearch";
import { Sequelize } from "sequelize";

export const algolia = algoliasearch(
  process.env.ALGOLIA_ID_APP,
  process.env.ALGOLIA_TOKEN
);

export const sequelize = new Sequelize(process.env.URL_POSTGRESQL_NEON);
