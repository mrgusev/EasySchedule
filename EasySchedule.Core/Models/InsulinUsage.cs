using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class InsulinUsageModel
    {
        public int id { get; set; }
        public DateTime time { get; set; }
        public InsulinTypeModel insulinType { get; set; }
        public double value { get; set; }
    }
}
