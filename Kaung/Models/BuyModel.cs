namespace Kaung.Models
{
    public class BuyModel
    {
        public int BuyId { get; set; }
        public string CustomerName { get; set; }
        public int YwayQuantity { get; set; }
        public int LoneQuantity { get; set; }
        public int PaeQuantity { get; set; }
        public int SiQuantity { get; set; }
        public int BFLoneQuantity { get; set; }
        public int BFYwayQuantity { get; set; }
        public int BFSiQuantity { get; set; }
        public int LoneUnitPrice { get; set; }
        public int TotalAmount { get; set; }
        public string KyatAmount { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
