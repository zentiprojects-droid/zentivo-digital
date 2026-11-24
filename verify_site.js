const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('==============================================');
console.log('ZENTIVO DIGITAL — AUTOMATED INTEGRITY TESTS');
console.log('==============================================\n');

// 1. JavaScript Syntax Check
console.log('1. Checking JavaScript Syntax:');
const jsFiles = ['js/projects.js', 'js/animations.js', 'js/main.js'];
let jsErrors = 0;
jsFiles.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    new Function(code);
    console.log('  [PASS] ' + file + ' parsed cleanly.');
  } catch (err) {
    console.error('  [FAIL] ' + file + ': ' + err.message);
    jsErrors++;
  }
});

// 2. HTML Links & Asset Reference Check
console.log('\n2. Checking HTML Links & Assets:');
const htmlFiles = ['index.html', 'about.html', 'services.html', 'projects.html', 'contact.html'];
let assetErrors = 0;

htmlFiles.forEach(htmlFile => {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const regex = /(?:src|href)=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const ref = match[1];
    if (
      ref.startsWith('http://') ||
      ref.startsWith('https://') ||
      ref.startsWith('#') ||
      ref.startsWith('mailto:') ||
      ref.startsWith('tel:') ||
      ref.startsWith('javascript:')
    ) {
      continue;
    }
    const cleanRef = ref.split('?')[0].split('#')[0];
    if (!cleanRef) continue;
    if (!fs.existsSync(cleanRef)) {
      console.error('  [FAIL] ' + htmlFile + ' -> Missing file: ' + cleanRef);
      assetErrors++;
    }
  }
});

if (assetErrors === 0) {
  console.log('  [PASS] All referenced assets, images, stylesheets, and scripts exist on disk!');
}

// 3. Projects Data Validation
console.log('\n3. Validating projectsData:');
const projCode = fs.readFileSync('js/projects.js', 'utf8');
const sandbox = {
  document: { addEventListener: () => {}, querySelector: () => null, querySelectorAll: () => [] },
  window: {}
};
vm.createContext(sandbox);
vm.runInContext(projCode, sandbox);

if (sandbox.projectsData && Array.isArray(sandbox.projectsData)) {
  console.log('  [PASS] Found ' + sandbox.projectsData.length + ' projects in projectsData array.');
  let imgErrors = 0;
  sandbox.projectsData.forEach((p, idx) => {
    if (!fs.existsSync(p.image)) {
      console.error('  [FAIL] Project #' + (idx + 1) + ' (' + p.name + '): image not found at ' + p.image);
      imgErrors++;
    } else {
      console.log('  [PASS] #' + (idx + 1) + ' ' + p.name + ' [' + p.category + '] -> image OK: ' + p.image);
    }
  });
} else {
  console.error('  [FAIL] projectsData is not an array or was not exported.');
}

console.log('\n4. CSS Integrity Check:');
const cssFiles = ['css/style.css', 'css/animations.css', 'css/responsive.css'];
cssFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let openBraces = (content.match(/\{/g) || []).length;
  let closeBraces = (content.match(/\}/g) || []).length;
  if (openBraces === closeBraces) {
    console.log('  [PASS] ' + f + ' braces balanced (' + openBraces + ' blocks).');
  } else {
    console.error('  [FAIL] ' + f + ' unbalanced braces: ' + openBraces + ' open vs ' + closeBraces + ' close.');
  }
});

console.log('\n==============================================');
console.log('TEST SUMMARY: JS Errors: ' + jsErrors + ' | Missing Assets: ' + assetErrors);
console.log('==============================================');
