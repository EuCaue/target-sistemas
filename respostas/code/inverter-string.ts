import * as readline from "readline";

function inverterString(str: string): string {
  let strInvertida: string = "";
  for (let i = str.length - 1; i >= 0; i--) {
    const letter: string = str[i];
    strInvertida += letter;
  }
  return strInvertida;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite um texto para inverter: ", (str: string) => {
  if (str.length === 0) {
    console.log("Você não digitou nada! Por favor, insira um texto.");
  } else {
    const strInvertida: string = inverterString(str);
    console.log(`O texto invertido de "${str}" é "${strInvertida}".`);
  }
  rl.close();
});
