import React from 'react'
import { connect } from 'react-redux'
import {fetch_products, add_to_cart, remove_from_cart, changeMode, changePage} from '../redux/ProductsAction'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles({
    root: {
        maxWidth: 268,
        float: 'left',
        margin: '10px',
    },
    media: {
        height: 140,
        backgroundSize: 'contain'
    },
    container: {
        textAlign: 'center'
    }
});

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch: dispatch,
        fetch_products: dispatch(fetch_products()),
    }
}

function Products(props) {
    const classes = useStyles();

    let addToCart = (objectID) => {
        props.dispatch(add_to_cart(objectID))
    }

    let removeFromCart = (objectID) => {
        props.dispatch(remove_from_cart(objectID, false, true))
    } 

    let viewCart = function() {
        props.dispatch(changeMode(true));
    }

    let handleChange = function(event, value) {
        props.dispatch(changePage(value, props.state.searchText));
        props.dispatch(fetch_products());
    }

    return (
        <Container className={classes.container}>
        {(props.state.loading) 
            ? <center><CircularProgress /> </center>
            : ((props.state.products && props.state.products.length > 0) ?
                <React.Fragment>
                    <div >
                        <Pagination count={10} color="primary" page={props.state.page} onChange={handleChange}/>
                    </div>

                    {props.state.products.map((item,index)=>{
                        return (
                            <Card key={index} className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={item.image}
                                        title={item.name}
                                        
                                    />
                                    <CardContent>
                                    <Typography title={item.description} className="truncate" variant="button" display="block">
                                        {item.name}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    {(item.in_cart) ?  
                                        <React.Fragment>
                                            <Button size="small" color="primary">
                                                <Link onClick={viewCart} style={{color: '#3f51b5'}}to="/cart">View Cart</Link>
                                            </Button>
                                            <Button onClick={()=> removeFromCart(item.objectID)} title="Remove From Cart" size="small" color="primary">
                                                Remove
                                            </Button>
                                        </React.Fragment>
                                    :
                                        <Button onClick={()=> addToCart(item.objectID)} size="small" color="primary">
                                            Add to Cart
                                        </Button>
                                    }
                                    <Typography style={{marginLeft: 'auto'}} variant="body2" color="textSecondary" component="p">
                                        Price : $ {item.price}
                                    </Typography>
                                </CardActions>
                            </Card>
                        )
                    })}

                </React.Fragment>
                : <Alert severity="error">No Products found in the API. Please try something else!</Alert>
            )
        }
        </Container>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
