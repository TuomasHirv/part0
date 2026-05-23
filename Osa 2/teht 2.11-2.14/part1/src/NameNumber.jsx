const NameNumber = ({person, handleDel}) => {
    return (
        <div>
            <li>{person.name} {person.number} <button type = "button" value = {person.id} onClick={handleDel}> Delete </button> </li> 
        </div>
    )
}

export default NameNumber