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
        public double BreadUnits { get; set; }
        public int JournalItemId { get; set; }
        public Nullable<double> Size { get; set; }
        public Nullable<int> UnitId { get; set; }
    
        public virtual JournalItem JournalItem { get; set; }
        public virtual Unit Unit { get; set; }
        public virtual Product Product { get; set; }
    }
}
