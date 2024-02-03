using KaungExchange_Api.Models;
using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class WalletExchangeService
    {
        private EFDBContext _dbContext;

        public WalletExchangeService(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> ExchangeWallet(WalletExchangeModel model)
        {
            try
            {
                decimal currentAmount = CheckCurrentAmount(model.FromWallet, model.FromAccount);
                if (currentAmount >= model.ExchangeAmount)
                {
                    var updateAmount = await UpdateAmount(model.FromAccount, model.ToAccount, model.ExchangeAmount);
                    if (updateAmount > 0)
                    {
                        #region DataMapping
                        WalletExchangeEntities entities = new WalletExchangeEntities();
                        entities.FromWallet = model.FromWallet;
                        entities.ToWallet = model.ToWallet;
                        entities.FromAccount = model.FromAccount;
                        entities.ToAccount = model.ToAccount;
                        entities.ExchangeAmount = model.ExchangeAmount;
                        entities.Note = model.Note;
                        entities.ExchangeDate = DateTime.Now;
                        #endregion
                        await _dbContext.WalletExchange.AddAsync(entities);
                        return await _dbContext.SaveChangesAsync();
                    }
                    return 0;
                }
                return -1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<WalletExchangeModel>> WalletExchangeHistoryList(DateTime? fromDate, DateTime? toDate)
        {
            try
            {
                if (!string.IsNullOrEmpty(fromDate.ToString())
                    && !string.IsNullOrEmpty(toDate.ToString()))
                {
                    return await _dbContext.WalletExchange
                        .Where(x => x.ExchangeDate >= fromDate && x.ExchangeDate <= toDate)
                        .Select(x => new WalletExchangeModel()
                        {
                            Id = x.Id,
                            FromWallet = x.FromWallet,
                            ToWallet = x.ToWallet,
                            FromAccount = x.FromAccount,
                            ToAccount = x.ToAccount,
                            ExchangeAmount = x.ExchangeAmount,
                            Note = x.Note,
                            ExchangeDate = x.ExchangeDate.ToString("yyyy-MM-dd hh:mm tt")
                        }).OrderByDescending(x => x.Id).ToListAsync();
                }
                else
                {
                    return await _dbContext.WalletExchange.Select(x => new WalletExchangeModel()
                    {
                        Id = x.Id,
                        FromWallet = x.FromWallet,
                        ToWallet = x.ToWallet,
                        FromAccount = x.FromAccount,
                        ToAccount = x.ToAccount,
                        ExchangeAmount = x.ExchangeAmount,
                        Note = x.Note,
                        ExchangeDate = x.ExchangeDate.ToString("yyyy-MM-dd hh:mm tt")
                    }).OrderByDescending(x => x.Id).ToListAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateAmount(string fromAccount, string toAccount, decimal exchangeAmount)
        {
            try
            {
                decimal remainingFromAccountBalance = 0.00000m;
                decimal remainingToAccountBalance = 0.0000m;

                AccountEntities fromAccountEntities = new AccountEntities();
                AccountEntities toAccountEntities = new AccountEntities();

                var fromAccountInfo = await _dbContext.Account.AsNoTracking()
                    .Where(x => x.AccountNo == fromAccount).FirstOrDefaultAsync();

                var toAccountInfo = await _dbContext.Account.AsNoTracking()
                    .Where(y => y.AccountNo == toAccount).FirstOrDefaultAsync();

                remainingFromAccountBalance = fromAccountInfo.InitialAmount - exchangeAmount;
                remainingToAccountBalance = toAccountInfo.InitialAmount + exchangeAmount;

                #region UpdateFromAccount
                fromAccountEntities.Id = fromAccountInfo.Id;
                fromAccountEntities.Staff = fromAccountInfo.Staff;
                fromAccountEntities.AccountNo = fromAccountInfo.AccountNo;
                fromAccountEntities.WalletType = fromAccountInfo.WalletType;
                fromAccountEntities.AccountUserName = fromAccountInfo.AccountUserName;
                fromAccountEntities.InitialAmount = remainingFromAccountBalance;
                fromAccountEntities.CreatedDate = fromAccountInfo.CreatedDate;
                _dbContext.Account.Update(fromAccountEntities);
                _dbContext.SaveChanges();
                #endregion

                #region UpdateToAccount
                toAccountEntities.Id = toAccountInfo.Id;
                toAccountEntities.Staff = toAccountInfo.Staff;
                toAccountEntities.AccountNo = toAccountInfo.AccountNo;
                toAccountEntities.WalletType = toAccountInfo.WalletType;
                toAccountEntities.AccountUserName = toAccountInfo.AccountUserName;
                toAccountEntities.InitialAmount = remainingToAccountBalance;
                toAccountEntities.CreatedDate = toAccountInfo.CreatedDate;
                _dbContext.Account.Update(toAccountEntities);
                _dbContext.SaveChanges();
                #endregion

                return 1;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public decimal CheckCurrentAmount(string wallet, string fromAccountNo)
        {
            try
            {
                return _dbContext.Account.Where(x => x.WalletType == wallet && x.AccountNo == fromAccountNo)
                    .Select(x => x.InitialAmount).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
