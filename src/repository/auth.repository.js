const {pool}=require('../config/db')

const saveUser=async(name,email,phone,userRole,encodedPassword)=>{
    const query=`INSERT INTO user_admin_details(name,email,password,role,phone_no)
                VALUES(?,?,?,?,?);
    `
    const [res]=await pool.execute(query,[name,email,encodedPassword,userRole,phone]);
    return res;
}

const findByEmail=async(email)=>{
const query=`SELECT *
            FROM user_admin_details 
            WHERE email=?;`
const [rows]=await pool.execute(query,[email]);
return rows[0];
}