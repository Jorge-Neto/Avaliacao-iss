import { calculaFgts, calculaImpostoRenda, calculaInss } from "../functions/CalculaDescontos";

function calculaLiquido(salarioBruto) {

    let irrf = calculaImpostoRenda(salarioBruto);
    let inss = calculaInss(salarioBruto)
    let fgts = calculaFgts(salarioBruto);

    let liquido = salarioBruto - irrf - inss;

    let data = { irrf, inss, fgts, liquido };

    return data.toFixed(1);
}

export default calculaLiquido();
