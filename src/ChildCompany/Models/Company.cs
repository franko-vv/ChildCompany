using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCompany.Models
{
    public class Company
    {
        public int Id { get; set; }
        public int Parent_Id { get; set; }
        public string CompanyName { get; set; }
        public int OwnMoney { get; set; }
        public int ChildMoney { get; set; }

        public List<Company> ChildCompanies { get; set; }
    }
}
