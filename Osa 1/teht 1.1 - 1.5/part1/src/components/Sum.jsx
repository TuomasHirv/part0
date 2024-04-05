
const Sum = ({course}) => {
    const lista = course.map(cours => cours.exercises)
    console.log("summa alku",lista)
    let summa = 0
    lista.forEach(el => {
        summa += el
    });
    return (
        <b> tehtäviä yhteensä: {summa} </b>
      )
}
export default Sum