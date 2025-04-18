// const  z  = require("zod");
const { z } = require("zod");

exports.signUpSchema = z.object({
    userName : z.string().min(3, "نام کاربری باید حداقل 3 کاراکتر باشد"),
    email: z.string().email("ایمیل نامعتبر است"),
    password: z.string().min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
});


exports.loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید وارد شود"),
});