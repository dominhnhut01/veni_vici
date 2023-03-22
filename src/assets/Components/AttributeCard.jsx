import './AttributeCard.css'

function AttributeCard(props) {
    return (
        <div className="attribute-card" onClick={props.onClick}>
            {props.content}
        </div>
    )
}

export default AttributeCard