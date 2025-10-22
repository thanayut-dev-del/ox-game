import mysql from 'mysql2/promise';
import { Env } from '../../config/env.js';
export const pool = mysql.createPool(Env.DATABASE_URL!);
