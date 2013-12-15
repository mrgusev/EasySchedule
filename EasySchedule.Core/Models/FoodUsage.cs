using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class FoodUsageModel
    {
        public int id { get; set; }
        public DateTime time { get; set; }
        public double breadUnits { get; set; }
        public IEnumerable<PortionModel> portions { get; set; }
    }
}
