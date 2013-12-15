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
    public class FoodUsagesController : ApiController
    {
        // GET api/foodusages
        public IEnumerable<FoodUsageModel> Get()
        {
            return (new ScheduleService()).GetFoodUsages();
        }

        // GET api/foodusages/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/foodusages
        public void Post([FromBody]string value)
        {
        }

        // PUT api/foodusages/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/foodusages/5
        public void Delete(int id)
        {
        }
    }
}
