import { existsSync, readFileSync, writeFileSync } from "node:fs";

import defaultsConfigs from "./core/configs.js";
import MainMenu from "./views/views.js";

await main();
async function main() {
  const optionsSelected = await MainMenu({
    configs: defaultsConfigs,
  });

  const [dataChoose] = defaultsConfigs.filter(
    ({ code }) => code == optionsSelected
  );

  if(!dataChoose) return console.log('opcao invalida');

  dataChoose.run()
  

}

const searchInDbForString = ({ pathDb }) => {
  const existPathDb = existsSync(pathDb);
  if (!existPathDb) return "error";
};
