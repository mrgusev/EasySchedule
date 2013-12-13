using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class InsulinUsageModel
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public InsulinTypeModel InsulinType { get; set; }
        public double Value { get; set; }
    }
}
