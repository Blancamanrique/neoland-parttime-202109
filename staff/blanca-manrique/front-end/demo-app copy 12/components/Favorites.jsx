const { useState, useEffect } = React

function Favorites({ onReturnClick, onItemClick }) {
    const [vehicles, setVehicles] = useState(null)

    useEffect(() => {
        logger.debug(' Favorites -> did mount')
        try {
            retrieveFavVehicles(sessionStorage.token, (error, vehicles) => {
                if (error) return alert(error.message)

                setVehicles(vehicles)

            })
        } catch (error) {
            return alert(error.message)
        }
    }, [])

    const goBack = () => {
        onReturnClick()
    }

    const toggle = id => {
        try {
            toggleFavVehicle(id, sessionStorage.token, error => {
                if (error) return alert(error.message)

                const _vehicles = vehicles.filter(_vehicle => _vehicle.id !== id)

                setVehicles(_vehicles)
            
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const goToItem = id => {
        onItemClick(id)
    }

    logger.debug('Favorites -> render')

    if (vehicles) {
        if (vehicles.length)
            return <div>
                <button onClick={goBack}>Return to results</button>

                <ul>
                    {vehicles.map(vehicle => <li key={vehicle.id}>
                        <h2>{vehicle.name}</h2>
                        <Fav selected={vehicle.isFav} onClick={() => toggle(vehicle.id)} />
                        <img src={vehicle.image} onClick={() => goToItem(vehicle.id)} />
                        <span>{vehicle.price} $</span>
                    </li>)}
                </ul>

            </div>
        else
            return <p>You do not currently have any favorite vehicle</p>
    } else
        return null
}

