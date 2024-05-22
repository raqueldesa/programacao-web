const dom = document
//area = π r²
//circ = 2 πr

const btnOK = dom.getElementById("btn-ok")
const area = dom.getElementById("area")
const circ = dom.getElementById("circ")
const raio = dom.getElementById("raio")

btnOK.onclick = function calcula(){
    if(raio.value){


        if(typeof raio.value == "number"){

            const resultArea = Math.pow(raio.value, 2) * Math.PI
            const resultCirc =  2 * raio.value * Math.PI
            
            area.value = resultArea.toFixed(2)
            circ.value = resultCirc.toFixed(2)
    
        } else {
            window.alert("Somente Numeros")
            raio.value = "  "
        }
    }else {
        window.alert("Informe um raio")
    }
}
