import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    admin: {
        type:Boolean,
        required: true,
        default: false
    },
}, {timestamps: true
});


const User = mongoose.Model('User', userSchema);

export default User;
