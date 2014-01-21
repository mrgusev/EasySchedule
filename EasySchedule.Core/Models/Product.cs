using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class ProductModel
    {
        public int id { get; set; }
        public string name { get; set; }
        public CategoryModel category { get; set; }
        public double carbohydrates { get; set; }
        public double proteins { get; set; }
        public double fats { get; set; }
        public double calories { get; set; }
        public double defaultSize { get; set; }
        public UnitModel defaultUnit { get; set; }
    }
}
