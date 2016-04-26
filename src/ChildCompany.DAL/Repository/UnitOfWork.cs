using ChildCompany.DAL.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChildCompany.DAL.Models;

namespace ChildCompany.DAL.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private EFCompanyContext _context;
        private CompanyRepository companyRepository;

        public UnitOfWork(EFCompanyContext context)
        {
            _context = context;
        }

        public IRepository<Company> Companies
        {
            get
            {
                if (companyRepository == null)
                    companyRepository = new CompanyRepository(_context);
                return companyRepository;
            }
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
