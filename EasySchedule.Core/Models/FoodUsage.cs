using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class FoodUsageModel
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public double BreadUnits { get; set; }
        public IEnumerable<PortionModel> Portions { get; set; }
    }
}
