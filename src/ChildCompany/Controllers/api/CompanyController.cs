using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using ChildCompany.Models;
using Microsoft.Data.Entity;
using System.Collections;
using System.Net;
using System.Data.SqlClient;
using ChildCompany.DAL.EntityFramework;
using ChildCompany.DAL.Models;

namespace ChildCompany.Controllers.api
{
    [Route("/companies")]
    public class CompanyController : Controller
    {
        private IUnitOfWork _repository;

        public CompanyController(IUnitOfWork repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var companies = _repository.Companies.GetAll();

            Response.StatusCode = (int)HttpStatusCode.Created;
            return Json(companies);
        }

        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            var companyById = _repository.Companies.Get(id);

            Response.StatusCode = (int)HttpStatusCode.Created;
            return Json(companyById);
        }
        
        [HttpPost]
        public JsonResult Post([FromBody]Company newCompany)
        {
            Response.StatusCode = (int)HttpStatusCode.Created;
            return Json(newCompany);
        }
        
        [HttpPut("{id}")]
        public JsonResult Put(int id, [FromBody]string value)
        {
            return Json(null);
        }
        
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            return Json(null);
        }
    }
}
