using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasySchedule.Core.Models;

namespace EasySchedule.Core.DAL.Repositories
{
    internal class ProductRepository
    {
        private EasyScheduleDatabaseEntities _context;
        
        public ProductRepository(EasyScheduleDatabaseEntities context)
        {
            _context = context;
        }

        public IEnumerable<ProductModel> GetProducts()
        {
            return _context.Products.Select(p => p.ToModel());
        }
    }
}
