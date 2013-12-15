﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasySchedule.Core.Models;
using EasySchedule.Core.Services;

namespace EasySchedule.Web.Controllers
{
    public class InsulinUsagesController : ApiController
    {
        // GET api/insulinusages
        public IEnumerable<InsulinUsageModel> Get()
        {
            return (new ScheduleService()).GetInsulinUsages();
        }

        // GET api/insulinusages/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/insulinusages
        public void Post([FromBody]string value)
        {
        }

        // PUT api/insulinusages/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/insulinusages/5
        public void Delete(int id)
        {
        }
    }
}
