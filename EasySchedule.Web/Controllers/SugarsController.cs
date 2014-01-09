using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasySchedule.Core.Services;
using EasySchedule.Core.Models;

namespace EasySchedule.Web.Controllers
{
    public class SugarsController : ApiController
    {
        // GET api/sugars
        public IEnumerable<SugarModel> Get()
        {
            return (new ScheduleService()).GetSugars();
        }

        // GET api/sugars/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/sugars
        public int Post(SugarModel value)
        {
            return (new ScheduleService()).AddSugar(value);
        }

        // PUT api/sugars/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/sugars/5
        public void Delete(int id)
        {
        }
    }
}
