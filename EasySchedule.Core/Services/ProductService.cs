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
                context.Categories.Load();
                return context.Products.Take(100).ToList().Select(p => p.ToModel());
            }
        }

        public IEnumerable<ProductModel> SearchProduct(string query)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.Categories.Load();
                query = query.Trim();
                return context.Products.Where(p => p.Name.Contains(query) )
                    .Take(20).ToList().Select(p => p.ToModel());
            }
        } 
    }
}
