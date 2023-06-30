const pool = require('../db')

const getUserByEmail = async (email) => {
    let query = `select id,email from public.user where email = '${email}'  `;
    let res = await pool.query(query);
    return res.rows[0];
}

const getUserById = async (id) => {
    let query = `select id, email from public.user where id = ${id} `;
    let res = await pool.query(query);
    return res.rows[0];
}

const createUser = async (email) =>{
    let query = `insert into public.user (email) values ('${email}') returning id, email`;
    let res = await pool.query(query);
    return res.rows[0];
}

const updateProfile = async (email, firstName, lastName, cityId, stateId, countryId, result) =>{
    const updateQuery = ` update public.user set first_name = '${firstName}', last_name = '${lastName}',
     city_id = ${cityId}, state_id = ${stateId}, country_id = ${countryId}, profile_photo = '${result.image.url}'
      where email = '${email}' `;
    console.log('updateQuery: ', updateQuery)
    return await pool.query(updateQuery);
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateProfile
}