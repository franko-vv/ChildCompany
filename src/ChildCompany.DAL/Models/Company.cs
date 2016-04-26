using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCompany.DAL.Models
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int OwnMoney { get; set; }
        public int ChildMoney { get; set; }

        //public Company Parent { get; set; }
        public int? ParentId { get; set; }

        //public List<Company> ChildCompanies { get; set; }
    }
}
