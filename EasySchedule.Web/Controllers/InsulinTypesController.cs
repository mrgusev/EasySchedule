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
    public class InsulinTypesController : ApiController
    {
        // GET api/insulintypes
        public IEnumerable<InsulinTypeModel> Get()
        {
            return (new ScheduleService()).GeInsulinTypes();
        }

        // GET api/insulintypes/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/insulintypes
        public void Post([FromBody]string value)
        {
        }

        // PUT api/insulintypes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/insulintypes/5
        public void Delete(int id)
        {
        }
    }
}
