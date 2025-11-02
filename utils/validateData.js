
// copy มาจากงานเก่าใน github book-collection
export const postUserValidation = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            "success": false,
            "message": "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ"
        });
    }
    if (username.length < 3 || username.length > 20 || typeof username !== 'string') {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบข้อมูลไม่ถูกต้อง"
        });
    }
    if (password.length < 8 || password.length > 40) {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบข้อมูลไม่ถูกต้อง"
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบ email ไม่ถูกต้อง"
        });
    }
    next();
};

export const loginValidation = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            "success": false,
            "message": "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ"
        });
    }
    next();
};
export const usernameValidation = (req, res, next) => {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({
            "success": false,
            "message": "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบ"
        });
    }
    if (username.length < 3 || username.length > 20 || typeof username !== 'string') {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบข้อมูลไม่ถูกต้อง"
        });
    }
    next();
};
export const passwordValidation = (req, res, next) => {
    const password = req.body.password;
    const old_password = req.body.old_password;
    if (!password || !old_password) {
        return res.status(400).json({
            "success": false,
            "message": "ข้อมูลที่ต้องการมีไม่ครบ"
        });
    }
    if (password.length < 8 || password.length > 40) {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบข้อมูลไม่ถูกต้อง"
        });
    }
    if (old_password.length < 8 || old_password.length > 40) {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบข้อมูลไม่ถูกต้อง"
        });
    }
    next();
};
export const emailValidation = (req, res, next) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({
            "success": false,
            "message": "ข้อมูลที่ต้องการมีไม่ครบ"
        });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            "success": false,
            "message": "รูปแบบ email ไม่ถูกต้อง"
        });
    }
    next();
};