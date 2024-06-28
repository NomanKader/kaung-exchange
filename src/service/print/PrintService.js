import dayjs from "dayjs";

const _handleVoucherService = (customerName,bfQuantity,quantity, unitPrice, totalAmount) => {
  const todayDate = dayjs().format("YYYY-MM-DD");
  const printContent = `
    <div style="text-align: left;">
      <img src="https://i.ibb.co/tbJbPM5/viber-image-2024-06-15-05-54-18-471.jpg" alt="Company Logo" style="width: 100px; height: auto;"/>
      <h2>ဟန်စည်-ရွှေသန့်စင်လုပ်ငန်း</h2>
      <p>လိပ်စာ: စည်ပင်သာယာဈေးမြောက်ဘက် ၊ ကျောက်မြောင်းမြို့။</p>
      <p>ဖုန်း 09-422229119 , 09-400950557 , 09-970395973</p>
      <p>နေ့စွဲ: ${todayDate}</p>
      <p>အမည်: ${customerName}</p>
      <p>မီးမစစ်ခင် ${bfQuantity}</p>
      <p>မီးစစ်ပြီ: ${quantity}</p>
      <p>ဈေးနူန်း: ${unitPrice}</p>
      <p>ကျသင့်ငွေ: ${totalAmount}</p>      
    </div>
  `;

  const printWindow = window.open("", "PRINT", "height=400,width=600");
  printWindow.document.write("<html><head><title>Voucher</title>");
  printWindow.document.write("</head><body>");
  printWindow.document.write(printContent);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
};

export default _handleVoucherService;
