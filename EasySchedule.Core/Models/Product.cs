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
        public MeasurmentTypeModel measurmentType { get; set; }
        public ProductTypeModel productType { get; set; }
        public CategoryModel category { get; set; }
        public double amountPerOne { get; set; }
        public double valuePerOne { get; set; }
    }
}
