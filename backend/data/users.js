import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin user',
        email: 'admin@cakery.com',
        password: bcrypt.hashSync('12345', 10),
        admin: true
    },
    {
        name: 'Jane Doe',
        email: 'jane@cakery.com',
        password:  bcrypt.hashSync('12345', 10),
    },  
    {
        name: 'John doe',
        email: 'john@cakery.com',
        password:  bcrypt.hashSync('12345', 10),
    }
];

export default users;