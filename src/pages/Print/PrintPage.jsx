import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Logo from '../../assets/logo.png';
const PrintPage = ({history}) => {
  const [customerName, setCustomerName] = useState("");
  const [bfQuantity, setBfQuantity] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  useEffect(() => {
    // Fetch values from sessionStorage
    setCustomerName(sessionStorage.getItem("customerName"));
    setBfQuantity(sessionStorage.getItem("bfQuantity"));
    setQuantity(sessionStorage.getItem("quantity"));
    setUnitPrice(sessionStorage.getItem("unitPrice"));
    setTotalAmount(sessionStorage.getItem("totalAmount"));

    // Add event listener for after print
    window.print();
  }, []);

  const todayDate = dayjs().format("YYYY-MM-DD");

  return (
    <div style={{ textAlign: "left" }}>
      <img
        src={Logo}
        alt="Company Logo"
        style={{ width: "100px", height: "auto" }}
      />
      <h2>ဟန်စည်-ရွှေသန့်စင်လုပ်ငန်း</h2>
      <p>လိပ်စာ: စည်ပင်သာယာဈေးမြောက်ဘက် ၊ ကျောက်မြောင်းမြို့။</p>
      <p>ဖုန်း 09-422229119 , 09-400950557 , 09-970395973</p>
      <p>နေ့စွဲ: {todayDate}</p>
      <p>အမည်: {customerName}</p>
      <p>မီးမစစ်ခင်ရွှေချိန်- {bfQuantity}</p>
      <p>မီးစစ်ပြီ:ရွှေချိန်- {quantity}</p>
      <p>ဈေးနူန်း: {unitPrice}</p>
      <p>ကျသင့်ငွေ: {totalAmount}</p>
    </div>
  );
};

export default PrintPage;
