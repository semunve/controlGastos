export const formatearCantidad=(cantidad)=>{
    return Number(cantidad).toLocaleString('es-Es',{
        style:'currency',
        currency:'EUR',
    })
}