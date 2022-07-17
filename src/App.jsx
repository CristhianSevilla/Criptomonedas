import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCriptos from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 90%;

@media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
}
`

const Imagen = styled.img`
  max-width: 600px;
  width: 90%;
  margin: 100px auto 0 auto;
  display: block;

`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color:#FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 20px auto;
  }

`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    //Si existe una moneda y una criptomenda entonces
    if(Object.keys(monedas).length > 0) {

      //hacemos un arrow funcion async
      const cotizarCripto = async () => {
        //Spinner de cargando
        setCargando(true);
        setResultado({});
        //aplicamos destructuring al objeto de monedas
        const { moneda, criptomoneda } = monedas
        //Hacemos una url dinamica inyectando las variables del arreglo de monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        //Extraemos los datos 
        const respuesta = await fetch(url)
        //retornamos un resultado tipo json
        const resultado = await respuesta.json()
        //pasamos parametros a la url en forma de corchetes para hacer una consulta dinámica 
        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      }

      cotizarCripto()
    }
  }, [monedas])

  return (

    <Contenedor>

      <Imagen
        src={ImagenCriptos}
        alt="imagenes criptomonedas"
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && 
          <Spinner/>
        }

        {resultado.PRICE &&
          <Resultado
            resultado={resultado}
          />
        }
      </div>

    </Contenedor>
  )
}

export default App
