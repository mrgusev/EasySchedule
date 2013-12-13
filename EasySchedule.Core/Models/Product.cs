using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasySchedule.Core.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MeasurmentTypeModel MeasurmentType { get; set; }
        public ProductTypeModel ProductType { get; set; }
        public CategoryModel Category { get; set; }
        public double AmountPerOne { get; set; }
        public double ValuePerOne { get; set; }
    }
}
