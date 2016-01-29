-- script that truncate all tables from a database

SELECT Concat('TRUNCATE TABLE "' ,table_schema, '"."', TABLE_NAME, '" RESTART IDENTITY CASCADE;') trucate_table_cmd
  FROM INFORMATION_SCHEMA.TABLES
  WHERE table_schema = (SELECT current_schema())
    AND TABLE_NAME NOT LIKE '%knex_migrations'
