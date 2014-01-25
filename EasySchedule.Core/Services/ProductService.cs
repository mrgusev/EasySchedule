using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using EasySchedule.Core.DAL;
using EasySchedule.Core.Models;

namespace EasySchedule.Core.Services
{
    public class ProductService
    {
        public IEnumerable<ProductModel> GetProducts(int page, int pageSize = 20)
        {
            using (var context= new EasyScheduleDatabaseEntities())
            {
                context.Categories.Load();
                context.Units.Load();
                return context.Products.OrderBy(p=>p.Name).Skip(pageSize * (page - 1)).Take(pageSize).ToList().Select(p => p.ToModel());
            }
        }

        public ProductModel GetProduct(int id)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                return context.Products.SingleOrDefault(p => p.Id == id).ToModel();
            }
        }

        public IEnumerable<ProductModel> SearchProduct(string query)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.Categories.Load();
                context.Units.Load();
                //var objectContext = (context as IObjectContextAdapter).ObjectContext;
                //objectContext
                //    .ExecuteStoreQuery<Product>("SELECT * FROM Products WHERE FREETEXT(Name, {0})", query);
                return context.Products.Where(p => p.Name.Contains(query))
                    .Take(20).ToList().Select(p => p.ToModel());
            }
        } 

        public int AddProduct(ProductModel productModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var newProduct = new Product
                {
                    Name = productModel.name,
                    CategoryId = productModel.category.id,
                    Carbohydrates = productModel.carbohydrates,
                    Fats = productModel.fats,
                    Proteins = productModel.proteins,
                    Calories = productModel.calories,
                    FullName = productModel.name + " [ " + productModel.category.name + " ]",
                    DefaultUnitId = productModel.defaultUnit.id,
                    Size = productModel.defaultSize
                };
                context.Products.Add(newProduct);
                context.SaveChanges();
                return newProduct.Id;
            }
        }
    }
}
