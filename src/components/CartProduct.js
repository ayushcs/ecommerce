import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { remove_from_cart } from '../redux/ProductsAction'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 356,
    margin: 5,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    backgroundSize: 'contain'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paperroot: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const mapStateToProps = (state) => {
  return {
      state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: dispatch,
  }
}

function CartProduct(props) {
    const classes = useStyles();
    let changeQuantity = function(objectID, add) {
        props.dispatch(remove_from_cart(objectID, add))
    }
    return (
      <React.Fragment>
      {(props.state.cart.length > 0) ?
          props.state.cart.map((item,index) => {
            return (
                <Card key={index} style={{float:'left'}} className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={item.image}
                        title={item.name}
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography style={{maxHeight: '40px'}} variant="body2">
                                {item.name}
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                            <Typography variant="caption" display="block">
                                Price : $ {item.price}
                            </Typography>
                            <Typography style={{ marginLeft: 'auto',paddingRight: '0px'}} variant="caption" display="block">
                                Quantity :
                                <div className="quantity_button">
                                    <input type="button" onClick={()=>changeQuantity(item.objectID, false)} value="-" className="button-minus" />
                                    <input type="number" readOnly step="1" max="" min="1" value={item.quantity} name="quantity" className="quantity-field" />
                                    <input type="button" onClick={()=>changeQuantity(item.objectID, true)} value="+" className="button-plus" />
                                </div>
                            </Typography>
                        </div>
                    </div>
                </Card>
            )
          })
      : (<div className={classes.paperroot}>
        <Paper className={classes.paper}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item xs>
              <Typography>There is no item added in the cart</Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>)
      }
      </React.Fragment>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)
