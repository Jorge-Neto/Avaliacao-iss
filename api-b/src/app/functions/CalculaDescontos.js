export function calculaImpostoRenda(salarioBruto) {
    let [ir, aliquotaIR, taxa] = [1, 1, 1];

    if (salarioBruto <= 1903.98) {
        aliquotaIR = 1;
        taxa = 0;
    }
    if (salarioBruto >= 1903.99 && salarioBruto <= 2826.65) {
        aliquotaIR = 7.5;
        taxa = 142.80;
    }
    if (salarioBruto >= 2826.66 && salarioBruto <= 3751.05) {
        aliquotaIR = 15;
        taxa = 354.80;
    }
    if (salarioBruto >= 3751.06 && salarioBruto <= 4664.68) {
        aliquotaIR = 22.5;
        taxa = 636.13;
    }
    if (salarioBruto >= 4664.68) {
        aliquotaIR = 27.5;
        taxa = 869.36;
    }

    ir = ((salarioBruto * (aliquotaIR / 100)) - taxa);

    return ir.toFixed(1);
}

export function calculaInss(salarioBruto) {
    let [
        descontoInss,
        descontoUm,
        descontoDois,
        descontoTres,
        descontoQuatro
    ] = [
            0,
            135.49,
            101.62,
            310.51,
            621.03
        ];

    if (salarioBruto <= 1693.72) {
        descontoInss = descontoUm;
    } else if (salarioBruto > 1693.72 && salarioBruto < 2822.91) {
        descontoInss = descontoUm + ((salarioBruto - 1693.73) * 0.09);
    } else if (salarioBruto > 2822.90 && salarioBruto < 5645.81) {
        descontoInss = descontoUm + descontoDois + ((salarioBruto - 2822.91) * 0.11);
    } else if (salarioBruto >= 5645.81) {
        descontoInss = descontoUm + descontoDois + descontoTres + descontoQuatro
    }
    return descontoInss.toFixed(1);
}

export function calculaFgts(salarioBruto) {
    let fgts = (salarioBruto * 0.08);

    return fgts.toFixed(1);
}
