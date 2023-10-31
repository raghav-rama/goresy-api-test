import { connect } from '../sql/sqlConnection';
import axios from 'axios';
import 'dotenv/config';
import type { Request, Response } from 'express';

async function getUsers(req: Request, res: Response) {
  let connection;
  try {
    connection = await connect();
    const [rows] = await connection.query('SELECT * FROM user');
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function getUserById(req: Request, res: Response) {
  let connection;
  try {
    connection = await connect();
    const [rows] = await connection.query('SELECT * FROM user WHERE id = ?', [
      req.params.id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function createUser(req: Request, res: Response) {
  let connection;
  try {
    const { data } = await axios.post(
      'https://gorest.co.in/public/v2/users',
      {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GO_REST_API_KEY}`,
        },
      }
    );
    console.log(data);
    connection = await connect();
    const [rows] = await connection.query(
      'INSERT INTO user (id, name, email, gender, status) VALUES (?, ?, ?, ?, ?)',
      [data.id, req.body.name, req.body.email, req.body.gender, req.body.status]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function updateUser(req: Request, res: Response) {
  let connection;
  try {
    connection = await connect();
    const [rows] = await connection.query(
      'UPDATE user SET name = ?, email = ?, gender = ?, status = ? WHERE id = ?',
      [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.status,
        req.params.id,
      ]
    );
    console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

export { getUsers, getUserById, createUser, updateUser };
