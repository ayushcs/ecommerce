import React from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import swal from 'sweetalert';

function Bill(props) {
    let tax = 0;
    if ((props.state.cart.length > 0)) {
        props.state.cart.map((item) => {
            tax += Number((item.quantity * (Number(item.price) + Number(item.price) * (2/100))));
        });
        tax = tax.toFixed(2);
    }

    let checkout = function() {
        swal({
            title: "Do you want to checkout?",
            text: 'This is the demo page for the checkout, it will reset all the state!',
            icon: "warning",
            buttons: ["No", "Yes"],
        }).then(willDelete => {
            if (willDelete) {
                window.location.href = window.location.origin;
            }
        });
    }
    return (
        <React.Fragment>
            {(props.state.cart.length > 0) ?
                <React.Fragment>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Tax</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.state.cart.map((item,index) => {
                                    let tax = (item.quantity * (Number(item.price) + Number(item.price) * (2/100))).toFixed(2);

                                    return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell align="right">${item.price}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">2%</TableCell>
                                        <TableCell align="right">${tax}</TableCell>
                                    </TableRow>
                                    )
                                })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                <TableRow >
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right">$ {tax}</TableCell>
                                </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={checkout} style={{width: '100%'}} variant="contained" color="secondary">
                        Checkout
                    </Button>
                </React.Fragment>
                
            : null}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(Bill)
