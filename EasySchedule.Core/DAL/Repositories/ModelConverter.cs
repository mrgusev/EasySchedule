using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasySchedule.Core.Models;

namespace EasySchedule.Core.DAL
{
    public partial class Category
    {
         public CategoryModel ToModel()
         {
             return new CategoryModel
                        {
                            Id = Id,
                            Name = Name
                        };

         }
    }

    public partial class MeasurmentType
    {
        public MeasurmentTypeModel ToModel()
        {
            return new MeasurmentTypeModel
            {
                Id = Id,
                Name = Name
            };

        }
    }

    public partial class ProductType
    {
        public ProductTypeModel ToModel()
        {
            return new ProductTypeModel
            {
                Id = Id,
                Name = Name,
                MeasurmentUnit = MeasurmentUnit
            };

        }
    }

    public partial class Product
    {
        public ProductModel ToModel()
        {
            return new ProductModel
            {
                Id = Id,
                Name = Name,
                AmountPerOne = AmountPerOne,
                ValuePerOne = ValuePerOne,
                ProductType = ProductType.ToModel(),
                MeasurmentType = MeasurmentType.ToModel(),
                Category = Category.ToModel()
            };

        }
    }

    public partial class FoodUsage
    {
        public FoodUsageModel ToModel()
        {
            return new FoodUsageModel
            {
                Id = Id,
                Time = Time,
                BreadUnits = BreadUnits,
                Portions = Portions.Select(p=>p.ToModel())
            };

        }
    }

    public partial class Portion
    {
        public PortionModel ToModel()
        {
            return new PortionModel
            {
                Id = Id,
                BreadUnits = BreadUnits,
                Amount = Amount,
                Value = Value,
                ProductModel = Product.ToModel()
            };

        }
    }

    public partial class Shugar
    {
        public ShugarModel ToModel()
        {
            return new ShugarModel
            {
                Id = Id,
                Time = Time,
                Value = Value
            };

        }
    }

    public partial class InsulinType
    {
        public InsulinTypeModel ToModel()
        {
            return new InsulinTypeModel
            {
                Id = Id,
                Name = Name
            };

        }
    }

    public partial class InsulinUsage
    {
        public InsulinUsageModel ToModel()
        {
            return new InsulinUsageModel
            {
                Id = Id,
                InsulinType = InsulinType.ToModel(),
                Time = Time,
                Value = Value
            };

        }
    }

}
