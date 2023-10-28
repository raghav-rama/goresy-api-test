import axios from 'axios';
import 'dotenv/config';
import { connect } from '../sql/sqlConnection';

const url = 'https://gorest.co.in/public/v2/users';

async function insertUsers() {
  const { data, status } = await axios.get(url, {
    params: { page: 1, per_page: 10 },
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.GO_REST_API_KEY,
    },
  });
  console.log('status: ', status);
  return data;
}

(async () => {
  const data = await insertUsers();
  for await (const user of data) {
    const { id, name, email, gender, status } = user;
    const connection = await connect();
    const result = await connection.query(
      'INSERT INTO user (id, name, email, gender, status) VALUES (?, ?, ?, ?, ?) ',
      [id, name, email, gender, status]
    );
    console.log('result: ', result);
    connection.end();
  }
})();
