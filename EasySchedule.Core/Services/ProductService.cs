using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasySchedule.Core.DAL;
using EasySchedule.Core.Models;

namespace EasySchedule.Core.Services
{
    public class ProductService
    {
        public IEnumerable<ProductModel> GetProducts()
        {
            using (var context= new EasyScheduleDatabaseEntities())
            {
                context.MeasurmentTypes.Load();
                context.ProductTypes.Load();
                context.Categories.Load();
                return context.Products.ToList().Select(p => p.ToModel());
            }
        }
    }
}
