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
    public class PortionsController : ApiController
    {
        // GET api/portions
        public IEnumerable<PortionModel> Get(int id)
        {
            return (new ScheduleService()).GetPortions(id);
        }

        // POST api/portions
        public void Post([FromBody]string value)
        {
        }

        // PUT api/portions/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/portions/5
        public void Delete(int id)
        {
        }
    }
}
