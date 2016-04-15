﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ChildCompany.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ChildCompany.Controllers.api
{
    [Route("api/companyinfo")]
    public class CompanyController : Controller
    {
        private CompanyContext _context;

        public CompanyController(CompanyContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var cc = _context.Companies.SelectMany(c => c.ChildCompanies);

            return Json(cc);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
