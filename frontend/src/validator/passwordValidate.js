
export const isPasswordValid = (password) => {
    password = password.trim();
    if(!password) return false;
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]+$/;
    const ans = passwordRegex.test(password);
    return ans;
}