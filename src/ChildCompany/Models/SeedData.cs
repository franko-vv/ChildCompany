using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCompany.Models
{
    public class SeedData
    {
        CompanyContext _context;

        public SeedData(CompanyContext context)
        {
            _context = context;
        }

        public void AddData()
        {
            if(!_context.Companies.Any())
            {
                //Add data
                Company first1 = new Company() { Parent_Id = 1, CompanyName = "1a", OwnMoney = 10 };
                Company first2 = new Company() { Parent_Id = 1, CompanyName = "1b", OwnMoney = 10 };
                Company first = new Company()
                {
                    Parent_Id = 2,
                    CompanyName = "4241",
                    OwnMoney = 10,
                    ChildCompanies = new List<Company>() { first1, first2 }
                };

                Company second1 = new Company() { Parent_Id = 2, CompanyName = "2a", OwnMoney = 10 };
                Company second2 = new Company() { Parent_Id = 2, CompanyName = "2b", OwnMoney = 10 };
                Company second = new Company()
                {
                    Parent_Id = 3,
                    CompanyName = "3",
                    OwnMoney = 10,
                    ChildCompanies = new List<Company>() { second1, second2 }
                };

                _context.AddRange(first1, first2, first, second1, second2, second);
                _context.SaveChanges();
            }
        }
    }
}