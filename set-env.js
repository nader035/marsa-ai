const fs = require('fs');
// ده هيجيب التوكن من الـ Environment Variables بتاعة Vercel
const hfToken = process.env.HF_TOKEN || '';

const envConfigFile = `
export const environment = {
  production: true,
  hfToken: '${hfToken}'
};
`;

// هيعدل الملف قبل الـ Build مباشرة
fs.writeFileSync('./src/environments/environment.prod.ts', envConfigFile);
fs.writeFileSync('./src/environments/environment.ts', envConfigFile);
