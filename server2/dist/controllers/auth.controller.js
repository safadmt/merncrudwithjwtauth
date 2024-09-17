"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const Prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_helpers_1 = require("../helper/users.helpers");
const zod_1 = require("zod");
const userSchema_1 = require("../validators/userSchema");
const tokenUtils_1 = require("../utils/tokenUtils");
const setCookies_1 = require("../utils/setCookies");
const admin_helper_1 = require("../helper/admin.helper");
class UserController {
    static async userSignup(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        try {
            let validateUser = userSchema_1.UserSchema.parse(req.body);
            console.log(validateUser);
            const user = await users_helpers_1.UserHelper.getUser({ email: req.body.email });
            if (user)
                return res.status(409).json({ error: "Email already in user, use another email" });
            let salt = await bcryptjs_1.default.genSalt(10);
            let hashedPassword = await bcryptjs_1.default.hash(req.body.password, salt);
            let newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                deleted: false,
                created_at: new Date
            };
            const newuser = await users_helpers_1.UserHelper.insertUser(newUser);
            const { user_id, username, email } = newuser;
            const accessToken = await (0, tokenUtils_1.generateToken)('accessToken', { id: user_id, username });
            const refreshToken = await (0, tokenUtils_1.generateToken)('refreshToken', { id: user_id, username });
            (0, setCookies_1.setCookies)(accessToken, refreshToken, res);
            res.status(200).json({ user: { user_id, username, email } });
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                console.log(err.issues, "issue");
                console.log(err.errors);
            }
        }
    }
    static async adminSignup(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        try {
            let validateUser = userSchema_1.UserSchema.parse(req.body);
            console.log(validateUser);
            const admin = await admin_helper_1.AdminHelper.getAdmin({ email: req.body.email });
            if (admin)
                return res.status(409).json({ error: "Email already in admin, use another email" });
            let salt = await bcryptjs_1.default.genSalt(10);
            let hashedPassword = await bcryptjs_1.default.hash(req.body.password, salt);
            let newAdmin = {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                created_at: new Date
            };
            const newadmin = await admin_helper_1.AdminHelper.insertAdmin(newAdmin);
            const { admin_id, username, email } = newadmin;
            const accessToken = await (0, tokenUtils_1.generateToken)('accessToken', { id: admin_id, username });
            const refreshToken = await (0, tokenUtils_1.generateToken)('refreshToken', { id: admin_id, username });
            (0, setCookies_1.setCookies)(accessToken, refreshToken, res);
            res.status(200).json({ admin: { admin_id, username, email } });
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                console.log(err.issues, "issue");
                console.log(err.errors);
            }
        }
    }
    static async userLogin(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        req.body.username = "dump";
        try {
            let validateUser = userSchema_1.UserSchema.parse(req.body);
            console.log(validateUser);
            const user = await Prisma.user.findUnique({ where: { email: req.body.email } });
            if (!user)
                return res.status(409).json({ error: "User not exist in the provided email" });
            const isPasswordTrue = bcryptjs_1.default.compare(req.body.password, user.password);
            if (!isPasswordTrue)
                return res.status(401).json({ error: "Incorrect password" });
            const { user_id, username, email } = user;
            const accessToken = await (0, tokenUtils_1.generateToken)('accessToken', { id: user_id, username });
            const refreshToken = await (0, tokenUtils_1.generateToken)('refreshToken', { id: user_id, username });
            (0, setCookies_1.setCookies)(accessToken, refreshToken, res);
            res.status(200).json({ user: { user_id, username, email } });
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                console.log(err.issues, "issue");
                console.log(err.errors);
            }
        }
    }
    static async adminLogin(req, res, next) {
        if (!req.body)
            return res.status(400).json({ error: "Request body is required" });
        req.body.username = "dump";
        try {
            let validateUser = userSchema_1.UserSchema.parse(req.body);
            console.log(validateUser);
            const admin = await Prisma.admin.findUnique({ where: { email: req.body.email } });
            if (!admin)
                return res.status(409).json({ error: "Admin not exist in the provided email" });
            const isPasswordTrue = bcryptjs_1.default.compare(req.body.password, admin.password);
            if (!isPasswordTrue)
                return res.status(401).json({ error: "Incorrect password" });
            const { admin_id, username, email } = admin;
            const accessToken = await (0, tokenUtils_1.generateToken)('accessToken', { id: admin_id, username });
            const refreshToken = await (0, tokenUtils_1.generateToken)('refreshToken', { id: admin_id, username });
            (0, setCookies_1.setCookies)(accessToken, refreshToken, res);
            res.status(200).json({ admin: { admin_id, username, email } });
        }
        catch (err) {
            if (err instanceof zod_1.z.ZodError) {
                console.log(err.issues, "issue");
                console.log(err.errors);
            }
        }
    }
}
exports.UserController = UserController;
