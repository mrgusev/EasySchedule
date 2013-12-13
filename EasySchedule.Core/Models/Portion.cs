using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class PortionModel
    {
        public int  Id { get; set; }
        public ProductModel ProductModel { get; set; }
        public double Value { get; set; }
        public double Amount { get; set; }
        public double BreadUnits { get; set; }
    }
}
