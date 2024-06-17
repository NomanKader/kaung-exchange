using Kaung.Entities;
using Kaung.Models;
using Microsoft.EntityFrameworkCore;

namespace Kaung.Services
{
    public class CustomerServices
    {
        private EFDBContext _dbContext;

        public CustomerServices(EFDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<int> CreateCustomer(CustomerModel model)
        {
            try
            {
                if (CheckCustomer(model.CustomerName))
                {
                    CustomerEntitie customerEntitie = new CustomerEntitie();
                    customerEntitie.CustomerName = model.CustomerName;
                    customerEntitie.CreatedDate = DateTime.Now.Date;
                    _dbContext.Customers.Add(customerEntitie);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckCustomer(string customerName)
        {
            try
            {
                var dataResult = _dbContext.Customers.Where(x => x.CustomerName == customerName).FirstOrDefaultAsync();
                return dataResult != null ? false : true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CustomerModel>> GetCustomerList()
        {
            try
            {
                List<CustomerModel> lstCustomer = new List<CustomerModel>();
                return await _dbContext.Customers.Select(x => new CustomerModel
                {
                    CustomerID = x.CustomerID,
                    CustomerName = x.CustomerName,
                    CreatedDate = x.CreatedDate
                }).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> DeleteCustomer(int customerId)
        {
            try
            {
                var entity = await _dbContext.Customers.FindAsync(customerId);

                if (entity != null)
                {
                    _dbContext.Customers.Remove(entity);
                    return await _dbContext.SaveChangesAsync();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> UpdateCustomer(CustomerModel model)
        {
            try
            {
                if (CheckCustomer(model.CustomerName))
                {
                    CustomerEntitie customerEntitie = new CustomerEntitie();
                    customerEntitie = await _dbContext.Customers.Where(x => x.CustomerID == model.CustomerID).FirstOrDefaultAsync();
                    if (customerEntitie != null)
                    {
                        customerEntitie.CustomerName = model.CustomerName;
                        _dbContext.Customers.Update(customerEntitie);
                        return await _dbContext.SaveChangesAsync();
                    }
                    return 0;
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
