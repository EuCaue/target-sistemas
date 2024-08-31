type Distribuidora = {
  estado: string;
  faturamentoMensal: number;
};

type DistribuidorasComPercentual = Distribuidora & { percentual: number };

const distribuidorasPorEstado: Distribuidora[] = [
  { estado: "SP", faturamentoMensal: 67836.43 },
  { estado: "RJ", faturamentoMensal: 36678.66 },
  { estado: "MG", faturamentoMensal: 29229.88 },
  { estado: "ES", faturamentoMensal: 27165.48 },
  { estado: "Outros", faturamentoMensal: 19849.53 },
];

function calcularPercentuais(distribuidoras: Distribuidora[]): {
  distribuidoraComMaiorPercentual: DistribuidorasComPercentual;
  distribuidoras: DistribuidorasComPercentual[];
} {
  const total = distribuidoras.reduce(
    (acc, distribuidora) => acc + distribuidora.faturamentoMensal,
    0,
  );

  let distribuidoraComMaiorPercentual: DistribuidorasComPercentual = {
    estado: "",
    faturamentoMensal: 0,
    percentual: 0,
  };

  const distribuidorasComPercentuais = distribuidoras.map((distribuidora) => {
    const percentual = (
      (distribuidora.faturamentoMensal / total) *
      100
    ).toFixed(2);

    const distribuidoraComPercentual: DistribuidorasComPercentual = {
      ...distribuidora,
      percentual: parseFloat(percentual),
    };

    if (
      distribuidoraComPercentual.percentual >
      distribuidoraComMaiorPercentual.percentual
    ) {
      distribuidoraComMaiorPercentual = distribuidoraComPercentual;
    }

    return distribuidoraComPercentual;
  });

  return {
    distribuidoraComMaiorPercentual,
    distribuidoras: distribuidorasComPercentuais,
  };
}

const { distribuidoraComMaiorPercentual, distribuidoras } = calcularPercentuais(
  distribuidorasPorEstado,
);

console.log("Estado com o maior percentual de representação:");
console.log(
  `${distribuidoraComMaiorPercentual.estado}\t\t: ` +
    `Faturamento: R$ ${distribuidoraComMaiorPercentual.faturamentoMensal.toFixed(2)}\t\t ` +
    `| Percentual: ${distribuidoraComMaiorPercentual.percentual.toFixed(2)}%`,
);

console.log(
  "\nPercentual de representação de cada estado e faturamento mensal:",
);
distribuidoras.forEach((distribuidora) => {
  console.log(
    `${distribuidora.estado}\t\t: ` +
      `Faturamento: R$ ${distribuidora.faturamentoMensal.toFixed(2)}\t\t ` +
      `| Percentual: ${distribuidora.percentual.toFixed(2)}%`,
  );
});
