﻿using System;
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
                            name = Name
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

    public partial class Sugar
    {
        public SugarModel ToModel()
        {
            return new SugarModel
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
