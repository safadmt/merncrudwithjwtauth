"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookies = setCookies;
function setCookies(accessToken, refreshToken, res) {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 1 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000
    });
}
