using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class JournalItemModel
    {
        public int id { get; set; }
        public double value { get; set; }
        public DateTime time { get; set; }
        public int journalItemTypeId { get; set; }
        public InsulinTypeModel insulinType { get; set; }
        public FoodUsageTypeModel foodUsageType { get; set; }
        public IEnumerable<PortionModel> portions { get; set; }
    }
}
