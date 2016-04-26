using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using ChildCompany.DAL.Models;
using Microsoft.Data.Entity.Storage;
using Microsoft.Data.Entity.Metadata;

namespace ChildCompany.DAL.EntityFramework
{
    public class EFCompanyContext : DbContext
    {
        public EFCompanyContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Company> Companies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            string connectionString = "Server=.\\SQLEXPRESS;Database=ChildCompanyDb;Trusted_Connection=True;MultipleActiveResultSets=true";
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Company Table settings
            //builder.Entity<Company>().HasOne(c => c.Parent);
                                     //.WithMany(c => c.ChildCompanies)
                                     //.OnDelete(DeleteBehavior.Cascade);

        }
    }
}
