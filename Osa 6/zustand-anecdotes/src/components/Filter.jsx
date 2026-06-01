import { useAnecdoteActions } from '../store'

const Filter = () => {
    const { setFilter } = useAnecdoteActions()
    const handleFilter = (event) => {
        const newValue = event.target.value;
        setFilter(newValue)
    }


    return(
        <div>
            <h2>Filter</h2>
            <form onChange={handleFilter}>
                    <input type="text" id="filter"/>
            </form>
        </div>
    )
}

export default Filter;