import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'name is required'] },
    email: { type: String, required: [true, 'email is required'], unique: true },
    password: { type: String, required: [true, 'password is required'] },
    img: { type: String },
    roles: { type: [String], enum: ['ADMIN_ROLE', 'USER_ROLE'], default: ['USER_ROLE'] },
});

export const UserDB = mongoose.model('User', userSchema);