import Item from "./Item"

function ItemsList({ items }) {
    return (
        <ul className="grid grid-cols-2 md:grid-cols-3
            lg:grid-cols-5 sm:gap-6 gap-2">
            {items.map((item, index) => {
                return <Item key={index} item={item} />
            })}
        </ul>
    )
}

export default ItemsList
