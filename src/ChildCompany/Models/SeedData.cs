using ChildCompany.DAL.EntityFramework;
using ChildCompany.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCompany.Models
{
    public class SeedData
    {
        EFCompanyContext _context;

        public SeedData(EFCompanyContext context)
        {
            _context = context;
        }

        public void AddData()
        {
            if(!_context.Companies.Any())
            {
                // Add First element
                Company first2 = new Company() { ParentId = null, Name = "Main", OwnMoney = 100 };
                _context.Add(first2);
                _context.SaveChanges();

                // Add Second element
                var inDb = _context.Companies.Where(c => c.ParentId == null).FirstOrDefault();
                Company seconda = new Company() { ParentId = inDb.Id, Name = "thirdD", OwnMoney = 100 };
                _context.Add(seconda);                
                //inDb.ChildCompanies.Add(seconda);
                _context.SaveChanges();

                // Add Third element
                Company secondb = new Company() { ParentId = inDb.Id, Name = "thirdB", OwnMoney = 100 };
                _context.Add(secondb);
                //inDb.ChildCompanies.Add(secondb);
                _context.SaveChanges();

                //Company first1 = new Company()
                //{
                //    ParentId = 4,
                //    Name = "second",
                //    OwnMoney = 1000,
                //    ChildCompanies = new List<Company>() { first2, seconda }
                //};
                //_context.Add(first1);
                //Company first = new Company()
                //{
                //    ParentId = 0,
                //    Name = "Main",
                //    OwnMoney = 10000,
                //    ChildCompanies = new List<Company>() { first1 }
                //};
                //_context.Add(first);


            }
        }
    }
}