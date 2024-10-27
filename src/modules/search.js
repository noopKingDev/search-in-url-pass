import {
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
  createReadStream,
} from "fs";
import prompt from "prompt-sync";

export default async function SearchStrInDb() {
  const pathDb = "./db";
  const outPath = "./results";

  console.clear();
  console.log("please put the word below ");

  const quatityword = prompt()('quantity of words (default is 1): ') || 1

  if(isNaN(quatityword) || quatityword < 1) {
    return console.log('quantitty is invalid !');
    
  }
  const words = new Array();

  while(words.length < quatityword) {
    
    const inputWord = prompt()(words.length > 0 ? "ex (admin) : " : "ex (sp-ini.gov) : ");

    if (!inputWord || inputWord.length < 2)
      return console.log("word is invalid !");

    words.push(inputWord);
  }

  
  if (!existsSync(pathDb)) mkdirSync(pathDb);
  
  const filesInDirectory = readdirSync(pathDb);
  if(filesInDirectory.length == 0) return console.log('no files in directory');

  console.log(`searching in the ${filesInDirectory.length} files ...`);

  const lines = new Array();

  await Promise.all(
    filesInDirectory.map(async (file) => {
      return await new Promise((resolve) => {
        const contentFile = createReadStream(`${pathDb}/${file}`, "utf-8");

        contentFile.on("data", (chunk) => {
          chunk.split("\n").map((line) => {

            const existAllWordsInLine = words.every((currentWord) => line.includes(currentWord))
            if(existAllWordsInLine) lines.push(line);
          });
        });

        contentFile.on("end", resolve);
      });
    })
  );

  console.log(`${lines.length} results matching`);

  const saveResults = prompt()('Save results (y | n) (default is y): ');

  if(saveResults.toLowerCase() == 'n') 
    return console.log(lines.join("\n"));

  if (lines.length === 0) return;

  if (!existsSync(outPath)) mkdirSync(outPath);

  const filename = words.join('-').replace(/[^a-zA-Z0-9]/g, "")
  writeFileSync(
    `${outPath}/${filename}.txt`,
    lines.join("\n")
  );

  console.log("Saved with success");
  console.log(`Access in: ${outPath}/${filename}.txt`);
}

