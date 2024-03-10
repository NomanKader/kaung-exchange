﻿using KaungExchange_Api.Models;
using KaungExchange_Api.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KaungExchange_Api.Services
{
    public class SaleServices
    {
        private EFDBContext _dbContext;

        public SaleServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> AddSale(SalesModel model)
        {
            try
            {
                if (model.SaleType == "Credit")
                {
                    var calculateSaleAmount = UpdateAmount(model.Amount, model.AccountNo, model.WalletType, model.ReceivedType,
                    model.SaleType);
                    if (calculateSaleAmount == -2)
                    {
                        return -2; // account does not exist
                    }
                    if (calculateSaleAmount == -1)
                    {
                        return -1; // insufficient balance
                    }
                }
                #region DataMapping
                SalesEntities entities = new SalesEntities();
                entities.AccountNo = model.AccountNo;
                entities.WalletType = model.WalletType;
                entities.ReceivedType = model.ReceivedType;
                entities.SaleType = model.SaleType;
                entities.Staff = model.Staff;
                entities.Amount = model.Amount;
                entities.CreatedDate = DateTime.Now.Date;
                entities.Status = model.SaleType == "Credit" ? "Done" : "PaymentRequired";
                #endregion
                await _dbContext.Sales.AddAsync(entities);
                return await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SaleHistoryResponseModel>> SaleHistory()
        {
            try
            {
                return (from s in _dbContext.Sales
                        join u in _dbContext.User on s.Staff equals u.Id
                        select new SaleHistoryResponseModel()
                        {
                            Id = s.Id,
                            AccountNo = s.AccountNo,
                            WalletType = s.WalletType,
                            ReceivedType = s.ReceivedType,
                            SaleType = s.SaleType,
                            StaffName = u.UserName,
                            Amount = s.Amount,
                            SaleCreatedDate = s.CreatedDate.ToString("yyyy-MM-dd hh:mm tt"),
                            Status = s.Status,
                            PaymentCompleteDate = s.UpdatedDate.ToString("yyyy-MM-dd hh:mm tt"),
                        }).OrderByDescending(x=>x.Id).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAmount(decimal saleAmount, string accountNo, string walletType,
            string receivedType, string saleType)
        {
            try
            {
                AccountEntities account = new AccountEntities();
                decimal finalAmount = 0.0000m;

                account = _dbContext.Account.Where(x => x.AccountNo == accountNo && x.WalletType == walletType)
                    .FirstOrDefault();
                if (account == null)
                {
                    return -2;
                }
                if (receivedType == "CashIn")
                {
                    if (account.InitialAmount >= saleAmount)
                    {
                        finalAmount = account.InitialAmount - saleAmount;   //minus sale amount from initial amount
                        account.Id = account.Id;
                        account.Staff = account.Staff;
                        account.AccountNo = account.AccountNo;
                        account.WalletType = walletType;
                        account.AccountUserName = account.AccountUserName;
                        account.InitialAmount = finalAmount;
                        account.CreatedDate = account.CreatedDate;

                        _dbContext.Account.Update(account);
                        return _dbContext.SaveChanges();
                    }
                    else
                    {
                        return -1;  //return -1 if initial amount is insufficient to make sale
                    }
                }
                else
                {
                    finalAmount = account.InitialAmount + saleAmount;   //plus sale amount to initial amount
                    account.Id = account.Id;
                    account.Staff = account.Staff;
                    account.AccountNo = account.AccountNo;
                    account.WalletType = walletType;
                    account.AccountUserName = account.AccountUserName;
                    account.InitialAmount = finalAmount;
                    account.CreatedDate = account.CreatedDate;

                    _dbContext.Account.Update(account);
                    return _dbContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}