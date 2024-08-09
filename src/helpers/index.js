export const formatearCantidad=(cantidad)=>{
    return Number(cantidad).toLocaleString('es-Es',{
        style:'currency',
        currency:'EUR',
    })
}

export const generaId=()=>{
    const fecha=Date.now().toString(36)
    const random=Math.random().toString(36).substring(2)
    return fecha+random;
}