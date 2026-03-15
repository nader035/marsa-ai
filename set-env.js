const fs = require('fs');
const path = require('path');

// التأكد من وجود الفولدر أولاً
const dir = './src/environments';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const hfToken = process.env.HF_TOKEN || '';

const envConfigFile = `
export const environment = {
  production: true,
  hfToken: '${hfToken}'
};
`;

// الكتابة في الملفين لضمان إن أي Configuration يقرأ التوكن
fs.writeFileSync(path.join(dir, 'environment.prod.ts'), envConfigFile);
fs.writeFileSync(path.join(dir, 'environment.ts'), envConfigFile);

console.log('✅ Environment files generated successfully!');
