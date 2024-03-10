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
                if (CheckWalletType(model.Wallet))
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
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckWalletType(string wallet)
        {
            try
            {
                var dataResult = _dbContext.TransferRate.Where(x => x.Wallet.ToUpper() == wallet.ToUpper()).FirstOrDefault();
                if (dataResult != null)
                {
                    return false;
                }
                return true;
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
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<TransferRateModel>> TransferRateList()
        {
            try
            {
                return await _dbContext.TransferRate.Select(x => new TransferRateModel()
                {
                    Id = x.Id,
                    Wallet = x.Wallet,
                    CashIn_Percentage = x.CashIn_Percentage,
                    CashOut_Percentage = x.CashOut_Percentage
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
