import { Grid } from '@material-ui/core'
import React from 'react'
import Bill from './Bill'
import CartProduct from './CartProduct'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    fleft: {
        float: 'left'
    },
    mtop: {
        marginTop: '10px',
    },
});

function Carts() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid container>
                <Grid className={classes.mtop} item xs={12}>
                    <Grid className={classes.fleft} item md={7}>
                        <CartProduct />
                    </Grid>
                    <Grid className={'bill_parent'} item md={5}>
                        <Bill />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Carts
