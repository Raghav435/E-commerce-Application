import {connect} from 'react-redux'
import EntityPages from '../pages/EntityPages'
import ListingPages from '../pages/ListingPages'
import { addToCart } from '../store/Cart/Cart.action'

const mapStateToProps=state=>({
    // data:state.cardItems
})
const mapDispatchToProps=dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data))

})
export default connect(mapStateToProps,mapDispatchToProps)(EntityPages)