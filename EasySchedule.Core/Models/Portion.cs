using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class PortionModel
    {
        public int  id { get; set; }
        public ProductModel product { get; set; }
        public double value { get; set; }
        public double amount { get; set; }
        public double breadUnits { get; set; }
    }
}
