import { calculaFgts, calculaImpostoRenda, calculaInss } from "./CalculaDescontos.js";

function calculaLiquido(salarioBruto) {
    let irrf = calculaImpostoRenda(salarioBruto);
    let inss = calculaInss(salarioBruto)
    let fgts = calculaFgts(salarioBruto);

    let liquido = salarioBruto - irrf - inss;

    let data = { irrf, inss, fgts, liquido };

    return data;
}

export default calculaLiquido();
