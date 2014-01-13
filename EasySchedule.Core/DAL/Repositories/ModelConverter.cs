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
             Category c;
             return new CategoryModel
                        {
                            id = Id,
                            name = Name,
                            categoryTypeId = CategoryTypeId.Value
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
                category = Category.ToModel(),
                calories = Calories,
                carbohydrates = Carbohydrates,
                fats = Fats,
                proteins = Proteins,
                size = Size,
                measurementUnits = MeasurementUnit
            };

        }
    }

    public partial class JournalItem
    {
        public JournalItemModel ToModel()
        {
            var result = new JournalItemModel
            {
                id = Id,
                journalItemTypeId = JournalItemTypeId,
                time = Time,
                value = Value
            };
            if(JournalItemTypeId == (int)Enums.JournalItemTypes.InsulinUsage)
            {
                result.insulinType = InsulinType.ToModel();
            }
            if (JournalItemTypeId == (int)Enums.JournalItemTypes.FoodUsage)
            {
                result.foodUsageType = FoodUsageType.ToModel();
            }
            return result;
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
    public partial class FoodUsageType
    {
        public FoodUsageTypeModel ToModel()
        {
            return new FoodUsageTypeModel
            {
                id = Id,
                name = Name
            };

        }
    }

}
