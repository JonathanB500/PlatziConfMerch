import React, {useContext} from 'react'
import {PayPalButton} from 'react-paypal-button'
import AppContext from '../context/AppContext'
import handleSumTotal from '../utilities/handleSumTotal'
import '../styles/components/Payment.css'

const Payment = ({history}) => {
    const {state, addNewOrder} = useContext(AppContext)
    const {cart, buyer} = state
    const paypalOptions = {
        clientId: 'Aer_EcerYFAU1CcyjHIdPI0i04e7Pj7qjaVfrhiLldNvyc9luhMW7m-TCB-jrGPoKxbpiU1q3ixBzbVp',
        intent: 'capture',
        currency: 'USD'
    }
    const buttonStyles ={
        layout: 'vertical',
        shpe: 'rect'
    }

    const handlePaymentSuccess = data => {
        if(data.status === 'COMPLETED'){
            const newOrder = { 
                buyer,
                product: cart,
                payment: data
            }
            addNewOrder(newOrder)
            history.push('/Checkout/success')
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map(item => (
                    <div className="Payment-item" key={item.title}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>${' '}{item.price}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal(cart)}
                        onPaymentStart={() => console.log('Payment started')}
                        onPaymentSuccess={data => handlePaymentSuccess(data)}
                        onPaymentError={err => console.log(err)}
                        onPaymentCancel={data => console.log(data)}
                    />
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default Payment
