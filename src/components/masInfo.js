import React, { Component } from 'react'
import { connect } from "react-redux";
import {match} from 'react-router-dom';
import Item from './item'
import ItemInfo from './itemInfo'
class masInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            item: []
        }
    }

 





 
        render() {
            const { match: {params} } = this.props;
            const item = this.props.items.items.filter(item => item._id === params.id)
                return (
            <div>
            
              {  this.props.items.items ? ( item.map(item => (
              

                    <ItemInfo  imagen={item.imagen} 
                            nombre={item.nombre} 
                            categoria={item.categoria} 
                            precio={item.precio}
                            descripcion= {item.descripcion}
                            id = {item._id} 
                    />

              )) ) : null  }
           
                
            </div>
            
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      items: state.items,
      login: state.login,
      itemsCart: state.itemsCart,
      categories: state.categories,
    };
  };


  export default connect(mapStateToProps, {})(masInfo)
