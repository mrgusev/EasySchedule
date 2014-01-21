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
        public IEnumerable<JournalItemModel> Get()
        {
            return new JournalItemModel[0];
        }

        // GET api/foodusages/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/foodusages
        public int Post(JournalItemModel model)
        {
            return (new ScheduleService()).AddFoodUsage(model);
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
