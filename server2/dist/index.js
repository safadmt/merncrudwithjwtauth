"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const brand_1 = __importDefault(require("./routes/brand"));
const category_1 = __importDefault(require("./routes/category"));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: "GET,PUT,PATCH,POST,DELETE",
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/api/user', user_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/product', products_1.default);
app.use('/api/brands', brand_1.default);
app.use('api/categories', category_1.default);
let PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
