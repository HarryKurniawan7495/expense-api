import { Pool } from "pg";

const poolDB = new Pool ({
    user:"postgres.dxbqxkwkxflavpbvbhqm",
    host:"aws-0-us-west-1.pooler.supabase.com",
    database:"postgres",
    password:"Daffa20102006",
    port:6543
});

export default poolDB;