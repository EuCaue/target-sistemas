import * as fs from "fs";
import * as path from "path";

type FaturamentoDiario = {
  dia: string;
  valor: number;
};

type Estatisticas = {
  menorValor: number;
  maiorValor: number;
  mediaMensal: number;
  diasAcimaDaMedia: number;
};

function calcularEstatisticas(
  faturamentoDiario: FaturamentoDiario[],
): Estatisticas {
  const valores: number[] = faturamentoDiario
    .filter((item) => item.valor > 0)
    .map((item) => item.valor);

  if (valores.length === 0) {
    return {
      menorValor: 0,
      maiorValor: 0,
      mediaMensal: 0,
      diasAcimaDaMedia: 0,
    };
  }

  const menorValor = Math.min(...valores);
  const maiorValor = Math.max(...valores);

  // Calculando a média mensal
  const mediaMensal =
    valores.reduce((acc, valor) => acc + valor, 0) / valores.length;

  // Achando quantos dias estão acima da média
  const diasAcimaDaMedia = faturamentoDiario
    .filter((item) => item.valor > mediaMensal)
    .length;

  return {
    menorValor: parseFloat(menorValor.toFixed(2)),
    maiorValor: parseFloat(maiorValor.toFixed(2)),
    mediaMensal: parseFloat(mediaMensal.toFixed(2)),
    diasAcimaDaMedia,
  };
}

const jsonPath = path.join(__dirname, "faturamento.json");

// Lendo o arquivo JSON, simulando uma API
fs.readFile(jsonPath, "utf-8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const faturamentoDiario: FaturamentoDiario[] = jsonData.faturamento_diario;
    const { menorValor, maiorValor, mediaMensal, diasAcimaDaMedia } =
      calcularEstatisticas(faturamentoDiario);

    console.log(`\nMenor valor de faturamento:\t\t\tR$ ${menorValor}`);
    console.log(`Média mensal do faturamento:\t\t\tR$ ${mediaMensal}`);
    console.log(`Maior valor de faturamento:\t\t\tR$ ${maiorValor}`);
    console.log(
      `Número de dias com faturamento acima da média:\t${diasAcimaDaMedia}`,
    );
  } catch (e) {
    console.error("Erro ao processar o JSON:", e);
  }
});
