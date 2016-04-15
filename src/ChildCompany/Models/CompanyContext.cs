using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace ChildCompany.Models
{
    public class CompanyContext : DbContext
    {
        public CompanyContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Company> Companies { get; set; }
    }
}
