
import fs from 'fs/promises';
import path from 'path';

const main = async () => {
  const presidentsFileContent = await fs.readFile('./src/data/presidents.ts', 'utf-8');
  const presidentPortraits = presidentsFileContent.matchAll(/portrait: '(.*)'/g);
  const presidentNames = presidentsFileContent.matchAll(/name: '(.*)'/g);

  const imageDir = path.join('public', 'images', 'presidents');
  await fs.mkdir(imageDir, { recursive: true });

  let i = 0;
  for (const match of presidentPortraits) {
    const url = match[1];
    const name = presidentNames.next().value[1];
    const filename = `${name.toLowerCase().replace(/\s/g, '-')}.jpg`;
    const filepath = path.join(imageDir, filename);
    
    console.log(`Downloading: ${url}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    await fs.writeFile(filepath, Buffer.from(buffer));
    console.log(`Downloaded: ${filepath}`);
    i++;
  }
};

main();

