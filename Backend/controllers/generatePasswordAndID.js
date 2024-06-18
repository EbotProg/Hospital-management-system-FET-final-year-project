const crypto = require('crypto');

function generateUserId(hospitalAbbreviation) {
  const randomString = crypto.randomUUID({ type: 'hex' }); // Generates a random hex string
  return `${hospitalAbbreviation}-${randomString.slice(0, 8)}`; // Format with prefix and desired length
}

// const userId = generateUserId();
// console.log(userId); // Example: HOSPITAL-1a2b3c4d




function generatePassword(length) {
    // Enforce minimum length (adjust as needed)
    if (length < 12) {
      throw new Error('Password length must be at least 12 characters');
    }
  
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const bytes = crypto.randomBytes(length); // Generate random bytes
  
    // Convert bytes to characters and filter for allowed characters
    let password = [];
    for (let i = 0; i < length; i++) {
      const index = Math.floor(bytes[i] % charset.length);
      password.push(charset[index]);
    }
  
    return password.join('');
  }
  
//   // Example usage (replace with actual password storage logic)
//   const password = generatePassword(16);
//   console.log(password); // Example output: B^&Ux72j#m$ZpN%T
  
  
//   ///

module.exports = {
    generateUserId,
    generatePassword
}