//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Portion
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int FoodUsageId { get; set; }
        public double Value { get; set; }
        public double Amount { get; set; }
        public double BreadUnits { get; set; }
    
        public virtual FoodUsage FoodUsage { get; set; }
        public virtual Product Product { get; set; }
    }
}
