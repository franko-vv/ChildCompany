using ChildCompany.DAL.Models;
using ChildCompany.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCompany.DAL.EntityFramework
{
    public interface IUnitOfWork
    {
        IRepository<Company> Companies { get; }

        void Save();
    }
}
