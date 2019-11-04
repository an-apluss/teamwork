/* eslint-disable no-unused-expressions */
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the database');
});

pool.on('error', err => {
  console.log(err);
});

/**
 * Create Tables
 */
const createTableSchema = () => {
  const sqlDump = `
    CREATE TABLE users (
            id serial primary key NOT NULL,
            firstname varchar(128) NOT NULL,
            lastname varchar(128) NOT NULL,
            email varchar(128) NOT NULL UNIQUE,
            password varchar(128) NOT NULL,
            gender varchar(128) NOT NULL,
            jobrole varchar(128) NOT NULL,
            isadmin boolean NOT NULL DEFAULT FALSE,
            department varchar(128) NOT NULL,
            address TEXT NOT NULL
            );
    CREATE TABLE articles (
            id serial primary key NOT NULL,
            userid integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            article TEXT NOT NULL,
            createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updatedon TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
    CREATE TABLE gifs (
            id serial primary key NOT NULL,
            userid integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            imageurl TEXT NOT NULL,
            createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updatedon TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
    CREATE TABLE comments (
            id serial primary key NOT NULL,
            gifid integer REFERENCES gifs(id) ON DELETE CASCADE DEFAULT NULL,
            userid integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            articleid integer REFERENCES articles(id) ON DELETE CASCADE DEFAULT NULL,
            createdon TIMESTAMP WITH TIME ZONE DEFAULT now(),
            updatedon TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `;
  pool
    .query(sqlDump)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

createTableSchema();
