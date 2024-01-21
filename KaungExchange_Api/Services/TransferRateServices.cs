using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class TransferRateServices
    {
        private EFDBContext _dbContext;

        public TransferRateServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> SetupTransferRate(TransferRateModel model)
        {
            try
            {
                #region DataMapping
                TransferRateEntities entities = new TransferRateEntities();
                entities.Wallet = model.Wallet;
                entities.CashIn_Percentage = model.CashIn_Percentage;
                entities.CashOut_Percentage = model.CashOut_Percentage;
                #endregion
                await _dbContext.TransferRate.AddAsync(entities);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateTransferRate(TransferRateModel model)
        {
            try
            {
                
                TransferRateEntities entities = new TransferRateEntities();
                entities = await _dbContext.TransferRate.AsNoTracking().Where(x => x.Id == model.Id).FirstOrDefaultAsync();
                if (entities != null)
                {
                    #region DataMapping
                    entities.Wallet = model.Wallet;
                    entities.CashIn_Percentage = model.CashIn_Percentage;
                    entities.CashOut_Percentage = model.CashOut_Percentage;
                    #endregion
                    _dbContext.TransferRate.Update(entities);
                }
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
