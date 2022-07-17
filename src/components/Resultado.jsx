import styled from "@emotion/styled"

const ContenedorResultado = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    
    gap: 1rem;
    margin-top: 30px;

`

const Texto = styled.p`
    font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 25px;
    span{
        font-weight: 700;
    }
`

const Imagen = styled.img`
    display: block;
    width: 150px;
`

const Resultado = ({ resultado }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado
    console.log(PRICE);
    return (
        <ContenedorResultado>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />
            <div>
                <Precio>Su precio es de: <span>{PRICE}</span></Precio>
                <Texto>Precio más alto del dia: <span>{HIGHDAY}</span></Texto>
                <Texto>Precio más bajo del dia: <span>{LOWDAY}</span></Texto>
                <Texto>Variación ultimas 24 hrs: <span>{CHANGEPCT24HOUR}</span></Texto>
                <Texto>Ultima actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
        </ContenedorResultado>
    )
}

export default Resultado