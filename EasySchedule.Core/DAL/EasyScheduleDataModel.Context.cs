﻿//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EasySchedule.Core.DAL
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class EasyScheduleDatabaseEntities : DbContext
    {
        public EasyScheduleDatabaseEntities()
            : base("name=EasyScheduleDatabaseEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryType> CategoryTypes { get; set; }
        public DbSet<FoodUsageType> FoodUsageTypes { get; set; }
        public DbSet<InsulinType> InsulinTypes { get; set; }
        public DbSet<JournalItem> JournalItems { get; set; }
        public DbSet<JournalItemType> JournalItemTypes { get; set; }
        public DbSet<Portion> Portions { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<UnitProduct> UnitProducts { get; set; }
        public DbSet<Unit> Units { get; set; }
    }
}
