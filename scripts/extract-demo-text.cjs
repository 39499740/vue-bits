const fs = require('fs');
const path = require('path');

const demoDir = 'src/demo';
const files = fs.readdirSync(demoDir, { recursive: true }).filter(f => f.endsWith('Demo.vue'));

// Read existing locale
const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf-8'));
const zh = JSON.parse(fs.readFileSync('src/locales/zh-CN.json', 'utf-8'));

// Ensure demoProps section exists
if (!en.demoProps) en.demoProps = {};
if (!zh.demoProps) zh.demoProps = {};

let totalAdded = 0;

for (const file of files) {
  const filePath = path.join(demoDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  const original = content;

  // Get component name from the slug path
  const slug = file.replace('Demo.vue', '').toLowerCase();
  
  // Find <h1 class="sub-category"> - component names
  const h1Match = content.match(/<h1 class="sub-category">([^<]+)<\/h1>/);
  const compName = h1Match ? h1Match[1].trim() : file.replace('Demo.vue', '');

  // Extract title="..." from PreviewSwitch and PreviewSlider
  const titleRegex = /(PreviewSwitch|PreviewSlider)\s+title="([^"]+)"/g;
  let tMatch;
  while ((tMatch = titleRegex.exec(content)) !== null) {
    const title = tMatch[2];
    const key = `demoProps.${slug}.${title.replace(/\s+/g, '_')}`;
    if (!en.demoProps[key]) {
      en.demoProps[key] = title;
      // Chinese translation will be filled below
      totalAdded++;
    }
  }
}

console.log(`Found ${totalAdded} translatable titles across ${files.length} files`);
console.log(`en.demoProps has ${Object.keys(en.demoProps).length} keys`);

fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2) + '\n');
console.log('Done - en.json updated with demoProps placeholders');
