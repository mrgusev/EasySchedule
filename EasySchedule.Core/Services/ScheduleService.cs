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
        public IEnumerable<InsulinTypeModel> GeInsulinTypes()
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                return context.InsulinTypes.ToList().Select(i => i.ToModel());
            }
        } 


        public IEnumerable<PortionModel> GetPortions(int foodUsageId)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                context.Categories.Load();
                return context.Portions.Include("Product").Where(p=>p.JournalItemId == foodUsageId).ToList().Select(f => f.ToModel());
            }
        }

        public IEnumerable<JournalItemModel> GetJournal(int page, int pageSize)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                if(page < 1)
                {
                    page = 1;
                }
                context.InsulinTypes.Load();
                context.FoodUsageTypes.Load();
                IEnumerable<JournalItemModel> res = context.JournalItems.OrderByDescending(i => i.Time).Skip(pageSize * (page - 1))
                .Take(pageSize).ToList().Select(i => i.ToModel());
                return res;
            }
        }

        public int AddSugar(JournalItemModel shugarModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var newSugar = new JournalItem
                {
                    JournalItemTypeId = (int)Enums.JournalItemTypes.Sugar,
                    Time = shugarModel.time,
                    Value = shugarModel.value
                };
                context.JournalItems.Add(newSugar);
                context.SaveChanges();
                return newSugar.Id;
            }
        }

        public int AddInsulinUsage(JournalItemModel insulinUsageModel)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var newInsulin = new JournalItem
                {
                    JournalItemTypeId = (int) Enums.JournalItemTypes.InsulinUsage,
                    InsulinTypeId = insulinUsageModel.insulinType.id,
                    Time = insulinUsageModel.time,
                    Value = insulinUsageModel.value
                };
                context.JournalItems.Add(newInsulin);
                context.SaveChanges();
                return newInsulin.Id;
            }
        }

        public int AddFoodUsage(JournalItemModel foodUsageModel)
        {
            var portions = foodUsageModel.portions.Select(portionModel => new Portion
            {
                Size = portionModel.size,
                UnitId = portionModel.unit.id,
                BreadUnits = portionModel.breadUnits,
                ProductId = portionModel.product.id
            }).ToList();
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var newFoodUsage = new JournalItem
                {
                    JournalItemTypeId = (int)Enums.JournalItemTypes.FoodUsage,
                    FoodUsageTypeId = foodUsageModel.foodUsageType.id,
                    Time = foodUsageModel.time,
                    Value = foodUsageModel.value,
                    Portions = portions
                };
                context.JournalItems.Add(newFoodUsage);
                context.SaveChanges();
                return newFoodUsage.Id;
            }
           
        }

        public void DeleteSugar(int id)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var deletedItem = new JournalItem {Id = id};
                context.JournalItems.Attach(deletedItem);
                context.JournalItems.Remove(deletedItem);
                context.SaveChanges();
            }
        }

        public void DeleteInsulinUsage(int id)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var deletedItem = new JournalItem { Id = id };
                context.JournalItems.Attach(deletedItem);
                context.JournalItems.Remove(deletedItem);
                context.SaveChanges();
            }
        }

        public void UpdateSugar(int id, JournalItemModel model)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var editedSugar = new JournalItem {Id = id};
                context.JournalItems.Attach(editedSugar);
                editedSugar.Value = model.value;
                editedSugar.Time = model.time;
                context.SaveChanges();
            }
        }

        public void UpdateInsulinusage(int id, JournalItemModel model)
        {
            using (var context = new EasyScheduleDatabaseEntities())
            {
                var editedIsulinUsage = new JournalItem() { Id = id };
                context.JournalItems.Attach(editedIsulinUsage);
                editedIsulinUsage.Time = model.time;
                editedIsulinUsage.Value = model.value;
                editedIsulinUsage.InsulinTypeId = model.insulinType.id;
                context.SaveChanges();
            }
        }
    }
}
