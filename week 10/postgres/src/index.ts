
import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5433,
  user: "postgres",
  password: "sagar",
  database: "mydb"        //"postgres" // or "testdb"
});

// const client = new Client({
//     connectionString: "postgresql://postgres:sagar@localhost:5432/mydb"
//     // connectionString:"postgresql://neondb_owner:npg_AnaFe8VdlO1f@ep-purple-unit-ad9ebwyk-pooler.c-2.us-east-1.aws.neon.tech/cohort?sslmode=require&channel_binding=require"
// })

async function createTable() {
    try {
        await client.connect();
        console.log("✅ Connected to Postgres");

        //     await client.query(`
        //   CREATE TABLE IF NOT EXISTS users (
        //     id SERIAL PRIMARY KEY,
        //     username VARCHAR(50) UNIQUE NOT NULL,
        //     email VARCHAR(255) UNIQUE NOT NULL,
        //     password VARCHAR(255) NOT NULL,
        //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        //   )
        // `);

        await client.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(100) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        console.log("addresses created successfully")
    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

async function insertTable(name: string, age: number) {
    try {
        await client.connect();
        console.log("✅ Connected to Postgres");

        // create table if not exists
        //     await client.query(`
        //   CREATE TABLE IF NOT EXISTS users (
        //     id SERIAL PRIMARY KEY,
        //     username VARCHAR(50) UNIQUE NOT NULL,
        //     age INT
        //   )
        // `);

        // insert example data
        // await client.query("INSERT INTO users (name, age) VALUES ($1, $2)", ["shwetha", 20]);
        // await client.query("DELETE from users where id=1");
        // await client.query("DELETE FROM users WHERE id = $1", [2]);
        // await client.query("INSERT INTO users (id, name, age) VALUES ($1, $2, $3)", [1, "Alice", 25]);
        // await client.query("DELETE from users");
        // await client.query("TRUNCATE TABLE users RESTART IDENTITY");


        // Insert data to table
        const insertQuery = "INSERT INTO users (name,age) VALUES ($1,$2)";
        const values = [name, age];
        const res = await client.query(insertQuery, values);
        console.log("Insertion succesfull:", res);



        // fetch data
        // const res = await client.query("SELECT * FROM users");
        // console.log("📊 Users:", res.rows);

    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await client.end();
    }
}

// SQL injection - ; DELETE FROM users

async function insertData(username: string, email: string, password: string) {
    try {
        await client.connect();
        console.log("Connected to postgres");

        const insertQuery = "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)"
        const values = [username, email, password];
        const res = await client.query(insertQuery, values);
        console.log("Insertion succesfull:", res);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

async function insertAddresses(user_id: number, city: string, country: string, street: string, pincode: string) {
    try {
        await client.connect();
        console.log("Connected to postgres");

        const insertQuery = "INSERT INTO addresses (user_id, city, country,street,pincode) VALUES ($1,$2,$3,$4,$5)"
        const values = [user_id, city, country, street, pincode];
        const res = await client.query(insertQuery, values);
        console.log("Insertion succesfull:", res);

    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}

async function fetch(name: string) {
    try {
        await client.connect();
        console.log("✅ Connected to Postgres");

        const getQuery = "SELECT * FROM users where name = $1";
        const values = [name];
        const res = await client.query(getQuery, values);
        if (res.rows.length > 0) {

            console.log(res.rows);
            return res.rows;
        } else {
            console.log("No user found");
            return null;
        }
    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}



async function fetchJoin(id: number) {
    try {
        await client.connect();
        console.log("✅ Connected to Postgres");

        const getQuery = "SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode FROM users u JOIN addresses a ON u.id = a.user_id where u.id = $1";
        const values = [id];
        const res = await client.query(getQuery, values);
        if (res.rows.length > 0) {

            console.log(res.rows);
            return res.rows;
        } else {
            console.log("No user found");
            return null;
        }
    } catch (error) {
        console.log(error);
    } finally {
        await client.end();
    }
}


// createTable();
// insertData("shwetha", "shwetha@gmail.com", "shwetha@");
// insertTable("sagar", 22);
// insertAddresses(1,"bellary","india","devi nagar","583103");
// fetch("sagar")

fetchJoin(1);