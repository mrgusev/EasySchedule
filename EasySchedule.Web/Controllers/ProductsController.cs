using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasySchedule.Core.Models;
using EasySchedule.Core.Services;

namespace EasySchedule.Web.Controllers
{
    public class ProductsController : ApiController
    {
        // GET api/products
        public IEnumerable<ProductModel> Get(int? page = 1)
        {
            return (new ProductService()).GetProducts(page.Value);
        }

        // GET api/products?search=...
        public IEnumerable<ProductModel> Get(string search)
        {
            return (new ProductService()).SearchProduct(search);
        }

        // GET api/products/5
        public ProductModel Get(int id)
        {
            return (new ProductService()).GetProduct(id);
        }

        // POST api/products
        public void Post([FromBody]string value)
        {
        }

        // PUT api/products/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/products/5
        public void Delete(int id)
        {
        }
    }
}
