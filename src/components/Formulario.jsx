import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelectMonedas from "../hooks/useSelectMonedas"
import { monedas } from "../data/monedas"

const InputSubmit = styled.input`
background-color: #7b03aa;
border: none;
width: 100%;
padding: 1rem;
color: #fff;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: .5rem;
margin-top: 30px;
transition: background-color .3s ease;

&:hover{
    background-color: #490066;
    cursor: pointer;
}
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu criptomoneda', criptos);

    //Consultamos la API
    useEffect(() => {
        const consultarAPI = async () => {
            //enviamos la petición a la API
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            //await espera a que se descarguen todos los datos
            const respuesta = await fetch(url);
            //.json es la respuesta que se retorna
            const resultado = await respuesta.json();

            //constuimos el arra con la información necesaria de la API
            const arrayCryptos = resultado.Data.map(cripto => {
                // construimos el objeto con los datos necesarios
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto;
            })

            //llenamos el usstate de criptos
            setCriptos(arrayCryptos);

        }

        consultarAPI();
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        
        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)

        //llenamos el objeto cons las dos opciones del usuario
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
           <form
            onSubmit={handleSubmit}
        >

            <SelectMonedas />
            <SelectCriptomoneda />
            
            {error && <Error>Todos los campos son obligatorios</Error>}

            <InputSubmit
                type="submit"
                value="Cotizar"
            />
        </form>
        </>
     
    )
}

export default Formulario