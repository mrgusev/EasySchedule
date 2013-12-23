﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Objects.DataClasses;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasySchedule.Core.Models;
using EasySchedule.Core.DAL;

namespace EasySchedule.Core.Services
{
    public class ScheduleService
    {
        public IEnumerable<ShugarModel> GetSugars()
        {
            return new EasyScheduleDatabaseEntities().Shugars.ToList().Select(s => s.ToModel());
        } 

        public IEnumerable<InsulinUsageModel> GetInsulinUsages()
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.InsulinTypes.Load();
                return context.InsulinUsages.ToList().Select(i => i.ToModel());
            }
        }
 
        public IEnumerable<InsulinTypeModel> GeInsulinTypes()
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                return context.InsulinTypes.ToList().Select(i => i.ToModel());
            }
        } 

        public IEnumerable<FoodUsageModel> GetFoodUsages()
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                return context.FoodUsages.ToList().Select(f => f.ToModel());
            }
        }

        public IEnumerable<PortionModel> GetPortions(int foodUsageId)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.MeasurmentTypes.Load();
                context.ProductTypes.Load();
                context.Categories.Load();
                return context.Portions.Include("Product").Where(p=>p.FoodUsageId == foodUsageId).ToList().Select(f => f.ToModel());
            }
        }

        public void AddSugar(ShugarModel shugarModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.Shugars.Add(new Shugar
                                        {
                                            Time = shugarModel.time,
                                            Value = shugarModel.value
                                        });
                context.SaveChanges();
            }
        }
        
        public void AddInsulinUsage(InsulinUsageModel insulinUsageModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.InsulinUsages.Add(new InsulinUsage
                                              {
                                                  InsulinTypeId = insulinUsageModel.insulinType.id,
                                                  Time = insulinUsageModel.time,
                                                  Value = insulinUsageModel.value
                                              });
                context.SaveChanges();
            }
        }

        public void AddFoodUsage(FoodUsageModel foodUsageModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var portions = foodUsageModel.portions.Select(portionModel => new Portion
                {
                    Amount = portionModel.amount, 
                    BreadUnits = portionModel.breadUnits, 
                    Value = portionModel.value, 
                    ProductId = portionModel.product.id
                }).ToList();

                context.FoodUsages.Add(new FoodUsage
                                           {
                                               BreadUnits = foodUsageModel.breadUnits,
                                               Time = foodUsageModel.time,
                                               Portions = portions
                                           });
                context.SaveChanges();
            }
        }
    }
}
