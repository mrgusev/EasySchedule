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
                            id = Id,
                            name = Name
                        };

         }
    }

    public partial class MeasurmentType
    {
        public MeasurmentTypeModel ToModel()
        {
            return new MeasurmentTypeModel
            {
                id = Id,
                name = Name
            };

        }
    }

    public partial class ProductType
    {
        public ProductTypeModel ToModel()
        {
            return new ProductTypeModel
            {
                id = Id,
                name = Name,
                measurmentUnit = MeasurmentUnit
            };

        }
    }

    public partial class Product
    {
        public ProductModel ToModel()
        {
            return new ProductModel
            {
                id = Id,
                name = Name,
                amountPerOne = AmountPerOne,
                valuePerOne = ValuePerOne,
                productType = ProductType.ToModel(),
                measurmentType = MeasurmentType.ToModel(),
                category = Category.ToModel()
            };

        }
    }

    public partial class FoodUsage
    {
        public FoodUsageModel ToModel()
        {
            return new FoodUsageModel
            {
                id = Id,
                time = Time,
                breadUnits = BreadUnits
            };

        }
    }

    public partial class Portion
    {
        public PortionModel ToModel()
        {
            return new PortionModel
            {
                id = Id,
                breadUnits = BreadUnits,
                amount = Amount,
                value = Value,
                product = Product.ToModel()
            };

        }
    }

    public partial class Shugar
    {
        public ShugarModel ToModel()
        {
            return new ShugarModel
            {
                id = Id,
                time = Time,
                value = Value
            };

        }
    }

    public partial class InsulinType
    {
        public InsulinTypeModel ToModel()
        {
            return new InsulinTypeModel
            {
                id = Id,
                name = Name
            };

        }
    }

    public partial class InsulinUsage
    {
        public InsulinUsageModel ToModel()
        {
            return new InsulinUsageModel
            {
                id = Id,
                insulinType = InsulinType.ToModel(),
                time = Time,
                value = Value
            };

        }
    }

}
