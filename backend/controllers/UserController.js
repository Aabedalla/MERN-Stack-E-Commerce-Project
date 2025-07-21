import User from "../models/UserModel.js";
import asyncHandler from "../middlewares/asuncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "جميع الحقول مطلوبة" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        console.error(error);
        res.status(400);
        throw Error(error.message);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
        res.status(401);
        throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
    createToken(res, existingUser._id);
    res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
    });
});

const logoutController = asyncHandler(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ msg: "تم تسجيل الخروج بنجاح" });
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw Error("User Not Found");
    }
});

const UpdateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }
        const UpdatedUser = await user.save();
        res.json({
            _id: UpdatedUser._id,
            username: UpdatedUser.username,
            email: UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw Error("user not found");
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("لا يمكن حذف المستخدم الإداري");
        }
        await user.deleteOne({ id: user._id });
        res.json({ message: "تم حذف المستخدم بنجاح" });
    } else {
        res.status(404);
        throw Error("المستخدم غير موجود");
    }
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw Error("المستخدم غير موجود");
    }
});

const UpdateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            email: updateUser.email,
            username: updateUser.username,
            isAdmin: updateUser.isAdmin,
        });
    } else {
        res.status(404);
        throw Error("المستخدم غير موجود");
    }
});

export { createUser, loginUser, UpdateUserById, getUserById, deleteUserById, logoutController, getAllUsers, getCurrentUserProfile, UpdateCurrentUserProfile };
