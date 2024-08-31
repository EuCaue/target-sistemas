import * as readline from "readline";

function contarOcorrenciasDeA(texto: string): number {
  let contador: number = 0;
  texto.split("").forEach((letra) => letra === "a" ? contador++ : null);
  return contador;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite um texto para desocbrir a quantidades de A: ", (str: string) => {
  if (str.length === 0) {
    console.log("Você não digitou nada! Por favor, insira um texto.");
  } else {
    const ocorrencias: number = contarOcorrenciasDeA(str);
    console.log(`A letra "a" aparece ${ocorrencias} vezes no texto.`);
  }
  rl.close();
});
