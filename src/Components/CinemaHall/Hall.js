import React, { useState } from "react";
import Seats from "./Seats";
import Cart from "./Cart";
import "./Seats.css";
import Modal from "./Modal";
import SuccessModal from "./SuccessModal"
import pic from './screenthisside2.png'

function Hall(props) {
  const hall = props.hall;
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalMssg,setModalMssg] = useState('')
  const [onCard, setOnCard] = useState([]);
  
  
  const onCreditCardSubmit = (e) => {
    e.preventDefault();
    const cardnum = document.getElementById('cardnum').value
    const cvv = document.getElementById('cvv').value

    if(cardnum.length<16 || cvv.length!=3){
      setModalMssg("Invalid Entry")
      setShowSuccess(true)
    }else{
        setShow(false);
        setOnCard(selectedSeat);
        setSelectedSeat([])
        setModalMssg("Payment Successful")
        setShowSuccess(true)

    }
  };


  return (
    <div>
      <div className="seat-container">
        {hall.seats.map((element) => {
          return (
            <Seats
              seat_info={element}
              key={element.seat_id}
              setSelectedSeat={setSelectedSeat}
              selectedSeat={selectedSeat}
              onCard={onCard}
            ></Seats>
          );
        })}
      </div>
      <div className="screen"><img src={pic}/></div>
      <div className="main-div">
        <Cart selectedSeat={selectedSeat}></Cart>
      </div>
      <button onClick={() => setShow(true)} className="checkout" >Checkout</button>
      <div>
        <Modal
          onCreditCardSubmit={onCreditCardSubmit}
          onClose={() => setShow(false)}
          show={show}
          selectedSeat={selectedSeat} 
        ></Modal>
        <SuccessModal onClose={() => setShowSuccess(false)} showSuccess={showSuccess} setModalMssg={setModalMssg} modalMssg={modalMssg} ></SuccessModal>
      </div>
    </div>
  );
}

export default Hall;