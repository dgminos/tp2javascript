const local = {
    vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

    ventas: [
        // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
        { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
        { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
        { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
        { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
    ],
    // 12/02/2019, Hedy, [Monitor GPRS 3000, HDD Toyiva], Centro
    precios: [
        { componente: "Monitor GPRS 3000", precio: 200 },
        { componente: "Motherboard ASUS 1500", precio: 120 },
        { componente: "Monitor ASC 543", precio: 250 },
        { componente: "Motherboard ASUS 1200", precio: 100 },
        { componente: "Motherboard MZI", precio: 30 },
        { componente: "HDD Toyiva", precio: 90 },
        { componente: "HDD Wezter Dishital", precio: 75 },
        { componente: "RAM Quinston", precio: 110 },
        { componente: "RAM Quinston Fury", precio: 230 }
    ]
};


//1) Se pide desarrollar las siguientes funciones:

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
// que es la suma de los precios de cada componente incluido.

const precioMaquina = (array) => {

    let precioTotal = 0;
    array.forEach(element => {
        let componente = local.precios.find(obj => obj.componente === element);
        if (componente) { //verifico truthy del dato componente(si no es ni null, ni empty string, ni undefined, ni NaN, ni 0 o false da true)
            precioTotal = precioTotal + componente.precio;
        }
    });
    return precioTotal;
}
//console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard)
//console.log(precioMaquina(["Motherboard MZI", "RAM Quinston Fury"]));

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de
//una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas.

const cantidadVentasComponente = (componente) => {

    let cantidadVentas = 0;
    local.ventas.forEach(venta => {
        let cantidadVenta = venta.componentes.filter(comp => comp === componente).length;
        cantidadVentas = cantidadVentas + cantidadVenta;
    });
    return cantidadVentas;
}
//console.log(cantidadVentasComponente("Monitor ASC 543")); // 2

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en 
//plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función 
//precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const vendedoraDelMes = (mes, anio) => {
    let ventasDelMes = local.ventas.filter(
        (venta) =>
            venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === mes - 1
    );
    let vendedoraDelMes = "";
    let importeVentasVendedoraMes = 0;

    local.vendedoras.forEach((vendedora) => {
        importeVentasM = 0;
        const ventasMesPorVendedora = ventasDelMes.filter(
            (venta) => venta.nombreVendedora === vendedora
        );

        ventasMesPorVendedora.forEach((vnt) => {
            importeVentasM = importeVentasM + precioMaquina(vnt.componentes);
        });

        if (importeVentasVendedoraMes < importeVentasM) {
            importeVentasVendedoraMes = importeVentasM;
            vendedoraDelMes = vendedora;
        }
    });
    return vendedoraDelMes;
};

//console.log(vendedoraDelMes(1, 2019)); // "Ada" (vendio por $670, una máquina de $320 y otra de $350)

//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes, anio) => {

    let cantidadVentasDeUnMes = 0;
    let ventasDelMes = local.ventas.filter(
        (venta) =>
            venta.fecha.getFullYear() === anio && venta.fecha.getMonth() === mes - 1
    );
    importeVentasM = 0;
    ventasDelMes.forEach((vnt) => {
        importeVentasM = importeVentasM + precioMaquina(vnt.componentes);
    });

    cantidadVentasDeUnMes = importeVentasM;
    return cantidadVentasDeUnMes;
}

//console.log(ventasMes(1, 2019)); // 1250

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasVendedora = (nombre) => {

    let ventasTotales = 0;
    const ventasPorVendedora = local.ventas.filter((venta) => venta.nombreVendedora === nombre);

    ventasPorVendedora.forEach((vnt) => {
        ventasTotales = ventasTotales + precioMaquina(vnt.componentes);
    });
    return ventasTotales;
};
//console.log(ventasVendedora("Grace")); // 900

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función
//cantidadVentasComponente

const componenteMasVendido = () => {

    let componenteMasVendido = '';
    let mayorCantidadVentas = 0;
    for (const precio of local.precios) {
        let cantidadVentas = cantidadVentasComponente(precio.componente);
        if (mayorCantidadVentas < cantidadVentas) {
            componenteMasVendido = precio.componente
            mayorCantidadVentas = cantidadVentas
        }
    }
    return componenteMasVendido;
}
//console.log(componenteMasVendido()); // Monitor GPRS 3000


//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes, anio) => {

    if (local.ventas.filter((v) => (v.fecha.getMonth() === mes - 1 && v.fecha.getFullYear() === anio)).length > 0) {
        return true;
    } else {
        return false;
    }
}
//console.log(huboVentas(3, 2019)); // false


/*2) Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó.
Por ejemplo: { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }.
Por este cambio, se pide:

En las ventas ya existentes, tenemos que agregar la propiedad sucursal con el valor Centro (ya que es la sucursal original).*/

local.ventas.forEach(venta => venta.sucursal = "Centro");

//console.log(JSON.stringify(local.ventas))


//Agregar al objeto principal la propiedad sucursales: ['Centro', 'Caballito']

local.sucursales = ['Centro', 'Caballito'];
//console.log(local);

//Cargar la siguiente información en el array ventas, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal

/* 12/02/2019, Hedy, [Monitor GPRS 3000, HDD Toyiva], Centro*
24/02/2019, Sheryl, [Motherboard ASUS 1500, HDD Wezter Dishital], Caballito*
 01/02/2019, Ada, [Motherboard MZI, RAM Quinston Fury], Centro*
11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito*
15/02/2019, Ada, [Motherboard ASUS 1200, RAM Quinston Fury], Centro*
12/02/2019, Hedy, [Motherboard ASUS 1500, HDD Toyiva], Caballito*
21/02/2019, Grace, [Motherboard MZI, RAM Quinston], Centro*
08/02/2019, Sheryl, [Monitor ASC 543, HDD Wezter Dishital], Centro*
16/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston Fury], Centro*
27/02/2019, Hedy, [Motherboard ASUS 1200, HDD Toyiva], Caballito*
22/02/2019, Grace, [Monitor ASC 543, HDD Wezter Dishital], Centro*
05/02/2019, Ada, [Motherboard ASUS 1500, RAM Quinston], Centro*
01/02/2019, Grace, [Motherboard MZI, HDD Wezter Dishital], Centro*
07/02/2019, Sheryl, [Monitor GPRS 3000, RAM Quinston], Caballito*
14/02/2019, Ada, [Motherboard ASUS 1200, HDD Toyiva], Centro*
*/
local.ventas = [{ fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
{ fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
{ fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Centro" },
{ fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
{ fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Centro" }],
    local.ventas.push({ fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Monitor GPRS 3000", "HDD Toyiva"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ["Motherboard ASUS 1500", "HDD Wezter Dishital"], sucursal: "Caballito" });
local.ventas.push({ fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Motherboard MZI", "RAM Quinston Fury"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "RAM Quinston"], sucursal: "Caballito" });
local.ventas.push({ fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "RAM Quinston Fury"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1500", "HDD Toyiva"], sucursal: "Caballito" });
local.ventas.push({ fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "RAM Quinston"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston Fury"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Caballito" });
local.ventas.push({ fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "HDD Wezter Dishital"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1500", "RAM Quinston"], sucursal: "Centro" });
local.ventas.push({ fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ["Motherboard MZI", "HDD Wezter Dishital"], sucursal: "Centro" }),
    local.ventas.push({ fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ["Monitor GPRS 3000", "RAM Quinston"], sucursal: "Caballito" });
local.ventas.push({ fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ["Motherboard ASUS 1200", "HDD Toyiva"], sucursal: "Centro" });

//console.log(local);


//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal) => {

    let ventasTotales = 0;
    local.ventas.forEach((vnt) => {
        if (vnt.sucursal === sucursal) {
            ventasTotales = ventasTotales + precioMaquina(vnt.componentes)
        }
    });
    return ventasTotales;
}

//console.log(ventasSucursal("Centro")); // 4195
//console.log(ventasSucursal("Caballito")); // 1265

/*Las funciones ventasSucursal y ventasVendedora tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta.
Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?
Haciendo dinámica la parte del argumento de la función, es decir, poniendo como parámetro la propiedad (prop) y reemplazandola donde corresponda dentro de la función. 
Lo mismo con el segundo parámetro "valor". Ej:*/

const ventasPorProp = (prop, value) => {

    let ventasTotales = 0;
    local.ventas.forEach((vnt) => {
        if (vnt[prop] === value) {
            ventasTotales = ventasTotales + precioMaquina(vnt.componentes)
        }
    });
    return ventasTotales;
}

//console.log(ventasPorProp("sucursal", "Centro")); // 4195
//console.log(ventasPorProp("sucursal", "Caballito")); // 1265
//console.log(ventasPorProp("nombreVendedora", "Ada")); // 1680

/*Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes.
No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde
el 1 (enero) hasta el 12 (diciembre).*/

const sucursalDelMes = (mes, anio) => {
    ventasDelMes = []
    for (let venta of local.ventas) {
        if (venta.fecha.getMonth() === mes - 1 && venta.fecha.getFullYear() === anio) {
            ventasDelMes.push(venta);
        }
    }
    let mejoresVentas = 0;
    let mejorSucursal = '';
    local.sucursales.forEach(sucursal => {
        let ventasSucursal = 0;
        ventasDelMes.forEach(venta => {
            if (venta.sucursal === sucursal) {
                importeVenta = precioMaquina(venta.componentes);
                ventasSucursal = ventasSucursal + importeVenta
            }
        });
        if (ventasSucursal > mejoresVentas) {
            ventasSucursal = mejoresVentas;
            mejorSucursal = sucursal;
        }
    });
    return mejorSucursal;

}
//console.log("Sucursal del mes: " + sucursalDelMes(1, 2019)); // "Centro"


/*3) Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes.
Para esto, necesitamos crear las siguientes funciones:

renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año*/

const renderPorMes = (anio) => {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio,', 'Julio', 'Agosto', 'Septiembre', '0ctubre', 'Noviembre', 'Diciembre'];
    console.log(`Ventas por mes durante el año: ${anio} `);
    meses.forEach((key, value) => {
        console.log(`Ventas de ${key}: $`, ventasMes(value + 1, anio))
    });
}
//console.log(renderPorMes(2019));


//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal

const renderPorSucursal = () => {

    console.log('Ventas por sucursal.')
    local.sucursales.forEach(sucursal => {
        console.log('Total de ventas sucursal ' + sucursal + ": $" + ventasSucursal(sucursal))
    });
}

//console.log(renderPorSucursal());


//render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó

const vendedoraQueMasIngresosGenero = () => {
    let mejorVendedora = '';
    let mejoresVentas = 0;
    local.vendedoras.forEach(vendedora => {
        let ventas = ventasPorProp("nombreVendedora", vendedora)
        if (mejoresVentas < ventas) {
            mejoresVentas = ventas;
            mejorVendedora = vendedora;
        }
    });

    return mejorVendedora;
}
//console.log('Vendedora que más ingresos generó: ' + vendedoraQueMasIngresosGenero());

const render = () => {
    console.log('Reporte.')
    console.log('Ventas por mes.')
    console.log(renderPorMes(2019));
    console.log(renderPorSucursal());
    console.log('Producto estrella: ' + componenteMasVendido());
    console.log('Vendedora que más ingresos generó: ' + vendedoraQueMasIngresosGenero());
}
render();



/*Reporte
Ventas por mes:
Total de enero 2019: 1250
Total de febrero 2019: 4210
Ventas por sucursal:
Total de Centro: 4195
otal de Caballito: 1265
Producto estrella: Monitor GPRS 3000
Vendedora que más ingresos generó: Grace*/


// ************************************************************************************************************************************
//RENDER DINÁMICO.

const btn = document.getElementById('btn');

const mesesRender = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', '0ctubre', 'Noviembre', 'Diciembre'];
const listaMeses = document.getElementById('listaMeses');
const listaSucursales = document.getElementById('listaSucursales');

const renderDinamico = () => {

    const anio = document.getElementById("inputAnio")


    for (let [i, mes] of mesesRender.entries()) {
        const itemList = document.createElement('li');
        itemList.className = 'list-group-item d-flex justify-content-between align-items-center';
        let texto = `Ventas de ${mes}: $` + ventasMes(i + 1, Number(anio.value))
        itemList.textContent = texto;
        listaMeses.appendChild(itemList);
    }


    for (sucursal of local.sucursales) {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';
        let text = `Ventas sucursal ${sucursal}: $` + ventasSucursal(sucursal);
        itemLista.textContent = text;
        listaSucursales.appendChild(itemLista);
    }


    const productoEstrella = document.createElement('h6');
    const txt = componenteMasVendido();
    productoEstrella.textContent = txt;
    document.getElementById("productoEstrella").appendChild(productoEstrella);


    const mejorVendedora = document.createElement('h6');
    const textoVendedora = vendedoraQueMasIngresosGenero();
    mejorVendedora.textContent = textoVendedora;
    document.getElementById("mejorVendedora").appendChild(mejorVendedora);

    var h5 = document.getElementsByTagName("h5");
    for (let i = 0; i < h5.length; i++) {
        h5[i].style.visibility = "visible";
    }


    btn.style.visibility = "hidden";
}

document.addEventListener('onclick', function () {
    renderDinamico();

}, btn);