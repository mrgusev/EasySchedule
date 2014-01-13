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
    public class JournalController : ApiController
    {
        // GET api/journal
        public IEnumerable<JournalItemModel> Get(int? page)
        {
            return (new ScheduleService()).GetJournal(page.HasValue ? page.Value : 1, 20);
        }

        // GET api/journal/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/journal
        public void Post([FromBody]string value)
        {
        }

        // PUT api/journal/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/journal/5
        public void Delete(int id)
        {
        }
    }
}
