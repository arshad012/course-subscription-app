
export const isEmailValid = (email) => {
    email = email.trim();
    if(!email) return false;
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const ans = emailRegex.test(email);
    return ans;
}