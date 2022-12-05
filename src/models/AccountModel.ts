import { Schema, model, models } from "mongoose";

import { passwordRegex } from "data";

const AccountSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "The username is required!"],
            unique: true,
            trim: true,
            minlength: [3, "The username must have at least 3 characters!"],
            maxlength: [16, "The username can't be that long!"],
        },
        password: {
            type: String,
            required: [true, "The category name is required!"],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default models.Account || model("Account", AccountSchema);
