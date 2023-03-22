import { useState } from 'react'
import './App.css'
import DashBoard from './assets/Components/Dashboard'
import AttributeCard from './assets/Components/AttributeCard';

function App() {
  const [ banAttribute, setBanAttribute ] = useState({
    'origin': new Set(),
    'characteristics': new Set(),
    'life_span': new Set(),
  });

  function addBanAttribute(newAttribute, newAttributeContent) {
    const newAttributeSet = new Set(banAttribute[newAttribute]);
    newAttributeSet.add(newAttributeContent)
    setBanAttribute(prevAttributeBan => ({
      ...prevAttributeBan,
      [newAttribute] : newAttributeSet
    }))
  }

    function removeAttribute(attribute, attributeContent) {
    const newAttributeSet = new Set(banAttribute[attribute]);
    newAttributeSet.delete(attributeContent)
    setBanAttribute(prevAttributeBan => ({
      ...prevAttributeBan,
      [attribute] : newAttributeSet,
    }))
  }
  return (
    <div className="App">
      <div className="row">
        <div className="col-9">
          <DashBoard updateBanAttribute={addBanAttribute} banAttribute={banAttribute}/>
        </div>
        <div className="col-3">
          <h3>Ban List</h3>
          <h5>Select on attributes in your listing to ban in</h5>
          <h5>Select the attribute here to remove from banning list</h5>
          <div className="d-flex flex-column justify-content-center">
					{ Object.keys(banAttribute).map((attribute) => {
            return [...banAttribute[attribute]].map((attribute_content) => (
              <div key={attribute_content}>
						<AttributeCard content={attribute_content} onClick={()=>{removeAttribute(attribute, attribute_content)}}/>
            </div>
					))})}
				</div>
        </div>
      </div>
    </div>
  )
}

export default App
