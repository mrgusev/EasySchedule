using System;
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
        public IEnumerable<SugarModel> GetSugars()
        {
            return new EasyScheduleDatabaseEntities().Sugars.ToList().Select(s => s.ToModel());
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
                context.Categories.Load();
                return context.Portions.Include("Product").Where(p=>p.FoodUsageId == foodUsageId).ToList().Select(f => f.ToModel());
            }
        }

        public int AddSugar(SugarModel shugarModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var newSugar = new Sugar
                {
                    Time = shugarModel.time,
                    Value = shugarModel.value
                };
                context.Sugars.Add(newSugar);
                context.SaveChanges();
                return newSugar.Id;
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

        public void DeleteSugar(int id)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var deleteSugar = new Sugar {Id = id};
                context.Sugars.Attach(deleteSugar);
                context.Sugars.Remove(deleteSugar);
                context.SaveChanges();
            }
        }

        public void DeleteInsulinUsage(int id)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var deleteInsulinusage = new InsulinUsage { Id = id };
                context.InsulinUsages.Attach(deleteInsulinusage);
                context.InsulinUsages.Remove(deleteInsulinusage);
                context.SaveChanges();
            }
        }

        public void UpdateSugar(int id, SugarModel model)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var editedSugar = new Sugar {Id = id};
                context.Sugars.Attach(editedSugar);
                editedSugar.Value = model.value;
                editedSugar.Time = model.time;
                context.SaveChanges();
            }
        }

        public void UpdateInsulinusage(int id, InsulinUsageModel model)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var editedIsulinUsage = new InsulinUsage { Id = id };
                context.InsulinUsages.Attach(editedIsulinUsage);
                editedIsulinUsage.Time = model.time;
                editedIsulinUsage.Value = model.value;
                editedIsulinUsage.InsulinTypeId = model.insulinType.id;
                context.SaveChanges();
            }
        }
    }
}
