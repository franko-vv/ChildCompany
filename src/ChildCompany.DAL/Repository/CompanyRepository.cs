using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChildCompany.DAL.Models;
using ChildCompany.DAL.EntityFramework;
using Microsoft.Data.Entity;

namespace ChildCompany.DAL.Repository
{
    public class CompanyRepository : IRepository<Company>
    {
        private EFCompanyContext _context;

        public CompanyRepository(EFCompanyContext context)
        {
            _context = context;
        }

        public void Create(Company item)
        {
            _context.Companies.Add(item);
        }

        public void Delete(int id)
        {
            var companyToDel = _context.Companies.Where(c => c.Id == id).FirstOrDefault();
            _context.Remove(companyToDel);
        }

        public IEnumerable<Company> Find(Func<Company, bool> predicate)
        {
            throw new NotImplementedException();
        }

        public Company Get(int id)
        {
            return _context.Companies.Where(c => c.Id == id).FirstOrDefault();
        }

        public IEnumerable<Company> GetAll()
        {
            return _context.Companies;
        }

        public void Update(Company editCompany)
        {
            var currentCompany = _context.Companies.Where(c => c.Id == editCompany.Id).FirstOrDefault();
            currentCompany.Name = editCompany.Name;
            //currentCompany.ChildMoney = editCompany.ChildMoney;
            currentCompany.Name = editCompany.Name;
            currentCompany.OwnMoney = editCompany.OwnMoney;
            currentCompany.ParentId = editCompany.ParentId;
        }
    }
}
