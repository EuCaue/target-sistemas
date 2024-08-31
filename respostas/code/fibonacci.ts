import * as readline from "readline";

// Função para verificar se um número pertence à sequência de Fibonacci
function isInFibonacciSequence(num: number): boolean {
  if (num < 0) return false; // Fibonacci não tem números negativos
  if (num === 0 || num === 1) return true;

  let a = 0;
  let b = 1;
  let next = a + b;

  while (next <= num) {
    if (next === num) return true;
    a = b;
    b = next;
    next = a + b;
  }

  return false;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Digite um número inteiro para verificar se pertence à sequência de Fibonacci: ",
  (numStr: string) => {
    const num = parseInt(numStr);

    if (isNaN(num)) {
      console.log("Por favor, insira um número inteiro válido.");
    } else {
      const isInSequence = isInFibonacciSequence(num);
      if (isInSequence) {
        console.log(`${num} pertence à sequência de Fibonacci.`);
      } else {
        console.log(`${num} não pertence à sequência de Fibonacci.`);
      }
    }

    rl.close();
  },
);
