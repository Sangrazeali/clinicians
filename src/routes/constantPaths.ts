
interface PathConstants {
    HOME: string;
    SIGN_IN: string;
    FORGET_PASSWORD: string;
    SEND_OTP:string;
    NEW_PASSWORD: string;
    EMAIL_SENT: string;
}

const constantPaths:PathConstants = {
    HOME: "/",
    SIGN_IN: "/auth/signin",
    FORGET_PASSWORD: "/auth/forget-password",
    SEND_OTP: "/auth/send-otp",
    NEW_PASSWORD: "/auth/reset-password",
    EMAIL_SENT: "/auth/email-sent",
}

export default constantPaths
